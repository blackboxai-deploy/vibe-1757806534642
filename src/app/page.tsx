"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Ethics & Bias Detection Platform
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Advanced edge algorithms for comprehensive bias detection and ethics auditing 
            across all domains - ensuring fairness, transparency, and ethical compliance.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white font-medium">
              Start Analysis
            </button>
            <button className="border border-gray-400 hover:bg-gray-800 px-6 py-3 rounded-lg text-white font-medium">
              View Demo
            </button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Live Analysis</h3>
            <textarea 
              placeholder="Paste your text here for bias analysis..."
              className="w-full h-32 bg-slate-900/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-gray-400"
            />
            <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-white font-medium">
              Analyze Content
            </button>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Analysis Results</h3>
            <div className="text-center py-8">
              <div className="text-4xl font-bold text-green-400 mb-2">95</div>
              <p className="text-gray-300">Bias-Free Score</p>
              <div className="mt-4 bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3 mt-6">
              <div className="flex justify-between">
                <span className="text-gray-300">Gender Bias</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Racial Bias</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Age Discrimination</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Cultural Bias</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">1,247</div>
            <p className="text-gray-300">Total Analyses</p>
            <p className="text-green-400 text-sm mt-1">↗ +12% from last month</p>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">89</div>
            <p className="text-gray-300">Biases Detected</p>
            <p className="text-red-400 text-sm mt-1">↗ +8% from last month</p>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">96.8%</div>
            <p className="text-gray-300">Resolution Rate</p>
            <p className="text-green-400 text-sm mt-1">↗ +3% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
}