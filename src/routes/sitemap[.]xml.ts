import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { CATEGORIES } from "@/lib/site";

const BASE = "https://yojna-bridge-hub.lovable.app";
const STATIC = [
  "/", "/schemes", "/eligibility-checker", "/categories", "/how-it-works", "/resources",
  "/resources/how-to-apply-for-government-schemes", "/about", "/privacy", "/terms", "/disclaimer",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"] ?? "";
        let slugs: string[] = [];
        try {
          const sb = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
            auth: { persistSession: false, autoRefreshToken: false },
            global: {
              fetch: (input, init) => {
                const h = new Headers(init?.headers);
                if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
                h.set("apikey", key);
                return fetch(input, { ...init, headers: h });
              },
            },
          });
          const { data } = await sb.from("schemes").select("slug");
          slugs = (data ?? []).map((r) => r.slug);
        } catch {
          /* fall back to static pages */
        }
        const paths = [...STATIC, ...CATEGORIES.map((c) => `/categories/${c.key}`), ...slugs.map((s) => `/scheme/${s}`)];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${BASE}${p}</loc></url>`)
          .join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
