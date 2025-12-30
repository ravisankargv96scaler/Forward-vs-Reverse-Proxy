
import React, { useState } from 'react';
import { Terminal, Copy, Check, Info, Code2 } from 'lucide-react';

export const NginxConfig: React.FC = () => {
  const [targetUrl, setTargetUrl] = useState('http://localhost:8080');
  const [copied, setCopied] = useState(false);

  const config = `server {
    listen 80;
    server_name example.com;

    # The Reverse Proxy Magic
    location / {
        proxy_pass ${targetUrl};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Code2 className="w-8 h-8 text-slate-600 dark:text-slate-400" />
          Practical Setup: Nginx
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Nginx is the world's most popular reverse proxy. It uses the <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-orange-600">proxy_pass</code> 
          directive to forward traffic.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Target Backend URL</label>
            <input 
              type="text" 
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="e.g. http://api.internal"
              className="w-full sm:w-64 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            />
          </div>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-lg text-sm font-medium transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Config'}
          </button>
        </div>

        <div className="p-0 relative">
          <div className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-400 text-xs font-mono">
            <Terminal className="w-3 h-3" />
            /etc/nginx/sites-available/default
          </div>
          <pre className="p-8 text-sm font-mono overflow-x-auto custom-scrollbar bg-slate-950 text-slate-300 leading-relaxed">
            {config.split('\n').map((line, i) => (
              <div key={i} className="flex gap-4">
                <span className="w-8 text-slate-600 text-right select-none">{i + 1}</span>
                <span dangerouslySetInnerHTML={{ 
                  __html: line
                    .replace(/(proxy_pass|proxy_set_header|listen|server_name|location|server)/g, '<span class="text-blue-400">$1</span>')
                    .replace(/(\$host|\$remote_addr|\$proxy_add_x_forwarded_for|\$scheme)/g, '<span class="text-orange-400">$1</span>')
                    .replace(/(#.*)/g, '<span class="text-slate-500 italic">$1</span>')
                }} />
              </div>
            ))}
          </pre>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex gap-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg h-fit">
          <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-1">How it works:</h4>
          <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
            When a user visits <code className="font-bold">example.com</code>, Nginx receives the request on port 80. 
            It then creates a <strong>new</strong> request to your backend at <code className="font-bold">{targetUrl}</code>, 
            fetches the response, and hands it back to the user.
          </p>
        </div>
      </div>
    </div>
  );
};
