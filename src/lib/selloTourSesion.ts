import { supabase } from './supabase';

const STORAGE_KEY_PASAPORTE = 'aldan_pasaporte_activo';
const SESSION_KEY_VISITADAS = 'aldan_sesion_paginas_visitadas';
const SESSION_KEY_OTORGADO = 'aldan_sello_tour_sesion_otorgado';

// Ajusta aquí las rutas exactas de tu web que deben visitarse en una sola sesión
export const RUTAS_REQUERIDAS_SESION = [
    '/',
    '/adviento',
    '/mapa',
    '/archivo',
    '/contacto',
    '/perfil',
];

const SELLO_TOUR_ID = 'explorador-sesion-completa';
const SELLO_TOUR_SRC = '/pasaporte/sellos/sello-curioso.png';
const PAGINA_SELLO_INICIO = 6;
const PAGINA_SELLO_FIN = 11;
const MAX_SELLOS_POR_PAGINA = 2;

interface SelloRegistrado {
    id: string;
    src: string;
    pagina: number;
    otorgadoEn?: string;
}

function normalizarRuta(pathname: string): string {
    if (!pathname) return '/';
    const limpia = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '');
    return limpia === '' ? '/' : limpia.toLowerCase();
}

function leerPasaporteActivo(): any | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_PASAPORTE);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        const codigo = parsed?.numero_pasaporte?.trim().toUpperCase();
        if (!codigo || codigo === 'ALD-XXXX') return null;
        return { ...parsed, numero_pasaporte: codigo };
    } catch {
        return null;
    }
}

function guardarPasaporteActivo(data: any) {
    try {
        localStorage.setItem(STORAGE_KEY_PASAPORTE, JSON.stringify(data));
    } catch {}
}

function leerVisitadasSesion(): string[] {
    try {
        const raw = sessionStorage.getItem(SESSION_KEY_VISITADAS);
        const arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? arr.map(normalizarRuta) : [];
    } catch {
        return [];
    }
}

function guardarVisitadasSesion(rutas: string[]) {
    try {
        sessionStorage.setItem(SESSION_KEY_VISITADAS, JSON.stringify(Array.from(new Set(rutas))));
    } catch {}
}

function yaOtorgadoEnSesion(): boolean {
    try {
        return sessionStorage.getItem(SESSION_KEY_OTORGADO) === 'true';
    } catch {
        return false;
    }
}

function marcarOtorgadoEnSesion() {
    try {
        sessionStorage.setItem(SESSION_KEY_OTORGADO, 'true');
    } catch {}
}

function listaTieneSelloTour(sellos: unknown): boolean {
    if (!Array.isArray(sellos)) return false;
    return sellos.some((s: any) => s?.id === SELLO_TOUR_ID);
}

function limpiarTokensAuthExpiradosEnStorage() {
    try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (!k) continue;
            if (k.startsWith('sb-') && k.endsWith('-auth-token')) {
                keysToRemove.push(k);
            }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch {}
}

async function prepararSesionSupabaseSinJwtVencido() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const ahoraSeg = Math.floor(Date.now() / 1000);
        if (session.expires_at && session.expires_at <= ahoraSeg + 30) {
            const { error } = await supabase.auth.refreshSession();
            if (error) {
                await supabase.auth.signOut({ scope: 'local' });
                limpiarTokensAuthExpiradosEnStorage();
            }
        }
    } catch {
        await supabase.auth.signOut({ scope: 'local' }).catch(() => {});
        limpiarTokensAuthExpiradosEnStorage();
    }
}

function elegirPaginaLibre(sellos: SelloRegistrado[], paginaDeseada?: number): number {
    if (
        typeof paginaDeseada === 'number' &&
        paginaDeseada >= PAGINA_SELLO_INICIO &&
        paginaDeseada <= PAGINA_SELLO_FIN
    ) {
        const ocupados = sellos.filter((s) => Number(s.pagina) === paginaDeseada).length;
        if (ocupados < MAX_SELLOS_POR_PAGINA) return paginaDeseada;
    }

    for (let p = PAGINA_SELLO_INICIO; p <= PAGINA_SELLO_FIN; p++) {
        const count = sellos.filter((s) => Number(s.pagina) === p).length;
        if (count < MAX_SELLOS_POR_PAGINA) return p;
    }

    return PAGINA_SELLO_INICIO;
}

export async function estamparSelloTourEnPasaporte(
    codigoPasaporte: string,
    paginaDeseada?: number
): Promise<boolean> {
    const codigo = codigoPasaporte.trim().toUpperCase();
    if (!codigo || codigo === 'ALD-XXXX') return false;

    await prepararSesionSupabaseSinJwtVencido();

    let { data: filaDb, error: selectErr } = await supabase
        .from('pasaportes_aldaneros')
        .select('numero_pasaporte, nombre, email, foto_url, sellos, created_at')
        .ilike('numero_pasaporte', codigo)
        .maybeSingle();

    if (selectErr?.message?.toLowerCase().includes('jwt expired')) {
        await supabase.auth.signOut({ scope: 'local' }).catch(() => {});
        limpiarTokensAuthExpiradosEnStorage();
        ({ data: filaDb, error: selectErr } = await supabase
            .from('pasaportes_aldaneros')
            .select('numero_pasaporte, nombre, email, foto_url, sellos, created_at')
            .ilike('numero_pasaporte', codigo)
            .maybeSingle());
    }

    if (selectErr || !filaDb?.numero_pasaporte) {
        return false;
    }

    const sellosActuales: SelloRegistrado[] = Array.isArray(filaDb.sellos)
        ? [...filaDb.sellos]
        : [];

    const localActual = leerPasaporteActivo();

    // Si ya tiene el sello en Supabase, sincronizamos local y devolvemos true sin duplicar
    if (listaTieneSelloTour(sellosActuales)) {
        guardarPasaporteActivo({
            ...(localActual || {}),
            ...filaDb,
            numero_pasaporte: filaDb.numero_pasaporte.toUpperCase(),
            sellos: sellosActuales,
        });
        return true;
    }

    const pagina = elegirPaginaLibre(sellosActuales, paginaDeseada);

    sellosActuales.push({
        id: SELLO_TOUR_ID,
        src: SELLO_TOUR_SRC,
        pagina,
        otorgadoEn: new Date().toISOString(),
    });

    let { data: actualizada, error: updateErr } = await supabase
        .from('pasaportes_aldaneros')
        .update({ sellos: sellosActuales })
        .eq('numero_pasaporte', filaDb.numero_pasaporte)
        .select('numero_pasaporte, sellos')
        .maybeSingle();

    if (updateErr?.message?.toLowerCase().includes('jwt expired')) {
        await supabase.auth.signOut({ scope: 'local' }).catch(() => {});
        limpiarTokensAuthExpiradosEnStorage();
        ({ data: actualizada, error: updateErr } = await supabase
            .from('pasaportes_aldaneros')
            .update({ sellos: sellosActuales })
            .eq('numero_pasaporte', filaDb.numero_pasaporte)
            .select('numero_pasaporte, sellos')
            .maybeSingle());
    }

    if (updateErr || !actualizada) {
        console.warn('No se pudo guardar sello del tour:', updateErr?.message);
        return false;
    }

    guardarPasaporteActivo({
        ...(localActual || {}),
        ...filaDb,
        numero_pasaporte: filaDb.numero_pasaporte.toUpperCase(),
        sellos: Array.isArray(actualizada.sellos) ? actualizada.sellos : sellosActuales,
    });

    return true;
}

export async function registrarVisitaYComprobarTour(
    onDesbloqueado: (params: {
        pasaporteActivo: any | null;
        estampadoAutomatico: boolean;
        sello: { id: string; src: string };
    }) => void
) {
    if (yaOtorgadoEnSesion()) return;

    const rutaActual = normalizarRuta(window.location.pathname);
    const requeridasNormalizadas = RUTAS_REQUERIDAS_SESION.map(normalizarRuta);

    if (!requeridasNormalizadas.includes(rutaActual)) return;

    const visitadas = leerVisitadasSesion();
    if (!visitadas.includes(rutaActual)) {
        visitadas.push(rutaActual);
        guardarVisitadasSesion(visitadas);
    }

    const completoEnEstaSesion = requeridasNormalizadas.every((r) => visitadas.includes(r));
    if (!completoEnEstaSesion) return;

    const pasaporte = leerPasaporteActivo();

    // 1. Si el pasaporte en local ya tiene el sello, no mostramos aviso
    if (pasaporte && listaTieneSelloTour(pasaporte.sellos)) {
        marcarOtorgadoEnSesion();
        return;
    }

    // 2. Consultamos Supabase para comprobar si ya lo tenía guardado en su cuenta
    if (pasaporte?.numero_pasaporte) {
        await prepararSesionSupabaseSinJwtVencido();
        const { data: filaDb } = await supabase
            .from('pasaportes_aldaneros')
            .select('sellos')
            .ilike('numero_pasaporte', pasaporte.numero_pasaporte)
            .maybeSingle();

        if (filaDb && listaTieneSelloTour(filaDb.sellos)) {
            guardarPasaporteActivo({
                ...pasaporte,
                sellos: filaDb.sellos,
            });
            marcarOtorgadoEnSesion();
            return;
        }
    }

    let estampadoAutomatico = false;
    if (pasaporte?.numero_pasaporte) {
        estampadoAutomatico = await estamparSelloTourEnPasaporte(pasaporte.numero_pasaporte);
        if (estampadoAutomatico) {
            marcarOtorgadoEnSesion();
        }
    }

    onDesbloqueado({
        pasaporteActivo: pasaporte,
        estampadoAutomatico,
        sello: { id: SELLO_TOUR_ID, src: SELLO_TOUR_SRC },
    });
}