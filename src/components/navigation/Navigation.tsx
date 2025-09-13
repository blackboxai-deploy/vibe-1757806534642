"use client";

import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function Navigation({ activeView, setActiveView }: NavigationProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "analysis", label: "Bias Analysis", icon: "🔍" },
    { id: "reports", label: "Audit Reports", icon: "📋" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-slate-800/80 backdrop-blur-sm border-r border-slate-700">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">EthicsAI</h1>
            <p className="text-slate-400 text-xs">Bias Detection Platform</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start space-x-3 ${
                activeView === item.id
                  ? "bg-purple-600/20 text-purple-300 border-purple-500/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
              onClick={() => setActiveView(item.id)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>

        <div className="mt-12 p-4 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-lg border border-purple-500/20">
          <h3 className="text-white text-sm font-semibold mb-2">Bias Detection Stats</h3>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Total Analyses</span>
              <span className="text-purple-400">1,247</span>
            </div>
            <div className="flex justify-between">
              <span>Bias Detected</span>
              <span className="text-red-400">89</span>
            </div>
            <div className="flex justify-between">
              <span>Accuracy</span>
              <span className="text-green-400">94.3%</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}