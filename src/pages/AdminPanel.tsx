import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Pencil, Plus, LogOut, Star } from "lucide-react";

type Project = {
  id: string; title: string; description: string; image_url: string | null;
  live_link: string | null; github_link: string | null; tech_stack: string[];
  is_published: boolean; sort_order: number;
};

const blankProject = { title: "", description: "", image_url: "", live_link: "", github_link: "", tech_stack: "", is_published: true, sort_order: 0 };

const AdminPanel = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(blankProject);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/auth", { replace: true });
    else if (!isAdmin) {
      toast({ title: "Access denied", description: "You are not an admin.", variant: "destructive" });
      navigate("/", { replace: true });
    }
  }, [user, isAdmin, loading, navigate, toast]);

  const projects = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("sort_order");
      if (error) throw error;
      return data as Project[];
    },
    enabled: isAdmin,
  });

  const testimonials = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const settings = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const saveProject = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title, description: form.description,
        image_url: form.image_url || null, live_link: form.live_link || null,
        github_link: form.github_link || null,
        tech_stack: form.tech_stack.split(",").map((s) => s.trim()).filter(Boolean),
        is_published: form.is_published, sort_order: Number(form.sort_order) || 0,
      };
      if (editing) {
        const { error } = await supabase.from("projects").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: editing ? "Project updated" : "Project created" });
      setEditing(null); setForm(blankProject);
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (e: Error) => toast({ title: "Save failed", description: e.message, variant: "destructive" }),
  });

  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Project deleted" });
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const toggleApprove = useMutation({
    mutationFn: async ({ id, is_approved }: { id: string; is_approved: boolean }) => {
      const { error } = await supabase.from("testimonials").update({ is_approved }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
      qc.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });

  const deleteTestimonial = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Review deleted" });
      qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
      qc.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });

  const saveSettings = useMutation({
    mutationFn: async (s: Record<string, string>) => {
      const { error } = await supabase.from("site_settings").update(s).eq("id", 1);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Settings saved" });
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
      qc.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });

  const startEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title, description: p.description,
      image_url: p.image_url || "", live_link: p.live_link || "",
      github_link: p.github_link || "", tech_stack: p.tech_stack.join(", "),
      is_published: p.is_published, sort_order: p.sort_order,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  if (loading || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;
  }

  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              <span className="text-gradient">Admin</span> Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={signOut}><LogOut className="mr-2" />Sign out</Button>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* PROJECTS */}
          <TabsContent value="projects" className="space-y-6 mt-6">
            <Card className="oval-glow border-primary/30">
              <CardHeader><CardTitle>{editing ? "Edit project" : "Add new project"}</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); saveProject.mutate(); }} className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label>Title</Label>
                    <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Description</Label>
                    <Textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Live link</Label>
                    <Input value={form.live_link} onChange={(e) => setForm({ ...form, live_link: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>GitHub link</Label>
                    <Input value={form.github_link} onChange={(e) => setForm({ ...form, github_link: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tech stack (comma-separated)</Label>
                    <Input value={form.tech_stack} onChange={(e) => setForm({ ...form, tech_stack: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Sort order</Label>
                    <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
                    <Label>Published</Label>
                  </div>
                  <div className="md:col-span-2 flex gap-3">
                    <Button type="submit" disabled={saveProject.isPending}>
                      {saveProject.isPending ? <Loader2 className="animate-spin" /> : <Plus />}
                      {editing ? "Update" : "Create"}
                    </Button>
                    {editing && (
                      <Button type="button" variant="outline" onClick={() => { setEditing(null); setForm(blankProject); }}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {projects.data?.map((p) => (
                <Card key={p.id} className="oval-glow border-border">
                  <CardContent className="pt-6 flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-display font-semibold">{p.title}</h3>
                        {!p.is_published && <Badge variant="outline">Hidden</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {p.tech_stack.map((t) => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline" onClick={() => startEdit(p)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="destructive" onClick={() => { if (confirm(`Delete "${p.title}"?`)) deleteProject.mutate(p.id); }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* REVIEWS */}
          <TabsContent value="reviews" className="space-y-4 mt-6">
            {testimonials.data?.map((t) => (
              <Card key={t.id} className="oval-glow border-border">
                <CardContent className="pt-6 flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-semibold">{t.client_name}</h3>
                      <span className="text-xs text-muted-foreground">· {t.country || "—"} · {t.service_provided}</span>
                      {!t.is_approved && <Badge variant="outline" className="text-amber-400 border-amber-400/40">Pending</Badge>}
                    </div>
                    <div className="flex gap-0.5 my-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className={i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">"{t.feedback_text}"</p>
                    {t.client_email && <p className="text-xs text-muted-foreground mt-1">{t.client_email}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <Switch checked={t.is_approved} onCheckedChange={(v) => toggleApprove.mutate({ id: t.id, is_approved: v })} />
                      <Label className="text-xs">Approved</Label>
                    </div>
                    <Button size="icon" variant="destructive" onClick={() => { if (confirm("Delete review?")) deleteTestimonial.mutate(t.id); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* SETTINGS */}
          <TabsContent value="settings" className="mt-6">
            <Card className="oval-glow border-primary/30">
              <CardHeader><CardTitle>Contact info</CardTitle></CardHeader>
              <CardContent>
                {settings.data && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      saveSettings.mutate(Object.fromEntries(fd) as Record<string, string>);
                    }}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    {[
                      ["contact_email", "Email"], ["contact_phone", "Phone"],
                      ["whatsapp_number", "WhatsApp number"], ["calendly_url", "Calendly URL"],
                      ["linkedin_url", "LinkedIn URL"], ["github_url", "GitHub URL"],
                    ].map(([k, label]) => (
                      <div key={k} className="space-y-2">
                        <Label>{label}</Label>
                        <Input name={k} defaultValue={(settings.data as Record<string, string | null>)[k] ?? ""} />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <Button type="submit" disabled={saveSettings.isPending}>
                        {saveSettings.isPending && <Loader2 className="animate-spin" />}
                        Save settings
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default AdminPanel;
