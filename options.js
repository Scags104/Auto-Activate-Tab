const cardEl = document.getElementById("card");
const enabledEl = document.getElementById("enabled");
const statusEl = document.getElementById("status");
const modeAlwaysEl = document.getElementById("mode-always");
const modeShiftEl = document.getElementById("mode-shift");

function setEnabled(isEnabled) {
  enabledEl.setAttribute("aria-checked", String(isEnabled));
}

function setMode(requireShift) {
  modeAlwaysEl.setAttribute("aria-checked", String(!requireShift));
  modeShiftEl.setAttribute("aria-checked", String(requireShift));
}

function isEnabled() {
  return enabledEl.getAttribute("aria-checked") === "true";
}

function requireShift() {
  return modeShiftEl.getAttribute("aria-checked") === "true";
}

function showStatus(message, isError) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", !!isError);
  if (!isError) {
    setTimeout(() => (statusEl.textContent = ""), 1200);
  }
}

function pulseSignature() {
  cardEl.classList.add("pulsing");
  setTimeout(() => cardEl.classList.remove("pulsing"), 260);
}

function load() {
  chrome.storage.local.get(
    { enabled: true, requireShift: false },
    (result) => {
      if (chrome.runtime.lastError) {
        showStatus("Error loading settings: " + chrome.runtime.lastError.message, true);
        return;
      }
      setEnabled(result.enabled);
      setMode(result.requireShift);
    }
  );
}

function save() {
  chrome.storage.local.set(
    { enabled: isEnabled(), requireShift: requireShift() },
    () => {
      if (chrome.runtime.lastError) {
        showStatus("Error saving: " + chrome.runtime.lastError.message, true);
        return;
      }
      pulseSignature();
      showStatus("Saved.", false);
    }
  );
}

enabledEl.addEventListener("click", () => {
  setEnabled(!isEnabled());
  save();
});

modeAlwaysEl.addEventListener("click", () => {
  setMode(false);
  save();
});

modeShiftEl.addEventListener("click", () => {
  setMode(true);
  save();
});

load();
