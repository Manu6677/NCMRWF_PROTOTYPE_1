import { Product } from "@shared/types";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  ChevronRight,
  Layers,
  Zap,
  Package,
  Star,
} from "lucide-react";
import { useState } from "react";

interface ExtraChildrenHandlerProps {
  children: Product[];
  selectedChild: Product | null;
  onChildSelect: (child: Product) => void;
}

export function ExtraChildrenHandler({
  children,
  selectedChild,
  onChildSelect,
}: ExtraChildrenHandlerProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Group children by category with better logic
  const groupedChildren = children.reduce(
    (acc, child) => {
      // Group by model name or first tag
      let group = child.modelName;
      if (child.tags.length > 0) {
        const tag = child.tags[0];
        if (tag.includes("surface") || tag.includes("stamp")) {
          group = "Surface & Analysis";
        } else if (tag.includes("upper") || tag.includes("geopotential")) {
          group = "Upper Air";
        } else if (tag.includes("probability") || tag.includes("ensemble")) {
          group = "Probabilistic";
        } else {
          group = child.modelName || "General";
        }
      }

      if (!acc[group]) acc[group] = [];
      acc[group].push(child);
      return acc;
    },
    {} as Record<string, Product[]>,
  );

  const groups = Object.keys(groupedChildren);

  // Enhanced tabs design for multiple groups
  if (groups.length > 1) {
    return (
      <div className="glass rounded-2xl shadow-xl border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-banner p-6 text-white">
          <div className="flex items-center gap-3">
            <Layers className="h-6 w-6" />
            <div>
              <h4 className="text-lg font-bold">Sub-Products</h4>
              <p className="text-sm opacity-90">
                Explore detailed forecast components
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/50 backdrop-blur-sm">
          <Tabs defaultValue={groups[0]} className="w-full">
            <TabsList className="grid w-full bg-white/60 backdrop-blur-sm border border-white/30 p-1 rounded-xl">
              {groups.map((group, index) => (
                <TabsTrigger
                  key={group}
                  value={group}
                  className="text-xs md:text-sm font-medium data-[state=active]:bg-banner data-[state=active]:text-white transition-all rounded-lg"
                >
                  <span className="hidden md:inline">{group}</span>
                  <span className="md:hidden">
                    {group.split(" ")[0]} {index + 1}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {groups.map((group) => (
              <TabsContent key={group} value={group} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {groupedChildren[group].map((child, index) => (
                    <Button
                      key={child.id}
                      variant={
                        selectedChild?.id === child.id ? "default" : "outline"
                      }
                      className={`h-auto p-4 justify-start bg-white/80 hover:bg-white border-white/30 hover:border-banner/30 transition-all touch-target ${
                        selectedChild?.id === child.id
                          ? "bg-banner hover:bg-banner text-white border-banner"
                          : ""
                      }`}
                      onClick={() => onChildSelect(child)}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: "fadeInUp 0.5s ease-out forwards",
                      }}
                    >
                      <div className="flex items-start gap-3 text-left">
                        <div
                          className={`p-2 rounded-lg ${
                            selectedChild?.id === child.id
                              ? "bg-white/20"
                              : "bg-banner/10"
                          }`}
                        >
                          <Zap
                            className={`h-4 w-4 ${
                              selectedChild?.id === child.id
                                ? "text-white"
                                : "text-banner"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm mb-1">
                            {child.name}
                          </div>
                          <div
                            className={`text-xs leading-relaxed ${
                              selectedChild?.id === child.id
                                ? "text-white/80"
                                : "text-muted-foreground"
                            }`}
                          >
                            {child.description}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {child.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className={`text-xs px-2 py-1 rounded-full ${
                                  selectedChild?.id === child.id
                                    ? "bg-white/20 text-white"
                                    : "bg-primary/10 text-primary"
                                }`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    );
  }

  // Enhanced collapsible for many items
  if (children.length > 4) {
    return (
      <div className="glass rounded-2xl shadow-xl border-0 overflow-hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-6 h-auto bg-gradient-to-r from-primary/5 to-banner/5 hover:from-primary/10 hover:to-banner/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <Package className="h-6 w-6 text-primary" />
                <div className="text-left">
                  <span className="text-lg font-bold text-primary">
                    More Products
                  </span>
                  <div className="text-sm text-muted-foreground">
                    {children.length} additional forecast components
                  </div>
                </div>
              </div>
              {isOpen ? (
                <ChevronDown className="h-5 w-5 text-primary" />
              ) : (
                <ChevronRight className="h-5 w-5 text-primary" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
              {children.map((child, index) => (
                <Button
                  key={child.id}
                  variant={
                    selectedChild?.id === child.id ? "default" : "outline"
                  }
                  className={`h-auto p-4 justify-start bg-white/80 hover:bg-white border-white/30 hover:border-banner/30 transition-all touch-target ${
                    selectedChild?.id === child.id
                      ? "bg-banner hover:bg-banner text-white border-banner"
                      : ""
                  }`}
                  onClick={() => onChildSelect(child)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: "fadeInUp 0.3s ease-out forwards",
                  }}
                >
                  <div className="flex items-start gap-3 text-left">
                    <Star
                      className={`h-4 w-4 mt-1 ${
                        selectedChild?.id === child.id
                          ? "text-white"
                          : "text-banner"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-1">
                        {child.name}
                      </div>
                      <div
                        className={`text-xs leading-relaxed ${
                          selectedChild?.id === child.id
                            ? "text-white/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {child.description}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  }

  // Enhanced simple list for few items
  return (
    <div className="glass rounded-2xl shadow-xl border-0 overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-banner/10 p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          <Layers className="h-5 w-5 text-primary" />
          <h4 className="text-lg font-bold text-primary">Sub-Products</h4>
        </div>
      </div>
      <div className="p-6 bg-white/50 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map((child, index) => (
            <Button
              key={child.id}
              variant={selectedChild?.id === child.id ? "default" : "outline"}
              className={`h-auto p-4 justify-start bg-white/80 hover:bg-white border-white/30 hover:border-banner/30 transition-all touch-target ${
                selectedChild?.id === child.id
                  ? "bg-banner hover:bg-banner text-white border-banner"
                  : ""
              }`}
              onClick={() => onChildSelect(child)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.5s ease-out forwards",
              }}
            >
              <div className="flex items-start gap-3 text-left">
                <div
                  className={`p-2 rounded-lg ${
                    selectedChild?.id === child.id
                      ? "bg-white/20"
                      : "bg-banner/10"
                  }`}
                >
                  <Zap
                    className={`h-4 w-4 ${
                      selectedChild?.id === child.id
                        ? "text-white"
                        : "text-banner"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">{child.name}</div>
                  <div
                    className={`text-xs leading-relaxed ${
                      selectedChild?.id === child.id
                        ? "text-white/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {child.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
