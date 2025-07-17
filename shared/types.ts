export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  modelName: string;
  resolution: string;
  tags: string[];
  children?: Product[];
}

export interface ForecastFilter {
  date: string;
  forecastHour: number;
  hpaLevel: number;
}

export interface ForecastImage {
  url: string;
  metadata: {
    date: string;
    forecastHour: number;
    hpaLevel: number;
    productName: string;
  };
}

// Real forecast data structure
export const mockCategories: Category[] = [
  {
    id: "forecast-models",
    name: "Forecast Models",
    description:
      "Comprehensive weather forecast models for various ranges and applications",
    icon: "🌍",
    products: [
      {
        id: "medium-range",
        name: "Medium Range",
        description: "5-10 day medium range forecasts",
        modelName: "NCUM",
        resolution: "12km",
        tags: ["medium-range", "5-10days"],
        children: [
          {
            id: "medium-wind",
            name: "Wind Forecast",
            description: "Medium range wind speed and direction",
            modelName: "NCUM",
            resolution: "12km",
            tags: ["wind", "medium-range"],
          },
          {
            id: "medium-rain",
            name: "Rain Forecast",
            description: "Medium range precipitation forecasts",
            modelName: "NCUM",
            resolution: "12km",
            tags: ["rainfall", "medium-range"],
          },
        ],
      },
      {
        id: "short-range",
        name: "Short Range",
        description: "1-5 day short range high resolution forecasts",
        modelName: "UM-Reg",
        resolution: "4km",
        tags: ["short-range", "1-5days"],
        children: [
          {
            id: "short-wind",
            name: "Wind Forecast",
            description: "Short range high resolution wind forecasts",
            modelName: "UM-Reg",
            resolution: "4km",
            tags: ["wind", "short-range"],
          },
          {
            id: "short-rain",
            name: "Rain Forecast",
            description: "Short range high resolution precipitation",
            modelName: "UM-Reg",
            resolution: "4km",
            tags: ["rainfall", "short-range"],
          },
        ],
      },
      {
        id: "ensemble",
        name: "Ensemble",
        description:
          "Probabilistic ensemble forecasts for uncertainty analysis",
        modelName: "NEPS",
        resolution: "12km",
        tags: ["ensemble", "probabilistic"],
        children: [
          {
            id: "geo-potential",
            name: "Geo Potential Height",
            description: "Ensemble geopotential height forecasts",
            modelName: "NEPS",
            resolution: "12km",
            tags: ["geopotential", "ensemble"],
          },
          {
            id: "rainfall-probability",
            name: "Rainfall Probability",
            description: "Probabilistic rainfall forecasts",
            modelName: "NEPS",
            resolution: "12km",
            tags: ["rainfall", "probability"],
          },
          {
            id: "ensemble-stamps",
            name: "Ensemble Stamps",
            description: "Individual ensemble member forecasts",
            modelName: "NEPS",
            resolution: "12km",
            tags: ["stamps", "members"],
            children: [
              {
                id: "stamp-rain",
                name: "Rain",
                description: "Individual ensemble member rain forecasts",
                modelName: "NEPS",
                resolution: "12km",
                tags: ["rainfall", "stamp"],
              },
              {
                id: "stamp-wind",
                name: "Wind",
                description: "Individual ensemble member wind forecasts",
                modelName: "NEPS",
                resolution: "12km",
                tags: ["wind", "stamp"],
              },
            ],
          },
        ],
      },
      {
        id: "extended-range",
        name: "Extended Range",
        description: "15-30 day extended range forecasts",
        modelName: "CFS",
        resolution: "38km",
        tags: ["extended-range", "15-30days"],
      },
      {
        id: "urban-model",
        name: "Urban Model",
        description: "High resolution urban meteorology forecasts",
        modelName: "UUM",
        resolution: "500m",
        tags: ["urban", "high-res"],
      },
    ],
  },
  {
    id: "special-products",
    name: "Special Products",
    description: "Specialized meteorological products and services",
    icon: "⚡",
    products: [
      {
        id: "severe-weather",
        name: "Severe Weather",
        description: "Warnings and forecasts for severe weather events",
        modelName: "Multi-Model",
        resolution: "Various",
        tags: ["severe", "warnings"],
        children: [
          {
            id: "severe-thunderstorm",
            name: "Thunderstorm",
            description: "Severe thunderstorm warnings and forecasts",
            modelName: "NCUM",
            resolution: "4km",
            tags: ["thunderstorm", "severe"],
          },
          {
            id: "severe-cyclone",
            name: "Cyclone",
            description: "Tropical cyclone track and intensity forecasts",
            modelName: "GFS-Hybrid",
            resolution: "12km",
            tags: ["cyclone", "track"],
          },
          {
            id: "severe-hail",
            name: "Hail",
            description: "Hailstorm probability and intensity forecasts",
            modelName: "NCUM",
            resolution: "4km",
            tags: ["hail", "probability"],
          },
        ],
      },
      {
        id: "neighbor-region",
        name: "Neighbor Region Services",
        description: "Meteorological services for neighboring regions",
        modelName: "Regional",
        resolution: "12km",
        tags: ["regional", "services"],
        children: [
          {
            id: "saarc-region",
            name: "SAARC Region",
            description: "Forecasts for SAARC member countries",
            modelName: "NCUM-R",
            resolution: "12km",
            tags: ["saarc", "regional"],
            children: [
              {
                id: "bangladesh",
                name: "Bangladesh",
                description: "Dedicated forecasts for Bangladesh",
                modelName: "NCUM-R",
                resolution: "12km",
                tags: ["bangladesh"],
                children: [
                  {
                    id: "bangladesh-monsoon",
                    name: "Monsoon Forecasts",
                    description: "Monsoon forecasts for Bangladesh region",
                    modelName: "NCUM-R",
                    resolution: "12km",
                    tags: ["monsoon", "bangladesh"],
                  },
                  {
                    id: "bangladesh-cyclone",
                    name: "Cyclone Warnings",
                    description:
                      "Bay of Bengal cyclone warnings for Bangladesh",
                    modelName: "NCUM-R",
                    resolution: "12km",
                    tags: ["cyclone", "bangladesh"],
                  },
                ],
              },
              {
                id: "sri-lanka",
                name: "Sri Lanka",
                description: "Dedicated forecasts for Sri Lanka",
                modelName: "NCUM-R",
                resolution: "12km",
                tags: ["sri-lanka"],
                children: [
                  {
                    id: "sri-lanka-rainfall",
                    name: "Rainfall Forecasts",
                    description: "Detailed rainfall forecasts for Sri Lanka",
                    modelName: "NCUM-R",
                    resolution: "12km",
                    tags: ["rainfall", "sri-lanka"],
                  },
                ],
              },
            ],
          },
          {
            id: "ioc-region",
            name: "Indian Ocean Region",
            description: "Marine and island forecasts for Indian Ocean",
            modelName: "NCUM-G",
            resolution: "25km",
            tags: ["indian-ocean", "marine"],
            children: [
              {
                id: "maldives",
                name: "Maldives",
                description: "Marine forecasts for Maldives",
                modelName: "NCUM-G",
                resolution: "25km",
                tags: ["maldives", "marine"],
              },
              {
                id: "mauritius",
                name: "Mauritius",
                description: "Tropical weather forecasts for Mauritius",
                modelName: "NCUM-G",
                resolution: "25km",
                tags: ["mauritius", "tropical"],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const forecastHours = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72];
export const hpaLevels = [
  1000, 975, 950, 925, 900, 850, 800, 700, 600, 500, 400, 300, 250, 200,
];
