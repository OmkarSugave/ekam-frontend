import { useEffect, useState } from "react";
import api from "../api/api";

export default function PlayerSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/players/my-schedule");
        setSchedule(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load schedule");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="p-6">Loading schedule…</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Schedule</h1>

      <div className="bg-white p-4 rounded shadow space-y-3">
        {schedule.length === 0 && (
          <p className="text-gray-500">No schedule assigned</p>
        )}

        {schedule.map((s) => (
          <div
            key={s._id}
            className="border p-4 rounded space-y-1"
          >
            <p className="font-semibold">Day: {s.day}</p>
            <p className="text-sm">Time: {s.time}</p>

            {s.goal && (
              <p className="text-sm text-gray-600">
                Goal: {s.goal}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
