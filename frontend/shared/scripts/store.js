/* ឃ្លាំងទិន្នន័យរួម — កូដតែមួយគត់ដែលអាន និងសរសេរទិន្នន័យ (ឯកសារ 20)

   • រក្សាទុកក្នុង localStorage ក្រោមកូនសោតែមួយ bms_store_v2 ដូច្នេះគ្រប់ផ្ទាំងរុករក
     (ឧ. បុគ្គលិកលក់ និងអ្នកគ្រប់គ្រងលក់) ឃើញទិន្នន័យតែមួយ។
   • ព្រឹត្តិការណ៍ 'storage' ត្រូវបានបញ្ជូនបន្តជា 'bms-store-changed' ដើម្បីឱ្យផ្លាកលេខ ជូនដំណឹង
     និងបញ្ជីធ្វើបច្ចុប្បន្នភាពដោយមិនចាំបាច់ផ្ទុកទំព័រឡើងវិញ។
   • ទំព័រមិនកំណត់ស្ថានភាពដោយខ្លួនឯងឡើយ ត្រូវហៅសកម្មភាព BMS_STORE.actions.* ដែលពិនិត្យ
     ការផ្លាស់ប្តូរស្ថានភាពតាមឯកសារ 15 កត់ត្រាប្រវត្តិ និងបង្កើតការជូនដំណឹងតាមឯកសារ 16។

   លំដាប់ស្គ្រីបលើគ្រប់ទំព័រ៖ ui-components → seed → status-meta → store → data.js របស់តួនាទី → portal។ */

/* ===== 1. ថ្ងៃនេះ (BMS_TODAY) និងតម្រូវការទាំងអស់ធៀបនឹងវា ===== */

const BMS_TODAY = (() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
})();

const MONTHS_KH = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];

/* បំលែង 'YYYY-MM-DD' ជាថ្ងៃម៉ោងក្នុងតំបន់ (មិនប្រើម៉ោង UTC ដើម្បីកុំឱ្យឆ្គងមួយថ្ងៃ) */
function parseIso(iso) {
    if (iso instanceof Date) return new Date(iso.getTime());
    const s = String(iso);
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
        const [y, m, d] = s.split('-').map(Number);
        return new Date(y, m - 1, d);
    }
    return new Date(s);
}

function pad2(n) {
    return String(n).padStart(2, '0');
}

function toIsoDate(d) {
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function toIsoDateTime(d) {
    return `${toIsoDate(d)}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function nowIso() {
    return toIsoDateTime(new Date());
}

function addDaysIso(baseDate, days) {
    const d = parseIso(baseDate);
    d.setDate(d.getDate() + days);
    return toIsoDate(d);
}

function daysBetween(fromIso, toDate = BMS_TODAY) {
    const from = parseIso(fromIso);
    from.setHours(0, 0, 0, 0);
    return Math.round((toDate - from) / 86400000);
}

/* ===== 2. ទ្រង់ទ្រាយបង្ហាញ (ឯកសារ 19 ផ្នែក 6) ===== */

function fmtUSD(amount) {
    return '$' + Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtKHR(amount) {
    return Math.round(Number(amount)).toLocaleString('en-US') + ' ៛';
}

function fmtPercent(value, digits = 1) {
    return Number(value).toFixed(digits) + '%';
}

function fmtKhDate(iso) {
    const d = parseIso(iso);
    return `${d.getDate()} ${MONTHS_KH[d.getMonth()]} ${d.getFullYear()}`;
}

function fmtKhDateTime(iso) {
    const d = parseIso(iso);
    return `${fmtKhDate(iso)} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function inRange(iso, range) {
    if (!range || !range.start || !range.end) return true;
    const d = parseIso(iso); d.setHours(0, 0, 0, 0);
    const s = new Date(range.start); s.setHours(0, 0, 0, 0);
    const e = new Date(range.end); e.setHours(23, 59, 59, 999);
    return d >= s && d <= e;
}

/* ===== 3. ការគណនាឯកសារ (សង្ខេបហិរញ្ញវត្ថុ 5 ដំណាក់កាល — ស្តង់ដារលេខ 13) =====
   សរុបរង → ប្រាក់កក់ → បញ្ចុះតម្លៃពិសេស → អាករ 10% → សរុបត្រូវបង់ */

function docTotals(doc, vatRate) {
    const rate = vatRate == null ? BMS_STORE.settings().vatRate : vatRate;
    const subtotal = doc.items.reduce((sum, it) => sum + (it.qty * it.price), 0);
    const discountAmount = subtotal * ((doc.discountPercent || 0) / 100);
    const taxBase = subtotal - discountAmount;
    const vatAmount = taxBase * rate;
    const downPayment = doc.downPayment || 0;
    const grandTotal = taxBase + vatAmount - downPayment;
    return {
        subtotal,
        downPayment,
        discountPercent: doc.discountPercent || 0,
        discountAmount,
        taxBase,
        vatAmount,
        grandTotal
    };
}

function invoicePaid(inv) {
    return (inv.payments || []).reduce((sum, x) => sum + x.amount, 0);
}

/* ស្ថានភាពទូទាត់ជាលទ្ធផលគណនា (មិនរក្សាទុក) ធៀបនឹង BMS_TODAY */
function invoiceState(inv) {
    const totals = docTotals(inv);
    const paid = invoicePaid(inv);
    const due = Math.max(totals.grandTotal - paid, 0);
    const overdueDays = daysBetween(inv.dueDate);

    let key;
    if (inv.status === 'CANCELLED') key = 'CANCELLED';
    else if (due <= 0.005) key = 'PAID';
    else if (overdueDays > 0) key = 'OVERDUE';
    else if (paid > 0) key = 'PARTIALLY_PAID';
    else key = 'UNPAID';

    return { key, due, paid, overdueDays, totals, ...statusMeta(key) };
}

/* សុពលភាពនៅសល់របស់សម្រង់តម្លៃ */
function quoteExpiry(quote) {
    const left = -daysBetween(quote.validUntil);
    if (quote.status === 'CONVERTED_TO_INVOICE') return { days: left, label: 'បានបំប្លែងរួច', tone: 'text-slate-500' };
    if (['CANCELLED', 'REJECTED', 'DECLINED_BY_CUSTOMER'].includes(quote.status)) return { days: left, label: '—', tone: 'text-slate-400' };
    if (left < 0) return { days: left, label: `ផុតសុពលភាព ${Math.abs(left)} ថ្ងៃមុន`, tone: 'text-rose-600 font-semibold' };
    if (left === 0) return { days: left, label: 'ផុតសុពលភាពថ្ងៃនេះ', tone: 'text-rose-600 font-semibold' };
    if (left <= 3) return { days: left, label: `នៅសល់ ${left} ថ្ងៃ`, tone: 'text-amber-600 font-semibold' };
    return { days: left, label: `នៅសល់ ${left} ថ្ងៃ`, tone: 'text-slate-500' };
}

/* កម្រិតអនុម័តដែលត្រូវការតាមទឹកប្រាក់សរុប (ឯកសារ 16 ផ្នែក A1) */
function requiredApprovalLevels(total) {
    const lim = BMS_STORE.settings().quotationLimits;
    const levels = ['SM'];
    if (total > lim.SM) levels.push('GM');
    if (total > lim.GM) levels.push('DIRECTOR');
    return levels;
}

/* ===== 4. ការផ្ទុក និងរក្សាទុក ===== */

const BMS_STORE_KEY = 'bms_store_v2';
const BMS_SEED_MAX_AGE_DAYS = 14;

const BMS_STORE = (() => {
    let db = null;
    let memoryOnly = false;

    function readStorage() {
        try {
            const raw = localStorage.getItem(BMS_STORE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function writeStorage() {
        if (memoryOnly) return;
        try {
            localStorage.setItem(BMS_STORE_KEY, JSON.stringify(db));
        } catch (e) {
            // ការផ្ទុកត្រូវបានបិទ (វេនឯកជន) — ទិន្នន័យនៅរស់ក្នុងអង្គចងចាំតែទំព័រនេះ
            memoryOnly = true;
        }
    }

    function seedIsFresh(candidate) {
        if (!candidate || candidate.schemaVersion !== BMS_SCHEMA_VERSION) return false;
        return daysBetween(candidate.seededOn) <= BMS_SEED_MAX_AGE_DAYS;
    }

    function ensure() {
        if (db) return db;
        const stored = readStorage();
        if (seedIsFresh(stored)) {
            db = stored;
        } else {
            db = bmsBuildSeed(BMS_TODAY);
            sweepExpiry();
            writeStorage();
        }
        return db;
    }

    function emit(detail) {
        window.dispatchEvent(new CustomEvent('bms-store-changed', { detail: detail || {} }));
    }

    function commit(detail) {
        writeStorage();
        emit(detail);
    }

    /* សម្រង់តម្លៃដែលហួសសុពលភាពមុនត្រូវបានទទួលយក → EXPIRED (ឯកសារ 15) */
    function sweepExpiry() {
        db.quotations.forEach(q => {
            if (['APPROVED', 'SENT_TO_CUSTOMER'].includes(q.status) && daysBetween(q.validUntil) > 0) {
                q.auditTrail.push(trailEntry(q.status, 'EXPIRED', 'EXPIRE', 'SYSTEM', null, addDaysIso(q.validUntil, 1) + 'T00:00'));
                q.status = 'EXPIRED';
            }
        });
    }

    function trailEntry(prev, next, action, byId, reason, at, extra) {
        return {
            changedAt: at || nowIso(), changedBy: byId, changedByName: byId === 'SYSTEM' ? 'ប្រព័ន្ធ' : userName(byId),
            previousStatus: prev, newStatus: next, action, reason: reason || null, ...(extra || {})
        };
    }

    function userOf(id) {
        return ensure().users.find(u => u.id === id) || null;
    }

    function userName(id) {
        if (String(id).startsWith('CUSTOMER:')) {
            const c = db && db.customers.find(x => x.id === String(id).slice(9));
            return c ? c.name : id;
        }
        const u = db && db.users.find(x => x.id === id);
        return u ? u.name : id;
    }

    /* អត្តសញ្ញាណអ្នកធ្វើសកម្មភាពជាអតិថិជនមានទម្រង់ 'CUSTOMER:CUST-0042' */
    function customerActor(actorId) {
        return String(actorId).startsWith('CUSTOMER:') ? String(actorId).slice(9) : null;
    }

    /* លេខឯកសារបន្ទាប់ ដូចជា QT-2026-0098 — ឆ្នាំយកពី BMS_TODAY */
    function nextId(collection, prefix) {
        const year = BMS_TODAY.getFullYear();
        const max = ensure()[collection].reduce((m, d) => {
            const parts = String(d.id).split('-');
            return parts[0] === prefix && parts[1] === String(year) ? Math.max(m, parseInt(parts[2], 10) || 0) : m;
        }, 0);
        return `${prefix}-${year}-${String(max + 1).padStart(4, '0')}`;
    }

    function audit(actorId, action, entityType, entityId, detail) {
        const seq = ensure().auditLog.reduce((m, e) => Math.max(m, parseInt(String(e.id).split('-')[1], 10) || 0), 0) + 1;
        db.auditLog.push({
            id: `AU-${String(seq).padStart(6, '0')}`, at: nowIso(), userId: actorId, userName: userName(actorId),
            action, entityType, entityId, detail: detail || ''
        });
    }

    function notify(toRole, toUserId, type, entityType, entityId, message, byId) {
        const seq = ensure().notifications.reduce((m, n) => Math.max(m, parseInt(String(n.id).split('-')[1], 10) || 0), 0) + 1;
        db.notifications.push({
            id: `NT-${String(seq).padStart(5, '0')}`, at: nowIso(), toRole, toUserId: toUserId || null,
            type, entityType, entityId, message, triggeredBy: byId, isRead: false
        });
    }

    const fail = message => ({ ok: false, error: message });


    /* ===== 4b. សៀវភៅធំ — ទិន្នានុប្បវត្តិចុះជាមួយតុល្យភាពគូ (Dr = Cr) ===== */

    const r2 = n => Math.round(n * 100) / 100;
    const CASH_ACCOUNT = { CASH: '1111', KHQR: '1121', BANK: '1121', BANK_CANADIA: '1122' };

    function journalSums(lines) {
        return {
            dr: r2(lines.reduce((s, l) => s + (l.dr || 0), 0)),
            cr: r2(lines.reduce((s, l) => s + (l.cr || 0), 0))
        };
    }

    /* ចុះបញ្ជីទិន្នានុប្បវត្តិ — បដិសេធបើមិនតុល្យភាព */
    function postJournal(entry, byId) {
        const sums = journalSums(entry.lines);
        if (entry.status === 'POSTED' && Math.abs(sums.dr - sums.cr) > 0.005) throw new Error('Dr មិនស្មើ Cr');
        const id = nextId('journalEntries', 'JE');
        const je = {
            id, date: entry.date || toIsoDate(BMS_TODAY), description: entry.description, source: entry.source || 'MANUAL',
            reference: entry.reference || '', status: entry.status || 'POSTED', postedBy: byId, postedAt: nowIso(),
            lines: entry.lines.map(l => ({ accountCode: l.accountCode, description: l.description || '', dr: r2(l.dr || 0), cr: r2(l.cr || 0) }))
        };
        db.journalEntries.push(je);
        return je;
    }

    function postInvoiceJournal(inv, byId) {
        const t = docTotals(inv);
        const taxBase = r2(t.taxBase);
        const down = r2(t.downPayment);
        const grand = r2(t.grandTotal);
        const vatAmount = r2(grand + down - taxBase);
        const lines = [{ accountCode: '1131', dr: grand, description: inv.id }];
        if (down > 0) lines.push({ accountCode: '1121', dr: down, description: 'ប្រាក់កក់' });
        lines.push({ accountCode: '4111', cr: taxBase, description: inv.id }, { accountCode: '2121', cr: vatAmount, description: inv.id });
        return postJournal({ date: inv.date, description: `ចេញវិក្កយបត្រ ${inv.id}`, source: 'INVOICE', reference: inv.id, status: 'POSTED', lines }, byId);
    }

    /* ត្រឡប់ទិន្នានុប្បវត្តិដើម (ជំនួសការលុបចោល — គ្មានអ្វីត្រូវបានលុបជាអចិន្ត្រៃយ៍) */
    function reverseJournalOf(source, reference, description, byId) {
        const orig = db.journalEntries.find(j => j.source === source && j.reference === reference && j.status === 'POSTED');
        if (!orig) return null;
        return postJournal({
            date: toIsoDate(BMS_TODAY), description, source: source + '_REVERSAL', reference, status: 'POSTED',
            lines: orig.lines.map(l => ({ accountCode: l.accountCode, dr: l.cr, cr: l.dr, description: l.description }))
        }, byId);
    }

    /* សមតុល្យគណនីនីមួយៗ គិតតែទិន្នានុប្បវត្តិដែលបានចុះបញ្ជី */
    function accountBalances() {
        const bal = {};
        ensure().accounts.forEach(a => { bal[a.code] = 0; });
        db.journalEntries.filter(j => j.status === 'POSTED').forEach(j => j.lines.forEach(l => {
            const acc = db.accounts.find(a => a.code === l.accountCode);
            if (!acc) return;
            bal[acc.code] += acc.normal === 'Dr' ? (l.dr - l.cr) : (l.cr - l.dr);
        }));
        // គណនីក្រុមបូកសមតុល្យកូនរបស់វា
        db.accounts.filter(a => a.isGroup).reverse().forEach(g => {
            bal[g.code] = db.accounts.filter(c => c.parent === g.code).reduce((s, c) => s + (c.normal === g.normal ? bal[c.code] : -bal[c.code]), 0);
        });
        Object.keys(bal).forEach(k => { bal[k] = r2(bal[k]); });
        return bal;
    }

    /* ===== 5. សកម្មភាព (ការផ្លាស់ប្តូរស្ថានភាព) ===== */

    function roleOf(actorId) {
        const u = userOf(actorId);
        return u ? u.role : null;
    }

    function findQuote(id) {
        return ensure().quotations.find(q => q.id === id);
    }

    function quoteTotal(q) {
        return docTotals(q).grandTotal;
    }

    function cleanItems(items) {
        return (items || []).filter(i => i.sku && i.qty > 0).map(i => ({ sku: i.sku, qty: Number(i.qty), price: Number(i.price) }));
    }

    const actions = {
        /* ---- សម្រង់តម្លៃ ---- */

        /* បង្កើតសម្រង់តម្លៃថ្មីជាព្រាង ហើយបើ submit=true ដាក់ស្នើភ្លាម */
        createQuotation(data, actorId, submit) {
            if (roleOf(actorId) !== 'SE') return fail('មានតែបុគ្គលិកលក់ទេដែលអាចបង្កើតសម្រង់តម្លៃបាន');
            ensure();
            const items = cleanItems(data.items);
            if (!items.length) return fail('សូមបន្ថែមមុខទំនិញយ៉ាងហោចណាស់ 1 ជួរ');
            const id = nextId('quotations', 'QT');
            const now = nowIso();
            const q = {
                id, customerId: data.customerId, repId: actorId, createdBy: actorId,
                date: now, validUntil: data.validUntil, status: 'DRAFT', pendingLevel: null,
                requiredLevels: [], approvals: [],
                discountPercent: Number(data.discountPercent) || 0, downPayment: Number(data.downPayment) || 0,
                note: data.note || '', rejectionReason: null, cancellationReason: null, declineReason: null,
                acceptedVia: null, invoiceId: null, items, auditTrail: [trailEntry(null, 'DRAFT', 'CREATE', actorId)]
            };
            db.quotations.push(q);
            audit(actorId, 'CREATE', 'quotation', id, `ទឹកប្រាក់ ${fmtUSD(quoteTotal(q))}`);
            commit({ collection: 'quotations', id });
            return submit ? actions.submitQuotation(id, actorId) : { ok: true, record: q };
        },

        /* កែប្រែព្រាង ឬសម្រង់តម្លៃដែលត្រូវបានបដិសេធ (REJECTED → DRAFT) */
        updateQuotation(id, data, actorId, submit) {
            const q = findQuote(id);
            if (!q) return fail('រកមិនឃើញសម្រង់តម្លៃ');
            if (q.repId !== actorId) return fail('អ្នកមិនមែនជាម្ចាស់សម្រង់តម្លៃនេះទេ');
            if (!['DRAFT', 'REJECTED'].includes(q.status)) return fail('សម្រង់តម្លៃស្ថិតក្នុងស្ថានភាពដែលមិនអាចកែប្រែបាន');
            const items = cleanItems(data.items);
            if (!items.length) return fail('សូមបន្ថែមមុខទំនិញយ៉ាងហោចណាស់ 1 ជួរ');
            if (q.status === 'REJECTED') {
                q.auditTrail.push(trailEntry('REJECTED', 'DRAFT', 'REVISE', actorId));
                q.status = 'DRAFT';
                q.rejectionReason = null;
            }
            Object.assign(q, {
                customerId: data.customerId, items, validUntil: data.validUntil || q.validUntil,
                discountPercent: Number(data.discountPercent) || 0, downPayment: Number(data.downPayment) || 0,
                note: data.note || ''
            });
            audit(actorId, 'UPDATE', 'quotation', id, `ទឹកប្រាក់ ${fmtUSD(quoteTotal(q))}`);
            commit({ collection: 'quotations', id });
            return submit ? actions.submitQuotation(id, actorId) : { ok: true, record: q };
        },

        /* ដាក់ស្នើ: DRAFT → PENDING_APPROVAL ហើយជូនដំណឹងអ្នកគ្រប់គ្រងផ្នែកលក់ */
        submitQuotation(id, actorId) {
            const q = findQuote(id);
            if (!q) return fail('រកមិនឃើញសម្រង់តម្លៃ');
            if (q.repId !== actorId) return fail('អ្នកមិនមែនជាម្ចាស់សម្រង់តម្លៃនេះទេ');
            if (q.status !== 'DRAFT') return fail('មានតែព្រាងទេដែលអាចដាក់ស្នើបាន');
            const total = quoteTotal(q);
            if (!(total > 0)) return fail('ទឹកប្រាក់សរុបត្រូវធំជាងសូន្យ');
            q.requiredLevels = requiredApprovalLevels(total);
            q.pendingLevel = 'SM';
            q.approvals = [];
            q.auditTrail.push(trailEntry('DRAFT', 'PENDING_APPROVAL', 'SUBMIT', actorId));
            q.status = 'PENDING_APPROVAL';
            audit(actorId, 'SUBMIT', 'quotation', id, `ទឹកប្រាក់ ${fmtUSD(total)}`);
            notify('SM', null, 'QUOTE_SUBMITTED', 'quotation', id, `សម្រង់តម្លៃ ${id} ត្រូវការការអនុម័ត`, actorId);
            commit({ collection: 'quotations', id });
            return { ok: true, record: q };
        },

        /* អនុម័តតាមកម្រិត (SM → GM → នាយក) ហើយចប់កម្រិតចុងក្រោយទើបទៅ APPROVED */
        approveQuotation(id, actorId, comment) {
            const q = findQuote(id);
            if (!q) return fail('រកមិនឃើញសម្រង់តម្លៃ');
            if (q.status !== 'PENDING_APPROVAL') return fail('សម្រង់តម្លៃនេះមិនស្ថិតក្នុងស្ថានភាពរង់ចាំអនុម័តទេ');
            const level = q.pendingLevel;
            const role = roleOf(actorId);
            const allowed = level === 'SM' ? role === 'SM' : role === 'GM';
            if (!allowed) return fail(`កម្រិតនេះត្រូវអនុម័តដោយ ${APPROVAL_LEVEL_LABEL[level]}`);
            if (actorId === q.repId) return fail('មិនអាចអនុម័តឯកសារដែលខ្លួនឯងបង្កើតបានទេ');

            q.approvals.push({ level, by: actorId, at: nowIso(), comment: comment || '' });
            const idx = q.requiredLevels.indexOf(level);
            const next = q.requiredLevels[idx + 1];
            if (next) {
                q.pendingLevel = next;
                q.auditTrail.push(trailEntry('PENDING_APPROVAL', 'PENDING_APPROVAL', 'APPROVE_LEVEL', actorId, comment, null, { level }));
                audit(actorId, 'APPROVE_LEVEL', 'quotation', id, `កម្រិត ${level}`);
                notify('GM', null, 'QUOTE_SUBMITTED', 'quotation', id, `សម្រង់តម្លៃ ${id} ត្រូវការការអនុម័តពីអភិបាលទូទៅ`, actorId);
            } else {
                q.pendingLevel = null;
                q.status = 'APPROVED';
                q.auditTrail.push(trailEntry('PENDING_APPROVAL', 'APPROVED', 'APPROVE', actorId, comment, null, { level }));
                audit(actorId, 'APPROVE', 'quotation', id, `កម្រិត ${level}`);
                notify('SE', q.repId, 'QUOTE_APPROVED', 'quotation', id, `សម្រង់តម្លៃ ${id} ត្រូវបានអនុម័ត`, actorId);
            }
            commit({ collection: 'quotations', id });
            return { ok: true, record: q, finalApproved: !next };
        },

        rejectQuotation(id, actorId, reason) {
            const q = findQuote(id);
            if (!q) return fail('រកមិនឃើញសម្រង់តម្លៃ');
            if (q.status !== 'PENDING_APPROVAL') return fail('សម្រង់តម្លៃនេះមិនស្ថិតក្នុងស្ថានភាពរង់ចាំអនុម័តទេ');
            const role = roleOf(actorId);
            if (!(q.pendingLevel === 'SM' ? role === 'SM' : role === 'GM')) return fail(`កម្រិតនេះត្រូវសម្រេចដោយ ${APPROVAL_LEVEL_LABEL[q.pendingLevel]}`);
            if (!reason || !reason.trim()) return fail('សូមបញ្ចូលមូលហេតុនៃការបដិសេធ');
            q.status = 'REJECTED';
            q.pendingLevel = null;
            q.rejectionReason = reason.trim();
            q.auditTrail.push(trailEntry('PENDING_APPROVAL', 'REJECTED', 'REJECT', actorId, reason.trim()));
            audit(actorId, 'REJECT', 'quotation', id, reason.trim());
            notify('SE', q.repId, 'QUOTE_REJECTED', 'quotation', id, `សម្រង់តម្លៃ ${id} ត្រូវបានបដិសេធ៖ ${reason.trim()}`, actorId);
            commit({ collection: 'quotations', id });
            return { ok: true, record: q };
        },

        cancelQuotation(id, actorId, reason) {
            const q = findQuote(id);
            if (!q) return fail('រកមិនឃើញសម្រង់តម្លៃ');
            if (q.repId !== actorId) return fail('អ្នកមិនមែនជាម្ចាស់សម្រង់តម្លៃនេះទេ');
            if (q.status !== 'DRAFT') return fail('មានតែព្រាងទេដែលអាចលុបចោលបាន');
            if (!reason || !reason.trim()) return fail('សូមបញ្ចូលមូលហេតុនៃការលុបចោល');
            q.status = 'CANCELLED';
            q.cancellationReason = reason.trim();
            q.auditTrail.push(trailEntry('DRAFT', 'CANCELLED', 'CANCEL', actorId, reason.trim()));
            audit(actorId, 'CANCEL', 'quotation', id, reason.trim());
            commit({ collection: 'quotations', id });
            return { ok: true, record: q };
        },

        sendQuotation(id, actorId) {
            const q = findQuote(id);
            if (!q) return fail('រកមិនឃើញសម្រង់តម្លៃ');
            if (q.repId !== actorId) return fail('អ្នកមិនមែនជាម្ចាស់សម្រង់តម្លៃនេះទេ');
            if (q.status !== 'APPROVED') return fail('មានតែសម្រង់តម្លៃដែលបានអនុម័តទេដែលអាចផ្ញើជូនអតិថិជនបាន');
            q.status = 'SENT_TO_CUSTOMER';
            q.auditTrail.push(trailEntry('APPROVED', 'SENT_TO_CUSTOMER', 'SEND', actorId));
            audit(actorId, 'SEND', 'quotation', id, `ជូន ${q.customerId}`);
            notify('CUSTOMER', q.customerId, 'QUOTE_SENT', 'quotation', id, `សម្រង់តម្លៃ ${id} ត្រូវបានផ្ញើជូនលោកអ្នក`, actorId);
            commit({ collection: 'quotations', id });
            return { ok: true, record: q };
        },

        /* អតិថិជនយល់ព្រម — តាមច្រក (PORTAL) ឬបុគ្គលិកលក់កត់ត្រាជំនួស (SE_RECORDED) */
        acceptQuotation(id, actorId, via) {
            const q = findQuote(id);
            if (!q) return fail('រកមិនឃើញសម្រង់តម្លៃ');
            if (q.status !== 'SENT_TO_CUSTOMER') return fail('សម្រង់តម្លៃនេះមិនទាន់ត្រូវបានផ្ញើជូនអតិថិជនទេ');
            const isRep = actorId === q.repId;
            if (!isRep && customerActor(actorId) !== q.customerId) return fail('មិនមានសិទ្ធិកត់ត្រាការយល់ព្រមទេ');
            q.status = 'ACCEPTED_BY_CUSTOMER';
            q.acceptedVia = isRep ? 'SE_RECORDED' : 'PORTAL';
            q.acceptedAt = nowIso();
            q.auditTrail.push(trailEntry('SENT_TO_CUSTOMER', 'ACCEPTED_BY_CUSTOMER', 'ACCEPT', actorId, null, null, { via: q.acceptedVia }));
            audit(actorId, 'ACCEPT', 'quotation', id, q.acceptedVia);
            notify('SE', q.repId, 'QUOTE_ACCEPTED', 'quotation', id, `អតិថិជនបានយល់ព្រមលើសម្រង់តម្លៃ ${id}`, actorId);
            notify('SM', null, 'QUOTE_ACCEPTED', 'quotation', id, `អតិថិជនបានយល់ព្រមលើសម្រង់តម្លៃ ${id}`, actorId);
            commit({ collection: 'quotations', id });
            return { ok: true, record: q };
        },

        declineQuotation(id, actorId, reason) {
            const q = findQuote(id);
            if (!q) return fail('រកមិនឃើញសម្រង់តម្លៃ');
            if (q.status !== 'SENT_TO_CUSTOMER') return fail('សម្រង់តម្លៃនេះមិនទាន់ត្រូវបានផ្ញើជូនអតិថិជនទេ');
            if (actorId !== q.repId && customerActor(actorId) !== q.customerId) return fail('មិនមានសិទ្ធិកត់ត្រាការបដិសេធទេ');
            q.status = 'DECLINED_BY_CUSTOMER';
            q.declineReason = reason || null;
            q.auditTrail.push(trailEntry('SENT_TO_CUSTOMER', 'DECLINED_BY_CUSTOMER', 'DECLINE', actorId, reason));
            audit(actorId, 'DECLINE', 'quotation', id, reason || '');
            notify('SE', q.repId, 'QUOTE_DECLINED', 'quotation', id, `អតិថិជនបានបដិសេធសម្រង់តម្លៃ ${id}`, actorId);
            notify('SM', null, 'QUOTE_DECLINED', 'quotation', id, `អតិថិជនបានបដិសេធសម្រង់តម្លៃ ${id}`, actorId);
            commit({ collection: 'quotations', id });
            return { ok: true, record: q };
        },

        /* ---- វិក្កយបត្រ ---- */

        /* ចេញវិក្កយបត្រ។ បើមាន quoteId ត្រូវតែជាសម្រង់តម្លៃដែលអតិថិជនបានយល់ព្រម (ឯកសារ 15) */
        createInvoice(data, actorId) {
            if (roleOf(actorId) !== 'SE') return fail('មានតែបុគ្គលិកលក់ទេដែលអាចចេញវិក្កយបត្របាន');
            ensure();
            const items = cleanItems(data.items);
            if (!items.length) return fail('សូមបន្ថែមមុខទំនិញយ៉ាងហោចណាស់ 1 ជួរ');
            let quote = null;
            if (data.quoteId) {
                quote = findQuote(data.quoteId);
                if (!quote) return fail('រកមិនឃើញសម្រង់តម្លៃដើម');
                if (quote.status !== 'ACCEPTED_BY_CUSTOMER') return fail('សម្រង់តម្លៃត្រូវតែទទួលបានការយល់ព្រមពីអតិថិជនសិន');
            } else if ((Number(data.discountPercent) || 0) > BMS_STORE.settings().discountSelfLimit) {
                return fail('ការបញ្ចុះតម្លៃលើសដែនកម្រិត ត្រូវបង្កើតជាសម្រង់តម្លៃដើម្បីសុំការអនុម័ត');
            }
            const id = nextId('invoices', 'INV');
            const inv = {
                id, customerId: data.customerId, repId: actorId, createdBy: actorId,
                quoteId: data.quoteId || null, date: toIsoDate(BMS_TODAY), dueDate: data.dueDate, status: 'ISSUED',
                discountPercent: Number(data.discountPercent) || 0, downPayment: Number(data.downPayment) || 0,
                note: data.note || '', items, payments: []
            };
            db.invoices.push(inv);
            audit(actorId, 'CREATE', 'invoice', id, `ទឹកប្រាក់ ${fmtUSD(docTotals(inv).grandTotal)}`);
            postInvoiceJournal(inv, actorId);
            if (quote) {
                quote.status = 'CONVERTED_TO_INVOICE';
                quote.invoiceId = id;
                quote.auditTrail.push(trailEntry('ACCEPTED_BY_CUSTOMER', 'CONVERTED_TO_INVOICE', 'CONVERT', actorId));
                audit(actorId, 'CONVERT', 'quotation', quote.id, `វិក្កយបត្រ ${id}`);
            }
            const msg = `វិក្កយបត្រ ${id} ត្រូវបានបង្កើត${data.quoteId ? `ពី ${data.quoteId}` : ''}`;
            notify('SM', null, 'INVOICE_CREATED', 'invoice', id, msg, actorId);
            notify('CA', null, 'INVOICE_CREATED', 'invoice', id, msg, actorId);
            commit({ collection: 'invoices', id });
            return { ok: true, record: inv };
        },

        /* សំណើលុបចោលវិក្កយបត្រ ត្រូវការការសម្រេចពីអ្នកគ្រប់គ្រងផ្នែកលក់ */
        requestVoidInvoice(invoiceId, reason, actorId) {
            ensure();
            const inv = db.invoices.find(i => i.id === invoiceId);
            if (!inv) return fail('រកមិនឃើញវិក្កយបត្រ');
            if (inv.repId !== actorId) return fail('អ្នកមិនមែនជាម្ចាស់វិក្កយបត្រនេះទេ');
            if (!reason || !reason.trim()) return fail('សូមបញ្ចូលមូលហេតុ');
            if (db.voidRequests.some(v => v.invoiceId === invoiceId && v.status === 'PENDING_APPROVAL')) return fail('មានសំណើលុបចោលកំពុងរង់ចាំរួចហើយ');
            const id = nextId('voidRequests', 'VR');
            db.voidRequests.push({
                id, invoiceId, customerId: inv.customerId, repId: actorId, date: nowIso(), status: 'PENDING_APPROVAL',
                stockReleased: false, reason: reason.trim(), decidedBy: null, decisionNote: null
            });
            audit(actorId, 'REQUEST_VOID', 'invoice', invoiceId, reason.trim());
            notify('SM', null, 'VOID_REQUESTED', 'voidRequest', id, `សំណើលុបចោលវិក្កយបត្រ ${invoiceId} រង់ចាំការសម្រេច`, actorId);
            commit({ collection: 'voidRequests', id });
            return { ok: true };
        },

        requestCreditIncrease(customerId, requestedLimit, reason, actorId) {
            ensure();
            const cust = db.customers.find(c => c.id === customerId);
            if (!cust) return fail('រកមិនឃើញអតិថិជន');
            if (db.creditRequests.some(c => c.customerId === customerId && c.status === 'PENDING_APPROVAL')) return { ok: true, duplicate: true };
            const id = nextId('creditRequests', 'CR');
            db.creditRequests.push({
                id, customerId, repId: actorId, date: nowIso(), status: 'PENDING_APPROVAL',
                currentLimit: cust.creditLimit, requestedLimit, reason: reason || '', decidedBy: null, decisionNote: null
            });
            audit(actorId, 'REQUEST_CREDIT', 'customer', customerId, `${fmtUSD(cust.creditLimit)} → ${fmtUSD(requestedLimit)}`);
            notify('SM', null, 'CREDIT_REQUESTED', 'creditRequest', id, `សំណើបង្កើនឥណទាន ${id} រង់ចាំការសម្រេច`, actorId);
            commit({ collection: 'creditRequests', id });
            return { ok: true };
        },

        /* សម្រេចសំណើលុបចោលវិក្កយបត្រ ឬសំណើបង្កើនឥណទាន (kind: 'void' | 'credit') */
        decideRequest(kind, id, decision, actorId, comment) {
            if (roleOf(actorId) !== 'SM') return fail('មានតែអ្នកគ្រប់គ្រងផ្នែកលក់ទេដែលអាចសម្រេចបាន');
            ensure();
            const list = kind === 'void' ? db.voidRequests : db.creditRequests;
            const req = list.find(r => r.id === id);
            if (!req) return fail('រកមិនឃើញសំណើ');
            if (req.status !== 'PENDING_APPROVAL') return fail('សំណើនេះត្រូវបានសម្រេចរួចហើយ');
            if (decision === 'reject' && !(comment && comment.trim())) return fail('សូមបញ្ចូលមូលហេតុនៃការបដិសេធ');
            const approved = decision === 'approve';
            req.status = approved ? 'APPROVED' : 'REJECTED';
            req.decidedBy = actorId;
            req.decisionNote = comment || null;
            if (approved && kind === 'void') {
                const inv = db.invoices.find(i => i.id === req.invoiceId);
                if (inv) {
                    inv.status = 'CANCELLED';
                    reverseJournalOf('INVOICE', inv.id, `លុបចោលវិក្កយបត្រ ${inv.id}`, actorId);
                }
            }
            if (approved && kind === 'credit') {
                const cust = db.customers.find(c => c.id === req.customerId);
                if (cust) cust.creditLimit = req.requestedLimit;
            }
            const label = kind === 'void' ? `សំណើលុបចោលវិក្កយបត្រ ${req.invoiceId}` : `សំណើបង្កើនឥណទាន ${id}`;
            audit(actorId, approved ? 'APPROVE' : 'REJECT', kind === 'void' ? 'voidRequest' : 'creditRequest', id, comment || '');
            notify('SE', req.repId, approved ? 'REQUEST_APPROVED' : 'REQUEST_REJECTED', kind === 'void' ? 'voidRequest' : 'creditRequest', id,
                `${label} ត្រូវបាន${approved ? 'អនុម័ត' : 'បដិសេធ'}${!approved && comment ? `៖ ${comment}` : ''}`, actorId);
            commit({ collection: kind === 'void' ? 'voidRequests' : 'creditRequests', id });
            return { ok: true, record: req };
        },

        /* កែវិក្កយបត្រដែលមិនទាន់មានការទូទាត់ (វិក្កយបត្រដែលទទួលប្រាក់ហើយ ត្រូវជាប់សោ) */
        updateInvoice(id, data, actorId) {
            ensure();
            const inv = db.invoices.find(i => i.id === id);
            if (!inv) return fail('រកមិនឃើញវិក្កយបត្រ');
            if (inv.repId !== actorId) return fail('អ្នកមិនមែនជាម្ចាស់វិក្កយបត្រនេះទេ');
            if (inv.status !== 'ISSUED') return fail('វិក្កយបត្រនេះត្រូវបានលុបចោលរួចហើយ');
            if ((inv.payments || []).length) return fail('វិក្កយបត្រដែលបានទទួលការទូទាត់ហើយ មិនអាចកែប្រែបានទេ');
            const items = cleanItems(data.items);
            if (!items.length) return fail('សូមបន្ថែមមុខទំនិញយ៉ាងហោចណាស់ 1 ជួរ');
            const disc = Number(data.discountPercent) || 0;
            if (!inv.quoteId && disc > BMS_STORE.settings().discountSelfLimit) return fail('ការបញ្ចុះតម្លៃលើសដែនកម្រិត ត្រូវបង្កើតជាសម្រង់តម្លៃដើម្បីសុំការអនុម័ត');
            Object.assign(inv, {
                customerId: data.customerId, items, discountPercent: disc, downPayment: Number(data.downPayment) || 0,
                dueDate: data.dueDate || inv.dueDate, note: data.note || ''
            });
            audit(actorId, 'UPDATE', 'invoice', id, `ទឹកប្រាក់ ${fmtUSD(docTotals(inv).grandTotal)}`);
            commit({ collection: 'invoices', id });
            return { ok: true, record: inv };
        },

        /* ---- អតិថិជន ---- */

        /* ចុះឈ្មោះអតិថិជនថ្មី។ ពិដានលើស $10,000 ត្រូវសុំការអនុម័តពីអ្នកគ្រប់គ្រងផ្នែកលក់ */
        createCustomer(data, actorId) {
            if (roleOf(actorId) !== 'SE') return fail('មានតែបុគ្គលិកលក់ទេដែលអាចចុះឈ្មោះអតិថិជនបាន');
            ensure();
            const maxNo = db.customers.reduce((m, c) => Math.max(m, parseInt(String(c.id).split('-')[1], 10) || 0), 0);
            const id = `CUST-${String(maxNo + 1).padStart(4, '0')}`;
            const requested = Number(data.creditLimit) || 0;
            const autoLimit = 10000;
            db.customers.push({
                id, name: data.name, tier: data.tier, contact: data.contact, phone: data.phone, email: data.email || '',
                address: data.address || '', creditLimit: Math.min(requested, autoLimit), paymentTerms: Number(data.paymentTerms) || 0,
                since: toIsoDate(BMS_TODAY), repId: actorId
            });
            audit(actorId, 'CREATE', 'customer', id, data.name);
            commit({ collection: 'customers', id });
            if (requested > autoLimit) actions.requestCreditIncrease(id, requested, 'ពិដានឥណទានពេលចុះឈ្មោះអតិថិជនថ្មី', actorId);
            return { ok: true, id, creditRequested: requested > autoLimit };
        },

        /* កែព័ត៌មានអតិថិជន។ ការបង្កើនពិដានឥណទានក្លាយជាសំណើត្រូវការអនុម័ត (ការបន្ថយធ្វើភ្លាមៗ) */
        updateCustomer(id, data, actorId) {
            ensure();
            const c = db.customers.find(x => x.id === id);
            if (!c) return fail('រកមិនឃើញអតិថិជន');
            if (c.repId !== actorId) return fail('អតិថិជននេះមិនស្ថិតក្រោមការទទួលបន្ទុករបស់អ្នកទេ');
            const requested = Number(data.creditLimit);
            let creditRequested = false;
            Object.assign(c, {
                name: data.name, tier: data.tier, contact: data.contact, phone: data.phone,
                email: data.email || '', address: data.address || '', paymentTerms: Number(data.paymentTerms) || 0
            });
            if (!isNaN(requested)) {
                if (requested <= c.creditLimit) c.creditLimit = requested;
                else creditRequested = true;
            }
            audit(actorId, 'UPDATE', 'customer', id, data.name);
            commit({ collection: 'customers', id });
            if (creditRequested) actions.requestCreditIncrease(id, requested, 'សុំបង្កើនពិដានឥណទាន', actorId);
            return { ok: true, creditRequested };
        },

        /* ---- ការទូទាត់ និងបង្កាន់ដៃ ---- */

        /* អតិថិជនប្រកាសថាបានទូទាត់តាម KHQR។ វិក្កយបត្រមិនប្តូរស្ថានភាពទេ រហូតដល់គណនេយ្យករចេញបង្កាន់ដៃ */
        submitKhqrPayment(invoiceId, actorId) {
            ensure();
            const inv = db.invoices.find(i => i.id === invoiceId);
            if (!inv) return fail('រកមិនឃើញវិក្កយបត្រ');
            if (customerActor(actorId) !== inv.customerId) return fail('វិក្កយបត្រនេះមិនមែនជារបស់អតិថិជននេះទេ');
            const st = invoiceState(inv);
            if (st.key === 'CANCELLED' || st.due <= 0.005) return fail('វិក្កយបត្រនេះគ្មានទឹកប្រាក់ត្រូវទូទាត់ទេ');
            if (db.paymentClaims.some(c => c.invoiceId === invoiceId && c.status === 'PENDING_VERIFICATION')) return fail('ការទូទាត់នេះកំពុងរង់ចាំការផ្ទៀងផ្ទាត់ពីផ្នែកគណនេយ្យ');
            const id = nextId('paymentClaims', 'PC');
            const claim = {
                id, invoiceId, customerId: inv.customerId, amount: r2(st.due), method: 'KHQR',
                bankRef: `BKG-${String(Math.floor(10000000 + Math.random() * 89999999))}`, at: nowIso(),
                status: 'PENDING_VERIFICATION', receiptId: null
            };
            db.paymentClaims.push(claim);
            audit(actorId, 'PAY_KHQR', 'invoice', invoiceId, `${fmtUSD(claim.amount)} · ${claim.bankRef}`);
            notify('APAR', null, 'PAYMENT_CLAIMED', 'paymentClaim', id, `អតិថិជនបានទូទាត់ ${fmtUSD(claim.amount)} តាម KHQR សម្រាប់វិក្កយបត្រ ${invoiceId} — រង់ចាំផ្ទៀងផ្ទាត់`, actorId);
            commit({ collection: 'paymentClaims', id });
            return { ok: true, record: claim };
        },

        /* ចេញបង្កាន់ដៃទទួលប្រាក់ (AP/AR): ចុះប្រាក់ទៅវិក្កយបត្រ បង្កើតទិន្នានុប្បវត្តិ និងជូនដំណឹង */
        recordReceipt(data, actorId) {
            if (roleOf(actorId) !== 'APAR') return fail('មានតែគណនេយ្យករបំណុល និងទារប្រាក់ទេដែលអាចចេញបង្កាន់ដៃបាន');
            ensure();
            const inv = db.invoices.find(i => i.id === data.invoiceId);
            if (!inv) return fail('រកមិនឃើញវិក្កយបត្រ');
            if (!CASH_ACCOUNT[data.method]) return fail('វិធីសាស្ត្រទូទាត់មិនត្រឹមត្រូវ');
            const amount = r2(Number(data.amount));
            if (!(amount > 0)) return fail('សូមបញ្ចូលទឹកប្រាក់ទទួលត្រឹមត្រូវ');
            const st = invoiceState(inv);
            if (st.key === 'CANCELLED') return fail('វិក្កយបត្រនេះត្រូវបានលុបចោលរួចហើយ');
            if (amount > st.due + 0.005) return fail(`ទឹកប្រាក់លើសពីសមតុល្យនៅជំពាក់ ${fmtUSD(st.due)}`);
            const claim = data.claimId ? db.paymentClaims.find(c => c.id === data.claimId) : null;
            if (data.claimId && (!claim || claim.status !== 'PENDING_VERIFICATION')) return fail('ការប្រកាសទូទាត់នេះត្រូវបានដោះស្រាយរួចហើយ');

            const id = nextId('receipts', 'RCP');
            const date = data.date || toIsoDate(BMS_TODAY);
            const receipt = {
                id, invoiceId: inv.id, customerId: inv.customerId, date, method: data.method,
                bankRef: data.bankRef || (claim ? claim.bankRef : ''), amount, status: 'VERIFIED', receivedBy: actorId,
                note: data.note || '', journalId: null
            };
            const je = postJournal({
                date, description: `ទទួលប្រាក់ពី ${inv.customerId} តាមវិក្កយបត្រ ${inv.id}`, source: 'RECEIPT', reference: id, status: 'POSTED',
                lines: [{ accountCode: CASH_ACCOUNT[data.method], dr: amount, description: id }, { accountCode: '1131', cr: amount, description: inv.id }]
            }, actorId);
            receipt.journalId = je.id;
            db.receipts.push(receipt);
            inv.payments.push({ date, amount, method: data.method, receiptId: id });
            if (claim) { claim.status = 'RECORDED'; claim.receiptId = id; }

            audit(actorId, 'RECEIPT', 'invoice', inv.id, `${id} · ${fmtUSD(amount)}`);
            const msg = `ការទូទាត់ ${fmtUSD(amount)} ទទួលបានសម្រាប់ ${inv.id}`;
            notify('SE', inv.repId, 'PAYMENT_RECEIVED', 'invoice', inv.id, msg, actorId);
            notify('SM', null, 'PAYMENT_RECEIVED', 'invoice', inv.id, msg, actorId);
            notify('CA', null, 'PAYMENT_RECEIVED', 'invoice', inv.id, msg, actorId);
            notify('CUSTOMER', inv.customerId, 'PAYMENT_RECEIVED', 'invoice', inv.id, `បានទទួលការទូទាត់ ${fmtUSD(amount)} សម្រាប់វិក្កយបត្រ ${inv.id} — បង្កាន់ដៃ ${id}`, actorId);
            commit({ collection: 'receipts', id });
            return { ok: true, record: receipt, journal: je };
        },

        /* ប្រធានគណនេយ្យបង្កើតទិន្នានុប្បវត្តិដោយដៃ (ព្រាង ឬចុះបញ្ជី) */
        createJournalEntry(data, actorId) {
            if (roleOf(actorId) !== 'CA') return fail('មានតែប្រធានគណនេយ្យទេដែលអាចបង្កើតទិន្នានុប្បវត្តិបាន');
            ensure();
            const lines = (data.lines || []).filter(l => l.accountCode && ((l.dr || 0) > 0 || (l.cr || 0) > 0));
            if (lines.length < 2) return fail('ត្រូវមានជួរគណនីយ៉ាងហោចណាស់ 2 ជួរ');
            if (lines.some(l => !db.accounts.some(a => a.code === l.accountCode && !a.isGroup))) return fail('គណនីមិនត្រឹមត្រូវ');
            const sums = journalSums(lines);
            const status = data.status === 'DRAFT' ? 'DRAFT' : 'POSTED';
            if (status === 'POSTED' && Math.abs(sums.dr - sums.cr) > 0.005) return fail('មិនអាចចុះបញ្ជីបានឡើយ ដោយសារឥណពន្ធមិនស្មើឥណទាន');
            const je = postJournal({ date: data.date, description: data.description, source: 'MANUAL', reference: data.reference, status, lines }, actorId);
            audit(actorId, status === 'POSTED' ? 'POST_JOURNAL' : 'SAVE_JOURNAL', 'journalEntry', je.id, data.description);
            commit({ collection: 'journalEntries', id: je.id });
            return { ok: true, record: je };
        },

        /* ---- បំពង់លំហូរការលក់ ---- */
        moveDeal(dealId, stage, actorId) {
            ensure();
            const deal = db.pipelineDeals.find(d => d.id === dealId);
            if (!deal) return fail('រកមិនឃើញឱកាសលក់');
            if (deal.stage === stage) return { ok: true, unchanged: true };
            const from = deal.stage;
            deal.stage = stage;
            audit(actorId, 'MOVE_DEAL', 'pipelineDeal', dealId, `${from} → ${stage}`);
            commit({ collection: 'pipelineDeals', id: dealId });
            return { ok: true, record: deal };
        }
    };

    /* ===== 6. ការជូនដំណឹង ===== */

    function notificationsFor(role, userId) {
        return ensure().notifications
            .filter(n => n.toRole === role && (!n.toUserId || n.toUserId === userId))
            .sort((a, b) => b.at.localeCompare(a.at));
    }

    function markAllRead(role, userId) {
        let changed = false;
        ensure().notifications.forEach(n => {
            if (n.toRole === role && (!n.toUserId || n.toUserId === userId) && !n.isRead) {
                n.isRead = true;
                changed = true;
            }
        });
        if (changed) commit({ collection: 'notifications' });
    }

    /* ===== 7. ចំណុចចូលសាធារណៈ ===== */

    window.addEventListener('storage', e => {
        if (e.key !== BMS_STORE_KEY) return;
        db = null;
        emit({ external: true });
    });

    return {
        ensure,
        settings: () => ensure().settings,
        list: name => ensure()[name],
        get: (name, id) => ensure()[name].find(x => x.id === id),
        user: userOf,
        nextId,
        notificationsFor,
        markAllRead,
        accountBalances,
        journalSums,
        actions,
        /* កំណត់ទិន្នន័យគំរូឡើងវិញ (ប៊ូតុងនៅទំព័រចូលប្រព័ន្ធ) */
        reset() {
            db = bmsBuildSeed(BMS_TODAY);
            sweepExpiry();
            commit({ reset: true });
        }
    };
})();
