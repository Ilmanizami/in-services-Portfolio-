import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { OWNER_EMAIL } from "@/lib/admin";

const AdminFloatingShortcut = () => {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin || user.email?.toLowerCase() !== OWNER_EMAIL) return null;

  return (
    <Link
      to="/admin-panel"
      aria-label="Manage Dashboard"
      className="fixed bottom-24 right-6 z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-xs text-primary-foreground bg-primary/90 backdrop-blur-md border border-primary/40 shadow-[0_0_25px_hsl(280_100%_58%/0.55)] hover:shadow-[0_0_40px_hsl(280_100%_58%/0.85)] transition-all hover:scale-105"
    >
      <ShieldCheck size={16} />
      Manage Dashboard
    </Link>
  );
};

export default AdminFloatingShortcut;
