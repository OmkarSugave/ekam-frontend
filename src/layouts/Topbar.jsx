export default function Topbar() {
  return (
    <div style={{
      background: "white",
      padding: "14px 24px",
      borderBottom: "1px solid #ddd",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <strong>Dashboard</strong>
      <button>Logout</button>
    </div>
  );
}
