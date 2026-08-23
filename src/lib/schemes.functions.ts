import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export type Scheme = Database["public"]["Tables"]["schemes"]["Row"];

function publicClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export const listSchemes = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("schemes")
    .select("*")
    .order("scheme_name", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Scheme[];
});

export const getSchemeBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const { data: row, error } = await publicClient()
      .from("schemes")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row ?? null) as Scheme | null;
  });
