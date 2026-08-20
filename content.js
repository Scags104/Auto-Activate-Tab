// Watches for the two click types that open a background tab
// (middle-click, and ctrl/cmd+click) on a link, and reports whether
// Shift was held so the background script can decide whether to
// activate the resulting tab.
(function () {
  function findLink(el) {
    while (el && el !== document.documentElement) {
      if (el.tagName === "A" && el.href) return el;
      el = el.parentElement;
    }
    return null;
  }

  function handle(e) {
    if (!findLink(e.target)) return;

    const isMiddleClick = e.type === "auxclick" && e.button === 1;
    const isCtrlOrCmdClick =
      e.type === "click" && (e.ctrlKey || e.metaKey) && e.button === 0;

    if (!isMiddleClick && !isCtrlOrCmdClick) return;

    chrome.runtime.sendMessage({
      type: "link-click",
      shiftKey: e.shiftKey,
    });
  }

  document.addEventListener("auxclick", handle, true);
  document.addEventListener("click", handle, true);
})();
