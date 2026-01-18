// import { useEffect, useState } from "react";
// import api from "../api/api";

// export default function PlayerAssessments() {
//   const [assessments, setAssessments] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const res = await api.get("/players/assessments");
//       setAssessments(res.data);
//     })();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-5">
//       <h1 className="text-2xl font-bold">My Assessments</h1>

//       {assessments.map((a) => (
//         <div key={a._id} className="bg-white p-4 rounded shadow space-y-2">
//           <p className="font-semibold">
//             {new Date(a.date).toLocaleString()}
//           </p>
//           <p className="text-sm">{a.notes}</p>

//           <div className="grid md:grid-cols-2 gap-3">
//             {a.skillProgress.map((s, i) => (
//               <div key={i} className="border p-3 rounded">
//                 <p className="font-semibold">{s.skillName}</p>
//                 <p>Level: {s.level}</p>
//                 <p className="text-sm text-gray-600">
//                   Comment: {s.comments}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
        import { useEffect, useState } from "react";
import api from "../api/api";

export default function PlayerAssessments() {
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/players/dashboard");
      setSkills(res.data.skills);
    };
    load();
  }, []);

  if (!skills) return <p className="p-6">Loading assessments...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-5">
      <h1 className="text-2xl font-bold">My Skill Assessment</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((s, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">{s.skillName}</p>
            <p className="text-sm">
              Level: <span className="font-bold">{s.level}</span>
            </p>
            {s.comment && (
              <p className="text-sm text-gray-600 mt-1">
                Coach Comment: {s.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
