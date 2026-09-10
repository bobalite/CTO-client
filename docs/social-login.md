# Frontend social sign-in

The login page has Google and Facebook sign-in buttons. Set the following public runtime variables to enable each provider independently:

- `NUXT_PUBLIC_GOOGLE_LOGIN_URL`: backend Google OAuth initiation URL.
- `NUXT_PUBLIC_FACEBOOK_LOGIN_URL`: backend Facebook OAuth initiation URL.

Use HTTPS URLs in production. Relative same-origin paths and localhost HTTP URLs are supported for development. These are backend sign-in endpoints, not provider authorization URLs assembled in the browser. Do not put provider secrets in public runtime configuration.

The backend must initiate OAuth, validate state and the provider callback, and establish the application's authenticated session. The existing password flow expects an application token and user record, then navigates to `/services`. A social callback/session exchange compatible with that flow still needs a backend contract; this frontend change does not implement or simulate it, accept tokens from URL parameters, or grant access from provider profile data.

Until an initiation URL is configured, its button remains disabled. Configuring a URL enables the redirect only; successful sign-in requires the backend integration above.
