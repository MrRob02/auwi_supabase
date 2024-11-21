// deno-lint-ignore-file no-explicit-any
import { Nullable } from "../../mod.ts";

type mensaje = { message: string; data: any };
export function errorResponse(response: mensaje): Response {
    console.error(response.message);
    return new Response(
        JSON.stringify(response),
        { headers: { "Content-Type": "application/json" } },
    );
}
export function response(response: mensaje): Response {
    //console.log(response);
    return new Response(
        JSON.stringify(response),
        { headers: { "Content-Type": "application/json" } },
    );
}

export function decode64(dbEncoded: Nullable<string>): Nullable<string> {
    if (typeof dbEncoded !== 'string') return null;
    if (dbEncoded === null) return null;
    return atob(dbEncoded);
}
