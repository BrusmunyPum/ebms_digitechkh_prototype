# PLANNING-16: Authority Thresholds & Notification Trigger Matrix
**Version:** 2.0 | **Date:** 2026-09-29 | **Status:** Planning — No Code

---

## Part A: Approval Authority Thresholds

Single source of truth for all financial approval limits. All amounts in USD.

### A1. Sales Documents

| Document | Amount Range | Approver Required | Notes |
|---|---|---|---|
| Quotation | ≤ $5,000 | Sales Manager | Default flow — no self-approval at any amount (see `15-approval-state-machine.md` principle 3) |
| Quotation | $5,001 – $20,000 | Sales Manager + General Manager | SM approves first, then GM |
| Quotation | > $20,000 | SM + GM + Director | 3-level sign-off |
| Special Discount | Any amount | Sales Manager | SE cannot grant discount without SM approval |
| Credit Note | < $500 | Sales Manager | |
| Credit Note | > $500 | Sales Manager + CA | CA reviews for financial impact |

### A2. Procurement Documents

| Document | Amount Range | Approver Required | Notes |
|---|---|---|---|
| Purchase Request | ≤ $10,000 | General Manager | Default flow — no self-approval at any amount |
| Purchase Request | $10,001 – $50,000 | GM + Director | 2-level |
| Purchase Request | > $50,000 | GM + Director + Board | Not in prototype scope |
| Purchase Order | Any amount | Auto after PR approved | No separate PO approval in prototype |
| Payment Voucher | < $5,000 | Chief Accountant | |
| Payment Voucher | $5,001 – $20,000 | CA + GM | |
| Payment Voucher | > $20,000 | CA + GM + Director | |
| WHT Override | Any | CA only | If standard rate is waived or changed |

### A3. Stock & Operations

| Document | Amount Range | Approver Required | Notes |
|---|---|---|---|
| Stock Adjustment | Qty ≤ 10 units | Warehouse Manager | Minor correction |
| Stock Adjustment | Qty > 10 units | WM + Procurement Manager | Large adjustment needs PM awareness |
| Reorder Suggestion | Any | Warehouse Manager | WM approves suggestion → PM creates PR |
| Write-off | Any | WM + CA | Damaged/expired goods removal |

### A4. Prototype Simplification

For the v2 static prototype, the following simplifications apply (to reduce mock data complexity):

- **"Director" is not a separate role.** There is no Director portal among the 12 roles. Any "Director" approval level above is performed from the General Manager portal (`gmPortal`) as a second, separately recorded sign-off with `approvalLevel: "DIRECTOR"` in the audit trail. The 4-signature block's "approving director" line is filled from this sign-off.

- Quotations always route through SM approval regardless of amount.
- PRs always route through GM approval regardless of amount.
- PVs always route through CA approval regardless of amount.
- Multi-level approvals (amount > threshold) are shown in the `viewDetail` audit trail as two sequential approvals, not a parallel flow.

---

## Part B: Notification Trigger Matrix

Every event below must generate a notification entry in the receiving role's notification panel. Format: `{type, entityId, entityType, message (Khmer), triggeredBy, triggeredAt, isRead}`.

### B1. Sales Workflow Notifications

| Event | Sender Role | Receiver Role(s) | Khmer Message Template |
|---|---|---|---|
| Quotation submitted for approval | SE | SM | "សម្រង់តម្លៃ {QT-ID} ត្រូវការការអនុម័ត" |
| Quotation approved | SM | SE | "សម្រង់តម្លៃ {QT-ID} ត្រូវបានអនុម័ត" |
| Quotation rejected | SM | SE | "សម្រង់តម្លៃ {QT-ID} ត្រូវបានបដិសេធ: {reason}" |
| Quotation accepted by customer | Customer | SE, SM | "អតិថិជនបានយល់ព្រមលើសម្រង់តម្លៃ {QT-ID}" |
| Quotation declined by customer | Customer | SE, SM | "អតិថិជនបានបដិសេធសម្រង់តម្លៃ {QT-ID}" |
| Invoice created from quotation | SE | SM, CA | "វិក្កយបត្រ {INV-ID} ត្រូវបានបង្កើតពី {QT-ID}" |
| Invoice overdue | System | SE, SM, CA, APAR | "វិក្កយបត្រ {INV-ID} ហួសកំណត់ +{days} ថ្ងៃ" |
| Payment received (cash) | CAS | SM, SE, CA | "ការទូទាត់ ${amount} ទទួលបានសម្រាប់ {INV-ID}" |
| Credit Note submitted | SE | SM | "លិខិតឥណទាន {CN-ID} ត្រូវការការអនុម័ត" |
| Credit Note approved | SM | SE, APAR | "លិខិតឥណទាន {CN-ID} ត្រូវបានអនុម័ត" |

### B2. Procurement Workflow Notifications

| Event | Sender Role | Receiver Role(s) | Khmer Message Template |
|---|---|---|---|
| PR submitted for approval | PM | GM | "សំណើទិញទំនិញ {PR-ID} ត្រូវការការអនុម័ត" |
| PR approved | GM | PM | "សំណើទិញទំនិញ {PR-ID} ត្រូវបានអនុម័ត" |
| PR rejected | GM | PM | "សំណើទិញទំនិញ {PR-ID} ត្រូវបានបដិសេធ: {reason}" |
| PO sent to supplier | PM | WM | "ការបញ្ជាទិញ {PO-ID} ត្រូវបានផ្ញើជូនអ្នកផ្គត់ផ្គង់" |
| PO confirmed by supplier | Supplier | PM, WM | "ការបញ្ជាទិញ {PO-ID} ត្រូវបានបញ្ជាក់ដោយអ្នកផ្គត់ផ្គង់" |
| PO rejected by supplier | Supplier | PM | "ការបញ្ជាទិញ {PO-ID} ត្រូវបានបដិសេធ: {reason}" |
| Delivery received (GRN created) | WM/WS | PM, APAR | "ការទទួលទំនិញ {GRN-ID} ត្រូវបានកត់ត្រា" |
| Partial delivery received | WM/WS | PM, APAR | "ការទទួលទំនិញ {GRN-ID} មិនគ្រប់ចំនួន" |
| Vendor invoice (bill) submitted | Supplier | APAR, PM | "វិក្កយបត្ររបស់អ្នកផ្គត់ផ្គង់ {BILL-ID} ត្រូវបានដាក់ស្នើ" |
| 3-Way Match successful | System/APAR | CA, PM | "ការផ្គូផ្គងឯកសារ 3 {PO-ID} ជោគជ័យ — គ្រប់ការទូទាត់" |
| 3-Way Match failed (dispute) | System/APAR | PM, WM | "ការផ្គូផ្គងឯកសារ 3 {PO-ID} មានបញ្ហា — ទាមទារការដោះស្រាយ" |
| Payment Voucher submitted | APAR | CA | "ប័ណ្ណចំណាយ {PV-ID} ត្រូវការការអនុម័ត" |
| Payment Voucher approved | CA | APAR | "ប័ណ្ណចំណាយ {PV-ID} ត្រូវបានអនុម័ត — ដំណើរការទូទាត់" |
| Payment sent to supplier | APAR | PM, CA | "ការទូទាត់ ${amount} ផ្ញើជូន {Supplier Name}" |

### B3. Inventory Notifications

| Event | Sender Role | Receiver Role(s) | Khmer Message Template |
|---|---|---|---|
| Stock below reorder point | System (mock) | WM, PM | "ទំនិញ {Product Name} ស្ទើរអស់ — ត្រូវការបញ្ជាទិញ" |
| Reorder suggestion approved | WM | PM | "ការណែនាំបញ្ជាទិញ {Product Name} បានអនុម័ត" |
| Stock adjustment submitted | WS | WM | "ការកែប្រែស្តុក {Product Name} ត្រូវការការអនុម័ត" |
| Stock adjustment approved | WM | WS | "ការកែប្រែស្តុក ត្រូវបានអនុម័ត" |

### B4. System Notifications

| Event | Sender | Receiver Role(s) | Khmer Message Template |
|---|---|---|---|
| New user account created | SA | GM | "គណនីអ្នកប្រើប្រាស់ {username} ត្រូវបានបង្កើត" |
| Password change | SA | Affected User | "ពាក្យសម្ងាត់គណនីរបស់អ្នក ត្រូវបានផ្លាស់ប្ដូរ" |
| Exchange rate updated | CA | CA, APAR, PM | "អត្រាប្ដូរប្រាក់ {currency} ត្រូវបានធ្វើបច្ចុប្បន្នភាព" |
| Period locked | CA | APAR | "រយៈពេលគណនី {Month YYYY} ត្រូវបានបិទ" |

---

## Part C: Notification Data Structure

Each notification stored in mock data:

```javascript
{
  id: "NOTIF-2026-001",
  type: "APPROVAL_REQUIRED",     // APPROVAL_REQUIRED | APPROVED | REJECTED | INFO | WARNING | ALERT
  entityType: "QUOTATION",       // entity type
  entityId: "QT-2026-0023",      // entity reference
  message: "សម្រង់តម្លៃ QT-2026-0023 ត្រូវការការអនុម័ត",
  triggeredBy: "se_01",
  triggeredByName: "ស្រីនាថ ចន្ទបូ",
  triggeredAt: "2026-09-20T09:15:00",
  receiverRole: "sm",            // which portal receives this
  isRead: false,
  actionUrl: "../approvals/view-approval.html?id=QT-2026-0023"  // relative to portal root
}
```

**Note:** In the prototype, each portal's `data.js` contains a `notifications[]` array pre-populated with 3–5 relevant mock notifications. The notification bell badge count = `notifications.filter(n => !n.isRead).length`.

---

## Part D: Notification Bell — UI Behavior

1. **Badge count:** Shows unread count. Hidden (or shows 0) when all read.
2. **Mark all read:** Button in notification panel sets all `isRead = true` and persists to sessionStorage.
3. **Click on notification:** Navigates to `actionUrl` of the notification.
4. **Panel tabs:** "ការជូនដំណឹង" (notifications) + "សកម្មភាព" (action feed from BMSActionTracker).
5. **Empty state:** Show "គ្មានការជូនដំណឹងថ្មី" with a bell icon when panel is empty.
