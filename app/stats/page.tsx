import { db } from "@/lib/firebase-admin";
import { slides } from "@/lib/slides";

export const dynamic = "force-dynamic";

function Locked() {
  return (
    <div className="min-h-screen bg-[#0a0a14] text-white flex items-center justify-center">
      <p className="text-white/50">Unauthorized — append <span className="font-mono">?key=YOUR_ADMIN_KEY</span></p>
    </div>
  );
}

type Session = {
  sessionId: string;
  startedAt: string;
  geo?: { city?: string; region?: string; country?: string };
  shareLabel?: string;
  lastSlide?: number;
  completed?: boolean;
  slideTimings?: Record<string, number>;
};

const fmt = (s: number) => (s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`);

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const sp = await searchParams;
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) return <Locked />;

  const snap = await db.collection("sessions").orderBy("startedAt", "desc").get();
  const sessions = snap.docs.map((d) => d.data() as Session);

  const total = sessions.length;
  const completed = sessions.filter((s) => s.completed).length;

  // average time per slide across all sessions
  const sums: Record<number, { total: number; n: number }> = {};
  sessions.forEach((s) => {
    Object.entries(s.slideTimings || {}).forEach(([k, v]) => {
      const n = Number(k.replace("slide_", ""));
      sums[n] = sums[n] || { total: 0, n: 0 };
      sums[n].total += Number(v) || 0;
      sums[n].n += 1;
    });
  });
  const perSlide = slides.map((sl, i) => {
    const id = i + 1;
    const agg = sums[id];
    const avg = agg && agg.n ? Math.round(agg.total / agg.n) : 0;
    return { id, title: sl.title, avg, views: agg?.n || 0 };
  });
  const maxAvg = Math.max(1, ...perSlide.map((p) => p.avg));

  const sessionTotal = (s: Session) =>
    Object.values(s.slideTimings || {}).reduce((a, b) => a + (Number(b) || 0), 0);

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">📊 Deck analytics</h1>
          <a href={`/share?key=${sp.key || ""}`} className="text-amber-400 text-sm hover:underline">Share links →</a>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[["Visitors", String(total)], ["Reached the end", String(completed)], ["Completion", total ? `${Math.round((completed / total) * 100)}%` : "—"]].map(([l, v]) => (
            <div key={l} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-3xl font-bold text-amber-400">{v}</div>
              <div className="text-white/50 text-sm mt-1">{l}</div>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-3">Avg. time per slide</h2>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 mb-10 space-y-2">
          {perSlide.map((p) => (
            <div key={p.id} className="flex items-center gap-3 text-sm">
              <div className="w-44 truncate text-white/70">{p.id}. {p.title}</div>
              <div className="flex-1 h-3 bg-white/10 rounded overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: `${(p.avg / maxAvg) * 100}%` }} />
              </div>
              <div className="w-16 text-right text-white/60">{fmt(p.avg)}</div>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-3">Recent visitors</h2>
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">From link</th>
                <th className="px-4 py-3 font-medium text-right">Reached</th>
                <th className="px-4 py-3 font-medium text-right">Total time</th>
                <th className="px-4 py-3 font-medium text-center">Done</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-6 text-white/40 text-center">No visitors yet.</td></tr>
              )}
              {sessions.slice(0, 100).map((s) => (
                <tr key={s.sessionId} className="border-t border-white/10">
                  <td className="px-4 py-3 text-white/60">{new Date(s.startedAt).toLocaleString()}</td>
                  <td className="px-4 py-3">{[s.geo?.city, s.geo?.country].filter(Boolean).join(", ") || "—"}</td>
                  <td className="px-4 py-3 text-amber-300/90">{s.shareLabel || "—"}</td>
                  <td className="px-4 py-3 text-right">{s.lastSlide || 0} / {slides.length}</td>
                  <td className="px-4 py-3 text-right">{fmt(sessionTotal(s))}</td>
                  <td className="px-4 py-3 text-center">{s.completed ? "✓" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
