export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL || "http://localhost:5000";
  const appId = import.meta.env.VITE_APP_ID || "baltistan-comsian-app";
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  try {
    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");

    return url.toString();
  } catch (error) {
    console.error("Failed to generate login URL:", error);
    // Provide fallback URL
    return `${oauthPortalUrl}/app-auth?appId=${appId}&redirectUri=${encodeURIComponent(redirectUri)}&state=${state}&type=signIn`;
  }
};
