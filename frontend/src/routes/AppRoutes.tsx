import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../portals/user/pages/Home/HomePage';
import { LoginPage } from '../portals/user/pages/Auth/LoginPage';
import { SignUpPage } from '../portals/user/pages/Auth/SignUpPage';
import { AdminLoginPage } from '../portals/admin/pages/Login/AdminLoginPage';

// User Portal Layout and Pages
import { UserLayout } from '../portals/user/layouts/UserLayout';
import { OverviewDashboard } from '../portals/user/pages/Overview/OverviewDashboard';
import { VitalReadingsDashboard } from '../portals/user/pages/VitalReadings/VitalReadingsDashboard';
import { EarthBaselineDashboard } from '../portals/user/pages/EarthBaseline/EarthBaselineDashboard';
import { PredictedSpaceBaselineDashboard } from '../portals/user/pages/PredictedSpaceBaseline/PredictedSpaceBaselineDashboard';
import { SpaceMonitoringDashboard } from '../portals/user/pages/SpaceMonitoring/SpaceMonitoringDashboard';
import { FiveHazardsDashboard } from '../portals/user/pages/FiveHazards/FiveHazardsDashboard';
import { AlertsDashboard } from '../portals/user/pages/Alerts/AlertsDashboard';
import { ReportsDashboard } from '../portals/user/pages/Reports/ReportsDashboard';
import { ProfilePage } from '../portals/user/pages/Profile/ProfilePage';

// Admin Portal Layout and Pages
import { AdminLayout } from '../portals/admin/layouts/AdminLayout';
import { AdminDashboard } from '../portals/admin/pages/Overview/AdminDashboard';
import { AstronautDirectory } from '../portals/admin/pages/Astronauts/AstronautDirectory';
import { AdminAstronautProfile } from '../portals/admin/pages/AstronautProfile/AdminAstronautProfile';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* User Astronaut Portal */}
      <Route element={<UserLayout />}>
        <Route path="/overview" element={<OverviewDashboard />} />
        <Route path="/vitals" element={<VitalReadingsDashboard />} />
        <Route path="/earth-baseline" element={<EarthBaselineDashboard />} />
        <Route path="/predicted-space-baseline" element={<PredictedSpaceBaselineDashboard />} />
        <Route path="/space-monitoring" element={<SpaceMonitoringDashboard />} />
        <Route path="/hazards" element={<FiveHazardsDashboard />} />
        <Route path="/alerts" element={<AlertsDashboard />} />
        <Route path="/reports" element={<ReportsDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Admin Flight Surgeon Portal */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/astronauts" element={<AstronautDirectory />} />
        <Route path="/admin/astronauts/:astronautId" element={<AdminAstronautProfile />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
