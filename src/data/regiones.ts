// src/data/regiones.ts
export interface RegionMapa {
    id: string;
    nombre: string;
    descripcion: string;
    pngSrc: string;
    // Coordenadas en porcentaje respecto al mapa base
    top: string;
    left: string;
    width: string; // Ancho del PNG en % para que escale proporcionalmente en móvil
    imagenDetalle?: string; // Opcional: ilustración o concept art dentro del modal
}

export const REGIONES_ALDAN: RegionMapa[] = [
    {
        id: 'aldan',
        nombre: 'Aldán',
        descripcion: 'Última civilización en pie. Hogar y refugio de todos los seres mágicos y deformados que habitan el planeta.\n\nFundada por Omen, hoy en día vive uno de sus períodos más brillantes gracias a la gestión de Nemo, quien ha puesto todos sus esfuerzos en hacer la vida de todos mucho más divertida y extravagante.',
        pngSrc: '/mapa/pin-aldan.png',
        top: '48%',
        left: '34%',
        width: '8%',
        imagenDetalle: '/mapa/regiones/aldan.jpg',
    },
    {
        id: 'calcinia',
        nombre: 'Calcinia',
        descripcion: 'Región donde la tierra es oscura y escombrosa, cubierta de cenizas del recuerdo de lo que hubo. Después de la explosión solo hay piedra, volcanes, y grandes nada\n\n*~No sé si me dé tiempo a terminar esta carta, mi preciado amigo. Te escribo con temor a que pase lo peor. Se habla de una estrella lejana que arrasará la tierra tal como la conocemos. Ya todo está comenzando a cambiar, el cielo está rojo y...~*\n\n*Fragmento de una carta encontrada por exploradores*',
        pngSrc: '/mapa/pin-calcinia.png',
        top: '10%',
        left: '11%',
        width: '12%',
        imagenDetalle: '/mapa/regiones/calcinia.jpg',
    },
    {
        id: 'desierto-rojo',
        nombre: 'Desierto Rojo',
        descripcion: 'Páramo vacío y rojizo, con escombros y torres gigantescas. \n\nFueron encontrados diarios de investigación de una antigua empresa tecnológica cerca de los restos de dos antiguas torres que parecen haber estado conectadas entre sí. Los textos encontrados hablaban por primera vez del espacio y de fenómenos que ocurren en él. Los investigadores de Aldán no han sido capaces de descifrarlos.',
        pngSrc: '/mapa/pin-desierto.png',
        top: '30%',
        left: '21%',
        width: '12%',
        imagenDetalle: '/mapa/regiones/desierto.jpg',
    },
    {
        id: 'cumbres-quebradas',
        nombre: 'Cumbres Quebradas',
        descripcion: 'Zona montañosa y peligrosa. Alerta de altas presiones atmosféricas. \n\nSiglos atrás se contó por primera vez la leyenda del gigante de hielo, solo él era capaz de aguantar tales presiones y de sobrevivir a la estrella ¿Estará todavía vagando entre las montañas?',
        pngSrc: '/mapa/pin-cumbres.png',
        top: '52%',
        left: '13%',
        width: '12%',
        imagenDetalle: '/mapa/regiones/cumbres.jpg',
    },
    {
        id: 'paramo-polvoriento',
        nombre: 'Páramo Polvoriento',
        descripcion: 'Los vientos soplan fuerte y levantan inmensas columnas de arena densa que no permiten desarrollo ni investigaciones profundas.',
        pngSrc: '/mapa/pin-paramo.png',
        top: '14%',
        left: '55%',
        width: '13%',
        imagenDetalle: '/mapa/regiones/paramo.jpg',
    },
    {
        id: 'arboleda-silenciosa',
        nombre: 'Arboleda Silenciosa',
        descripcion: 'Aquí entre las copas inmensas de árboles, ni el trinar de las ramas salva al silencio absoluto. \n\nPermanece como zona inexplorada. Un grupo de aventureros se lanzó a la investigación y nunca volvieron. El bosque se los tragó para siempre. ',
        pngSrc: '/mapa/pin-arboleda.png',
        top: '19%',
        left: '79%',
        width: '10%',
        imagenDetalle: '/mapa/regiones/arboleda.jpg',
    },
    {
        id: 'atlantis',
        nombre: 'Atlantis',
        descripcion: 'Zona peligrosa de altas presiones oceánicas. \n\nRegistros antigüos mencionan la existencia de una civilización ya extinta, pero recientemente, barcos exploradores han experimentado fenómenos que sólo pueden ser acuñados a la existencia de vida submarina',
        pngSrc: '/mapa/pin-antartida.png',
        top: '59%',
        left: '68%',
        width: '12%',
        imagenDetalle: '/mapa/regiones/atlantis.jpg',
    },
    {
        id: 'territorio-forastero',
        nombre: 'Territorio Forastero',
        descripcion: 'Único lugar del mundo donde parece no haber llegado la radiación.\n\nAquí fueron encontrados animales que demostraron un bajo nivel de inteligencia. Según los científicos existe la posibilidad de que todos nosotros antes fuéramos así. Se intentó enseñarles pero fue imposible, tienen un cerebro inferior. ',
        pngSrc: '/mapa/pin-forastero.png',
        top: '60%',
        left: '88%',
        width: '10%',
        imagenDetalle: '/mapa/regiones/forastero.jpg',
    },
    {
        id: 'zona-militar',
        nombre: 'Zona Militar',
        descripcion: 'Antigüo hogar de los pingüinos aldaneanos. No se ha podido hacer ninguna expedición con éxito. \n\nHace algunos años una interferencia de radio interrumpió la programación habitual y se escuchó un extraño mensaje proveniente del sur: *~(…) nos estamos quedando sin recursos, está siendo imposible seguir distribuyendo la comida y los víveres. Coronel... nos estamos quedando sin hombres sanos y los que lo están... Se están revelando. Si no regresamos al mundo ext(…)~*',
        pngSrc: '/mapa/pin-militar.png',
        top: '86%',
        left: '59%',
        width: '14%',
        imagenDetalle: '/mapa/regiones/militar.jpg',
    }
];