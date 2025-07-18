import { useParams, Link } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { mockCategories } from "@shared/types";
import {
  ArrowLeft,
  Package,
  Layers,
  Home,
  Activity,
  Zap,
  Globe,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductView() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const category = mockCategories.find((cat) => cat.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
          <Package className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-4">
            Category Not Found
          </h1>
          <p className="text-primary/70 mb-6">
            The requested category could not be located.
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-banner to-primary text-white hover:from-primary hover:to-banner transition-all">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Professional background pattern */}
      <div
        className={
          'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23003244" fill-opacity="0.03"%3E%3Ccircle cx="10" cy="10" r="1"%3E%3C/circle%3E%3Ccircle cx="50" cy="50" r="1"%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-40'
        }
      ></div>

      {/* Professional Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-white/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-white/80 hover:bg-gradient-to-r from-banner to-primary border-white/30 hover:border-primary/30 transition-all"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              </Link>
              <div className="text-sm text-primary/60">
                Home → {category.name}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-banner" />
              <span className="text-sm font-semibold text-primary">
                {category.products.length} Products Available
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Category Showcase */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-3xl p-8 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
          <div className="relative z-10 flex items-center gap-8">
            <div className="text-8xl opacity-90">{category.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                {category.name}
              </h1>
              <p className="text-xl leading-relaxed mb-6 opacity-95">
                {category.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">
                    {category.products.length}
                  </div>
                  <div className="text-sm opacity-80">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">
                    {category.products.reduce(
                      (acc, p) => acc + (p.children?.length || 0),
                      0,
                    )}
                  </div>
                  <div className="text-sm opacity-80">Sub-Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">Multi</div>
                  <div className="text-sm opacity-80">Resolution</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">72h</div>
                  <div className="text-sm opacity-80">Range</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-white/50 hover:shadow-lg transition-all">
            <Activity className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-primary mb-2">High Resolution</h3>
            <p className="text-xs text-primary/70">
              Up to 500m spatial resolution for detailed analysis
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-white/50 hover:shadow-lg transition-all">
            <Zap className="h-8 w-8 text-banner mx-auto mb-3" />
            <h3 className="font-bold text-primary mb-2">Real-time</h3>
            <p className="text-xs text-primary/70">
              Live data updates every 6 hours
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-white/50 hover:shadow-lg transition-all">
            <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-primary mb-2">Multi-Domain</h3>
            <p className="text-xs text-primary/70">
              Regional and global coverage areas
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-white/50 hover:shadow-lg transition-all">
            <BarChart3 className="h-8 w-8 text-banner mx-auto mb-3" />
            <h3 className="font-bold text-primary mb-2">Ensemble</h3>
            <p className="text-xs text-primary/70">
              Probabilistic forecasting with uncertainty
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-primary mb-4">
            Available Products
          </h2>
          <p className="text-lg text-primary/70 mb-8">
            Professional meteorological products with advanced visualization and
            analysis capabilities
          </p>
        </div>

        {category.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {category.products.map((product, index) => (
              <div
                key={product.id}
                className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProductCard product={product} categoryId={category.id} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto border border-white/50">
              <Package className="h-16 w-16 text-primary/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">
                No Products Available
              </h3>
              <p className="text-primary/70">
                This category is currently being configured with new products.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Professional Footer */}
      <footer className="relative z-10 mt-20 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Platform Features</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Multi-model ensemble forecasting</li>
                <li>• High-resolution data visualization</li>
                <li>• Interactive map interfaces</li>
                <li>• Professional analysis tools</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Data Sources</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• NCUM Global Model</li>
                <li>• UM Regional 4km</li>
                <li>• NEPS Ensemble System</li>
                <li>• Specialized Products</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Technical Documentation</li>
                <li>• API Reference</li>
                <li>• User Guidelines</li>
                <li>• Professional Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 mt-8 text-center text-white/60 text-sm">
            Advanced Meteorological Platform - Professional Weather Services
          </div>
        </div>
      </footer>
    </div>
  );
}
