export default function Card({ children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      {children}
    </div>
  );
}
