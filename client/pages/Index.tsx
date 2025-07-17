import { CategoryCard } from "@/components/CategoryCard";
import { mockCategories } from "@shared/types";
import { Cloud, Sparkles } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-banner relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-banner/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-banner/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Geometric pattern overlay */}
      <div
        className={
          'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M40 40L0 0v80l40-40zm0 0L80 0v80L40 40z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] bg-repeat opacity-30'
        }
      ></div>

      {/* Header with strong branding */}
      <header className="relative z-10 px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-4 bg-black/20 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20 mb-6">
            <Cloud className="h-10 w-10 text-white" />
            <h1 className="text-3xl font-black text-white">
              Weather Forecast Platform
            </h1>
            <Sparkles className="h-8 w-8 text-banner animate-pulse" />
          </div>
          <p className="text-white/90 text-xl font-medium">
            Professional meteorological intelligence at your fingertips
          </p>
        </div>
      </header>

      {/* MAIN FOCUS: Colorful Product Cards */}
      <main className="relative z-10 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Strong heading with color contrast */}
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
              Choose Your Service
            </h2>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto font-medium">
              Access professional weather forecasting platforms
            </p>
          </div>

          {/* Distinctive Product Cards */}
          <div className="space-y-12">
            {mockCategories.map((category, index) => (
              <div
                key={category.id}
                className="animate-in fade-in-0 slide-in-from-bottom-6 duration-700"
                style={{ animationDelay: `${index * 400}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer with color */}
      <footer className="relative z-10 mt-20 py-8 bg-black/30 backdrop-blur-sm border-t border-white/20">
        <div className="text-center text-white/80 font-medium">
          Advanced Weather Forecasting • Professional Services • Real-time Data
        </div>
      </footer>
    </div>
  );
}
