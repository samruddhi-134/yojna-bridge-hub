import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function useSavedSchemes(userId: string | undefined) {
  return useQuery({
    queryKey: ["saved-schemes", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_schemes")
        .select("id, scheme_id, saved_at, schemes(*)")
        .order("saved_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useToggleSave(userId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ schemeId, saved }: { schemeId: string; saved: boolean }) => {
      if (!userId) throw new Error("Not signed in");
      if (saved) {
        const { error } = await supabase
          .from("saved_schemes")
          .delete()
          .eq("scheme_id", schemeId)
          .eq("user_id", userId);
        if (error) throw error;
        return "removed" as const;
      }
      const { error } = await supabase
        .from("saved_schemes")
        .insert({ scheme_id: schemeId, user_id: userId });
      if (error) throw error;
      return "saved" as const;
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["saved-schemes"] });
      toast.success(result === "saved" ? "Scheme saved to your account." : "Scheme removed from saved list.");
    },
    onError: (error: Error) => toast.error(error.message || "Could not update your saved schemes."),
  });
}
