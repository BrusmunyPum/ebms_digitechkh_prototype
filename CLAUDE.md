# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A **static HTML/CSS/JS prototype** of DIGITECHKH's Business Management System (BMS) — sales, purchasing, stock, reporting and settings, entirely in Khmer.

There is no build system, no `package.json`, no bundler, no tests, and no backend. Pages are plain HTML files opened directly in a browser, styled by the Tailwind Play CDN and a hand-written `custom.css`.

There is no `docs/` directory anymore (it was removed). Business/system design intent now lives in `documentation/` — see [Documentation suite](#documentation-suite-documentation) below.

## Repository is mid-rebuild — two trees, don't confuse them

- **`frontend/`** — the live rebuild, organised **by role** rather than by module. `index.html` redirects to `roles/00-auth/login.html`. Built so far:
  ```
  frontend/
  ├── shared/
  │   ├── assets/                     logos, favicons
  │   ├── scripts/ui-components.js    (unchanged copy of the old runtime)
  │   ├── scripts/portal.js           sidebar renderer + date picker + mobile drawer + ⋮ menu
  │   ├── styles/custom.css           (unchanged copy of the old stylesheet)
  │   └── styles/portal.css           ID-scoped type scale + A4 print rules
  └── roles/03-sales-manager/         Sales Manager portal (5 pages) — one folder per role, 00–12 + external-portals
      ├── data.js                     the role's projection of the shared store (roles 03 and 04)
      ├── dashboard.html
      ├── approvals/{approvals,view-approval}.html
      ├── pipeline/pipeline.html
      └── reports/reports.html
  ```
  Other roles get their own `roles/NN-<role>/` folder alongside it.
- **`frontend_old_admin_backup/`** — the previous, fully-built prototype (12 role portals, ~56 pages) that `documentation/`'s technical specs describe and link to. Its `src/pages/` tree and full `src/scripts/` runtime (`sidebar.js`, `ui-components.js`, `action-tracker.js`, `main.js`) are the source of the layout/component patterns described below. Treat it as a **read-only reference** — copy patterns out of it, don't edit it in place. Note `sidebar.js`, `action-tracker.js` and `main.js` were never carried into `frontend/`; `portal.js` replaces the parts that were needed.

## Running it

```bash
open frontend/roles/03-sales-manager/dashboard.html   # the Sales Manager portal
open frontend_old_admin_backup/index.html             # the old, fully-built prototype — still browsable
python3 -m http.server 8000 --directory frontend      # or serve either tree, then open localhost:8000
```

`frontend/index.html` redirects to the login page (`roles/00-auth/login.html`).

No build, lint, or test commands exist. Verification is visual: open the page in a browser.

## How a page in `frontend/roles/` is assembled

Unlike the backup (where every page carried its own ~153-line `<aside>` copy), these pages **generate the sidebar from one source**:

- `<body>` carries `id="smPortal"` (scopes `portal.css`), `data-role-root` (`.` for a page at the role root, `..` for one in a subfolder) and `data-active` (which nav item to highlight).
- The page contains only `<div id="sidebarHost"></div>`; `renderPortalSidebar()` in `portal.js` replaces it, building nav hrefs from `data-role-root`. Change the nav in `portal.js` and every page follows — there are no copies to keep in sync.
- `portal.js` also provides `renderDateRangePicker(hostId)` (emits the GEMINI.md §3 markup, so it is identical everywhere by construction), `toggleRowActionMenu()` for the `⋮` menus, and the mobile drawer.
- Script order on a page that uses the shared store (**roles 03 Sales Manager and 04 Sales Executive so far**): `ui-components.js` → `shared/data/seed.js` → `status-meta.js` → `store.js` → the role's `data.js` → `portal.js` → the page's own inline `<script>`. Roles not yet migrated still use `ui-components.js` → own `data.js` → `portal.js` with their own `sessionStorage`/`localStorage` stores (see `documentation/v2/22-implementation-roadmap.md` for the migration order).
- **Shared store (`bms_store_v2` in `localStorage`)**: `seed.js` builds the one canonical dataset (dates relative to today), `store.js` is the only code that reads/writes it and exposes `BMS_STORE.actions.*` (state transitions checked against `documentation/v2/15-approval-state-machine.md`, audit trail, notifications per doc 16). A role's `data.js` exposes only whitelisted projections (`listQuotes()`, `getCustomer()` …) and bound actions (`seActions`, `smActions`); pages never read the store directly or set `status` themselves. Status labels/colours come from `STATUS_META` (`statusBadge(code)`), Khmer terms from `documentation/v2/19-khmer-glossary.md`.
- A page re-renders when another tab changes the store by setting `window.onStoreChanged = render`; `portal.js` already refreshes the sidebar badges and the notification bell. The login page has a «កំណត់ទិន្នន័យគំរូឡើងវិញ» button. **Serve over HTTP** (`python3 -m http.server 8000 --directory frontend`) — `file://` `localStorage` is unreliable.
- Rejecting or voiding needs a reason: use `showReasonPrompt()` (in `ui-components.js`), not a bare confirm.
- All figures come from the store; nothing numeric is hard-coded in the markup.

## Mandatory project standards

Two files define non-negotiable rules and **must be read before changing any page**:

- [GEMINI.md](GEMINI.md) — the authoritative standards document (13 rules)
- [.ai/ui-rules.md](.ai/ui-rules.md) — an earlier, overlapping subset

Both files still refer to paths from the old layout (`frontend/src/pages/`, `frontend/src/styles/custom.css` — now `frontend_old_admin_backup/src/...`). The paths are stale; the rules themselves are not — apply them to whatever gets built next under `frontend/`.

Key rules, condensed (the source files are authoritative):

| Rule | Requirement |
|---|---|
| Language | **100% pure Khmer** in all UI text *and in all explanatory replies to the user*. No mixed English words, none in parentheses. |
| Numerals | Always Arabic numerals (`0-9`), never Khmer numerals — dates, money, codes, phone, percentages, quantities. |
| Header alignment | Sidebar brand block and content `<header>` are both exactly `h-[72px] px-6 flex-shrink-0` so the divider line runs straight across. |
| No native UI | Never `<select>`, `window.alert()`, `window.confirm()`, or native tooltips. Use the custom dropdown, `showToast()`, `showCustomConfirm()`. |
| No modals for CRUD | Create / Edit / View Detail must be **dedicated full pages**, never dialogs. |
| Back button | Icon-only, byte-identical across every sub-page (see GEMINI.md §5 for the exact markup). No text label, no divider. |
| Full width | `<main>` content uses `w-full`. Never `max-w-* mx-auto`. |
| Table actions | A single `⋮` button opening a floating action menu — never a row of inline buttons. |
| Typography | `Kantumruy Pro`; headings `font-semibold`, table rows and list names `font-medium`; avoid `text-slate-900/800` in tables, prefer `text-slate-700/600`. |
| Date range filter | Every date filter must be byte-identical to the one in `invoice.html` (see GEMINI.md §3 for markup and function names). |
| Document tables | No "discount" column. Financial summary order: subtotal → down payment → special discount → VAT 10% → grand total. |
| Printing | Official documents print A4-clean via `@media print`; hide sidebar/header/buttons, `page-break-inside: avoid` on rows and signature blocks. |

## Layout of the pages (reference: `frontend_old_admin_backup/src/pages/`)

This describes the backup tree, not the current (empty) `frontend/`. It's the pattern to follow when building new pages.

The admin tree is numbered to match the sidebar's workflow order:

```
1-login/  2-home/  3-sales/  4-buy/  5-stock/  6-reports/  7-settings/
```

Each module has numbered feature subfolders (`3-sales/1-invoice/`, `3-sales/2-quote/`, …), and each feature subfolder holds up to four pages: `[feature].html` (list), `create-[feature].html`, `edit-[feature].html`, `view-[feature].html`. Never put a page loose in a module root.

Beyond the admin tree, the backup also has `8-super-admin/` (super-admin/multi-tenant pages) and `9-portals/<role>/` — one subfolder per non-admin role (`manager`, `accountant`, `sales-staff`, `purchase-staff`, `inventory-staff`, `cashier`, `driver`, `hr-staff`, `supplier`, `customer` — 12 roles total including admin and super-admin). `documentation/`'s role-by-role specs (see below) describe these portals in full and link directly into this tree.

`pages/empty.html` is a placeholder whose title/subtitle/icon are filled in at runtime by `setActiveNavItem()` from the `BMS_NAV_ITEMS` table.

## Architecture: how a page is assembled (reference: `frontend_old_admin_backup/`)

Every page is a **self-contained document** — there are no includes or templates. A typical page contains, inline:

1. The Tailwind Play CDN `<script>` plus an inline `tailwind.config` defining the brand palette (`primary: #24692D`, `primary-dark: #1b5223`, `btn-navy: #16255c`, …)
2. Google Fonts (Kantumruy Pro) + Font Awesome 6.4
3. A link to `styles/custom.css`
4. A ~153-line `<aside>` sidebar, copied verbatim into the page
5. A `<header class="... h-[72px] ...">` with title, subtitle, search, bell icon and avatar
6. Page content, with hard-coded mock data in the markup
7. A page-local `<script>` for that page's behaviour
8. `<script src=".../ui-components.js">` then `<script src=".../sidebar.js">` at the end of `<body>`

### Shared runtime layer (`frontend_old_admin_backup/src/scripts/`)

These are classic scripts declaring globals — no modules, no imports. Everything is called from `onclick=` attributes in the HTML. **Only `ui-components.js` and `custom.css` made it into the live `frontend/shared/`** (byte-identical copies); `sidebar.js`, `action-tracker.js` and `main.js` below currently exist only here. If new pages under `frontend/` need the sidebar, nav state, profile drawer or notification flyout, that script has to be brought over (or rebuilt) first.

- **`ui-components.js`** — `showToast()`, `showCustomConfirm()` (Promise-based), the floating dropdown engine (`openFloatingDropdown` / `closeFloatingDropdown` / `closeAllFloatingDropdowns`), custom select/customer/product pickers, and the single-date picker (`initSingleDatePicker`, `renderSingleDatePickerGrid`, …). It installs global `click`, `scroll`, `resize` and `keydown` listeners to close popovers.
- **`sidebar.js`** — `BMS_NAV_ITEMS` (nav id → Khmer title, subtitle, icon, parent menu), `toggleMenu()`, `setActiveNavItem()`, the user-profile dropdown, the global notification flyout, the change-password modal, and the mobile drawer. It self-initialises on load.
- **`action-tracker.js`** — **dead file. No page loads it; do not edit it.** The live `window.BMSActionTracker` is a second, near-identical copy inlined at the bottom of `ui-components.js` (guarded by `if (window.BMSActionTracker) return;`). Edit that copy. It is an in-memory demo activity feed that resets on refresh; `showToast()` auto-records into it when the message matches Khmer action keywords (`បាន|រក្សាទុក|អនុម័ត|…`).
- **`main.js`** — nearly empty leftover; not a real entry point.

Only `ui-components.js` and `sidebar.js` are ever loaded by a page, in that order. Anything else in `scripts/` is unreferenced.

### Things `sidebar.js` injects at runtime — do not hand-write them into pages

`initUserProfileMenu()`, `initGlobalNotifications()` and `initMobileSidebarDrawer()` find existing elements by heuristic and build the rest of the DOM themselves:

- The **user profile drawer** (`#bmsUserProfileDrawer`) — a full-height slide-over on the right edge, plus its backdrop `#bmsProfileBackdrop`. Both are appended to `<body>`, not to the header, so no header stacking context can clip them. Any `header button img.rounded-full` (or an avatar whose `alt` mentions Avatar / អ្នកប្រើប្រាស់) becomes its trigger. It is a `<div>` on purpose: `custom.css` applies `aside { background: #1b5223 !important }` and an off-canvas `aside` transform below 1024px, which would wreck it. Controlled by `openUserProfileDrawer()` / `closeUserProfileDrawer()` / `toggleUserProfileDrawer()`; goes full-screen under 640px.
- The **notification flyout** (`#bmsNotificationFlyout`) is created next to any `header i.fa-bell`. Two tabs — the BMSActionTracker timeline and a mock notification feed (`BMS_NOTIFICATIONS` + `buildNotifRow()` in `sidebar.js`) — plus a mark-all-read action. Its tab classes live on `BMSActionTracker.TAB_ACTIVE` / `.TAB_INACTIVE` so the initial markup and `switchTab()` cannot drift apart.
- The **mobile hamburger, drawer backdrop and sidebar close button** are injected automatically. The hamburger is deliberately *skipped* on pages whose header already contains the standard back button (`a i.fa-arrow-left`).

Consequence: changing the header's avatar or bell markup can silently break these features. Keep the recognisable hooks.

`getPagesRelativePath(target)` computes `../` depth from the current URL so injected links work from any nesting level. Use it for any link generated in JS.

### Active nav state

`setActiveNavItem(id)` fully derives the sidebar's active item, expanded parent menu and chevron rotation from `data-nav` attributes. **The active-state classes hand-written into each page's sidebar copy are redundant** — they are the reason the 56 sidebar copies are not byte-identical. Prefer letting the script own active state.

## Known duplication — check before editing (reference: `frontend_old_admin_backup/`)

There is no shared layout, so single logical changes fan out across many files. Before a "small" edit to the backup tree — or before copying its patterns into `frontend/` at scale — know the blast radius:

| Duplicated thing | Copies |
|---|---|
| The `<aside>` sidebar (~153 lines) | 56 pages |
| Inline `tailwind.config` brand palette | 57 pages |
| Tailwind Play CDN `<script>` | 57 pages |
| Date-range picker markup + JS (`toggleDatePicker`, `renderCalendarGrid`, …) | 17 pages |
| Hot-linked Unsplash avatar `photo-1494790108377…` | 56 pages |
| `onclick=` handlers in markup | ~1,300 |

When asked to change navigation, brand colour, the date picker or the header, **apply it to every copy** (a scripted `sed`/`ripgrep` pass is usually right) or explicitly propose extracting it into a shared script first.

## `custom.css` gotchas

`frontend/shared/styles/custom.css` (~2,700 lines; identical copy also at `frontend_old_admin_backup/src/styles/custom.css`) does more than add classes:

- It **overrides Tailwind's type scale globally with `!important`** — `.text-xs` renders at 14.5px, `.text-sm` at 15.5px, `.text-base` at 16.5px, and matching `[class*="text-xs"]` catches arbitrary values too. Tailwind size class names therefore do **not** mean their usual sizes; never debug a font-size problem without checking here first. Consequence: a component built from `text-xs` titles over `text-[11px]` subtitles renders both at the same size and loses its hierarchy. To restore hierarchy in one component without touching the global scale, add ID-scoped rules (higher specificity + `!important`) — see the `#bmsUserProfileDrawer .pd-*` block at the end of the file for the pattern.
- It softens `text-slate-900/800` and `text-gray-900/800` globally.
- It hides all scrollbars globally while preserving scrolling (GEMINI.md §7).
- It holds the `@media print` rules and the `< 1024px` off-canvas drawer rules (`aside.mobile-open`, `#bmsMobileBackdrop.active`).

## Data

All data is fake. Roles 03 and 04 read the shared `bms_store_v2` store described above; the other roles still hold hard-coded data in their own `data.js` until they are migrated. Per GEMINI.md §10, prices are modelled as varying by customer tier / contract and by supplier — reflect that in any pricing UI rather than showing one fixed price per product.

## Documentation suite (`documentation/`)

A ~30-file Khmer business/system documentation set (v2.0, dated 2026-09-18), each entry existing as both `.md` and a styled `.html` twin. It is the functional/business spec to consult when building new pages — it is **not** code, and its internal links point at the old `frontend/src/pages/...` layout (i.e. `frontend_old_admin_backup/`), not the current `frontend/` skeleton. Open `documentation/index.html` (or `DIGITECHKH-Documentation-Hub.html`) as the entry point. Three groups:

1. **Interactive HTML portals** — `DIGITECHKH-Ecommerce-Showroom-Website.html` (digital-showroom demo site with KHQR quote flow), `DIGITECHKH-BMS-Executive-Presentation.html` (18-slide deck), `DIGITECHKH-Sales-Pitch-And-Client-Strategy.html`, `DIGITECHKH-System-Architecture-Overview.html`, `DIGITECHKH-Delivery-Checklist-And-Recommendations.html`, `DIGITECHKH-BMS-Official-System-Documentation.html` (print-ready A4 manual), `DIGITECHKH-Roles-And-Permissions-Interactive-Guide.html`.
2. **Numbered technical specs `00`–`08`** — system overview & architecture, end-to-end workflow (8 business cycles), delivery audit checklist, user operational guide, learnings/standards benchmark, master blueprint & 3-phase roadmap (POS → Wholesale → Full Finance), full system spec for dev/QA, client pitch strategy, e-commerce showroom spec.
3. **`role_*.md` / `role_*.html`** — one deep-study spec per role, covering all 12: super admin, admin/general manager, sales manager, sales executive, cashier/POS, procurement manager, warehouse manager, warehouse staff, chief accountant, AP/AR accountant, internal auditor/executive, customer support.

Recurring business rules across the suite, useful when a new page needs to reflect them:

- **Zero Data Leakage** — warehouse/inventory and delivery-driver roles never see selling price or cost, on UI or API, anywhere.
- **Cambodian localization** — dual currency (USD/KHR), Bakong KHQR payment, VAT 10%, withholding tax (WHT), NSSF (ប.ស.ស) 4%, pure Khmer text, Arabic numerals — consistent with the standards in GEMINI.md.
- **PWA offline POS** — cashier/POS terminal is expected to keep working offline 72+ hours and print to an 80mm thermal printer.
- Financial documents need a 4-signature block (preparer, chief accountant, approving director, payee) and, per `role_apar_accountant.md`, a dynamic QR code for verifying the original record.
