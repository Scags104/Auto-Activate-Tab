// Fires whenever a new tab is created.
chrome.tabs.onCreated.addListener((tab) => {
  // Only act on tabs that:
  //  - were opened from another tab (openerTabId set) — i.e. a link click,
  //    not something like a new window or an unrelated background tab.
  //  - are not already active.
  if (tab.openerTabId !== undefined && tab.active === false) {
    chrome.tabs.update(tab.id, { active: true });
  }
});
