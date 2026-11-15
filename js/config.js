// Project Kandi frontend configuration.
window.KANDI_CONFIG = {
  API_BASE: "",
  AUTH_MODE: "token",
  TOKEN_KEY: "kandi_token",
  TIMEOUT_MS: 10000,
  PAGE_SIZE: 24,
  ENDPOINTS: { signup: "/auth/signup", login: "/auth/login", logout: "/auth/logout", me: "/me", catalog: "/catalog/items" }
};