import { useState } from "react";
import clsx from "clsx";
import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import {
  BrainCircuit, Database, Search, Server,
} from "lucide-react";

const tabs = ["Workspace", "AI Services", "Integrations", "Security"];

const services = [
  { icon: BrainCircuit, name: "Amazon Bedrock", status: "Connected", accent: "#8b5cf6" },
  { icon: Database, name: "CockroachDB", status: "Connected", accent: "#3b82f6" },
  { icon: Search, name: "Vector Search", status: "Running", accent: "#22d3ee" },
  { icon: Server, name: "Conflict Detection", status: "Running", accent: "#f59e0b" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Workspace");

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Settings"
          description="Manage workspace configuration, AI services and platform settings."
        />

        {/* Tabs */}
        <div
          className="flex flex-wrap gap-1.5 rounded-2xl p-1.5 max-w-max"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(10px)",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200",
                activeTab === tab ? "text-white" : "text-slate-500 hover:text-slate-300"
              )}
              style={activeTab === tab ? {
                background: "rgba(34,211,238,0.12)",
                border: "1px solid rgba(34,211,238,0.25)",
                color: "#22d3ee",
              } : {
                border: "1px solid transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Workspace form */}
          <Card hover={false} className="p-6">
            <h2 className="text-lg font-bold text-white tracking-tight">Workspace Information</h2>
            <p className="mt-1 text-xs text-slate-500">Update your Relay workspace details</p>

            <div className="mt-6 space-y-4">
              <Field label="Workspace Name" value="Relay Demo" />
              <Field label="Environment" value="Development" />
              <Field label="Description" value="Enterprise memory AI workspace for hackathon demo" multiline />
            </div>

            <Button variant="primary" className="mt-6 rounded-xl px-5 py-2.5">Save Changes</Button>
          </Card>

          {/* AI Services status */}
          <Card hover={false} className="p-6">
            <h2 className="text-lg font-bold text-white tracking-tight">AI Services</h2>
            <p className="mt-1 text-xs text-slate-500">Connected enterprise services</p>

            <div className="mt-6 space-y-3.5">
              {services.map(({ icon: Icon, name, status, accent }) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-2xl p-4 transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: `${accent}15` }}
                    >
                      <Icon size={18} style={{ color: accent }} />
                    </div>
                    <span className="text-sm font-semibold text-white">{name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Storage overview */}
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { label: "Total Memories", value: "2,451", accent: "#22d3ee" },
            { label: "Storage Used", value: "3.7 GB", accent: "#3b82f6" },
            { label: "Avg. Processing Time", value: "2.3s", accent: "#8b5cf6" },
          ].map((stat) => (
            <Card key={stat.label} hover={true} className="p-6 text-center">
              <p className="text-3xl font-extrabold tracking-tight text-white">{stat.value}</p>
              <p className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

function Field({ label, value, multiline = false }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea
          defaultValue={value}
          rows={3}
          className="w-full resize-none rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
          onFocus={(e) => {
            e.target.style.border = "1px solid rgba(34,211,238,0.4)";
            e.target.style.boxShadow = "0 0 0 3px rgba(34,211,238,0.08)";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid rgba(255,255,255,0.07)";
            e.target.style.boxShadow = "none";
          }}
        />
      ) : (
        <input
          defaultValue={value}
          className="h-11 w-full rounded-xl px-4 text-sm text-white outline-none transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
          onFocus={(e) => {
            e.target.style.border = "1px solid rgba(34,211,238,0.4)";
            e.target.style.boxShadow = "0 0 0 3px rgba(34,211,238,0.08)";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid rgba(255,255,255,0.07)";
            e.target.style.boxShadow = "none";
          }}
        />
      )}
    </div>
  );
}
