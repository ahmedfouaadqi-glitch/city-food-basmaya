import test from "node:test";
import assert from "node:assert/strict";
import { createApiClient } from "./api.js";

test("sends endpoint, method, payload and authenticated headers", async () => {
  const originalFetch = globalThis.fetch; let request;
  globalThis.fetch = async (url, options) => { request = { url, options }; return { ok: true, json: async () => ({ success: true }) }; };
  try {
    const api = createApiClient({ baseUrl: "https://example.supabase.co/functions/v1/city-food-api", apiKey: "public-key", getAccessToken: () => "session-token" });
    assert.deepEqual(await api("admin/orders", { id: 7 }, "PATCH"), { success: true });
    assert.equal(request.url, "https://example.supabase.co/functions/v1/city-food-api/admin/orders");
    assert.equal(request.options.method, "PATCH");
    assert.equal(request.options.headers.apikey, "public-key");
    assert.equal(request.options.headers.Authorization, "Bearer session-token");
    assert.equal(request.options.body, JSON.stringify({ id: 7 }));
  } finally { globalThis.fetch = originalFetch; }
});

test("omits auth and request body when no session or payload is supplied", async () => {
  const originalFetch = globalThis.fetch; let request;
  globalThis.fetch = async (_url, options) => { request = options; return { ok: true, json: async () => ({}) }; };
  try {
    const api = createApiClient({ baseUrl: "https://example.test/api", apiKey: "key" });
    await api("health");
    assert.equal(request.method, "POST");
    assert.equal(request.body, undefined);
    assert.equal(request.headers.Authorization, undefined);
  } finally { globalThis.fetch = originalFetch; }
});

test("returns backend error text for failed requests", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: false, json: async () => ({ error: "Denied" }) });
  try {
    const api = createApiClient({ baseUrl: "https://example.test/api", apiKey: "key" });
    await assert.rejects(api("admin/bootstrap"), { message: "Denied" });
  } finally { globalThis.fetch = originalFetch; }
});
