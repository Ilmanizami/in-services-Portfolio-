import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Inbox } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { OWNER_EMAIL } from "@/lib/admin";
import { supabase } from "@/integrations/supabase/client";

const AdminFloatingShortcut = () => {
  const { user, isAdmin } = useAuth();
  const [count, setCount] = useState<number | null>(null);

  const isOwner = !!user && isAdmin && user.email?.toLowerCase() === OWNER_EMAIL;

  useEffect(() => {
    if (!isOwner) return;
    let cancelled = false;
    const load = async () => {
      const { count } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true });
      if (!cancelled) setCount(count ?? 0);
    };
    load();
    const channel = supabase
      .channel("applications-count")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "applications" },
        () => load()
      )
      .subscribe();
    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [isOwner]);

  if (!isOwner) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2">
      <Link
        to="/admin-panel"
        aria-label="View applications"
        className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-xs text-black transition-all hover:scale-105"
        style={{
          background: "linear-gradient(135deg, hsl(45 100% 60%), hsl(38 100% 50%))",
          boxShadow: "0 0 22px hsl(45 100% 60% / 0.65)",
        }}
      >
        <Inbox size={16} />
        Applications
        <span
          className="ml-1 inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-extrabold"
          style={{ background: "hsl(271 81% 56%)", color: "#fff" }}
        >
          {count ?? "…"}
        </span>
      </Link>
      <Link
        to="/admin-panel"
        aria-label="Manage Dashboard"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-xs text-primary-foreground bg-primary/90 backdrop-blur-md border border-primary/40 shadow-[0_0_25px_hsl(280_100%_58%/0.55)] hover:shadow-[0_0_40px_hsl(280_100%_58%/0.85)] transition-all hover:scale-105"
      >
        <ShieldCheck size={16} />
        Manage Dashboard
      </Link>
    </div>
  );
};

export default AdminFloatingShortcut;
