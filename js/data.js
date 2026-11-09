/* ==========================================================================
   BYTEFORGE â€” ILLUSTRATIVE SAMPLE HARDWARE & PERIPHERALS CATALOGUE DATA
   Note: All product specifications, compatibility parameters, and prices are
   illustrative sample data for retail demonstration purposes.
   ========================================================================== */

window.BYTEFORGE_DATA = {
  brands: [
    { id: "ASUS", name: "ASUS", focus: "Motherboards, GPUs, Displays & Peripherals", group: "Components & Peripherals" },
    { id: "MSI", name: "MSI", focus: "Graphics Cards, Motherboards, PSUs & Monitors", group: "Components & Displays" },
    { id: "Gigabyte", name: "Gigabyte", focus: "AORUS Motherboards & WindForce Graphics", group: "Core Components" },
    { id: "Intel", name: "Intel", focus: "Core Unlocked Desktop & Workstation Processors", group: "Processors" },
    { id: "AMD", name: "AMD", focus: "Ryzen AM5 Processors & Radeon Graphics", group: "Processors & GPUs" },
    { id: "NVIDIA", name: "NVIDIA", focus: "GeForce RTX & Studio Graphics Architecture", group: "Graphics Architecture" },
    { id: "Corsair", name: "Corsair", focus: "DDR5 Memory, ATX 3.1 PSUs, Cases & Cooling", group: "Enthusiast Hardware" },
    { id: "Kingston", name: "Kingston", focus: "FURY DDR5 Memory & PCIe NVMe Storage", group: "Memory & Storage" },
    { id: "Samsung", name: "Samsung", focus: "PRO & EVO Series NVMe and SATA Solid State Drives", group: "Solid State Storage" },
    { id: "Logitech", name: "Logitech", focus: "PRO Series Wireless Mice, Headsets & 4K Webcams", group: "Pro Peripherals" },
    { id: "Razer", name: "Razer", focus: "Optical Keyboards, Ultralight Mice & Audio", group: "Gaming Peripherals" },
    { id: "Cooler Master", name: "Cooler Master", focus: "Airflow Chassis, Thermal Solutions & Power", group: "Thermal & Cases" }
  ],

  categories: [
    // PC Components (9)
    { id: "processors", name: "Processors (CPU)", shortName: "Processors", group: "components", builderStep: 1, desc: "Multi-core unlocked desktop and workstation processors for Socket AM5 and LGA1700." },
    { id: "graphics-cards", name: "Graphics Cards (GPU)", shortName: "Graphics Cards", group: "components", builderStep: 3, desc: "High-airflow triple-fan and dual-axial GPUs for 1440p, 4K gaming, and 3D rendering." },
    { id: "motherboards", name: "Motherboards", shortName: "Motherboards", group: "components", builderStep: 2, desc: "E-ATX, ATX, and Micro-ATX boards featuring robust VRM thermals and PCIe 5.0 connectivity." },
    { id: "memory", name: "RAM / Memory", shortName: "RAM / Memory", group: "components", builderStep: 4, desc: "Low-latency DDR5 and DDR4 dual-channel memory kits with XMP and EXPO profiles." },
    { id: "storage", name: "SSD & Storage", shortName: "SSD & Storage", group: "components", builderStep: 5, desc: "High-throughput M.2 NVMe PCIe Gen4 drives and reliable 2.5-inch SATA SSD storage." },
    { id: "power-supplies", name: "Power Supplies", shortName: "Power Supplies", group: "components", builderStep: 6, desc: "80 PLUS Gold fully modular ATX 3.1 power supplies with native 12V-2x6 GPU support." },
    { id: "pc-cabinets", name: "PC Cabinets", shortName: "PC Cabinets", group: "components", builderStep: 7, desc: "High-airflow mesh mid-towers, E-ATX chambers, and compact Micro-ATX enclosures." },
    { id: "cpu-coolers", name: "CPU Coolers", shortName: "CPU Coolers", group: "components", builderStep: 8, desc: "360mm liquid AIO coolers and dual-tower copper heatpipe air coolers." },
    { id: "case-fans", name: "Case Fans", shortName: "Case Fans", group: "components", builderStep: 9, desc: "High static-pressure 120mm and 140mm PWM fans for quiet chassis airflow." },

    // Peripherals (9)
    { id: "monitors", name: "Monitors", shortName: "Monitors", group: "peripherals", desc: "4K QD-OLED and high-refresh WQHD Rapid IPS displays for gaming and color-critical work." },
    { id: "keyboards", name: "Keyboards", shortName: "Keyboards", group: "peripherals", desc: "75% gasket-mounted custom wireless mechanical and rapid-trigger optical keyboards." },
    { id: "gaming-mice", name: "Gaming Mice", shortName: "Gaming Mice", group: "peripherals", desc: "Sub-60g ultralight wireless mice with high-precision optical sensors." },
    { id: "headsets", name: "Headsets", shortName: "Headsets", group: "peripherals", desc: "Studio-grade wireless gaming headsets with graphene drivers and broadcast microphones." },
    { id: "speakers", name: "Speakers", shortName: "Speakers", group: "peripherals", desc: "2.1 desktop speaker systems with dedicated subwoofers and spatial soundstages." },
    { id: "mousepads", name: "Mousepads", shortName: "Mousepads", group: "peripherals", desc: "Extended XL micro-weave desk mats with stitched anti-fray edges." },
    { id: "webcams", name: "Webcams", shortName: "Webcams", group: "peripherals", desc: "Ultra HD 4K creator and conferencing webcams with large-format sensors." },
    { id: "controllers", name: "Controllers", shortName: "Controllers", group: "peripherals", desc: "Low-latency wireless controllers equipped with Hall-effect thumbsticks and rear paddles." },
    { id: "networking", name: "Networking Accessories", shortName: "Networking", group: "peripherals", desc: "Multi-gigabit Wi-Fi 7 routers and low-latency ethernet hardware." }
  ],

  builderSteps: [
    { step: 1, key: "cpu", categoryId: "processors", title: "Processor (CPU)", subtitle: "Select platform architecture (AM5 or LGA1700)", required: true },
    { step: 2, key: "motherboard", categoryId: "motherboards", title: "Motherboard", subtitle: "Match CPU socket, memory type & chassis form factor", required: true },
    { step: 3, key: "gpu", categoryId: "graphics-cards", title: "Graphics Card (GPU)", subtitle: "Verify physical card length against cabinet clearance", required: true },
    { step: 4, key: "ram", categoryId: "memory", title: "RAM / Memory", subtitle: "Match motherboard memory standard (DDR5 or DDR4)", required: true },
    { step: 5, key: "storage", categoryId: "storage", title: "SSD & Storage", subtitle: "Primary NVMe M.2 boot drive or high-capacity SSD", required: true },
    { step: 6, key: "psu", categoryId: "power-supplies", title: "Power Supply", subtitle: "Ensure sufficient wattage headroom for peak system load", required: true },
    { step: 7, key: "cabinet", categoryId: "pc-cabinets", title: "PC Cabinet", subtitle: "Supports motherboard form factor & GPU length clearance", required: true },
    { step: 8, key: "cooler", categoryId: "cpu-coolers", title: "CPU Cooler", subtitle: "Thermal dissipation matched to processor TDP rating", required: true },
    { step: 9, key: "fans", categoryId: "case-fans", title: "Additional Cooling / Fans", subtitle: "Supplemental chassis intake and exhaust airflow", required: false }
  ],

  customBuilds: [
    {
      id: "entry-gaming",
      name: "Entry-Level Gaming PC",
      codename: "FORGE CORE // 1080P-1440P",
      useCase: "Competitive eSports & High-FPS 1080p/1440p Gaming",
      image: "assets/images/builds/build-entry.jpg",
      estimatedPrice: 1296,
      targetPerf: "144+ FPS @ 1080p Ultra / 100+ FPS @ 1440p High (Illustrative)",
      highlights: [
        { label: "Processor", value: "Intel Core i5-14600K Class (14-Core)" },
        { label: "Graphics", value: "AMD Radeon RX 7800 XT 16GB Class" },
        { label: "Motherboard", value: "ASUS TUF B760-PLUS D4 (ATX)" },
        { label: "Memory & SSD", value: "32GB DDR4-3600 + 2TB SATA/NVMe SSD" },
        { label: "Power & Case", value: "650W 80+ Gold PSU + Mesh Mid-Tower" }
      ],
      components: {
        cpu: "cpu-core-i5-14600k",
        motherboard: "mobo-asus-b760",
        gpu: "gpu-amd-7800xt",
        ram: "ram-corsair-32gb-ddr4",
        storage: "ssd-samsung-870evo-2tb",
        psu: "psu-cm-mwe650",
        cabinet: "case-cm-nr200p",
        cooler: "cooler-cm-hyper622",
        fans: "fans-cm-mobius140"
      }
    },
    {
      id: "performance-gaming",
      name: "Performance Gaming PC",
      codename: "FORGE VELOCITY // 1440P ULTRA",
      useCase: "High-Refresh 1440p Ultra Gaming & Single-PC Streaming",
      image: "assets/images/builds/build-performance.jpg",
      estimatedPrice: 2152,
      targetPerf: "165+ FPS @ 1440p Ultra & Ray Tracing Ready (Illustrative)",
      highlights: [
        { label: "Processor", value: "AMD Ryzen 7 9800X3D Class (3D V-Cache)" },
        { label: "Graphics", value: "Gigabyte RTX 4070 Ti SUPER 16GB Class" },
        { label: "Motherboard", value: "MSI MAG B650M MORTAR WIFI (AM5)" },
        { label: "Memory & SSD", value: "32GB DDR5-6000 CL30 + 2TB 990 PRO NVMe" },
        { label: "Power & Case", value: "850W ATX 3.0 Gold + ASUS AP201 Mesh" }
      ],
      components: {
        cpu: "cpu-ryzen7-9800x3d",
        motherboard: "mobo-msi-b650m",
        gpu: "gpu-gigabyte-4070tis",
        ram: "ram-kingston-32gb-ddr5",
        storage: "ssd-samsung-990pro-2tb",
        psu: "psu-msi-a850g",
        cabinet: "case-asus-ap201",
        cooler: "cooler-cm-hyper622",
        fans: "fans-cm-mobius140"
      }
    },
    {
      id: "highend-gaming",
      name: "High-End Gaming PC",
      codename: "FORGE APEX // 4K FLAGSHIP",
      useCase: "Uncompromised 4K 240Hz Gaming, Path Tracing & VR",
      image: "assets/images/builds/build-highend.jpg",
      estimatedPrice: 3821,
      targetPerf: "120+ FPS @ 4K UHD Max Settings + Full Ray Tracing (Illustrative)",
      highlights: [
        { label: "Processor", value: "AMD Ryzen 9 9950X Class (16-Core AM5)" },
        { label: "Graphics", value: "ASUS ROG Strix RTX 4090 24GB Class" },
        { label: "Motherboard", value: "ASUS ROG Crosshair X870E Hero (ATX)" },
        { label: "Memory & SSD", value: "64GB DDR5-6400 + 2TB Samsung 990 PRO" },
        { label: "Cooling & Power", value: "360mm LCD AIO + 1000W ATX 3.1 Gold" }
      ],
      components: {
        cpu: "cpu-ryzen9-9950x",
        motherboard: "mobo-asus-x870e",
        gpu: "gpu-asus-4090",
        ram: "ram-corsair-64gb-ddr5",
        storage: "ssd-samsung-990pro-2tb",
        psu: "psu-corsair-rm1000x",
        cabinet: "case-corsair-5000d",
        cooler: "cooler-corsair-h150i",
        fans: "fans-corsair-qx120"
      }
    },
    {
      id: "workstation",
      name: "Professional Workstation",
      codename: "FORGE STUDIO // CREATOR & AI",
      useCase: "3D Rendering, CAD, Local LLM Compute & 8K Color Grading",
      image: "assets/images/builds/build-workstation.jpg",
      estimatedPrice: 3341,
      targetPerf: "Multi-Threaded Compute, 24-Core Rendering & CUDA Acceleration (Illustrative)",
      highlights: [
        { label: "Processor", value: "Intel Core i9-14900K Class (24-Core)" },
        { label: "Graphics", value: "NVIDIA RTX 4080 SUPER 16GB Studio Class" },
        { label: "Motherboard", value: "Gigabyte Z790 AORUS Master X (E-ATX)" },
        { label: "Memory & SSD", value: "64GB DDR5-6400 + 4TB Kingston Renegade NVMe" },
        { label: "Chassis & PSU", value: "Corsair 5000D Airflow + 1000W ATX 3.1 PSU" }
      ],
      components: {
        cpu: "cpu-core-i9-14900k",
        motherboard: "mobo-gigabyte-z790",
        gpu: "gpu-nvidia-4080s",
        ram: "ram-corsair-64gb-ddr5",
        storage: "ssd-kingston-renegade-4tb",
        psu: "psu-corsair-rm1000x",
        cabinet: "case-corsair-5000d",
        cooler: "cooler-corsair-h150i",
        fans: "fans-corsair-qx120"
      }
    }
  ],

  products: [
    // ==================== 1. PROCESSORS (CPU) ====================
    {
      id: "cpu-ryzen9-9950x",
      sku: "BF-CPU-AM5-9950X",
      name: "AMD Ryzen 9 9950X Class 16-Core Unlocked Desktop Processor",
      brand: "AMD",
      category: "processors",
      categoryGroup: "components",
      price: 649,
      availability: "In Stock",
      featured: true,
      popularity: 98,
      releaseOrder: 1,
      image: "assets/images/products/cpu-ryzen9-9950x.jpg",
      keySpec: "16 Cores / 32 Threads â€¢ Socket AM5 â€¢ Up to 5.7 GHz",
      shortDesc: "Flagship 16-core, 32-thread desktop processor engineered on Zen 5 architecture for heavy multi-threaded workstation compilation, 3D rendering, and enthusiast gaming.",
      compat: {
        socket: "AM5",
        tdpWatts: 170,
        memorySupport: "DDR5"
      },
      specs: {
        "Socket Platform": "AMD Socket AM5",
        "Core / Thread Count": "16 Cores / 32 Threads",
        "Boost / Base Clock": "Up to 5.7 GHz Boost / 4.3 GHz Base (Illustrative)",
        "Total L2 + L3 Cache": "80 MB Combined Cache",
        "Default TDP": "170W (Requires high-capacity Air or 240mm+ AIO Cooler)",
        "Memory Support": "Dual-Channel DDR5 up to DDR5-6400+ (AMD EXPO)",
        "PCI-Express Lanes": "PCIe 5.0 (28 Native Lanes)"
      },
      features: [
        "Unlocked multiplier for precision PBO and curve optimizer tuning",
        "Native PCIe 5.0 lanes for next-generation GPUs and Gen5 NVMe SSDs",
        "Integrated RDNA 2 graphics core for display diagnostic output",
        "Compatible with X870E, X870, X670E, and B650 Socket AM5 motherboards"
      ],
      variants: [
        { label: "Retail Box (Processor Only)", priceDelta: 0 },
        { label: "With Thermal Grizzly Contact Frame + Paste Bundle", priceDelta: 29 }
      ]
    },
    {
      id: "cpu-ryzen7-9800x3d",
      sku: "BF-CPU-AM5-9800X3D",
      name: "AMD Ryzen 7 9800X3D Class 8-Core 3D V-Cache Gaming Processor",
      brand: "AMD",
      category: "processors",
      categoryGroup: "components",
      price: 479,
      availability: "In Stock",
      featured: true,
      popularity: 100,
      releaseOrder: 2,
      image: "assets/images/products/cpu-ryzen7-9800x3d.jpg",
      keySpec: "8 Cores / 16 Threads â€¢ 96MB L3 3D V-Cache â€¢ AM5",
      shortDesc: "Second-generation 3D V-Cache gaming processor delivering class-leading 1% low frame pacing and ultra-low latency across simulation and eSports titles.",
      compat: {
        socket: "AM5",
        tdpWatts: 120,
        memorySupport: "DDR5"
      },
      specs: {
        "Socket Platform": "AMD Socket AM5",
        "Core / Thread Count": "8 Cores / 16 Threads",
        "Boost / Base Clock": "Up to 5.2 GHz Boost / 4.7 GHz Base (Illustrative)",
        "L3 Cache Architecture": "96 MB 3D V-Cache + 8 MB L2",
        "Default TDP": "120W",
        "Memory Support": "Dual-Channel DDR5 (Optimal sweet spot: DDR5-6000 CL30)",
        "PCI-Express Version": "PCIe 5.0"
      },
      features: [
        "Relocated 3D V-Cache stack beneath the compute die for superior thermal transfer",
        "Full overclocking and undervolting support on AM5 chipsets",
        "High energy efficiency during gaming workloads (~65Wâ€“85W typical gaming draw)",
        "Ideal pairing for high-refresh 1440p and 4K graphics cards"
      ],
      variants: [
        { label: "Retail Box (Processor Only)", priceDelta: 0 }
      ]
    },
    {
      id: "cpu-core-i9-14900k",
      sku: "BF-CPU-LGA-14900K",
      name: "Intel Core i9-14900K Class 24-Core Unlocked Processor",
      brand: "Intel",
      category: "processors",
      categoryGroup: "components",
      price: 549,
      availability: "In Stock",
      featured: false,
      popularity: 91,
      releaseOrder: 3,
      image: "assets/images/products/cpu-core-i9-14900k.jpg",
      keySpec: "24 Cores (8P+16E) â€¢ Socket LGA1700 â€¢ Up to 6.0 GHz",
      shortDesc: "Hybrid 24-core (8 Performance + 16 Efficient cores) desktop processor engineered for multi-tasking creators, CAD workflows, and high-clock gaming.",
      compat: {
        socket: "LGA1700",
        tdpWatts: 253,
        memorySupport: "DDR5 / DDR4"
      },
      specs: {
        "Socket Platform": "Intel Socket LGA1700",
        "Core Configuration": "24 Cores (8 P-Cores + 16 E-Cores) / 32 Threads",
        "Max Turbo Frequency": "Up to 6.0 GHz Thermal Velocity Boost (Illustrative)",
        "Intel Smart Cache": "36 MB L3 + 32 MB L2 Cache",
        "Maximum Turbo Power": "253W PL2 (360mm AIO Liquid Cooler recommended)",
        "Memory Compatibility": "DDR5 or DDR4 (Dependent on selected LGA1700 motherboard)"
      },
      features: [
        "Hybrid architecture schedules background tasks to E-cores while keeping P-cores dedicated to primary workloads",
        "Supports Intel XMP 3.0 high-speed memory profiles",
        "Integrated UHD Graphics 770 with Quick Sync Video hardware encoding",
        "Compatible with Intel Z790 and B760 series motherboards"
      ],
      variants: [
        { label: "Unlocked i9-14900K (With Integrated GPU)", priceDelta: 0 },
        { label: "Unlocked i9-14900KF (No Integrated GPU)", priceDelta: -25 }
      ]
    },
    {
      id: "cpu-core-i5-14600k",
      sku: "BF-CPU-LGA-14600K",
      name: "Intel Core i5-14600K Class 14-Core Mainstream Performance CPU",
      brand: "Intel",
      category: "processors",
      categoryGroup: "components",
      price: 299,
      availability: "In Stock",
      featured: false,
      popularity: 86,
      releaseOrder: 4,
      image: "assets/images/products/cpu-core-i5-14600k.jpg",
      keySpec: "14 Cores (6P+8E) â€¢ Socket LGA1700 â€¢ 125W Base TDP",
      shortDesc: "Balanced 14-core processor offering strong single-core gaming responsiveness and multi-core productivity at an accessible mid-range price point.",
      compat: {
        socket: "LGA1700",
        tdpWatts: 150,
        memorySupport: "DDR5 / DDR4"
      },
      specs: {
        "Socket Platform": "Intel Socket LGA1700",
        "Core Configuration": "14 Cores (6 P-Cores + 8 E-Cores) / 20 Threads",
        "Max Turbo Frequency": "Up to 5.3 GHz (Illustrative)",
        "Smart Cache": "24 MB L3 Cache",
        "Processor Base / Turbo Power": "125W Base / 181W Max Turbo",
        "Memory Support": "Supports both DDR4 and DDR5 LGA1700 motherboards"
      },
      features: [
        "Flexible platform support for cost-effective DDR4 or high-bandwidth DDR5 builds",
        "Easily cooled by quality dual-tower air coolers or 240mm AIO units",
        "Unlocked multiplier on Z790 motherboards"
      ],
      variants: [
        { label: "Retail Box (Processor Only)", priceDelta: 0 }
      ]
    },

    // ==================== 2. GRAPHICS CARDS (GPU) ====================
    {
      id: "gpu-asus-4090",
      sku: "BF-GPU-ASUS-4090",
      name: "ASUS ROG Strix GeForce RTX 4090 OC Class 24GB Graphics Card",
      brand: "ASUS",
      category: "graphics-cards",
      categoryGroup: "components",
      price: 1899,
      availability: "Low Stock",
      featured: true,
      popularity: 99,
      releaseOrder: 1,
      image: "assets/images/products/gpu-asus-4090.jpg",
      keySpec: "24GB GDDR6X â€¢ 358mm Length â€¢ 450W TDP â€¢ 3.5-Slot",
      shortDesc: "Flagship 24GB graphics accelerator featuring a milled vapor chamber, die-cast metal exoskeleton, and triple Axial-tech fans for sustained 4K gaming and AI workloads.",
      compat: {
        lengthMm: 358,
        tdpWatts: 450,
        recommendedPsuWatts: 850,
        slots: 3.5
      },
      specs: {
        "VRAM Capacity & Type": "24 GB GDDR6X (384-bit Memory Interface)",
        "Card Dimensions (Length)": "358 mm Length Ã— 149 mm Width Ã— 70 mm Height (3.5-Slot)",
        "Thermal Design Power (TDP)": "450W (Requires 16-Pin 12V-2x6 / 3x 8-Pin Adapter)",
        "Recommended PSU Capacity": "850W â€“ 1000W ATX 3.0/3.1 Power Supply",
        "Display Outputs": "2Ã— HDMI 2.1a, 3Ã— DisplayPort 1.4a",
        "Cabinet Clearance Note": "Requires PC Cabinet with >= 360mm GPU clearance"
      },
      features: [
        "Patented milled vapor chamber with heatpipes for low core and VRAM junction temperatures",
        "Dual BIOS switch between Performance and Quiet acoustic profiles",
        "Integrated GPU anti-sag support bracket included in box",
        "0dB fan stop technology during light desktop workloads"
      ],
      variants: [
        { label: "Matte Graphite Black OC Edition", priceDelta: 0 },
        { label: "White Edition OC", priceDelta: 50 }
      ]
    },
    {
      id: "gpu-nvidia-4080s",
      sku: "BF-GPU-NV-4080S",
      name: "NVIDIA GeForce RTX 4080 SUPER Studio / Founders Class 16GB GPU",
      brand: "NVIDIA",
      category: "graphics-cards",
      categoryGroup: "components",
      price: 1049,
      availability: "In Stock",
      featured: true,
      popularity: 96,
      releaseOrder: 2,
      image: "assets/images/products/gpu-msi-4080s.jpg",
      keySpec: "16GB GDDR6X â€¢ 310mm Length â€¢ 320W TDP â€¢ Dual-Flow",
      shortDesc: "Precision-machined unibody 16GB graphics card built for high-frame-rate 4K gaming, DLSS 3 Frame Generation, and NVIDIA Studio creative acceleration.",
      compat: {
        lengthMm: 310,
        tdpWatts: 320,
        recommendedPsuWatts: 750,
        slots: 3.0
      },
      specs: {
        "VRAM Capacity & Type": "16 GB GDDR6X (256-bit Bus)",
        "Card Dimensions (Length)": "310 mm Length Ã— 140 mm Width (3-Slot)",
        "Thermal Design Power (TDP)": "320W (Native 16-Pin 12V-2x6 Header)",
        "Recommended PSU Capacity": "750W+ Power Supply",
        "Display Outputs": "1Ã— HDMI 2.1a, 3Ã— DisplayPort 1.4a"
      },
      features: [
        "Compact 310mm footprint fits comfortably in most Micro-ATX and Mid-Tower cases",
        "Dedicated Dual AV1 hardware encoders for 4K streaming and timeline export",
        "Anodized aluminum frame resists flex without requiring bulky support arms"
      ],
      variants: [
        { label: "Standard Studio Edition", priceDelta: 0 }
      ]
    },
    {
      id: "gpu-gigabyte-4070tis",
      sku: "BF-GPU-GIG-4070TIS",
      name: "Gigabyte AERO GeForce RTX 4070 Ti SUPER Class 16GB Graphics Card",
      brand: "Gigabyte",
      category: "graphics-cards",
      categoryGroup: "components",
      price: 829,
      availability: "In Stock",
      featured: true,
      popularity: 93,
      releaseOrder: 3,
      image: "assets/images/products/gpu-gigabyte-4070tis.jpg",
      keySpec: "16GB GDDR6X â€¢ 300mm Length â€¢ 285W TDP â€¢ WindForce 3X",
      shortDesc: "Creator-inspired metallic silver and charcoal triple-fan GPU with 16GB VRAM buffer, ideal for 1440p ultra-refresh gaming and compact mATX builds.",
      compat: {
        lengthMm: 300,
        tdpWatts: 285,
        recommendedPsuWatts: 700,
        slots: 2.6
      },
      specs: {
        "VRAM Capacity & Type": "16 GB GDDR6X (256-bit Bus)",
        "Card Dimensions (Length)": "300 mm Length Ã— 130 mm Width Ã— 57.6 mm Height",
        "Thermal Design Power (TDP)": "285W",
        "Recommended PSU Capacity": "700W+ Power Supply",
        "Cooling System": "WindForce 3X Alternate Spinning 90mm Fans + 8 Composite Heatpipes"
      },
      features: [
        "300mm length clears compact Micro-ATX cases including ASUS Prime AP201",
        "16GB VRAM capacity handles high-resolution texture packs and 3D viewport scenes",
        "Full-coverage metal backplate with flow-through exhaust cutout"
      ],
      variants: [
        { label: "Silver / Graphite Edition", priceDelta: 0 }
      ]
    },
    {
      id: "gpu-amd-7800xt",
      sku: "BF-GPU-AMD-7800XT",
      name: "AMD Radeon RX 7800 XT Reference Class 16GB Graphics Card",
      brand: "AMD",
      category: "graphics-cards",
      categoryGroup: "components",
      price: 499,
      availability: "In Stock",
      featured: false,
      popularity: 90,
      releaseOrder: 4,
      image: "assets/images/products/gpu-amd-7800xt.jpg",
      keySpec: "16GB GDDR6 â€¢ 267mm Length â€¢ 263W TDP â€¢ 2.5-Slot",
      shortDesc: "High-value 1440p rasterization powerhouse with 16GB GDDR6 memory in a compact 267mm dual-axial chassis that fits virtually any PC cabinet.",
      compat: {
        lengthMm: 267,
        tdpWatts: 263,
        recommendedPsuWatts: 650,
        slots: 2.5
      },
      specs: {
        "VRAM Capacity & Type": "16 GB GDDR6 (256-bit Bus + 64MB Infinity Cache)",
        "Card Dimensions (Length)": "267 mm Length Ã— 110 mm Width (2.5-Slot)",
        "Thermal Design Power (TDP)": "263W (Dual 8-Pin PCIe Power)",
        "Recommended PSU Capacity": "650W+ Power Supply",
        "Display Outputs": "2Ã— DisplayPort 2.1, 2Ã— HDMI 2.1"
      },
      features: [
        "DisplayPort 2.1 support for ultra-high-bandwidth next-gen monitors",
        "Uses standard dual 8-pin PCIe power cables without special adapters",
        "Compact 267mm length provides generous clearance in small form factor cases"
      ],
      variants: [
        { label: "Dual-Axial Reference Edition", priceDelta: 0 }
      ]
    },

    // ==================== 3. MOTHERBOARDS ====================
    {
      id: "mobo-asus-x870e",
      sku: "BF-MB-ASUS-X870E",
      name: "ASUS ROG Crosshair X870E Hero Class Socket AM5 ATX Motherboard",
      brand: "ASUS",
      category: "motherboards",
      categoryGroup: "components",
      price: 599,
      availability: "In Stock",
      featured: true,
      popularity: 95,
      releaseOrder: 1,
      image: "assets/images/products/mobo-asus-x870e.jpg",
      keySpec: "Socket AM5 â€¢ DDR5 â€¢ ATX â€¢ 18+2+2 Power Stages â€¢ PCIe 5.0",
      shortDesc: "Enthusiast Socket AM5 ATX motherboard engineered with 18+2+2 110A power stages, five M.2 slots with massive aluminum heatsinks, and dual USB4 40Gbps ports.",
      compat: {
        socket: "AM5",
        ramType: "DDR5",
        formFactor: "ATX",
        tdpWatts: 55
      },
      specs: {
        "CPU Socket": "AMD Socket AM5 (Ryzen 9000 / 8000 / 7000 Series)",
        "Memory Standard": "4Ã— DIMM DDR5, Max 192GB (Supports AMD EXPO up to DDR5-8000+)",
        "Form Factor": "Standard ATX (305 mm Ã— 244 mm)",
        "Expansion Slots": "2Ã— PCIe 5.0 x16 SafeSlots with Q-Release Slim",
        "Storage Interfaces": "3Ã— PCIe 5.0 M.2 + 2Ã— PCIe 4.0 M.2 + 4Ã— SATA 6Gb/s",
        "Networking": "Wi-Fi 7 (802.11be) + 5Gb + 2.5Gb Dual Ethernet"
      },
      features: [
        "Tool-free M.2 Q-Latch and PCIe Slot Q-Release mechanism for effortless GPU removal",
        "Diagnostic Q-Code LED display and onboard Start/FlexKey hardware buttons",
        "Thick L-shaped heatpipe VRM armor keeps power stages cool under sustained 170W+ CPU loads"
      ],
      variants: [
        { label: "Standard ATX Retail Package", priceDelta: 0 }
      ]
    },
    {
      id: "mobo-msi-b650m",
      sku: "BF-MB-MSI-B650M",
      name: "MSI MAG B650M Mortar WiFi Class Socket AM5 Micro-ATX Motherboard",
      brand: "MSI",
      category: "motherboards",
      categoryGroup: "components",
      price: 199,
      availability: "In Stock",
      featured: false,
      popularity: 92,
      releaseOrder: 2,
      image: "assets/images/products/mobo-msi-b650m.jpg",
      keySpec: "Socket AM5 â€¢ DDR5 â€¢ Micro-ATX â€¢ 12+2+1 VRM â€¢ Wi-Fi 6E",
      shortDesc: "Compact Micro-ATX AM5 motherboard delivering heavyweight 80A Smart Power Stage VRMs, dual M.2 Shield Frozr slots, and 2.5G LAN for clean mATX and mid-tower builds.",
      compat: {
        socket: "AM5",
        ramType: "DDR5",
        formFactor: "Micro-ATX",
        tdpWatts: 40
      },
      specs: {
        "CPU Socket": "AMD Socket AM5",
        "Memory Standard": "4Ã— DIMM DDR5, Dual-Channel up to DDR5-7600+ (OC)",
        "Form Factor": "Micro-ATX (244 mm Ã— 244 mm)",
        "Storage": "2Ã— M.2 PCIe 4.0 x4 Slots + 6Ã— SATA 6Gb/s Ports",
        "Networking": "Realtek 2.5Gbps LAN + Wi-Fi 6E + Bluetooth 5.3"
      },
      features: [
        "Fits both Micro-ATX compact cases and standard ATX/E-ATX towers",
        "6-layer server-grade PCB with 2oz thickened copper for signal integrity",
        "Rear Flash BIOS Button allows updating firmware with only power connected"
      ],
      variants: [
        { label: "Micro-ATX WiFi Edition", priceDelta: 0 }
      ]
    },
    {
      id: "mobo-gigabyte-z790",
      sku: "BF-MB-GIG-Z790",
      name: "Gigabyte Z790 AORUS Master X Class Socket LGA1700 E-ATX Motherboard",
      brand: "Gigabyte",
      category: "motherboards",
      categoryGroup: "components",
      price: 489,
      availability: "In Stock",
      featured: false,
      popularity: 88,
      releaseOrder: 3,
      image: "assets/images/products/mobo-gigabyte-z790.jpg",
      keySpec: "Socket LGA1700 â€¢ DDR5 â€¢ E-ATX â€¢ 10GbE LAN & Wi-Fi 7",
      shortDesc: "Workstation-caliber E-ATX motherboard for Intel LGA1700 processors featuring 20+1+2 direct digital VRM phases, Marvell 10GbE LAN, and finned-array thermal armor.",
      compat: {
        socket: "LGA1700",
        ramType: "DDR5",
        formFactor: "E-ATX",
        tdpWatts: 60
      },
      specs: {
        "CPU Socket": "Intel Socket LGA1700 (14th / 13th / 12th Gen Core)",
        "Memory Standard": "4Ã— DIMM DDR5 (Supports Intel XMP 3.0 up to DDR5-8266)",
        "Form Factor": "E-ATX (305 mm Ã— 260 mm â€” Requires E-ATX compatible Cabinet)",
        "Storage": "1Ã— PCIe 5.0 M.2 + 4Ã— PCIe 4.0 M.2 Slots",
        "Networking": "10GbE Base-T Ethernet + Wi-Fi 7"
      },
      features: [
        "Note: E-ATX width (260mm) requires an E-ATX compatible PC Cabinet (such as Corsair 5000D)",
        "10GbE networking built-in for high-speed NAS and studio render farm transfers",
        "EZ-Latch Plus screwless M.2 and PCIe x16 quick release"
      ],
      variants: [
        { label: "E-ATX Flagship Edition", priceDelta: 0 }
      ]
    },
    {
      id: "mobo-asus-b760",
      sku: "BF-MB-ASUS-B760D4",
      name: "ASUS TUF Gaming B760-PLUS WiFi D4 Class LGA1700 ATX Motherboard",
      brand: "ASUS",
      category: "motherboards",
      categoryGroup: "components",
      price: 159,
      availability: "In Stock",
      featured: false,
      popularity: 84,
      releaseOrder: 4,
      image: "assets/images/products/mobo-asus-b760.jpg",
      keySpec: "Socket LGA1700 â€¢ DDR4 Support â€¢ ATX â€¢ PCIe 5.0 x16",
      shortDesc: "Dependable LGA1700 ATX motherboard engineered specifically for DDR4 memory kits, enabling cost-effective gaming rigs with PCIe 5.0 GPU support and three M.2 slots.",
      compat: {
        socket: "LGA1700",
        ramType: "DDR4",
        formFactor: "ATX",
        tdpWatts: 38
      },
      specs: {
        "CPU Socket": "Intel Socket LGA1700",
        "Memory Standard": "4Ã— DIMM DDR4 Only (Up to 128GB DDR4-5333 OC)",
        "Form Factor": "Standard ATX (305 mm Ã— 244 mm)",
        "Expansion": "1Ã— PCIe 5.0 x16 Slot + 3Ã— PCIe 4.0 M.2 Slots",
        "Compatibility Note": "Requires DDR4 RAM modules (Not compatible with DDR5 RAM)"
      },
      features: [
        "Military-grade TUF chokes, MOSFETs, and capacitors for 24/7 stability",
        "Enables high-value builds utilizing low-latency DDR4-3600 memory kits",
        "Comprehensive Fan Xpert 4 thermal headers"
      ],
      variants: [
        { label: "ATX DDR4 WiFi Edition", priceDelta: 0 }
      ]
    },

    // ==================== 4. RAM / MEMORY ====================
    {
      id: "ram-corsair-64gb-ddr5",
      sku: "BF-RAM-COR-64D5",
      name: "Corsair Dominator Titanium 64GB (2x32GB) DDR5-6400 CL32 Memory Kit",
      brand: "Corsair",
      category: "memory",
      categoryGroup: "components",
      price: 279,
      availability: "In Stock",
      featured: true,
      popularity: 94,
      releaseOrder: 1,
      image: "assets/images/products/ram-corsair-64gb-ddr5.jpg",
      keySpec: "64GB (2Ã—32GB) â€¢ DDR5-6400 â€¢ CL32 â€¢ Forged Aluminum",
      shortDesc: "Precision-forged die-cast aluminum DDR5 dual-channel kit featuring hand-screened memory ICs, patented DHX cooling, and dual Intel XMP 3.0 / AMD EXPO profiles.",
      compat: {
        ramType: "DDR5",
        capacityGb: 64,
        tdpWatts: 16
      },
      specs: {
        "Memory Standard": "DDR5 Desktop UDIMM (288-Pin)",
        "Kit Capacity": "64 GB (2 Ã— 32 GB Dual-Channel Kit)",
        "Tested Speed & Latency": "6400 MT/s â€¢ CL32-40-40-84 @ 1.40V",
        "Profile Support": "Intel XMP 3.0 & AMD EXPO Dual Profiles",
        "Module Height": "57 mm (Swappable Top Fin Bar)"
      },
      features: [
        "Custom 10-layer high-performance PCB with onboard voltage regulation (PMIC)",
        "Compatible exclusively with DDR5 motherboards (AM5 and LGA1700 DDR5)",
        "Minimalist brushed titanium top fin bar for zero-RGB workstation builds"
      ],
      variants: [
        { label: "64GB (2x32GB) DDR5-6400 Matte Black", priceDelta: 0 },
        { label: "96GB (2x48GB) DDR5-6400 Creator Kit", priceDelta: 110 }
      ]
    },
    {
      id: "ram-kingston-32gb-ddr5",
      sku: "BF-RAM-KNG-32D5",
      name: "Kingston FURY Beast 32GB (2x16GB) DDR5-6000 CL30 Low-Profile Memory",
      brand: "Kingston",
      category: "memory",
      categoryGroup: "components",
      price: 119,
      availability: "In Stock",
      featured: true,
      popularity: 97,
      releaseOrder: 2,
      image: "assets/images/products/ram-kingston-32gb-ddr5.jpg",
      keySpec: "32GB (2Ã—16GB) â€¢ DDR5-6000 â€¢ CL30 â€¢ 34.9mm Low Profile",
      shortDesc: "Ultra-tight CL30 timing DDR5-6000 kit with a compact 34.9mm low-profile heatspreader designed to clear large dual-tower air coolers effortlessly.",
      compat: {
        ramType: "DDR5",
        capacityGb: 32,
        tdpWatts: 12
      },
      specs: {
        "Memory Standard": "DDR5 Desktop UDIMM (288-Pin)",
        "Kit Capacity": "32 GB (2 Ã— 16 GB Dual-Channel Kit)",
        "Tested Speed & Latency": "6000 MT/s â€¢ CL30-36-36 @ 1.35V",
        "Profile Support": "AMD EXPO & Intel XMP 3.0 Certified",
        "Module Height": "34.9 mm Low-Profile Clearance"
      },
      features: [
        "DDR5-6000 CL30 is the sweet-spot specification for AMD Ryzen AM5 processors",
        "34.9mm height guarantees zero clearance interference with dual-tower air coolers",
        "On-die ECC (ODECC) maintains data integrity at high clock frequencies"
      ],
      variants: [
        { label: "32GB (2x16GB) Anodized Black", priceDelta: 0 }
      ]
    },
    {
      id: "ram-corsair-32gb-ddr4",
      sku: "BF-RAM-COR-32D4",
      name: "Corsair Vengeance LPX 32GB (2x16GB) DDR4-3600 CL18 Memory Kit",
      brand: "Corsair",
      category: "memory",
      categoryGroup: "components",
      price: 74,
      availability: "In Stock",
      featured: false,
      popularity: 85,
      releaseOrder: 3,
      image: "assets/images/products/ram-corsair-32gb-ddr4.jpg",
      keySpec: "32GB (2Ã—16GB) â€¢ DDR4-3600 â€¢ CL18 â€¢ 34mm Low Profile",
      shortDesc: "Proven pure-aluminum low-profile DDR4-3600 memory kit tailored for DDR4 motherboards (such as B760 D4 and AM4 systems).",
      compat: {
        ramType: "DDR4",
        capacityGb: 32,
        tdpWatts: 10
      },
      specs: {
        "Memory Standard": "DDR4 Desktop UDIMM (288-Pin DDR4 Keying)",
        "Kit Capacity": "32 GB (2 Ã— 16 GB Dual-Channel Kit)",
        "Tested Speed & Latency": "3600 MT/s â€¢ CL18-22-22-42 @ 1.35V",
        "Compatibility Note": "For DDR4 Motherboards Only (Not compatible with DDR5 slots)"
      },
      features: [
        "8-layer PCB and pure aluminum heatspreader for rapid heat dissipation",
        "XMP 2.0 single-setting automatic frequency setup",
        "Ultra-low 34mm height fits even Mini-ITX and SFF builds"
      ],
      variants: [
        { label: "32GB (2x16GB) DDR4-3600 Black", priceDelta: 0 }
      ]
    },

    // ==================== 5. SSD & STORAGE ====================
    {
      id: "ssd-samsung-990pro-2tb",
      sku: "BF-SSD-SAM-990P2T",
      name: "Samsung 990 PRO 2TB PCIe 4.0 x4 NVMe M.2 Internal SSD",
      brand: "Samsung",
      category: "storage",
      categoryGroup: "components",
      price: 169,
      availability: "In Stock",
      featured: true,
      popularity: 99,
      releaseOrder: 1,
      image: "assets/images/products/ssd-samsung-990pro-2tb.jpg",
      keySpec: "2TB M.2 2280 â€¢ PCIe 4.0 NVMe â€¢ Up to 7,450 MB/s Read",
      shortDesc: "Flagship PCIe 4.0 M.2 NVMe solid state drive delivering up to 7,450 MB/s sequential reads and 1,400K IOPS random performance for instant asset streaming.",
      compat: {
        interface: "M.2 NVMe",
        capacityTb: 2,
        tdpWatts: 9
      },
      specs: {
        "Form Factor & Interface": "M.2 2280 â€¢ PCIe Gen 4.0 x4, NVMe 2.0",
        "Capacity": "2 TB (2,000 GB)",
        "Sequential Read / Write": "Up to 7,450 MB/s Read / 6,900 MB/s Write (Illustrative)",
        "DRAM Cache": "2 GB Low-Power DDR4 Onboard DRAM Cache",
        "Endurance Rating": "1,200 TBW (Terabytes Written)"
      },
      features: [
        "Nickel-coated in-house controller and heat spreader label for thermal control",
        "Dedicated DRAM cache ensures sustained write speeds during large 4K video transfers",
        "DirectStorage optimized for near-instant game level loads"
      ],
      variants: [
        { label: "2TB Standard M.2 2280 (For Motherboard Heatsinks)", priceDelta: 0 },
        { label: "2TB With Integrated Aluminum Heatsink", priceDelta: 20 }
      ]
    },
    {
      id: "ssd-kingston-renegade-4tb",
      sku: "BF-SSD-KNG-REN4T",
      name: "Kingston FURY Renegade 4TB PCIe 4.0 NVMe M.2 SSD with Heatsink",
      brand: "Kingston",
      category: "storage",
      categoryGroup: "components",
      price: 319,
      availability: "In Stock",
      featured: false,
      popularity: 91,
      releaseOrder: 2,
      image: "assets/images/products/ssd-kingston-renegade-4tb.jpg",
      keySpec: "4TB M.2 2280 â€¢ 7,300 MB/s â€¢ Aluminum Heatsink",
      shortDesc: "High-capacity 4TB NVMe workstation drive equipped with a low-profile graphene-aluminum heatsink and Phison E18 controller for massive project libraries.",
      compat: {
        interface: "M.2 NVMe",
        capacityTb: 4,
        tdpWatts: 10
      },
      specs: {
        "Form Factor & Interface": "M.2 2280 â€¢ PCIe 4.0 x4 NVMe",
        "Capacity": "4 TB (4,000 GB)",
        "Sequential Read / Write": "Up to 7,300 MB/s Read / 7,000 MB/s Write (Illustrative)",
        "Endurance Rating": "4,000 TBW High-Endurance 3D TLC NAND"
      },
      features: [
        "Massive 4,000 TBW write endurance rating suited for scratch disks and video editing",
        "Single-slot M.2 solution consolidates OS, applications, and multi-terabyte datasets"
      ],
      variants: [
        { label: "4TB With Heatsink", priceDelta: 0 }
      ]
    },
    {
      id: "ssd-samsung-870evo-2tb",
      sku: "BF-SSD-SAM-870E2T",
      name: "Samsung 870 EVO 2TB 2.5-Inch SATA III Internal Solid State Drive",
      brand: "Samsung",
      category: "storage",
      categoryGroup: "components",
      price: 139,
      availability: "In Stock",
      featured: false,
      popularity: 83,
      releaseOrder: 3,
      image: "assets/images/products/ssd-samsung-870evo-2tb.jpg",
      keySpec: "2TB 2.5-Inch SATA III â€¢ 560 MB/s â€¢ DRAM Cache",
      shortDesc: "Reliable 2.5-inch SATA III solid state drive ideal for secondary mass storage, archival project vaults, or expanding storage without occupying M.2 slots.",
      compat: {
        interface: "SATA III",
        capacityTb: 2,
        tdpWatts: 5
      },
      specs: {
        "Form Factor & Interface": "2.5-Inch (7mm) â€¢ SATA 6 Gb/s",
        "Capacity": "2 TB",
        "Sequential Read / Write": "Up to 560 MB/s Read / 530 MB/s Write",
        "DRAM Cache": "2 GB LPDDR4 DRAM"
      },
      features: [
        "Connects to any standard motherboard SATA port freeing up M.2 lanes",
        "Zero moving parts for silent operation and shock resistance"
      ],
      variants: [
        { label: "2TB 2.5-Inch SATA Drive", priceDelta: 0 }
      ]
    },

    // ==================== 6. POWER SUPPLIES ====================
    {
      id: "psu-corsair-rm1000x",
      sku: "BF-PSU-COR-1000X",
      name: "Corsair RM1000x SHIFT 1000W 80 PLUS Gold Fully Modular ATX 3.1 PSU",
      brand: "Corsair",
      category: "power-supplies",
      categoryGroup: "components",
      price: 189,
      availability: "In Stock",
      featured: true,
      popularity: 95,
      releaseOrder: 1,
      image: "assets/images/products/psu-corsair-rm1000x.jpg",
      keySpec: "1000W â€¢ 80 PLUS Gold â€¢ ATX 3.1 & Native 12V-2x6",
      shortDesc: "1000W fully modular ATX 3.1 power supply featuring patented side-mounted Type-5 micro-fit connectors and 105Â°C-rated Japanese electrolytic capacitors.",
      compat: {
        psuWatts: 1000,
        atxStandard: "ATX 3.1",
        tdpWatts: 0
      },
      specs: {
        "Continuous Output": "1000 Watts Continuous @ 50Â°C",
        "Efficiency Certification": "80 PLUS Gold & Cybenetics A- Acoustic Rating",
        "ATX / PCIe Standard": "ATX 3.1 Compliant â€¢ Native 600W PCIe 5.1 12V-2x6 Cable Included",
        "Cooling Fan": "140mm Fluid Dynamic Bearing Fan with Zero RPM Mode"
      },
      features: [
        "Side-mounted modular interface makes cable routing in dual-chamber and mid-tower cases effortless",
        "Handles 200% total power excursion spikes required by flagship GPUs",
        "Zero RPM fan mode keeps the fan completely off at low-to-medium loads"
      ],
      variants: [
        { label: "1000W Matte Black", priceDelta: 0 }
      ]
    },
    {
      id: "psu-msi-a850g",
      sku: "BF-PSU-MSI-A850GL",
      name: "MSI MAG A850GL PCIE5 850W 80 PLUS Gold Fully Modular Power Supply",
      brand: "MSI",
      category: "power-supplies",
      categoryGroup: "components",
      price: 119,
      availability: "In Stock",
      featured: false,
      popularity: 92,
      releaseOrder: 2,
      image: "assets/images/products/psu-msi-a850g.jpg",
      keySpec: "850W â€¢ 80 PLUS Gold â€¢ Native 16-Pin PCIe 5.0 â€¢ 140mm",
      shortDesc: "Compact 140mm-deep 850W 80 PLUS Gold modular PSU with a dual-color 16-pin 12V-2x6 connector that visually confirms full seating into your graphics card.",
      compat: {
        psuWatts: 850,
        atxStandard: "ATX 3.0",
        tdpWatts: 0
      },
      specs: {
        "Continuous Output": "850 Watts",
        "Efficiency Certification": "80 PLUS Gold Certified",
        "Dimensions": "140 mm (L) Ã— 150 mm (W) Ã— 86 mm (H)",
        "GPU Power Connector": "High-Visibility Dual-Tone 16-Pin 12V-2x6 (600W Rated)"
      },
      features: [
        "Yellow-tipped 16-pin GPU connector ensures you never have an incomplete plug insertion",
        "Short 140mm chassis depth leaves extra cable room in compact Micro-ATX cases"
      ],
      variants: [
        { label: "850W Modular Gold", priceDelta: 0 }
      ]
    },
    {
      id: "psu-cm-mwe650",
      sku: "BF-PSU-CM-MWE650",
      name: "Cooler Master MWE Gold 650 V2 650W 80 PLUS Gold Fully Modular PSU",
      brand: "Cooler Master",
      category: "power-supplies",
      categoryGroup: "components",
      price: 84,
      availability: "In Stock",
      featured: false,
      popularity: 85,
      releaseOrder: 3,
      image: "assets/images/products/psu-cm-mwe650.jpg",
      keySpec: "650W â€¢ 80 PLUS Gold â€¢ Fully Modular â€¢ 120mm HDB Fan",
      shortDesc: "Dependable 650W 80 PLUS Gold fully modular power supply designed for mid-range gaming systems with a 120mm Hydro Dynamic Bearing fan.",
      compat: {
        psuWatts: 650,
        atxStandard: "ATX 2.52",
        tdpWatts: 0
      },
      specs: {
        "Continuous Output": "650 Watts",
        "Efficiency Certification": "80 PLUS Gold (90% Efficiency at Typical Load)",
        "Cabling": "Fully Modular Flat Black Ribbon Cables",
        "Note": "Ideal for systems up to ~480W peak draw (Not intended for 450W flagship GPUs)"
      },
      features: [
        "Includes 2Ã— EPS 8-pin CPU connectors for modern motherboards",
        "Quiet 120mm HDB fan with thermal-sensing RPM curve"
      ],
      variants: [
        { label: "650W Fully Modular", priceDelta: 0 }
      ]
    },

    // ==================== 7. PC CABINETS ====================
    {
      id: "case-corsair-5000d",
      sku: "BF-CASE-COR-5000D",
      name: "Corsair 5000D Airflow Tempered Glass Mid-Tower ATX / E-ATX PC Cabinet",
      brand: "Corsair",
      category: "pc-cabinets",
      categoryGroup: "components",
      price: 164,
      availability: "In Stock",
      featured: true,
      popularity: 96,
      releaseOrder: 1,
      image: "assets/images/products/case-corsair-5000d.jpg",
      keySpec: "Supports E-ATX / ATX / mATX â€¢ Max GPU 400mm â€¢ 360mm AIO",
      shortDesc: "Spacious high-airflow steel and tempered glass chassis supporting E-ATX motherboards, up to 400mm flagship graphics cards, and dual 360mm radiators.",
      compat: {
        supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX"],
        maxGpuLengthMm: 400,
        tdpWatts: 0
      },
      specs: {
        "Motherboard Support": "E-ATX (up to 305mm Ã— 277mm), ATX, Micro-ATX, Mini-ITX",
        "Maximum GPU Length Clearance": "400 mm (Accommodates all triple-fan RTX 4090 cards)",
        "Maximum CPU Cooler Height": "170 mm",
        "Radiator Compatibility": "Front: up to 360mm â€¢ Top: up to 360mm â€¢ Side: up to 360mm",
        "Front I/O Panel": "1Ã— USB 3.2 Gen 2 Type-C, 2Ã— USB 3.2 Gen 1 Type-A, Audio Combo"
      },
      features: [
        "RapidRoute cable management channel with 25mm depth behind the motherboard tray",
        "Included PWM fan repeater controls up to 6 fans from a single motherboard header",
        "Steel high-airflow perforated front and top panels with removable nylon dust filters"
      ],
      variants: [
        { label: "Matte Graphite Black", priceDelta: 0 },
        { label: "Cool Slate White", priceDelta: 10 }
      ]
    },
    {
      id: "case-cm-nr200p",
      sku: "BF-CASE-CM-TD500",
      name: "Cooler Master MasterBox TD500 Mesh V2 ATX Mid-Tower Cabinet",
      brand: "Cooler Master",
      category: "pc-cabinets",
      categoryGroup: "components",
      price: 109,
      availability: "In Stock",
      featured: false,
      popularity: 89,
      releaseOrder: 2,
      image: "assets/images/products/case-cm-nr200p.jpg",
      keySpec: "Supports ATX / mATX â€¢ Max GPU 360mm â€¢ Polygonal Mesh",
      shortDesc: "Geometric FineMesh mid-tower supporting standard ATX and Micro-ATX motherboards with 360mm GPU clearance and removable top radiator bracket.",
      compat: {
        supportedFormFactors: ["ATX", "Micro-ATX"],
        maxGpuLengthMm: 360,
        tdpWatts: 0
      },
      specs: {
        "Motherboard Support": "Standard ATX, Micro-ATX, Mini-ITX (Does not support wide E-ATX)",
        "Maximum GPU Length Clearance": "360 mm",
        "Maximum CPU Cooler Height": "165 mm",
        "Included Fans": "3Ã— 120mm CF120 Pre-Installed Intake Fans"
      },
      features: [
        "Completely removable top panel simplifies 360mm AIO radiator installation",
        "Tool-free crystalline tempered glass side panel with captive thumbscrew"
      ],
      variants: [
        { label: "Gunmetal Black", priceDelta: 0 }
      ]
    },
    {
      id: "case-asus-ap201",
      sku: "BF-CASE-ASUS-AP201",
      name: "ASUS Prime AP201 33-Liter Micro-ATX Quasi-Filter Mesh PC Cabinet",
      brand: "ASUS",
      category: "pc-cabinets",
      categoryGroup: "components",
      price: 89,
      availability: "In Stock",
      featured: true,
      popularity: 93,
      releaseOrder: 3,
      image: "assets/images/products/case-asus-ap201.jpg",
      keySpec: "Micro-ATX Only â€¢ Max GPU 315mm â€¢ 33L Compact Footprint",
      shortDesc: "Minimalist 33-liter compact Micro-ATX mesh workstation and gaming chassis crafted with 57,000 precision-machined 1.5mm airflow perforations.",
      compat: {
        supportedFormFactors: ["Micro-ATX"],
        maxGpuLengthMm: 315,
        tdpWatts: 0
      },
      specs: {
        "Motherboard Support": "Micro-ATX & Mini-ITX Only (Does NOT fit full-size ATX or E-ATX boards)",
        "Maximum GPU Length Clearance": "315 mm Standard (Check GPU length before pairing!)",
        "Dimensions": "350 mm (H) Ã— 205 mm (W) Ã— 460 mm (D) â€¢ 33L Volume",
        "Radiator Support": "Supports up to 360mm Top AIO Cooler"
      },
      features: [
        "Compact desktop footprint while still supporting standard ATX power supplies",
        "Tool-free side panels clip on and off effortlessly for component swaps",
        "Note: Pair with Micro-ATX motherboards (e.g. MSI B650M) and GPUs <= 315mm"
      ],
      variants: [
        { label: "Matte Black Full Mesh", priceDelta: 0 },
        { label: "Tempered Glass Side Edition", priceDelta: 10 }
      ]
    },

    // ==================== 8. CPU COOLERS ====================
    {
      id: "cooler-corsair-h150i",
      sku: "BF-CLR-COR-H150I",
      name: "Corsair iCUE LINK H150i LCD 360mm All-In-One Liquid CPU Cooler",
      brand: "Corsair",
      category: "cpu-coolers",
      categoryGroup: "components",
      price: 239,
      availability: "In Stock",
      featured: true,
      popularity: 94,
      releaseOrder: 1,
      image: "assets/images/products/cooler-corsair-h150i.jpg",
      keySpec: "360mm AIO Liquid â€¢ 2.1\" IPS Temp Display â€¢ 300W TDP Rated",
      shortDesc: "High-capacity 360mm liquid CPU cooler with a split-flow copper cold plate, hidden-cable fan daisy chaining, and real-time coolant/CPU temperature LCD.",
      compat: {
        supportedSockets: ["AM5", "LGA1700"],
        coolerMaxTdp: 300,
        tdpWatts: 18
      },
      specs: {
        "Radiator Dimensions": "397 mm Ã— 120 mm Ã— 27 mm Aluminum (360mm Class)",
        "Supported CPU Sockets": "AMD Socket AM5 / AM4 â€¢ Intel Socket LGA1700 / LGA1851",
        "Thermal Capacity Rating": "Up to 300W TDP (Handles Ryzen 9 9950X & Core i9-14900K)",
        "Pump Display": "2.1-Inch IPS LCD (480Ã—480 @ 60Hz) for Hardware Telemetry"
      },
      features: [
        "Single-cable daisy-chain architecture eliminates fan wire clutter",
        "Pre-applied XTM70 extreme performance thermal paste on split-flow copper coldplate",
        "Zero RPM fan support at idle temperatures"
      ],
      variants: [
        { label: "360mm LCD Black", priceDelta: 0 }
      ]
    },
    {
      id: "cooler-cm-hyper622",
      sku: "BF-CLR-CM-H622",
      name: "Cooler Master Hyper 622 Halo Black Dual-Tower CPU Air Cooler",
      brand: "Cooler Master",
      category: "cpu-coolers",
      categoryGroup: "components",
      price: 64,
      availability: "In Stock",
      featured: false,
      popularity: 88,
      releaseOrder: 2,
      image: "assets/images/products/cooler-cm-hyper622.jpg",
      keySpec: "Dual-Tower Air â€¢ 6 Copper Heatpipes â€¢ 157mm Height â€¢ 260W",
      shortDesc: "All-black anodized dual-tower air cooler with six nickel-plated copper heatpipes and dual 120mm PWM fans, standing at a case-friendly 157mm height.",
      compat: {
        supportedSockets: ["AM5", "LGA1700"],
        coolerMaxTdp: 260,
        tdpWatts: 10
      },
      specs: {
        "Cooler Architecture": "Dual Fin-Stack Tower with 6Ã— 6mm Copper Heatpipes",
        "Supported CPU Sockets": "AMD AM5 / AM4 â€¢ Intel LGA1700 / 1200",
        "Overall Height": "157 mm (Clears virtually all mATX and Mid-Tower cases)",
        "Thermal Capacity Rating": "Up to 260W TDP"
      },
      features: [
        "Zero pump failure risk â€” pure mechanical air cooling longevity",
        "Adjustable front fan mounting clips to clear taller RAM modules"
      ],
      variants: [
        { label: "Stealth Matte Black", priceDelta: 0 }
      ]
    },

    // ==================== 9. CASE FANS ====================
    {
      id: "fans-corsair-qx120",
      sku: "BF-FAN-COR-QX120",
      name: "Corsair QX120 PWM 120mm Magnetic Dome Triple Fan Starter Kit",
      brand: "Corsair",
      category: "case-fans",
      categoryGroup: "components",
      price: 99,
      availability: "In Stock",
      featured: false,
      popularity: 87,
      releaseOrder: 1,
      image: "assets/images/products/fans-corsair-qx120.jpg",
      keySpec: "3Ã— 120mm Pack â€¢ 480â€“2400 RPM â€¢ 3.8 mm-H2O Static Pressure",
      shortDesc: "Triple-pack of 120mm PWM fans featuring Magnetic Dome bearings, built-in rear exhaust temperature sensors, and bridge connectors that snap fans together without wires.",
      compat: {
        fanSizeMm: 120,
        packCount: 3,
        tdpWatts: 12
      },
      specs: {
        "Fan Size & Quantity": "3 Ã— 120mm Ã— 25mm PWM Fans",
        "Rotational Speed": "480 â€“ 2,400 RPM + Zero RPM Mode",
        "Airflow & Static Pressure": "63.1 CFM â€¢ 3.8 mm-H2O",
        "Bearing Type": "Magnetic Dome Low-Friction Bearing"
      },
      features: [
        "Bridge connectors link all 3 fans into a single rigid bank with one power lead",
        "Integrated thermistor on each fan frame reports exhaust air temp"
      ],
      variants: [
        { label: "3-Pack 120mm Black + Hub", priceDelta: 0 }
      ]
    },
    {
      id: "fans-cm-mobius140",
      sku: "BF-FAN-CM-MOB140",
      name: "Cooler Master Mobius 140P Ring-Blade High Pressure 140mm PWM Fan",
      brand: "Cooler Master",
      category: "case-fans",
      categoryGroup: "components",
      price: 34,
      availability: "In Stock",
      featured: false,
      popularity: 82,
      releaseOrder: 2,
      image: "assets/images/products/fans-cm-mobius140.jpg",
      keySpec: "140mm PWM â€¢ Interconnected Ring Blades â€¢ <= 30 dBA",
      shortDesc: "Acoustic-engineered 140mm chassis fan utilizing an outer ring-blade stabilizer to eliminate blade tip resonance at high static pressure.",
      compat: {
        fanSizeMm: 140,
        packCount: 1,
        tdpWatts: 6
      },
      specs: {
        "Fan Size": "140mm Ã— 140mm Ã— 25mm",
        "Speed Range": "0 â€“ 1,900 RPM PWM",
        "Airflow": "76.5 CFM @ 30 dBA Max Acoustic Output",
        "Bearing": "Loop Dynamic Bearing (LDB)"
      },
      features: [
        "Anti-vibration decoupled rubber corner dampers prevent chassis hum",
        "Ring blade geometry maintains laminar airflow through dense mesh filters"
      ],
      variants: [
        { label: "Single 140mm Pack", priceDelta: 0 },
        { label: "Twin 2x 140mm Bundle", priceDelta: 30 }
      ]
    },

    // ==================== 10. MONITORS (PERIPHERALS) ====================
    {
      id: "monitor-asus-pg32ucdm",
      sku: "BF-MON-ASUS-32OLED",
      name: "ASUS ROG Swift PG32UCDM 32-Inch 4K UHD 240Hz QD-OLED Monitor",
      brand: "ASUS",
      category: "monitors",
      categoryGroup: "peripherals",
      price: 1299,
      availability: "In Stock",
      featured: true,
      popularity: 99,
      releaseOrder: 1,
      image: "assets/images/products/monitor-asus-pg32ucdm.jpg",
      keySpec: "32\" 4K UHD (3840Ã—2160) â€¢ 240Hz QD-OLED â€¢ 0.03ms â€¢ USB-C 90W",
      shortDesc: "Third-generation 32-inch 4K 240Hz QD-OLED display featuring a custom passive graphene heatsink, 99% DCI-P3 factory-calibrated accuracy (Delta E < 2), and KVM switch.",
      compat: {},
      specs: {
        "Panel Size & Type": "31.5-Inch Flat 3rd-Gen QD-OLED Panel",
        "Native Resolution & Refresh": "3840 Ã— 2160 (4K UHD) @ 240Hz",
        "Response Time & Contrast": "0.03 ms (GTG) â€¢ 1,500,000:1 Contrast â€¢ DisplayHDR True Black 400",
        "Color Gamut": "99% DCI-P3 â€¢ True 10-bit â€¢ Factory Calibrated Delta E < 2",
        "Video & Data Connectivity": "2Ã— HDMI 2.1, 1Ã— DisplayPort 1.4 (DSC), 1Ã— USB-C (DP Alt + 90W PD)"
      },
      features: [
        "Custom fanless heatsink and back-panel graphene film reduce burn-in risk",
        "Built-in Smart KVM allows controlling a desktop PC and USB-C laptop with one keyboard/mouse",
        "Uniform Brightness mode keeps white luminance consistent for code and document work"
      ],
      variants: [
        { label: "32-Inch 4K 240Hz QD-OLED", priceDelta: 0 }
      ]
    },
    {
      id: "monitor-msi-mag274qrf",
      sku: "BF-MON-MSI-27QHD",
      name: "MSI MAG 274QRF QD E2 27-Inch WQHD 180Hz Quantum Dot IPS Monitor",
      brand: "MSI",
      category: "monitors",
      categoryGroup: "peripherals",
      price: 299,
      availability: "In Stock",
      featured: false,
      popularity: 90,
      releaseOrder: 2,
      image: "assets/images/products/monitor-msi-mag274qrf.jpg",
      keySpec: "27\" WQHD (2560Ã—1440) â€¢ 180Hz Rapid IPS â€¢ 98% DCI-P3",
      shortDesc: "Versatile 27-inch 1440p Rapid IPS monitor enhanced with a Quantum Dot layer for wide color gamut coverage, 180Hz refresh rate, and 4-way ergonomic stand.",
      compat: {},
      specs: {
        "Panel Size & Type": "27-Inch Rapid IPS with Quantum Dot Film",
        "Resolution & Refresh Rate": "2560 Ã— 1440 (WQHD) @ 180Hz",
        "Response Time": "1 ms GTG â€¢ Adaptive-Sync Compatible",
        "Connectivity": "1Ã— DisplayPort 1.4a, 2Ã— HDMI 2.0b, 1Ã— USB Type-C (65W PD)"
      },
      features: [
        "Height, tilt, swivel, and 90-degree vertical pivot ergonomic stand included",
        "65W USB-C Power Delivery single-cable docking for ultrabooks"
      ],
      variants: [
        { label: "27-Inch WQHD 180Hz", priceDelta: 0 }
      ]
    },

    // ==================== 11. KEYBOARDS ====================
    {
      id: "kb-asus-azoth",
      sku: "BF-KB-ASUS-AZOTH",
      name: "ASUS ROG Azoth 75% Wireless Custom Mechanical Keyboard with OLED",
      brand: "ASUS",
      category: "keyboards",
      categoryGroup: "peripherals",
      price: 249,
      availability: "In Stock",
      featured: true,
      popularity: 95,
      releaseOrder: 1,
      image: "assets/images/products/kb-asus-azoth.jpg",
      keySpec: "75% Layout â€¢ Silicone Gasket Mount â€¢ Tri-Mode Wireless â€¢ Hot-Swap",
      shortDesc: "Enthusiast 75% mechanical keyboard blending custom keyboard acousticsâ€”three-layer Poron/silicone dampening, factory-lubed switches, and hot-swap socketsâ€”with low-latency 2.4GHz wireless.",
      compat: {},
      specs: {
        "Form Factor": "75% Compact Layout (81 Keys + 3-Way Control Knob)",
        "Mounting & Acoustics": "Silicone Gasket Mount + 3.5mm Silicone Pad + PORON Foam",
        "Switch Compatibility": "Full 5-Pin Hot-Swappable PCB (Pre-lubed Linear NX Snow Switches)",
        "Connectivity": "2.4GHz SpeedNova Wireless, Bluetooth (3 Devices), Wired USB-C",
        "Top Case Material": "CNC-Machined Gunmetal Aluminum Top Plate"
      },
      features: [
        "2-inch monochrome OLED screen displays battery level, CPU temp, or media status",
        "Includes complete switch lubrication station (Krytox GPL-205g0, opener, brush, pullers) in box",
        "Up to 1,800+ hours battery life with OLED and lighting disabled"
      ],
      variants: [
        { label: "Gunmetal Black (Linear Switches)", priceDelta: 0 },
        { label: "Moonlight White (Tactile Switches)", priceDelta: 0 }
      ]
    },
    {
      id: "kb-razer-huntsman-v3",
      sku: "BF-KB-RZR-HUNTV3",
      name: "Razer Huntsman V3 Pro TKL Analog Optical Esports Keyboard",
      brand: "Razer",
      category: "keyboards",
      categoryGroup: "peripherals",
      price: 219,
      availability: "In Stock",
      featured: false,
      popularity: 89,
      releaseOrder: 2,
      image: "assets/images/products/kb-razer-huntsman-v3.jpg",
      keySpec: "Tenkeyless (TKL) â€¢ Rapid Trigger Analog Optical â€¢ 0.1â€“4.0mm",
      shortDesc: "Tournament tenkeyless keyboard powered by Gen-2 Analog Optical Switches with onboard Rapid Trigger mode and adjustable actuation from 0.1mm to 4.0mm.",
      compat: {},
      specs: {
        "Form Factor": "Tenkeyless (TKL) + Multi-Function Digital Dial",
        "Switch Technology": "Razer Analog Optical Switches Gen-2 (100M Keystroke Rating)",
        "Actuation Range": "Adjustable 0.1 mm to 4.0 mm with 0.1mm Rapid Trigger Reset",
        "Keycaps & Frame": "Textured Doubleshot PBT Keycaps â€¢ 5052 Brushed Aluminum Top"
      },
      features: [
        "On-the-fly actuation and Rapid Trigger adjustment using the LED arrayâ€”no software required",
        "Magnetic leatherette ergonomic wrist rest included"
      ],
      variants: [
        { label: "TKL Matte Black", priceDelta: 0 }
      ]
    },

    // ==================== 12. GAMING MICE ====================
    {
      id: "mouse-logitech-superlight2",
      sku: "BF-MS-LOG-GPX2",
      name: "Logitech G PRO X SUPERLIGHT 2 Wireless Esports Mouse",
      brand: "Logitech",
      category: "gaming-mice",
      categoryGroup: "peripherals",
      price: 159,
      availability: "In Stock",
      featured: true,
      popularity: 98,
      releaseOrder: 1,
      image: "assets/images/products/mouse-logitech-superlight2.jpg",
      keySpec: "60g Ultralight â€¢ HERO 2 32K Sensor â€¢ LIGHTFORCE Optical-Mech",
      shortDesc: "Refined 60-gram wireless precision mouse featuring hybrid optical-mechanical switches, USB-C charging, 95-hour battery life, and sub-micron HERO 2 tracking.",
      compat: {},
      specs: {
        "Weight & Dimensions": "60 Grams â€¢ 125 mm Ã— 63.5 mm Ã— 40 mm",
        "Sensor Architecture": "HERO 2 Optical (100 â€“ 32,000 DPI â€¢ >500 IPS â€¢ 40G)",
        "Main Switches": "LIGHTFORCE Hybrid Optical-Mechanical Switches",
        "Polling Rate & Battery": "Up to 4,000 Hz Wireless Polling â€¢ 95 Hours Battery Life"
      },
      features: [
        "Zero-additive virgin PTFE glide feet for smooth, predictable friction",
        "Optical switch actuation prevents double-clicking while preserving crisp mechanical tactility"
      ],
      variants: [
        { label: "Graphite Black", priceDelta: 0 },
        { label: "Off-White", priceDelta: 0 }
      ]
    },
    {
      id: "mouse-razer-viper-v3",
      sku: "BF-MS-RZR-VIPV3",
      name: "Razer Viper V3 Pro 54g Ultralight 8000Hz Wireless Gaming Mouse",
      brand: "Razer",
      category: "gaming-mice",
      categoryGroup: "peripherals",
      price: 159,
      availability: "In Stock",
      featured: false,
      popularity: 94,
      releaseOrder: 2,
      image: "assets/images/products/mouse-razer-viper-v3.jpg",
      keySpec: "54g Symmetrical â€¢ Focus Pro 35K Gen-2 â€¢ 8000Hz Dongle Included",
      shortDesc: "54-gram symmetrical wireless mouse with Focus Pro 35K Gen-2 optical sensor, smooth-touch matte coating, and included 8000Hz HyperPolling wireless receiver.",
      compat: {},
      specs: {
        "Weight": "54 Grams (Solid Shell â€” No Honeycomb Holes)",
        "Sensor": "Focus Pro 35K Optical Sensor Gen-2 (1-DPI Step Adjustments)",
        "Wireless Polling": "Native 8,000 Hz HyperPolling Dongle Included in Box"
      },
      features: [
        "Automatically switches polling rate between 1000Hz on desktop and 4000/8000Hz in fullscreen applications",
        "Gen-3 optical mouse switches rated for 90 million clicks"
      ],
      variants: [
        { label: "Stealth Black", priceDelta: 0 }
      ]
    },

    // ==================== 13. HEADSETS ====================
    {
      id: "headset-logitech-pro-x2",
      sku: "BF-AUD-LOG-PROX2",
      name: "Logitech G PRO X 2 LIGHTSPEED Wireless Graphene Gaming Headset",
      brand: "Logitech",
      category: "headsets",
      categoryGroup: "peripherals",
      price: 239,
      availability: "In Stock",
      featured: true,
      popularity: 92,
      releaseOrder: 1,
      image: "assets/images/products/headset-logitech-pro-x2.jpg",
      keySpec: "50mm Graphene Drivers â€¢ Wireless + Bluetooth + 3.5mm â€¢ 50h Battery",
      shortDesc: "Closed-back studio and esports headset built with rigid 50mm graphene diaphragms for ultra-low distortion, aluminum yokes, and rotating memory-foam earpads.",
      compat: {},
      specs: {
        "Audio Drivers": "50 mm Graphene Diaphragm Drivers (20 Hz â€“ 20 kHz)",
        "Connectivity": "2.4GHz LIGHTSPEED Wireless, Bluetooth 5.3, 3.5mm Analog Cable",
        "Battery Life & Range": "Up to 50 Hours Continuous â€¢ 30m Wireless Range",
        "Microphone": "Detachable 6mm Cardioid Boom Mic with Blue VO!CE Processing"
      },
      features: [
        "Includes both leatherette (passive isolation) and breathable velour earpad sets in box",
        "Rotating durable hinge allows resting flat around the neck between sessions"
      ],
      variants: [
        { label: "Charcoal Black", priceDelta: 0 }
      ]
    },

    // ==================== 14. SPEAKERS ====================
    {
      id: "speakers-razer-nommo-v2",
      sku: "BF-AUD-RZR-NOMV2",
      name: "Razer Nommo V2 Pro 2.1 Desktop Speaker System with Wireless Subwoofer",
      brand: "Razer",
      category: "speakers",
      categoryGroup: "peripherals",
      price: 399,
      availability: "In Stock",
      featured: false,
      popularity: 85,
      releaseOrder: 1,
      image: "assets/images/products/speakers-razer-nommo-v2.jpg",
      keySpec: "2.1 System â€¢ 3\" Aluminum Phase-Plug Drivers + 5.5\" Wireless Sub",
      shortDesc: "Full-range 2.1 desktop acoustic system pairing dual 3-inch neodymium satellite monitors with a wireless 5.5-inch down-firing subwoofer for clean desk cable management.",
      compat: {},
      specs: {
        "Satellite Drivers": "2 Ã— 3-Inch Full-Range Drivers with Aluminum Phase Plugs",
        "Subwoofer": "5.5-Inch Down-Firing Wireless Subwoofer",
        "Connectivity": "USB Type-C to PC + Bluetooth 5.3",
        "Frequency Response": "40 Hz â€“ 20,000 Hz"
      },
      features: [
        "Aluminum phase plugs minimize internal sound reflections inside each satellite cylinder",
        "Wireless subwoofer connection eliminates running audio cables to the floor"
      ],
      variants: [
        { label: "2.1 Pro System", priceDelta: 0 }
      ]
    },

    // ==================== 15. MOUSEPADS ====================
    {
      id: "mousepad-corsair-mm700",
      sku: "BF-PAD-COR-MM350",
      name: "Corsair MM350 PRO Premium Spill-Proof Extended XL Desk Mat",
      brand: "Corsair",
      category: "mousepads",
      categoryGroup: "peripherals",
      price: 39,
      availability: "In Stock",
      featured: false,
      popularity: 88,
      releaseOrder: 1,
      image: "assets/images/products/mousepad-corsair-mm700.jpg",
      keySpec: "930mm Ã— 400mm Ã— 4mm â€¢ Spill-Proof Micro-Weave â€¢ Stitched Edge",
      shortDesc: "Expansive 930Ã—400mm desktop surface with a 4mm plush natural rubber base, spill-repellent coating, and precision 360-degree anti-fray perimeter stitching.",
      compat: {},
      specs: {
        "Dimensions": "930 mm (W) Ã— 400 mm (D) Ã— 4 mm (Thickness)",
        "Surface Material": "High-Density 300-Thread-Count Micro-Weave Textile",
        "Base": "Non-Slip Textured Natural Rubber"
      },
      features: [
        "Accommodates full-size keyboard, wireless mouse, and studio audio interface simultaneously",
        "4mm thickness dampens keyboard bottom-out acoustics on hard desks"
      ],
      variants: [
        { label: "Stealth Black XL (930x400mm)", priceDelta: 0 }
      ]
    },

    // ==================== 16. WEBCAMS ====================
    {
      id: "webcam-logitech-mx-brio",
      sku: "BF-CAM-LOG-MXBRIO",
      name: "Logitech MX Brio Ultra HD 4K Streaming & Workstation Webcam",
      brand: "Logitech",
      category: "webcams",
      categoryGroup: "peripherals",
      price: 199,
      availability: "In Stock",
      featured: false,
      popularity: 86,
      releaseOrder: 1,
      image: "assets/images/products/webcam-logitech-mx-brio.jpg",
      keySpec: "4K UHD 30fps / 1080p 60fps â€¢ 8.5MP Sony STARVIS â€¢ Aluminum",
      shortDesc: "Flagship low-light 4K webcam machined from anodized aluminum with an 8.5MP Sony STARVIS sensor, mechanical rotary privacy shutter, and Show Mode desk tilt.",
      compat: {},
      specs: {
        "Resolution & Frame Rate": "4K Ultra HD (3840Ã—2160) @ 30fps â€¢ 1080p FHD @ 60fps",
        "Sensor & Optics": "8.5MP Sony STARVIS Sensor â€¢ Multi-Element Glass Lens",
        "Field of View": "Adjustable 90Â° / 78Â° / 65Â° dFOV",
        "Interface": "USB-C 3.0 (Detachable Braided Cable)"
      },
      features: [
        "Integrated mechanical lens ring twists to physically close the privacy shutter",
        "70% larger pixel size than previous Brio generation for crisp low-light studio clarity"
      ],
      variants: [
        { label: "Graphite Aluminum", priceDelta: 0 }
      ]
    },

    // ==================== 17. CONTROLLERS ====================
    {
      id: "controller-razer-wolverine",
      sku: "BF-CTL-RZR-WOLV3",
      name: "Razer Wolverine V3 Pro Wireless Hall-Effect PC & Console Controller",
      brand: "Razer",
      category: "controllers",
      categoryGroup: "peripherals",
      price: 199,
      availability: "In Stock",
      featured: false,
      popularity: 87,
      releaseOrder: 1,
      image: "assets/images/products/controller-razer-wolverine.jpg",
      keySpec: "Anti-Drift Hall Effect Thumbsticks â€¢ 4 Mouse-Click Back Paddles",
      shortDesc: "Pro-grade wireless controller featuring magnetic Hall-effect thumbsticks, microswitch Hair Trigger locks, four ergonomic back paddles, and 1000Hz wired PC tournament mode.",
      compat: {},
      specs: {
        "Thumbstick Technology": "Magnetic Anti-Drift Hall Effect Analog Thumbsticks",
        "Programmable Inputs": "4 Mouse-Click Back Paddles + 2 Claw-Grip Bumpers",
        "Trigger System": "Pro HyperTriggers (Instant Microswitch Click or Full Analog Travel)",
        "Connectivity": "2.4GHz HyperSpeed Wireless Dongle + 3m Braided USB-C"
      },
      features: [
        "Includes tall concave and short convex replaceable thumbstick caps + carrying case",
        "Mecha-tactile ABXY action buttons and 8-way floating microswitch D-Pad"
      ],
      variants: [
        { label: "Wireless Pro Edition", priceDelta: 0 }
      ]
    },

    // ==================== 18. NETWORKING ACCESSORIES ====================
    {
      id: "net-asus-rt-be96u",
      sku: "BF-NET-ASUS-BE98",
      name: "ASUS ROG Rapture GT-BE98 Quad-Band Wi-Fi 7 Dual-10G Gaming Router",
      brand: "ASUS",
      category: "networking",
      categoryGroup: "peripherals",
      price: 699,
      availability: "In Stock",
      featured: false,
      popularity: 84,
      releaseOrder: 1,
      image: "assets/images/products/net-asus-rt-be96u.jpg",
      keySpec: "Wi-Fi 7 (802.11be) â€¢ 320MHz Channels â€¢ Dual 10G + Quad 2.5G LAN",
      shortDesc: "High-throughput Wi-Fi 7 network backbone with Multi-Link Operation (MLO), 4096-QAM modulation, and dual 10-Gigabit Ethernet ports for NAS and low-latency gaming rigs.",
      compat: {},
      specs: {
        "Wireless Standard": "IEEE 802.11be Quad-Band Wi-Fi 7 (6GHz + Dual 5GHz + 2.4GHz)",
        "Channel Bandwidth": "320 MHz Ultrawide Channels â€¢ 4096-QAM",
        "Wired Ethernet Ports": "2Ã— 10Gbps WAN/LAN + 4Ã— 2.5Gbps LAN + 1Ã— 1Gbps Port",
        "Processor & Memory": "2.6 GHz Quad-Core 64-Bit CPU + 2GB DDR4 RAM"
      },
      features: [
        "Dedicated 10G gaming port prioritizes wired workstation and gaming PC packets automatically",
        "Multi-Link Operation (MLO) aggregates 5GHz and 6GHz bands simultaneously"
      ],
      variants: [
        { label: "GT-BE98 Quad-Band Router", priceDelta: 0 }
      ]
    }
  ]
};


