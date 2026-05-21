import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const bullets = [
  "Track every lead from first touch to closed deal",
  "Run email campaigns to thousands of contacts",
  "Real-time analytics and revenue reporting",
  "Automate follow-ups and nurture sequences",
];

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 w-fit"
        >
          <div className="h-8 w-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">N</span>
          </div>
          <span className="text-primary-foreground font-bold text-lg">
            NeuCRM
          </span>
        </button>

        <div>
          <h2 className="text-3xl font-bold text-primary-foreground mb-3">
            Grow your business with smarter CRM
          </h2>
          <p className="text-primary-foreground/70 mb-8">
            Join 10,000+ companies closing more deals with NeuCRM.
          </p>
          <ul className="space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} className="text-primary-foreground" />
                </div>
                <span className="text-primary-foreground/80 text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-primary-foreground/40 text-sm">
          © 2026 NeuCRM. All rights reserved.
        </p>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-8 lg:hidden"
          >
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">
                N
              </span>
            </div>
            <span className="font-bold text-foreground">NeuCRM</span>
          </button>

          {children}
        </div>
      </div>
    </div>
  );
}
