
import React, { useState } from 'react';
import { User, Server, Shield, Cloud, Info } from 'lucide-react';

export const Comparison: React.FC = () => {
  const [hoverRow, setHoverRow] = useState<number | null>(null);

  const rows = [
    { 
      feature: 'Position', 
      forward: 'In front of the Client', 
      reverse: 'In front of the Server',
      icon: '📍'
    },
    { 
      feature: 'Primary Goal', 
      forward: 'Protect / Assist Client', 
      reverse: 'Protect / Assist Server',
      icon: '🎯'
    },
    { 
      feature: 'Identity Hidden', 
      forward: 'The Client (User IP)', 
      reverse: 'The Server (Backend IP)',
      icon: '🎭'
    },
    { 
      feature: 'Use Case', 
      forward: 'VPN, Web Filtering, Geo-unblocking', 
      reverse: 'Load Balancing, WAF, Caching',
      icon: '🛠️'
    },
    { 
      feature: 'Example Software', 
      forward: 'Squid, Shadowsocks, Proxy-Chain', 
      reverse: 'Nginx, HAProxy, Cloudflare',
      icon: '📦'
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Side-by-Side Comparison</h2>
        <p className="text-slate-600 dark:text-slate-400">Hover over rows to see the logic in action.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Feature</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-600">Forward Proxy</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-orange-600">Reverse Proxy</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr 
                  key={idx}
                  onMouseEnter={() => setHoverRow(idx)}
                  onMouseLeave={() => setHoverRow(null)}
                  className={`border-b border-slate-100 dark:border-slate-800 transition-colors ${
                    hoverRow === idx ? 'bg-slate-50 dark:bg-slate-800' : ''
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{row.icon}</span>
                      <span className="text-sm font-semibold">{row.feature}</span>
                    </div>
                  </td>
                  <td className={`p-4 text-sm transition-all ${hoverRow === idx ? 'text-blue-600 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                    {row.forward}
                  </td>
                  <td className={`p-4 text-sm transition-all ${hoverRow === idx ? 'text-orange-600 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                    {row.reverse}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Visual Highlighter */}
        <div className="w-full lg:w-80 bg-slate-900 dark:bg-black rounded-3xl p-8 sticky top-24 shadow-2xl overflow-hidden">
          <div className="relative flex flex-col items-center gap-12 py-8">
            <div className={`transition-all duration-300 flex flex-col items-center gap-2 ${hoverRow === 0 || hoverRow === 1 || hoverRow === 2 ? 'scale-125 opacity-100' : 'opacity-40'}`}>
              <User className="w-10 h-10 text-blue-500" />
              <span className="text-[10px] text-white font-bold uppercase">Client</span>
              {hoverRow !== null && (hoverRow === 0 || hoverRow === 2) && (
                <Shield className="absolute -left-4 top-0 w-6 h-6 text-blue-400 animate-pulse" />
              )}
            </div>

            <div className={`w-0.5 h-16 bg-gradient-to-b from-blue-500 to-orange-500 relative transition-opacity ${hoverRow !== null ? 'opacity-100' : 'opacity-20'}`}>
               <Cloud className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-slate-700" />
            </div>

            <div className={`transition-all duration-300 flex flex-col items-center gap-2 ${hoverRow === 0 || hoverRow === 1 || hoverRow === 2 ? 'scale-125 opacity-100' : 'opacity-40'}`}>
              <Server className="w-10 h-10 text-orange-500" />
              <span className="text-[10px] text-white font-bold uppercase">Server</span>
              {hoverRow !== null && (hoverRow === 0 || hoverRow === 2) && (
                <Shield className="absolute -right-4 top-0 w-6 h-6 text-orange-400 animate-pulse" />
              )}
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-slate-800 text-[11px] text-slate-300 italic border border-slate-700">
             <Info className="w-3 h-3 inline mr-1 text-slate-400" />
             {hoverRow !== null ? `Highlighting: ${rows[hoverRow].feature}` : 'Hover a row to visualize relationship'}
          </div>
        </div>
      </div>
    </div>
  );
};
