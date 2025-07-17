import { Product } from "@shared/types";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Layers,
  Zap,
  Clock,
  Activity,
  MapPin,
  Gauge,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  categoryId: string;
}

export function ProductCard({ product, categoryId }: ProductCardProps) {
  const hasChildren = product.children && product.children.length > 0;

  return (
    <Link
      to={`/category/${categoryId}/product/${product.id}`}
      className="block group"
    >
      <Card className="h-full bg-white/90 backdrop-blur-sm border border-white/50 hover:border-primary/30 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 overflow-hidden relative">
        {/* Professional background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className={
              'bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23E48022" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3Ccircle cx="10" cy="10" r="1"/%3E%3Ccircle cx="50" cy="50" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] absolute inset-0'
            }
          ></div>
        </div>

        {/* Gradient accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-banner to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-primary/20 to-banner/20 rounded-xl group-hover:scale-110 transition-transform duration-300 border border-white/30">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-primary group-hover:text-banner transition-colors duration-300">
                  {product.name}
                </CardTitle>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors font-semibold"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {product.modelName}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-banner/30 text-banner hover:bg-banner/10 transition-colors font-semibold"
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  {product.resolution}
                </Badge>
                {hasChildren && (
                  <Badge
                    variant="outline"
                    className="border-green-500/30 text-green-600 hover:bg-green-50 transition-colors font-semibold"
                  >
                    <Layers className="h-3 w-3 mr-1" />
                    {product.children.length} variants
                  </Badge>
                )}
              </div>
            </div>

            <div className="text-banner text-xl font-bold group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300">
              <ArrowRight className="h-6 w-6" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          <CardDescription className="text-primary/70 text-sm leading-relaxed mb-4 font-medium">
            {product.description}
          </CardDescription>

          <div className="space-y-4">
            {/* Professional tags */}
            <div>
              <h4 className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">
                Capabilities
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className="text-xs bg-banner/10 text-banner px-3 py-1 rounded-full font-medium hover:bg-banner/20 transition-colors cursor-pointer border border-banner/20"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: "fadeInUp 0.5s ease-out forwards",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical specifications */}
            <div className="bg-gradient-to-r from-primary/5 to-banner/5 rounded-xl p-3 border border-white/30">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-primary/60 font-semibold mb-1">
                    Resolution
                  </div>
                  <div className="text-primary font-bold">
                    {product.resolution}
                  </div>
                </div>
                <div>
                  <div className="text-primary/60 font-semibold mb-1">
                    Model
                  </div>
                  <div className="text-primary font-bold">
                    {product.modelName}
                  </div>
                </div>
              </div>

              {/* Performance indicator */}
              <div className="mt-3 pt-3 border-t border-white/30">
                <div className="flex justify-between text-xs text-primary/60 mb-1">
                  <span className="font-semibold">Performance Level</span>
                  <span className="font-semibold">
                    {product.resolution === "500m"
                      ? "Ultra High"
                      : product.resolution === "4km"
                        ? "High"
                        : product.resolution === "12km"
                          ? "Standard"
                          : "Specialized"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-banner h-2 rounded-full transition-all duration-1000 group-hover:from-banner group-hover:to-primary"
                    style={{
                      width:
                        product.resolution === "500m"
                          ? "100%"
                          : product.resolution === "4km"
                            ? "85%"
                            : product.resolution === "12km"
                              ? "70%"
                              : "60%",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Action area */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-primary/60">
                <Gauge className="h-3 w-3" />
                <span className="font-semibold">Professional Data</span>
              </div>
              <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">
                <Zap className="h-3 w-3" />
                Live
              </div>
            </div>
          </div>
        </CardContent>

        {/* Professional glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-banner/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"></div>
      </Card>
    </Link>
  );
}
