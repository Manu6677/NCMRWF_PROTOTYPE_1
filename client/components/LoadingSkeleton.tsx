import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "card" | "text" | "circle" | "button";
  lines?: number;
}

export function LoadingSkeleton({
  className,
  variant = "text",
  lines = 1,
}: LoadingSkeletonProps) {
  if (variant === "card") {
    return (
      <div
        className={cn(
          "bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 shadow-lg",
          className,
        )}
      >
        <div className="animate-pulse">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl skeleton"></div>
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg skeleton"></div>
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded skeleton w-3/4"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded skeleton"></div>
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded skeleton w-5/6"></div>
            <div className="flex gap-2 mt-4">
              <div className="h-6 w-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full skeleton"></div>
              <div className="h-6 w-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full skeleton"></div>
              <div className="h-6 w-14 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full skeleton"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "circle") {
    return (
      <div
        className={cn(
          "rounded-full bg-gradient-to-br from-slate-200 to-slate-300 skeleton",
          className,
        )}
      />
    );
  }

  if (variant === "button") {
    return (
      <div
        className={cn(
          "h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg skeleton",
          className,
        )}
      />
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded skeleton",
            i === lines - 1 && lines > 1 && "w-3/4",
          )}
        />
      ))}
    </div>
  );
}

export function ForecastImageSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <LoadingSkeleton className="h-5 w-32" />
        <div className="flex gap-2">
          <LoadingSkeleton variant="button" className="w-10 h-8" />
          <LoadingSkeleton variant="button" className="w-10 h-8" />
        </div>
      </div>
      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 -translate-x-full animate-[shimmer_2s_infinite] skeleton"></div>
        <div className="text-center space-y-4">
          <LoadingSkeleton variant="circle" className="w-16 h-16 mx-auto" />
          <LoadingSkeleton className="h-4 w-40" />
        </div>
      </div>
    </div>
  );
}

// Add shimmer animation to global CSS
const shimmerKeyframes = `
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(12deg); }
    100% { transform: translateX(200%) skewX(12deg); }
  }
`;

// Inject the keyframes into the document
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = shimmerKeyframes;
  document.head.appendChild(style);
}
