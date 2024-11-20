import { errorResponse } from "./response_functions.ts";

export function tokenInvalidResponse(): Response {
    return errorResponse({ message: "token_invalido", data: null });
}
export function tokenMissingResponse(): Response {
    return errorResponse({ message: "token_missing", data: null });
}
export function headerMissingResponse(): Response {
    return errorResponse({ message: "header_missing", data: null });
}