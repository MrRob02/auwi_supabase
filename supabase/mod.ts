export {
    headerMissingResponse as authFunc,
    tokenInvalidResponse,
    tokenMissingResponse,
} from "./functions/general/auth_responses_functions.ts";
export {
    decode64 as resFunc,
    errorResponse,
    response,
} from "./functions/general/response_functions.ts";
export {
    incorrectData,
    serverError,
    successDataResponse as dataFunc,
    validateEmail,
    validateSingleData,
} from "./functions/general/data_response_functions.ts";
export { GeneralMessages as messages } from "./functions/general/global_messages.ts";

export { Nullable } from "./functions/general/types.ts";

export {
    mysqlConnection,
    userDatabase as connection,
} from "./functions/mysql/connections.ts";
