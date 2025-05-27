import Cookie from "js-cookie";

export function setAuthCredentials(token: string, permissions: any, role: any) {
  Cookie.set("auth_token", token);
  Cookie.set("auth_permissions", JSON.stringify(permissions));
  Cookie.set("auth_role", JSON.stringify(role));
}

export function removeAuthCredentials() {
  Cookie.remove("auth_token");
  Cookie.remove("auth_permissions");
  Cookie.remove("auth_role");
}
