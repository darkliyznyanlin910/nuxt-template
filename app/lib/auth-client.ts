import { createAuthClient } from "better-auth/vue";

import { env } from "#shared/env";

export const authClient = createAuthClient({
  baseURL: env.NUXT_PUBLIC_APP_URL + "/api/auth",
});
