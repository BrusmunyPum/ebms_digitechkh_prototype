# PLANNING-20: Shared Mock Data Architecture
**Version:** 2.0 | **Date:** 2026-09-29 | **Status:** Planning — No Code

---

## 1. Why this is the first thing to build

Every cross-role workflow in `13-cross-role-workflows.md` depends on one role seeing what another role did. Today that is impossible, because each portal owns an isolated copy of the data.

### Evidence (checked 2026-09-29)

**14 separate stores, two storage types:**

| Portal | Storage key | Storage |
|---|---|---|
| 01 Super Admin | `SA_STORAGE_KEYS.*` | session |
| 02 General Manager | `bms_gm_store_v1` | session |
| 03 Sales Manager | `sm_decisions`, `sm_pipeline_moves` | session |
| 04 Sales Executive | `se_new_docs` | session |
| 05 Cashier | `pos_shift_sales`, `pos_cart`, `pos_pending_khqr` | session |
| 06 Procurement | `bms_pm_store_v1` | **local** |
| 07 Warehouse Manager | (dynamic key) | session |
| 08 Warehouse Staff | `digitechkh_bms_warehouse_staff_data` | session |
| 09 Chief Accountant | `bms_ca_store_v1` | **local** |
| 10 AP/AR | `bms_apar_store_v1` | **local** |
| 11 Auditor | `bms_ia_store_v1` | session |
| 12 Customer Support | `digitechkh_bms_customer_support_data` | session |
| Customer Portal | `digitechkh_bms_customer_portal_data` | session |
| Supplier Portal | `digitechkh_bms_supplier_portal_data_v1` | **local** |

**The same record differs between roles.** Invoice `INV-2026-0104`:

| Field | Sales Executive `data.js` | Customer Portal `data.js` |
|---|---|---|
| Customer | `c-bayon` | `CUST-0042` |
| Date | 2026-09-08 | 2026-09-05 |
| Due date | 2026-10-23 | 2026-09-12 |
| Items | 6 × Dell OptiPlex, 12 × keyboards | 1 × TP-Link router, … |

**ID formats disagree:** customers are `c-bayon` in one place and `CUST-0042` in another; GRNs are `GRN-PO-9041` while POs are `PO-2026-0045`; receipts are `RCP-0903-0001` (date-based) while every other document is `XX-2026-NNNN`.

A client watching a demo will notice this the first time they open the same invoice from two portals.

---

## 2. Target design

```
frontend/shared/
├── data/
│   └── seed.js          ONE canonical dataset: every entity, every record, once
└── scripts/
    ├── store.js         the only code that reads/writes storage
    └── status-meta.js   STATUS_META: code → Khmer label + badge colour (from 19-khmer-glossary §2)

frontend/roles/NN-<role>/data.js
    → no longer holds records; only a "projection" for that role (see §5)
```

Script order on every page becomes:
`ui-components.js` → `seed.js` → `status-meta.js` → `store.js` → role `data.js` → `portal.js` → inline script.

### 2.1 Storage decision

| Option | Verdict | Reason |
|---|---|---|
| `sessionStorage` | **Reject** | Scoped to one browser tab. Opening Sales Manager in a second tab gives an empty copy, so the SE → SM hand-off breaks. |
| `localStorage`, one key | **Choose** | Shared by every tab of the same origin; allows the `storage` event (§2.3). |
| IndexedDB | Reject | Asynchronous API — overkill for a few hundred mock records. |

- Single key: `bms_store_v2`. The stored object carries `schemaVersion`; if it doesn't match `seed.js`, the store re-seeds automatically.
- **Serve over HTTP for demos** (`python -m http.server`). Browsers handle `localStorage` for `file://` pages inconsistently, so double-click opening is not a supported demo mode once this ships.
- Per-user UI state that is *not* business data (sidebar collapsed, POS cart, draft form) may keep its own small key — that is fine and not shared.

### 2.2 Reset

A visible "reset demo data" action is mandatory, or a demo that went wrong can't be recovered:
- On the login page (below the role switcher): «កំណត់ទិន្នន័យគំរូឡើងវិញ».
- Behaviour: `showCustomConfirm()` → clear `bms_store_v2` → re-seed → `showToast()`.

### 2.3 Live update across tabs

When SE submits a quotation in tab A, the Sales Manager in tab B should see the approval badge count change without refreshing. `store.js` listens to the browser `storage` event and re-dispatches it as one page-level event; pages that show counts (sidebar badges, notification bell, dashboards) re-render on it. This is what makes a two-screen demo convincing.

---

## 3. The "demo today" rule

Mock dates are currently hard-coded to early September 2026 (`RCP-0903-*`, date presets fixed to 2026-09-03). As real time moves on, "last 7 days" filters and "overdue" badges drift and dashboards go empty.

**Decision:**
- `store.js` exposes one `BMS_TODAY` = the real current date at page load.
- `seed.js` stores dates as **day offsets**, e.g. `issued: -21`, `due: +9`. They are resolved to ISO dates relative to `BMS_TODAY` **once, at seed time**, and saved.
- Therefore after a reset the data always looks "recent", and every role computes the same "today".
- `portal.js` date presets (`18-open-decisions-and-system-config.md` Part C) use `BMS_TODAY`, not a hard-coded date.
- Document numbers keep the year of `BMS_TODAY` at seed time.

---

## 4. Canonical entities and ID formats

This table replaces the ID formats in `14-data-dictionary-and-permissions.md`. Where current code already agrees, its format is kept.

| Entity | Collection | ID format | Example | Owning role (source of truth) | Change from today |
|---|---|---|---|---|---|
| User | `users` | `U-<ROLE>-NN` | `U-SE-01` | GM | new |
| Customer | `customers` | `CUST-NNNN` | `CUST-0042` | SE | replaces `c-bayon` |
| Supplier | `suppliers` | `SUP-NNN` | `SUP-001` | PM | kept (merges "vendors") |
| Product | `products` | SKU code | `DEL-OPT-7010` | WM (qty) / GM (prices) | kept |
| Quotation | `quotations` | `QT-YYYY-NNNN` | `QT-2026-0089` | SE | kept |
| Invoice | `invoices` | `INV-YYYY-NNNN` | `INV-2026-0104` | SE | kept |
| Receipt | `receipts` | `RCP-YYYY-NNNN` | `RCP-2026-0001` | CAS / APAR | replaces `RCP-0903-*` |
| Credit note | `creditNotes` | `CN-YYYY-NNNN` | `CN-2026-0003` | SE | new |
| Purchase request | `purchaseRequests` | `PR-YYYY-NNNN` | `PR-2026-0012` | PM | new |
| Purchase order | `purchaseOrders` | `PO-YYYY-NNNN` | `PO-2026-0045` | PM | kept |
| Goods receipt | `goodsReceipts` | `GRN-YYYY-NNNN` | `GRN-2026-0031` | WM / WS | replaces `GRN-PO-9041` |
| Supplier bill | `supplierBills` | `BILL-YYYY-NNNN` | `BILL-2026-0044` | Supplier | kept |
| Payment voucher | `paymentVouchers` | `PV-YYYY-NNNN` | `PV-2026-0019` | APAR | new format |
| Journal entry | `journalEntries` | `JE-YYYY-NNNN` | `JE-2026-0210` | CA | — |
| Stock movement | `stockMovements` | `SM-YYYY-NNNN` | `SM-2026-0451` | WM / WS | — |
| Stock adjustment | `stockAdjustments` | `ADJ-YYYY-NNNN` | `ADJ-2026-0007` | WS → WM | — |
| Notification | `notifications` | `NT-NNNNN` | `NT-00031` | system | — |
| Audit event | `auditLog` | `AU-NNNNNN` | `AU-000512` | system | — |
| Settings | `settings` (single object) | — | exchange rate, VAT, WHT rates, period lock | GM / CA | — |

**Every reference is by ID.** An invoice stores `customerId: 'CUST-0042'`, never a copy of the customer name. Pages look the name up. This is what prevents the `INV-2026-0104` mismatch from coming back.

### 4.1 Consolidating today's seed data

When conflicting copies of one record exist, the **owning role's** copy wins (column above). Example: `INV-2026-0104` is taken from the Sales Executive data; the Customer Portal then shows it only if its `customerId` equals the logged-in demo customer.

### 4.2 Seed size (enough to look real, small enough to keep consistent)

| Collection | Records |
|---|---|
| customers | 8 (1 is the Customer Portal demo login) |
| suppliers | 5 (1 is the Supplier Portal demo login) |
| products | 20 |
| quotations | 15, spread across every quotation status |
| invoices | 12 (paid, partly paid, overdue, unpaid) |
| purchaseRequests / purchaseOrders | 6 / 8 |
| goodsReceipts / supplierBills / paymentVouchers | 5 / 5 / 4, incl. 1 deliberate three-way-match mismatch |
| stock movements | ~40 |

Rule: every status in `19-khmer-glossary.md` §2 must appear on at least one record, so no badge is untested.

---

## 5. Role projections — how Zero Data Leakage works on top of one store

The shared store holds every field. Each role's `data.js` exposes only **projections**: functions that return a copy of each record containing **only the whitelisted fields** from `14-data-dictionary-and-permissions.md`.

- **Whitelist, never blacklist.** A new field added later to `seed.js` is invisible to the Warehouse roles until someone deliberately adds it to their whitelist.
- Pages call only their role's projection functions; pages never read the store directly. This is the rule to check in review.
- Writes go through `store.js` actions (e.g. `submitQuotation(id)`), which (a) check the transition is allowed by `15-approval-state-machine.md`, (b) append the audit trail, (c) create the notifications from `16-authority-and-notification-matrix.md`. Pages never set `status` themselves.

**Honest limit:** in a static prototype the full store is visible to anyone who opens the browser developer tools. The projections demonstrate the *rule*, not real security. The production system must enforce the same whitelist on the server/API. State this in the client-facing docs so nobody reads the prototype as a security claim.

---

## 6. Migration plan (per role, smallest risk first)

| Step | Work | Proves |
|---|---|---|
| 1 | Write `seed.js` by consolidating the 14 current datasets (rule §4.1) | One truth exists |
| 2 | Write `store.js` + `status-meta.js`; add reset to login | Storage, reset, `BMS_TODAY` |
| 3 | Move **Sales Executive + Sales Manager** onto the store | First real hand-off: submit → approve |
| 4 | Customer Portal onto the store; add `my-quotes.html` / `view-quote.html` | Customer accept → SE converts |
| 5 | Cashier + AP/AR receipts, Chief Accountant ledger | Quote-to-cash closes |
| 6 | Procurement, Supplier Portal, Warehouse Manager/Staff, AP/AR vouchers | Purchase-to-pay closes |
| 7 | GM, Super Admin, Auditor, Customer Support (mostly read-only views) | Every portal reads one truth |
| 8 | Delete the old per-role storage keys and their load/save helpers | No second source left |

Each step ends with the page checklist in `21-page-definition-of-done.md` for every page it touched.

---

## 7. Trade-offs accepted

- **More upfront work before new pages.** Steps 1–3 add no visible page; they are what makes later pages worth building.
- **Demos need a local web server** (`python -m http.server`) instead of double-clicking a file.
- **Seed consolidation means choosing one version** of conflicting records; some current screens will show different numbers than today.
