import { useState, useEffect } from 'react';
import { X, ShieldCheck, Sparkles, TrendingUp, DollarSign, Award, Clock, Star, LineChart, BarChart2, Shield } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PASSKEY = 'zencapital2026';

const mockPositions = [
  { id: 'EQ-801', ticker: 'MSFT', name: 'Microsoft Corp', roic: '32.4%', fcfYield: '3.8%', moat: 'Wide (Platform)', allocation: '$3,800,000', weight: '26.8%' },
  { id: 'EQ-802', ticker: 'GOOGL', name: 'Alphabet Inc', roic: '28.1%', fcfYield: '4.2%', moat: 'Wide (Network)', allocation: '$3,100,000', weight: '21.8%' },
  { id: 'EQ-803', ticker: 'ASML', name: 'ASML Holding', roic: '44.8%', fcfYield: '2.9%', moat: 'Monopoly (EUV)', allocation: '$2,750,000', weight: '19.4%' },
  { id: 'EQ-804', ticker: 'V', name: 'Visa Inc', roic: '48.2%', fcfYield: '3.6%', moat: 'Duopoly (Rail)', allocation: '$2,450,000', weight: '17.3%' },
  { id: 'EQ-805', ticker: 'NVDA', name: 'Nvidia Corp', roic: '62.5%', fcfYield: '3.1%', moat: 'Wide (Compute)', allocation: '$2,100,000', weight: '14.7%' },
];

const mockLpCalls = [
  { mandate: 'Vanguard Alpha Fund I', lp: 'Sovereign Heritage Trust', called: '$5,000,000', uncalled: '$15,000,000', netIrr: '24.8%' },
  { mandate: 'High ROIC Compounders LP', lp: 'Genevieve Sterling Office', called: '$3,500,000', uncalled: '$6,500,000', netIrr: '28.2%' },
];

const metrics = [
  { label: 'Portfolio AUM', value: '$14,200,000', icon: DollarSign, color: 'text-emerald-400' },
  { label: 'Weighted ROIC', value: '41.2%', icon: TrendingUp, color: 'text-blue-400' },
  { label: 'Average FCF Yield', value: '3.52%', icon: BarChart2, color: 'text-amber-400' },
  { label: 'Capital Preservation', value: 'AAA Moat Standard', icon: Award, color: 'text-yellow-400' },
];

export default function AdminPortalModal({ isOpen, onClose }: AdminPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'positions' | 'lp' | 'supabase'>('overview');
  const [passkey, setPasskey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAuthenticated(false);
      setPasskey('');
      setAuthError('');
      setActiveTab('overview');
    }
  }, [isOpen]);

  const handleAuth = () => {
    if (passkey === PASSKEY) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passkey. Click the auto-fill button below.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#09090b] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#0c0c0e]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-sm font-bold">
              ZEN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-bold">ZEN CAPITAL OS</span>
                <span className="text-xs font-semibold tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">v1.0.0 VIP</span>
              </div>
              <p className="text-base text-zinc-200 leading-relaxed">Institutional FCF &amp; ROIC Capital Allocator Terminal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {!authenticated ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-medium text-xl text-white">Quant Portfolio Terminal Gate</h3>
              <p className="text-base text-zinc-200 leading-relaxed leading-relaxed">
                Enter your administrative key to view institutional capital allocation schedules, discounted cash flow ledgers, and LP commitments.
              </p>
            </div>

            <div className="w-full space-y-3">
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                placeholder="Enter passkey (e.g. zencapital2026)"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-center text-sm focus:outline-none focus:border-blue-400 placeholder-zinc-600"
              />
              {authError && <p className="text-xs text-rose-400 font-mono">{authError}</p>}
              <button
                onClick={handleAuth}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-all cursor-pointer"
              >
                Authenticate Quant Gate
              </button>
              <button
                type="button"
                onClick={() => {
                  setPasskey(PASSKEY);
                  setAuthenticated(true);
                  setAuthError('');
                }}
                className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-blue-500/40 text-blue-400 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                [ AUTO-FILL DEMO PASS: zencapital2026 ]
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex items-center gap-2 px-6 pt-4 border-b border-zinc-800 bg-[#0c0c0e]/50 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-zinc-800/80 text-blue-400 border-b-2 border-blue-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Quant Telemetry
              </button>
              <button
                onClick={() => setActiveTab('positions')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'positions'
                    ? 'bg-zinc-800/80 text-blue-400 border-b-2 border-blue-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Core Holdings (5)
              </button>
              <button
                onClick={() => setActiveTab('lp')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'lp'
                    ? 'bg-zinc-800/80 text-blue-400 border-b-2 border-blue-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                LP Commitments (2)
              </button>
              <button
                onClick={() => setActiveTab('supabase')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'supabase'
                    ? 'bg-zinc-800/80 text-blue-400 border-b-2 border-blue-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Supabase Engine
              </button>
            </div>

            {/* Tab Panels */}
            <div className="p-6 overflow-y-auto space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* KPI Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold tracking-wider font-mono text-zinc-400 uppercase tracking-wider">{m.label}</span>
                          <m.icon className={`w-4 h-4 ${m.color}`} />
                        </div>
                        <p className="text-xl font-bold font-mono text-white">{m.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Sanctuary Live Status Card */}
                  <div className="p-5 rounded-xl bg-gradient-to-r from-blue-950/20 via-zinc-900 to-zinc-900 border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-xs text-blue-400 font-semibold uppercase tracking-wider">COMPOUNDING ENGINE: VERIFIED</span>
                      </div>
                      <p className="text-xs text-zinc-300">Net portfolio FCF generation exceeds $498,000 annualized with zero debt exposure.</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 font-mono text-xs text-zinc-300">
                      Debt / Equity: 0.00x
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'positions' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">Moat &amp; High-ROIC Holdings</h4>
                    <span className="text-xs text-blue-400 font-mono">5 High-Conviction Core Positions</span>
                  </div>
                  <div className="border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-900 text-zinc-400 font-mono uppercase text-xs font-semibold tracking-wider border-b border-zinc-800">
                        <tr>
                          <th className="p-3">Ticker</th>
                          <th className="p-3">Company</th>
                          <th className="p-3">ROIC</th>
                          <th className="p-3">FCF Yield</th>
                          <th className="p-3">Competitive Moat</th>
                          <th className="p-3 text-right">Value (Weight)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800 font-mono text-zinc-300">
                        {mockPositions.map((p) => (
                          <tr key={p.id} className="hover:bg-zinc-900/40">
                            <td className="p-3 text-blue-400 font-bold">{p.ticker}</td>
                            <td className="p-3 font-semibold text-white">{p.name}</td>
                            <td className="p-3 text-emerald-400">{p.roic}</td>
                            <td className="p-3 text-zinc-300">{p.fcfYield}</td>
                            <td className="p-3 text-zinc-400">{p.moat}</td>
                            <td className="p-3 text-right font-bold text-white">{p.allocation} ({p.weight})</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'lp' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">LP Capital Commitments</h4>
                    <span className="text-xs text-blue-400 font-mono">2 Active Mandates</span>
                  </div>
                  <div className="space-y-3">
                    {mockLpCalls.map((c, i) => (
                      <div key={i} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <p className="font-semibold text-sm text-white">{c.mandate}</p>
                          <p className="text-xs text-blue-400/90 font-mono">LP: {c.lp}</p>
                          <p className="text-xs font-semibold text-zinc-400">Called: {c.called} &bull; Dry Powder: {c.uncalled}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-base font-bold font-mono text-emerald-400">{c.netIrr} Net IRR</span>
                          <span className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 font-mono text-xs font-semibold tracking-wider uppercase">
                            ACTIVE
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'supabase' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                    <h4 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">PostgreSQL Schema &amp; LP Ledgers</h4>
                    <p className="text-base text-zinc-200 leading-relaxed leading-relaxed">
                      High-throughput financial tables for equity positions, Free Cash Flow valuation models, and LP capital schedules.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                        <p className="text-xs font-semibold tracking-wider font-mono text-zinc-300">TABLE 1</p>
                        <p className="text-xs font-mono font-bold text-white">portfolio_holdings</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                        <p className="text-xs font-semibold tracking-wider font-mono text-zinc-300">TABLE 2</p>
                        <p className="text-xs font-mono font-bold text-white">fcf_valuation_models</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                        <p className="text-xs font-semibold tracking-wider font-mono text-zinc-300">TABLE 3</p>
                        <p className="text-xs font-mono font-bold text-white">lp_capital_calls</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
