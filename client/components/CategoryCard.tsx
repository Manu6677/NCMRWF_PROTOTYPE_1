import { Category } from "@shared/types";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Package, Activity, Layers, Zap, Star } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  // Different color schemes for each category
  const isFirstCategory = category.id === "forecast-models";
  const cardColors = isFirstCategory
    ? {
        bg: "bg-gradient-to-br from-primary to-cyan-700",
        iconBg: "bg-white/20",
        textColor: "text-white",
        badgeBg: "bg-white/20",
        badgeText: "text-white",
        accentBg: "bg-white/10",
        border: "border-white/30",
      }
    : {
        bg: "bg-gradient-to-br from-primary to-cyan-700",
        iconBg: "bg-white/20",
        textColor: "text-white",
        badgeBg: "bg-white/20",
        badgeText: "text-white",
        accentBg: "bg-white/10",
        border: "border-white/30",
      };

  return (
    <Link to={`/category/${category.id}`} className="block group">
      <Card
        className={`${cardColors.bg} ${cardColors.border} border-2 hover:border-white/50 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-4 group-hover:scale-[1.02] overflow-hidden relative`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
        </div>

        {/* Hero-sized layout with strong visual contrast */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12">
          {/* Prominent Icon Section with strong background */}
          <div className="flex-shrink-0">
            <div
              className={`w-36 h-36 lg:w-44 lg:h-44 ${cardColors.iconBg} rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl ${cardColors.border} border-2 backdrop-blur-sm`}
            >
              <span className="text-9xl lg:text-10xl filter drop-shadow-lg">
                {category.icon}
              </span>
            </div>
          </div>

          {/* Main Content with enhanced typography */}
          <div className="flex-1 text-center lg:text-left">
            <CardTitle
              className={`text-5xl lg:text-6xl font-black ${cardColors.textColor} group-hover:scale-105 transition-all duration-300 mb-6 drop-shadow-lg`}
            >
              {category.name}
            </CardTitle>

            <CardDescription
              className={`text-xl lg:text-2xl ${cardColors.textColor}/90 leading-relaxed mb-8 font-semibold max-w-3xl drop-shadow-md`}
            >
              {category.description}
            </CardDescription>

            {/* Enhanced Statistics with strong visual identity */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <div
                className={`flex items-center gap-3 ${cardColors.badgeBg} px-6 py-3 rounded-full backdrop-blur-sm ${cardColors.border} border shadow-lg`}
              >
                <Package className={`h-6 w-6 ${cardColors.badgeText}`} />
                <span className={`font-black ${cardColors.badgeText} text-lg`}>
                  {category.products.length} Products
                </span>
              </div>
              <div
                className={`flex items-center gap-3 ${cardColors.badgeBg} px-6 py-3 rounded-full backdrop-blur-sm ${cardColors.border} border shadow-lg`}
              >
                <Layers className={`h-6 w-6 ${cardColors.badgeText}`} />
                <span className={`font-black ${cardColors.badgeText} text-lg`}>
                  {category.products.reduce(
                    (acc, p) => acc + (p.children?.length || 0),
                    0,
                  )}{" "}
                  Variants
                </span>
              </div>
              <div
                className={`flex items-center gap-3 ${cardColors.badgeBg} px-6 py-3 rounded-full backdrop-blur-sm ${cardColors.border} border shadow-lg animate-pulse`}
              >
                <Activity className={`h-6 w-6 ${cardColors.badgeText}`} />
                <span className={`font-black ${cardColors.badgeText} text-lg`}>
                  Live Data
                </span>
              </div>
            </div>

            {/* Featured Products with enhanced styling */}
            <div className="mb-8">
              <h4
                className={`text-sm font-black ${cardColors.textColor}/80 mb-4 uppercase tracking-wider flex items-center justify-center lg:justify-start gap-2`}
              >
                <Star className="h-4 w-4" />
                Featured Products
              </h4>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {category.products.slice(0, 4).map((product, index) => (
                  <span
                    key={product.id}
                    className={`${cardColors.accentBg} ${cardColors.textColor} px-5 py-3 rounded-xl font-bold text-sm ${cardColors.border} border backdrop-blur-sm hover:bg-white/30 transition-colors shadow-lg hover:scale-105 transform`}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    {product.name}
                  </span>
                ))}
                {category.products.length > 4 && (
                  <span
                    className={`${cardColors.textColor}/70 px-5 py-3 font-bold text-sm`}
                  >
                    +{category.products.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Action Section */}
          <div className="flex-shrink-0 flex flex-col items-center gap-6">
            <div
              className={`flex items-center gap-4 ${cardColors.textColor} font-black text-2xl group-hover:translate-x-3 group-hover:scale-110 transition-all duration-300 drop-shadow-lg`}
            >
              <span>Explore</span>
              <ArrowRight className="h-10 w-10 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div
              className={`flex items-center gap-2 ${cardColors.badgeBg} ${cardColors.badgeText} px-4 py-2 rounded-full font-black text-sm backdrop-blur-sm ${cardColors.border} border shadow-lg`}
            >
              <Zap className="h-4 w-4" />
              Professional
            </div>
          </div>
        </div>

        {/* Animated top accent bar */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-white/50 via-white/80 to-white/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-white/20 via-white/40 to-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
      </Card>
    </Link>
  );
}
