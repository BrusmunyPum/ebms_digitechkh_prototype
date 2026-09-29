# AP/AR Accountant — v2 UI/UX Design Plan

> **Role:** AP/AR Accountant (Cashflow Operations)
> **Portal ID:** `apPortal` *(NEW — does not exist in v1, must be created)*
> **Archetype:** D — Financial Ledger & Reconciliation
> **File Path:** `frontend/roles/10-apar-accountant/`
> **Last Updated:** 2026-09-25

---

## 1. Role Identity

| Property | Value |
|---|---|
| **Archetype** | D — Financial Ledger & Reconciliation |
| **Color Accent** | Teal `#0d9488` |
| **Active Nav Highlight** | `#0f766e` (Teal-700) |
| **Background Tone** | `#f0fdfa` (very light teal-white — cashflow, movement) |
| **Surface Cards** | `#ffffff` with `border-l-4 border-teal-500` for primary panels |
| **Danger/Overdue** | `#dc2626` (Red-600 — overdue > 90 days) |
| **Critical Overdue** | `#7f1d1d` (Red-900 — overdue > 90 days, critical tier) |
| **Warning/Due Soon** | `#d97706` (Amber-600 — 1–30 days overdue) |
| **Normal/Current** | `#16a34a` (Green-600 — not yet overdue) |
| **Font Scale** | `text-sm` for dense aging tables; `text-base` for form fields; `text-3xl` for critical aging totals |
| **Button Height** | `h-10` standard (desk-based, mouse-driven role) |
| **UI Style** | Aging tables, side-by-side AR/AP views, payment voucher forms, bank reconciliation matching UI |
| **Key Persona** | Cashflow Operations — tracks every ringgit/dollar owed to the company (AR) and every bill the company owes to vendors (AP). Issues formal payment vouchers. Reconciles bank statements. Urgency-focused — overdue amounts drive daily work prioritization. |

### Persona Details

The AP/AR Accountant works at a desk and is constantly monitoring due dates, following up on late customers, and ensuring vendors are paid on time. They need:
- **Aging visualization** — who owes what, for how long, in color-coded buckets
- **Due Today alerts** — a morning checklist of what's due right now
- **Quick action buttons** — generate payment vouchers, receipts, and KHQR links fast
- **Printable documents** — payment vouchers and receipts must be A4-printable with signatures
- **Bank reconciliation** — matching bank statement lines to system transactions

---

## 2. Sidebar Navigation

Sidebar is permanently visible (desktop role). Width: `240px`.

Maximum 5 navigation items.

| # | Label (Khmer) | Label (EN) | Icon | href Target | Badge/Alert |
|---|---|---|---|---|---|
| 1 | ផ្ទាំងបំណុល & ទូទាត់ | AR/AP Dashboard | `mdi:scale-balance` | `dashboard.html` | Red dot if overdue items exist |
| 2 | បំណុលត្រូវទារ | Accounts Receivable | `mdi:cash-plus` | `ar/ar.html` | Red number badge: overdue customer count |
| 3 | បំណុលត្រូវសង | Accounts Payable | `mdi:cash-minus` | `ap/ap.html` | Amber number badge: due today count |
| 4 | ការផ្ទៀងផ្ទាត់ធនាគារ | Bank Reconciliation | `mdi:bank-outline` | `bank-recon/bank-recon.html` | Dot badge: unreconciled items |
| 5 | របាយការណ៍ AR/AP | AR/AP Reports | `fa-chart-line` | `reports/reports.html` | No badge |

### Sidebar Design Rules

- Sidebar background: `#134e4a` (deep teal-950) — dark teal sidebar, distinct from CA's indigo
- Active item: `bg-teal-600`, text white, left border `4px solid #99f6e4` (teal-200)
- Inactive item: text `#99f6e4` (teal-200 muted), icon muted
- Hover: `bg-teal-800`
- Portal branding: "eBMS AR/AP" with a balance-scale icon, white text
- User profile at bottom: name, role label "AP/AR Accountant"
- Quick stats in sidebar footer: "AR Today: KHR X | AP Today: KHR Y" — live mini indicators

---

## 3. Pages & Layouts

---

### 3.1 Aging Overview Dashboard (`dashboard.html`)

**Purpose:** Provide an at-a-glance cashflow health view — who owes the company money (AR), who the company owes money to (AP), and what actions need to happen today — with no ECharts.

**Layout:** 2-row layout. Top row: AR/AP Aging Cards side by side. Bottom row: Due Today strip on left, Quick Actions on right.

---

#### Section A — Aging Summary Cards (Side-by-Side, Top Row)

Two large cards, occupying the full width equally (50% / 50%). Each card shows aging buckets for one direction of cash flow.

**Left Card — AR Aging (Money owed TO us — from customers)**

Header: "AR — អ្នកទិញជំពាក់" (Accounts Receivable — Customers Owe Us)

Aging buckets displayed as 5 horizontal color-coded strips or a stacked table:

| Bucket | Color | Amount | Count |
|---|---|---|---|
| Current (not yet due) | Green `#16a34a` | KHR X,XXX,XXX | N customers |
| 1–30 days overdue | Amber `#d97706` | KHR X,XXX,XXX | N customers |
| 31–60 days overdue | Orange `#ea580c` | KHR X,XXX,XXX | N customers |
| 61–90 days overdue | Red `#dc2626` | KHR X,XXX,XXX | N customers |
| 90+ days overdue | Dark Red `#7f1d1d` | KHR X,XXX,XXX | N customers |

- Each bucket row is a clickable link → filters the AR page to that aging bucket
- Total AR at the bottom: "AR សរុប: KHR X,XXX,XXX" (Total AR: KHR X)
- Bold large total, teal-colored

**Right Card — AP Aging (Money WE owe — to vendors)**

Header: "AP — ចំណែកភាគីលក់" (Accounts Payable — We Owe Vendors)

Same 5-bucket table structure as AR:

| Bucket | Color | Amount | Count |
|---|---|---|---|
| Current (not yet due) | Green | KHR X | N vendors |
| 1–30 days overdue | Amber | KHR X | N vendors |
| 31–60 days overdue | Orange | KHR X | N vendors |
| 61–90 days overdue | Red | KHR X | N vendors |
| 90+ days overdue | Dark Red | KHR X | N vendors |

- Each bucket links to AP page filtered to that bucket
- Total AP at the bottom

**Between the Two Cards — Net Position Indicator:**
- Small centered indicator below the two-card row:
- "Net Cashflow Position: KHR X" (AR Total − AP Total)
- Positive: green text "ប្រាក់ចូល > ប្រាក់ចេញ" (Cash in > Cash out)
- Negative: red text "ប្រាក់ចេញ > ប្រាក់ចូល" — warning state

---

#### Section B — Due Today Alert Strip (Full Width, Below Aging Cards)

A prominently highlighted strip (amber/orange background `bg-amber-50 border border-amber-300`) showing everything that is due TODAY.

**Header:** "ចំណាត់ការថ្ងៃនេះ — X ប្រការ" (Today's Actions — X items) with a clock icon.

**Two columns within the strip:**

Left: **AR Collections Due Today**
- List of customer invoices due today:
  - Customer name, Invoice number, Amount due, [📞 Contact] button (small)
  - Total: "AR ត្រូវទារថ្ងៃនេះ: KHR X"

Right: **AP Payments Due Today**
- List of vendor bills due today:
  - Vendor name, PO/Bill reference, Amount due, [📄 Create Voucher] button (small)
  - Total: "AP ត្រូវបង់ថ្ងៃនេះ: KHR X"

If nothing is due: strip shows green: "✓ គ្មានចំណាត់ការចាំបាច់ថ្ងៃនេះ" (No urgent actions today)

---

#### Section C — Quick Action Buttons

Four large action buttons displayed in a 2×2 grid or a horizontal row:

| Button | Label | Icon | Action |
|---|---|---|---|
| Primary | + ចេញប័ណ្ណចំណាយ | `mdi:receipt-text-plus` | Opens `ap/create-voucher.html` |
| Primary | + ធ្វើការបង្កាន់ដៃ | `mdi:printer-check` | Opens `ar/create-payment.html` |
| Secondary | + KHQR ស្នើប្រាក់ | `mdi:qrcode-plus` | Opens KHQR generation modal |
| Secondary | ការផ្ទៀងផ្ទាត់ | `mdi:bank-check` | Navigates to `bank-recon/bank-recon.html` |

Button style: `h-12 px-6`, teal background for primary, teal-outline for secondary.

**KHQR Modal (inline, triggered by KHQR button):**
- Customer selector dropdown
- Invoice selector (auto-fills amount)
- Amount field (editable)
- [Generate QR] → shows QR code image and a "Copy Payment Link" option
- [Send via Email/SMS] option (if notification service is configured)

---

**Actions Available:**
- Click aging bucket rows: navigate to filtered AR/AP list
- [📞 Contact] on AR due today: opens contact panel or link
- [📄 Create Voucher] on AP due today: pre-fills voucher with that vendor/bill
- [+ ចេញប័ណ្ណចំណាយ]: create payment voucher
- [+ ធ្វើការបង្កាន់ដៃ]: record incoming payment
- [+ KHQR ស្នើប្រាក់]: generate KHQR collection QR
- [ការផ្ទៀងផ្ទាត់]: navigate to bank reconciliation

**Rules/Constraints:**
- Dashboard is informational + quick-launch only — no data entry on this page except KHQR modal
- NO ECharts or charts — all data shown as colored tables and numbers
- Aging buckets are calculated in real-time based on invoice due date vs today's date
- The "Due Today" strip updates on page load — no manual refresh needed

**Files to Create/Modify:**
- `frontend/roles/10-apar-accountant/dashboard.html`

---

### 3.2 Accounts Receivable (`ar/ar.html`)

**Purpose:** Manage all outstanding customer invoices, track collection status, and provide tools to record payments and chase overdue accounts.

**Layout:** Sub-Navigation Tabs within content area. Filter bar above tabs. Dense table content.

---

#### Sub-Navigation Tabs

1. **[បំណុលសរុប]** — All Outstanding AR
2. **[ហួសកំណត់]** — Overdue Only
3. **[ប្រវត្តិប្រមូល]** — Collection History (Payments Received)

---

#### Global AR Filter Bar (Above Tabs)

- Customer search (name or code)
- Date range filter
- Aging bucket filter: [ទាំងអស់] [Current] [1-30d] [31-60d] [61-90d] [90d+]
- [+ Record Payment] button (teal, right-aligned, `h-10`)
- [Export Excel] button

---

#### Tab 1 — All Outstanding AR (បំណុលសរុប)

**Layout:** Customer-grouped expandable table or flat invoice table (toggle option).

**View Toggle:** [By Customer] | [By Invoice]

**By Customer View:**
- Each row is a customer with a collapsible expand arrow
- Columns: Customer Name | Customer Code | Total Outstanding | Current | 1–30d | 31–60d | 61–90d | 90d+ | Actions

**By Invoice View (default):**
Flat table of all open invoices:

| Column | Details |
|---|---|
| Invoice # | `INV-2026-00XXX` — monospace, clickable to view invoice |
| Customer | Customer name |
| Invoice Date | Date issued |
| Due Date | Due date |
| Days Overdue | Computed: today − due date (red if > 0) |
| Invoice Amount | Total invoice amount |
| Amount Paid | Partial payments already recorded |
| Balance Due | Outstanding = Invoice − Paid |
| Aging Bucket | Color-coded pill: Current / 1–30d / etc. |
| Actions | [Record Payment] [📧 Send Reminder] [View] |

**Summary Row (table footer):**
- Total Outstanding AR balance
- Breakdown by aging bucket

---

#### Tab 2 — Overdue Only (ហួសកំណត់)

Pre-filtered view: same table as Tab 1 but showing ONLY invoices with Days Overdue > 0.

Additional column: **[📞 Contact]** button — opens a contact sidebar panel with:
- Customer phone number
- WhatsApp link (if configured)
- Email draft with pre-filled collection reminder template
- Log contact attempt: date, outcome dropdown (Promised to pay / No answer / Disputed / Paid)

**Overdue Action Bar:**
- [Send Batch Reminders] — bulk-select overdue customers and send email reminders
- [Print Overdue List] — A4 printable collection list

---

#### Tab 3 — Collection History (ប្រវត្តិប្រមូល)

Payments received log:

| Column | Details |
|---|---|
| Receipt # | `RCP-2026-00XXX` — monospace |
| Date | Payment received date |
| Customer | Customer name |
| Invoice(s) Applied | Comma-separated invoice numbers |
| Amount Received | Amount |
| Method | Cash / KHQR / Bank Transfer |
| Reference | Bank ref or KHQR txn ID |
| Recorded By | AP/AR staff name |
| Actions | [View Receipt] [Print] |

---

#### [+ Record Payment] Action → `ar/create-payment.html`

See Section 3.3 below for detailed page spec.

**KHQR Collection Link per Customer:**
- In the [By Customer] view, each customer row has a [🔲 KHQR] button
- Generates a KHQR QR code linked to a payment amount equal to their total outstanding balance
- QR code displayed in a modal with [Copy Link] and [Download QR] options

---

**Files to Create/Modify:**
- `frontend/roles/10-apar-accountant/ar/ar.html`

---

### 3.3 AR Payment Recording (`ar/create-payment.html` and `ar/view-payment.html`)

**Purpose:**
- `create-payment.html`: Record an incoming customer payment against one or more outstanding invoices
- `view-payment.html`: View a recorded payment in detail and print a receipt

---

#### `ar/create-payment.html` — Record Payment Form

**Layout:** Two-column form (left: payment details; right: invoice allocation panel).

**Left Column — Payment Details:**

| Field | Type | Required | Notes |
|---|---|---|---|
| Customer | Searchable dropdown | Yes | Auto-loads customer's open invoices on right |
| Payment Date | Date picker | Yes | Defaults to today |
| Amount Received | Number input (KHR) | Yes | Total amount received in this transaction |
| Payment Method | Segmented: [Cash] [KHQR] [Bank Transfer] [Cheque] | Yes | |
| Reference / Transaction ID | Text input | If KHQR/Bank | Bank ref, KHQR transaction ID |
| Bank Account | Dropdown (if Bank Transfer) | If bank | Which company bank account received to |
| Notes | Textarea | No | Internal note |

**Right Column — Invoice Allocation Panel:**

Once a customer is selected, all their open invoices appear:

| Field | Details |
|---|---|
| Invoice # | Monospace |
| Invoice Date | Short date |
| Due Date | Short date (red if overdue) |
| Original Amount | Full invoice amount |
| Outstanding Balance | Remaining unpaid |
| Apply Amount | Number input — how much of this payment applies to this invoice (can be partial) |
| Fully Paid toggle | Checkbox: mark invoice as fully settled |

- Running total at bottom: "Applied: KHR X | Remaining Unapplied: KHR Y"
- The system warns if Applied total > Amount Received
- Unapplied amounts can be left as "Credit on Account" (prepayment)

**Footer Actions:**
- [Preview Receipt] — opens a print preview of the receipt
- [Save & Print Receipt] — saves the payment, generates receipt number `RCP-XXXX`, opens print view
- [Save Only] — saves without printing
- [Cancel] — returns to AR page

**Auto-Journal Entry:**
On save, the system auto-generates a journal entry:
- Dr: Cash/Bank Account (based on payment method)
- Cr: Accounts Receivable (customer account)
- Journal entry is auto-posted (or queued for CA review per system config)

---

#### `ar/view-payment.html` — Payment Receipt View

**Layout:** A4-formatted printable receipt. Standard header + body.

**Receipt Document Structure:**

```
┌──────────────────────────────────────────────────────────┐
│  [Company Logo]     DIGITECHKH Co., Ltd.                 │
│                     ប័ណ្ណបញ្ជាក់ការទូទាត់                   │
│                     PAYMENT RECEIPT                       │
├──────────────────────────────────────────────────────────┤
│  Receipt No: RCP-2026-00XXX         Date: 25 Sep 2026    │
│  Customer: [Customer Name]                               │
│  Method: KHQR / Bank Transfer / Cash                     │
│  Reference: [bank txn ID]                                │
├──────────────────────────────────────────────────────────┤
│  Applied to Invoices:                                    │
│  INV-2026-00100    KHR 1,250,000                        │
│  INV-2026-00112    KHR   450,000                        │
│  ───────────────────────────────                         │
│  TOTAL RECEIVED:   KHR 1,700,000                        │
├──────────────────────────────────────────────────────────┤
│  Received by: _______________   Date: _______________    │
│  Signature:   _______________                            │
└──────────────────────────────────────────────────────────┘
```

**Screen View (non-print):**
- [✎ Edit] button — only if payment is editable (within same day, not yet reconciled)
- [🖨 Print Receipt] button
- [Void Payment] button — requires reason, CA approval may be needed

---

**Files to Create/Modify:**
- `frontend/roles/10-apar-accountant/ar/create-payment.html`
- `frontend/roles/10-apar-accountant/ar/view-payment.html`

---

### 3.4 Accounts Payable (`ap/ap.html`)

**Purpose:** Manage all outstanding vendor bills and issue formal payment vouchers with the required 4-signature format for internal compliance.

**Layout:** Sub-Navigation Tabs. Filter bar. Dense table content.

---

#### Sub-Navigation Tabs

1. **[ត្រូវបង់]** — Amounts Due (upcoming and overdue vendor bills)
2. **[ប្រវត្តិបង់ប្រាក់]** — Payment History
3. **[ប័ណ្ណចំណាយ]** — Payment Vouchers (issued vouchers list)

---

#### Global AP Filter Bar

- Vendor search (name or code)
- Date range filter
- Due status: [ទាំងអស់] [Due Today] [Overdue] [Upcoming 7d] [Upcoming 30d]
- [+ Create Payment Voucher] button (teal, right-aligned, `h-10`)
- [Export Excel] button

---

#### Tab 1 — Amounts Due (ត្រូវបង់)

Flat table of all unpaid vendor bills:

| Column | Details |
|---|---|
| Bill # / PO # | `BILL-2026-XXX` or `PO-2026-XXX` monospace |
| Vendor | Vendor name |
| Bill Date | Date of vendor invoice |
| Due Date | Payment due date |
| Days Until Due | Computed: due date − today (red if negative = overdue) |
| Bill Amount | Gross bill amount (KHR) |
| WHT Deductible | Withholding tax amount if applicable |
| Net Payable | Bill Amount − WHT |
| Status | `Unpaid` / `Voucher Created` / `Paid` |
| Actions | [Create Voucher] [View] |

**[Create Voucher]** per row: navigates to `ap/create-voucher.html` with bill pre-filled.

**Urgent Overdue AP Bar:**
- If any bills are overdue (Days Until Due < 0): show an amber alert bar at the top of Tab 1:
- "ចំនួន X វិក្កយបត្រហួសកំណត់ — KHR Y" (X bills overdue — KHR Y)

---

#### Tab 2 — Payment History (ប្រវត្តិបង់ប្រាក់)

Completed vendor payments log:

| Column | Details |
|---|---|
| Voucher # | `PV-2026-XXXXX` — monospace |
| Date Paid | Payment execution date |
| Vendor | Vendor name |
| Bill Reference | Which bill(s) this covers |
| Gross Amount | Total before WHT |
| WHT Deducted | WHT amount |
| Net Paid | Actual amount transferred |
| Method | Cash / KHQR / Bank Transfer / Cheque |
| Approved By | Approver name from voucher |
| Actions | [View Voucher] [Print] |

---

#### Tab 3 — Payment Vouchers (ប័ណ្ណចំណាយ)

List of all payment vouchers in the system (all statuses):

| Column | Details |
|---|---|
| Voucher # | `PV-2026-XXXXX` |
| Date | Voucher creation date |
| Vendor | Vendor name |
| Amount | Net payable on voucher |
| Status | `Draft` / `Pending Approval` / `Approved` / `Paid` / `Voided` pill |
| Signatures | Filled count: "2/4 signed" progress indicator |
| Actions | [View] [Print] [Approve (if authorized)] |

**Voucher Status Flow:**
```
Draft → Pending Approval → Approved → Paid
         ↓
        Voided (at any stage before Paid)
```

---

**Files to Create/Modify:**
- `frontend/roles/10-apar-accountant/ap/ap.html`

---

### 3.5 AP Payment Voucher (`ap/create-voucher.html` and `ap/view-voucher.html`)

**Purpose:**
- `create-voucher.html`: Create a formal payment voucher for a vendor payment — includes WHT calculation
- `view-voucher.html`: A4-printable payment voucher with 4 official signature zones

---

#### `ap/create-voucher.html` — Create Payment Voucher Form

**Layout:** Single-column form, structured like a formal accounting document.

**Form Fields:**

| Field | Type | Required | Notes |
|---|---|---|---|
| Voucher Date | Date picker | Yes | Defaults to today |
| Vendor | Searchable dropdown | Yes | Auto-fills vendor TIN and bank details |
| Linked PO / Bill | Multi-select of open bills for selected vendor | Yes | Can cover multiple bills |
| Bill Description | Auto-filled from bill; editable memo | Yes | |
| Gross Amount (ចំនួនសរុប) | Number input | Yes | Total before WHT |
| WHT Rate | Dropdown: [N/A] [5%] [10%] [15%] | No | Defaults to N/A; changes based on payment type |
| WHT Amount | Auto-calculated read-only: Gross × WHT Rate | — | Editable override if needed |
| Net Payable (ចំនួនសុទ្ធ) | Auto-calculated: Gross − WHT | — | Read-only |
| Payment Method | Segmented: [Cash] [KHQR] [Bank Transfer] [Cheque] | Yes | |
| Bank Account (Pay from) | Dropdown of company bank accounts | If not cash | |
| Payee Bank Details | Auto-filled from vendor profile; editable | If bank | Account name, account number, bank name |
| Internal Notes | Textarea | No | |
| Attachments | File upload | No | Scanned vendor invoice |

**WHT Auto-calculation Rule:**
- When WHT Rate is selected: WHT Amount = Gross Amount × Rate / 100
- Net Payable = Gross Amount − WHT Amount
- These update live as user changes amounts

**Amount in Words:**
- Below the Net Payable field: Khmer words for the amount (or English if USD)
- e.g., "ចំនួន: មួយពាន់ប្រាំរយដុល្លារ" — auto-generated from number
- This prints on the physical voucher

**Signature Zones (Preview):**
Below the form, a preview of the 4 signature zones is shown (read-only — actual signing happens on printed document or with approval workflow):

```
[Prepared by]     [Reviewed by]     [Approved by]     [Received by]
AP/AR Accountant  Chief Accountant  Admin / GM        Vendor Rep
```

**Footer Actions:**
- [Save as Draft] — saves without submitting for approval
- [Submit for Approval] — changes status to "Pending Approval"
- [Preview Voucher] — opens `view-voucher.html` in print preview mode
- [Cancel] — returns to AP page

---

#### `ap/view-voucher.html` — Payment Voucher (A4 Printable)

**Purpose:** Display the formal payment voucher in A4 printable format with all required fields and 4 signature zones.

**Screen View Controls (hidden on print):**
- [🖨 Print Voucher] button
- [✎ Edit] — only if `Draft` status
- [✓ Mark as Paid] — only if `Approved` status and user has permission
- [Void Voucher] — opens void reason modal

**Voucher Document Structure (A4 layout):**

```
┌──────────────────────────────────────────────────────────────┐
│  [Company Logo]           DIGITECHKH Co., Ltd.              │
│                           ប័ណ្ណចំណាយ (PAYMENT VOUCHER)       │
├───────────────────────────┬──────────────────────────────────┤
│  Voucher No: PV-2026-XXX  │  Date: 25 Sep 2026              │
│  Pay To: [Vendor Name]    │  Method: Bank Transfer           │
│  TIN: [Vendor TIN]        │  Bank: ABA — Acct: XXXXXXXX     │
├───────────────────────────┴──────────────────────────────────┤
│  DESCRIPTION OF PAYMENT:                                     │
│  Payment for [Bill Description]                              │
│  Reference: PO-2026-00089 / BILL-2026-00042                  │
├──────────────────────────────────────────────────────────────┤
│  Gross Amount:     KHR    X,XXX,XXX                          │
│  WHT (15%):        KHR     (XX,XXX)                          │
│  ─────────────────────────────────                           │
│  NET PAYABLE:      KHR    X,XXX,XXX                          │
│  In Words: [Khmer/English amount in words]                   │
├──────────────────────────────────────────────────────────────┤
│  SIGNATURE ZONES (4 columns, equal width)                    │
│                                                              │
│  Prepared by:      Reviewed by:    Approved by:  Received by: │
│  AP/AR Accountant  Chief Acct.     Admin/GM      Vendor Rep  │
│                                                              │
│  ___________    ___________    ___________    ___________    │
│  Name:          Name:          Name:          Name:          │
│  Date:          Date:          Date:          Date:          │
└──────────────────────────────────────────────────────────────┘
```

**Print CSS Rules:**
- `@media print { .sidebar, .topbar, .action-buttons { display: none; } }`
- Voucher box: A4 width, proper margins (2cm all sides), bordered table
- Signature zones: each zone is `width: 25%`, minimum height `80px`, dotted underline for signature
- Font: clean serif or sans-serif at 11pt for print readability
- Company logo: prints in top-left corner

**Auto-Journal Entry on Mark as Paid:**
- Dr: Accounts Payable (vendor account)
- Cr: Cash/Bank Account (based on payment method)
- WHT entry: Dr: Accounts Payable | Cr: WHT Payable (if WHT > 0)

---

**Files to Create/Modify:**
- `frontend/roles/10-apar-accountant/ap/create-voucher.html`
- `frontend/roles/10-apar-accountant/ap/view-voucher.html`

---

### 3.6 Bank Reconciliation (`bank-recon/bank-recon.html`)

**Purpose:** Match system-recorded transactions against the actual bank statement to identify discrepancies, ensure completeness, and produce a reconciliation report.

**Layout:** Two-panel side-by-side view (System Transactions | Bank Statement Transactions) with a matching interface in the middle. Summary panel at the top.

---

#### Section A — Reconciliation Header & Setup

**Bank/Period Selector:**
- Bank Account dropdown: list of company bank accounts (e.g., "ABA — USD Account", "Canadia — KHR Account")
- Period: Month picker (e.g., "Sep 2026")
- [Load / Refresh] button

**Summary Cards (4 compact cards in a row):**

| Card | Label | Value |
|---|---|---|
| 1 | Statement Closing Balance | KHR X (from bank statement) |
| 2 | System Book Balance | KHR X (from GL) |
| 3 | Outstanding Deposits | KHR X (in system, not in bank) |
| 4 | Outstanding Checks/Payments | KHR X (in bank, not in system) |

**Reconciliation Formula Display:**
```
Statement Balance:           KHR X,XXX,XXX
+ Outstanding Deposits:      KHR     X,XXX
− Outstanding Payments:     (KHR     X,XXX)
─────────────────────────────────────────
Adjusted Bank Balance:       KHR X,XXX,XXX

Book Balance (System):       KHR X,XXX,XXX
─────────────────────────────────────────
Difference:                  KHR         0  ← GREEN if 0, RED if not
```

---

#### Section B — Bank Statement Import / Manual Entry

**Two methods to enter bank statement data:**

**Method 1: Manual Entry**
- [+ Add Bank Transaction] button — opens a row form:
  - Date, Description, Debit amount, Credit amount
  - [Add] to append to the bank statement side

**Method 2: CSV Upload**
- [📁 Upload Bank Statement CSV] button
- Accepts standard bank CSV format (configurable column mapping)
- Preview table shown after upload; user confirms before importing

---

#### Section C — Side-by-Side Matching Panel

**Layout:** Two columns, equal width, scrollable independently.

**Left Column — System Transactions (Book Records):**
- All GL transactions for the selected bank account in the selected period
- Each row: Date | Description | Reference | Amount (Dr/Cr) | Match Status

**Right Column — Bank Statement Transactions:**
- All imported/entered bank statement lines
- Each row: Date | Description | Amount | Match Status

**Match Status Per Row:**
- `Unmatched` — gray background, no link
- `Matched` — green background with ✓ icon, paired with its match on the other side
- `Partial Match` — amber, flagged for review

**Matching Interaction:**
- Click a row on either side to "select" it (yellow highlight)
- Click a row on the other side to propose a match
- A "Match" button appears between the two panels
- [✓ Match These] — links the two rows as matched, both turn green
- [↩ Unmatch] — unlinks a previously matched pair
- Keyboard shortcut: `M` to match selected rows

**Auto-Match Button:**
- [🤖 Auto-Match by Amount & Date] — system suggests matches based on amount, date proximity (±3 days), and description similarity
- Shows a preview list of proposed matches: user can accept all, accept individually, or reject

---

#### Section D — Reconciliation Completion

**Complete Reconciliation:**
- [✓ Complete Reconciliation] button — only enabled when Difference = 0 (fully balanced)
- On click: confirmation modal: "Complete bank reconciliation for ABA USD — Sep 2026?"
- After confirm: reconciliation is locked for that period — records reconciliation timestamp and user

**Unreconciled Items Report:**
- If Difference ≠ 0: [View Unreconciled Items] link — shows all unmatched rows from both sides
- Tools to resolve:
  - Create missing journal entry for bank items not in system
  - Flag as "timing difference" (will appear next month)
  - Flag as "error" (needs investigation)

**Reconciliation History:**
- At bottom: list of completed reconciliation reports (by bank, by period)
- [View] / [Print Reconciliation Report] per completed reconciliation

---

**Actions Available:**
- Bank account selector + period selector
- [Load / Refresh] data
- [+ Add Bank Transaction] manual entry
- [📁 Upload CSV]
- Click to select rows for matching
- [✓ Match These] / [↩ Unmatch]
- [🤖 Auto-Match]
- [✓ Complete Reconciliation]
- [View Unreconciled Items]
- [Print Reconciliation Report]

**Rules/Constraints:**
- Completed reconciliation periods are locked — no adding/removing/changing matches after completion
- Only the AP/AR Accountant and CA can complete reconciliations
- Auto-match is a suggestion only — accountant must review and confirm
- System book balance is read from GL ledger — not manually enterable
- Bank statement entries can be edited/deleted until reconciliation is completed

**Files to Create/Modify:**
- `frontend/roles/10-apar-accountant/bank-recon/bank-recon.html`

---

### 3.5 reports/reports.html (របាយការណ៍ AR/AP)

**Purpose:** Receivables and payables analytics for the accounting team.
**Access:** AP/AR Accountant + Chief Accountant + Admin/GM (read).
**ECharts Placement:** ONLY ECharts page in this portal.

#### Layout Structure:
```
[HEADER: h-[72px]] — “របាយការណ៍ AR/AP” | Export buttons
[TAB BAR] — Tab 1: AR Analysis | Tab 2: AP Analysis | Tab 3: Collection Efficiency
```

#### Tab 1: AR Analysis
- ECharts Line Chart: AR Aging Trend (last 6 months, 5 aging buckets as 5 lines)
  - Colors match the 5-tier aging system: Green / Amber / Orange / Red / Dark Red
  - X-axis: last 6 months, Y-axis: Outstanding amount
- KPI Strip below chart:
  - Days Sales Outstanding (DSO)
  - Collection Rate (%)
  - Average Collection Days
  - Overdue Rate (%)

#### Tab 2: AP Analysis
- ECharts Bar Chart: Monthly AP Payments by Vendor (top 5 vendors, last 6 months)
- KPI Strip:
  - Days Payable Outstanding (DPO)
  - On-time Payment Rate (%)
  - Total Payables This Month
  - Overdue Payables Amount

#### Tab 3: Collection Efficiency
- ECharts Line Chart: Monthly Collection Efficiency % (target line at 85%)
- Table: Top 10 Overdue Customers
  - Columns: ឈ្មោះអតិថិជន | AR Amount | ថ្ងៃហួសកំណត់ | Bucket | ទំនាក់ទំនង
- [Export Excel] button

#### Export Bar (bottom of each tab):
- “ទាញចុះ Excel” + “ទាញចុះ PDF” buttons

**Files to Create/Modify:**
- `frontend/roles/10-apar-accountant/reports/reports.html`

---

## 4. UI Identity Details

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary (Teal) | `#0d9488` | Buttons, active states, links |
| Primary Dark | `#0f766e` | Sidebar bg, hover states |
| Sidebar BG | `#134e4a` | Deep teal-950 sidebar |
| Sidebar Text | `#99f6e4` | Inactive nav items (teal-200) |
| Background | `#f0fdfa` | Page background (light teal-white) |
| Card Surface | `#ffffff` | Card/panel backgrounds |
| Aging Current | `#16a34a` | Green — not overdue |
| Aging 1–30d | `#d97706` | Amber — 1–30 days overdue |
| Aging 31–60d | `#ea580c` | Orange — 31–60 days overdue |
| Aging 61–90d | `#dc2626` | Red — 61–90 days overdue |
| Aging 90d+ | `#7f1d1d` | Dark red — critically overdue |
| Success | `#16a34a` | Matched reconciliation items, paid status |
| Warning | `#d97706` | Due today, partial matches |
| Danger | `#dc2626` | Overdue, unbalanced reconciliation |
| Text Primary | `#134e4a` | Main body text (deep teal-tinted dark) |
| Text Secondary | `#64748b` | Secondary labels |
| Monospace Text | `#1e293b` | Invoice numbers, account codes |

### Aging Color System

The aging color system is the defining visual language of this role. Every aging table across the portal must use EXACTLY these 5 colors consistently — it trains the accountant to pattern-match aging severity instantly.

| Bucket | Background | Text | Border |
|---|---|---|---|
| Current | `#f0fdf4` | `#15803d` | `#86efac` |
| 1–30d | `#fffbeb` | `#b45309` | `#fcd34d` |
| 31–60d | `#fff7ed` | `#c2410c` | `#fdba74` |
| 61–90d | `#fef2f2` | `#b91c1c` | `#fca5a5` |
| 90d+ | `#450a0a` | `#fef2f2` | `#991b1b` (inverted — dark bg) |

### Typography

- **Aging Totals:** `font-bold text-3xl` — these are the numbers the accountant reads at a glance every morning
- **Invoice Numbers:** `font-mono text-sm` — always monospace for quick scanning and alignment
- **Amount Columns:** `font-mono text-sm text-right tabular-nums` — numbers must align on decimal points
- **Status Badges:** `text-xs font-semibold px-2 py-0.5 rounded-full`
- **Section Headers:** `font-bold text-base text-teal-700`
- **Voucher Document (print):** `text-11pt` — print-optimized sizing

### Unique Design Elements

1. **Dark Teal Sidebar** — Deep `#134e4a` sidebar distinguishes the AP/AR role from the CA's deep indigo sidebar — both are Archetype D but visually differentiated.
2. **5-Tier Aging Color System** — The aging buckets use a distinct color spectrum (green → amber → orange → red → dark red) that is immediately readable without labels. This is the signature of the AP/AR role.
3. **Side-by-Side Bank Reconciliation Panel** — The dual-column matching UI (system vs. bank) is a unique layout not found in any other role. Visual pairing of matched rows with green highlights creates instant clarity.
4. **A4 Payment Voucher with 4 Signature Zones** — The payment voucher format is a formal accounting document with defined signature blocks. The screen preview and print output share the same layout — WYSIWYG.
5. **Due Today Alert Strip** — The amber alert strip on the dashboard is a daily operational checklist — the accountant's first action each morning.
6. **KHQR Integration** — AR collection via KHQR QR code generation is a uniquely Cambodian payment feature integrated directly into customer collection workflows.

---

## 5. Developer Notes

### NEW Portal Configuration (`portal.js`)

`apPortal` does not exist in v1. Create a new portal configuration entry:

```javascript
apPortal: {
  id: 'apPortal',
  roleLabel: 'AP/AR Accountant',
  basePath: 'frontend/roles/10-apar-accountant/',
  accentColor: '#0d9488',
  sidebarBg: '#134e4a',
  defaultPage: 'dashboard.html',
  nav: [
    { id: 'dashboard', label: 'ផ្ទាំងបំណុល & ទូទាត់', icon: 'mdi:scale-balance', href: 'dashboard.html', badge: 'overdueAlert' },
    { id: 'ar', label: 'បំណុលត្រូវទារ', icon: 'mdi:cash-plus', href: 'ar/ar.html', badge: 'arOverdueCount' },
    { id: 'ap', label: 'បំណុលត្រូវសង', icon: 'mdi:cash-minus', href: 'ap/ap.html', badge: 'apDueTodayCount' },
    { id: 'bankrecon', label: 'ការផ្ទៀងផ្ទាត់ធនាគារ', icon: 'mdi:bank-outline', href: 'bank-recon/bank-recon.html', badge: 'unreconciledDot' },
    { id: 'reports', label: 'របាយការណ៍ AR/AP', icon: 'fa-chart-line', href: 'reports/reports.html', badge: false }
  ]
}
```

### Data Fields Required (`data.js` / API)

For `dashboard.html`:
```
arAging: { current, d1_30, d31_60, d61_90, d90plus, total },
apAging: { current, d1_30, d31_60, d61_90, d90plus, total },
netPosition: (arTotal - apTotal),
dueToday.ar[]: { customerId, customerName, invoiceNo, amountDue },
dueToday.ap[]: { vendorId, vendorName, billRef, netPayable }
```

For `ar/ar.html`:
```
arInvoices[]: { invoiceNo, customerId, customerName, invoiceDate, dueDate,
                daysOverdue, invoiceAmount, amountPaid, balanceDue, agingBucket },
payments[]: { receiptNo, paymentDate, customerId, customerName, invoicesApplied,
              amountReceived, method, reference, recordedBy }
```

For `ap/ap.html`:
```
apBills[]: { billNo, poNo, vendorId, vendorName, billDate, dueDate,
             daysUntilDue, billAmount, whtAmount, netPayable, status },
vouchers[]: { voucherNo, voucherDate, vendorName, netAmount, status,
              signaturesCompleted, signaturesTotal }
```

For `bank-recon/bank-recon.html`:
```
bankAccounts[]: { id, name, currency, currentBalance },
systemTransactions[]: { date, description, reference, drAmount, crAmount, matchStatus },
bankStatementLines[]: { date, description, debitAmount, creditAmount, matchStatus },
reconciliationSummary: { statementBalance, bookBalance, difference, isReconciled }
```

### KHQR Integration Notes

- KHQR is Cambodia's national QR payment standard — generate QR via the KHQR SDK or API
- QR payload must include: merchant ID, amount (KHR), currency, reference (invoice number)
- The generated QR should be displayable as a base64 image inline (no server-side file storage required)
- Each QR code should expire after a configurable time (default: 24 hours)
- On payment confirmation (webhook from bank), auto-record payment in AR and update invoice status

### Aging Calculation Logic

Aging must be computed at query time based on:
```
daysOverdue = (today's date) - (invoice.dueDate)
agingBucket = 
  daysOverdue <= 0  → 'current'
  daysOverdue 1–30  → 'd1_30'
  daysOverdue 31–60 → 'd31_60'
  daysOverdue 61–90 → 'd61_90'
  daysOverdue > 90  → 'd90plus'
```

- Aging must recalculate dynamically — do NOT store aging bucket as a static field (it changes every day)
- Aging totals on dashboard must reflect real-time calculation

### Payment Voucher — A4 Print Requirements

- `view-voucher.html` must have a dedicated `@media print` CSS section
- All navigation, sidebar, buttons, and browser chrome hidden during print
- Voucher box: max-width A4 (210mm × 297mm), centered
- Signature zones: 4 equal columns, each with a bottom border underline (80px height), name label below
- Company logo: positioned top-left, printed in color (PNG format)
- Amount in words: auto-generated function (support both KHR Khmer words and USD English words)

### WHT Calculation Reference

| Payment Type | WHT Rate |
|---|---|
| Services (resident company) | 15% |
| Services (individual contractor) | 15% |
| Rental (building, equipment) | 10% |
| Royalties | 15% |
| Bank interest | 15% |
| Other purchases | N/A (0%) |

WHT rates are configurable per vendor/payment-type in system settings — the form should load defaults from vendor profile.

### Bank Statement CSV Import

- Support common Cambodian bank CSV formats: ABA Bank, Canadia Bank, ACLEDA Bank
- Column mapping: configurable — allow user to map CSV columns to: Date, Description, Debit, Credit, Balance
- After mapping is saved for a bank account, it auto-applies on next upload for same account

### Shared Components & Print CSS

- Aging color system: create shared CSS `components/aging-colors.css` — used in both dashboard and AR/AP pages
- Print voucher layout: `components/voucher-print.css` — A4 layout, signature zones, logo placement
- Amount-in-words generator: `components/amount-words.js` — KHR Khmer + USD English
- KHQR generator wrapper: `components/khqr-generator.js` — wraps KHQR SDK

### File Checklist

**New files to create (from near-scratch — existing folder has only 2 sparse files):**
- [ ] `frontend/roles/10-apar-accountant/dashboard.html`
- [ ] `frontend/roles/10-apar-accountant/ar/ar.html`
- [ ] `frontend/roles/10-apar-accountant/ar/create-payment.html`
- [ ] `frontend/roles/10-apar-accountant/ar/view-payment.html`
- [ ] `frontend/roles/10-apar-accountant/ap/ap.html`
- [ ] `frontend/roles/10-apar-accountant/ap/create-voucher.html`
- [ ] `frontend/roles/10-apar-accountant/ap/view-voucher.html`
- [ ] `frontend/roles/10-apar-accountant/bank-recon/bank-recon.html`
- [ ] `frontend/roles/10-apar-accountant/reports/reports.html`
- [ ] `portal.js` → add `apPortal` config block
- [ ] `components/aging-colors.css` (new shared component)
- [ ] `components/voucher-print.css` (new shared component)
- [ ] `components/amount-words.js` (new shared component)
- [ ] `components/khqr-generator.js` (KHQR integration wrapper)
