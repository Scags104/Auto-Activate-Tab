# Privacy Policy — Auto-Activate New Tabs

**Last updated:** August 2026 (v1.2)

Auto-Activate New Tabs does not collect, store, transmit, or share any user
data of any kind.

## What the extension does

The extension automatically switches focus to a newly opened background tab
(for example, one opened via middle-click or Ctrl/Cmd+click on a link).
Optionally, the user can configure it in the options page to only do this
when the Shift key was also held. All of this happens locally within the
browser.

## Data collection

- No personal data is collected.
- No browsing history or page content is read, logged, or stored.
- No data is sent to any server. The extension makes no network requests.
- No analytics, tracking, or advertising code is included.
- The only data stored is the user's own two settings (see "storage" below),
  which never leaves the local device.

## Permissions

- **`tabs`** — used to detect tab-creation events and to activate (focus)
  newly created background tabs. Not used to read tab content or browsing
  history.

- **`storage`** — used to save the user's two preferences (whether the
  extension is enabled, and whether Shift is required) locally on-device via
  `chrome.storage.local`, so they persist between browser sessions. Nothing
  stored here is transmitted anywhere.

- **Host permission (`<all_urls>`), via a content script** — used only to
  detect, at the moment of a click, whether the Shift key was held during a
  middle-click or Ctrl/Cmd+click on a link. The content script reads only
  the click event's own properties (which mouse button, which modifier keys)
  — it does not read, modify, log, or transmit page content, form data, or
  any other information from the pages visited. This is what lets the
  "Only with Shift" option work on any website, since the extension can't
  know in advance which sites the user will click links on.

## Contact

If you have questions about this privacy policy, please open an issue on
the extension's source repository or contact the developer listed on the
Chrome Web Store listing.
