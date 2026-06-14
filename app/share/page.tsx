import { db } from "@/lib/firebase-admin";
import CreateLink from "@/components/CreateLink";

export const dynamic = "force-dynamic";

function Locked() {
  return (
    <div className="min-h-screen bg-[#0a0a14] text-white flex items-center justify-center">
      <p className="text-white/50">Unauthorized — append <span className="font-mono">?key=YOUR_ADMIN_KEY</span></p>
    </div>
  );
}

export default async function SharePage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const sp = await searchParams;
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) return <Locked />;

  const linksSnap = await db.collection("links").orderBy("createdAt", "desc").get();
  const links = linksSnap.docs.map((d) => d.data() as { id: string; label: string; opens?: number; createdAt: string });

  // count sessions per share link
  const sessSnap = await db.collection("sessions").get();
  const sessByShare: Record<string, number> = {};
  sessSnap.docs.forEach((d) => {
    const s = d.data().shareId as string;
    if (s) sessByShare[s] = (sessByShare[s] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">🔗 Share links</h1>
          <a href={`/stats?key=${sp.key || ""}`} className="text-amber-400 text-sm hover:underline">View stats →</a>
        </div>
        <p className="text-white/50 text-sm mb-8">
          Create a unique link per recipient. Every visit + per-slide time is attributed to that link.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5 mb-8">
          <CreateLink adminKey={sp.key} />
        </div>

        <div className="rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Recipient</th>
                <th className="px-4 py-3 font-medium">Link</th>
                <th className="px-4 py-3 font-medium text-right">Opens</th>
                <th className="px-4 py-3 font-medium text-right">Sessions</th>
              </tr>
            </thead>
            <tbody>
              {links.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-6 text-white/40 text-center">No links yet.</td></tr>
              )}
              {links.map((l) => (
                <tr key={l.id} className="border-t border-white/10">
                  <td className="px-4 py-3">{l.label || "—"}</td>
                  <td className="px-4 py-3 font-mono text-amber-300/90">/?s={l.id}</td>
                  <td className="px-4 py-3 text-right">{l.opens || 0}</td>
                  <td className="px-4 py-3 text-right">{sessByShare[l.id] || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
