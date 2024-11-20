import { supabaseClient } from "./supabase_client.ts";
import {
    headerMissingResponse,
    tokenInvalidResponse,
    tokenMissingResponse,
} from "../general/auth_responses_functions.ts";
import { userDatabase, UserDatabaseResult } from "../mysql/connections.ts";
import { serverError } from "../general/data_response_functions.ts";

export async function validateUser(req: Request): Promise<UserDatabaseResult> {
    // Obtener el token del encabezado de autorización
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
        return { data: null, errorResponse: headerMissingResponse() };
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return { data: null, errorResponse: tokenMissingResponse() };
    }

    // Validar el token y obtener la información del usuario
    const { error } = await supabaseClient().auth.getUser(token);
    if (error) {
        return { data: null, errorResponse: tokenInvalidResponse() };
    }
    const { local_db_version } = await req.json();
    if (typeof local_db_version !== "number") {
        return {
            data: null,
            errorResponse: serverError("Base de datos local inválida"),
        };
    }
    return userDatabase(supabaseClient(token), local_db_version);
}
