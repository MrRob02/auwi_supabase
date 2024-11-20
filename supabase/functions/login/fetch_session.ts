import { incorrectData } from "../general/data_response_functions.ts";
import {
  supabaseClient,
  superAccessClient,
} from "../supabase/supabase_client.ts";
import { Session } from "npm:@supabase/supabase-js@2.45.0";

export async function fetchSession({
  isRegistered,
  email,
  userPass,
  usuarioid,
  nombre,
  database_name,
}: {
  isRegistered: boolean;
  email: string;
  userPass: string;
  usuarioid: number;
  nombre: string;
  database_name: string;
}): Promise<(Session | Response)> {
  const dbEmail = `${database_name}_${email}`;
  const supabase = supabaseClient();
  const handleError = (message: string) => {
    console.error(message);
    throw new Error(message);
  };

  const getSession = async (): Promise<Session> => {
    const { data: sessionData, error: sessionError } = await supabase.auth
      .getSession();
    if (sessionError || sessionData?.session === null) {
      handleError(
        `Error obteniendo sesion: ${sessionError?.message || "sesion nula"}`,
      );
    }
    return sessionData.session!;
  };

  if (isRegistered) {
    console.log("Usuario encontrado, iniciando sesion...");
    const { error: errorSignIn } = await supabase.auth.signInWithPassword({
      email: dbEmail,
      password: userPass,
    });
    if (errorSignIn) {
      if (errorSignIn.code === "invalid_credentials") {
        return incorrectData("Credenciales incorrectas");
      }
      handleError(`Error iniciando sesion: ${errorSignIn.message}`);
    }
  } else {
    console.log("Usuario no encontrado, registrando...");
    const { data: signUpData, error: errorSignUp } = await supabase.auth.signUp(
      { email: dbEmail, password: userPass },
    );
    if (errorSignUp || !signUpData?.user) {
      handleError(
        `Error registrando usuario: ${errorSignUp?.message || "usuario nulo"}`,
      );
    }
    const session = await getSession();
    const uid = session.user?.id;
    if (!uid) {
      handleError("Error obteniendo id de usuario");
    }
    const { error: errorDB } = await superAccessClient().from("users").insert({
      user_id: uid,
      email: email,
      database_user_id: usuarioid,
      nombre: nombre,
      db_name: database_name,
    });
    if (errorDB) {
      handleError(
        `Error registrando usuario en base de datos: ${errorDB.message}`,
      );
    }
  }
  console.log("Sesion obtenida");
  return await getSession();
}
