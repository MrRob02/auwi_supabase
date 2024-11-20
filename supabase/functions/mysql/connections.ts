import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";
import { SupabaseClient } from "npm:@supabase/supabase-js@2.45.0";
import { serverError } from "../general/data_response_functions.ts";
export type UserDatabaseResult =
    | {
        data: UserDatabase;
        errorResponse: null;
    }
    | {
        data: null;
        errorResponse: Response;
    };

export type UserDatabase = {
    user: number;
    db: Client;
};
export async function mysqlConnection(db: string): Promise<Client> {
    const client = await new Client().connect({
        hostname: Deno.env.get("MYSQL_DB_HOST")!,
        username: Deno.env.get("MYSQL_DB_USER")!,
        db: db,
        password: Deno.env.get("MYSQL_DB_PASS")!,
        port: parseInt(Deno.env.get("MYSQL_DB_PORT")!),
    });
    return client;
}

//* El cliente ya incluye el usuario que está intentando conectarse
export async function userDatabase(
    client: SupabaseClient,
    local_db_version: number,
): Promise<UserDatabaseResult> {
    const { data: responseDB, error } = await client.from("users").select(
        "database_user_id, db_name",
    ).single();
    if (error) {
        return { data: null, errorResponse: serverError(error) };
    }
    const { database_user_id: user_id, db_name: db } = responseDB || {};

    if (!db || typeof user_id !== "number") {
        return {
            data: null,
            errorResponse: serverError("No se encontró la base de datos"),
        };
    }
    console.log(`Conectando a la base de datos: ${db}`);
    const clientDB = await mysqlConnection(db);
    // saveLastConnection(
    //     client,
    //     (await client.auth.getUser()).data.user?.id || "",
    // );
    const { error: errorRes } = await client.from("users").update({
        local_database_version: local_db_version,
    }).eq("user_id", (await client.auth.getUser()).data.user?.id || "");
    if (errorRes) {
        return {
            data: null,
            errorResponse: serverError(
                "No se pudo guardar la base de datos local",
            ),
        };
    } else {
        console.debug("Versión de base de datos guardada: ", local_db_version);
    }
    return { data: { user: user_id, db: clientDB }, errorResponse: null };
}

//?No funciona
// async function saveLastConnection(
//     client: SupabaseClient,
//     user_uid: string,
// ) {
//     console.log(user_uid);
//     const { error, data } = await client
//         .from("users")
//         .update({
//             last_connection: new Date(),
//         })
//         .eq(
//             "user_id",
//             user_uid,
//         );

//     if (error) {
//         console.error(error);
//     } else {
//         console.debug("Conexión guardada: ", data);
//     }
// }
