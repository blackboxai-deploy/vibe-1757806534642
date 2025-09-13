"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SettingsView() {
  const [sensitivity, setSensitivity] = useState([75]);
  const [industry, setIndustry] = useState("general");
  const [enabledBiasTypes, setEnabledBiasTypes] = useState({
    gender: true,
    racial: true,
    age: true,
    disability: true,
    cultural: true,
    socioeconomic: true,
    religious: true,
    appearance: false,
    political: false
  });

  const [notifications, setNotifications] = useState({
    email: true,
    realtime: true,
    webhook: false,
    reports: true
  });

  const [apiSettings, setApiSettings] = useState({
    rateLimit: "1000",
    timeout: "30",
    retries: "3"
  });

  const handleBiasTypeToggle = (type: string) => {
    setEnabledBiasTypes(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  const handleNotificationToggle = (type: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  const saveSettings = () => {
    // Simulate saving settings
    console.log("Settings saved:", {
      sensitivity: sensitivity[0],
      industry,
      enabledBiasTypes,
      notifications,
      apiSettings
    });
  };

  const resetDefaults = () => {
    setSensitivity([75]);
    setIndustry("general");
    setEnabledBiasTypes({
      gender: true,
      racial: true,
      age: true,
      disability: true,
      cultural: true,
      socioeconomic: true,
      religious: true,
      appearance: false,
      political: false
    });
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings & Configuration</h1>
          <p className="text-slate-400 mt-1">Configure bias detection algorithms and system preferences</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={resetDefaults} className="text-white border-slate-600">
            Reset Defaults
          </Button>
          <Button onClick={saveSettings} className="bg-purple-600 hover:bg-purple-700">
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="detection" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="detection" className="text-white">Detection</TabsTrigger>
          <TabsTrigger value="notifications" className="text-white">Notifications</TabsTrigger>
          <TabsTrigger value="api" className="text-white">API</TabsTrigger>
          <TabsTrigger value="compliance" className="text-white">Compliance</TabsTrigger>
        </TabsList>

        {/* Detection Settings */}
        <TabsContent value="detection" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* General Settings */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Detection Configuration</CardTitle>
                <CardDescription className="text-gray-300">
                  Configure the core bias detection engine settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sensitivity Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-white">Detection Sensitivity</Label>
                    <span className="text-gray-300 text-sm">{sensitivity[0]}%</span>
                  </div>
                  <input
                    type="range"
                    value={sensitivity[0]}
                    onChange={(e) => setSensitivity([parseInt(e.target.value)])}
                    max="100"
                    min="1"
                    step="1"
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-400">
                    Higher sensitivity detects more potential bias but may increase false positives
                  </p>
                </div>

                {/* Industry Focus */}
                <div className="space-y-2">
                  <Label className="text-white">Industry Focus</Label>
                  <select 
                    value={industry} 
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white"
                  >
                    <option value="general">General Purpose</option>
                    <option value="hr">HR & Recruitment</option>
                    <option value="marketing">Marketing & Advertising</option>
                    <option value="legal">Legal & Compliance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="finance">Financial Services</option>
                    <option value="tech">Technology</option>
                  </select>
                  <p className="text-xs text-gray-400">
                    Optimizes detection patterns for specific industry contexts
                  </p>
                </div>

                {/* Processing Mode */}
                <div className="space-y-2">
                  <Label className="text-white">Processing Mode</Label>
                  <select 
                    defaultValue="balanced"
                    className="w-full bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white"
                  >
                    <option value="fast">Fast (Edge Processing)</option>
                    <option value="balanced">Balanced (Recommended)</option>
                    <option value="thorough">Thorough (Deep Analysis)</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Bias Types */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Bias Detection Types</CardTitle>
                <CardDescription className="text-gray-300">
                  Enable or disable specific types of bias detection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(enabledBiasTypes).map(([type, enabled]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Label className="text-white capitalize">{type.replace('_', ' ')} Bias</Label>
                      {['gender', 'racial', 'age', 'disability'].includes(type) && (
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={() => handleBiasTypeToggle(type)}
                    />
                  </div>
                ))}
                
                <Alert className="bg-blue-900/30 border-blue-600 mt-4">
                  <AlertDescription className="text-blue-300 text-sm">
                    Disabling bias types may reduce detection accuracy. Core types (Gender, Racial, Age, Disability) are recommended for comprehensive analysis.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Settings */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Advanced Detection Settings</CardTitle>
              <CardDescription className="text-gray-300">
                Fine-tune the detection algorithms and processing behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Context Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">Context Window</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">Semantic Analysis</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">Historical Context</Label>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-white">Language Processing</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">Multi-language</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">Slang Detection</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">Euphemism Analysis</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-white">Performance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">Parallel Processing</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">Result Caching</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">Edge Computing</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
                <CardDescription className="text-gray-300">
                  Configure how and when you receive bias detection alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notifications).map(([type, enabled]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div>
                      <Label className="text-white capitalize">{type} Notifications</Label>
                      <p className="text-sm text-gray-400">
                        {type === 'email' && 'Receive analysis results via email'}
                        {type === 'realtime' && 'Real-time in-app notifications'}
                        {type === 'webhook' && 'HTTP webhook for integrations'}
                        {type === 'reports' && 'Weekly summary reports'}
                      </p>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={() => handleNotificationToggle(type)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Alert Thresholds</CardTitle>
                <CardDescription className="text-gray-300">
                  Set when to trigger different types of alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-white">High Bias Alert Threshold</Label>
                  <input
                    type="range"
                    defaultValue="80"
                    max="100"
                    min="1"
                    step="1"
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-400">
                    Trigger high-priority alerts when bias score exceeds this threshold
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-white">Critical Alert Threshold</Label>
                  <input
                    type="range"
                    defaultValue="90"
                    max="100"
                    min="1"
                    step="1"
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-400">
                    Trigger critical alerts requiring immediate attention
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-white">Bulk Analysis Alert</Label>
                  <input
                    type="range"
                    defaultValue="50"
                    max="100"
                    min="1"
                    step="1"
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-400">
                    Minimum percentage of flagged items to trigger bulk alerts
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">API Configuration</CardTitle>
                <CardDescription className="text-gray-300">
                  Configure API limits and behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Rate Limit (requests/hour)</Label>
                  <input
                    type="number"
                    value={apiSettings.rateLimit}
                    onChange={(e) => setApiSettings(prev => ({ ...prev, rateLimit: e.target.value }))}
                    className="w-full mt-2 bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white">Request Timeout (seconds)</Label>
                  <input
                    type="number"
                    value={apiSettings.timeout}
                    onChange={(e) => setApiSettings(prev => ({ ...prev, timeout: e.target.value }))}
                    className="w-full mt-2 bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white">Max Retries</Label>
                  <input
                    type="number"
                    value={apiSettings.retries}
                    onChange={(e) => setApiSettings(prev => ({ ...prev, retries: e.target.value }))}
                    className="w-full mt-2 bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">API Keys & Access</CardTitle>
                <CardDescription className="text-gray-300">
                  Manage API authentication and access tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Primary API Key</Label>
                  <div className="flex mt-2 space-x-2">
                    <input
                      type="password"
                      value="sk-••••••••••••••••••••••••"
                      readOnly
                      className="flex-1 bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white"
                    />
                    <Button size="sm" variant="outline" className="text-white border-slate-600">
                      Regenerate
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-white">Webhook URL</Label>
                  <input
                    type="url"
                    placeholder="https://your-app.com/webhook"
                    className="w-full mt-2 bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white placeholder-gray-400"
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Test Webhook
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Compliance */}
        <TabsContent value="compliance" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Compliance Standards</CardTitle>
              <CardDescription className="text-gray-300">
                Configure compliance with various regulatory standards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Privacy Regulations</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">GDPR Compliance</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">CCPA Compliance</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">Data Retention (30 days)</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-white">Employment Standards</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">EEOC Compliance</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">ADA Standards</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-300">Fair Housing Act</Label>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              <Alert className="bg-green-900/30 border-green-600">
                <AlertDescription className="text-green-300">
                  <strong>Compliance Status: Active</strong><br />
                  All enabled compliance standards are being enforced. Audit trails are maintained for legal documentation.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}