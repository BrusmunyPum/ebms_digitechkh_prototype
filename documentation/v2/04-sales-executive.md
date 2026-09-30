# Sales Executive — v2 UI/UX Design Plan

> **Portal ID:** `sePortal`
> **Existing Folder:** `frontend/roles/04-sales-executive/`
> **Last Updated:** 2026-09-25
> **Archetype:** B — Action & Pipeline Engine

---

## 1. Role Identity

| Property | Value |
|---|---|
| **Archetype** | B — Action & Pipeline Engine |
| **Primary Color** | Deep Navy `#1e3a5f` |
| **Accent Color** | Emerald Green `#10b981` (positive metrics, success states) |
| **Warning/Overdue Color** | Amber `#f59e0b` |
| **Danger Color** | Rose `#f43f5e` |
| **Background Tone** | Light slate `#f1f5f9` with white cards |
| **UI Style** | Action-forward: large CTAs, Kanban-style status chips, compact data tables, quick-form drawers |
| **Font Weight Usage** | Bold `700` for totals, amounts, customer names; Regular `400` for metadata/dates; Medium `500` for labels |
| **Key Persona** | The Deal Maker — faces customers directly, creates quotes, issues invoices, tracks follow-ups, earns commission. Needs speed and clarity. Does NOT have financial reporting access. |

### Critical Data Rule

> **ABSOLUTE RESTRICTION:** Purchase cost price (`ថ្លៃដើមទិញ`) must **NEVER** appear on any page, component, table column, form field, tooltip, export, or print output for this role. This is a hard permission boundary enforced at both UI layer and data layer. The Sales Executive sees ONLY selling prices defined by the business.

---

## 2. Sidebar Navigation

Maximum 3 items. All labels in Khmer.

| # | ID | Label (KH) | Icon (MDI) | href Target | Badge/Alert |
|---|---|---|---|---|---|
| 1 | `nav-dashboard` | ផ្ទាំងការងារ | `mdi:briefcase-account-outline` | `dashboard.html` | None |
| 2 | `nav-customers` | អតិថិជនរបស់ខ្ញុំ | `mdi:account-multiple-outline` | `customers/customers.html` | None |
| 3 | `nav-documents` | ឯកសារលក់ | `mdi:file-document-edit-outline` | `quotes/quotes.html` | Yes — count of documents pending approval (orange dot) |

### Sidebar Design Notes

- Sidebar width: `240px` desktop, collapses to icon rail `56px` on tablet
- Active item: left border `4px solid #1e3a5f`, background `#e8edf4`
- Badge (item 3): small orange pill with number of pending-approval documents
- The old v1 separate sidebar items for Quotes and Invoices are **removed** — they are merged under item 3 with in-page tab switching
- Portal footer (bottom of sidebar): logged-in user name, role label `អ្នកលក់`, logout icon button

---

## 3. Pages & Layouts

---

### 3.1 Dashboard — My Workspace (`dashboard.html`)

**Purpose:** Give the Sales Executive an immediate, actionable view of their current workday — quota progress, who to call, and what documents need action — without any historical charts or cost data.

**Layout:** Single-column content area, full width (`w-full`, no `max-w-* mx-auto` — GEMINI.md full-width rule). No sidebar interference. Sections stack vertically with `24px` gap between cards. Page header shows greeting: `ជំរាបសួរ, [First Name]! 👋` with today's date in Khmer format.

---

#### Section A — Hero Action Zone

- **Position:** Top of page, immediately below the page header
- **Layout:** Two large side-by-side primary action buttons in a `2-column flex row`, full width of the content area
- **These are the largest, most prominent elements on the entire page**

**Button 1: `+ បង្កើតសម្រង់តម្លៃថ្មី` (New Quote)**
- Background: `#1e3a5f` (Navy)
- Icon: `mdi:file-plus-outline` (left of label)
- Height: `72px` minimum
- Font size: `18px`, weight `600`
- On click: Navigate to `quotes/create-quote.html`

**Button 2: `+ ចេញវិក្កយបត្រថ្មី` (New Invoice)**
- Background: `#10b981` (Emerald)
- Icon: `mdi:receipt-text-plus-outline` (left of label)
- Height: `72px` minimum
- Font size: `18px`, weight `600`
- On click: Navigate to `invoices/create-invoice.html`

**Rules/Constraints:**
- These buttons must remain visible above the fold at all screen sizes ≥ 768px
- No other action should visually compete with these two buttons at the top

---

#### Section B — Monthly Quota Progress

- **Component:** White card with `1px #e2e8f0` border, `12px` border-radius, `24px` padding
- **Card Header:** `ការវាស់ស្ទង់ប្រចាំខែ — [Month Name KH]`

**Sub-elements inside card:**

1. **Progress Bar**
   - Full-width horizontal bar, height `16px`, rounded caps
   - Fill color: `#10b981` (emerald) if ≥ 80%, `#f59e0b` (amber) if 50–79%, `#f43f5e` (rose) if < 50%
   - Label above bar: ` досягнуто X% នៃគោលដៅ`
   - Track background: `#e2e8f0`

2. **Metric Row** (3 columns, equal width, below the bar)
   - **Sold Amount:** label `ចំនួនដែលបានលក់`, value in large bold USD format e.g. `$12,450`
   - **Monthly Target:** label `គោលដៅប្រចាំខែ`, value e.g. `$20,000`
   - **Commission Estimate:** label `កំណត់ប្រាក់កម្រៃ (ប្រហាក់ប្រហែល)`, value in emerald color e.g. `$245`

3. **Data Source:** Pulled from current logged-in user's assigned monthly quota in `data.js` / backend. Commission calculation is: `(sold_amount × commission_rate)%`. Commission rate is defined per user profile.

**Rules/Constraints:**
- Target and commission figures are read-only — Sales Executive cannot edit these
- If quota is not set for the month, display placeholder: `គោលដៅប្រចាំខែមិនទាន់ត្រូវបានកំណត់ — សូមទាក់ទង Sales Manager`
- **NO revenue history charts** — quota section shows ONLY current month

---

#### Section C — Follow-up Call List

- **Component:** White card, same styling as Section B
- **Card Header:** `ការហៅទូរស័ព្ទតាមដាន (ថ្ងៃនេះ)` with a count badge showing number of items
- **Layout:** Vertical list of compact rows

**Each row contains:**
- **Customer name** (bold, `14px`)
- **Company name** (if applicable, `12px` gray)
- **Reason label** (status chip): `AR លើស` (red chip) / `ការងើបឡើងវិញ` (amber chip) / `ការហៅតាមដានតាមកាលវិភាគ` (blue chip)
- **Outstanding amount** (if overdue AR): displayed in rose color e.g. `$1,200 ជំពាក់`
- **[📞 ខល]** button — links to `tel:[phone_number]`, styled as small teal outlined button

**List Rules:**
- Sorted by: Overdue AR customers first (descending amount), then scheduled follow-ups
- Maximum displayed: 8 rows; if more, show `[មើលទាំងអស់ →]` link at bottom
- If no follow-ups today: show empty state illustration with text `មិនមានការហៅតាមដានថ្ងៃនេះ 🎉`
- Phone numbers are masked to only show full number when [📞 ខល] is tapped (privacy UX)

**Data Source:** Overdue invoices assigned to this sales exec's customers + manually scheduled callbacks stored in customer notes

---

#### Section D — Pending Quote Approvals

- **Component:** White card, same styling
- **Card Header:** `សម្រង់តម្លៃរង់ចាំអនុម័ត` with count badge

**Each row contains:**
- Quote number (e.g. `QT-2026-0142`) — clickable link to `quotes/view-quote.html?id=...`
- Customer name
- Quote amount (USD)
- Date submitted
- **Status chip:** `⏳ រង់ចាំ` (amber), `✅ អនុម័ត` (green), `❌ បដិសេធ` (red)
- **[ពិនិត្យ →]** text link on the right

**Rules/Constraints:**
- Only shows quotes submitted by the currently logged-in Sales Executive
- Maximum 5 rows; `[មើលទាំងអស់ →]` links to `quotes/quotes.html?tab=quotes&status=pending`
- If a quote is rejected, the chip turns red with tooltip: `ត្រូវបានបដិសេធដោយ Sales Manager — [reason if provided]`
- Approved quotes show `[បំលែងទៅជាវិក្កយបត្រ]` quick action button

---

**Actions on Dashboard:**
- `[+ បង្កើតសម្រង់តម្លៃថ្មី]` → `quotes/create-quote.html`
- `[+ ចេញវិក្កយបត្រថ្មី]` → `invoices/create-invoice.html`
- `[📞 ខល]` → `tel:[phone]`
- `[ពិនិត្យ →]` → `quotes/view-quote.html?id=...`
- `[បំលែងទៅជាវិក្កយបត្រ]` → triggers conversion workflow

**Rules/Constraints:**
- NO ECharts, NO chart.js, NO canvas elements anywhere on this page
- NO revenue history visualization of any kind
- NO cost prices, margin %, or purchase price data
- Page must load in under 2 seconds (minimal DOM weight)

**Files to Create/Modify:**
- `frontend/roles/04-sales-executive/dashboard.html`

---

### 3.2 My Customer Portfolio (`customers/customers.html`)

**Purpose:** Allow the Sales Executive to browse, search, and manage their assigned customer accounts with at-a-glance AR status and credit usage.

**Layout:** Full content area. Top toolbar row → Filter pills row → Card grid body.

---

#### Section A — Page Header & Top Toolbar

- Page title: `អតិថិជនរបស់ខ្ញុំ` (left)
- Right side: `[+ បន្ថែមអតិថិជន]` button (Navy background, `mdi:account-plus-outline` icon)
- Below title: Search bar — full width input with `mdi:magnify` icon prefix
  - Placeholder: `ស្វែងរកតាមឈ្មោះ, ទូរស័ព្ទ, ឬឈ្មោះក្រុមហ៊ុន...`
  - Search triggers live filter (debounced 300ms) — no page reload

---

#### Section B — Filter Pills

- Horizontal pill row below search
- Pills: `ទាំងអស់` | `សកម្ម` | `AR ហួសកំណត់`
- Active pill: navy fill, white text; Inactive: white fill, navy border
- Selecting a filter updates the card grid below

---

#### Section C — Customer Card Grid

- **Grid:** `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`, gap `16px`
- Each customer is represented as a card:

**Card anatomy (each card):**

1. **Card Header Row:**
   - **Avatar/Initial:** 48×48px circle, background color auto-generated from customer name initial, white letter inside (e.g. "ស" for ស្រីពៅ)
   - **Customer Name** (bold `16px`, one line, ellipsis overflow)
   - **Tier Badge:** `ទូទៅ` (gray) / `លក់ដុំ` (blue) / `អ្នកចែកចាយ` (purple) — small pill chip

2. **Contact Row:**
   - Phone: `mdi:phone-outline` icon + phone number (clickable → `tel:`)
   - Last order date: `mdi:calendar-outline` icon + date in format `DD/MM/YYYY`

3. **AR Balance Row:**
   - Label: `AR ជំពាក់`
   - Amount: displayed in rose if > 0 (e.g. `$450`), emerald "✓ គ្មាន" if zero
   - If overdue (past due date): **bold red** with `⚠` icon

4. **Credit Limit Usage Bar:**
   - Label: `ការប្រើប្រាស់ Credit: $X / $Y`
   - Thin progress bar (`6px` height), fill: emerald if < 70%, amber if 70–90%, rose if > 90%
   - If no credit limit set: hide this row

5. **Card Footer — Action Buttons:**
   - `[មើល]` → `customers/view-customer.html?id=...`
   - `[សម្រង់]` → `quotes/create-quote.html?customer=...`
   - Styled as small outlined buttons, navy color

**Empty State:**
- If no customers match search/filter: illustration + text `រកមិនឃើញអតិថិជន — សូម[+ បន្ថែមអតិថិជន]`

**Rules/Constraints:**
- Only customers assigned to the current Sales Executive are shown (not all customers in the system)
- AR balance is read-only — cannot be modified here (managed by AR Accountant)
- Credit limit is read-only display only
- NO cost price data anywhere on this page

**Actions:**
- `[+ បន្ថែមអតិថិជន]` → `customers/create-customer.html`
- `[មើល]` → `customers/view-customer.html?id=...`
- `[សម្រង់]` → `quotes/create-quote.html?customer_id=...`

**Files to Create/Modify:**
- `frontend/roles/04-sales-executive/customers/customers.html`

---

### 3.3 Create & Edit Customer (`customers/create-customer.html` & `customers/edit-customer.html`)

**Purpose:** Collect and maintain customer account information for sales operations.

**Layout:** Full-width form (`w-full`). Single-column form with grouped sections separated by `<fieldset>` or labeled dividers.

---

#### Section A — Page Header

- Title: `បន្ថែមអតិថិជនថ្មី` (create) or `កែសម្រួលអតិថិជន — [Customer Name]` (edit)
- Breadcrumb: `អតិថិជនរបស់ខ្ញុំ → [Action]`
- Top-right: `[រក្សាទុក]` (Navy) + `[បោះបង់]` (outlined gray)

---

#### Section B — Basic Information (`fieldset: ព័ត៌មានមូលដ្ឋាន`)

| Field Label (KH) | Field Type | Validation |
|---|---|---|
| ឈ្មោះអតិថិជន (ខ្មែរ) | Text input | Required, max 100 chars |
| ឈ្មោះអតិថិជន (អង់គ្លេស) | Text input | Optional, max 100 chars |
| ឈ្មោះក្រុមហ៊ុន | Text input | Optional |
| លេខទូរស័ព្ទ | Tel input | Required, format `+855XXXXXXXXX` |
| អ៊ីម៉ែល | Email input | Optional, validated format |
| អាសយដ្ឋាន | Textarea (3 rows) | Optional |

---

#### Section C — Business Terms (`fieldset: លក្ខខណ្ឌពាណិជ្ជកម្ម`)

| Field Label (KH) | Field Type | Options / Validation |
|---|---|---|
| ប្រភេទអតិថិជន | Select dropdown | ទូទៅ / លក់ដុំ / អ្នកចែកចាយ |
| ដែនកំណត់ Credit | Number input | Default $0 (no credit); min 0 |
| លក្ខខណ្ឌទូទាត់ | Select dropdown | ទូទាត់ភ្លាម / Net 15 / Net 30 / Net 60 |

---

#### Section D — Pricing Notes (`fieldset: កំណត់ចំណាំតម្លៃ`)

| Field Label (KH) | Field Type | Notes |
|---|---|---|
| កំណត់ចំណាំការព្រមព្រៀងតម្លៃ | Textarea (5 rows) | Free text — for special pricing agreements with this customer |

- Help text below: `ឧ: ការផ្តល់ជូនភាគរយកាត់បន្ថយ ១០% លើការបញ្ជាទិញចំនួន ១០ ប្រអប់ ឬច្រើនជាងនេះ`

---

**edit-customer.html** differences:
- All fields pre-populated from existing customer record
- An additional read-only display row shows: `បង្កើតដោយ:`, `កាលបរិច្ឆេទបង្កើត:`, `ចំនួនការទិញ:`
- `[លុប]` button (danger/red outlined) appears in the footer — requires confirmation modal before deletion

**Rules/Constraints:**
- Sales Executive can only edit customers assigned to them
- Credit Limit field is editable by Sales Executive but changes may require GM/Admin approval (flag for review)
- All fields except phone are optional in edit mode
- **No cost price, no margin field, no purchase price anywhere on this form**

**Files to Create/Modify:**
- `frontend/roles/04-sales-executive/customers/create-customer.html`
- `frontend/roles/04-sales-executive/customers/edit-customer.html`

---

### 3.4 Customer Profile (`customers/view-customer.html`)

**Purpose:** Provide a full 360° view of a single customer's history, documents, and contact info — as seen by the Sales Executive.

**Layout:** Full-width page. Fixed header card at top, then tabbed content below.

---

#### Section A — Customer Profile Header Card

- Full-width card, navy left border `6px`
- Large avatar initial (64×64px)
- **Customer Name** (bold `24px`)
- **Tier Badge** (pill chip)
- **Status:** Active / Inactive (toggle — admin can deactivate)

**Contact Info Row:**
- Phone (clickable `tel:`)
- Email (clickable `mailto:`)
- Address (plain text)

**Stats Row (3 inline metrics):**
- `ចំនួនការទិញសរុប` — total invoice count for this customer
- `AR ជំពាក់` — current outstanding balance (rose if > 0)
- `ការទិញចុងក្រោយ` — date of last invoice

**Action Buttons (top-right of header):**
- `[✏️ កែសម្រួល]` → `customers/edit-customer.html?id=...`
- `[+ សម្រង់ថ្មី]` → `quotes/create-quote.html?customer_id=...`
- `[+ វិក្កយបត្រថ្មី]` → `invoices/create-invoice.html?customer_id=...`

---

#### Section B — Internal Tab Navigation

Three tabs rendered as a tab bar below the header card:

| Tab ID | Label (KH) | Content |
|---|---|---|
| `tab-history` | ប្រវត្តិការទិញ | Purchase history list |
| `tab-documents` | ឯកសារ | Quotes & Invoices for this customer |
| `tab-info` | ព័ត៌មានទូទៅ | Customer details read-only view |

**Tab: ប្រវត្តិការទិញ**
- Table with columns: `#វិក្កយបត្រ` | `កាលបរិច្ឆេទ` | `ចំនួនទឹកប្រាក់` | `ស្ថានភាព` | `[មើល]`
- Status chips: `បានទូទាត់` (green) / `រង់ចាំ` (amber) / `ហួសកំណត់` (red)
- Sorted by date descending (newest first)
- **Absolutely NO cost column, NO margin column, NO purchase price anywhere**

**Tab: ឯកសារ**
- Combined list of all Quotes and Invoices for this customer
- Each row: `ប្រភេទ` (Quote / Invoice chip) | `លេខ` | `កាលបរិច្ឆេទ` | `ចំនួនទឹកប្រាក់` | `ស្ថានភាព` | `[មើល]`
- Filter pills inside tab: `ទាំងអស់` / `សម្រង់` / `វិក្កយបត្រ`

**Tab: ព័ត៌មានទូទៅ**
- Read-only display of all customer fields from the create/edit form
- Rendered as labeled key-value pairs (two-column layout)
- `[✏️ កែសម្រួល]` link at the bottom

**Rules/Constraints:**
- This page is READ-ONLY by default (edit happens on separate edit page)
- AR balance is read-only display
- No cost price data on any tab

**Files to Create/Modify:**
- `frontend/roles/04-sales-executive/customers/view-customer.html`

---

### 3.5 Sales Documents Hub (`quotes/quotes.html`)

**Purpose:** Central hub for all quotes and invoices created by the Sales Executive, with tab-based switching between document types.

**Layout:** Standard content area. Page-level tab bar near the top. Table content below changes based on active tab. Single `[+ បង្កើត]` button label changes with active tab.

---

#### Section A — Page Header & Primary Action

- Page title: `ឯកសារលក់`
- Right side: dynamic create button
  - When Quotes tab active: `[+ បង្កើតសម្រង់]` → `quotes/create-quote.html`
  - When Invoices tab active: `[+ ចេញវិក្កយបត្រ]` → `invoices/create-invoice.html`
  - Button: Navy background, `mdi:plus` icon

---

#### Section B — Page-Level Sub-Navigation Tabs

- Tab bar rendered below page header
- **Tab 1:** `📄 សម្រង់តម្លៃ` (Quotes)
- **Tab 2:** `🧾 វិក្កយបត្រ` (Invoices)
- Active tab: navy bottom border `3px`, bold label
- Tab switching is **JavaScript-only** — does NOT reload the page. It toggles visibility of the two content panels below.
- URL updates via `?tab=quotes` or `?tab=invoices` (pushState) for bookmarkability

---

#### Section C — Filter Bar (shared, above table)

- **Date Range:** From date picker → To date picker (defaults to current month)
- **Status Filter:** `ទាំងអស់` / status-specific options (differ per tab — see below)
- Apply button or auto-apply on change

---

#### Section D — Quotes Tab Content

**Table columns:**

| Column | Details |
|---|---|
| `#សម្រង់` | Quote number, e.g. `QT-2026-0142`, clickable link to view-quote.html |
| `អតិថិជន` | Customer name |
| `កាលបរិច្ឆេទ` | Created date |
| `ចំនួនទឹកប្រាក់` | Grand total in USD (selling price only) |
| `ស្ថានភាព` | Status chip: `ព្រាង` / `រង់ចាំ` / `អនុម័ត` / `បានបដិសេធ` / `បំលែងរួច` |
| `⋮` | Actions menu |

**Status chip colors:**
- `ព្រាង` (Draft) — slate gray
- `រង់ចាំ` (Pending) — amber
- `អនុម័ត` (Approved) — emerald green
- `បានបដិសេធ` (Rejected) — rose red
- `បំលែងរួច` (Converted) — navy blue

**⋮ Actions menu options (context-sensitive):**
- Draft: `[កែ]` `[ដាក់ស្នើ]` `[លុប]`
- Pending: `[មើល]` only (cannot edit while pending)
- Approved: `[មើល]` `[បំលែងទៅជាវិក្កយបត្រ]`
- Rejected: `[មើល]` `[ចម្លង & កែ]`
- Converted: `[មើល]` (read-only)

**Status filter options for Quotes tab:** ទាំងអស់ / ព្រាង / រង់ចាំ / អនុម័ត / បដិសេធ

---

#### Section E — Invoices Tab Content

**Table columns:**

| Column | Details |
|---|---|
| `#វិក្កយបត្រ` | Invoice number, e.g. `INV-2026-0088`, clickable link |
| `អតិថិជន` | Customer name |
| `កាលបរិច្ឆេទ` | Issue date |
| `ថ្ងៃផុតកំណត់` | Due date (bold red if overdue) |
| `ចំនួនទឹកប្រាក់` | Grand total USD |
| `ស្ថានភាព` | `រង់ចាំទូទាត់` / `បានទូទាត់ដោយផ្នែក` / `បានទូទាត់ពេញ` / `ហួសកំណត់` |
| `⋮` | Actions menu |

**⋮ Actions menu options:**
- Unpaid: `[មើល]` `[ចុះផ្ញើការទូទាត់]` `[បោះពុម្ព]`
- Paid: `[មើល]` `[បោះពុម្ព]`

**Status filter for Invoices tab:** ទាំងអស់ / រង់ចាំ / ទូទាត់ដោយផ្នែក / បានទូទាត់ / ហួសកំណត់

---

**Rules/Constraints:**
- Only shows documents created by the currently logged-in Sales Executive
- Table rows are NOT editable inline — all editing happens on dedicated edit pages
- **No cost price column, no margin column anywhere**
- Pagination: 20 rows per page, page controls at bottom

**Files to Create/Modify:**
- `frontend/roles/04-sales-executive/quotes/quotes.html`

---

### 3.6 Create & Edit Quote (`quotes/create-quote.html` & `quotes/edit-quote.html`)

**Purpose:** Allow Sales Executive to compose a formal quote for a customer with line items, financial summary, and submit for approval.

**Layout:** Full-width form page. Two visual zones: top customer/meta section, then line items table, then financial summary footer panel. Full width (`w-full`).

---

#### Section A — Page Header

- Title: `បង្កើតសម្រង់តម្លៃថ្មី` (create) or `កែសម្រួលសម្រង់ #QT-XXXX` (edit)
- Breadcrumb: `ឯកសារលក់ → សម្រង់`
- Top-right action buttons: `[រក្សាទុក ព្រាង]` (outlined navy) + `[ដាក់ស្នើសុំអនុម័ត]` (navy fill)

---

#### Section B — Quote Metadata

Two-column row:

**Left column:**
- **Customer Selector:** Custom searchable dropdown
  - Shows: customer name + tier badge in dropdown options
  - On selection: auto-fills customer's payment terms below
  - Placeholder: `ជ្រើសរើសអតិថិជន...`
  - Required field

**Right column:**
- **Quote Date:** Date picker (default: today)
- **Expiry Date:** Date picker (default: today + 30 days)
- **Payment Terms:** Auto-filled from customer, but editable dropdown
- **Reference/Notes:** Short text input (optional internal reference)

---

#### Section C — Line Items Table

- **Header label:** `បញ្ជីទំនិញ / សេវាកម្ម`
- `[+ បន្ថែមបន្ទាត់]` button (right-aligned, above table)

**Table columns:**

| Column | Type | Rules |
|---|---|---|
| `#` | Row number (auto) | Read-only |
| `ទំនិញ / សេវាកម្ម` | Product search dropdown | Required; search by name or SKU; shows product name + SKU only — **NO cost price in dropdown** |
| `ចំនួន` | Number input | Required; min 1; integer for stock items |
| `តម្លៃឯកតា` | Currency input (USD) | Required; pre-fills with product's selling price; **editable within allowed discount range** |
| `សរុប` | Auto-calculated (`qty × unit_price`) | Read-only, right-aligned |
| `⊗` | Delete row button | Removes line item; disabled if only 1 row remains |

- **STRICT RULE:** There is absolutely NO "ថ្លៃដើម" (cost) column, NO "ចំណេញ" (profit) column, NO margin display of any kind in this table
- Minimum 1 line item row required
- Rows can be drag-reordered (optional enhancement)
- On product selection: unit price auto-fills from the product's defined selling price
- Unit Price field allows Sales Executive to lower the price but CANNOT go below the floor price defined by Sales Manager (validation on submit)

---

#### Section D — Financial Summary Panel

- Positioned below the line items table
- Right-aligned panel, max-width `360px`, floating right
- Background: `#f8fafc` (light), border `1px #e2e8f0`, border-radius `8px`, padding `20px`

**Summary rows (label + value, right-aligned):**

| Label (KH) | Calculation |
|---|---|
| សរុបរង (Subtotal) | Sum of all line totals |
| វិភាគទានជ្រៅ (Down Payment) | Optional input field — amount pre-paid by customer |
| ការបញ្ចុះតម្លៃ (Special Discount) | Optional % or fixed amount input |
| VAT 10% | Calculated on (Subtotal − Discount) |
| **សរុបសរុប (Grand Total)** | **Bold `20px`, navy color — the final amount** |

- VAT: checkbox toggle `[✓ អនុវត្ត VAT 10%]` — checked by default for non-exempt customers
- Down payment and discount fields are optional and default to 0

---

**edit-quote.html** differences:
- All fields pre-populated
- If status is `Pending` or `Approved`: form is read-only, redirect to view-quote.html instead
- If status is `Rejected`: form is editable and shows rejection reason at top in red alert box

**Rules/Constraints:**
- Cannot submit if no customer selected or no line items
- Unit price cannot be less than product floor price (client-side + server-side validation)
- Draft saves without validation; Submit for Approval validates all required fields
- After submit, quote status changes to `រង់ចាំ` — no further edits until reviewed
- **No cost price, purchase price, or margin anywhere on this page**

**Files to Create/Modify:**
- `frontend/roles/04-sales-executive/quotes/create-quote.html`
- `frontend/roles/04-sales-executive/quotes/edit-quote.html`

---

### 3.7 View Quote & Print (`quotes/view-quote.html`)

**Purpose:** Display the finalized quote in a printable A4 format with full status tracking timeline.

**Layout:** Two zones: screen view (with actions header) + embedded A4 preview panel.

---

#### Section A — Screen Header (non-printable)

- Quote number (large, bold): `QT-2026-0142`
- Current status chip (large)
- Action buttons (right):
  - **Draft:** `[✏️ កែ]` `[🗑️ លុប]` `[ដាក់ស្នើ]`
  - **Pending:** `[🖨️ បោះពុម្ព]` (no edit)
  - **Approved:** `[🖨️ បោះពុម្ព]` `[🔄 បំលែងទៅជាវិក្កយបត្រ]`
  - **Rejected:** `[✏️ កែ]` `[ចម្លង]`
  - **Converted:** `[🖨️ បោះពុម្ព]` `[→ មើលវិក្កយបត្រ]`

---

#### Section B — Status Timeline

- Horizontal stepper/timeline component
- Steps: `ព្រាង` → `រង់ចាំ` → `អនុម័ត` → `បំលែងទៅជាវិក្កយបត្រ`
- Completed steps: filled navy circle with checkmark
- Current step: pulsing navy outline
- Rejected: red X on the rejected step with rejection note below
- Each step shows date/time and actor name if completed

---

#### Section C — A4 Printable Document Preview

- White card with `box-shadow` simulating paper on screen
- Width: `794px` (A4 equivalent at 96dpi), centered
- Padding: `40px` all sides

**A4 document structure:**

1. **Letterhead:**
   - Company logo (left)
   - Company name, address, phone, email (right)
   - Document title: `QUOTATION / សម្រង់តម្លៃ` (centered, large)

2. **Document Info block:**
   - Quote #, Date, Expiry Date
   - Customer name, address, contact

3. **Line Items Table:**
   - Columns: `#` | `ទំនិញ / សេវាកម្ម` | `ចំនួន` | `តម្លៃឯកតា` | `សរុប`
   - **NO cost column in print output**
   - Table footer: Subtotal, Discount, VAT, Grand Total

4. **Terms & Signature block:**
   - Payment terms
   - Validity: quote valid until [expiry date]
   - Signature lines: Customer / Sales Executive / Approved By

**Print action:** `window.print()` with `@media print` CSS that hides everything except the A4 panel

**Rules/Constraints:**
- View page is completely read-only
- Convert to Invoice button is only visible when status = Approved
- Convert action creates a new invoice pre-populated with all quote data and redirects to `invoices/view-invoice.html?id=...`
- Print output must not include any system UI elements
- **No cost price anywhere in view or print**

**Files to Create/Modify:**
- `frontend/roles/04-sales-executive/quotes/view-quote.html`

---

### 3.8 Create & Edit Invoice (`invoices/create-invoice.html` & `invoices/edit-invoice.html`)

**Purpose:** Create a formal invoice for a customer, either from scratch or converted from an approved quote.

**Layout:** Identical structure to create-quote.html / edit-quote.html with the following differences:

---

**Differences from Quote form:**

| Property | Quote | Invoice |
|---|---|---|
| Page title | `បង្កើតសម្រង់` | `ចេញវិក្កយបត្រ` |
| Document number prefix | `QT-` | `INV-` |
| Date fields | Quote Date + Expiry Date | Invoice Date + Due Date |
| Submit button | `[ដាក់ស្នើសុំអនុម័ត]` | `[ចេញវិក្កយបត្រ]` (no approval needed) |
| Approval workflow | Required | Not required — direct issuance |
| Status on save | `ព្រាង` / `រង់ចាំ` | `រង់ចាំទូទាត់` immediately |

**When created from a converted quote:**
- Customer, line items, discount, VAT all pre-filled from the approved quote
- A reference field shows: `បំលែងពី: QT-2026-0142`
- User reviews and confirms, then issues

**Rules/Constraints:**
- Invoice cannot be deleted once issued (only voided with reason — by GM/Admin)
- Sales Executive can issue invoices directly without Sales Manager approval
- **No cost price, purchase price, or margin anywhere**

**Files to Create/Modify:**
- `frontend/roles/04-sales-executive/invoices/create-invoice.html`
- `frontend/roles/04-sales-executive/invoices/edit-invoice.html`

---

### 3.9 View Invoice (`invoices/view-invoice.html`)

**Purpose:** Display the issued invoice with payment status and allow the Sales Executive to record a customer payment.

**Layout:** Same as view-quote.html with the addition of a Payment Recording section.

---

#### Section A — Screen Header (non-printable)

- Invoice number (large bold): `INV-2026-0088`
- Status chip (large): `រង់ចាំទូទាត់` / `ទូទាត់ដោយផ្នែក` / `បានទូទាត់ពេញ` / `ហួសកំណត់`
- Action buttons: `[🖨️ បោះពុម្ព]` + `[✏️ កែ]` (if still editable) + `[ចុះផ្ញើការទូទាត់]`

---

#### Section B — Payment Recording Section

- Shown below the A4 document preview, on screen only (not printed)
- **Card title:** `ការទូទាត់ (Payments Received)`
- Payment history table:
  - Columns: `កាលបរិច្ឆេទ` | `ចំនួន` | `វិធីទូទាត់` | `ចំណាំ` | `[បន្ថែម]`
  - Existing payments listed (if any)
  - Outstanding balance shown in large bold: `នៅជំពាក់: $XXX`

- **[+ ចុះផ្ញើការទូទាត់]** button opens an inline form or modal:
  - Amount received (currency input)
  - Payment method: `សាច់ប្រាក់` / `KHQR` / `ABA/WING` / `ការផ្ទេរប្រាក់`
  - Payment date (default today)
  - Reference / note (optional)
  - `[រក្សាទុក]` button

- On saving payment: outstanding balance updates, status changes automatically:
  - If amount paid ≥ grand total → status → `បានទូទាត់ពេញ`
  - If amount paid > 0 but < grand total → status → `ទូទាត់ដោយផ្នែក`

**Rules/Constraints:**
- Payment recording by Sales Executive goes through to AR Accountant for reconciliation
- Sales Executive CANNOT delete a recorded payment (only AR Accountant / GM can)
- **No cost price anywhere**
- Overpayment flag: if payment > grand total, show warning: `ការទូទាត់ហួស — សូមត្រួតពិនិត្យ`

---

#### Section C — A4 Printable Document

- Same structure as view-quote.html A4 panel
- Header title: `INVOICE / វិក្កយបត្រ`
- Added: `ស្ថានភាព:` watermark diagonal text for PAID invoices (`PAID` in large transparent green)
- Payment summary shown at bottom of A4 (amounts received, outstanding)
- **No cost price in print output**

**Files to Create/Modify:**
- `frontend/roles/04-sales-executive/invoices/view-invoice.html`

---

## 4. UI Identity Details

| Property | Value |
|---|---|
| **Primary Color** | `#1e3a5f` (Deep Navy) — used for headers, active nav, primary buttons, borders |
| **Accent Color** | `#10b981` (Emerald) — positive metrics, "paid" status, commission amounts, success states |
| **Warning Color** | `#f59e0b` (Amber) — pending approvals, quota below 80%, moderate AR |
| **Danger Color** | `#f43f5e` (Rose) — overdue AR, rejected quotes, quota below 50%, critical alerts |
| **Background** | `#f1f5f9` (Light Slate) — main page background |
| **Card Background** | `#ffffff` with `box-shadow: 0 1px 3px rgba(0,0,0,0.08)` |
| **Border Color** | `#e2e8f0` |
| **Font** | Inter or Noto Sans Khmer (system fallback) |
| **Font Weights** | Amounts & totals: `700`; Card labels & table headers: `600`; Body text: `400`; Metadata: `400` in `#64748b` |

### Unique Design Elements

- **Dual hero CTA buttons** on dashboard — a design signature of this role not found in any other role
- **Quota progress bar** with color-coded fill — gives immediate emotional feedback on performance
- **Customer card grid** (not table) — visual, scannable, relationship-oriented view
- **Merged document hub** with tab switching — reduces sidebar complexity while maintaining full functionality
- **Status timeline stepper** on view pages — pipeline-oriented workflow visualization
- **Dynamic CTA label** that changes based on active tab context

---

## 5. Developer Notes

### portal.js Changes

- Update `sePortal` nav config to **3 items only** (remove separate Quotes and Invoices nav items from v1)
- Item 3 (`nav-documents`) href points to `quotes/quotes.html`
- Badge on item 3: count of `documents where status === 'pending_approval'` for this user

```
sePortal.nav = [
  { id: 'nav-dashboard',  label: 'ផ្ទាំងការងារ',     icon: 'mdi:briefcase-account-outline',    href: 'dashboard.html' },
  { id: 'nav-customers',  label: 'អតិថិជនរបស់ខ្ញុំ', icon: 'mdi:account-multiple-outline',      href: 'customers/customers.html' },
  { id: 'nav-documents',  label: 'ឯកសារលក់',          icon: 'mdi:file-document-edit-outline',   href: 'quotes/quotes.html', badge: true }
]
```

### data.js Fields Required

- `sales_executives[]` → `{ id, name, assigned_customers[], monthly_target, commission_rate }`
- `customers[]` → `{ id, name_kh, name_en, company, phone, email, address, tier, credit_limit, payment_terms, pricing_notes, ar_balance, ar_due_date, assigned_to_se_id }`
- `quotes[]` → `{ id, quote_number, customer_id, se_id, date, expiry_date, line_items[], subtotal, discount, down_payment, vat_amount, grand_total, status, rejection_reason, converted_to_invoice_id }`
- `invoices[]` → `{ id, invoice_number, customer_id, se_id, date, due_date, line_items[], subtotal, discount, vat_amount, grand_total, status, converted_from_quote_id, payments[] }`
- `products[]` → `{ id, sku, name, selling_price, floor_price, stock_qty }` — **NO `cost_price` field exposed to SE role**

### Sub-Tab JavaScript (quotes.html)

```javascript
// Tab switcher — no page reload
document.querySelectorAll('.sub-nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab; // 'quotes' or 'invoices'
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('hidden', p.id !== `panel-${target}`));
    document.querySelectorAll('.sub-nav-tab').forEach(t => t.classList.toggle('active', t === tab));
    // Update create button label
    document.querySelector('#btn-create').textContent = target === 'quotes' ? '+ បង្កើតសម្រង់' : '+ ចេញវិក្កយបត្រ';
    document.querySelector('#btn-create').href = target === 'quotes' ? 'create-quote.html' : '../invoices/create-invoice.html';
    // Update URL without reload
    history.pushState({}, '', `?tab=${target}`);
  });
});
```

### Permission Guards

- Any API call or data.js lookup for products must **strip `cost_price` field** before returning to SE role
- Add a global check in `sePortal` init: if any DOM element with class `cost-price-field` is found, throw a console error and hide the element
- Same guard applies to `margin_pct`, `purchase_price`, `cost_per_unit`

### Shared Components

- `components/status-chip.html` — reusable status chip with color mapping
- `components/line-items-table.html` — shared between create-quote and create-invoice (parametrized)
- `components/a4-document.html` — shared print layout shell
- `components/customer-selector.html` — searchable dropdown with customer data

### Weekly ECharts Chart

- **Remove entirely** from `dashboard.html` — do not replace with any other chart
- The quota progress bar (pure CSS/HTML) is the ONLY visualization on the dashboard

---

*End of Sales Executive v2 UI/UX Design Plan*
