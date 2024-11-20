import { superAccessClient } from "../supabase/supabase_client.ts";

export async function isUserRegisteredInDatabase(
  email: string,
  db_name: string,
): Promise<boolean> {
  const { data: responseDB, error } = await superAccessClient()
    .from("users")
    .select("email")
    .eq("email", email)
    .eq("db_name", db_name);
  if (error) {
    console.error(`Error en la solicitud: ${error.message}`);
    throw new Error();
  }
  return responseDB.length > 0;
}
