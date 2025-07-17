import { ForecastFilter, forecastHours, hpaLevels } from "@shared/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Filter, Clock, Gauge, Zap } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FilterControlsProps {
  filters: ForecastFilter;
  onFiltersChange: (filters: ForecastFilter) => void;
}

export function FilterControls({
  filters,
  onFiltersChange,
}: FilterControlsProps) {
  const selectedDate = new Date(filters.date);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      onFiltersChange({
        ...filters,
        date: format(date, "yyyy-MM-dd"),
      });
    }
  };

  const handleForecastHourChange = (value: string) => {
    onFiltersChange({
      ...filters,
      forecastHour: parseInt(value),
    });
  };

  const handleHpaLevelChange = (value: string) => {
    onFiltersChange({
      ...filters,
      hpaLevel: parseInt(value),
    });
  };

  return (
    <div className="glass rounded-xl shadow-lg border-0 overflow-hidden">
      {/* Compact header */}
      <div className="bg-gradient-to-r from-banner/80 to-primary/80 p-3 text-white">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-semibold">Quick Filters</span>
        </div>
      </div>

      <div className="p-4 bg-white/50 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Compact Date Picker */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-primary flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "w-full justify-start text-left font-normal h-9 bg-white/80 border-white/30 hover:bg-white hover:border-primary/30 transition-all",
                    !selectedDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-3 w-3 text-primary" />
                  {selectedDate ? (
                    <span className="text-xs">
                      {format(selectedDate, "MMM dd")}
                    </span>
                  ) : (
                    <span className="text-xs">Pick date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-0 shadow-xl">
                <div className="glass rounded-xl overflow-hidden">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    initialFocus
                    className="bg-transparent"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Compact Forecast Hour */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-primary flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Hour
            </label>
            <Select
              value={filters.forecastHour.toString()}
              onValueChange={handleForecastHourChange}
            >
              <SelectTrigger className="h-9 bg-white/80 border-white/30 hover:bg-white hover:border-banner/30 transition-all">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-banner" />
                  <span className="text-xs font-medium">
                    {filters.forecastHour}h
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-white/30 shadow-xl max-h-48">
                {forecastHours.map((hour) => (
                  <SelectItem
                    key={hour}
                    value={hour.toString()}
                    className="hover:bg-banner/10 transition-colors"
                  >
                    <span className="text-xs">{hour}h</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Compact hPa Level */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-primary flex items-center gap-1">
              <Gauge className="h-3 w-3" />
              Level
            </label>
            <Select
              value={filters.hpaLevel.toString()}
              onValueChange={handleHpaLevelChange}
            >
              <SelectTrigger className="h-9 bg-white/80 border-white/30 hover:bg-white hover:border-primary/30 transition-all">
                <div className="flex items-center gap-2">
                  <Gauge className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium">
                    {filters.hpaLevel}hPa
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-white/30 shadow-xl max-h-48">
                {hpaLevels.map((level) => (
                  <SelectItem
                    key={level}
                    value={level.toString()}
                    className="hover:bg-primary/10 transition-colors"
                  >
                    <span className="text-xs">{level} hPa</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick presets in compact form */}
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="text-xs font-medium text-primary mb-2 flex items-center gap-1">
            <Zap className="h-3 w-3" />
            Quick Presets
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onFiltersChange({ ...filters, forecastHour: 0, hpaLevel: 1000 })
              }
              className="bg-white/80 hover:bg-white text-xs h-8 px-2"
            >
              Current
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onFiltersChange({ ...filters, forecastHour: 24, hpaLevel: 850 })
              }
              className="bg-white/80 hover:bg-white text-xs h-8 px-2"
            >
              24h Mid
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onFiltersChange({ ...filters, forecastHour: 48, hpaLevel: 500 })
              }
              className="bg-white/80 hover:bg-white text-xs h-8 px-2"
            >
              48h Upper
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onFiltersChange({ ...filters, forecastHour: 72, hpaLevel: 200 })
              }
              className="bg-white/80 hover:bg-white text-xs h-8 px-2"
            >
              72h Jet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
