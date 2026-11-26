import { supabase } from "./supabase"; // Ajusta la ruta a tu cliente de Supabase

export async function registrarEnNewsletter(
  email: string,
  origen: "banner" | "pasaporte"
) {
  const correoLimpio = email.trim().toLowerCase();

  if (!correoLimpio) {
    throw new Error("Escribe un correo electrónico válido.");
  }

  // Si ya existe el correo, ignoreDuplicates: true evita reinsertar y re-disparar bienvenida
  const { data, error } = await supabase
    .from("newsletter_suscriptores")
    .upsert(
      {
        email: correoLimpio,
        source: origen,
      },
      {
        onConflict: "email",
        ignoreDuplicates: true,
      }
    )
    .select();

  if (error) {
    throw error;
  }

  return data;
}