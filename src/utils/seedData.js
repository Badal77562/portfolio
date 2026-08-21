export const seedProjects = [
  {
    id: "seed-watershed",
    title: "Sub/Micro Watershed Prioritization",
    shortDesc: "Morphometric and hydrological analysis using MCDA techniques in Jhargram District to prioritize sub/micro watersheds for soil erosion control and conservation planning.",
    fullDesc: "Watershed degradation due to soil erosion is a critical ecological problem. This study conducts detailed morphometric modeling of linear, areal, and relief aspects of watersheds in Jhargram District, West Bengal. By establishing quantitative indices of drainage density, stream frequency, bifurcation ratios, and basin shape factor, watersheds are prioritized for physical soil conservation structures.",
    tech: ["QGIS", "ArcGIS", "Python", "MCDA / AHP", "DEM Processing"],
    category: "GIS",
    date: "2026-03-10",
    featured: true,
    image: "/WITH_BASEMAP_LAYOUT.jpg",
    screenshots: [
      "/WITH_BASEMAP_LAYOUT.jpg"
    ],

    workflow: [
      "DEM acquisition (ALOS PALSAR 12.5m) and preprocessing (sink filling, flow direction mapping)",
      "Automated stream network extraction using Strahler ordering algorithms",
      "Calculating 14 core morphometric parameters (linear, areal, and relief facets)",
      "Constructing a prioritized weighted hierarchy using Analytical Hierarchy Process (AHP)",
      "Zonal statistics classification into High, Medium, and Low prioritization zones"
    ],
    features: [
      "Precision spatial modeling at sub-catchment scale",
      "Automated python scripts for batch basin metrics calculation",
      "AHP scoring integration matrix",
      "Field-verified conservation layout maps"
    ],
    challenges: "Handling terrain sinks in low-relief regions caused stream disconnects. This was resolved using AGREE flow-drape hydro-conditioning algorithms to force the stream vectors into the grid profile.",
    results: "Prioritized 18 micro-watersheds, identifying 4 critical sub-basins requiring immediate stone bund and check dam infrastructure. Local authorities adopted the priority map for soil conservation deployment."
  },
  {
    id: "seed-soil-loss",
    title: "Soil Loss Potential Mapping",
    shortDesc: "Integrating the RUSLE equation with Sentinel-2 satellite imagery to model annual soil erosion across the lateritic terrains of Nayagram Block, Jhargram District.",
    fullDesc: "Soil erosion and land degradation are critical ecological challenges in the lateritic terrains of Nayagram block, Jhargram district, West Bengal. This study integrates the Revised Universal Soil Loss Equation (RUSLE) factors (Rainfall R, Soil Erodibility K, Topographic LS, Cover Management C, Support Practice P) in a GIS framework. By utilizing Sentinel-2 multi-spectral imagery to extract seasonal NDVI maps (C-factor) and digital soil maps for erodibility indexes, we delineated soil loss potential zones ranging from very low to very high (tons/hectare/year). The block is dominated by hard laterite and acidic red soils, which are highly vulnerable to monsoonal sheet and gully erosion on undulating plateau slopes.",
    tech: ["ArcGIS Spatial Analyst", "Sentinel-2", "NDVI", "Map Algebra", "RUSLE", "DEM Processing"],
    category: "Remote Sensing",
    date: "2025-11-20",
    featured: true,
    image: "/nayagram_soil_loss.jpg",
    screenshots: [
      "/nayagram_soil_loss.jpg"
    ],

    workflow: [
      "Acquisition of Sentinel-2 multi-spectral imagery and digital terrain elevation data (DEM) for Jhargram district",
      "Calculating Soil Erodibility (K) factor for acidic, porous red and laterite soil profiles of Nayagram CD block",
      "Extracting high-resolution Topographic factor (LS) to model slope length and steepness on undulating plateau extensions",
      "Deriving seasonal Cover Management (C) factors using NDVI index values to assess vegetation cover levels",
      "Applying standard RUSLE equation in GIS Raster Calculator to map soil loss potential zones from 'Very Low' to 'Very High'",
      "Delineating stream channels and analyzing erosion severity relative to local drainage networks draining to the Subarnarekha River"
    ],
    features: [
      "10-meter high-resolution spatial modeling",
      "Custom K-factor mapping for Chhotanagpur plateau extension soils",
      "Zonal analysis of soil loss by CD Block boundary",
      "Stream network correlation showing runoff erosion hotspots"
    ],
    challenges: "Distinguishing natural vegetation from agricultural crops in lateritic soil areas. Resolved by using multi-temporal Sentinel-2 scenes to analyze NDVI fluctuations and correlate crop cycles vs. permanent canopy forests.",
    results: "Mapped soil loss zones, identifying Nayagram's undulating upland slopes as high-risk hotspots (contributing over 35 t/ha/yr). The final map serves as a planning guide for local forest departments to deploy earthen check dams and contour trenching."
  },
  {
    id: "seed-groundwater",
    title: "Groundwater Potential Delineation",
    shortDesc: "Delineating groundwater recharge and potential aquifers across the crystalline hard rocks and lateritic valleys of Nayagram Block, Jhargram District.",
    fullDesc: "Delineating reliable groundwater recharge and extraction zones is critical for water security in the water-stressed, hard-rock terrains of Nayagram block, Jhargram district, West Bengal. This study integrates multi-parametric spatial overlays including lithology, geomorphology, drainage density, lineament (fracture) density, slope, soil, and land use/land cover (LULC). The geology of the block is a complex interface of crystalline granitic gneisses/schists of the Chhotanagpur Granite Gneissic Complex (CGGC) and a lateritic cover, with sandy alluvium deposits along the Subarnarekha River corridor. Weathered zones and deep fracture networks (identified by lineament mapping) act as principal aquifers, showing poor primary but high secondary porosity. By applying Analytic Hierarchy Process (AHP) weighted overlay, the block was classified into Poor, Moderate, Good, and Excellent groundwater potential zones.",
    tech: ["QGIS", "Landsat-8 OLI", "Lineament Extraction", "AHP", "Overlay Analysis", "Hydrogeology"],
    category: "Web GIS",
    date: "2026-01-15",
    featured: true,
    image: "/gwp_layout.jpg",
    screenshots: [
      "/gwp_layout.jpg"
    ],

    workflow: [
      "Digitizing geological boundaries (crystalline hard rock and lateritic patches) from historical GSI map records",
      "Extracting lineament networks from Landsat-8 OLI using directional Sobel and laplacian filters in remote sensing software",
      "Calculating drainage density and lineament density raster layers to prioritize recharge pathways",
      "Constructing thematic layers for slope, geomorphology, LULC, and soil type classes of Nayagram block",
      "Assigning normalized parameter weights using pairwise comparisons in AHP matrix to compute weighted overlay",
      "Delineating groundwater potential zones (Poor, Moderate, Good, Excellent) and validating against local tubewell yield records"
    ],
    features: [
      "Lineament fracture density correlation model",
      "Multi-criteria evaluation for hard rock weathered aquifers",
      "Borehole discharge yield cross-validation matrix",
      "High-resolution 10m spatial potential zoning"
    ],
    challenges: "Distinguishing dry lateritic uplands from high-potential weathered fractures, as both can look similar in raw spectral imagery. Resolved by combining thermal bands with lineament density and hydrological slope flow direction profiles.",
    results: "Mapped groundwater zones, showing that valley fills and fracture zones aligned along key lineaments exhibit 'Excellent' potential (discharge >5 L/s). The resulting map helps local authorities prioritize bore-well drill sites and site percolation tanks for water harvesting."
  },
  {
    id: "seed-landslide-sikkim",
    title: "Landslide Risk Zonation on South Sikkim",
    shortDesc: "Multi-criteria GIS-based landslide risk zonation of South Sikkim district using remote sensing data, terrain parameters, and weighted overlay analysis to classify risk from Very Low to Very High.",
    fullDesc: "South Sikkim, nestled in the Eastern Himalayas, is one of India's most landslide-prone regions due to its rugged topography, high seismicity, intense monsoon rainfall, and fragile geological formations. This study develops a comprehensive Landslide Risk Zonation (LRZ) map by integrating multiple geo-environmental conditioning factors in a GIS environment. Key parameters including slope gradient, aspect, curvature, lithology, lineament density, land use/land cover (LULC), soil type, drainage proximity, and rainfall intensity were systematically weighted using the Analytic Hierarchy Process (AHP). The final risk map delineates five risk zones — Very Low, Low, Moderate, High, and Very High — across the district. High and Very High risk zones are prominently concentrated in the northern and central parts of the district, coinciding with steep slopes, geological faults, and proximity to the Rangit and Teesta river corridors.",
    tech: ["ArcGIS", "QGIS", "Sentinel-2", "ALOS PALSAR DEM", "AHP / MCDA", "Landslide Inventory", "Remote Sensing"],
    category: "GIS",
    date: "2026-05-15",
    featured: true,
    image: "/landslide_risk_sikkim.jpg",
    screenshots: [
      "/landslide_risk_sikkim.jpg"
    ],
    workflow: [
      "Preparation of landslide inventory map using historical event records and Sentinel-2 imagery visual interpretation",
      "Extraction of terrain parameters (slope, aspect, curvature, elevation) from ALOS PALSAR 12.5m DEM",
      "Digitization and classification of lithological units and structural lineaments from geological survey maps",
      "LULC mapping using Sentinel-2 multi-spectral imagery with supervised classification (Maximum Likelihood)",
      "Derivation of drainage density and proximity-to-drainage rasters as hydrological conditioning factors",
      "Assigning normalized pairwise comparison weights using Analytic Hierarchy Process (AHP) with consistency ratio check",
      "Weighted overlay integration of all conditioning factors in GIS to produce the final five-class risk zonation map"
    ],
    features: [
      "Five-tier risk classification: Very Low, Low, Moderate, High, and Very High",
      "AHP-based multi-criteria weighted overlay with validated consistency ratio (CR < 0.1)",
      "Inset location maps showing South Sikkim within Indian district boundary context",
      "Integration of 9 geo-environmental conditioning factors",
      "Spatial correlation of Very High risk zones with Teesta and Rangit river corridors"
    ],
    challenges: "Separating geologically similar but risk-distinct zones in steep terrain where slope, aspect, and lithology change rapidly within short distances. This was addressed by incorporating curvature and lineament density as supplementary discriminatory factors, and cross-validating the output against historical landslide event locations.",
    results: "The risk zonation map reveals that approximately 25–30% of South Sikkim falls under High to Very High landslide risk categories, predominantly in the northern and central belt. The map has been used to guide infrastructure planning, identify vulnerable road corridors, and support disaster preparedness initiatives by the State Disaster Management Authority (SDMA)."
  }
];
