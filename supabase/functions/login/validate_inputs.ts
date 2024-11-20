// deno-lint-ignore-file no-explicit-any
import { GeneralMessages } from "../general/global_messages.ts";
import { Nullable } from "../general/types.ts";

export function validateInputs(
  usuario: any,
  password: any,
): Nullable<string> {
  try {
    if (!usuario || !password) {
      console.error("Usuario o contraseña vacíos");
      throw new Error();
    }
    if (typeof usuario !== "string" || typeof password !== "string") {
      console.error("Usuario o contraseña no son strings");
      throw new Error();
    }
    if (usuario.length < 3 || password.length < 3) {
      console.error("Usuario y contraseña deben tener al menos 3 caracteres");
      throw new Error();
    }
    if (usuario.split("@").length !== 2) {
      console.error("Formato de usuario incorrecto");
      throw new Error();
    }
  } catch (_) {
    return GeneralMessages.INCORRECT_DATA;
  }
  return null;
}
