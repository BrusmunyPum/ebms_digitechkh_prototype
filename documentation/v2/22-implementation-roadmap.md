# PLANNING-22: Implementation Roadmap & Demo Scenario
**Version:** 2.0 | **Date:** 2026-09-29 | **Status:** Planning — No Code

---

## Purpose

Decide **what to build next and in what order**, by starting from the demo the client will actually see and working backwards to the pages it needs. Page inventory verified against `frontend/roles/` on 2026-09-29.

---

## 1. The demo scenario (≈ 12 minutes, two browser tabs)

The presenter switches roles from the login page. Each scene must work end-to-end on the shared store (`20-shared-mock-data-architecture.md`).

### Story A — Quote to cash

| # | Scene | Role | Page | Exists? |
|---|---|---|---|---|
| A1 | Create a quotation for a wholesale customer (~$4,200) and submit | Sales Executive | `04-sales-executive/quotes/create-quote.html` | Yes |
| A2 | Badge appears in the other tab; review and approve | Sales Manager | `03-sales-manager/approvals/view-approval.html` | Yes |
| A3 | Send the approved quotation to the customer | Sales Executive | `quotes/view-quote.html` — needs "send" action | Partial |
| A4 | Customer opens and accepts the quotation | Customer | `customer-portal/my-quotes.html`, `view-quote.html` | **No** |
| A5 | Convert to invoice | Sales Executive | `invoices/create-invoice.html` (from quotation) | Yes — verify it pre-fills from the quotation |
| A6 | Customer pays the invoice with KHQR | Customer | `customer-portal/view-invoice.html` | Yes |
| A7 | Payment appears; record the receipt against the invoice | AP/AR | `10-apar-accountant/receipts/create-receipt.html` | Yes |
| A8 | Receivable balance drops; journal entry visible | Chief Accountant | `09-chief-accountant/ledger/ledger.html` | Yes |
| A9 | The same invoice number shows identical figures in every portal | Any | — | Only after shared store |

### Story B — Purchase to pay

| # | Scene | Role | Page | Exists? |
|---|---|---|---|---|
| B1 | Low-stock alert; send reorder request | Warehouse Manager | `07-warehouse-manager/stock-alerts/alerts.html` | Yes |
| B2 | Turn the request into a purchase request and submit | Procurement | `06-procurement-manager/purchase-requests/…` | **No** |
| B3 | Approve the purchase request | General Manager | `02-admin-general-manager/approvals/view-approval.html` | Yes — verify it lists purchase requests |
| B4 | Create a purchase order from the approved request, send it | Procurement | `purchase-orders/create-po.html` | Yes |
| B5 | Accept the purchase order; submit the bill | Supplier | `supplier-portal/view-po.html`, `create-bill.html` | Yes |
| B6 | Receive the goods (no prices on screen) | Warehouse Staff | `08-warehouse-staff/receive-stock.html` | Yes |
| B7 | Three-way match: order ↔ receipt ↔ bill, one line deliberately short | AP/AR | `10-apar-accountant/matching/…` | **No** |
| B8 | Create the payment voucher with withholding tax | AP/AR | `vouchers/create-voucher.html` | Yes |
| B9 | Approve the voucher; print A4 with 4 signatures | Chief Accountant | `09-chief-accountant/approvals/view-approval.html` | Yes |
| B10 | Supplier sees the bill as paid | Supplier | `supplier-portal/bills.html` | Yes |

### Closing scene

| # | Scene | Role | Page |
|---|---|---|---|
| C1 | Every action above appears in the audit trail, read-only | Internal Auditor | `11-internal-auditor-executive/audit-logs.html` |
| C2 | Executive KPIs reflect today's sales and purchases | General Manager | `02-admin-general-manager/dashboard.html` |

---

## 2. Gaps the scenario exposes

| Gap | Where | Priority |
|---|---|---|
| Shared store, reset, `BMS_TODAY` | `frontend/shared/` | **Blocker for everything** |
| Customer quotation pages | `customer-portal/my-quotes.html`, `view-quote.html` | High |
| "Send to customer" action on quotation | `04-sales-executive/quotes/view-quote.html` | High |
| Purchase request list / create / view | `06-procurement-manager/purchase-requests/` | High |
| Three-way match list / view | `10-apar-accountant/matching/` | High |
| Credit note / sales return | `04-sales-executive/credit-notes/` + approvals in SM | Medium (not in the demo) |
| Supplier bill detail | `supplier-portal/view-bill.html` | Medium |
| Customer profile | `customer-portal/profile.html` | Low |

---

## 3. Folder clean-up decisions

| Found | Decision |
|---|---|
| Warehouse Manager has **both** `movements/` and `stock-movements/`, and `create-adjustment.html` exists in **both** `movements/` and `stock-adjustments/` | Keep `stock-movements/` and `stock-adjustments/` (match the sidebar concepts); fold any unique behaviour from `movements/` into them; delete `movements/` after links are updated |
| Procurement has **both** `suppliers/` and `vendors/` | Keep `suppliers/` only (glossary term «អ្នកផ្គត់ផ្គង់», IDs `SUP-NNN`); move the edit/view pages from `vendors/` into it |
| Cashier (05) and Warehouse Staff (08) pages sit in the role root | **Allowed** — Archetype A task screens with no list/create/edit/view structure |
| Auditor (11) and Customer Support (12) pages sit in the role root | Low priority: move into feature subfolders when those pages are next touched |

---

## 4. Build order

Each stage ends with its **exit test**: the listed demo scenes run end-to-end and every touched page passes `21-page-definition-of-done.md`.

| Stage | Work | Exit test |
|---|---|---|
| **0. Docs consistent** | Apply backlog items 10–11 in doc 21; product owner confirms §5 below | Owner sign-off |
| **1. Foundation** | `seed.js`, `store.js`, `status-meta.js`, reset on login, `BMS_TODAY` in `portal.js`; fix `portal.js` backlog items 1–3 | Reset works; date presets correct today |
| **2. First hand-off** | Sales Executive + Sales Manager on the store; glossary applied to both | A1–A2 in two tabs |
| **3. Quote to cash** | Customer quotation pages; send/accept actions; AP/AR receipts and Chief Accountant ledger on the store | A1–A9 |
| **4. Purchase to pay** | Purchase-request pages; three-way match pages; Procurement, Supplier, Warehouse, AP/AR vouchers on the store; folder clean-up §3 | B1–B10 |
| **5. Oversight** | GM, Auditor, Customer Support, Super Admin read from the store; notification bell from the store in every portal | C1–C2; full rehearsal |
| **6. Hardening** | All remaining backlog items in doc 21 (selects, widths, language, login routing); empty states everywhere; 375/768 checks | Every page passes doc 21 |
| **Later (Phase 3)** | Driver, HR, offline POS, live KHQR, credit notes, command search | — |

Why this order: stages 1–2 add almost nothing visible, but without them every later page would repeat today's problem (each portal showing its own version of the truth). Stage 2 is deliberately small — it proves the store design with two roles before migrating fourteen.

---

## 5. Assumptions to confirm with the product owner

These were decided in docs 13–20 so planning could proceed. They are reasonable defaults, not client facts.

| # | Assumption | Doc |
|---|---|---|
| 1 | Approval thresholds: quotation SM ≤ $5,000, +GM ≤ $20,000; purchase request GM ≤ $10,000; voucher CA ≤ $5,000 | 16 |
| 2 | Withholding tax 10% goods / 15% services; exchange rate 4,100 ៛ per $ | 18 |
| 3 | There is no separate Director login; Director sign-off is made from the GM portal | 16 |
| 4 | Role 11 (Auditor / Executive) never approves anything | 17 |
| 5 | Customers accept quotations (new step) before an invoice can be created | 15 |
| 6 | B2B invoice payments are recorded by AP/AR; the Cashier handles only walk-in retail | 13 |
| 7 | Demos run from a local web server, not by double-clicking files | 20 |
| 8 | Driver and HR portals are deferred to Phase 3 | 17 |
