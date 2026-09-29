# PLANNING-15: Approval State Machine
**Version:** 2.0 | **Date:** 2026-09-29 | **Status:** Planning — No Code

---

## Purpose

Defines the formal approval workflow for every document type that requires authorization. Each section specifies: valid states, allowed transitions, who can trigger each transition, UI behavior at each state, and escalation rules.

---

## Universal Approval Principles

1. **One actor per transition** — only the specified role can trigger each transition. Other roles see the button grayed out or hidden.
2. **Reason required on reject** — the UI must require a non-empty `rejectionReason` text before allowing a reject action.
3. **No self-approval** — the creator cannot approve their own document. If SE creates a quotation, SM must approve (not the same user if they hold both roles in demo).
4. **Audit trail mandatory** — every transition appends an entry to `auditTrail[]` in the document mock data.
5. **Notification on every transition** — see `16-authority-and-notification-matrix.md` for the full notification matrix.
6. **Soft delete only** — CANCELLED is the terminal negative state. Nothing is hard-deleted in the prototype.

---

## Document Type 1: Quotation

### States
```
DRAFT → PENDING_APPROVAL → APPROVED → CONVERTED_TO_INVOICE
                        ↓
                     REJECTED → (back to DRAFT via revision)
DRAFT → CANCELLED (SE cancels before submission)
APPROVED → EXPIRED (validity date passed, not yet converted)
```

### Transition Table

| From | To | Actor | Trigger | Required Data |
|---|---|---|---|---|
| — | DRAFT | SE | Create new quotation | All required fields |
| DRAFT | PENDING_APPROVAL | SE | Submit for approval | All line items, grandTotal > 0 |
| PENDING_APPROVAL | APPROVED | SM | Approve | approvedBy, approvedAt |
| PENDING_APPROVAL | REJECTED | SM | Reject | rejectionReason (required) |
| REJECTED | DRAFT | SE | Revise | SE edits document (preserves quotationId) |
| DRAFT | CANCELLED | SE | Cancel | cancellationReason |
| APPROVED | CONVERTED_TO_INVOICE | SE | Convert to Invoice | Creates new Invoice entity |
| APPROVED | EXPIRED | System (mock: time check) | Validity date passed | — |

### UI State Rules

| State | SE Sees | SM Sees | Others |
|---|---|---|---|
| DRAFT | Edit + Submit + Cancel buttons | — | Read-only |
| PENDING_APPROVAL | View only, no edit | Approve + Reject buttons | Read-only |
| REJECTED | Edit + Resubmit buttons, rejection reason shown | View reason only | Read-only |
| APPROVED | "Convert to Invoice" button | View only | Read-only |
| CONVERTED_TO_INVOICE | Link to Invoice | Link to Invoice | Link to Invoice |
| CANCELLED | View only, red badge | View only | View only |
| EXPIRED | View only, orange badge | View only | View only |

### Approval Authority Override
If grandTotal > $5,000: SM must tag GM for co-approval. In prototype: SM approves, then GM sees it in their approval queue with status `PENDING_GM_REVIEW`.

---

## Document Type 2: Purchase Request (PR)

### States
```
DRAFT → PENDING_APPROVAL → APPROVED → PO_CREATED
                        ↓
                     REJECTED → (back to DRAFT)
DRAFT → CANCELLED
```

### Transition Table

| From | To | Actor | Trigger | Required Data |
|---|---|---|---|---|
| — | DRAFT | PM | Create PR | supplierId, lineItems, justification |
| DRAFT | PENDING_APPROVAL | PM | Submit | All required fields |
| PENDING_APPROVAL | APPROVED | GM | Approve | approvedBy, approvedAt |
| PENDING_APPROVAL | REJECTED | GM | Reject | rejectionReason (required) |
| REJECTED | DRAFT | PM | Revise | PM edits |
| DRAFT | CANCELLED | PM | Cancel | cancellationReason |
| APPROVED | PO_CREATED | PM | Create PO from PR | Creates new PO entity, links prId |

### Approval Authority Override
If totalAmount > $10,000: requires GM + Director co-approval. In prototype: after GM approves, status moves to `PENDING_DIRECTOR_REVIEW`.

---

## Document Type 3: Purchase Order (PO)

### States
```
DRAFT → SENT_TO_SUPPLIER → CONFIRMED_BY_SUPPLIER → AWAITING_DELIVERY → DELIVERED → BILLED → PAID → CLOSED
                         ↓                                              ↓
                    REJECTED_BY_SUPPLIER                         PARTIAL_DELIVERY
DRAFT → CANCELLED
SENT_TO_SUPPLIER → CANCELLED (before supplier confirms)
```

### Transition Table

| From | To | Actor | Trigger | Required Data |
|---|---|---|---|---|
| — | DRAFT | PM | Create PO from approved PR | prId, supplierId, lineItems |
| DRAFT | SENT_TO_SUPPLIER | PM | Send to Supplier | Supplier must have portal access |
| SENT_TO_SUPPLIER | CONFIRMED_BY_SUPPLIER | Supplier | Confirm in portal | confirmedAt |
| SENT_TO_SUPPLIER | REJECTED_BY_SUPPLIER | Supplier | Reject in portal | rejectionReason |
| CONFIRMED_BY_SUPPLIER | AWAITING_DELIVERY | System | Auto after confirmation | — |
| AWAITING_DELIVERY | DELIVERED | WM/WS | Create GRN | grnId, receivedDate |
| AWAITING_DELIVERY | PARTIAL_DELIVERY | WM/WS | GRN with partial qty | grnId, note |
| DELIVERED | BILLED | APAR | Bill received & matched | billId, grnId (3-Way Match) |
| BILLED | PAID | APAR | Payment Voucher paid | pvId, paidAt |
| PAID | CLOSED | System/CA | CA posts to ledger | journalEntryId |

---

## Document Type 4: Payment Voucher (PV)

### States
```
DRAFT → PENDING_APPROVAL → APPROVED → PAID → POSTED_TO_LEDGER
                        ↓
                     REJECTED → (back to DRAFT)
DRAFT → CANCELLED
```

### Transition Table

| From | To | Actor | Trigger | Required Data |
|---|---|---|---|---|
| — | DRAFT | APAR | Create PV after 3-Way Match | billId, poId, grnId, amounts, WHT calc |
| DRAFT | PENDING_APPROVAL | APAR | Submit for approval | Signature block populated |
| PENDING_APPROVAL | APPROVED | CA | Approve | approvedBy, approvedAt |
| PENDING_APPROVAL | REJECTED | CA | Reject | rejectionReason |
| REJECTED | DRAFT | APAR | Revise | APAR edits |
| APPROVED | PAID | APAR | Mark payment sent | paidAt, paymentRef |
| PAID | POSTED_TO_LEDGER | CA | Post journal entry | journalEntryId |

**Note:** Print button is only enabled when status = APPROVED or PAID. WHT Certificate prints alongside PV.

---

## Document Type 5: Sales Return / Credit Note

### States
```
RETURN_REQUESTED → RETURN_APPROVED → GOODS_RECEIVED → CREDIT_NOTE_ISSUED → CREDIT_NOTE_APPROVED → REFUNDED → CLOSED
                ↓
           RETURN_REJECTED
```

### Transition Table

| From | To | Actor | Trigger | Required Data |
|---|---|---|---|---|
| — | RETURN_REQUESTED | SE | Log return request | originalInvoiceId, reason, lineItems |
| RETURN_REQUESTED | RETURN_APPROVED | SM | Approve return | approvedBy |
| RETURN_REQUESTED | RETURN_REJECTED | SM | Reject | rejectionReason |
| RETURN_APPROVED | GOODS_RECEIVED | WM | Receive goods back | receiptDate, condition |
| GOODS_RECEIVED | CREDIT_NOTE_ISSUED | SE | Create Credit Note | creditNoteId, amount |
| CREDIT_NOTE_ISSUED | CREDIT_NOTE_APPROVED | SM | Approve Credit Note | approvedBy |
| CREDIT_NOTE_APPROVED | REFUNDED | CAS | Process refund/credit | refundMethod, refundedAt |
| REFUNDED | CLOSED | APAR | Adjust AR balance | journalEntryId |

---

## Document Type 6: Stock Adjustment (Manual Correction)

### States
```
ADJUSTMENT_REQUESTED → PENDING_APPROVAL → APPROVED → APPLIED
                                       ↓
                                    REJECTED
```

### Transition Table

| From | To | Actor | Trigger | Required Data |
|---|---|---|---|---|
| — | ADJUSTMENT_REQUESTED | WS | Log discrepancy | productId, currentQty, adjustedQty, reason |
| ADJUSTMENT_REQUESTED | PENDING_APPROVAL | WS | Submit | All required fields |
| PENDING_APPROVAL | APPROVED | WM | Approve | approvedBy |
| PENDING_APPROVAL | REJECTED | WM | Reject | rejectionReason |
| APPROVED | APPLIED | System | Stock qty updated | stockMovementId created |

---

## Mock Data: auditTrail Structure

Every document entity that participates in an approval workflow must include an `auditTrail` array in `data.js`:

```javascript
auditTrail: [
  {
    changedAt: "2026-09-20T09:15:00",
    changedBy: "se_01",       // user reference (mock)
    changedByName: "ស្រីនាថ ចន្ទបូ",
    previousStatus: "DRAFT",
    newStatus: "PENDING_APPROVAL",
    reason: null
  },
  {
    changedAt: "2026-09-20T11:30:00",
    changedBy: "sm_01",
    changedByName: "ខេមរ៉ា ហ៊ីន",
    previousStatus: "PENDING_APPROVAL",
    newStatus: "APPROVED",
    reason: null
  }
]
```

The `view-*.html` pages must render this trail at the bottom of the document in a timeline component.

---

## Escalation Rules (Mock Behavior)

For the prototype, escalation is simulated as a second entry in the approval queue:

1. **Time-based escalation:** Not implemented in static prototype. Use a static "Overdue" badge after 48h of `PENDING_APPROVAL` based on `submittedAt` compared to today's mock date.
2. **Amount-based escalation:** PM submits PR > $10,000 → appears in both GM queue AND Director queue simultaneously. First approver's decision sets the status.
3. **Budget-based block:** Not implemented in v2 prototype. Planned for Phase 3.
