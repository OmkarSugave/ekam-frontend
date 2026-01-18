import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import PlayerDashboard from "./pages/PlayerDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import ParentFees from "./pages/ParentFees";

import BranchManagement from "./pages/BranchManagement";
import BatchManagement from "./pages/BatchManagement";
import StaffManagement from "./pages/StaffManagement";
import PlayerManagement from "./pages/PlayerManagement";
import TournamentManagement from "./pages/TournamentManagement";

import ScheduleManagement from "./pages/ScheduleManagement";
import AttendanceManagement from "./pages/AttendanceManagement";
import AssessmentManagement from "./pages/AssessmentManagement";
import FeesManagement from "./pages/FeesManagement";
import NotificationManagement from "./pages/NotificationManagement";

import PlayerReport from "./pages/PlayerReport";
import CoachAnalytics from "./pages/CoachAnalytics";
import AdminAnalytics from "./pages/AdminAnalytics";

import AccountSettings from "./pages/AccountSettings";

import ProtectRoute from "./components/ProtectRoute";
import MainLayout from "./layouts/MainLayout";

// Player pages (READ-ONLY)
import PlayerAttendance from "./pages/PlayerAttendance";
import PlayerSchedule from "./pages/PlayerSchedule";
import PlayerAssessments from "./pages/PlayerAssessments";
import PlayerNotifications from "./pages/PlayerNotifications";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* ================= PRIVATE (WITH LAYOUT) ================= */}
        <Route element={<MainLayout />}>

          {/* DASHBOARDS */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectRoute>
            }
          />

          <Route
            path="/staff/dashboard"
            element={
              <ProtectRoute roles={["staff"]}>
                <StaffDashboard />
              </ProtectRoute>
            }
          />

          <Route
            path="/player/dashboard"
            element={
              <ProtectRoute roles={["player"]}>
                <PlayerDashboard />
              </ProtectRoute>
            }
          />

          <Route
            path="/parent/dashboard"
            element={
              <ProtectRoute roles={["parent"]}>
                <ParentDashboard />
              </ProtectRoute>
            }
          />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin/branches"
            element={
              <ProtectRoute roles={["admin"]}>
                <BranchManagement />
              </ProtectRoute>
            }
          />

          <Route
            path="/admin/batches"
            element={
              <ProtectRoute roles={["admin"]}>
                <BatchManagement />
              </ProtectRoute>
            }
          />

          <Route
            path="/admin/staff"
            element={
              <ProtectRoute roles={["admin"]}>
                <StaffManagement />
              </ProtectRoute>
            }
          />

          <Route
            path="/admin/players"
            element={
              <ProtectRoute roles={["admin"]}>
                <PlayerManagement />
              </ProtectRoute>
            }
          />

          <Route
            path="/admin/tournaments"
            element={
              <ProtectRoute roles={["admin"]}>
                <TournamentManagement />
              </ProtectRoute>
            }
          />

          <Route
            path="/admin/fees"
            element={
              <ProtectRoute roles={["admin"]}>
                <FeesManagement />
              </ProtectRoute>
            }
          />

          <Route
            path="/admin/analytics"
            element={
              <ProtectRoute roles={["admin"]}>
                <AdminAnalytics />
              </ProtectRoute>
            }
          />

          {/* ================= STAFF / COACH ================= */}
          <Route
            path="/coach/schedule"
            element={
              <ProtectRoute roles={["staff", "admin"]}>
                <ScheduleManagement />
              </ProtectRoute>
            }
          />

          <Route
            path="/coach/attendance"
            element={
              <ProtectRoute roles={["staff", "admin"]}>
                <AttendanceManagement />
              </ProtectRoute>
            }
          />

          <Route
            path="/coach/assessments"
            element={
              <ProtectRoute roles={["staff", "admin"]}>
                <AssessmentManagement />
              </ProtectRoute>
            }
          />

          <Route
            path="/coach/analytics"
            element={
              <ProtectRoute roles={["staff", "admin"]}>
                <CoachAnalytics />
              </ProtectRoute>
            }
          />

          {/* ================= SHARED ================= */}
          <Route
            path="/admin/notifications"
            element={
              <ProtectRoute roles={["admin", "staff"]}>
                <NotificationManagement />
              </ProtectRoute>
            }
          />

          <Route
            path="/report/player/:id"
            element={
              <ProtectRoute roles={["admin", "staff", "parent", "player"]}>
                <PlayerReport />
              </ProtectRoute>
            }
          />

          <Route
            path="/account/settings"
            element={
              <ProtectRoute roles={["admin", "staff", "player", "parent"]}>
                <AccountSettings />
              </ProtectRoute>
            }
          />

          <Route
            path="/parent/fees"
            element={
              <ProtectRoute roles={["parent"]}>
                <ParentFees />
              </ProtectRoute>
            }
          />

        </Route>
       <Route
  path="/players/assessments"
  element={
    <ProtectRoute roles={["player"]}>
      <PlayerAssessments />
    </ProtectRoute>
  }
/>
<Route
  path="/players/attendance"
  element={
    <ProtectRoute roles={["player"]}>
      <PlayerAttendance />
    </ProtectRoute>
  }
/>
<Route
  path="/players/schedule"
  element={
    <ProtectRoute roles={["player"]}>
      <PlayerSchedule />
    </ProtectRoute>
  }
/>
<Route
  path="/players/notifications"
  element={
    <ProtectRoute roles={["player"]}>
      <PlayerNotifications />
    </ProtectRoute>
  }
/>


      </Routes>
    </BrowserRouter>
  );
}
