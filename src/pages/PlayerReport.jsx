import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";

export default function PlayerReport() {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    (async () => {
      const s = await api.get(`/report/summary/${id}`);
      setSummary(s.data);

      const h = await api.get(`/report/skill-history/${id}`);
      setSkills(h.data);
    })();
  }, []);

  if (!summary || !skills) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Progress Report — {summary.user?.name}
      </h1>

      <div className="bg-white p-4 rounded shadow">
        <p><strong>Branch:</strong> {summary.branch?.name}</p>
        <p><strong>Batch:</strong> {summary.batch?.name}</p>
        <p><strong>Coach:</strong> {summary.assignedCoach?.user?.name}</p>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="text-xl font-semibold">Current Skill Levels</h2>

        <div className="grid md:grid-cols-2 gap-3">
          {summary.skills.map((s, i) => (
            <div key={i} className="border p-3 rounded">
              <p className="font-semibold">{s.skillName}</p>
              <p>Level: {s.level}</p>
              <p className="text-sm text-gray-600">{s.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="text-xl font-semibold">Skill Improvement Timeline</h2>

        <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto">
{JSON.stringify(skills, null, 2)}
        </pre>
      </div>
    </div>
  );
}
