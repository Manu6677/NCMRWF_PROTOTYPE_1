import { ForecastImage } from "@shared/types";
import { Button } from "@/components/ui/button";
import { ZoomIn, Maximize2, Download, Image, Loader2 } from "lucide-react";
import { useState } from "react";
import { ForecastImageSkeleton } from "@/components/LoadingSkeleton";

interface ForecastImagePanelProps {
  forecastImage: ForecastImage | null;
  isLoading: boolean;
}

export function ForecastImagePanel({
  forecastImage,
  isLoading,
}: ForecastImagePanelProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDownload = () => {
    if (forecastImage) {
      const link = document.createElement("a");
      link.href = forecastImage.url;
      link.download = `forecast-${forecastImage.metadata.productName}-${forecastImage.metadata.date}.png`;
      link.click();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isLoading) {
    return <ForecastImageSkeleton />;
  }

  if (!forecastImage) {
    return (
      <div className="glass rounded-2xl shadow-xl border-0 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h3 className="text-lg font-bold text-primary flex items-center gap-2">
            <Image className="h-5 w-5" />
            Forecast Image
          </h3>
        </div>
        <div className="aspect-video bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-banner/5 via-primary/5 to-banner/5 animate-gradient opacity-30"></div>
          <div className="text-center space-y-4 relative z-10">
            <div className="p-6 bg-white/60 rounded-2xl backdrop-blur-sm border border-white/30">
              <Image className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <div className="text-muted-foreground font-medium">
                Select filters to view forecast
              </div>
              <div className="text-sm text-muted-foreground/70 mt-1">
                Configure date, hour, and pressure level
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="glass rounded-2xl shadow-xl border-0 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h3 className="text-lg font-bold text-primary flex items-center gap-2">
            <Image className="h-5 w-5" />
            Forecast Image
          </h3>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="bg-white/80 hover:bg-white border-white/30 hover:border-primary/30 transition-all"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="bg-white/80 hover:bg-white border-white/30 hover:border-banner/30 transition-all"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-slate-100 to-slate-200">
          {/* Loading overlay while image loads */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center z-10">
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                <div className="text-sm text-muted-foreground">
                  Loading forecast image...
                </div>
              </div>
            </div>
          )}

          <img
            src={forecastImage.url}
            alt={`Forecast for ${forecastImage.metadata.productName}`}
            className={`w-full aspect-video object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />

          {/* Enhanced metadata overlay */}
          <div className="absolute bottom-6 left-6 glass-dark text-white px-4 py-3 rounded-xl shadow-lg">
            <div className="font-bold text-sm mb-1">
              {forecastImage.metadata.productName}
            </div>
            <div className="text-xs opacity-90 space-y-1">
              <div className="flex items-center gap-3">
                <span>📅 {forecastImage.metadata.date}</span>
                <span>⏱ {forecastImage.metadata.forecastHour}h</span>
                <span>🌡 {forecastImage.metadata.hpaLevel} hPa</span>
              </div>
            </div>
          </div>

          {/* Enhanced zoom button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 bg-white/80 hover:bg-white border-white/30 shadow-lg"
            onClick={toggleFullscreen}
          >
            <ZoomIn className="h-4 w-4 mr-1" />
            Zoom
          </Button>

          {/* Gradient overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Enhanced fullscreen modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative max-w-[95vw] max-h-[95vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-banner to-primary text-white">
              <h3 className="font-bold">
                {forecastImage.metadata.productName}
              </h3>
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleFullscreen}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Close
              </Button>
            </div>
            <img
              src={forecastImage.url}
              alt={`Forecast for ${forecastImage.metadata.productName}`}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
