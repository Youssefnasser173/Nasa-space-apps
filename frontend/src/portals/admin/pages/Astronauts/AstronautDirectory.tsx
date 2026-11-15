import React, { useState, useMemo } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, ArrowRight, UserPlus, CheckCircle2, AlertCircle } from 'lucide-react';

export const AstronautDirectory: React.FC = () => {
  const { allAstronauts } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [baselineFilter, setBaselineFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'id' | 'name' | 'missionDays'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = useMemo(() => {
    return allAstronauts.filter(a => {
      const matchSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || a.missionStatus === statusFilter;
      const matchBaseline = baselineFilter === 'all' || a.baselineStatus === baselineFilter;
      return matchSearch && matchStatus && matchBaseline;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'id') comparison = a.id.localeCompare(b.id);
      else if (sortBy === 'name') comparison = a.name.localeCompare(b.name);
      else if (sortBy === 'missionDays') comparison = a.missionDays - b.missionDays;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [allAstronauts, searchTerm, statusFilter, baselineFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSort = (field: 'id' | 'name' | 'missionDays') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <h1 className="text-2xl font-black text-deep-navy tracking-tight">
            ASTRONAUT FLIGHT CREW DIRECTORY
          </h1>
          <p className="text-xs text-secondary-text mt-0.5">
            Complete registry of all registered exploration crew members and their physiological baseline records.
          </p>
        </div>

        <Link
          to="/signup"
          className="px-4 py-2 rounded-xl bg-primary-blue text-white text-xs font-bold hover:bg-bright-blue transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register New Crew Member</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="norelis-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-secondary-text absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Name or Astronaut ID..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-border-subtle bg-bg-subtle focus:bg-white focus:outline-none focus:border-primary-blue"
          />
        </div>

        {/* Filters and Sorters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-secondary-text text-[11px] font-semibold">Mission:</span>
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-2.5 py-1.5 rounded-lg border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:outline-none"
            >
              <option value="all">All Missions</option>
              <option value="in_flight">In Flight</option>
              <option value="pre_mission">Pre-Mission</option>
              <option value="lunar_orbit">Lunar Orbit</option>
              <option value="post_mission">Post-Mission</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-secondary-text text-[11px] font-semibold">Baseline:</span>
            <select
              value={baselineFilter}
              onChange={e => { setBaselineFilter(e.target.value); setCurrentPage(1); }}
              className="px-2.5 py-1.5 rounded-lg border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:outline-none"
            >
              <option value="all">All States</option>
              <option value="validated">Validated</option>
              <option value="provisional">Provisional</option>
              <option value="insufficient">Insufficient</option>
            </select>
          </div>

          <button
            onClick={() => toggleSort('name')}
            className="px-2.5 py-1.5 rounded-lg border border-border-subtle bg-bg-subtle hover:bg-gray-200 text-xs text-deep-navy font-semibold flex items-center gap-1 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort</span>
          </button>
        </div>
      </div>

      {/* Directory Table */}
      <div className="norelis-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg-subtle text-secondary-text text-[10px] uppercase border-b border-border-subtle">
              <tr>
                <th className="py-3 px-4 cursor-pointer hover:text-deep-navy" onClick={() => toggleSort('id')}>
                  Astronaut ID
                </th>
                <th className="py-3 px-4 cursor-pointer hover:text-deep-navy" onClick={() => toggleSort('name')}>
                  Name & Bio
                </th>
                <th className="py-3 px-4">Mission Status</th>
                <th className="py-3 px-4">3D Anatomical Model</th>
                <th className="py-3 px-4">Baseline Status</th>
                <th className="py-3 px-4">Active Alerts</th>
                <th className="py-3 px-4 text-right">Surgeon View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {paginated.length > 0 ? (
                paginated.map(astro => (
                  <tr key={astro.id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-primary-blue">
                      {astro.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-deep-navy text-sm block">{astro.name}</span>
                        <span className="text-[11px] text-secondary-text">
                          {astro.age}y • {astro.sex} • {astro.heightCm}cm / {astro.massKg}kg
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="capitalize font-semibold text-deep-navy block">
                        {astro.missionStatus.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-secondary-text">{astro.missionName}</span>
                    </td>

                    <td className="py-3.5 px-4 capitalize font-mono text-secondary-text">
                      <span className="px-2 py-0.5 rounded bg-bg-subtle border border-border-subtle text-[11px]">
                        {astro.anatomicalProfile}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        astro.baselineStatus === 'validated'
                          ? 'bg-emerald-50 text-status-success border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {astro.baselineStatus}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {astro.activeAlertsCount > 0 ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          {astro.activeAlertsCount} Alerts
                        </span>
                      ) : (
                        <span className="text-secondary-text text-[11px]">Nominal</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/admin/astronauts/${astro.id}`}
                        className="px-3 py-1.5 rounded-lg bg-deep-navy text-white hover:bg-slate-800 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-secondary-text">
                    No astronauts matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-bg-subtle border-t border-border-subtle flex items-center justify-between text-xs text-secondary-text">
          <span>
            Showing {paginated.length} of {filtered.length} crew profiles
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg bg-white border border-border-subtle hover:bg-gray-100 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="font-mono text-deep-navy">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg bg-white border border-border-subtle hover:bg-gray-100 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
