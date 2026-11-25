/**
 * CITY FOOD Edge Function client.
 * Preserves the existing endpoint contract while isolating request transport
 * and authentication-header construction from presentation code.
 */
export function createApiClient({ baseUrl, apiKey, getAccessToken }) {
  return async function apiRequest(path, payload = null, method = "POST") {
    const headers = { "Content-Type": "application/json", apikey: apiKey };
    const accessToken = getAccessToken?.();
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

    const response = await fetch(`${baseUrl}/${path}`, {
      method,
      headers,
      body: payload ? JSON.stringify(payload) : undefined,
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "تعذر إكمال العملية");
    return result;
  };
}
