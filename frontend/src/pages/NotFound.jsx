import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6" style={{ background: "var(--relay-bg)" }}>
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "rgba(239,68,68,0.12)" }}>
          <AlertTriangle className="text-red-400" size={32} />
        </div>
        <h1 className="mt-6 text-6xl font-bold text-white">404</h1>
        <h2 className="mt-2 text-xl font-semibold text-white">Page Not Found</h2>
        <p className="mt-3 text-sm text-slate-400">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/dashboard">
          <Button className="mt-6">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
