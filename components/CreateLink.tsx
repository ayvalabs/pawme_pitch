"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateLink({ adminKey }: { adminKey?: string }) {
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const [lastUrl, setLastUrl] = useState("");
  const router = useRouter();

  const create = async () => {
    if (!label.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/share/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: label.trim(), key: adminKey }),
      });
      const data = await res.json();
      if (data.id) {
        const url = `${window.location.origin}/?s=${data.id}`;
        setLastUrl(url);
        navigator.clipboard?.writeText(url).catch(() => {});
        setLabel("");
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && create()}
          placeholder="Recipient / campaign name (e.g. ARKN Ventures)"
          className="flex-1 rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500"
        />
        <button
          onClick={create}
          disabled={busy}
          className="rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold px-5 py-2.5 disabled:opacity-50"
        >
          {busy ? "Creating…" : "Create link"}
        </button>
      </div>
      {lastUrl && (
        <div className="text-sm text-emerald-400">
          ✓ Copied to clipboard: <span className="font-mono text-white">{lastUrl}</span>
        </div>
      )}
    </div>
  );
}
