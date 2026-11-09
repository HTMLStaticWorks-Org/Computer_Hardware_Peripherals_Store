/* ==========================================================================
   BYTEFORGE — CATALOGUE & PRODUCT DETAILS ENGINE (products.html & product-details.html)
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const BF = window.ByteForge;
    if (!BF) return;
    const DATA = BF.DATA;

    if (document.getElementById("bf-catalogue-page")) {
      initCataloguePage(BF, DATA);
    }

    if (document.getElementById("bf-product-detail-page")) {
      initProductDetailPage(BF, DATA);
    }
  });

  /* ==========================================================================
     1. PRODUCTS CATALOGUE PAGE
     ========================================================================== */
  function initCataloguePage(BF, DATA) {
    const params = new URLSearchParams(window.location.search);

    const state = {
      category: params.get("category") || "all",
      group: params.get("group") || "all",
      brands: params.get("brand") ? [params.get("brand")] : [],
      maxPrice: Number(params.get("maxPrice")) || 2000,
      search: params.get("q") || "",
      sort: params.get("sort") || "popular",
      socket: params.get("socket") || "all",
      ramType: params.get("ram") || "all"
    };

    const els = {
      categoryList: document.getElementById("bf-filter-categories"),
      brandList: document.getElementById("bf-filter-brands"),
      priceSlider: document.getElementById("bf-filter-price"),
      priceValue: document.getElementById("bf-filter-price-val"),
      socketRadios: document.querySelectorAll("input[name='bf-spec-socket']"),
      ramRadios: document.querySelectorAll("input[name='bf-spec-ram']"),
      searchInput: document.getElementById("bf-catalogue-search"),
      sortSelect: document.getElementById("bf-catalogue-sort"),
      activeChips: document.getElementById("bf-active-filters"),
      resultsCount: document.getElementById("bf-results-count"),
      productsGrid: document.getElementById("bf-catalogue-grid"),
      resetBtn: document.getElementById("bf-reset-filters-btn"),
      headingTitle: document.getElementById("bf-catalogue-heading"),
      headingDesc: document.getElementById("bf-catalogue-desc"),
      sidebar: document.getElementById("bf-filter-sidebar"),
      mobileOpenBtn: document.getElementById("bf-open-filter-drawer"),
      mobileCloseBtn: document.getElementById("bf-close-filter-drawer")
    };

    // Populate Category Filter List
    function renderCategorySidebar() {
      if (!els.categoryList) return;
      const compCats = DATA.categories.filter((c) => c.group === "components");
      const periphCats = DATA.categories.filter((c) => c.group === "peripherals");

      const countForCat = (catId) => DATA.products.filter((p) => p.category === catId).length;

      els.categoryList.innerHTML = `
        <label class="filter-option">
          <span class="filter-option-label">
            <input type="radio" name="bf-cat-radio" value="all" ${state.category === "all" && state.group === "all" ? "checked" : ""}>
            <strong>All Hardware & Peripherals</strong>
          </span>
          <span class="filter-count">${DATA.products.length}</span>
        </label>
        <div style="font-family:var(--font-heading);font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--accent-primary);margin:10px 0 4px 4px;">Core PC Components</div>
        ${compCats
          .map(
            (c) => `
          <label class="filter-option">
            <span class="filter-option-label">
              <input type="radio" name="bf-cat-radio" value="${c.id}" ${state.category === c.id ? "checked" : ""}>
              <span>${c.shortName}</span>
            </span>
            <span class="filter-count">${countForCat(c.id)}</span>
          </label>`
          )
          .join("")}
        <div style="font-family:var(--font-heading);font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--accent-primary);margin:12px 0 4px 4px;">Peripherals & Accessories</div>
        ${periphCats
          .map(
            (c) => `
          <label class="filter-option">
            <span class="filter-option-label">
              <input type="radio" name="bf-cat-radio" value="${c.id}" ${state.category === c.id ? "checked" : ""}>
              <span>${c.shortName}</span>
            </span>
            <span class="filter-count">${countForCat(c.id)}</span>
          </label>`
          )
          .join("")}
      `;

      els.categoryList.querySelectorAll("input[name='bf-cat-radio']").forEach((radio) => {
        radio.addEventListener("change", () => {
          state.category = radio.value;
          state.group = "all";
          applyFilters();
        });
      });
    }

    // Populate Brand Checkboxes
    function renderBrandSidebar() {
      if (!els.brandList) return;
      els.brandList.innerHTML = DATA.brands
        .map((b) => {
          const checked = state.brands.some((sb) => sb.toLowerCase() === b.id.toLowerCase());
          const count = DATA.products.filter(
            (p) => p.brand.toLowerCase() === b.id.toLowerCase() || (b.id === "NVIDIA" && p.name.includes("RTX"))
          ).length;
          return `
          <label class="filter-option">
            <span class="filter-option-label">
              <input type="checkbox" value="${b.id}" ${checked ? "checked" : ""}>
              <span>${b.name}</span>
            </span>
            <span class="filter-count">${count}</span>
          </label>`;
        })
        .join("");

      els.brandList.querySelectorAll("input[type='checkbox']").forEach((cb) => {
        cb.addEventListener("change", () => {
          state.brands = Array.from(els.brandList.querySelectorAll("input[type='checkbox']:checked")).map((el) => el.value);
          applyFilters();
        });
      });
    }

    // Filter & Sort Logic
    function applyFilters() {
      let filtered = DATA.products.slice();

      // Category or Group filter
      if (state.category !== "all") {
        if (state.category === "headsets-speakers") {
          filtered = filtered.filter((p) => p.category === "headsets" || p.category === "speakers");
        } else if (state.category === "memory-storage") {
          filtered = filtered.filter((p) => p.category === "memory" || p.category === "storage");
        } else {
          filtered = filtered.filter((p) => p.category === state.category);
        }
      } else if (state.group !== "all") {
        filtered = filtered.filter((p) => p.categoryGroup === state.group);
      }

      // Brand filter
      if (state.brands.length > 0) {
        filtered = filtered.filter((p) =>
          state.brands.some((b) => {
            if (b.toLowerCase() === "nvidia" && p.name.toLowerCase().includes("rtx")) return true;
            return p.brand.toLowerCase() === b.toLowerCase();
          })
        );
      }

      // Max Price filter
      filtered = filtered.filter((p) => p.price <= state.maxPrice);

      // Socket Specification filter
      if (state.socket !== "all") {
        filtered = filtered.filter((p) => p.compat && p.compat.socket === state.socket);
      }

      // RAM Type Specification filter
      if (state.ramType !== "all") {
        filtered = filtered.filter(
          (p) =>
            p.compat &&
            (p.compat.ramType === state.ramType ||
              (p.compat.memorySupport && p.compat.memorySupport.includes(state.ramType)))
        );
      }

      // Search Query
      if (state.search.trim() !== "") {
        const q = state.search.trim().toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.keySpec.toLowerCase().includes(q) ||
            p.shortDesc.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
      }

      // Sorting
      if (state.sort === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (state.sort === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (state.sort === "newest") {
        filtered.sort((a, b) => a.releaseOrder - b.releaseOrder);
      } else {
        filtered.sort((a, b) => b.popularity - a.popularity);
      }

      // Update Dynamic Heading
      if (els.headingTitle && els.headingDesc) {
        if (state.category !== "all") {
          const catObj = DATA.categories.find((c) => c.id === state.category);
          if (catObj) {
            els.headingTitle.textContent = catObj.name;
            els.headingDesc.textContent = catObj.desc;
          } else if (state.category === "headsets-speakers") {
            els.headingTitle.textContent = "Headsets & Speakers";
            els.headingDesc.textContent = "Studio-grade wireless gaming headsets and 2.1 desktop speaker systems.";
          } else if (state.category === "memory-storage") {
            els.headingTitle.textContent = "Memory (RAM) & NVMe Storage";
            els.headingDesc.textContent = "Low-latency DDR5/DDR4 memory kits and high-throughput PCIe NVMe solid state drives.";
          }
        } else if (state.group === "components") {
          els.headingTitle.textContent = "Core PC Components";
          els.headingDesc.textContent = "Processors, graphics cards, motherboards, DDR5 memory, NVMe storage, ATX 3.1 PSUs, cabinets, and thermal solutions.";
        } else if (state.group === "peripherals") {
          els.headingTitle.textContent = "Gaming & Workstation Peripherals";
          els.headingDesc.textContent = "QD-OLED monitors, custom mechanical keyboards, ultralight wireless mice, studio audio, and high-speed networking.";
        } else {
          els.headingTitle.textContent = "All Hardware & Peripherals";
          els.headingDesc.textContent = "Browse our complete illustrative hardware catalogue with technical specifications and compatibility filters.";
        }
      }

      // Update Results Counter
      if (els.resultsCount) {
        els.resultsCount.textContent = `Showing ${filtered.length} of ${DATA.products.length} hardware products`;
      }

      // Render Active Filter Chips
      renderActiveChips();

      // Render Product Grid
      if (els.productsGrid) {
        if (filtered.length === 0) {
          els.productsGrid.innerHTML = `
            <div style="grid-column:1 / -1;background:var(--bg-secondary);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:48px 24px;text-align:center;">
              <h3 style="font-size:1.25rem;margin-bottom:8px;">No Matching Hardware Found</h3>
              <p style="color:var(--text-muted);margin-bottom:20px;">Try broadening your price range, clearing specification filters, or resetting your search criteria.</p>
              <button type="button" class="btn btn-primary btn-sm" id="bf-empty-reset-btn">Reset All Filters</button>
            </div>`;
          document.getElementById("bf-empty-reset-btn")?.addEventListener("click", resetAllFilters);
        } else {
          els.productsGrid.innerHTML = filtered.map(BF.renderProductCard).join("");
          BF.syncWishlistUI();
        }
      }
    }

    function renderActiveChips() {
      if (!els.activeChips) return;
      const chips = [];

      if (state.category !== "all") {
        const catObj = DATA.categories.find((c) => c.id === state.category);
        chips.push({ label: `Category: ${catObj ? catObj.shortName : state.category}`, clear: () => { state.category = "all"; renderCategorySidebar(); applyFilters(); } });
      }
      if (state.group !== "all") {
        chips.push({ label: `Group: ${state.group}`, clear: () => { state.group = "all"; applyFilters(); } });
      }
      state.brands.forEach((b) => {
        chips.push({
          label: `Brand: ${b}`,
          clear: () => {
            state.brands = state.brands.filter((x) => x !== b);
            renderBrandSidebar();
            applyFilters();
          }
        });
      });
      if (state.maxPrice < 2000) {
        chips.push({
          label: `Max Price: ${BF.formatCurrency(state.maxPrice)}`,
          clear: () => {
            state.maxPrice = 2000;
            if (els.priceSlider) els.priceSlider.value = "2000";
            if (els.priceValue) els.priceValue.textContent = "$2,000";
            applyFilters();
          }
        });
      }
      if (state.socket !== "all") {
        chips.push({
          label: `Socket: ${state.socket}`,
          clear: () => {
            state.socket = "all";
            els.socketRadios.forEach((r) => (r.checked = r.value === "all"));
            applyFilters();
          }
        });
      }
      if (state.ramType !== "all") {
        chips.push({
          label: `Memory: ${state.ramType}`,
          clear: () => {
            state.ramType = "all";
            els.ramRadios.forEach((r) => (r.checked = r.value === "all"));
            applyFilters();
          }
        });
      }
      if (state.search.trim() !== "") {
        chips.push({
          label: `Search: "${state.search}"`,
          clear: () => {
            state.search = "";
            if (els.searchInput) els.searchInput.value = "";
            applyFilters();
          }
        });
      }

      if (chips.length === 0) {
        els.activeChips.innerHTML = "";
        return;
      }

      els.activeChips.innerHTML =
        chips
          .map(
            (c, idx) =>
              `<button type="button" class="filter-chip" data-chip-idx="${idx}">${c.label} <span aria-hidden="true">×</span></button>`
          )
          .join("") +
        `<button type="button" class="btn btn-outline btn-sm" id="bf-clear-all-chips" style="padding:3px 10px;min-height:28px;font-size:0.75rem;">Clear All</button>`;

      els.activeChips.querySelectorAll("[data-chip-idx]").forEach((btn) => {
        const idx = Number(btn.getAttribute("data-chip-idx"));
        btn.addEventListener("click", () => chips[idx].clear());
      });
      document.getElementById("bf-clear-all-chips")?.addEventListener("click", resetAllFilters);
    }

    function resetAllFilters() {
      state.category = "all";
      state.group = "all";
      state.brands = [];
      state.maxPrice = 2000;
      state.search = "";
      state.socket = "all";
      state.ramType = "all";
      state.sort = "popular";

      if (els.priceSlider) els.priceSlider.value = "2000";
      if (els.priceValue) els.priceValue.textContent = "$2,000";
      if (els.searchInput) els.searchInput.value = "";
      if (els.sortSelect) els.sortSelect.value = "popular";
      els.socketRadios.forEach((r) => (r.checked = r.value === "all"));
      els.ramRadios.forEach((r) => (r.checked = r.value === "all"));

      renderCategorySidebar();
      renderBrandSidebar();
      applyFilters();
    }

    // Bind Controls
    if (els.priceSlider) {
      els.priceSlider.value = String(state.maxPrice);
      if (els.priceValue) els.priceValue.textContent = BF.formatCurrency(state.maxPrice);
      els.priceSlider.addEventListener("input", () => {
        state.maxPrice = Number(els.priceSlider.value);
        if (els.priceValue) els.priceValue.textContent = BF.formatCurrency(state.maxPrice);
        applyFilters();
      });
    }

    if (els.searchInput) {
      els.searchInput.value = state.search;
      els.searchInput.addEventListener("input", () => {
        state.search = els.searchInput.value;
        applyFilters();
      });
    }

    if (els.sortSelect) {
      els.sortSelect.value = state.sort;
      els.sortSelect.addEventListener("change", () => {
        state.sort = els.sortSelect.value;
        applyFilters();
      });
    }

    els.socketRadios.forEach((r) => {
      r.addEventListener("change", () => {
        if (r.checked) {
          state.socket = r.value;
          applyFilters();
        }
      });
    });

    els.ramRadios.forEach((r) => {
      r.addEventListener("change", () => {
        if (r.checked) {
          state.ramType = r.value;
          applyFilters();
        }
      });
    });

    els.resetBtn?.addEventListener("click", resetAllFilters);

    els.mobileOpenBtn?.addEventListener("click", () => {
      els.sidebar?.classList.add("open");
      document.getElementById("bf-overlay-backdrop")?.classList.add("open");
    });

    els.mobileCloseBtn?.addEventListener("click", () => {
      els.sidebar?.classList.remove("open");
      document.getElementById("bf-overlay-backdrop")?.classList.remove("open");
    });

    renderCategorySidebar();
    renderBrandSidebar();
    applyFilters();
  }

  /* ==========================================================================
     2. PRODUCT DETAILS PAGE
     ========================================================================== */
  function initProductDetailPage(BF, DATA) {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id") || "gpu-asus-4090";
    const product = BF.getProductById(productId) || DATA.products[0];
    if (!product) return;

    let selectedVariantIdx = 0;
    const variants = product.variants && product.variants.length > 0 ? product.variants : [{ label: "Standard Edition", priceDelta: 0 }];

    // Update Document Title & Breadcrumbs
    document.title = `${product.name} — BYTEFORGE Hardware Store`;
    const catObj = DATA.categories.find((c) => c.id === product.category);
    const breadCat = document.getElementById("bf-detail-bread-cat");
    const breadName = document.getElementById("bf-detail-bread-name");
    if (breadCat && catObj) {
      breadCat.textContent = catObj.name;
      breadCat.href = `products.html?category=${encodeURIComponent(catObj.id)}`;
    }
    if (breadName) breadName.textContent = product.name;

    // Gallery Setup (3 Views: Primary Studio, Dimensional Schematic, Thermal/Bus Architecture)
    const galleryViews = [
      { src: product.image, caption: "Studio Hardware View" },
      { src: "assets/images/products/view-schematic.jpg", caption: "CAD Clearance Profile" },
      { src: "assets/images/products/view-architecture.jpg", caption: "Thermal & Bus Topology" }
    ];

    const mainImg = document.getElementById("bf-detail-main-img");
    const thumbsContainer = document.getElementById("bf-detail-thumbs");

    if (mainImg) {
      mainImg.src = galleryViews[0].src;
      mainImg.alt = product.name;
    }

    if (thumbsContainer) {
      thumbsContainer.innerHTML = galleryViews
        .map(
          (g, idx) => `
        <button type="button" class="gallery-thumb-btn ${idx === 0 ? "active" : ""}" data-gallery-idx="${idx}" aria-label="View ${g.caption}">
          <img src="${g.src}" alt="${g.caption}">
          <span class="gallery-thumb-caption">${g.caption}</span>
        </button>`
        )
        .join("");

      thumbsContainer.querySelectorAll("[data-gallery-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.getAttribute("data-gallery-idx"));
          thumbsContainer.querySelectorAll("[data-gallery-idx]").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          if (mainImg) {
            mainImg.src = galleryViews[idx].src;
            mainImg.alt = `${product.name} — ${galleryViews[idx].caption}`;
          }
        });
      });
    }

    // Populate Product Info Panel
    const setElText = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    setElText("bf-detail-brand", product.brand);
    setElText("bf-detail-sku", `SKU: ${product.sku}`);
    setElText("bf-detail-availability", product.availability);
    setElText("bf-detail-title", product.name);
    setElText("bf-detail-keyspec", product.keySpec);
    setElText("bf-detail-desc", product.shortDesc);

    const priceEl = document.getElementById("bf-detail-price");
    function updatePriceDisplay() {
      const activeVar = variants[selectedVariantIdx] || variants[0];
      const total = product.price + (activeVar.priceDelta || 0);
      if (priceEl) priceEl.textContent = BF.formatCurrency(total);
    }
    updatePriceDisplay();

    // Variant Selector
    const variantsWrap = document.getElementById("bf-detail-variants");
    if (variantsWrap) {
      variantsWrap.innerHTML = variants
        .map(
          (v, idx) => `
        <button type="button" class="variant-btn ${idx === 0 ? "active" : ""}" data-var-idx="${idx}">
          ${v.label}${v.priceDelta ? ` (${v.priceDelta > 0 ? "+" : ""}${BF.formatCurrency(v.priceDelta)})` : ""}
        </button>`
        )
        .join("");

      variantsWrap.querySelectorAll("[data-var-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedVariantIdx = Number(btn.getAttribute("data-var-idx"));
          variantsWrap.querySelectorAll("[data-var-idx]").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          updatePriceDisplay();
        });
      });
    }

    // Compatibility Info Box
    const compatBox = document.getElementById("bf-detail-compat-box");
    if (compatBox) {
      const c = product.compat || {};
      const notes = [];
      if (c.socket) notes.push(`<li><strong>CPU / Motherboard Socket:</strong> Requires Socket ${c.socket} platform match.</li>`);
      if (c.ramType) notes.push(`<li><strong>Memory Standard:</strong> Requires ${c.ramType}-compatible DIMM slots.</li>`);
      if (c.formFactor) notes.push(`<li><strong>Motherboard Form Factor:</strong> ${c.formFactor} — verify PC Cabinet supports ${c.formFactor}.</li>`);
      if (c.supportedFormFactors) notes.push(`<li><strong>Supported Motherboards:</strong> ${c.supportedFormFactors.join(", ")}.</li>`);
      if (c.lengthMm) notes.push(`<li><strong>Physical GPU Length:</strong> ${c.lengthMm} mm — requires PC Cabinet with ≥ ${c.lengthMm} mm GPU clearance.</li>`);
      if (c.maxGpuLengthMm) notes.push(`<li><strong>Max GPU Clearance:</strong> Supports graphics cards up to ${c.maxGpuLengthMm} mm in length.</li>`);
      if (c.tdpWatts) notes.push(`<li><strong>Thermal / Power Rating:</strong> ~${c.tdpWatts}W illustrative thermal/power envelope.</li>`);
      if (c.psuWatts) notes.push(`<li><strong>PSU Output Capacity:</strong> ${c.psuWatts}W continuous output (${c.atxStandard || "ATX"}).</li>`);
      if (notes.length === 0) {
        notes.push(`<li><strong>Universal Interface:</strong> Connects via standard USB / DisplayPort / HDMI / Wireless without internal socket constraints.</li>`);
      }
      compatBox.innerHTML = `<ul style="display:flex;flex-direction:column;gap:6px;font-size:0.875rem;color:var(--text-secondary);list-style:disc;padding-left:18px;">${notes.join("")}</ul>`;
    }

    // Action Buttons (Add to Cart, Wishlist, Open in PC Builder, Enquire)
    const addCartBtn = document.getElementById("bf-detail-add-cart");
    addCartBtn?.addEventListener("click", () => {
      const v = variants[selectedVariantIdx] || variants[0];
      BF.addToCart(product.id, 1, v.label, v.priceDelta || 0);
    });

    const wishBtn = document.getElementById("bf-detail-wishlist");
    if (wishBtn) {
      wishBtn.setAttribute("data-wishlist-btn", product.id);
      BF.syncWishlistUI();
    }

    const builderBtn = document.getElementById("bf-detail-add-builder");
    if (builderBtn) {
      const stepObj = DATA.builderSteps.find((s) => s.categoryId === product.category);
      if (stepObj) {
        builderBtn.style.display = "inline-flex";
        builderBtn.addEventListener("click", () => {
          const currentBuild = BF.getStoredJSON(BF.STORAGE_KEYS.BUILDER, {});
          currentBuild[stepObj.key] = product.id;
          BF.setStoredJSON(BF.STORAGE_KEYS.BUILDER, currentBuild);
          window.location.href = "build-your-pc.html";
        });
      } else {
        builderBtn.style.display = "none";
      }
    }

    const enquireBtn = document.getElementById("bf-detail-enquire");
    enquireBtn?.addEventListener("click", () => {
      const v = variants[selectedVariantIdx] || variants[0];
      BF.setStoredJSON(BF.STORAGE_KEYS.ENQUIRY_PREFILL, {
        type: "Product Availability & Specification Enquiry",
        interest: `${product.name} (${v.label}) — ${BF.formatCurrency(product.price + (v.priceDelta || 0))}`,
        message: `Hello BYTEFORGE Team,\n\nI would like to enquire about "${product.name}" (SKU: ${product.sku}, Variant: ${v.label}). Please share current availability and lead-time details.`
      });
      window.location.href = `contact.html?product=${encodeURIComponent(product.id)}#enquiry-form`;
    });

    // Technical Specifications Table
    const specTableBody = document.getElementById("bf-detail-specs-tbody");
    if (specTableBody && product.specs) {
      specTableBody.innerHTML = Object.entries(product.specs)
        .map(
          ([k, val]) => `
        <tr>
          <th>${k}</th>
          <td>${val}</td>
        </tr>`
        )
        .join("");
    }

    // Key Features List
    const featuresList = document.getElementById("bf-detail-features");
    if (featuresList && product.features) {
      featuresList.innerHTML = product.features
        .map(
          (f) => `
        <li style="display:flex;align-items:flex-start;gap:10px;padding:12px 16px;background:var(--bg-secondary);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);">
          <span style="color:var(--accent-primary);font-weight:700;">✓</span>
          <span style="font-size:0.925rem;color:var(--text-secondary);">${f}</span>
        </li>`
        )
        .join("");
    }

    // Related Products
    const relatedGrid = document.getElementById("bf-detail-related-grid");
    if (relatedGrid) {
      let related = DATA.products.filter((p) => p.category === product.category && p.id !== product.id);
      if (related.length < 4) {
        const extra = DATA.products.filter(
          (p) => p.categoryGroup === product.categoryGroup && p.id !== product.id && !related.includes(p)
        );
        related = related.concat(extra);
      }
      relatedGrid.innerHTML = related.slice(0, 4).map(BF.renderProductCard).join("");
      BF.syncWishlistUI();
    }
  }
})();

