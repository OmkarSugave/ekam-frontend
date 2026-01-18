import { useEffect, useState } from "react";
import api from "../api/api";

export default function CoachAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await api.get("/staff/analytics/coach");
      setData(res.data);
    })();
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Coach Analytics</h1>

      <div className="bg-white p-4 shadow rounded">
        <p className="font-semibold text-lg">Total Players: {data.playerCount}</p>
        <p>Average Skill Level: {data.avgSkill}</p>
      </div>

      <div className="bg-white p-4 shadow rounded space-y-2">
        <h2 className="font-semibold text-lg">Assigned Players</h2>
        {data.players.map((p) => (
          <p key={p._id}>{p.user?.name}</p>
        ))}
      </div>
    </div>
  );
}
