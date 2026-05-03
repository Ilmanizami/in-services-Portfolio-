import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { OWNER_EMAIL } from "@/lib/admin";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdmin = async (u: User) => {
    if (u.email?.toLowerCase() !== OWNER_EMAIL) return false;
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", u.id)
      .eq("role", "admin")
      .maybeSingle();
    return !!data;
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        setTimeout(async () => setIsAdmin(await checkAdmin(sess.user)), 0);
      } else {
        setIsAdmin(false);
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) checkAdmin(session.user).then(setIsAdmin);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, user, isAdmin, loading };
};
