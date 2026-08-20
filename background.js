// Tracks whether Shift was held during the most recent link click on each
// tab, so that when a new background tab appears we can check it if the
// user has set the extension to only activate on Shift+click.
const recentClicks = new Map(); // openerTabId -> { shiftKey, time }
const CLICK_WINDOW_MS = 3000;

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg?.type === "link-click" && sender.tab?.id != null) {
    recentClicks.set(sender.tab.id, {
      shiftKey: !!msg.shiftKey,
      time: Date.now(),
    });
  }
});

function cleanupOldClicks() {
  const now = Date.now();
  for (const [id, rec] of recentClicks) {
    if (now - rec.time > CLICK_WINDOW_MS) recentClicks.delete(id);
  }
}

chrome.tabs.onCreated.addListener(async (tab) => {
  // Only consider tabs opened from a link click that landed in the background.
  if (tab.openerTabId === undefined || tab.active) return;

  cleanupOldClicks();

  const { enabled = true, requireShift = false } = await chrome.storage.local.get(
    { enabled: true, requireShift: false }
  );

  if (!enabled) return;

  // "Always" mode: activate every new background tab (original v1.0 behavior).
  if (!requireShift) {
    chrome.tabs.update(tab.id, { active: true });
    return;
  }

  // "Only with Shift" mode: only activate if Shift was held during the click.
  const rec = recentClicks.get(tab.openerTabId);
  recentClicks.delete(tab.openerTabId);

  if (rec?.shiftKey) {
    chrome.tabs.update(tab.id, { active: true });
  }
});
