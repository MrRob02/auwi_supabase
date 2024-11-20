// deno-lint-ignore-file no-explicit-any
import { GeneralMessages } from "./global_messages.ts";
import { errorResponse, response } from "./response_functions.ts";

export function validateSingleData(data: any): boolean {
    return data === undefined || data === null || data !== "string";
}

export function serverError(data: any): Response {
    console.error(`${GeneralMessages.SERVER_ERROR}: ${data}`);
    return errorResponse({ message: GeneralMessages.SERVER_ERROR, data: data });
}

export function incorrectData(data: any): Response {
    console.error(`${GeneralMessages.INCORRECT_DATA} ${data}`);
    return response({ message: GeneralMessages.INCORRECT_DATA, data: data });
}

export function validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function successDataResponse(data: any): Response {
    console.log('Success:', data)
    return response({ message: GeneralMessages.SUCCESS, data: data })
}