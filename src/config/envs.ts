import 'dotenv/config';
import { get } from "env-var";

export const envs = {
    PORT : get("PORT").required().asPortNumber(),
    DB_HOST: get("DATABASE_HOST").required().asString(),
    DB_PORT : get("DATABASE_PORT").required().asPortNumber(),
    DB_USERNAME : get("DATABASE_USERNAME").required().asString(),
    DB_PASSWORD : get("DATABASE_PASSWORD").required().asString(),
    DB_DATABASE : get("DATABASE_DATABASE").required().asString(),
    JWT_SEED : get("JWT_SEED").required().asString(),
    // SEND_EMAIL : get("SEND_EMAIL").required().asString(),
    MAILER_SERVICE : get("MAILER_SERVICE").required().asString(),
    MAILER_EMAIL : get("MAILER_EMAIL").required().asString(),
    MAILER_SECRET_KEY : get("MAILER_SECRET_KEY").required().asString(),
    SEND_EMAIL : get("SEND_EMAIL").required().asBool(),
    WEBSERVICES_URL : get("WEBSERVICES_URL").required().asString(),

};