import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  HeartPulse,
  BrainCircuit,
  Orbit,
  Radio,
  ShieldAlert,
  Bell,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useHealth } from '../../../contexts/HealthContext';

export const UserLayout: React.FC = () => {
  const { currentUser, logout, selectedAnatomicalProfile, setAnatomicalProfile, allAstronauts, loginUser } = useAuth();
  const { alerts } = useHealth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', path: '/overview', icon: Activity },
    { name: 'Vital Readings', path: '/vitals', icon: HeartPulse },
    { name: 'Earth Baseline', path: '/earth-baseline', icon: BrainCircuit },
    { name: 'Predicted Space Baseline', path: '/predicted-space-baseline', icon: Orbit },
    { name: 'Space Monitoring', path: '/space-monitoring', icon: Radio },
    { name: 'Five Hazards', path: '/hazards', icon: ShieldAlert },
    { name: 'Alerts', path: '/alerts', icon: Bell, badge: alerts.length },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Profile', path: '/profile', icon: User }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col">
      {/* Top Fixed Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border-subtle shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-secondary-text hover:text-deep-navy rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/overview" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary-blue flex items-center justify-center text-white shadow-sm shadow-primary-blue/30">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-wider text-deep-navy leading-none">NORELIS</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-primary-blue border border-blue-200">
                    ASTRONAUT
                  </span>
                </div>
                <span className="text-[10px] text-secondary-text hidden sm:inline">Human Health Intelligence</span>
              </div>
            </Link>
          </div>

          {/* Right Header: Backend Indicator, Anatomical Model Pill & User Dropdown */}
          <div className="flex items-center gap-3">
            {/* Backend API Connection Indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-status-success font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
              <span>API :8000 ONLINE</span>
            </div>

            {/* Quick Model Toggle */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-bg-subtle border border-border-subtle text-xs">
              <button
                onClick={() => setAnatomicalProfile('female')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  selectedAnatomicalProfile === 'female'
                    ? 'bg-white text-primary-blue shadow-sm'
                    : 'text-secondary-text hover:text-deep-navy'
                }`}
              >
                Female 3D
              </button>
              <button
                onClick={() => setAnatomicalProfile('male')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  selectedAnatomicalProfile === 'male'
                    ? 'bg-white text-primary-blue shadow-sm'
                    : 'text-secondary-text hover:text-deep-navy'
                }`}
              >
                Male 3D
              </button>
            </div>

            {/* Astronaut Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 rounded-xl bg-white border border-border-subtle hover:border-gray-300 transition-colors shadow-sm text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-primary-blue font-bold flex items-center justify-center text-xs">
                  {currentUser?.name.charAt(0) || 'A'}
                </div>
                <div className="hidden md:block leading-tight">
                  <p className="text-xs font-bold text-deep-navy truncate max-w-[120px]">{currentUser?.name}</p>
                  <p className="text-[10px] text-secondary-text font-mono">{currentUser?.id} • {currentUser?.baselineStatus}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-secondary-text" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-border-subtle shadow-elevated p-2 z-50">
                  <div className="p-3 border-b border-border-subtle mb-1">
                    <p className="text-xs font-bold text-deep-navy">{currentUser?.name}</p>
                    <p className="text-[11px] text-secondary-text">{currentUser?.missionName}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-status-success" />
                      <span className="text-[10px] font-semibold text-status-success uppercase">
                        {currentUser?.baselineStatus} Baseline
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="px-3 py-1 text-[10px] font-bold text-secondary-text uppercase tracking-wider">
                      Switch Crew Profile
                    </p>
                    {allAstronauts.map(astro => (
                      <button
                        key={astro.id}
                        onClick={() => {
                          loginUser(astro.id);
                          setUserDropdownOpen(false);
                        }}
                        className={`w-full p-2 rounded-xl text-left text-xs flex items-center justify-between transition-colors ${
                          astro.id === currentUser?.id ? 'bg-blue-50 text-primary-blue font-bold' : 'hover:bg-bg-subtle text-deep-navy'
                        }`}
                      >
                        <span>{astro.name}</span>
                        <span className="text-[10px] font-mono text-secondary-text">{astro.id}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 mt-2 border-t border-border-subtle">
                    <button
                      onClick={handleLogout}
                      className="w-full p-2 text-left text-xs font-semibold text-status-critical hover:bg-red-50 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout with Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-primary-blue text-white shadow-sm shadow-primary-blue/30'
                        : 'text-secondary-text hover:text-deep-navy hover:bg-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-deep-navy">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            {/* Quick Admin Portal Link */}
            <div className="pt-6 mt-6 border-t border-border-subtle">
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-deep-navy bg-white hover:bg-bg-subtle border border-border-subtle transition-colors shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-primary-blue" />
                <span>Admin Flight Console</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 bg-white border-b border-border-subtle shadow-elevated p-4 z-30 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold ${
                      isActive
                        ? 'bg-primary-blue text-white'
                        : 'text-secondary-text hover:bg-bg-subtle'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-deep-navy">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        )}

        {/* Main Routed Content Area */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-border-subtle bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary-text">
          <div className="flex items-center gap-2">
            <span className="font-bold text-deep-navy">NORELIS</span>
            <span>• Personalized Human Health Intelligence</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Demonstration Data Platform</span>
            <span>•</span>
            <span>NASA Human Research Program (HRP) Inspired</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
