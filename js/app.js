/* ==========================================================================
   BYTEFORGE — SHARED APPLICATION ENGINE (NAVBAR, THEME, SEARCH, WISHLIST, CART)
   ========================================================================== */

(function () {
  "use strict";

  const DATA = window.BYTEFORGE_DATA || { brands: [], categories: [], products: [], customBuilds: [] };
  const STORAGE_KEYS = {
    THEME: "bf_theme",
    WISHLIST: "bf_wishlist",
    CART: "bf_cart",
    BUILDER: "bf_pc_build",
    ENQUIRY_PREFILL: "bf_enquiry_prefill"
  };

  /* -------------------- State Helpers -------------------- */
  function getStoredJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStoredJSON(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      // Ignore storage quota errors in restricted contexts
    }
  }

  let wishlistIds = getStoredJSON(STORAGE_KEYS.WISHLIST, []);
  let cartItems = getStoredJSON(STORAGE_KEYS.CART, []);

  function formatCurrency(amount) {
    return "$" + Number(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  function getProductById(id) {
    return DATA.products.find((p) => p.id === id) || null;
  }

  /* -------------------- Theme Management -------------------- */
  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
    applyTheme(saved);
  }

  function applyTheme(theme) {
    const target = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", target);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, target);
    } catch (e) {}
    updateThemeButtons(target);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  function updateThemeButtons(theme) {
    document.querySelectorAll("[data-action='toggle-theme']").forEach((btn) => {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
      btn.setAttribute("title", theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
      btn.innerHTML =
        theme === "dark"
          ? `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
          : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    });
  }

  /* -------------------- RTL Direction Engine -------------------- */
  const RTL_STORAGE_KEY = "bf_dir";

  function initRtl() {
    const saved = localStorage.getItem(RTL_STORAGE_KEY) || "ltr";
    applyRtl(saved);
  }

  function applyRtl(dir) {
    const target = dir === "rtl" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", target);
    try {
      localStorage.setItem(RTL_STORAGE_KEY, target);
    } catch (e) {}
    updateRtlButtons(target);
  }

  function toggleRtl() {
    const current = document.documentElement.getAttribute("dir") || "ltr";
    applyRtl(current === "rtl" ? "ltr" : "rtl");
  }

  function updateRtlButtons(dir) {
    document.querySelectorAll("[data-action='toggle-rtl']").forEach((btn) => {
      btn.setAttribute("aria-label", dir === "rtl" ? "Switch to LTR Direction" : "Switch to RTL Direction");
      btn.setAttribute("title", dir === "rtl" ? "Switch to LTR" : "Switch to RTL");
      if (dir === "rtl") {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
      btn.textContent = "RTL";
    });
  }

  /* -------------------- Toast Notification -------------------- */
  function showToast(message) {
    let container = document.getElementById("bf-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "bf-toast-container";
      container.className = "toast-container";
      container.setAttribute("aria-live", "polite");
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span style="color:var(--accent-primary);font-weight:700;">●</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      toast.style.transition = "all 180ms ease";
      setTimeout(() => toast.remove(), 200);
    }, 2800);
  }

  /* -------------------- Wishlist Engine -------------------- */
  function isWishlisted(productId) {
    return wishlistIds.includes(productId);
  }

  function toggleWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return;
    if (wishlistIds.includes(productId)) {
      wishlistIds = wishlistIds.filter((id) => id !== productId);
      showToast(`Removed "${product.name}" from Wishlist.`);
    } else {
      wishlistIds.push(productId);
      showToast(`Saved "${product.name}" to Wishlist.`);
    }
    setStoredJSON(STORAGE_KEYS.WISHLIST, wishlistIds);
    syncWishlistUI();
  }

  function syncWishlistUI() {
    // Update navbar badge
    document.querySelectorAll("[data-wishlist-count]").forEach((el) => {
      el.textContent = String(wishlistIds.length);
      el.setAttribute("data-count", String(wishlistIds.length));
    });

    // Update wishlist buttons on product cards
    document.querySelectorAll("[data-wishlist-btn]").forEach((btn) => {
      const pid = btn.getAttribute("data-wishlist-btn");
      const active = wishlistIds.includes(pid);
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    renderWishlistDrawer();
  }

  function renderWishlistDrawer() {
    const body = document.getElementById("bf-wishlist-body");
    if (!body) return;
    if (wishlistIds.length === 0) {
      body.innerHTML = `
        <div class="drawer-empty">
          <p style="font-family:var(--font-heading);font-size:1.05rem;font-weight:700;color:var(--text-primary);margin-bottom:8px;">Your Wishlist is Empty</p>
          <p style="font-size:0.875rem;margin-bottom:16px;">Save processors, graphics cards, motherboards, or peripherals while comparing specs.</p>
          <a href="products.html" class="btn btn-secondary btn-sm">Explore Hardware Catalogue</a>
        </div>`;
      return;
    }

    body.innerHTML = wishlistIds
      .map((id) => {
        const p = getProductById(id);
        if (!p) return "";
        return `
        <div class="drawer-item">
          <a href="product-details.html?id=${encodeURIComponent(p.id)}">
            <img src="${p.image}" alt="${p.name}" class="drawer-item-img" loading="lazy">
          </a>
          <div class="drawer-item-info">
            <a href="product-details.html?id=${encodeURIComponent(p.id)}" class="drawer-item-title">${p.name}</a>
            <div class="drawer-item-meta">${p.brand} • ${p.keySpec.split("•")[0]}</div>
            <div class="drawer-item-price">${formatCurrency(p.price)}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <button type="button" class="btn btn-primary btn-sm" data-add-to-cart="${p.id}" style="padding:4px 10px;min-height:30px;font-size:0.75rem;">+ Cart</button>
            <button type="button" class="btn btn-outline btn-sm" data-wishlist-remove="${p.id}" style="padding:4px 10px;min-height:28px;font-size:0.72rem;">Remove</button>
          </div>
        </div>`;
      })
      .join("");
  }

  /* -------------------- Shopping Cart Engine -------------------- */
  function getCartCount() {
    return cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  }

  function getCartSubtotal() {
    return cartItems.reduce((sum, item) => {
      const p = getProductById(item.id);
      const unitPrice = p ? p.price + (item.priceDelta || 0) : item.customPrice || 0;
      return sum + unitPrice * (item.qty || 1);
    }, 0);
  }

  function addToCart(productId, qty = 1, variantLabel = "", priceDelta = 0) {
    const product = getProductById(productId);
    if (!product) return;
    const key = `${productId}__${variantLabel || "default"}`;
    const existing = cartItems.find((item) => item.key === key);
    if (existing) {
      existing.qty += qty;
    } else {
      cartItems.push({
        key,
        id: productId,
        qty,
        variantLabel: variantLabel || "",
        priceDelta: Number(priceDelta || 0)
      });
    }
    setStoredJSON(STORAGE_KEYS.CART, cartItems);
    syncCartUI();
    showToast(`Added "${product.name}" to Cart.`);
  }

  function updateCartQty(itemKey, delta) {
    const target = cartItems.find((i) => i.key === itemKey);
    if (!target) return;
    target.qty += delta;
    if (target.qty <= 0) {
      cartItems = cartItems.filter((i) => i.key !== itemKey);
    }
    setStoredJSON(STORAGE_KEYS.CART, cartItems);
    syncCartUI();
  }

  function removeCartItem(itemKey) {
    cartItems = cartItems.filter((i) => i.key !== itemKey);
    setStoredJSON(STORAGE_KEYS.CART, cartItems);
    syncCartUI();
  }

  function clearCart() {
    cartItems = [];
    setStoredJSON(STORAGE_KEYS.CART, cartItems);
    syncCartUI();
  }

  function syncCartUI() {
    const count = getCartCount();
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = String(count);
      el.setAttribute("data-count", String(count));
    });
    renderCartDrawer();
  }

  function renderCartDrawer() {
    const body = document.getElementById("bf-cart-body");
    const subtotalEl = document.getElementById("bf-cart-subtotal");
    if (!body) return;

    const subtotal = getCartSubtotal();
    if (subtotalEl) {
      subtotalEl.textContent = formatCurrency(subtotal);
    }

    if (cartItems.length === 0) {
      body.innerHTML = `
        <div class="drawer-empty">
          <p style="font-family:var(--font-heading);font-size:1.05rem;font-weight:700;color:var(--text-primary);margin-bottom:8px;">Your Cart is Empty</p>
          <p style="font-size:0.875rem;margin-bottom:16px;">Add individual PC components, peripherals, or a complete custom build configuration.</p>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
            <a href="products.html" class="btn btn-primary btn-sm">Shop Components</a>
            <a href="build-your-pc.html" class="btn btn-secondary btn-sm">Build Your PC</a>
          </div>
        </div>`;
      return;
    }

    body.innerHTML = cartItems
      .map((item) => {
        const p = getProductById(item.id);
        if (!p) return "";
        const unitPrice = p.price + (item.priceDelta || 0);
        return `
        <div class="drawer-item">
          <a href="product-details.html?id=${encodeURIComponent(p.id)}">
            <img src="${p.image}" alt="${p.name}" class="drawer-item-img" loading="lazy">
          </a>
          <div class="drawer-item-info">
            <a href="product-details.html?id=${encodeURIComponent(p.id)}" class="drawer-item-title">${p.name}</a>
            <div class="drawer-item-meta">${p.brand}${item.variantLabel ? " • " + item.variantLabel : ""}</div>
            <div class="drawer-item-price">${formatCurrency(unitPrice * item.qty)} <span style="font-size:0.72rem;color:var(--text-dim);font-weight:400;">(${formatCurrency(unitPrice)} ea)</span></div>
            <div class="qty-control">
              <button type="button" class="qty-btn" data-cart-qty="${item.key}" data-delta="-1" aria-label="Decrease quantity">&minus;</button>
              <span class="qty-value">${item.qty}</span>
              <button type="button" class="qty-btn" data-cart-qty="${item.key}" data-delta="1" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button type="button" class="icon-btn" data-cart-remove="${item.key}" aria-label="Remove item" style="width:32px;height:32px;">
            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>`;
      })
      .join("");
  }

  /* -------------------- Shared Drawers & Search Modal Injection -------------------- */
  function injectSharedOverlays() {
    if (document.getElementById("bf-shared-overlays")) return;
    const wrapper = document.createElement("div");
    wrapper.id = "bf-shared-overlays";
    wrapper.innerHTML = `
      <div class="overlay-backdrop" id="bf-overlay-backdrop"></div>

      <!-- Global Search Modal -->
      <div class="search-modal" id="bf-search-modal" role="dialog" aria-modal="true" aria-label="Search Hardware Catalogue">
        <div class="search-modal-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="search" id="bf-global-search-input" class="search-modal-input" placeholder="Search GPUs, processors, AM5 motherboards, DDR5, OLED monitors..." autocomplete="off">
          <button type="button" class="btn btn-secondary btn-sm" data-close-overlays>ESC</button>
        </div>
        <div class="search-modal-results" id="bf-global-search-results"></div>
      </div>

      <!-- Wishlist Drawer -->
      <aside class="side-drawer" id="bf-wishlist-drawer" aria-label="Saved Wishlist">
        <div class="drawer-header">
          <h2 class="drawer-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            Saved Wishlist
          </h2>
          <button type="button" class="icon-btn" data-close-overlays aria-label="Close Wishlist">
            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="drawer-body" id="bf-wishlist-body"></div>
        <div class="drawer-footer">
          <a href="products.html" class="btn btn-primary btn-block">Browse Full Catalogue</a>
        </div>
      </aside>

      <!-- Shopping Cart Drawer -->
      <aside class="side-drawer" id="bf-cart-drawer" aria-label="Shopping Cart">
        <div class="drawer-header">
          <h2 class="drawer-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Hardware Cart
          </h2>
          <button type="button" class="icon-btn" data-close-overlays aria-label="Close Cart">
            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="drawer-body" id="bf-cart-body"></div>
        <div class="drawer-footer">
          <div class="drawer-summary-row">
            <span style="color:var(--text-muted);font-weight:500;">Estimated Subtotal (Illustrative)</span>
            <span class="drawer-summary-total" id="bf-cart-subtotal">$0</span>
          </div>
          <p style="font-size:0.75rem;color:var(--text-dim);">Prices are illustrative sample data. Proceed to submit a hardware order or custom build enquiry.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <button type="button" class="btn btn-outline btn-sm" id="bf-clear-cart-btn">Clear Cart</button>
            <button type="button" class="btn btn-primary btn-sm" id="bf-cart-enquire-btn">Enquire / Quote</button>
          </div>
        </div>
      </aside>
    `;
    document.body.appendChild(wrapper);
  }

  function openOverlay(targetId) {
    closeAllOverlays();
    const backdrop = document.getElementById("bf-overlay-backdrop");
    const target = document.getElementById(targetId);
    if (backdrop) backdrop.classList.add("open");
    if (target) target.classList.add("open");
    if (targetId === "bf-search-modal") {
      const input = document.getElementById("bf-global-search-input");
      if (input) {
        setTimeout(() => input.focus(), 60);
        renderGlobalSearchResults(input.value);
      }
    }
  }

  function closeAllOverlays() {
    document.getElementById("bf-overlay-backdrop")?.classList.remove("open");
    document.getElementById("bf-search-modal")?.classList.remove("open");
    document.getElementById("bf-wishlist-drawer")?.classList.remove("open");
    document.getElementById("bf-cart-drawer")?.classList.remove("open");
    document.getElementById("bf-mobile-nav-drawer")?.classList.remove("open");
    document.getElementById("bf-mobile-nav-backdrop")?.classList.remove("open");
    document.getElementById("bf-filter-sidebar")?.classList.remove("open");
  }

  function renderGlobalSearchResults(query) {
    const container = document.getElementById("bf-global-search-results");
    if (!container) return;
    const q = (query || "").trim().toLowerCase();
    const matches = q
      ? DATA.products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.keySpec.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        )
      : DATA.products.filter((p) => p.featured).slice(0, 6);

    if (matches.length === 0) {
      container.innerHTML = `
        <div style="padding:24px;text-align:center;color:var(--text-muted);">
          No hardware products matched "<strong>${query}</strong>".
          <div style="margin-top:12px;">
            <a href="products.html" class="btn btn-secondary btn-sm">View Full Catalogue</a>
          </div>
        </div>`;
      return;
    }

    container.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:0.75rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.08em;">
        <span>${q ? `Matching Hardware (${matches.length})` : "Featured Components & Peripherals"}</span>
        <a href="products.html${q ? "?q=" + encodeURIComponent(query) : ""}" style="color:var(--accent-primary);font-weight:600;">View All in Catalogue</a>
      </div>
      ${matches
        .slice(0, 8)
        .map(
          (p) => `
        <a href="product-details.html?id=${encodeURIComponent(p.id)}" class="search-result-item">
          <div style="display:flex;align-items:center;gap:12px;min-width:0;">
            <img src="${p.image}" alt="${p.name}" style="width:56px;height:42px;object-fit:cover;border-radius:4px;background:var(--card-media-bg);flex-shrink:0;">
            <div style="min-width:0;">
              <div style="font-family:var(--font-heading);font-size:0.9rem;font-weight:700;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.name}</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">${p.brand} • ${p.keySpec}</div>
            </div>
          </div>
          <span style="font-family:var(--font-heading);font-weight:700;color:var(--accent-primary);flex-shrink:0;">${formatCurrency(p.price)}</span>
        </a>`
        )
        .join("")}
    `;
  }

  /* -------------------- Reusable Product Card & Build Card HTML -------------------- */
  function getStatusClass(availability) {
    if (availability === "Low Stock") return "status-low-stock";
    if (availability === "Build-to-Order") return "status-bto";
    return "status-in-stock";
  }

  function renderProductCard(p) {
    const wishActive = isWishlisted(p.id);
    const catObj = DATA.categories.find((c) => c.id === p.category);
    const catLabel = catObj ? catObj.shortName : p.category;
    return `
      <article class="product-card" data-product-id="${p.id}">
        <div class="product-card-media">
          <div class="product-card-badges">
            <span class="status-badge ${getStatusClass(p.availability)}">${p.availability}</span>
          </div>
          <button type="button" class="wishlist-btn ${wishActive ? "active" : ""}" data-wishlist-btn="${p.id}" aria-label="Save ${p.name} to Wishlist" aria-pressed="${wishActive}">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <a href="product-details.html?id=${encodeURIComponent(p.id)}" aria-label="View details for ${p.name}">
            <img src="${p.image}" alt="${p.name}" width="400" height="300" loading="lazy">
          </a>
        </div>
        <div class="product-card-body">
          <div class="product-card-meta">
            <span>${p.brand}</span>
            <span class="product-card-category">${catLabel}</span>
          </div>
          <h3 class="product-card-title">
            <a href="product-details.html?id=${encodeURIComponent(p.id)}">${p.name}</a>
          </h3>
          <span class="product-spec-pill">${p.keySpec}</span>
          <div class="product-card-footer">
            <div class="product-price-wrap">
              <span class="product-price-label">Sample Price</span>
              <span class="product-price">${formatCurrency(p.price)}</span>
            </div>
            <div class="product-card-actions">
              <a href="product-details.html?id=${encodeURIComponent(p.id)}" class="btn btn-secondary btn-sm">Details</a>
              <button type="button" class="btn btn-primary btn-sm" data-add-to-cart="${p.id}">Add to Cart</button>
            </div>
          </div>
        </div>
      </article>`;
  }

  function renderBuildCard(b) {
    return `
      <article class="build-card">
        <div class="build-card-media">
          <span class="build-usecase-badge">${b.codename}</span>
          <img src="${b.image}" alt="${b.name}" width="480" height="330" loading="lazy">
        </div>
        <div class="build-card-body">
          <h3 class="build-card-title">${b.name}</h3>
          <p class="build-card-target">${b.useCase}</p>
          <div class="build-specs-list">
            ${b.highlights
              .map(
                (h) => `
              <div class="build-spec-row">
                <span class="build-spec-key">${h.label}</span>
                <span class="build-spec-val">${h.value}</span>
              </div>`
              )
              .join("")}
          </div>
          <div class="build-card-footer">
            <div class="build-price-row">
              <span class="build-price-note">Est. Sample Build</span>
              <span class="build-price-val">${formatCurrency(b.estimatedPrice)}</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <a href="build-your-pc.html?preset=${encodeURIComponent(b.id)}" class="btn btn-primary btn-sm">Customise Build</a>
              <a href="about-contact.html?enquiry=custom-build&preset=${encodeURIComponent(b.id)}#enquiry-form" class="btn btn-secondary btn-sm">Enquire</a>
            </div>
          </div>
        </div>
      </article>`;
  }

  /* -------------------- Navigation & Event Listeners -------------------- */
  function initNavigationAndEvents() {
    // Desktop dropdown toggle on click (in addition to CSS hover)
    document.querySelectorAll("[data-dropdown-toggle]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parentItem = btn.closest(".nav-item");
        if (!parentItem) return;
        const wasOpen = parentItem.classList.contains("open");
        document.querySelectorAll(".nav-item.open").forEach((el) => el.classList.remove("open"));
        if (!wasOpen) parentItem.classList.add("open");
      });
    });

    // Close desktop dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-item")) {
        document.querySelectorAll(".nav-item.open").forEach((el) => el.classList.remove("open"));
      }
    });

    // Mobile Hamburger Menu open/close
    const mobileDrawer = document.getElementById("bf-mobile-nav-drawer");
    const mobileBackdrop = document.getElementById("bf-mobile-nav-backdrop");

    document.querySelectorAll("[data-action='open-mobile-menu']").forEach((btn) => {
      btn.addEventListener("click", () => {
        mobileDrawer?.classList.add("open");
        mobileBackdrop?.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      });
    });

    document.querySelectorAll("[data-action='close-mobile-menu']").forEach((btn) => {
      btn.addEventListener("click", () => {
        mobileDrawer?.classList.remove("open");
        mobileBackdrop?.classList.remove("open");
        document.querySelectorAll("[data-action='open-mobile-menu']").forEach((b) => b.setAttribute("aria-expanded", "false"));
      });
    });

    mobileBackdrop?.addEventListener("click", () => {
      mobileDrawer?.classList.remove("open");
      mobileBackdrop?.classList.remove("open");
    });

    // Mobile accordion dropdowns
    document.querySelectorAll("[data-mobile-accordion]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".mobile-nav-item");
        if (!item) return;
        item.classList.toggle("expanded");
      });
    });

    // Close mobile menu after selecting any link inside it
    mobileDrawer?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileBackdrop?.classList.remove("open");
      });
    });

    function closeMobileMenuIfOpen() {
      if (mobileDrawer) mobileDrawer.classList.remove("open");
      if (mobileBackdrop) mobileBackdrop.classList.remove("open");
    }

    // Global delegated click handler for actions
    document.addEventListener("click", (e) => {
      const themeBtn = e.target.closest("[data-action='toggle-theme']");
      if (themeBtn) {
        toggleTheme();
        return;
      }

      const rtlBtn = e.target.closest("[data-action='toggle-rtl']");
      if (rtlBtn) {
        toggleRtl();
        return;
      }

      const searchBtn = e.target.closest("[data-action='open-search']");
      if (searchBtn) {
        closeMobileMenuIfOpen();
        openOverlay("bf-search-modal");
        return;
      }

      const wishOpenBtn = e.target.closest("[data-action='open-wishlist']");
      if (wishOpenBtn) {
        closeMobileMenuIfOpen();
        openOverlay("bf-wishlist-drawer");
        return;
      }

      const cartOpenBtn = e.target.closest("[data-action='open-cart']");
      if (cartOpenBtn) {
        closeMobileMenuIfOpen();
        openOverlay("bf-cart-drawer");
        return;
      }

      if (e.target.closest("[data-close-overlays]") || e.target.id === "bf-overlay-backdrop") {
        closeAllOverlays();
        return;
      }

      const wishToggleBtn = e.target.closest("[data-wishlist-btn]");
      if (wishToggleBtn) {
        e.preventDefault();
        toggleWishlist(wishToggleBtn.getAttribute("data-wishlist-btn"));
        return;
      }

      const wishRemoveBtn = e.target.closest("[data-wishlist-remove]");
      if (wishRemoveBtn) {
        toggleWishlist(wishRemoveBtn.getAttribute("data-wishlist-remove"));
        return;
      }

      const addCartBtn = e.target.closest("[data-add-to-cart]");
      if (addCartBtn) {
        e.preventDefault();
        const pid = addCartBtn.getAttribute("data-add-to-cart");
        addToCart(pid, 1);
        return;
      }

      const qtyBtn = e.target.closest("[data-cart-qty]");
      if (qtyBtn) {
        const key = qtyBtn.getAttribute("data-cart-qty");
        const delta = parseInt(qtyBtn.getAttribute("data-delta") || "0", 10);
        updateCartQty(key, delta);
        return;
      }

      const removeCartBtn = e.target.closest("[data-cart-remove]");
      if (removeCartBtn) {
        removeCartItem(removeCartBtn.getAttribute("data-cart-remove"));
        return;
      }

      if (e.target.closest("#bf-clear-cart-btn")) {
        clearCart();
        showToast("Cleared hardware cart.");
        return;
      }

      if (e.target.closest("#bf-cart-enquire-btn")) {
        if (cartItems.length === 0) return;
        const summaryLines = cartItems.map((item) => {
          const p = getProductById(item.id);
          return p ? `${item.qty}x ${p.name} (${formatCurrency(p.price * item.qty)})` : "";
        });
        setStoredJSON(STORAGE_KEYS.ENQUIRY_PREFILL, {
          type: "Component / Bulk Hardware Enquiry",
          interest: `Cart Order Quote (${getCartCount()} Items — Est. ${formatCurrency(getCartSubtotal())})`,
          message: `Hello BYTEFORGE Team,\n\nI would like to enquire about availability and pricing for the following selected hardware items:\n- ${summaryLines.join("\n- ")}\n\nEstimated Illustrative Subtotal: ${formatCurrency(getCartSubtotal())}`
        });
        window.location.href = "contact.html?from=cart#enquiry-form";
      }
    });

    // Global Search input listener
    const searchInput = document.getElementById("bf-global-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        renderGlobalSearchResults(searchInput.value);
      });
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && searchInput.value.trim()) {
          window.location.href = `products.html?q=${encodeURIComponent(searchInput.value.trim())}`;
        }
      });
    }

    // Escape key closes overlays and dropdowns
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAllOverlays();
        document.querySelectorAll(".nav-item.open").forEach((el) => el.classList.remove("open"));
      }
    });
  }

  /* -------------------- Page Hydration for Home-1 and Home-2 -------------------- */
  function hydrateHomepages() {
    // Home-1 Featured Builds
    const homeBuildsEl = document.getElementById("bf-home-builds-grid");
    if (homeBuildsEl) {
      homeBuildsEl.innerHTML = DATA.customBuilds.map(renderBuildCard).join("");
    }

    // Home-1 Featured Products with Tab Filtering
    const homeProductsEl = document.getElementById("bf-home-products-grid");
    if (homeProductsEl) {
      const renderHomeProductTab = (filterKey) => {
        let list = DATA.products;
        if (filterKey === "components") {
          list = DATA.products.filter((p) => p.categoryGroup === "components");
        } else if (filterKey === "peripherals") {
          list = DATA.products.filter((p) => p.categoryGroup === "peripherals");
        } else {
          list = DATA.products.filter((p) => p.featured);
        }
        homeProductsEl.innerHTML = list.slice(0, 8).map(renderProductCard).join("");
        syncWishlistUI();
      };
      renderHomeProductTab("featured");

      document.querySelectorAll("[data-home-product-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll("[data-home-product-tab]").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          renderHomeProductTab(btn.getAttribute("data-home-product-tab"));
        });
      });
    }

    // Home-2 Component Spotlight Tabs
    const spotlightGrid = document.getElementById("bf-home2-spotlight-grid");
    if (spotlightGrid) {
      const renderSpotlight = (catId) => {
        let items = DATA.products.filter((p) => p.category === catId);
        if (catId === "cooling") {
          items = DATA.products.filter((p) => p.category === "cpu-coolers" || p.category === "case-fans");
        }
        spotlightGrid.innerHTML = items.slice(0, 4).map(renderProductCard).join("");
        syncWishlistUI();
      };
      renderSpotlight("graphics-cards");

      document.querySelectorAll("[data-spotlight-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll("[data-spotlight-tab]").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          renderSpotlight(btn.getAttribute("data-spotlight-tab"));
        });
      });
    }

    // Home-2 Peripherals Showcase
    const home2Peripherals = document.getElementById("bf-home2-peripherals-grid");
    if (home2Peripherals) {
      const periphs = DATA.products.filter((p) => p.categoryGroup === "peripherals");
      home2Peripherals.innerHTML = periphs.slice(0, 4).map(renderProductCard).join("");
    }
  }

  /* -------------------- Sticky Scroll Header Effect -------------------- */
  function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 15) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* -------------------- Back To Top Floating Action Button -------------------- */
  function initBackToTop() {
    let btn = document.querySelector(".back-to-top");
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "back-to-top";
      btn.setAttribute("aria-label", "Scroll back to top");
      btn.setAttribute("title", "Back to top");
      btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"></path></svg>`;
      document.body.appendChild(btn);
    }

    const toggleBtnVisibility = () => {
      if (window.scrollY > 280) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    };

    window.addEventListener("scroll", toggleBtnVisibility, { passive: true });
    toggleBtnVisibility();

    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* -------------------- Active Navigation Highlighting -------------------- */
  function syncActiveNavLinks() {
    let currentPath = window.location.pathname.split("/").pop() || "index.html";
    if (currentPath === "" || currentPath === "/") {
      currentPath = "index.html";
    }

    // Clear active classes from desktop nav links
    document.querySelectorAll(".nav-menu .nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    // Clear active classes from mobile drawer
    document.querySelectorAll(".mobile-nav-item").forEach((item) => {
      item.classList.remove("active");
    });
    document.querySelectorAll(".mobile-nav-row").forEach((row) => {
      row.classList.remove("active");
    });
    document.querySelectorAll(".mobile-submenu-link").forEach((link) => {
      link.classList.remove("active");
    });

    // 1. Desktop Nav Highlighting
    const desktopLinks = document.querySelectorAll(".nav-menu .nav-link");
    desktopLinks.forEach((link) => {
      const href = (link.getAttribute("href") || "").split("#")[0].split("?")[0];
      if (href === currentPath || (currentPath === "home-2.html" && href === "index.html")) {
        link.classList.add("active");
      }
    });

    // 2. Mobile Nav Drawer Links
    const mobileRows = document.querySelectorAll(".mobile-nav-list a.mobile-nav-row");
    mobileRows.forEach((row) => {
      const href = (row.getAttribute("href") || "").split("#")[0].split("?")[0];
      if (href === currentPath) {
        row.classList.add("active");
        const parentItem = row.closest(".mobile-nav-item");
        if (parentItem) parentItem.classList.add("active");
      }
    });

    const mobileSubLinks = document.querySelectorAll(".mobile-submenu-link");
    mobileSubLinks.forEach((link) => {
      const href = (link.getAttribute("href") || "").split("#")[0].split("?")[0];
      if (href === currentPath) {
        link.classList.add("active");
        const parentItem = link.closest(".mobile-nav-item");
        if (parentItem) {
          parentItem.classList.add("active");
          parentItem.classList.add("expanded");
        }
      }
    });
  }

  /* -------------------- Public API -------------------- */
  window.ByteForge = {
    DATA,
    STORAGE_KEYS,
    formatCurrency,
    getProductById,
    addToCart,
    toggleWishlist,
    isWishlisted,
    showToast,
    renderProductCard,
    renderBuildCard,
    syncWishlistUI,
    syncCartUI,
    getStoredJSON,
    setStoredJSON
  };

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initRtl();
    injectSharedOverlays();
    initNavigationAndEvents();
    initHeaderScroll();
    initBackToTop();
    syncActiveNavLinks();
    hydrateHomepages();
    syncWishlistUI();
    syncCartUI();
  });
})();

