import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: "var(--relay-bg)" }}>
      {/* Glow Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[200px] right-[10%] h-[600px] w-[600px] rounded-full bg-blue-600/5 blur-[130px]" />
        <div className="absolute top-[60%] -left-[100px] h-[500px] w-[500px] rounded-full bg-cyan-500/4 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] h-[400px] w-[400px] rounded-full bg-violet-600/4 blur-[110px]" />
        <div className="grid-overlay absolute inset-0 opacity-80" />
      </div>

      <Sidebar />

      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1550px] px-8 py-8 md:px-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
