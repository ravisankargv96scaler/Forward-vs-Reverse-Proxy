
import React, { useState } from 'react';
import { User, Server, Globe, Shield, ArrowRight } from 'lucide-react';

type Mode = 'DIRECT' | 'FORWARD' | 'REVERSE';

export const CoreConcept: React.FC = () => {
  const [mode, setMode] = useState<Mode>('DIRECT');

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Understanding Proxies</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          At its simplest, a proxy is a mediator. It's like a middleman that handles requests and responses. 
          The key difference is <strong>who they represent</strong>.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {(['DIRECT', 'FORWARD', 'REVERSE'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-6 py-3 rounded-xl border-2 transition-all font-semibold ${
              mode === m 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-md' 
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {m === 'DIRECT' ? 'No Proxy (Direct)' : m === 'FORWARD' ? 'Forward Proxy' : 'Reverse Proxy'}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-16 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
          {/* Client */}
          <div className="flex flex-col items-center gap-4">
            <div className={`p-6 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400`}>
              <User className="w-12 h-12" />
            </div>
            <div className="text-center">
              <span className="font-bold block">Client</span>
              <span className="text-xs text-slate-500">The User / Browser</span>
            </div>
          </div>

          {/* Connection Line 1 */}
          <div className="flex-1 flex flex-col items-center justify-center min-h-[60px] relative">
            <div className={`h-1 w-full rounded-full transition-all duration-500 ${mode === 'FORWARD' ? 'bg-blue-400' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
            {mode === 'FORWARD' && (
              <div className="absolute -top-10 flex flex-col items-center gap-2 animate-bounce">
                <Shield className="w-8 h-8 text-blue-500" />
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Client's Buddy</span>
              </div>
            )}
            <ArrowRight className={`absolute right-0 w-6 h-6 transition-colors ${mode === 'FORWARD' ? 'text-blue-500' : 'text-slate-400'}`} />
          </div>

          {/* Internet / Proxy Mediator */}
          <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${mode === 'DIRECT' ? 'scale-75 opacity-50' : 'scale-110'}`}>
            <div className={`p-6 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 relative`}>
              {mode === 'DIRECT' ? <Globe className="w-12 h-12" /> : <Shield className={`w-12 h-12 ${mode === 'FORWARD' ? 'text-blue-500' : 'text-orange-500'}`} />}
              {mode !== 'DIRECT' && (
                 <span className={`absolute -top-2 -right-2 px-2 py-0.5 rounded text-[10px] font-bold text-white ${mode === 'FORWARD' ? 'bg-blue-500' : 'bg-orange-500'}`}>
                   PROXY
                 </span>
              )}
            </div>
            <div className="text-center">
              <span className="font-bold block">{mode === 'DIRECT' ? 'The Internet' : 'Proxy Server'}</span>
              <span className="text-xs text-slate-500 max-w-[120px]">The Middleware</span>
            </div>
          </div>

          {/* Connection Line 2 */}
          <div className="flex-1 flex flex-col items-center justify-center min-h-[60px] relative">
            <div className={`h-1 w-full rounded-full transition-all duration-500 ${mode === 'REVERSE' ? 'bg-orange-400' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
            {mode === 'REVERSE' && (
              <div className="absolute -top-10 flex flex-col items-center gap-2 animate-bounce">
                <Shield className="w-8 h-8 text-orange-500" />
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Server's Guard</span>
              </div>
            )}
            <ArrowRight className={`absolute right-0 w-6 h-6 transition-colors ${mode === 'REVERSE' ? 'text-orange-500' : 'text-slate-400'}`} />
          </div>

          {/* Server */}
          <div className="flex flex-col items-center gap-4">
            <div className={`p-6 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400`}>
              <Server className="w-12 h-12" />
            </div>
            <div className="text-center">
              <span className="font-bold block">Origin Server</span>
              <span className="text-xs text-slate-500">The Content Source</span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2 text-blue-600">
              <User className="w-5 h-5" /> Forward Proxy
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Acts on behalf of the <strong>Client</strong>. The server doesn't know the client's identity; it only sees the proxy's IP. 
              Useful for privacy, filtering, and bypassing restrictions.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2 text-orange-600">
              <Server className="w-5 h-5" /> Reverse Proxy
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Acts on behalf of the <strong>Server</strong>. The client doesn't know which backend server is responding. 
              Useful for load balancing, security, and caching.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
