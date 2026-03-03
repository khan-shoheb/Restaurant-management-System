import React, { useState } from "react";
import SuperAdminLayout from "../components/SuperAdminLayout";
import { Settings, Bell, Shield, Globe, Database, Mail } from "lucide-react";

const initialSettings = [
  {
    key: "Notifications",
    description: "Configure email and push notification preferences",
    icon: <Bell className="h-6 w-6 text-blue-500" />,
    enabled: true,
  },
  {
    key: "Two-Factor Authentication",
    description: "Add an extra layer of security to admin accounts",
    icon: <Shield className="h-6 w-6 text-blue-500" />,
    enabled: false,
  },
  {
    key: "Multi-Language Support",
    description: "Enable multiple languages for restaurant menus",
    icon: <Globe className="h-6 w-6 text-blue-500" />,
    enabled: true,
  },
  {
    key: "Auto Backups",
    description: "Automatically backup data every 24 hours",
    icon: <Database className="h-6 w-6 text-blue-500" />,
    enabled: true,
  },
  {
    key: "Email Reports",
    description: "Send weekly performance reports to admins",
    icon: <Mail className="h-6 w-6 text-blue-500" />,
    enabled: false,
  },
];

export default function SuperAdminSettings() {
  const [settings, setSettings] = useState(initialSettings);
  const handleToggle = idx => {
    setSettings(settings.map((s, i) => i === idx ? { ...s, enabled: !s.enabled } : s));
  };

  return (
    <SuperAdminLayout>
      <div className="flex-1 p-2 sm:p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-500 mb-8">Configure platform-wide settings</p>
        <div className="flex flex-col gap-4 w-full">
          {settings.map((setting, idx) => (
            <div key={setting.key} className="bg-white rounded-xl shadow flex items-center justify-between p-6 border w-full">
              <div className="flex items-center gap-4">
                {setting.icon}
                <div>
                  <div className="font-bold text-gray-900">{setting.key}</div>
                  <div className="text-gray-500 text-sm">{setting.description}</div>
                </div>
              </div>
              <button
                className={`w-12 h-7 flex items-center rounded-full border-2 transition ${setting.enabled ? "bg-red-500 border-red-500" : "bg-gray-100 border-gray-300"}`}
                onClick={() => handleToggle(idx)}
                aria-label="Toggle setting"
              >
                <span
                  className={`w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${setting.enabled ? "translate-x-5" : "translate-x-0"}`}
                  style={{ border: setting.enabled ? "2px solid #ef4444" : "2px solid #d1d5db" }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </SuperAdminLayout>
  );
}
