# PLANNING-17: Missing Roles & External Portal Specs
**Version:** 2.0 | **Date:** 2026-09-29 | **Status:** Planning — No Code

---

## Part A: Decision on Driver and HR Staff Roles

### Background

The v1 documentation (`documentation/v1/01-END-TO-END-SYSTEM-WORKFLOW.md`) explicitly includes a Driver role (delivery portal, proof-of-delivery) and an HR Staff role (attendance, payroll, NSSF). These were present in the old backup prototype (`frontend_old_admin_backup/src/pages/9-portals/`) but were dropped in the v2 rebuild planning. No explicit decision was documented.

---

### Decision: Driver Role

**Verdict: DEFERRED — Phase 3**

**Rationale:**
- The prototype's primary value demonstration is the B2B sales and procurement cycle.
- Delivery is already represented in the SE pipeline page as a delivery status field — sufficient for demo purposes.
- A full driver portal (GPS tracking, signature capture, proof of delivery photo) requires mobile-first design that is out of scope for the current prototype phase.
- The customer portal (if built) can show delivery status via the PO status field.

**Scope in v2 Prototype:**
- Delivery status on SE Pipeline page: static mock field showing `ដំណើរការដឹកជញ្ជូន` (In Transit) / `បានដឹកជញ្ជូន` (Delivered).
- No separate Driver portal page required.
- No separate Driver role card on login page.

**When to Build (Phase 3):**
- Full Driver Portal: `frontend/roles/13-driver/`
- Pages: `dashboard.html`, `deliveries.html`, `view-delivery.html`
- Key features: today's delivery list, mark delivered (with mock photo upload), route view (static map image)
- Portal ID: `driverPortal`, color: `#1e3a5f` (dark navy)

---

### Decision: HR Staff Role

**Verdict: DEFERRED — Phase 3**

**Rationale:**
- HR (payroll, attendance, NSSF) is a standalone domain requiring integration with a separate HRMS or significant standalone module.
- The chief accountant and general manager can see salary expenses as a journal entry line item — sufficient for financial reporting.
- Leave management affects daily operations but is not central to the sales/procurement demo narrative.

**Scope in v2 Prototype:**
- No HR portal pages required.
- GM Dashboard may show "Headcount: 24 employees" as a static KPI card — no drill-down required.
- No separate HR role card on login page.

**When to Build (Phase 3):**
- Full HR Portal: `frontend/roles/14-hr-staff/`
- Pages: `dashboard.html`, `employees.html`, `attendance.html`, `payroll.html`
- Portal ID: `hrPortal`, color: `#3d1a78` (purple)
- Key features: employee list, attendance record, monthly payroll run (mock), NSSF 4% calculation

---

## Part B: Supplier Portal — Full Spec

### Overview

**Portal ID:** `spPortal`  
**Color:** `#0b253a` (dark ocean blue)  
**Primary accent:** `#0284c7` (cyan-600)  
**Portal root:** `frontend/roles/external-portals/supplier-portal/`  
**Login:** Uses Supplier username/password from SA-managed supplier record  
**Architecture:** Uses hardcoded `<aside>` (NOT portal.js renderPortalSidebar). The sidebar is hand-written in each page and matches the current implementation.

### Access Control

Suppliers can only see their own data. They cannot see:
- Any other supplier's records
- Any customer records
- Product cost prices or selling prices
- Internal PO financial totals (they see their own PO amounts only)
- Payment voucher details
- Journal entries or ledger data

### Pages — Currently Built

| Page | File | Status |
|---|---|---|
| Dashboard | `dashboard.html` | Built (v2) |
| Purchase Orders | `purchase-orders.html` | Built (v2) |
| View PO | `view-po.html` | Built (v2) |
| Bills (My Invoices) | `bills.html` | Built (v2) |
| Create Bill | `create-bill.html` | Built (v2) |
| Delivery Tracking | `delivery-tracking.html` | Built (v2) |

### Pages — Missing (Plan to Build)

| Page | File | Priority | Description |
|---|---|---|---|
| Profile / Account Settings | `profile.html` | Medium | Bank account, contact info, tax ID |
| View Bill Detail | `view-bill.html` | High | View submitted bill status, WHT deduction detail |
| View Payment Voucher | `view-payment.html` | Medium | See approved PV and confirm payment received |

### Sidebar Navigation (Current — 4 items)

```
ទិដ្ឋភាពរួម       (dashboard.html)
ការបញ្ជាទិញ (PO)  (purchase-orders.html)
វិក្កយបត្ររបស់ខ្ញុំ (bills.html)     ← active on bills pages
តាមដានការដឹកជញ្ជូន (delivery-tracking.html)
```

### Known Issue: Native `<select>` in create-bill.html

`create-bill.html` line 122 uses `<select id="poSelect">` — this violates GEMINI.md §9. When building `view-bill.html`, the dropdown for PO selection must use the custom floating dropdown from `ui-components.js`.

**Fix plan:** Replace native `<select>` with a custom button + `openFloatingDropdown()` pattern. Pending until the create-bill.html is revisited.

### Dashboard KPIs (Supplier)

| KPI | Data Source | Field |
|---|---|---|
| ការបញ្ជាទិញថ្មី | `purchaseOrders.filter(p => p.status === 'SENT_TO_SUPPLIER')` | `.length` |
| ការបញ្ជាទិញទាំងអស់ | `purchaseOrders.length` | — |
| វិក្កយបត្ររង់ចាំ | `bills.filter(b => b.status === 'pending_payment')` | `.length` |
| ទឹកប្រាក់ទទួលបាន | `bills.filter(b => b.status === 'paid').reduce(sum netAmount)` | USD |

### Mock Data (`data.js`) — Supplier Portal

The supplier portal has its own `data.js` at `frontend/roles/external-portals/supplier-portal/data.js`. It uses sessionStorage with key `bms_supplier_store`. It must contain:

```javascript
const SUPPLIER_DATA = {
  supplier: { id, name, contactPerson, phone, email, bankName, bankAccount },
  purchaseOrders: [ { poId, poDate, expectedDelivery, status, lineItems (name+qty only), total, notes, billed, billId } ],
  bills: [ { id, poId, date, dueDate, description, grossAmount, whtRate, whtAmount, netAmount, status, paidDate } ],
  deliveries: [ { id, poId, dispatchDate, estimatedArrival, status, trackingNote } ]
};
```

**ZDL Note:** `lineItems` in the supplier's view of POs include `productName`, `qty`, `unitPrice` (their price — they know what they charge), but NOT DIGITECHKH's `costPrice` internal record or the `sellingPrice` to customers.

---

## Part C: Customer Portal — Full Spec

### Status: NOT YET BUILT

The customer portal was present in `frontend_old_admin_backup/src/pages/9-portals/customer/` but has not been rebuilt in `frontend/roles/external-portals/`.

### Decision

**Verdict: Phase 2 — Build after core internal roles complete**

### Overview

**Portal ID:** `custPortal`  
**Color:** `#1a3a5c` (dark steel blue)  
**Primary accent:** `#2563eb` (blue-600)  
**Portal root:** `frontend/roles/external-portals/customer-portal/`  
**Architecture:** Same as Supplier — hardcoded `<aside>`, own `data.js`, no portal.js sidebar

### Access Control

Customers can only see:
- Their own quotations and invoices
- Payment status on their own invoices
- Their own delivery/order tracking

Customers can NEVER see:
- Other customers' records
- Product cost prices
- Internal approval workflows or notes
- Other customer's pricing (tier-specific pricing is hidden)

### Pages to Build

| Page | File | Priority | Description |
|---|---|---|---|
| Dashboard | `dashboard.html` | High | Outstanding invoices, recent orders |
| My Quotations | `quotations.html` | High | List of quotations received |
| View Quotation | `view-quotation.html` | High | Quotation detail with Accept/Decline action |
| My Invoices | `invoices.html` | High | List of invoices |
| View Invoice | `view-invoice.html` | High | Invoice detail with KHQR payment option |
| Order Tracking | `tracking.html` | Medium | Delivery status for confirmed orders |
| Profile | `profile.html` | Low | Contact info, billing address |

### Sidebar Navigation (Proposed — 5 items)

```
ទិដ្ឋភាពរួម        (dashboard.html)
ការដោះស្រាយ        (quotations.html)
វិក្កយបត្ររបស់ខ្ញុំ  (invoices.html)
តាមដានការបញ្ជាទិញ  (tracking.html)
ព័ត៌មានគណនី       (profile.html)
```

### Dashboard KPIs (Customer)

| KPI | Khmer Label | Description |
|---|---|---|
| ការដោះស្រាយថ្មី | ការដោះស្រាយថ្មី | Pending quotations awaiting acceptance |
| វិក្កយបត្រដែលត្រូវបង់ | ត្រូវបង់ | Outstanding invoice total (USD) |
| ការបញ្ជាទិញកំពុងដឹក | ដំណើរការ | Active deliveries in transit |

### KHQR Integration (Customer Invoice Payment)

When customer views an invoice, a "Pay with KHQR" button generates a KHQR QR code with:
- Amount: `invoice.grandTotal` in KHR (converted at current rate)
- Merchant: DIGITECHKH (static mock)
- Reference: `invoice.invoiceId`

In the prototype, this is a static QR code image — no real Bakong API call. The button shows the QR in a custom modal (NOT `window.alert`), with a "Payment Confirmed" button that marks the invoice as PAID in sessionStorage.

### Mock Data (`data.js`) — Customer Portal

```javascript
const CUSTOMER_DATA = {
  customer: { id, name, tier, phone, email, address },
  quotations: [ { id, date, validityDate, status, lineItems (name+qty+price), grandTotal } ],
  invoices: [ { id, quotationId, date, dueDate, status, grandTotal, amountPaid, balance } ],
  deliveries: [ { id, invoiceId, estimatedDate, status, trackingNote } ]
};
```

---

## Part D: Login Page — Role Card Inventory

Current login page shows 14 role cards in the demo switcher. After the decisions above, the definitive list for v2 is:

| # | Role (Khmer) | Portal Path | Built? |
|---|---|---|---|
| 01 | ស្ព័ររអ្នកគ្រប់គ្រង | `roles/01-super-admin/dashboard.html` | Yes |
| 02 | អ្នកគ្រប់គ្រងទូទៅ | `roles/02-admin-general-manager/dashboard.html` | Yes |
| 03 | អ្នកគ្រប់គ្រងផ្នែកលក់ | `roles/03-sales-manager/dashboard.html` | Yes |
| 04 | បុគ្គលិកផ្នែកលក់ | `roles/04-sales-executive/dashboard.html` | Yes |
| 05 | អ្នកទទួលប្រាក់ / POS | `roles/05-cashier-pos/dashboard.html` | Yes |
| 06 | អ្នកគ្រប់គ្រងការទិញ | `roles/06-procurement-manager/dashboard.html` | Yes |
| 07 | អ្នកគ្រប់គ្រង倉库 | `roles/07-warehouse-manager/dashboard.html` | Yes |
| 08 | បុគ្គលិក倉库 | `roles/08-warehouse-staff/dashboard.html` | Yes |
| 09 | អ្នកគ្រប់គ្រងសវនកម្ម | `roles/09-internal-auditor/dashboard.html` | Yes |
| 10 | ប្រធានគណនេយ្យករ | `roles/10-chief-accountant/dashboard.html` | Yes (check path — may be 10 vs 09) |
| 11 | គណនេយ្យករ AP/AR | `roles/11-apar-accountant/dashboard.html` | Yes (check path) |
| 12 | ជំនួយការអតិថិជន | `roles/12-customer-support/dashboard.html` | Yes |
| EXT-1 | អ្នកផ្គត់ផ្គង់ | `roles/external-portals/supplier-portal/dashboard.html` | Yes |
| EXT-2 | អតិថិជន | `roles/external-portals/customer-portal/dashboard.html` | NOT BUILT |

**Note on path numbering:** The v2 folder structure uses different numbering than this table. Verify actual folder names against the filesystem before linking. The login page `selectDemoRole()` function is dead code — all role cards use direct `<a href>` links.
