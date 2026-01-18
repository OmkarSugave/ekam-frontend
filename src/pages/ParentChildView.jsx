import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";

export default function ParentChildView() {
  const { id } = useParams();
  const [child, setChild] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/players/child/${id}`);
      setChild(res.data);
    })();
  }, []);

  if (!child) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-5">
      <h1 className="text-2xl font-bold">Child Summary</h1>

      <div className="bg-white p-4 shadow rounded space-y-2">
        <p className="font-semibold">{child.user.name}</p>
        <p>Branch: {child.branch?.name}</p>
        <p>Batch: {child.batch?.name}</p>
        <p>Coach: {child.assignedCoach?.user?.name}</p>
      </div>

      <a
        href={`/report/player/${child._id}`}
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
      >
        View Progress Report
      </a>
    </div>
  );
}
