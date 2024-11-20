import {
  incorrectData,
  serverError,
} from "../general/data_response_functions.ts";

export async function fetchUserApi(
  { nameWithEntity, pass }: { nameWithEntity: string; pass: string },
  // deno-lint-ignore no-explicit-any
): Promise<any> {
  try {
    const [name, entity] = nameWithEntity.split("@");
    const encodedName = encodeURIComponent(name);
    const encodedEntity = encodeURIComponent(entity);
    const encodedPass = encodeURIComponent(pass);
    const res = await fetch(
      `https://laravel.erpauwi.mx/conexion-apps/${encodedName}/${encodedPass}/${encodedEntity}`,
    );
    const data = await res.json();
    if (data.Success === true) {
      return data.Data;
    } else {
      return incorrectData(name);
    }
  } catch (ex) {
    return serverError(ex);
  }
}
