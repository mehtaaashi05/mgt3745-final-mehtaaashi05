const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const storage = new Map();

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === "/entries") {
      if (request.method === "GET") {
        const entries = [...storage.values()].sort((a, b) => Number(a.id) - Number(b.id));
        return jsonResponse(entries);
      }

      if (request.method === "POST") {
        let body;
        try {
          body = await request.json();
        } catch {
          return jsonResponse({ error: "Invalid JSON" }, 400);
        }

        const text = typeof body.text === "string" ? body.text.trim() : "";
        if (!text) {
          return jsonResponse({ error: "text required" }, 400);
        }

        if (text.length > 200) {
          return jsonResponse({ error: "Maximum 200 characters" }, 400);
        }

        const id = String(Date.now());
        const entry = { id, text, createdAt: new Date().toISOString() };
        storage.set(id, entry);
        return jsonResponse(entry, 201);
      }
    }

    if (pathname.startsWith("/entries/")) {
      const id = pathname.replace("/entries/", "");
      if (request.method === "DELETE") {
        if (!storage.has(id)) {
          return jsonResponse({ error: "Entry not found" }, 404);
        }

        storage.delete(id);
        return jsonResponse({ success: true });
      }
    }

    return jsonResponse({ error: "Not found" }, 404);
  },
};
