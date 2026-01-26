/**
 * BUDE Banner Generator - Main Application Script
 *
 * This script handles the banner image upload, logo overlay,
 * and download functionality for the BUDE GLOBAL Banner Generator.
 *
 * @author BUDE Global Enterprise
 * @version 1.0.0
 * @license MIT
 */

// =============================================================================
// DOM ELEMENTS & GLOBAL STATE
// =============================================================================

const uploadArea = document.getElementById("uploadArea");
const bannerInput = document.getElementById("bannerInput");
const previewCanvas = document.getElementById("previewCanvas");
const downloadCanvas = document.getElementById("downloadCanvas");
const logoControls = document.getElementById("logoControls");
const logoSizeInput = document.getElementById("logoSize");
const logoSizeValue = document.getElementById("logoSizeValue");

let bannerImage = null;
let budeLogo = null;
let logoPosition = "bottom-left";
let logoSize = 150;

// =============================================================================
// LOGO LOADING
// =============================================================================

/**
 * Load the BUDE Global logo image
 */
function loadBudeLogo() {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    // Use local logo
    img.src = "assets/BUDE-Logo.png";
  });
}

// Load logo on page load
loadBudeLogo()
  .then((img) => {
    budeLogo = img;
    console.log("BUDE Logo loaded successfully");
  })
  .catch((err) => {
    console.error("Failed to load BUDE logo:", err);
  });

// =============================================================================
// FILE UPLOAD HANDLING
// =============================================================================

/**
 * Handle file upload
 */
uploadArea.addEventListener("click", () => {
  bannerInput.click();
});

bannerInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
});

// Drag and drop support
uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.classList.add("dragover");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadArea.classList.remove("dragover");

  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    handleFile(file);
  }
});

/**
 * Process uploaded file
 */
function handleFile(file) {
  // Validate file size (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    alert("File size must be less than 10MB");
    return;
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    alert("Please upload a valid image file");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      bannerImage = img;
      logoControls.classList.add('active');
      renderPreview();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// =============================================================================
// LOGO POSITION CONTROLS
// =============================================================================

/**
 * Handle logo position button clicks
 */
document.querySelectorAll(".position-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    document.querySelectorAll(".position-btn").forEach((b) => {
      b.classList.remove("active");
    });

    // Add active class to clicked button
    btn.classList.add("active");

    // Update position
    logoPosition = btn.dataset.position;
    renderPreview();
  });
});

/**
 * Handle logo size slider
 */
logoSizeInput.addEventListener("input", (e) => {
  logoSize = parseInt(e.target.value);
  logoSizeValue.textContent = `${logoSize}px`;
  renderPreview();
});

// =============================================================================
// CANVAS RENDERING
// =============================================================================

/**
 * Calculate logo position based on selected position
 */
function getLogoCoordinates(canvasWidth, canvasHeight, logoWidth, logoHeight) {
  const padding = 20;
  let x, y;

  switch (logoPosition) {
    case "top-left":
      x = padding;
      y = padding;
      break;
    case "top-center":
      x = (canvasWidth - logoWidth) / 2;
      y = padding;
      break;
    case "top-right":
      x = canvasWidth - logoWidth - padding;
      y = padding;
      break;
    case "middle-left":
      x = padding;
      y = (canvasHeight - logoHeight) / 2;
      break;
    case "center":
      x = (canvasWidth - logoWidth) / 2;
      y = (canvasHeight - logoHeight) / 2;
      break;
    case "middle-right":
      x = canvasWidth - logoWidth - padding;
      y = (canvasHeight - logoHeight) / 2;
      break;
    case "bottom-left":
      x = padding;
      y = canvasHeight - logoHeight - padding;
      break;
    case "bottom-center":
      x = (canvasWidth - logoWidth) / 2;
      y = canvasHeight - logoHeight - padding;
      break;
    case "bottom-right":
      x = canvasWidth - logoWidth - padding;
      y = canvasHeight - logoHeight - padding;
      break;
    default:
      x = padding;
      y = canvasHeight - logoHeight - padding;
  }

  return { x, y };
}

/**
 * Render preview on canvas
 */
function renderPreview() {
  if (!bannerImage || !budeLogo) return;

  const ctx = previewCanvas.getContext("2d");

  // Set preview canvas size (scaled down for display)
  const maxWidth = 800;
  const scale = Math.min(1, maxWidth / bannerImage.width);
  const previewWidth = bannerImage.width * scale;
  const previewHeight = bannerImage.height * scale;

  previewCanvas.width = previewWidth;
  previewCanvas.height = previewHeight;

  // Draw banner image
  ctx.drawImage(bannerImage, 0, 0, previewWidth, previewHeight);

  // Calculate logo dimensions (maintain aspect ratio)
  const logoScale = logoSize / budeLogo.width;
  const logoWidth = budeLogo.width * logoScale * scale;
  const logoHeight = budeLogo.height * logoScale * scale;

  // Get logo position
  const { x, y } = getLogoCoordinates(
    previewWidth,
    previewHeight,
    logoWidth,
    logoHeight
  );

  // Draw logo with slight transparency background for visibility
  ctx.save();
  ctx.globalAlpha = 0.95;
  ctx.drawImage(budeLogo, x, y, logoWidth, logoHeight);
  ctx.restore();
}

/**
 * Render full-size image for download
 */
function renderDownload() {
  if (!bannerImage || !budeLogo) return null;

  const ctx = downloadCanvas.getContext("2d");

  // Set download canvas to original image size
  downloadCanvas.width = bannerImage.width;
  downloadCanvas.height = bannerImage.height;

  // Draw banner image at full size
  ctx.drawImage(bannerImage, 0, 0);

  // Calculate logo dimensions at full size
  const logoScale = logoSize / budeLogo.width;
  const logoWidth = budeLogo.width * logoScale;
  const logoHeight = budeLogo.height * logoScale;

  // Get logo position
  const { x, y } = getLogoCoordinates(
    bannerImage.width,
    bannerImage.height,
    logoWidth,
    logoHeight
  );

  // Draw logo
  ctx.drawImage(budeLogo, x, y, logoWidth, logoHeight);

  return downloadCanvas;
}

// =============================================================================
// DOWNLOAD FUNCTIONALITY
// =============================================================================

/**
 * Download banner with logo overlay
 */
function downloadBanner(format = "PNG") {
  if (!bannerImage || !budeLogo) {
    alert("Please upload a banner image first");
    return;
  }

  const canvas = renderDownload();
  if (!canvas) return;

  // Convert to blob and download
  const mimeType = format === "JPG" ? "image/jpeg" : "image/png";
  const extension = format.toLowerCase();

  canvas.toBlob(
    (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `BUDE_Global_Banner_${Date.now()}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    mimeType,
    0.95
  );
}

// Make downloadBanner available globally
window.downloadBanner = downloadBanner;
