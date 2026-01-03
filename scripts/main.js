/**
 * BUDE Logo Generator - Main Application Script
 *
 * This script handles the logo generation and download
 * functionality for the BUDE GLOBAL Logo Generator.
 *
 * @author BUDE Global Enterprise
 * @version 2.0.0
 * @license MIT
 */

// =============================================================================
// DOM ELEMENTS & GLOBAL STATE
// =============================================================================

/** @type {SVGElement} The main SVG logo element */
var svg = document.querySelector("svg");

/** @type {HTMLCanvasElement} Canvas element for PNG conversion */
var canvas = document.querySelector("canvas");

/** @type {HTMLImageElement} Image element for rendering SVG to canvas */
var image = document.querySelector("img");

/** @type {HTMLButtonElement} The download button element */
var downloadBtn = document.getElementById("myBtn");

/** @type {string} Current download format ('SVG' or 'PNG') */
var format = "SVG";

// =============================================================================
// FORMAT SELECTION
// =============================================================================

/**
 * Toggles the visibility of the format selection dropdown.
 * Shows or hides dropdown elements by toggling the 'show' class.
 */
function toggleSelect() {
  var divs = document.querySelectorAll(".showable");
  for (var div of divs)
    if (div.classList.contains("show")) div.classList.remove("show");
    else div.classList.add("show");
}

/**
 * Sets the download format and updates the button text.
 *
 * @param {string} newFormat - The format to set ('SVG' or 'PNG')
 */
function setFormat(newFormat) {
  format = newFormat;
  downloadBtn.value = `Download ${format}`;
}

// =============================================================================
// DOWNLOAD FUNCTIONALITY
// =============================================================================

/**
 * Creates and triggers a file download.
 * Generates a temporary anchor element to initiate the download.
 *
 * @param {string} imgURI - The data URI or blob URL of the image to download
 */
function triggerDownload(imgURI) {
  var evt = new MouseEvent("click", {
    view: window,
    bubbles: false,
    cancelable: true,
  });
  var a = document.createElement("a");
  var str = document.getElementById("collegeName").value || "Organization";
  // Clean filename - remove special characters
  var cleanName = str.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_");
  a.setAttribute(
    "download",
    `BUDE_GLOBAL_${cleanName}.${format.toLowerCase()}`
  );
  a.setAttribute("href", imgURI);
  a.setAttribute("target", "_blank");
  a.dispatchEvent(evt);
}

/**
 * Form submission handler for logo download.
 * Handles both SVG (direct blob download) and PNG (canvas conversion) formats.
 * Converts external images to base64 for proper embedding.
 *
 * @listens submit
 * @param {Event} event - The form submission event
 */
document
  .getElementById("downloadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    changeCollegeName();

    // Get the logo image element
    var logoImage = document.getElementById("budeLogo");
    var logoUrl = logoImage ? logoImage.getAttribute("href") : null;
    
    // Convert external image to base64
    async function imageToBase64(url) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        console.error("Failed to convert image:", e);
        return null;
      }
    }

    // Get base64 version of logo
    var base64Logo = null;
    if (logoUrl) {
      base64Logo = await imageToBase64(logoUrl);
    }

    // Clone SVG and replace image href with base64
    var svgClone = svg.cloneNode(true);
    var clonedImage = svgClone.getElementById("budeLogo");
    if (clonedImage && base64Logo) {
      clonedImage.setAttribute("href", base64Logo);
    }

    // Create SVG blob with embedded image
    var svgContent = svgClone.outerHTML;
    var blob = new Blob([svgContent], {
      type: "image/svg+xml;charset=utf-8",
    });
    var blobURL = window.URL.createObjectURL(blob);

    // For SVG format, download directly
    if (format === "SVG") return triggerDownload(blobURL);

    // For PNG format, render to canvas first
    var img = new Image();
    img.onload = function() {
      window.URL.revokeObjectURL(blobURL);
      
      // Set canvas size to match SVG
      canvas.width = 800;
      canvas.height = 480;
      
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      var imageURL = canvas.toDataURL("image/png", 1.0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      triggerDownload(imageURL);
    };
    img.src = blobURL;
  });

// =============================================================================
// REAL-TIME PREVIEW
// =============================================================================

/**
 * Input element for organization name with real-time preview updates.
 * @type {HTMLInputElement}
 */
var keyChange = document.getElementById("collegeName");

/**
 * Event handlers for real-time logo text updates.
 * Updates the logo preview as the user types.
 */
keyChange.oninput = function () {
  changeCollegeName();
};

/**
 * Updates the logo text with the current organization name input value.
 * Called on form submission and during typing for real-time preview.
 */
function changeCollegeName() {
  var collegeName = document.getElementById("collegeName").value;
  var logoNameEl = document.getElementById("logoName");
  if (logoNameEl) {
    // Force uppercase for consistent branding
    logoNameEl.textContent = (collegeName || "Your Organization").toUpperCase();
  }
}

// Initialize with placeholder
document.addEventListener("DOMContentLoaded", function() {
  changeCollegeName();
});
