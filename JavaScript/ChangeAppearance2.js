/*Restricted Use License NEU

This code is provided under the following terms and conditions:

1. You are not allowed to use, copy, modify, merge, publish, distribute, sublicense, or sell copies of this code in any form, modified or unmodified, without express written permission from the author.

2. You are not allowed to use this code for any illegal or unethical purpose.

3. This license applies to all versions of the code previously released, as well as all future versions. Any prior statements made about permission given are hereby revoked.

4. This code is provided "as is", without warranty of any kind, express or implied. The author shall not be liable for any damages arising from the use of this code.

By using this code, you agree to abide by these terms and conditions. Failure to comply with these terms may result in legal action.

For inquiries regarding licensing or permission to use this code in ways not covered by this license, please contact the author at AdjusterConsole@gmail.com.  */



let swapOrNot = false;
let intensityBoost = false;
let blur;
let spread;
let xOffset;
let yOffset;
let xOffset2;
let yOffset2;
let backgroundVar;
let boxshadowVar;

const color1Display = document.getElementById('shad1-picker');
const color2Display = document.getElementById('shad2-picker');
const color3Display = document.getElementById('shad3-picker');
const color4Display = document.getElementById('shad4-picker');
const color1aDisplay = document.getElementById('fl-picker');
const color2aDisplay = document.getElementById('ml-picker');
const color3aDisplay = document.getElementById('md-picker');
const color4aDisplay = document.getElementById('fd-picker');

const baseColorInput2 = document.getElementById('bg2-picker'); //bg pickers
const baseColorInput = document.getElementById('background-picker'); //bg pickers

const intensitySlider = document.getElementById('intensitySlider');
const secondaryIntensitySlider = document.getElementById('secondaryIntensitySlider'); 

const xOffsetDecrementBtn = document.getElementById('xOffsetDecrement');
const xOffsetIncrementBtn = document.getElementById('xOffsetIncrement');

const yOffsetDecrementBtn = document.getElementById('yOffsetDecrement');
const yOffsetIncrementBtn = document.getElementById('yOffsetIncrement');

const blurDecrementBtn = document.getElementById('blurDecrement');
const blurIncrementBtn = document.getElementById('blurIncrement');

const spreadDecrementBtn = document.getElementById('spreadDecrement');
const spreadIncrementBtn = document.getElementById('spreadIncrement');

const shadowToggle = document.getElementById('shadowToggle'); 
const backgroundToggle = document.getElementById('backgroundToggle');

const OutputInner = document.getElementById('OutputInner');
const appearDiv = document.getElementById('appearDiv');

intensitySlider.addEventListener('input', updateColorPair);
secondaryIntensitySlider.addEventListener('input', updateColorPair);

baseColorInput.addEventListener('input', generatePair);
baseColorInput2.addEventListener('input', generatePair2);

shadowToggle.addEventListener('change', updateCSS);
backgroundToggle.addEventListener('change', updateCSS);

xOffsetDecrementBtn.addEventListener('click', () => adjustValue(xOffset, -1));
xOffsetIncrementBtn.addEventListener('click', () => adjustValue(xOffset, 1));

yOffsetDecrementBtn.addEventListener('click', () => adjustValue(yOffset, -1));
yOffsetIncrementBtn.addEventListener('click', () => adjustValue(yOffset, 1));

blurDecrementBtn.addEventListener('click', () => adjustValue(blur, -1));
blurIncrementBtn.addEventListener('click', () => adjustValue(blur, 1));

spreadDecrementBtn.addEventListener('click', () => adjustValue(spread, -1));
spreadIncrementBtn.addEventListener('click', () => adjustValue(spread, 1));

function colorObject() {
  
  this.background = "#2d4252";
  this.accent = "#7c878f";
  this.shadow1 = "#688da6";
  this.shadow2 = "#1c2a35";
  this.shadow3 = "#425e70";
  this.shadow4 = "#0e1315";
  this.username = '';
  this.glow = "#ffffff";
  this.text = "#ffffff";
  this.outline = "#000000";
  this.hover = "#7C878F32";
  this.active = "#7C878F60";
  this.light = "#ffffff";
  this.medlight = "#c3cacf";
  this.meddark = "#a4aaae";
  this.dark = "#6d7174";
  this.lightbackground = "#B6BDC1";
  this.btnboxshadow = getComputedStyle(document.documentElement).getPropertyValue('--button-box-shadow');
  this.btnbackground = getComputedStyle(document.documentElement).getPropertyValue('--button-background');
}

function sanitizeInput(value) {
  const tempDiv = document.createElement("div");
  tempDiv.textContent = value;
  return tempDiv.innerHTML;
}

function getPicker() {
  const colorSet = JSON.parse(localStorage.getItem("colorSet2")) || {};

  colorSet.background = sanitizeInput(document.getElementById("background-picker").value);
  colorSet.accent = sanitizeInput(document.getElementById("accent-picker").value);
  colorSet.shadow1 = sanitizeInput(document.getElementById("shad1-picker").value);
  colorSet.shadow2 = sanitizeInput(document.getElementById("shad2-picker").value);
  colorSet.shadow3 = sanitizeInput(document.getElementById("shad3-picker").value);
  colorSet.shadow4 = sanitizeInput(document.getElementById("shad4-picker").value);
  colorSet.username = sanitizeInput(document.getElementById("userName").value);
  colorSet.glow = sanitizeInput(document.getElementById("nameGlow").value);
  colorSet.text = sanitizeInput(document.getElementById("nameColor").value);
  colorSet.outline = sanitizeInput(document.getElementById("outlineColor").value);
  colorSet.light = sanitizeInput(document.getElementById("fl-picker").value);
  colorSet.medlight = sanitizeInput(document.getElementById("ml-picker").value);
  colorSet.meddark = sanitizeInput(document.getElementById("md-picker").value);
  colorSet.dark = sanitizeInput(document.getElementById("fd-picker").value);
  colorSet.lightbackground = sanitizeInput(document.getElementById("bg2-picker").value);
  colorSet.btnboxshadow = document.getElementById("OutputInner").style.boxShadow;
  colorSet.btnbackground = document.getElementById("OutputInner").style.background;
  localStorage.setItem("colorSet2", JSON.stringify(colorSet));
  return colorSet;
}

function setPicker() {
  const colorSet = JSON.parse(localStorage.getItem("colorSet2")) || {};

  document.getElementById("background-picker").value = colorSet.background || '';
  document.getElementById("accent-picker").value = colorSet.accent || '';
  document.getElementById("shad1-picker").value = colorSet.shadow1 || '';
  document.getElementById("shad2-picker").value = colorSet.shadow2 || '';
  document.getElementById("shad3-picker").value = colorSet.shadow3 || '';
  document.getElementById("shad4-picker").value = colorSet.shadow4 || '';
  if (colorSet.username != null) {
    document.getElementById("userName").value = colorSet.username;
  }
  document.getElementById("nameGlow").value = colorSet.glow || '';
  document.getElementById("nameColor").value = colorSet.text || '';
  document.getElementById("outlineColor").value = colorSet.outline || '';
  document.getElementById("fl-picker").value = colorSet.light || '';
  document.getElementById("ml-picker").value = colorSet.medlight || '';
  document.getElementById("md-picker").value = colorSet.meddark || '';
  document.getElementById("fd-picker").value = colorSet.dark || '';
  document.getElementById("bg2-picker").value = colorSet.lightbackground || '';
  document.getElementById("OutputInner").style.boxShadow = colorSet.btnboxshadow;
  document.getElementById("OutputInner").style.background = colorSet.btnbackground;
}

function setProperty() {
  const colorSet = JSON.parse(localStorage.getItem("colorSet2")) || {};

  document.documentElement.style.setProperty('--my-background-color', colorSet.background || '');
  document.documentElement.style.setProperty('--my-accent-color', colorSet.accent || '');
  document.documentElement.style.setProperty('--my-shadow-color1', colorSet.shadow1 || '');
  document.documentElement.style.setProperty('--my-shadow-color2', colorSet.shadow2 || '');
  document.documentElement.style.setProperty('--my-shadow-color3', colorSet.shadow3 || '');
  document.documentElement.style.setProperty('--my-shadow-color4', colorSet.shadow4 || '');
  document.documentElement.style.setProperty('--my-glow-color', colorSet.glow || '');
  document.documentElement.style.setProperty('--glow-txt-color', colorSet.text || '');
  document.documentElement.style.setProperty('--glow-outline-color', colorSet.outline || '');
  document.documentElement.style.setProperty('--hover-color', colorSet.hover || '');
  document.documentElement.style.setProperty('--active-color', colorSet.active || '');
  document.documentElement.style.setProperty('--fancy-light', colorSet.light || '');
  document.documentElement.style.setProperty('--fancy-medlight', colorSet.medlight || '');
  document.documentElement.style.setProperty('--fancy-meddark', colorSet.meddark || '');
  document.documentElement.style.setProperty('--fancy-dark', colorSet.dark || '');
  document.documentElement.style.setProperty('--fancy-background', colorSet.lightbackground || '');
  document.documentElement.style.setProperty('--button-box-shadow', colorSet.btnboxshadow || '');
  document.documentElement.style.setProperty('--button-background', colorSet.btnbackground || '');

  if (colorSet.username != null) {
    document.getElementById("userName").value = colorSet.username;
    document.getElementById("glowDiv").innerHTML = sanitizeInput(colorSet.username);
  }
}

function setColor(colors) {
  const colorSet = new colorObject();

  switch (colors) {
    case "default":
      Object.assign(colorSet, {
        background: "#2d4252",
        accent: "#7c878f",
        shadow1: "#68869c",
        shadow2: "#1c2a35",
        shadow3: "#425e70",
        shadow4: "#0e1315",
        glow: "#ffffff",
        text: "#ffffff",
        outline: "#000000",
        hover: "#7C878F32",
        active: "#7C878F60",
        light: "#ffffff",
        medlight: "#c3cacf",
        meddark: "#a4aaae",
        dark: "#6d7174",
        lightbackground: "#B6BDC1"
      });
      break;
    case "grey":
      Object.assign(colorSet, {
        background: "#4f4f4f",
        accent: "#707070",
        shadow1: "#7e7e7e",
        shadow2: "#555555",
        shadow3: "#474747",
        shadow4: "#202020",
        glow: "#ffffff",
        text: "#000000",
        outline: "#ffffff",
        hover: "#70707032",
        active: "#70707060",
        light: "#ffffff",
        medlight: "#cccccc",
        meddark: "#acacac",
        dark: "#737373",
        lightbackground: "#bfbfbf"
      });
      break;
    case "red":
      Object.assign(colorSet, {
        background: "#622823",
        accent: "#81524E",
        shadow1: "#9d4038",
        shadow2: "#692b25",
        shadow3: "#582420",
        shadow4: "#27100e",
        glow: "#ffffff",
        text: "#000000",
        outline: "#ffffff",
        hover: "#81524E32",
        active: "#81524E60",
        light: "#ffffff",
        medlight: "#ffdada",
        meddark: "#e6b8b8",
        dark: "#997a7a",
        lightbackground: "#ffcccc"
      });
      break;
    case "green":
      Object.assign(colorSet, {
        background: "#2f9844",
        accent: "#58ac69",
        shadow1: "#4bf36d",
        shadow2: "#32a349",
        shadow3: "#2a893d",
        shadow4: "#133d1b",
        glow: "#E3FFE4",
        text: "#000000",
        outline: "#FFFFFF",
        hover: "#58ac6932",
        active: "#58ac6960",
        light: "#ffffff",
        medlight: "#e3ffe4",
        meddark: "#bfdac0",
        dark: "#7f9180",
        lightbackground: "#c5edc6"
      });
      break;
    case "pink":
      Object.assign(colorSet, {
        background: "#fbc1fa",
        accent: "#FF52FC",
        shadow1: "#FFE5FF",
        shadow2: "#FFDBFE",
        shadow3: "#DEABDD",
        shadow4: "#C392C2",
        glow: "#FFFFFF",
        text: "#FFFFFF",
        outline: "#000000",
        hover: "#FFDBFE32",
        active: "#FFDBFE60",
        light: "#FFE5FF",
        medlight: "#FFDBFE",
        meddark: "#DEABDD",
        dark: "#C392C2",
        lightbackground: "#fbc1fa"
      });
      break;
   case "ACDF":
      Object.assign(colorSet, {
        background: "#0D274A",
        accent: "#1D4D8B",
        shadow1: "#1D4D8B",
        shadow2: "#153E75",
        shadow3: "#08172B",
        shadow4: "#030912",
        username: '',
        glow: "#ffffff",
        text: "#ffffff",
        outline: "#000000",
        hover: "#7C878F32",
        active: "#7C878F60",
        light: "#b8def5",
        medlight: "#aed1e5",
        meddark: "#86a1b1",
        dark: "#728d9d",
        lightbackground: "#92b1c3"
      });
      break;
  }

  localStorage.setItem("colorSet2", JSON.stringify(colorSet));
  setPicker();
  setProperty();
}

function personalize() {
  MENU();
  document.getElementById("appearDiv").style.display = "inline-block";
}

function exitColor() {
  document.getElementById("appearDiv").style.display = "none";
  location.reload();
}

function saveColors() {
  getPicker();
  setProperty();
  exitColor();
}

function resetColors() {
  if (localStorage.getItem("colorSet2") === null) {
    setColor("default");
  } else {
    const colorSet = JSON.parse(localStorage.getItem("colorSet2"));
    setPicker();
    setProperty();
  }
}

function showPresets() {
  const presets = document.getElementById("presets");
  const shadControls = document.getElementById("shadControls");
  if (presets.classList.contains('hide')) {
    presets.classList.remove('hide');
    shadControls.classList.add('hide');
  } else {
    presets.classList.add('hide');
    shadControls.classList.remove('hide');
  }
}

function updateCSS() {
  const xOffset2 = xOffset * -1;
  const yOffset2 = yOffset * -1;

  boxshadowVar = shadowToggle.checked ?
    `\n${xOffset}px ${yOffset}px ${blur}px ${spread}px ${color2Display.value},\n${xOffset2}px ${yOffset2}px ${blur}px ${spread}px ${color1Display.value}` :
    `\n${xOffset}px ${yOffset}px ${blur}px ${spread}px ${color2Display.value}`;

  if (backgroundToggle.checked) {
    backgroundVar = `linear-gradient(145deg, ${color4Display.value}, ${color3Display.value})`;
  } else {
    backgroundVar = baseColorInput.value;
  }  

  OutputInner.style.boxShadow = boxshadowVar;
  OutputInner.style.background = backgroundVar;
}

function adjustValue(input, increment) {
  input = input + increment;
  updateCSS();
}

const END_INTENSITY = 80;

baseColorInput.addEventListener('input', () => {
  updateColorPair2();
  updateColorPair();
  updateCSS();
});

baseColorInput2.addEventListener('input', () => {
  updateColorPair2();
  updateColorPair();
  updateCSS();
});

generatePair();
generatePair2();
updateCSS();

function generatePair2() {
    const baseColor2 = baseColorInput2.value.trim();
  if (!isValidHexColor(baseColor2)) {
    return;
  }
  const intensity = intensitySlider.value;
  const secondaryIntensity = secondaryIntensitySlider.value;
  const [color1a, color2a, color3a, color4a] = generateColorPair(baseColor2, intensity, secondaryIntensity);

  color1aDisplay.value = color1a;
  color2aDisplay.value = color2a;
  color3aDisplay.value = color3a;
  color4aDisplay.value = color4a;

  const color1aRGB = hexToRgb(color1a);
  const color2aRGB = hexToRgb(color2a);
  const color3aRGB = hexToRgb(color3a);
  const color4aRGB = hexToRgb(color4a);
}

function generatePair() {
  const baseColor = baseColorInput.value.trim();
  if (!isValidHexColor(baseColor)) {
    return;
  }

  const intensity = intensitySlider.value;
  const secondaryIntensity = secondaryIntensitySlider.value;
  const [color1, color2, color3, color4] = generateColorPair(baseColor, intensity, secondaryIntensity);
  color1Display.value = color1;
  color2Display.value = color2;
  color3Display.value = color3;
  color4Display.value = color4;

  appearDiv.style.backgroundColor = baseColor;

  const color1RGB = hexToRgb(color1);
  const color2RGB = hexToRgb(color2);
  const color3RGB = hexToRgb(color3);
  const color4RGB = hexToRgb(color4);

  updateCSS();
}

function updateColorPair() {
  generatePair();
  generatePair2();
  updateCSS();
}

function updateColorPair2() {
  generatePair2();
  generatePair();
  updateCSS();
}

function generateColorPair(baseColor, intensity, secondaryIntensity) {
  let adjustment = calculateAdjustment(intensity);
  let color1RGB = adjustColor(hexToRgb(baseColor), adjustment);
  let color2RGB = adjustColor(hexToRgb(baseColor), -adjustment);
  let color3RGB = adjustColor(hexToRgb(baseColor), adjustment / 2);
  let color4RGB = adjustColor(hexToRgb(baseColor), -adjustment / 2);


  let color1 = rgbToHex(color1RGB);
  let color2 = rgbToHex(color2RGB);

  let [adjustedColor3, adjustedColor4] = adjustSecondLayer(color3RGB, color4RGB, color1RGB, color2RGB, secondaryIntensity);

  let color3 = rgbToHex(adjustedColor3);
  let color4 = rgbToHex(adjustedColor4);

  if (swapOrNot) {
    return [color1, color2, color4, color3];
  } else {
    return [color1, color2, color3, color4];
  }
}

function adjustSecondLayer(color3RGB, color4RGB, color1RGB, color2RGB, secondaryIntensity) {
  const factor = (secondaryIntensity - 50) / 50; // Range from -1 to 1
  let adjustedColor3, adjustedColor4;

  if (factor < 0) {
    adjustedColor3 = interpolateColor(color3RGB, color1RGB, -factor); // Towards color1
    adjustedColor4 = interpolateColor(color4RGB, color2RGB, -factor); // Towards color2
  } else {
    adjustedColor3 = interpolateColor(color3RGB, color4RGB, factor); // Towards color4
    adjustedColor4 = interpolateColor(color4RGB, color3RGB, factor); // Towards color3
  }
  return [adjustedColor3, adjustedColor4];
}

function interpolateColor(colorA, colorB, factor) {
  let interpolatedColor = {
    r: Math.round(colorA.r + (colorB.r - colorA.r) * factor),
    g: Math.round(colorA.g + (colorB.g - colorA.g) * factor),
    b: Math.round(colorA.b + (colorB.b - colorA.b) * factor)
  };
  return interpolatedColor;
}

function calculateAdjustment(intensity) {
  let END_INTENSITY_VAL = END_INTENSITY;
  if (intensityBoost) { END_INTENSITY_VAL = END_INTENSITY * 2; }

  return Math.round((intensity / 100) * END_INTENSITY_VAL);
}

function isValidHexColor(hex) {
  return /^#[0-9A-F]{6}$/i.test(hex);
}

function hexToRgb(hex) {
  hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function adjustColor(rgb, adjustment) {
  let adjusted = {
    r: clamp(rgb.r + adjustment),
    g: clamp(rgb.g + adjustment),
    b: clamp(rgb.b + adjustment)
  };
  return adjusted;
}

function clamp(value) {
  return Math.min(Math.max(0, value), 255);
}

function rgbToHex(rgb) {
  return "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
}

function updateHexInput() {
  const r = parseInt(redInput.value);
  const g = parseInt(greenInput.value);
  const b = parseInt(blueInput.value);
  if (isValidRGBValue(r) && isValidRGBValue(g) && isValidRGBValue(b)) {
    const hex = rgbToHex({ r, g, b });
    baseColorInput.value = hex;
    generatePair();
  }
}

function updateHexInput2() {
  const r = parseInt(redInput2.value);
  const g = parseInt(greenInput2.value);
  const b = parseInt(blueInput2.value);
  if (isValidRGBValue(r) && isValidRGBValue(g) && isValidRGBValue(b)) {
    const hex = rgbToHex({ r, g, b });
    baseColorInput2.value = hex;
    generatePair2();
  }
}

function isValidRGBValue(value) {
  return !isNaN(value) && value >= 0 && value <= 255;
}

function swapInners() {
  if (swapOrNot) {
    swapOrNot = false;
  } else {
    swapOrNot = true;
  }
  updateColorPair();
  updateColorPair2();
  updateCSS();
}

function intensityMod() {
  if (intensityBoost) {
    intensityBoost = false;
  } else {
    intensityBoost = true;
  }
}

function resetToDefaults() {
  const defaultBaseColor = '#0D274A';
  const defaultIntensity = 60;
  const defaultSecondaryIntensity = 50;
  const defaultXOffset = 5;
  const defaultYOffset = 5;
  const defaultBlur = 18;
  const defaultSpread = 2;
  swapOrNot = false;
  intensityBoost = false;
  baseColorInput.value = defaultBaseColor;
  intensitySlider.value = defaultIntensity;
  secondaryIntensitySlider.value = defaultSecondaryIntensity;
  xOffset = defaultXOffset;
  yOffset = defaultYOffset;
  blur = defaultBlur;
  spread = defaultSpread;
  generatePair();
  updateCSS();
}

function saveToLocalStorage() {
  const values = {
    baseColor: baseColorInput.value,
    intensity: intensitySlider.value,
    secondaryIntensity: secondaryIntensitySlider.value,
    xOffset: xOffset,
    yOffset: yOffset,
    blur: blur,
    spread: spread
  };
  localStorage.setItem('colorValues', JSON.stringify(values));
}

function loadFromLocalStorage() {
  const savedValues = JSON.parse(localStorage.getItem('colorValues'));

  if (savedValues) {
    baseColorInput.value = savedValues.baseColor;
    intensitySlider.value = savedValues.intensity;
    secondaryIntensitySlider.value = savedValues.secondaryIntensity;
    xOffset = savedValues.xOffset;
    yOffset = savedValues.yOffset;
    blur = savedValues.blur;
    spread = savedValues.spread;
    generatePair();
    updateCSS();
  }
}

function clearLocalStorage() {
  localStorage.removeItem('colorValues');
}

const switchButton = document.getElementById('switchButton');
switchButton.addEventListener('click', switchBase);

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetToDefaults);

const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', saveToLocalStorage);

const loadButton = document.getElementById('loadButton');
loadButton.addEventListener('click', loadFromLocalStorage);

const swapButton = document.getElementById('swapButton');
swapButton.addEventListener('click', swapInners);

const boostButton = document.getElementById('boostButton');
boostButton.addEventListener('click', intensityMod);


function switchBase() {
  let currentBaseColor = baseColorInput.value.trim();
  let currentBaseColor2 = baseColorInput2.value.trim();
  baseColorInput.value = currentBaseColor2.toUpperCase();
  baseColorInput2.value = currentBaseColor.toUpperCase();
  generatePair();
  generatePair2();
}

window.addEventListener('DOMContentLoaded', () => {
  resetToDefaults();
});