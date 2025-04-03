"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_keycloak_oauth2_oidc_1 = require("passport-keycloak-oauth2-oidc");
exports.default = ({ env }) => ({
    auth: {
        secret: env('ADMIN_JWT_SECRET'),
        providers: [
            {
                uid: "keycloak",
                displayName: "Keycloak",
                createStrategy: (strapi) => new passport_keycloak_oauth2_oidc_1.Strategy({
                    clientID: env("KEYCLOAK_CLIENT_ID", ""),
                    realm: env("KEYCLOAK_REALM", ""),
                    publicClient: env.bool("KEYCLOAK_PUBLIC_CLIENT", false),
                    clientSecret: env("KEYCLOAK_CLIENT_SECRET", ""),
                    sslRequired: env("KEYCLOAK_SSL_REQUIRED", "external"),
                    authServerURL: env("KEYCLOAK_AUTH_SERVER_URL", ""),
                    callbackURL: strapi.admin.services.passport.getStrategyCallbackURL("keycloak"),
                }, (accessToken, refreshToken, profile, done) => {
                    done(null, {
                        email: profile.email,
                        username: profile.username,
                    });
                }),
            },
        ],
    },
    apiToken: {
        salt: env('API_TOKEN_SALT'),
    },
    transfer: {
        token: {
            salt: env('TRANSFER_TOKEN_SALT'),
        },
    },
    flags: {
        nps: env.bool('FLAG_NPS', true),
        promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
});
