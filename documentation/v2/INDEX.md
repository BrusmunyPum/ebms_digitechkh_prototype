# Documentation v2 — Index
**Last updated:** 2026-09-29

## Master Planning
- [00-MASTER-OVERVIEW.md](00-MASTER-OVERVIEW.md) — 4 UI archetypes, global standards, role hierarchy, folder structure
- [00-v2-planning-enhancement.md](00-v2-planning-enhancement.md) — Gap tracker, per-role enhancements, cross-cutting improvements, open questions

## Role Specs (01–12)
- [01-super-admin.md](01-super-admin.md)
- [02-admin-general-manager.md](02-admin-general-manager.md)
- [03-sales-manager.md](03-sales-manager.md)
- [04-sales-executive.md](04-sales-executive.md)
- [05-cashier-pos.md](05-cashier-pos.md)
- [06-procurement-manager.md](06-procurement-manager.md)
- [07-warehouse-manager.md](07-warehouse-manager.md)
- [08-warehouse-staff.md](08-warehouse-staff.md)
- [09-chief-accountant.md](09-chief-accountant.md) *(new — v2)*
- [10-apar-accountant.md](10-apar-accountant.md) *(new — v2)*
- [11-internal-auditor.md](11-internal-auditor.md)
- [12-customer-support.md](12-customer-support.md)

## Cross-Cutting Planning (13–18) — NEW 2026-09-29
- [13-cross-role-workflows.md](13-cross-role-workflows.md) — Q2C, P2P, Stock Replenishment, Returns — state machines and data handoffs
- [14-data-dictionary-and-permissions.md](14-data-dictionary-and-permissions.md) — CRUD matrix per role, field-level visibility, Zero Data Leakage rules
- [15-approval-state-machine.md](15-approval-state-machine.md) — Formal approval states and transitions per document type
- [16-authority-and-notification-matrix.md](16-authority-and-notification-matrix.md) — Approval thresholds table + notification trigger matrix
- [17-missing-roles-and-external-portals.md](17-missing-roles-and-external-portals.md) — Driver/HR decisions, Supplier Portal spec, Customer Portal spec
- [18-open-decisions-and-system-config.md](18-open-decisions-and-system-config.md) — 6 open Q&A resolved, multi-currency, VAT/WHT rules, empty states, build phases

## Build Readiness (19–22) — NEW 2026-09-29
- [19-khmer-glossary.md](19-khmer-glossary.md) — One canonical Khmer term per document, status, money label, action and role
- [20-shared-mock-data-architecture.md](20-shared-mock-data-architecture.md) — Replace 14 isolated stores with one shared store; ID formats; `BMS_TODAY`; role projections for Zero Data Leakage
- [21-page-definition-of-done.md](21-page-definition-of-done.md) — Checklist every page must pass + open code-review backlog
- [22-implementation-roadmap.md](22-implementation-roadmap.md) — 12-minute demo scenario, page gaps, folder clean-up, staged build order, assumptions to confirm

**Start here before modifying the prototype:** 22 → 20 → 21.
