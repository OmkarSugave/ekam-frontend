import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, background: "#f4f6f8" }}>
        <Topbar />
        <div style={{ padding: "24px" }}>{children}</div>
      </div>
    </div>
  );
}
