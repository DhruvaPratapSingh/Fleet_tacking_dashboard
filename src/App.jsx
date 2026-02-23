import React from "react";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen w-full bg-slate-100 relative selection:bg-blue-100">
      <Dashboard />
      <footer className="fixed bottom-4 right-6 pointer-events-none z-50">
        <div className="bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border shadow-md flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            System Live: v1.0.4
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;