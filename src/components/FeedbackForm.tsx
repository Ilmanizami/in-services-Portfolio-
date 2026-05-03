import { useState } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { Star, Loader2, MessageSquareHeart } from "lucide-react";

const services = [
  "3D Animation", "2D Animation", "3D Modeling", "Graphic Design",
  "Thumbnail Creation", "Wedding Cards & Stationery", "Portfolio Web Development",
  "CV / Resume Design", "Project Management", "Tool Services",
  "AI Art & Illustration", "Motion Graphics", "Video Editing", "Other",
];

const schema = z.object({
  client_name: z.string().trim().min(1).max(100),
  client_email: z.string().trim().email().max(255).optional().or(z.literal("")),
  service_provided: z.string().min(1).max(100),
  client_type: z.enum(["Project-based", "Permanent/Retainer"]),
  duration: z.string().trim().min(1).max(50),
  rating: z.number().min(1).max(5),
  feedback_text: z.string().trim().min(10).max(1000),
});

const FeedbackForm = () => {
  const [form, setForm] = useState({
    client_name: "", client_email: "", service_provided: "",
    client_type: "" as "" | "Project-based" | "Permanent/Retainer",
    duration: "", rating: 0, feedback_text: "",
  });
  const [hover, setHover] = useState(0);
  const { toast } = useToast();

  const submit = useMutation({
    mutationFn: async () => {
      const parsed = schema.safeParse(form);
      if (!parsed.success) throw new Error(parsed.error.issues[0].message);
      const payload = { ...parsed.data, client_email: parsed.data.client_email || null, is_approved: false };
      const { error } = await supabase.from("testimonials").insert(payload);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Thank you!", description: "Your feedback was submitted and will appear after approval." });
      setForm({ client_name: "", client_email: "", service_provided: "", client_type: "", duration: "", rating: 0, feedback_text: "" });
    },
    onError: (e: Error) => toast({ title: "Could not submit", description: e.message, variant: "destructive" }),
  });

  return (
    <section id="feedback" className="py-24 relative overflow-hidden">
      <div className="floating-orb w-72 h-72 bg-accent right-0 top-20" />
      <div className="container mx-auto px-4 relative z-10 max-w-2xl">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <MessageSquareHeart className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">Share your experience</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Leave a <span className="text-gradient">Review</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Worked with me? I'd love to hear your honest feedback.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <form
            onSubmit={(e) => { e.preventDefault(); submit.mutate(); }}
            className="oval-glow rounded-3xl p-6 md:p-8 bg-white/[0.04] backdrop-blur-xl border border-primary/20 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input required maxLength={100} value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" maxLength={255} value={form.client_email} onChange={(e) => setForm({ ...form, client_email: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Service provided *</Label>
              <Select value={form.service_provided} onValueChange={(v) => setForm({ ...form, service_provided: v })}>
                <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                <SelectContent className="bg-popover">
                  {services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Engagement type *</Label>
                <Select value={form.client_type} onValueChange={(v) => setForm({ ...form, client_type: v as typeof form.client_type })}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="Project-based">Project-based</SelectItem>
                    <SelectItem value="Permanent/Retainer">Permanent / Retainer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duration *</Label>
                <Input
                  required maxLength={50}
                  placeholder="e.g. 10 Days, 6 Months"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Rating *</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setForm({ ...form, rating: n })}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-110"
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  >
                    <Star
                      size={28}
                      className={n <= (hover || form.rating) ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" : "text-muted-foreground/40"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Your feedback *</Label>
              <Textarea required rows={4} maxLength={1000} value={form.feedback_text} onChange={(e) => setForm({ ...form, feedback_text: e.target.value })} placeholder="Tell us about your experience…" />
              <p className="text-xs text-muted-foreground text-right">{form.feedback_text.length}/1000</p>
            </div>

            <Button type="submit" disabled={submit.isPending || !form.rating || !form.service_provided || !form.client_type || !form.duration} className="w-full">
              {submit.isPending && <Loader2 className="animate-spin" />}
              Submit Review
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Your review will appear publicly after approval.
            </p>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeedbackForm;
