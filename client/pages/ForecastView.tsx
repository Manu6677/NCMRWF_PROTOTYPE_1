import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  mockCategories,
  ForecastFilter,
  ForecastImage,
  Product,
} from "@shared/types";
import { FilterControls } from "@/components/FilterControls";
import { ForecastImagePanel } from "@/components/ForecastImagePanel";
import { ExtraChildrenHandler } from "@/components/ExtraChildrenHandler";
import {
  ArrowLeft,
  Home,
  Settings,
  Calendar,
  Clock,
  Gauge,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function ForecastView() {
  const { categoryId, productId } = useParams<{
    categoryId: string;
    productId: string;
  }>();

  const [selectedChild, setSelectedChild] = useState<Product | null>(null);
  const [forecastImage, setForecastImage] = useState<ForecastImage | null>(
    null,
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState<ForecastFilter>({
    date: format(new Date(), "yyyy-MM-dd"),
    forecastHour: 0,
    hpaLevel: 1000,
  });

  const category = mockCategories.find((cat) => cat.id === categoryId);
  const product = category?.products.find((prod) => prod.id === productId);

  useEffect(() => {
    const generateForecastImage = () => {
      const currentProduct = selectedChild || product;
      if (currentProduct) {
        let imageUrl = "";

        if (
          currentProduct.name.toLowerCase().includes("wind") ||
          currentProduct.name.toLowerCase().includes("jet")
        ) {
          if (filters.hpaLevel <= 500) {
            imageUrl =
              "https://nwp.ncmrwf.gov.in/Data/mihir/2025-07-17/00/NCUM-Outputs/Wind-Forecast/pf1_200.png";
          } else {
            imageUrl =
              "https://nwp.ncmrwf.gov.in/Data/mihir/2025-07-17/00/UM-Reg4Km/Wind-Forecast/reg_pf0_200.png";
          }
        } else if (currentProduct.name.toLowerCase().includes("rain")) {
          imageUrl = "https://nwp.ncmrwf.gov.in/Obs_Rain/orain_7days.gif";
        } else {
          imageUrl =
            "https://nwp.ncmrwf.gov.in/Data/mihir/2025-07-17/00/NCUM-Outputs/Wind-Forecast/pf1_200.png";
        }

        const forecastImage: ForecastImage = {
          url: imageUrl,
          metadata: {
            date: filters.date,
            forecastHour: filters.forecastHour,
            hpaLevel: filters.hpaLevel,
            productName: currentProduct.name,
          },
        };
        setForecastImage(forecastImage);
      }
    };

    if (product) {
      generateForecastImage();
    }
  }, [product, selectedChild, filters]);

  if (!category || !product) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-50/50 to-blue-50/30">
        <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/50">
          <h1 className="text-xl font-bold text-primary mb-3">
            Product not found
          </h1>
          <Link to="/">
            <Button className="bg-gradient-to-r from-banner to-primary text-white hover:from-primary hover:to-banner transition-all">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentProduct = selectedChild || product;
  const hasChildren = product.children && product.children.length > 0;

  return (
    <div className="h-screen bg-gradient-to-br from-white via-orange-50/50 to-blue-50/30 flex flex-col overflow-hidden">
      {/* Professional minimal header */}
      <header className="h-15 bg-white/90 backdrop-blur-sm border-b border-white/50 flex-shrink-0">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-white/60"
              >
                <Home className="h-4 w-4" />
              </Button>
            </Link>
            <Link to={`/category/${categoryId}`}>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-white/60"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-banner" />
              <span className="text-sm font-bold text-primary truncate max-w-48">
                {currentProduct.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1">
              <Badge
                variant="outline"
                className="text-xs h-6 px-2 bg-white/80 border-white/50 text-primary font-semibold"
              >
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(filters.date), "MMM dd")}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs h-6 px-2 bg-white/80 border-white/50 text-banner font-semibold"
              >
                <Clock className="h-3 w-3 mr-1" />
                {filters.forecastHour}h
              </Badge>
              <Badge
                variant="outline"
                className="text-xs h-6 px-2 bg-white/80 border-white/50 text-primary font-semibold"
              >
                <Gauge className="h-3 w-3 mr-1" />
                {filters.hpaLevel}hPa
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 bg-white/90 hover:bg-white border-white/50"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Prominent Map Area - Professional styling */}
        <div className="flex-1 p-4 overflow-hidden">
          <ForecastImagePanel forecastImage={forecastImage} isLoading={false} />
        </div>

        {/* Professional Sidebar */}
        {sidebarOpen && (
          <div className="w-80 border-l border-white/50 bg-white/90 backdrop-blur-sm flex-shrink-0 overflow-y-auto custom-scrollbar">
            <div className="p-4 space-y-4">
              {/* Product information */}
              <div className="bg-gradient-to-r from-primary/5 to-banner/5 rounded-xl p-4 border border-white/50">
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-primary/10 text-primary font-bold"
                  >
                    {currentProduct.modelName}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs border-banner/30 text-banner font-bold"
                  >
                    {currentProduct.resolution}
                  </Badge>
                </div>
                <p className="text-xs text-primary/70 leading-relaxed font-medium">
                  {currentProduct.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {currentProduct.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/60 text-primary px-2 py-1 rounded-full font-medium border border-white/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sub-products with professional styling */}
              {hasChildren && (
                <div className="bg-white/60 rounded-xl p-4 border border-white/50">
                  <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Product Variants
                  </h3>
                  <div className="space-y-2">
                    {product.children!.map((child) => (
                      <Button
                        key={child.id}
                        variant={
                          selectedChild?.id === child.id ? "default" : "outline"
                        }
                        size="sm"
                        className={`w-full justify-start h-auto p-3 text-xs transition-all ${
                          selectedChild?.id === child.id
                            ? "bg-gradient-to-r from-banner to-primary text-white hover:from-primary hover:to-banner"
                            : "bg-white/80 hover:bg-slate-500 border-white/50 hover:border-primary/30"
                        }`}
                        onClick={() => setSelectedChild(child)}
                      >
                        <div className="text-left">
                          <div className="font-bold">{child.name}</div>
                          <div className="text-xs opacity-80 mt-1">
                            {child.description}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Professional compact filters */}
              <div className="bg-white/60 rounded-xl p-4 border border-white/50">
                <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Filter Controls
                </h3>

                <div className="space-y-3">
                  {/* Date display */}
                  <div>
                    <label className="text-xs font-bold text-primary mb-1 block uppercase tracking-wide">
                      Date
                    </label>
                    <div className="text-xs bg-white/80 rounded-lg p-2 border border-white/50 font-semibold text-primary">
                      {format(new Date(filters.date), "MMM dd, yyyy")}
                    </div>
                  </div>

                  {/* Forecast Hour */}
                  <div>
                    <label className="text-xs font-bold text-primary mb-1 block uppercase tracking-wide">
                      Forecast Hour
                    </label>
                    <select
                      value={filters.forecastHour}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          forecastHour: parseInt(e.target.value),
                        })
                      }
                      className="w-full text-xs bg-white/80 rounded-lg p-2 border border-white/50 font-semibold text-primary focus:outline-none focus:border-primary/50"
                    >
                      {[0, 6, 12, 18, 24, 36, 48, 72].map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}h {hour === 0 ? "(Current)" : `(+${hour}hrs)`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pressure Level */}
                  <div>
                    <label className="text-xs font-bold text-primary mb-1 block uppercase tracking-wide">
                      Pressure Level
                    </label>
                    <select
                      value={filters.hpaLevel}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          hpaLevel: parseInt(e.target.value),
                        })
                      }
                      className="w-full text-xs bg-white/80 rounded-lg p-2 border border-white/50 font-semibold text-primary focus:outline-none focus:border-primary/50"
                    >
                      {[1000, 925, 850, 700, 500, 300, 200].map((level) => (
                        <option key={level} value={level}>
                          {level} hPa{" "}
                          {level >= 1000
                            ? "(Surface)"
                            : level >= 850
                              ? "(Low)"
                              : level >= 500
                                ? "(Mid)"
                                : "(Upper)"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Professional quick presets */}
                  <div>
                    <label className="text-xs font-bold text-primary mb-2 block uppercase tracking-wide">
                      Quick Presets
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: "Current", hour: 0, level: 1000 },
                        { name: "24h", hour: 24, level: 850 },
                        { name: "48h", hour: 48, level: 500 },
                        { name: "72h", hour: 72, level: 200 },
                      ].map((preset) => (
                        <Button
                          key={preset.name}
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 px-3 bg-white/80 hover:bg-white border-white/50 hover:border-primary/30 font-bold"
                          onClick={() =>
                            setFilters({
                              ...filters,
                              forecastHour: preset.hour,
                              hpaLevel: preset.level,
                            })
                          }
                        >
                          {preset.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile professional toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-20">
        <Button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-gradient-to-r from-banner to-primary text-white w-12 h-12 rounded-full shadow-xl hover:from-primary hover:to-banner transition-all"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
