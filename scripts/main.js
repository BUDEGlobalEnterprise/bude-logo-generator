/**
 * BUDE Logo Generator - Main Application Script
 *
 * This script handles the logo generation, theme toggling, and download
 * functionality for the BUDE Global Logo Generator.
 *
 * @author BUDE Global Enterprise
 * @version 1.0.0
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

/** @type {string} Current background color mode ('black' or 'white') */
var color = "black";

/** @type {string} Current download format ('SVG' or 'PNG') */
var format = "SVG";

// =============================================================================
// THEME TOGGLE
// =============================================================================

/**
 * Theme toggle event listener.
 * Switches between dark and light modes, updating all relevant SVG
 * elements and UI components.
 *
 * @listens click
 * @param {MouseEvent} evt - The click event object
 */
document
  .getElementById("toggleColor")
  .addEventListener("click", function (evt) {
    var cardTemplate = document.querySelector(".card");
    var budeGlobal = document.getElementById("BudeGlobal");
    var logoName = document.getElementById("logoName");
    var topLeft = document.getElementById("topLeft");
    var bottomRight = document.getElementById("bottomRight");

    // DARK MODE
    if (evt.target.innerHTML === "Switch to Dark") {
      svg.style.fill = "black";
      cardTemplate.style.backgroundColor = "#191919";
      cardTemplate.firstElementChild.style.color = "white";
      if (budeGlobal) budeGlobal.style.fill = "white";
      logoName.style.fill = "white";
      topLeft.style.fill = "white";
      bottomRight.style.fill = "white";
      topRight.style.fill = "#C8C7C7";
      bottomLeft.style.fill = "#C8C7C7";
      evt.target.innerHTML = "Switch to Light";
      document.getElementById("toggleColor").classList.remove("btn-dark");
      document.getElementById("toggleColor").classList.add("btn-light");
      document.getElementById("previewText").style.color = "white";
    }
    // LIGHT MODE
    else {
      svg.style.fill = "white";
      cardTemplate.style.backgroundColor = "white";
      cardTemplate.firstElementChild.style.color = "#6c757d";
      if (budeGlobal) budeGlobal.style.fill = "black";
      topLeft.style.fill = "black";
      logoName.style.fill = "black";
      bottomRight.style.fill = "black";
      topRight.style.fill = "#22B34F";
      bottomLeft.style.fill = "#22B34F";
      evt.target.innerHTML = "Switch to Dark";
      document.getElementById("toggleColor").classList.remove("btn-light");
      document.getElementById("toggleColor").classList.add("btn-dark");
      document.getElementById("previewText").style.color = "black";
    }
    color = svg.style.fill;
  });

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
  var str = document.getElementById("collegeName").value;
  a.setAttribute(
    "download",
    "BUDE_Global_".concat(str).concat(`.${format.toLowerCase()}`)
  );
  a.setAttribute("href", imgURI);
  a.setAttribute("target", "_blank");
  a.dispatchEvent(evt);
}

/**
 * Form submission handler for logo download.
 * Handles both SVG (direct blob download) and PNG (canvas conversion) formats.
 *
 * @listens submit
 * @param {Event} event - The form submission event
 */
document
  .getElementById("downloadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    changeCollegeName();

    // Create SVG blob with proper dimensions
    var openTag = `<svg id="svgLogo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2028 594" width="2028" height="594">`;
    var closeTag = "</svg>";
    var blob = new Blob([`${openTag}${svg.innerHTML}${closeTag}`], {
      type: "image/svg+xml",
    });
    var blobURL = window.URL.createObjectURL(blob);

    // For SVG format, download directly
    if (format === "SVG") return triggerDownload(blobURL);

    // For PNG format, render to canvas first
    image.addEventListener("load", function gotImage() {
      window.URL.revokeObjectURL(blobURL);
      image.removeEventListener("load", gotImage);
      var ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      var imageURL = canvas.toDataURL(`image/${format.toLowerCase()}`);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      triggerDownload(imageURL);
    });
    image.setAttribute("src", blobURL);
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
keyChange.onkeyup = keyChange.onkeypress = function () {
  changeCollegeName();
};

/**
 * Updates the logo text with the current organization name input value.
 * Called on form submission and during typing for real-time preview.
 */
function changeCollegeName() {
  var collegeName = document.getElementById("collegeName").value;
  document.getElementById("logoName").textContent = collegeName;
}
