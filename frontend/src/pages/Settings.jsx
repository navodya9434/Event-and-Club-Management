import React from "react";
import { GhostButton, PageHeader, PrimaryButton, Surface } from "../components/AdminUi";

const Settings = () => {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Settings"
        subtitle="Configure admin preferences, notification behavior, and security defaults."
        actions={
          <>
            <GhostButton>Reset Defaults</GhostButton>
            <PrimaryButton>Save Changes</PrimaryButton>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <Surface>
          <h2 className="mb-4 text-lg font-bold text-slate-900">Profile & Workspace</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1 text-sm font-medium text-slate-700">
              Display Name
              <input className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200" defaultValue="Main Admin" />
            </label>
            <label className="space-y-1 text-sm font-medium text-slate-700">
              Contact Email
              <input className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200" defaultValue="admin@events.com" />
            </label>
            <label className="space-y-1 text-sm font-medium text-slate-700 sm:col-span-2">
              Organization Name
              <input className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200" defaultValue="EventOps HQ" />
            </label>
          </div>
        </Surface>

        <Surface>
          <h2 className="mb-4 text-lg font-bold text-slate-900">Notifications</h2>
          <div className="space-y-3 text-sm text-slate-700">
            <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              Email alerts for new tickets
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-cyan-600" />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              Daily event summary report
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-cyan-600" />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              High-priority escalation SMS
              <input type="checkbox" className="h-4 w-4 accent-cyan-600" />
            </label>
          </div>
        </Surface>

        <Surface className="xl:col-span-2">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Security Controls</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="space-y-1 text-sm font-medium text-slate-700">
              Session Timeout
              <select className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
              </select>
            </label>
            <label className="space-y-1 text-sm font-medium text-slate-700">
              Password Rotation
              <select className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200">
                <option>Every 90 days</option>
                <option>Every 120 days</option>
                <option>Disabled</option>
              </select>
            </label>
            <label className="space-y-1 text-sm font-medium text-slate-700">
              MFA Policy
              <select className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200">
                <option>Required for all admins</option>
                <option>Required for super admins</option>
                <option>Optional</option>
              </select>
            </label>
          </div>
        </Surface>
      </div>
    </div>
  );
};

export default Settings;
