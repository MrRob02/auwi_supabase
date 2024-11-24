import { createClient, SupabaseClient } from "npm:@supabase/supabase-js@2.45.0";
import { Secrets } from "../general/env.ts";

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
    Secrets.GetUrl,
    Secrets.GetAnonKey,
    options,
  );
}

export function superAccessClient(): SupabaseClient {
  return createClient(
    Secrets.GetUrl,
    Secrets.GetServiceRoleKey,
  );
}
