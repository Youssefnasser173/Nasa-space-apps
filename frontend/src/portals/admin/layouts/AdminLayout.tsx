import React from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Users,
  Activity,
  AlertTriangle,
  FileText,
  LogOut,
  LayoutDashboard,
  UserCheck,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export const AdminLayout: React.FC = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Surgeon Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Astronaut Directory', path: '/admin/astronauts', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-deep-navy text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-bright-blue flex items-center justify-center text-white shadow-sm">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-wider text-white">NORELIS</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-blue-200">
                    FLIGHT SURGEON CONSOLE
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 hidden sm:inline">NASA HRP Medical Monitoring Console</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/overview"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors hidden sm:flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5 text-blue-300" />
              <span>Astronaut Portal View</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors flex items-center gap-1.5 font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Surgeon Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-border-subtle shadow-sm overflow-x-auto text-xs font-semibold">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-deep-navy text-white shadow-sm'
                      : 'text-secondary-text hover:text-deep-navy hover:bg-bg-subtle'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Admin Footer */}
      <footer className="mt-auto border-t border-border-subtle bg-white py-4 text-center text-xs text-secondary-text">
        NORELIS Clinical Flight Surgeon Administration Console • NASA Space Apps 2026
      </footer>
    </div>
  );
};
