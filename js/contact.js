/* ==========================================================================
   BYTEFORGE — ABOUT US & CONTACT ENQUIRY FORM ENGINE (about-contact.html)
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const BF = window.ByteForge;
    const form = document.getElementById("bf-enquiry-form");
    if (!BF || !form) return;

    const params = new URLSearchParams(window.location.search);
    const fields = {
      name: document.getElementById("bf-form-name"),
      email: document.getElementById("bf-form-email"),
      phone: document.getElementById("bf-form-phone"),
      type: document.getElementById("bf-form-type"),
      interest: document.getElementById("bf-form-interest"),
      budget: document.getElementById("bf-form-budget"),
      message: document.getElementById("bf-form-message")
    };

    const prefillNotice = document.getElementById("bf-prefill-notice");
    const successPanel = document.getElementById("bf-form-success");
    const resetFormBtn = document.getElementById("bf-form-new-btn");

    // 1. Check URL Preset / Product / Stored Prefill
    const presetId = params.get("preset");
    const productId = params.get("product");
    const enquiryParam = params.get("enquiry");
    const storedPrefill = BF.getStoredJSON(BF.STORAGE_KEYS.ENQUIRY_PREFILL, null);

    if (presetId) {
      const preset = BF.DATA.customBuilds.find((b) => b.id === presetId);
      if (preset) {
        if (fields.type) fields.type.value = "Custom PC Build Enquiry";
        if (fields.interest) fields.interest.value = `${preset.name} (${preset.codename} — Est. ${BF.formatCurrency(preset.estimatedPrice)})`;
        if (fields.budget) {
          fields.budget.value = preset.estimatedPrice > 3000 ? "$3,000+" : preset.estimatedPrice > 1800 ? "$1,500 – $3,000" : "$800 – $1,500";
        }
        if (fields.message) {
          const specs = preset.highlights.map((h) => `- ${h.label}: ${h.value}`).join("\n");
          fields.message.value = `Hello BYTEFORGE Team,\n\nI am interested in the "${preset.name}" sample configuration:\n${specs}\n\nPlease share component availability and customisation options.`;
        }
        if (prefillNotice) {
          prefillNotice.style.display = "block";
          prefillNotice.textContent = `Pre-populated with "${preset.name}" build specifications.`;
        }
      }
    } else if (productId) {
      const prod = BF.getProductById(productId);
      if (prod) {
        if (fields.type) fields.type.value = "Product Availability & Specification Enquiry";
        if (fields.interest) fields.interest.value = `${prod.name} (SKU: ${prod.sku} — ${BF.formatCurrency(prod.price)})`;
        if (fields.message) {
          fields.message.value = `Hello BYTEFORGE Team,\n\nI would like to enquire about "${prod.name}" (${prod.keySpec}). Please share availability and compatibility details.`;
        }
        if (prefillNotice) {
          prefillNotice.style.display = "block";
          prefillNotice.textContent = `Pre-populated with product details for "${prod.name}".`;
        }
      }
    } else if (enquiryParam === "custom-build" || params.get("from") === "cart") {
      if (storedPrefill) {
        if (fields.type && storedPrefill.type) fields.type.value = storedPrefill.type;
        if (fields.interest && storedPrefill.interest) fields.interest.value = storedPrefill.interest;
        if (fields.budget && storedPrefill.budget) fields.budget.value = storedPrefill.budget;
        if (fields.message && storedPrefill.message) fields.message.value = storedPrefill.message;
        if (prefillNotice) {
          prefillNotice.style.display = "block";
          prefillNotice.textContent = "Your configured PC build or hardware selection has been loaded into the enquiry form below.";
        }
      } else if (fields.type) {
        fields.type.value = "Custom PC Build Enquiry";
      }
    }

    // 2. Field Validation Rules
    function setFieldError(inputEl, errorMsg) {
      if (!inputEl) return false;
      const wrapper = inputEl.closest(".form-field");
      const errEl = wrapper ? wrapper.querySelector(".field-error") : null;
      if (errorMsg) {
        inputEl.classList.add("invalid");
        wrapper?.classList.add("has-error");
        if (errEl) errEl.textContent = errorMsg;
        return false;
      } else {
        inputEl.classList.remove("invalid");
        wrapper?.classList.remove("has-error");
        if (errEl) errEl.textContent = "";
        return true;
      }
    }

    function validateField(key) {
      const el = fields[key];
      if (!el) return true;
      const val = (el.value || "").trim();

      switch (key) {
        case "name":
          if (val.length < 2) return setFieldError(el, "Please enter your full name (at least 2 characters).");
          return setFieldError(el, "");
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return setFieldError(el, "Please enter a valid email address (e.g. alex@domain.com).");
          return setFieldError(el, "");
        case "phone":
          if (!/^[0-9+\-() ]{7,20}$/.test(val)) return setFieldError(el, "Please enter a valid contact phone number (7–20 digits).");
          return setFieldError(el, "");
        case "type":
          if (!val) return setFieldError(el, "Please select an enquiry type.");
          return setFieldError(el, "");
        case "interest":
          if (val.length < 3) return setFieldError(el, "Please specify the product, component, or PC build of interest.");
          return setFieldError(el, "");
        case "budget":
          if (!val) return setFieldError(el, "Please select an indicative budget range.");
          return setFieldError(el, "");
        case "message":
          if (val.length < 15) return setFieldError(el, "Please provide a brief message or specification details (at least 15 characters).");
          return setFieldError(el, "");
        default:
          return true;
      }
    }

    Object.keys(fields).forEach((key) => {
      const el = fields[key];
      el?.addEventListener("input", () => {
        if (el.classList.contains("invalid")) validateField(key);
      });
      el?.addEventListener("blur", () => validateField(key));
    });

    // 3. Form Submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let allValid = true;
      Object.keys(fields).forEach((key) => {
        if (!validateField(key)) allValid = false;
      });

      if (!allValid) {
        BF.showToast("Please complete all highlighted required fields.");
        const firstInvalid = form.querySelector(".invalid");
        firstInvalid?.focus();
        return;
      }

      // Render Frontend Demo Confirmation State
      const summaryBox = document.getElementById("bf-form-submitted-summary");
      if (summaryBox) {
        summaryBox.innerHTML = `
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-top:12px;text-align:left;background:var(--bg-primary);padding:16px;border-radius:var(--radius-sm);border:1px solid var(--border-subtle);font-size:0.85rem;">
            <div><span style="color:var(--text-dim);display:block;">Full Name</span><strong>${escapeHtml(fields.name.value)}</strong></div>
            <div><span style="color:var(--text-dim);display:block;">Email & Phone</span><strong>${escapeHtml(fields.email.value)} • ${escapeHtml(fields.phone.value)}</strong></div>
            <div><span style="color:var(--text-dim);display:block;">Enquiry Type</span><strong>${escapeHtml(fields.type.value)}</strong></div>
            <div><span style="color:var(--text-dim);display:block;">Budget Range</span><strong>${escapeHtml(fields.budget.value)}</strong></div>
            <div style="grid-column:1 / -1;"><span style="color:var(--text-dim);display:block;">Hardware / Build of Interest</span><strong>${escapeHtml(fields.interest.value)}</strong></div>
          </div>`;
      }

      form.style.display = "none";
      if (successPanel) successPanel.style.display = "block";
      BF.showToast("Enquiry validated in frontend demonstration mode.");
    });

    resetFormBtn?.addEventListener("click", () => {
      form.reset();
      if (successPanel) successPanel.style.display = "none";
      form.style.display = "block";
    });

    function escapeHtml(str) {
      return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
  });
})();

