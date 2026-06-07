import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { OWNER_EMAIL } from "@/lib/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { toast as sonner } from "sonner";
import { Loader2, Trash2, Pencil, Plus, LogOut, Star, Check, Image as ImageIcon, Video as VideoIcon } from "lucide-react";

const GOLD = "45 100% 60%";
const GOLD_SOFT = "45 100% 70%";
const PURPLE_DEEP = "267 65% 11%";
const PURPLE_MID = "265 50% 14%";
const PURPLE_VIBRANT = "271 81% 56%";

const CATEGORIES = [
  "3D Modeling", "Video Editing", "AI Animation", "Automation",
  "Graphic Design", "UI/UX", "Web Development", "Content Creation",
  "Photography", "Branding", "Other",
];

type Project = {
  id: string; title: string; description: string;
  image_url: string | null; live_link: string | null; github_link: string | null;
  tech_stack: string[]; is_published: boolean; sort_order: number;
  category: string | null; project_type: string;
  thumbnail_url: string | null; video_url: string | null; project_url: string | null;
};

const blankProject = {
  title: "", description: "", image_url: "", live_link: "", github_link: "",
  tech_stack: "", is_published: true, sort_order: 0,
  category: "", project_type: "image" as "image" | "video",
  thumbnail_url: "", video_url: "", project_url: "",
};

const PAGE_SIZE = 8;

const fieldStyle: React.CSSProperties = {
  background: `hsl(${PURPLE_DEEP} / 0.6)`,
  borderColor: `hsl(${PURPLE_VIBRANT} / 0.5)`,
  color: "#fff",
};

const AdminPanel = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(blankProject);
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<Project | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }
    const ownerOk = user.email?.toLowerCase() === OWNER_EMAIL;
    if (!ownerOk || !isAdmin) {
      toast({ title: "Access denied", description: "This area is restricted to the site owner.", variant: "destructive" });
      supabase.auth.signOut();
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
      if (!form.title.trim()) throw new Error("Title is required");
      if (!form.description.trim()) throw new Error("Description is required");
      if (form.project_type === "video" && !form.video_url.trim()) {
        throw new Error("Video URL is required when project type is 'video'");
      }
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        image_url: form.image_url.trim() || null,
        live_link: form.live_link.trim() || null,
        github_link: form.github_link.trim() || null,
        tech_stack: form.tech_stack.split(",").map((s) => s.trim()).filter(Boolean),
        is_published: form.is_published,
        sort_order: Number(form.sort_order) || 0,
        category: form.category || null,
        project_type: form.project_type,
        thumbnail_url: form.thumbnail_url.trim() || null,
        video_url: form.project_type === "video" ? (form.video_url.trim() || null) : null,
        project_url: form.project_url.trim() || null,
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
      sonner.success("Database Updated Successfully!", { description: "Changes are now live." });
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
      sonner.success("Database Updated Successfully!", { description: "Project deleted — changes are now live." });
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
      const { error } = await supabase.from("site_settings").update(s as never).eq("id", 1);
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
      category: p.category || "",
      project_type: (p.project_type === "video" ? "video" : "image"),
      thumbnail_url: p.thumbnail_url || "",
      video_url: p.video_url || "",
      project_url: p.project_url || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  if (loading || !isAdmin) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: `hsl(${PURPLE_DEEP})` }}
      >
        <Loader2 className="animate-spin" style={{ color: `hsl(${GOLD})` }} />
      </div>
    );
  }

  const allProjects = projects.data ?? [];
  const totalPages = Math.max(1, Math.ceil(allProjects.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedProjects = allProjects.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <main
      className="min-h-screen py-10 px-4"
      style={{
        background: `radial-gradient(1200px 600px at 20% -10%, hsl(${PURPLE_VIBRANT} / 0.18), transparent 60%), hsl(${PURPLE_DEEP})`,
        color: "#fff",
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold" style={{ color: `hsl(${GOLD})` }}>
              Executive Admin Dashboard
            </h1>
            <p className="text-sm mt-1" style={{ color: `hsl(${GOLD_SOFT} / 0.7)` }}>{user?.email}</p>
          </div>
          <Button
            onClick={signOut}
            style={{
              background: "transparent",
              border: `1px solid hsl(${GOLD} / 0.6)`,
              color: `hsl(${GOLD_SOFT})`,
            }}
          >
            <LogOut className="mr-2" />Sign out
          </Button>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList
            className="grid w-full grid-cols-3 max-w-md"
            style={{ background: `hsl(${PURPLE_MID})`, border: `1px solid hsl(${PURPLE_VIBRANT} / 0.4)` }}
          >
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* PROJECTS */}
          <TabsContent value="projects" className="space-y-6 mt-6">
            <Card
              style={{
                background: `linear-gradient(180deg, hsl(${PURPLE_MID} / 0.95), hsl(${PURPLE_DEEP} / 0.95))`,
                border: `1px solid hsl(${GOLD} / 0.5)`,
                boxShadow: `0 0 30px hsl(${GOLD} / 0.15)`,
              }}
            >
              <CardHeader>
                <CardTitle style={{ color: `hsl(${GOLD})` }}>
                  {editing ? "Edit Project" : "Add New Project"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => { e.preventDefault(); saveProject.mutate(); }}
                  className="grid md:grid-cols-2 gap-4"
                >
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-white">Title *</Label>
                    <Input
                      required maxLength={150} value={form.title} style={fieldStyle}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Category</Label>
                    <Select
                      value={form.category || undefined}
                      onValueChange={(v) => setForm({ ...form, category: v })}
                    >
                      <SelectTrigger style={fieldStyle}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent
                        style={{ background: `hsl(${PURPLE_DEEP})`, color: "#fff", border: `1px solid hsl(${PURPLE_VIBRANT} / 0.5)` }}
                      >
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Project Type *</Label>
                    <div
                      className="inline-flex rounded-md p-1 gap-1"
                      style={{ background: `hsl(${PURPLE_DEEP} / 0.6)`, border: `1px solid hsl(${PURPLE_VIBRANT} / 0.5)` }}
                    >
                      {(["image", "video"] as const).map((t) => {
                        const active = form.project_type === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm({ ...form, project_type: t })}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wide transition-colors"
                            style={{
                              background: active ? `hsl(${GOLD})` : "transparent",
                              color: active ? "#1a0b2e" : "#fff",
                            }}
                          >
                            {t === "image" ? <ImageIcon size={14} /> : <VideoIcon size={14} />}
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Thumbnail URL</Label>
                    <Input
                      placeholder="https://..." maxLength={500} value={form.thumbnail_url} style={fieldStyle}
                      onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Image URL</Label>
                    <Input
                      placeholder="https://..." maxLength={500} value={form.image_url} style={fieldStyle}
                      onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    />
                  </div>

                  {form.project_type === "video" && (
                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-white">Video URL * (MP4, YouTube, or Vimeo)</Label>
                      <Input
                        required={form.project_type === "video"}
                        placeholder="https://youtube.com/watch?v=... or https://vimeo.com/... or https://.../video.mp4"
                        maxLength={500}
                        value={form.video_url}
                        style={fieldStyle}
                        onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-white">Project URL (live)</Label>
                    <Input
                      placeholder="https://..." maxLength={500} value={form.project_url} style={fieldStyle}
                      onChange={(e) => setForm({ ...form, project_url: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">GitHub link</Label>
                    <Input
                      maxLength={500} value={form.github_link} style={fieldStyle}
                      onChange={(e) => setForm({ ...form, github_link: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-white">Description *</Label>
                    <Textarea
                      required rows={3} maxLength={2000} value={form.description} style={fieldStyle}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Tech stack (comma-separated)</Label>
                    <Input
                      maxLength={500} value={form.tech_stack} style={fieldStyle}
                      onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Sort order</Label>
                    <Input
                      type="number" value={form.sort_order} style={fieldStyle}
                      onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      checked={form.is_published}
                      onCheckedChange={(v) => setForm({ ...form, is_published: v })}
                    />
                    <Label className="text-white">Published</Label>
                  </div>

                  <div className="md:col-span-2 flex gap-3">
                    <Button
                      type="submit"
                      disabled={saveProject.isPending}
                      style={{
                        background: `linear-gradient(135deg, hsl(${GOLD}), hsl(38 100% 50%))`,
                        color: "#1a0b2e",
                        fontWeight: 700,
                        boxShadow: `0 0 20px hsl(${GOLD} / 0.5)`,
                      }}
                    >
                      {saveProject.isPending ? <Loader2 className="animate-spin" /> : <Plus />}
                      {editing ? "Update Project" : "Create Project"}
                    </Button>
                    {editing && (
                      <Button
                        type="button"
                        onClick={() => { setEditing(null); setForm(blankProject); }}
                        style={{
                          background: "transparent",
                          border: `1px solid hsl(${PURPLE_VIBRANT})`,
                          color: "#fff",
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Live data list */}
            <div className="grid gap-4">
              {pagedProjects.map((p) => (
                <Card
                  key={p.id}
                  style={{
                    background: `hsl(${PURPLE_MID} / 0.85)`,
                    border: `1px solid hsl(${PURPLE_VIBRANT} / 0.45)`,
                  }}
                >
                  <CardContent className="pt-6 flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-display font-semibold text-white">{p.title}</h3>
                        {p.category && (
                          <Badge
                            variant="outline"
                            style={{ borderColor: `hsl(${GOLD} / 0.6)`, color: `hsl(${GOLD_SOFT})`, background: "transparent" }}
                          >
                            {p.category}
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          style={{ borderColor: `hsl(${PURPLE_VIBRANT})`, color: "#fff", background: `hsl(${PURPLE_VIBRANT} / 0.2)` }}
                        >
                          {p.project_type === "video" ? "Video" : "Image"}
                        </Badge>
                        {!p.is_published && (
                          <Badge variant="outline" style={{ color: "#fbbf24", borderColor: "#fbbf24" }}>Hidden</Badge>
                        )}
                      </div>
                      <p className="text-sm text-white/75 line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {p.tech_stack.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: `hsl(${PURPLE_VIBRANT} / 0.2)`, color: "#fff", border: `1px solid hsl(${PURPLE_VIBRANT} / 0.5)` }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => startEdit(p)}
                        style={{
                          background: "transparent",
                          border: `1px solid hsl(${GOLD} / 0.6)`,
                          color: `hsl(${GOLD_SOFT})`,
                        }}
                      >
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setConfirmDelete(p)}
                        style={{ background: "#7f1d1d", color: "#fff", border: "1px solid #b91c1c" }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {allProjects.length === 0 && !projects.isLoading && (
                <p className="text-sm text-white/60 text-center py-6">No projects yet — add one above.</p>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Button
                    size="sm"
                    disabled={safePage <= 1}
                    onClick={() => setPage(safePage - 1)}
                    style={{ background: "transparent", border: `1px solid hsl(${GOLD} / 0.6)`, color: `hsl(${GOLD_SOFT})` }}
                  >
                    Prev
                  </Button>
                  <span className="text-sm text-white/80">
                    Page {safePage} of {totalPages}
                  </span>
                  <Button
                    size="sm"
                    disabled={safePage >= totalPages}
                    onClick={() => setPage(safePage + 1)}
                    style={{ background: "transparent", border: `1px solid hsl(${GOLD} / 0.6)`, color: `hsl(${GOLD_SOFT})` }}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* REVIEWS */}
          <TabsContent value="reviews" className="space-y-4 mt-6">
            {testimonials.isLoading && (
              <div className="text-sm text-white/70 flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" /> Loading reviews…
              </div>
            )}
            {testimonials.isError && (
              <p className="text-sm text-red-400">Failed to load reviews. Please refresh.</p>
            )}
            {testimonials.data?.length === 0 && (
              <p className="text-sm text-white/60">No reviews yet.</p>
            )}
            {testimonials.data?.map((t) => (
              <Card
                key={t.id}
                style={{ background: `hsl(${PURPLE_MID} / 0.85)`, border: `1px solid hsl(${PURPLE_VIBRANT} / 0.45)` }}
              >
                <CardContent className="pt-6 flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-semibold text-white">{t.client_name}</h3>
                      <span className="text-xs text-white/60">· {t.country || "—"} · {t.service_provided}</span>
                      {t.is_approved
                        ? <Badge style={{ background: `hsl(${GOLD} / 0.15)`, color: `hsl(${GOLD_SOFT})`, border: `1px solid hsl(${GOLD} / 0.6)` }} variant="outline">Approved</Badge>
                        : <Badge variant="outline" style={{ color: "#fbbf24", borderColor: "#fbbf24" }}>Pending</Badge>}
                    </div>
                    <div className="flex gap-0.5 my-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className={i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-white/30"} />
                      ))}
                    </div>
                    <p className="text-sm text-white/75">"{t.feedback_text}"</p>
                    {t.client_email && <p className="text-xs text-white/50 mt-1">{t.client_email}</p>}
                  </div>
                  <div className="flex flex-col items-stretch gap-2 min-w-[120px]">
                    {!t.is_approved ? (
                      <Button
                        size="sm"
                        onClick={() => toggleApprove.mutate({ id: t.id, is_approved: true })}
                        style={{ background: `linear-gradient(135deg, hsl(${GOLD}), hsl(38 100% 50%))`, color: "#1a0b2e", fontWeight: 700 }}
                      >
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => toggleApprove.mutate({ id: t.id, is_approved: false })}
                        style={{ background: "transparent", border: `1px solid hsl(${GOLD} / 0.6)`, color: `hsl(${GOLD_SOFT})` }}
                      >
                        Unapprove
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={() => { if (confirm("Delete review?")) deleteTestimonial.mutate(t.id); }}
                      style={{ background: "#7f1d1d", color: "#fff", border: "1px solid #b91c1c" }}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* SETTINGS */}
          <TabsContent value="settings" className="mt-6">
            <Card
              style={{
                background: `linear-gradient(180deg, hsl(${PURPLE_MID} / 0.95), hsl(${PURPLE_DEEP} / 0.95))`,
                border: `1px solid hsl(${GOLD} / 0.5)`,
              }}
            >
              <CardHeader><CardTitle style={{ color: `hsl(${GOLD})` }}>Contact info</CardTitle></CardHeader>
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
                        <Label className="text-white">{label}</Label>
                        <Input
                          name={k}
                          defaultValue={(settings.data as unknown as Record<string, string | null>)[k] ?? ""}
                          style={fieldStyle}
                        />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <Button
                        type="submit"
                        disabled={saveSettings.isPending}
                        style={{
                          background: `linear-gradient(135deg, hsl(${GOLD}), hsl(38 100% 50%))`,
                          color: "#1a0b2e",
                          fontWeight: 700,
                        }}
                      >
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

      {/* Delete confirmation modal */}
      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent
          style={{
            background: `hsl(${PURPLE_DEEP})`,
            border: `1px solid hsl(${GOLD} / 0.6)`,
            color: "#fff",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: `hsl(${GOLD})` }}>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/75">
              "{confirmDelete?.title}" will be permanently removed from the live portfolio. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              style={{ background: "transparent", border: `1px solid hsl(${PURPLE_VIBRANT})`, color: "#fff" }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirmDelete) deleteProject.mutate(confirmDelete.id);
                setConfirmDelete(null);
              }}
              style={{ background: "#b91c1c", color: "#fff" }}
            >
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default AdminPanel;
