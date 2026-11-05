/* ==========================================================================
   BYTEFORGE — INTERACTIVE 9-STEP PC BUILDER & RULE-BASED COMPATIBILITY ENGINE
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const BF = window.ByteForge;
    if (!BF || !document.getElementById("bf-pc-builder-page")) return;
    initPCBuilder(BF, BF.DATA);
  });

  function initPCBuilder(BF, DATA) {
    const steps = DATA.builderSteps;
    const params = new URLSearchParams(window.location.search);

    // Load initial build from URL preset, URL encoded build, or localStorage
    let currentBuild = BF.getStoredJSON(BF.STORAGE_KEYS.BUILDER, {});
    const presetParam = params.get("preset");
    if (presetParam) {
      const presetObj = DATA.customBuilds.find((b) => b.id === presetParam);
      if (presetObj && presetObj.components) {
        currentBuild = Object.assign({}, presetObj.components);
        BF.setStoredJSON(BF.STORAGE_KEYS.BUILDER, currentBuild);
      }
    }

    // Track which slot currently has its inline component picker open
    let activePickerKey = null;
    let pickerSearchQuery = "";
    let pickerCompatibleOnly = false;

    const els = {
      stepsContainer: document.getElementById("bf-builder-steps-list"),
      stepNavPills: document.getElementById("bf-builder-step-nav"),
      compatBanner: document.getElementById("bf-compat-banner"),
      compatHeadline: document.getElementById("bf-compat-headline"),
      compatSubtext: document.getElementById("bf-compat-subtext"),
      compatMessages: document.getElementById("bf-compat-messages"),
      compatChecksGrid: document.getElementById("bf-compat-checks-grid"),
      summaryManifest: document.getElementById("bf-summary-manifest"),
      summaryCount: document.getElementById("bf-summary-count"),
      summaryTotal: document.getElementById("bf-summary-total"),
      summaryCompatBadge: document.getElementById("bf-summary-compat-badge"),
      wattageValue: document.getElementById("bf-wattage-value"),
      wattageBar: document.getElementById("bf-wattage-bar"),
      wattageNote: document.getElementById("bf-wattage-note"),
      resetBtn: document.getElementById("bf-reset-build-btn"),
      shareBtn: document.getElementById("bf-share-build-btn"),
      enquireBtn: document.getElementById("bf-enquire-build-btn"),
      addAllCartBtn: document.getElementById("bf-add-build-cart-btn")
    };

    /* -------------------- Rule-Based Compatibility Engine -------------------- */
    function evaluateCompatibility(buildMap) {
      const selected = {};
      steps.forEach((s) => {
        const pid = buildMap[s.key];
        selected[s.key] = pid ? BF.getProductById(pid) : null;
      });

      const conflicts = [];
      const warnings = [];
      const checks = [];

      // Calculate Estimated System Wattage (Base 35W board/USB overhead + component TDPs)
      let baseWatts = 0;
      Object.values(selected).forEach((p) => {
        if (p && p.compat && p.compat.tdpWatts) {
          baseWatts += Number(p.compat.tdpWatts);
        }
      });
      const estimatedWatts = baseWatts > 0 ? baseWatts + 35 : 0;
      const recommendedPsuMin = estimatedWatts > 0 ? Math.ceil((estimatedWatts * 1.25) / 50) * 50 : 0;

      // Check 1: CPU Socket vs Motherboard Socket
      if (selected.cpu && selected.motherboard) {
        const cpuSock = selected.cpu.compat?.socket;
        const mbSock = selected.motherboard.compat?.socket;
        if (cpuSock && mbSock && cpuSock !== mbSock) {
          conflicts.push({
            slots: ["cpu", "motherboard"],
            title: "CPU & Motherboard Socket Conflict",
            detail: `${selected.cpu.name} uses Socket ${cpuSock}, while ${selected.motherboard.name} uses Socket ${mbSock}.`
          });
          checks.push({ label: "CPU / Board Socket", status: "Conflict", detail: `${cpuSock} ≠ ${mbSock}`, color: "var(--status-danger)" });
        } else {
          checks.push({ label: "CPU / Board Socket", status: "Compatible", detail: `Matched Socket ${cpuSock}`, color: "var(--status-success)" });
        }
      } else {
        checks.push({ label: "CPU / Board Socket", status: "Pending", detail: "Select CPU & Motherboard", color: "var(--text-dim)" });
      }

      // Check 2: RAM Generation vs Motherboard Memory Support
      if (selected.ram && selected.motherboard) {
        const ramType = selected.ram.compat?.ramType;
        const mbRam = selected.motherboard.compat?.ramType;
        if (ramType && mbRam && ramType !== mbRam) {
          conflicts.push({
            slots: ["ram", "motherboard"],
            title: "Memory Generation (DDR4/DDR5) Conflict",
            detail: `${selected.ram.name} is ${ramType}, but ${selected.motherboard.name} requires ${mbRam} memory modules.`
          });
          checks.push({ label: "Memory Standard", status: "Conflict", detail: `${ramType} on ${mbRam} Board`, color: "var(--status-danger)" });
        } else {
          checks.push({ label: "Memory Standard", status: "Compatible", detail: `Matched ${ramType}`, color: "var(--status-success)" });
        }
      } else {
        checks.push({ label: "Memory Standard", status: "Pending", detail: "Select Motherboard & RAM", color: "var(--text-dim)" });
      }

      // Check 3: Motherboard Form Factor vs PC Cabinet Support
      if (selected.motherboard && selected.cabinet) {
        const mbFF = selected.motherboard.compat?.formFactor;
        const caseSupported = selected.cabinet.compat?.supportedFormFactors || [];
        if (mbFF && caseSupported.length > 0 && !caseSupported.includes(mbFF)) {
          conflicts.push({
            slots: ["motherboard", "cabinet"],
            title: "Motherboard Form Factor & Cabinet Conflict",
            detail: `${selected.motherboard.name} is ${mbFF}, which exceeds the supported form factors of ${selected.cabinet.name} (${caseSupported.join(", ")}).`
          });
          checks.push({ label: "Chassis Form Factor", status: "Conflict", detail: `${mbFF} won't fit case`, color: "var(--status-danger)" });
        } else {
          checks.push({ label: "Chassis Form Factor", status: "Compatible", detail: `${mbFF} fits Cabinet`, color: "var(--status-success)" });
        }
      } else {
        checks.push({ label: "Chassis Form Factor", status: "Pending", detail: "Select Board & Cabinet", color: "var(--text-dim)" });
      }

      // Check 4: GPU Physical Length vs PC Cabinet Max GPU Clearance
      if (selected.gpu && selected.cabinet) {
        const gpuLen = selected.gpu.compat?.lengthMm;
        const maxLen = selected.cabinet.compat?.maxGpuLengthMm;
        if (gpuLen && maxLen && gpuLen > maxLen) {
          conflicts.push({
            slots: ["gpu", "cabinet"],
            title: "GPU Physical Length Clearance Conflict",
            detail: `${selected.gpu.name} measures ${gpuLen} mm in length, exceeding ${selected.cabinet.name}'s maximum GPU clearance of ${maxLen} mm.`
          });
          checks.push({ label: "GPU Length Clearance", status: "Conflict", detail: `${gpuLen}mm > ${maxLen}mm max`, color: "var(--status-danger)" });
        } else {
          checks.push({
            label: "GPU Length Clearance",
            status: "Compatible",
            detail: `${gpuLen}mm fits (${maxLen - gpuLen}mm margin)`,
            color: "var(--status-success)"
          });
        }
      } else {
        checks.push({ label: "GPU Length Clearance", status: "Pending", detail: "Select GPU & Cabinet", color: "var(--text-dim)" });
      }

      // Check 5: System Wattage & GPU Requirement vs Power Supply Capacity
      if (selected.psu && estimatedWatts > 0) {
        const psuW = selected.psu.compat?.psuWatts || 0;
        const gpuRecPsu = selected.gpu?.compat?.recommendedPsuWatts || 0;
        const requiredW = Math.max(recommendedPsuMin, gpuRecPsu);
        if (psuW < estimatedWatts) {
          conflicts.push({
            slots: ["psu", "gpu"],
            title: "Insufficient Power Supply Capacity",
            detail: `Estimated system load (~${estimatedWatts}W) exceeds the continuous ${psuW}W output of ${selected.psu.name}.`
          });
          checks.push({ label: "Power & PSU Headroom", status: "Conflict", detail: `${psuW}W < ${estimatedWatts}W load`, color: "var(--status-danger)" });
        } else if (psuW < requiredW) {
          warnings.push({
            slots: ["psu"],
            title: "Tight Power Supply Headroom Warning",
            detail: `Selected ${psuW}W PSU is below the recommended ${requiredW}W capacity (with transient spike headroom) for your selected components (~${estimatedWatts}W peak draw).`
          });
          checks.push({ label: "Power & PSU Headroom", status: "Tight Headroom", detail: `${psuW}W (${requiredW}W rec.)`, color: "var(--status-warning)" });
        } else {
          checks.push({
            label: "Power & PSU Headroom",
            status: "Compatible",
            detail: `${psuW}W PSU (~${estimatedWatts}W est. draw)`,
            color: "var(--status-success)"
          });
        }
      } else {
        checks.push({ label: "Power & PSU Headroom", status: "Pending", detail: "Select PSU & Core Parts", color: "var(--text-dim)" });
      }

      return {
        selected,
        conflicts,
        warnings,
        checks,
        estimatedWatts,
        recommendedPsuMin
      };
    }

    // Helper to check if a candidate product would conflict with currently selected parts
    function checkCandidateCompatibility(stepKey, candidateProduct, selectedMap) {
      const testMap = Object.assign({}, currentBuild, { [stepKey]: candidateProduct.id });
      const report = evaluateCompatibility(testMap);
      const slotConflict = report.conflicts.find((c) => c.slots.includes(stepKey));
      if (slotConflict) {
        return { compatible: false, reason: slotConflict.title };
      }
      const slotWarn = report.warnings.find((w) => w.slots.includes(stepKey));
      if (slotWarn) {
        return { compatible: true, warning: true, reason: "Tight Wattage Margin" };
      }
      return { compatible: true, reason: "Compatible" };
    }

    /* -------------------- Render Full Builder UI -------------------- */
    function renderBuilder() {
      const report = evaluateCompatibility(currentBuild);
      const selectedCount = Object.values(report.selected).filter(Boolean).length;
      const totalPrice = Object.values(report.selected).reduce((sum, p) => sum + (p ? p.price : 0), 0);

      // 1. Render Step Quick-Nav Pills
      if (els.stepNavPills) {
        els.stepNavPills.innerHTML = steps
          .map((s) => {
            const p = report.selected[s.key];
            const hasConflict = report.conflicts.some((c) => c.slots.includes(s.key));
            return `
              <a href="#slot-${s.key}" class="btn btn-sm ${hasConflict ? "btn-outline" : p ? "btn-secondary" : "btn-outline"}" style="${
              hasConflict ? "border-color:var(--status-danger);color:var(--status-danger);" : p ? "border-color:var(--accent-border);" : ""
            }">
                <span style="color:var(--accent-primary);font-weight:700;">0${s.step}</span>
                <span>${s.title.split(" ")[0]}</span>
                ${hasConflict ? `<span title="Conflict">⚠</span>` : p ? `<span style="color:var(--status-success);">✓</span>` : ""}
              </a>`;
          })
          .join("");
      }

      // 2. Render Compatibility Diagnostic Banner
      if (els.compatBanner) {
        els.compatBanner.classList.remove("status-ok", "status-conflict", "status-warn");
        if (report.conflicts.length > 0) {
          els.compatBanner.classList.add("status-conflict");
          els.compatHeadline.textContent = `${report.conflicts.length} Component Compatibility Conflict${report.conflicts.length > 1 ? "s" : ""} Detected`;
          els.compatSubtext.textContent = "Review the highlighted socket, memory generation, or physical clearance conflicts below before ordering.";
        } else if (report.warnings.length > 0) {
          els.compatBanner.classList.add("status-warn");
          els.compatHeadline.textContent = "Compatibility Advisory: Power Headroom Notice";
          els.compatSubtext.textContent = "Physical sockets and form factors match, but a higher-wattage PSU is recommended for transient load spikes.";
        } else if (selectedCount > 0) {
          els.compatBanner.classList.add("status-ok");
          els.compatHeadline.textContent = `All ${selectedCount} Selected Component${selectedCount > 1 ? "s" : ""} Pass Rule-Based Checks`;
          els.compatSubtext.textContent = "Verified against sample catalogue socket, DDR generation, motherboard form factor, GPU clearance, and wattage rules.";
        } else {
          els.compatHeadline.textContent = "Ready to Configure — Select Components or Load a Sample Preset";
          els.compatSubtext.textContent = "Rule-based checks will automatically verify socket, memory generation, chassis clearance, and power requirements.";
        }

        // Messages list
        const allAlerts = [
          ...report.conflicts.map((c) => `<div style="padding:10px 14px;background:rgba(239,68,68,0.14);border:1px solid rgba(239,68,68,0.4);border-radius:6px;font-size:0.85rem;color:var(--text-primary);"><strong>⚠ ${c.title}:</strong> ${c.detail}</div>`),
          ...report.warnings.map((w) => `<div style="padding:10px 14px;background:rgba(245,158,11,0.14);border:1px solid rgba(245,158,11,0.4);border-radius:6px;font-size:0.85rem;color:var(--text-primary);"><strong>⚡ ${w.title}:</strong> ${w.detail}</div>`)
        ];
        els.compatMessages.innerHTML = allAlerts.length > 0 ? `<div style="display:flex;flex-direction:column;gap:8px;margin-top:12px;">${allAlerts.join("")}</div>` : "";

        // 5 Check Pills
        if (els.compatChecksGrid) {
          els.compatChecksGrid.innerHTML = report.checks
            .map(
              (c) => `
            <div class="compat-check-pill">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
                <span style="font-family:var(--font-heading);font-weight:700;color:var(--text-secondary);">${c.label}</span>
                <span style="font-size:0.7rem;font-weight:700;color:${c.color};text-transform:uppercase;">${c.status}</span>
              </div>
              <div style="color:var(--text-muted);font-size:0.76rem;">${c.detail}</div>
            </div>`
            )
            .join("");
        }
      }

      // 3. Render 9 Component Slots
      if (els.stepsContainer) {
        els.stepsContainer.innerHTML = steps
          .map((s) => {
            const p = report.selected[s.key];
            const isPickerOpen = activePickerKey === s.key;
            const slotConflict = report.conflicts.find((c) => c.slots.includes(s.key));

            // Candidate list if picker is open
            let pickerHtml = "";
            if (isPickerOpen) {
              let candidates = DATA.products.filter((prod) => prod.category === s.categoryId);
              if (pickerSearchQuery.trim() !== "") {
                const q = pickerSearchQuery.trim().toLowerCase();
                candidates = candidates.filter(
                  (prod) =>
                    prod.name.toLowerCase().includes(q) ||
                    prod.brand.toLowerCase().includes(q) ||
                    prod.keySpec.toLowerCase().includes(q)
                );
              }
              if (pickerCompatibleOnly) {
                candidates = candidates.filter((prod) => checkCandidateCompatibility(s.key, prod, report.selected).compatible);
              }

              pickerHtml = `
                <div class="slot-picker-drawer">
                  <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;background:var(--bg-primary);padding:12px 14px;border-radius:var(--radius-sm);border:1px solid var(--border-subtle);">
                    <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:200px;">
                      <input type="search" class="form-control" id="bf-picker-search-input" value="${pickerSearchQuery}" placeholder="Search ${s.title} by brand or spec..." style="min-height:36px;padding:6px 12px;font-size:0.85rem;">
                    </div>
                    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                      <label style="display:inline-flex;align-items:center;gap:6px;font-size:0.8125rem;cursor:pointer;color:var(--text-secondary);">
                        <input type="checkbox" id="bf-picker-compat-toggle" ${pickerCompatibleOnly ? "checked" : ""} style="accent-color:var(--accent-primary);width:16px;height:16px;">
                        <span>Show Compatible Only</span>
                      </label>
                      <button type="button" class="btn btn-secondary btn-sm" data-close-picker>Close Picker</button>
                    </div>
                  </div>
                  <div class="slot-picker-grid">
                    ${
                      candidates.length === 0
                        ? `<div style="grid-column:1 / -1;padding:24px;text-align:center;color:var(--text-muted);">No matching components in this filter view. Uncheck "Show Compatible Only" or clear search to view all options.</div>`
                        : candidates
                            .map((cand) => {
                              const compatStatus = checkCandidateCompatibility(s.key, cand, report.selected);
                              const isCurrent = p && p.id === cand.id;
                              return `
                            <div class="picker-option-card" style="${!compatStatus.compatible ? "border-color:rgba(239,68,68,0.45);" : isCurrent ? "border-color:var(--accent-primary);" : ""}">
                              <div class="picker-option-top">
                                <img src="${cand.image}" alt="${cand.name}" class="picker-option-img" loading="lazy">
                                <div style="min-width:0;">
                                  <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:2px;">
                                    <span style="font-size:0.7rem;font-weight:700;color:var(--accent-primary);text-transform:uppercase;">${cand.brand}</span>
                                    <span style="font-size:0.68rem;font-weight:700;padding:2px 6px;border-radius:4px;background:${
                                      compatStatus.compatible ? "var(--status-success-bg)" : "var(--status-danger-bg)"
                                    };color:${compatStatus.compatible ? "var(--status-success)" : "var(--status-danger)"};">
                                      ${compatStatus.compatible ? "✓ Compatible" : "⚠ " + compatStatus.reason}
                                    </span>
                                  </div>
                                  <div style="font-family:var(--font-heading);font-size:0.9rem;font-weight:700;color:var(--text-primary);line-height:1.3;">${cand.name}</div>
                                  <div style="font-size:0.75rem;color:var(--text-muted);margin-top:3px;">${cand.keySpec}</div>
                                </div>
                              </div>
                              <div style="display:flex;align-items:center;justify-content:space-between;padding-top:8px;border-top:1px solid var(--border-subtle);margin-top:auto;">
                                <span style="font-family:var(--font-heading);font-size:1.05rem;font-weight:700;color:var(--text-primary);">${BF.formatCurrency(cand.price)}</span>
                                <div style="display:flex;gap:6px;">
                                  <a href="product-details.html?id=${encodeURIComponent(cand.id)}" class="btn btn-outline btn-sm" style="padding:4px 10px;min-height:32px;font-size:0.75rem;">Specs</a>
                                  <button type="button" class="btn btn-primary btn-sm" data-select-component="${s.key}" data-product-id="${cand.id}" style="padding:4px 12px;min-height:32px;font-size:0.75rem;">
                                    ${isCurrent ? "Selected" : "Select Part"}
                                  </button>
                                </div>
                              </div>
                            </div>`;
                            })
                            .join("")
                    }
                  </div>
                </div>`;
            }

            return `
              <section class="builder-slot-card ${p ? "filled" : ""} ${slotConflict ? "conflict" : ""}" id="slot-${s.key}">
                <div class="slot-header-row">
                  <div>
                    <div class="slot-step-badge">
                      <span>Step 0${s.step}</span>
                      <span>•</span>
                      <span>${s.required ? "Core Component" : "Optional Airflow"}</span>
                      ${slotConflict ? `<span style="color:var(--status-danger);">• ⚠ Conflict Detected</span>` : ""}
                    </div>
                    <h3 style="font-size:1.15rem;margin-top:2px;">${s.title}</h3>
                    <p style="font-size:0.8125rem;color:var(--text-muted);">${s.subtitle}</p>
                  </div>
                  <div>
                    ${
                      p
                        ? `<button type="button" class="btn btn-secondary btn-sm" data-open-picker="${s.key}">${isPickerOpen ? "Hide Options" : "Replace Component"}</button>`
                        : `<button type="button" class="btn btn-primary btn-sm" data-open-picker="${s.key}">${isPickerOpen ? "Hide Options" : "+ Select " + s.title.split(" ")[0]}</button>`
                    }
                  </div>
                </div>

                ${
                  p
                    ? `
                  <div class="slot-selected-body">
                    <a href="product-details.html?id=${encodeURIComponent(p.id)}">
                      <img src="${p.image}" alt="${p.name}" class="slot-selected-img" loading="lazy">
                    </a>
                    <div style="min-width:0;">
                      <div style="font-size:0.72rem;font-weight:700;color:var(--accent-primary);text-transform:uppercase;letter-spacing:0.06em;">${p.brand} • ${p.availability}</div>
                      <a href="product-details.html?id=${encodeURIComponent(p.id)}" style="font-family:var(--font-heading);font-size:1rem;font-weight:700;color:var(--text-primary);display:block;">${p.name}</a>
                      <span class="product-spec-pill" style="margin-top:4px;">${p.keySpec}</span>
                    </div>
                    <div class="slot-selected-actions" style="text-align:right;">
                      <div style="font-family:var(--font-heading);font-size:1.2rem;font-weight:700;color:var(--text-primary);margin-bottom:6px;">${BF.formatCurrency(p.price)}</div>
                      <div style="display:inline-flex;gap:6px;">
                        <button type="button" class="btn btn-outline btn-sm" data-open-picker="${s.key}" style="padding:4px 10px;min-height:30px;font-size:0.75rem;">Swap</button>
                        <button type="button" class="btn btn-outline btn-sm" data-remove-component="${s.key}" style="padding:4px 10px;min-height:30px;font-size:0.75rem;color:var(--status-danger);border-color:rgba(239,68,68,0.35);">Remove</button>
                      </div>
                    </div>
                  </div>`
                    : ""
                }

                ${pickerHtml}
              </section>`;
          })
          .join("");

        // Bind events inside rendered slots
        els.stepsContainer.querySelectorAll("[data-open-picker]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const key = btn.getAttribute("data-open-picker");
            if (activePickerKey === key) {
              activePickerKey = null;
            } else {
              activePickerKey = key;
              pickerSearchQuery = "";
            }
            renderBuilder();
          });
        });

        els.stepsContainer.querySelectorAll("[data-close-picker]").forEach((btn) => {
          btn.addEventListener("click", () => {
            activePickerKey = null;
            renderBuilder();
          });
        });

        els.stepsContainer.querySelectorAll("[data-select-component]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const key = btn.getAttribute("data-select-component");
            const pid = btn.getAttribute("data-product-id");
            currentBuild[key] = pid;
            BF.setStoredJSON(BF.STORAGE_KEYS.BUILDER, currentBuild);
            activePickerKey = null;
            const prod = BF.getProductById(pid);
            if (prod) BF.showToast(`Selected "${prod.name}" for ${key.toUpperCase()}.`);
            renderBuilder();
          });
        });

        els.stepsContainer.querySelectorAll("[data-remove-component]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const key = btn.getAttribute("data-remove-component");
            delete currentBuild[key];
            BF.setStoredJSON(BF.STORAGE_KEYS.BUILDER, currentBuild);
            renderBuilder();
          });
        });

        const searchEl = document.getElementById("bf-picker-search-input");
        if (searchEl) {
          searchEl.focus();
          searchEl.setSelectionRange(searchEl.value.length, searchEl.value.length);
          searchEl.addEventListener("input", () => {
            pickerSearchQuery = searchEl.value;
            renderBuilder();
          });
        }

        const compatToggleEl = document.getElementById("bf-picker-compat-toggle");
        if (compatToggleEl) {
          compatToggleEl.addEventListener("change", () => {
            pickerCompatibleOnly = compatToggleEl.checked;
            renderBuilder();
          });
        }
      }

      // 4. Update Right-Side Sticky Build Summary
      if (els.summaryCount) {
        els.summaryCount.textContent = `${selectedCount} / ${steps.length} Components Selected`;
      }
      if (els.summaryTotal) {
        els.summaryTotal.textContent = BF.formatCurrency(totalPrice);
      }
      if (els.summaryCompatBadge) {
        if (report.conflicts.length > 0) {
          els.summaryCompatBadge.textContent = `${report.conflicts.length} Conflict(s)`;
          els.summaryCompatBadge.style.color = "var(--status-danger)";
        } else if (selectedCount === 0) {
          els.summaryCompatBadge.textContent = "No Parts Selected";
          els.summaryCompatBadge.style.color = "var(--text-dim)";
        } else {
          els.summaryCompatBadge.textContent = "✓ Compatible";
          els.summaryCompatBadge.style.color = "var(--status-success)";
        }
      }

      // Wattage Meter
      if (els.wattageValue && els.wattageBar && els.wattageNote) {
        const psuWatts = report.selected.psu?.compat?.psuWatts || 0;
        els.wattageValue.textContent = `~${report.estimatedWatts}W Est. Peak`;
        const pct = psuWatts > 0 ? Math.min(100, Math.round((report.estimatedWatts / psuWatts) * 100)) : Math.min(100, Math.round((report.estimatedWatts / 1000) * 100));
        els.wattageBar.style.width = `${pct}%`;
        els.wattageBar.style.backgroundColor =
          psuWatts > 0 && report.estimatedWatts > psuWatts
            ? "var(--status-danger)"
            : psuWatts > 0 && report.estimatedWatts * 1.25 > psuWatts
            ? "var(--status-warning)"
            : "var(--accent-primary)";
        els.wattageNote.textContent =
          psuWatts > 0
            ? `Selected PSU: ${psuWatts}W (${pct}% load • Recommended min: ${report.recommendedPsuMin}W)`
            : `Recommended PSU capacity: ≥ ${report.recommendedPsuMin || 650}W`;
      }

      // Manifest Rows
      if (els.summaryManifest) {
        els.summaryManifest.innerHTML = steps
          .map((s) => {
            const p = report.selected[s.key];
            return `
              <div class="summary-manifest-row">
                <div style="min-width:0;padding-right:8px;">
                  <div style="font-size:0.7rem;color:var(--text-dim);text-transform:uppercase;">${s.title}</div>
                  <div style="font-weight:600;color:${p ? "var(--text-primary)" : "var(--text-dim)"};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    ${p ? p.name : "— Not Selected —"}
                  </div>
                </div>
                <div style="font-family:var(--font-heading);font-weight:700;color:${p ? "var(--accent-primary)" : "var(--text-dim)"};flex-shrink:0;align-self:flex-end;">
                  ${p ? BF.formatCurrency(p.price) : "$0"}
                </div>
              </div>`;
          })
          .join("");
      }
    }

    // Bind Preset Loader Buttons
    document.querySelectorAll("[data-load-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const presetId = btn.getAttribute("data-load-preset");
        if (presetId === "conflict-demo") {
          // Load an intentional Socket + RAM + GPU Clearance conflict to showcase the compatibility engine
          currentBuild = {
            cpu: "cpu-ryzen9-9950x", // AM5
            motherboard: "mobo-asus-b760", // LGA1700 + DDR4
            gpu: "gpu-asus-4090", // 358mm length
            ram: "ram-corsair-64gb-ddr5", // DDR5 on DDR4 board
            storage: "ssd-samsung-990pro-2tb",
            psu: "psu-cm-mwe650", // 650W PSU on ~680W load
            cabinet: "case-asus-ap201", // mATX only + 315mm GPU max
            cooler: "cooler-corsair-h150i"
          };
          BF.setStoredJSON(BF.STORAGE_KEYS.BUILDER, currentBuild);
          activePickerKey = null;
          renderBuilder();
          BF.showToast("Loaded Compatibility Conflict Test Demo — see warnings above.");
          return;
        }
        const presetObj = DATA.customBuilds.find((b) => b.id === presetId);
        if (presetObj && presetObj.components) {
          currentBuild = Object.assign({}, presetObj.components);
          BF.setStoredJSON(BF.STORAGE_KEYS.BUILDER, currentBuild);
          activePickerKey = null;
          renderBuilder();
          BF.showToast(`Loaded "${presetObj.name}" configuration.`);
        }
      });
    });

    // Reset Build
    els.resetBtn?.addEventListener("click", () => {
      currentBuild = {};
      BF.setStoredJSON(BF.STORAGE_KEYS.BUILDER, currentBuild);
      activePickerKey = null;
      renderBuilder();
      BF.showToast("PC Builder configuration reset.");
    });

    // Copy / Share Build Summary
    els.shareBtn?.addEventListener("click", () => {
      const report = evaluateCompatibility(currentBuild);
      const lines = steps
        .map((s) => {
          const p = report.selected[s.key];
          return `${s.title}: ${p ? `${p.name} (${BF.formatCurrency(p.price)})` : "Not Selected"}`;
        })
        .join("\n");
      const total = Object.values(report.selected).reduce((sum, p) => sum + (p ? p.price : 0), 0);
      const specText = `BYTEFORGE Custom PC Configuration\n-----------------------------------\n${lines}\n-----------------------------------\nEstimated Wattage: ~${report.estimatedWatts}W\nEstimated Sample Total: ${BF.formatCurrency(total)}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(specText).then(() => {
          BF.showToast("Copied full PC Build specification sheet to clipboard!");
        });
      } else {
        BF.showToast("Build saved locally in browser storage!");
      }
    });

    // Add All Selected Parts to Cart
    els.addAllCartBtn?.addEventListener("click", () => {
      const pids = Object.values(currentBuild).filter(Boolean);
      if (pids.length === 0) {
        BF.showToast("Select at least one component before adding to cart.");
        return;
      }
      pids.forEach((pid) => BF.addToCart(pid, 1));
      BF.showToast(`Added all ${pids.length} configured PC components to Cart!`);
    });

    // Enquire About This Build
    els.enquireBtn?.addEventListener("click", () => {
      const report = evaluateCompatibility(currentBuild);
      const selectedEntries = steps
        .map((s) => ({ stepTitle: s.title, product: report.selected[s.key] }))
        .filter((e) => e.product);

      if (selectedEntries.length === 0) {
        BF.showToast("Please select components or load a preset before submitting a build enquiry.");
        return;
      }

      const total = selectedEntries.reduce((sum, e) => sum + e.product.price, 0);
      const partLines = selectedEntries.map((e) => `- ${e.stepTitle}: ${e.product.name} (${BF.formatCurrency(e.product.price)})`).join("\n");

      BF.setStoredJSON(BF.STORAGE_KEYS.ENQUIRY_PREFILL, {
        type: "Custom PC Build Enquiry",
        interest: `Custom PC Build (${selectedEntries.length} Components • Est. ${BF.formatCurrency(total)})`,
        budget: total > 3000 ? "$3,000+" : total > 1800 ? "$1,500 – $3,000" : "$800 – $1,500",
        message: `Hello BYTEFORGE Build Team,\n\nI would like to enquire about assembling/sourcing the following custom PC configuration:\n\n${partLines}\n\nEstimated System Load: ~${report.estimatedWatts}W\nCompatibility Status: ${
          report.conflicts.length === 0 ? "All Rule-Based Checks Passed" : report.conflicts.length + " Conflict(s) Flagged for Review"
        }\nEstimated Illustrative Total: ${BF.formatCurrency(total)}\n\nPlease advise on assembly options and component availability.`
      });

      window.location.href = "contact.html?enquiry=custom-build#enquiry-form";
    });

    renderBuilder();
  }
})();

