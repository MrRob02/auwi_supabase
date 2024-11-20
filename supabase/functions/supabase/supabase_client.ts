import { createClient, SupabaseClient } from "npm:@supabase/supabase-js@2.45.0";

//* A esta función le pasaré el token para que pueda instanciar el cliente de Supabase
//* y así poder hacer consultas a la base de datos solo con el token
export function supabaseClient(token?: string): SupabaseClient {
  const options = token
    ? {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
    : undefined;
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    options,
  );
}

export function superAccessClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}
