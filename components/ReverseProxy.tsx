
import React, { useState, useCallback, useEffect } from 'react';
import { Server, Shield, Send, AlertTriangle, RefreshCcw, Cpu } from 'lucide-react';
import { ServerState } from '../types';

export const ReverseProxy: React.FC = () => {
  const [servers, setServers] = useState<ServerState[]>([
    { id: 1, active: true, load: 0 },
    { id: 2, active: true, load: 0 },
    { id: 3, active: true, load: 0 },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [packet, setPacket] = useState<number | null>(null);

  const toggleServer = (id: number) => {
    setServers(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const sendRequest = useCallback(() => {
    const activeServers = servers.filter(s => s.active);
    if (activeServers.length === 0) return;

    // Find next active server after currentIndex
    let nextIdx = (currentIndex + 1) % servers.length;
    while (!servers[nextIdx].active) {
      nextIdx = (nextIdx + 1) % servers.length;
    }

    setPacket(servers[nextIdx].id);
    setCurrentIndex(nextIdx);
    
    // Increment load temporarily
    setServers(prev => prev.map(s => s.id === servers[nextIdx].id ? { ...s, load: s.load + 10 } : s));

    setTimeout(() => {
      setPacket(null);
      setServers(prev => prev.map(s => s.id === servers[nextIdx].id ? { ...s, load: Math.max(0, s.load - 10) } : s));
    }, 800);
  }, [currentIndex, servers]);

  const sendTen = () => {
    let delay = 0;
    for (let i = 0; i < 10; i++) {
      setTimeout(() => sendRequest(), delay);
      delay += 200;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-orange-600">Reverse Proxy: The Server's Bodyguard</h2>
        <p className="text-slate-600 dark:text-slate-400">
          A reverse proxy sits in front of backend servers and ensures no client communicates 
          directly with them. It handles incoming requests and routes them to the correct resource.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold">Simulator: Intelligent Load Balancer</h3>
          <div className="flex gap-2">
            <button 
              onClick={sendRequest}
              disabled={servers.every(s => !s.active)}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-400 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-all"
            >
              <Send className="w-3 h-3" /> Send 1 Req
            </button>
            <button 
              onClick={sendTen}
              disabled={servers.every(s => !s.active)}
              className="px-4 py-2 bg-slate-800 dark:bg-slate-700 hover:bg-black text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-all"
            >
              <RefreshCcw className="w-3 h-3" /> Send 10 (Burst)
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Incoming Traffic */}
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 text-center">
              <span className="text-[10px] font-bold text-slate-400 block mb-2">Public Traffic</span>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900" />
                ))}
              </div>
            </div>
          </div>

          {/* Reverse Proxy */}
          <div className="flex-1 relative flex justify-center py-12">
            <div className="z-10 bg-orange-50 dark:bg-orange-950/30 p-8 border-2 border-orange-500 rounded-3xl flex flex-col items-center gap-2 shadow-2xl relative">
              <Shield className="w-12 h-12 text-orange-600" />
              <div className="text-center">
                <span className="font-bold text-sm block">Load Balancer</span>
                <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold">REVERSE PROXY</span>
              </div>
              
              {/* Dynamic Packet Path */}
              {packet !== null && (
                <div 
                  className="absolute w-4 h-4 bg-orange-500 rounded-full animate-ping"
                  style={{ top: '50%', right: '-10px' }}
                />
              )}
            </div>
            
            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-40" preserveAspectRatio="none">
              <path d="M 50% 50% L 100% 10%" stroke="currentColor" strokeWidth="2" fill="none" className="text-orange-500" />
              <path d="M 50% 50% L 100% 50%" stroke="currentColor" strokeWidth="2" fill="none" className="text-orange-500" />
              <path d="M 50% 50% L 100% 90%" stroke="currentColor" strokeWidth="2" fill="none" className="text-orange-500" />
            </svg>
          </div>

          {/* Backend Servers */}
          <div className="flex flex-col gap-4 w-full md:w-64">
            {servers.map(server => (
              <div 
                key={server.id}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                  server.active 
                    ? packet === server.id ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg scale-105' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800'
                    : 'border-red-200 bg-red-50 dark:bg-red-900/10 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Cpu className={`w-6 h-6 ${server.active ? 'text-orange-500' : 'text-slate-400'}`} />
                  <div>
                    <span className="text-xs font-bold block">Server {server.id}</span>
                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 transition-all duration-300" 
                        style={{ width: `${server.active ? 10 + server.load : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => toggleServer(server.id)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    server.active 
                      ? 'border-orange-200 hover:bg-red-50 hover:border-red-300 text-orange-600 hover:text-red-600' 
                      : 'border-red-300 bg-red-600 text-white hover:bg-red-700'
                  }`}
                  title={server.active ? "Simulate Crash" : "Restore Server"}
                >
                  {server.active ? <AlertTriangle className="w-3 h-3" /> : <RefreshCcw className="w-3 h-3" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Load Balancing', desc: 'Distributes traffic across multiple servers.', icon: RefreshCcw },
            { title: 'SSL Offloading', desc: 'Decodes HTTPS at the proxy to save server CPU.', icon: Shield },
            { title: 'Security', desc: 'Hides your server IP and OS from the internet.', icon: AlertTriangle },
            { title: 'Caching', desc: 'Serves static content without hitting the backend.', icon: Server },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <item.icon className="w-5 h-5 text-orange-500 mb-2" />
              <h5 className="text-xs font-bold mb-1">{item.title}</h5>
              <p className="text-[10px] text-slate-500 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
