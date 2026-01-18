import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: 220,
      background: "#1e3a8a",
      color: "white",
      padding: 20
    }}>
      <h3>EKAM</h3>
      <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Link style={linkStyle} to="/admin">Dashboard</Link>
        <Link style={linkStyle} to="/admin/players">Players</Link>
        <Link style={linkStyle} to="/admin/staff">Staff</Link>
        <Link style={linkStyle} to="/admin/fees">Fees</Link>
      </nav>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: 16
};
