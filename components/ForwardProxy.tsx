
import React, { useState } from 'react';
import { Globe, User, Shield, Video, CheckCircle2, XCircle } from 'lucide-react';

export const ForwardProxy: React.FC = () => {
  const [connectionType, setConnectionType] = useState<'NONE' | 'DIRECT' | 'PROXY'>('NONE');
  
  const reset = () => setConnectionType('NONE');

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-blue-600">Forward Proxy: The Client's Agent</h2>
        <p className="text-slate-600 dark:text-slate-400">
          A forward proxy provides a single point of exit for a group of clients. 
          When you use a VPN or a corporate web filter, you are likely using a forward proxy.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold">Interactive: Geo-Bypass Simulator</h3>
          <button onClick={reset} className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Reset Demo</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative">
          {/* Region A */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Region A (You)</span>
              <div className="flex flex-col items-center gap-2">
                <User className="w-10 h-10 text-blue-500" />
                <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded text-blue-600">192.168.1.5</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button 
                onClick={() => setConnectionType('DIRECT')}
                className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs font-semibold rounded-lg transition-colors border border-transparent hover:border-red-200"
              >
                Connect Directly
              </button>
              <button 
                onClick={() => setConnectionType('PROXY')}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all"
              >
                Connect via Proxy
              </button>
            </div>
          </div>

          {/* The Network Flow */}
          <div className="relative h-40 flex items-center justify-center">
             {/* Lines */}
             <div className="absolute inset-x-0 h-1 bg-slate-100 dark:bg-slate-800"></div>
             
             {connectionType === 'DIRECT' && (
                <div className="absolute inset-x-0 h-1 bg-red-500 animate-pulse transition-all">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 p-1 rounded-full border border-red-500">
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                </div>
             )}

             {connectionType === 'PROXY' && (
                <>
                  <div className="absolute inset-x-0 h-1 bg-blue-500"></div>
                  <div className="z-10 bg-white dark:bg-slate-900 p-4 border-2 border-blue-500 rounded-2xl flex flex-col items-center gap-1 shadow-xl">
                    <Shield className="w-8 h-8 text-blue-500" />
                    <span className="text-[10px] font-bold">Proxy (Region B)</span>
                    <span className="text-[10px] font-mono text-slate-400">45.72.10.1</span>
                  </div>
                </>
             )}
          </div>

          {/* Region B Content */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Region B (Netflix)</span>
              <div className="flex flex-col items-center gap-2">
                <Video className={`w-10 h-10 ${connectionType === 'PROXY' ? 'text-green-500' : 'text-slate-300'}`} />
                <span className="text-[10px] text-slate-400">Only Region B allowed</span>
              </div>
            </div>
            {connectionType !== 'NONE' && (
              <div className={`text-sm font-bold flex items-center gap-2 p-3 rounded-xl w-full justify-center ${
                connectionType === 'PROXY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {connectionType === 'PROXY' ? (
                  <><CheckCircle2 className="w-4 h-4" /> Access Granted!</>
                ) : (
                  <><XCircle className="w-4 h-4" /> Denied (Wrong Region)</>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-500">Why Use a Forward Proxy?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">1</div>
              <p className="text-xs font-medium">Anonymity & Privacy</p>
              <p className="text-[11px] text-slate-500">Hides your real IP from the destination server.</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">2</div>
              <p className="text-xs font-medium">Access Control</p>
              <p className="text-[11px] text-slate-500">Block social media on company networks.</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">3</div>
              <p className="text-xs font-medium">Bypass Geo-Restricts</p>
              <p className="text-[11px] text-slate-500">Appear as if you're in a different country.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
