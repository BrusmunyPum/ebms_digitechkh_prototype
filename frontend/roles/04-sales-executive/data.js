/* ច្រកបុគ្គលិកប្រតិបត្តិផ្នែកលក់ — ការបង្ហាញទិន្នន័យ (projection)

   ⚠️ គោលការណ៍សុវត្ថិភាពតឹងរ៉ឹង (Zero Cost Leakage)
   ឯកសារនេះលើកយកតែ "វាលដែលអនុញ្ញាត" ចេញពីឃ្លាំងទិន្នន័យរួម (whitelist មិនមែន blacklist)។
   វាលថ្មីដែលបន្ថែមក្នុង seed.js នឹងមើលមិនឃើញនៅទីនេះ លុះត្រាតែបន្ថែមក្នុងបញ្ជីខាងក្រោមដោយចេតនា។
   បុគ្គលិកលក់មើលឃើញត្រឹមតែតម្លៃលក់តាមកម្រិតអតិថិជនប៉ុណ្ណោះ គ្មានថ្លៃដើមទិញ ឬកម្រិតចំណេញឡើយ។

   វិសាលភាព៖ អតិថិជន សម្រង់តម្លៃ និងវិក្កយបត្រដែលបុគ្គលិកនេះទទួលបន្ទុកផ្ទាល់ប៉ុណ្ណោះ។
   ទំព័រអានតាមអនុគមន៍ listXxx និង getXxx ហើយសរសេរតាម seActions ប៉ុណ្ណោះ (មិនប៉ះឃ្លាំងដោយផ្ទាល់)។ */

const CURRENT_USER_ID = 'U-SE-01';

const DISCOUNT_SELF_LIMIT = BMS_STORE.settings().discountSelfLimit;
const MERCHANT = BMS_STORE.settings().merchant;

function pick(obj, fields) {
    const out = {};
    fields.forEach(f => { if (obj[f] !== undefined) out[f] = obj[f]; });
    return out;
}

const CUSTOMER_FIELDS = ['id', 'name', 'tier', 'contact', 'phone', 'email', 'address', 'creditLimit', 'paymentTerms', 'since'];
const PRODUCT_FIELDS = ['sku', 'name', 'unit', 'stock', 'price'];
const QUOTE_FIELDS = ['id', 'customerId', 'date', 'validUntil', 'status', 'pendingLevel', 'requiredLevels', 'approvals', 'discountPercent',
    'downPayment', 'note', 'rejectionReason', 'cancellationReason', 'declineReason', 'acceptedVia', 'invoiceId', 'items', 'auditTrail'];
const INVOICE_FIELDS = ['id', 'customerId', 'quoteId', 'date', 'dueDate', 'status', 'discountPercent', 'downPayment', 'note', 'items', 'payments'];

function currentRep() {
    const u = BMS_STORE.user(CURRENT_USER_ID);
    const mgr = BMS_STORE.user(u.managerId);
    return {
        id: u.id, name: u.name, initials: u.initials, phone: u.phone,
        monthlyTarget: u.monthlyTarget, commissionRate: u.commissionRate,
        manager: mgr ? mgr.name : ''
    };
}

const CURRENT_REP = currentRep();

/* ===== អតិថិជន ទំនិញ ===== */

function listCustomers() {
    return BMS_STORE.list('customers')
        .filter(c => c.repId === CURRENT_USER_ID)
        .map(c => ({ ...pick(c, CUSTOMER_FIELDS), code: c.id }));
}

function getCustomer(id) {
    return listCustomers().find(c => c.id === id);
}

function listProducts() {
    return BMS_STORE.list('products').map(p => ({ ...pick(p, PRODUCT_FIELDS), category: CATEGORIES[p.category] || p.category, categoryId: p.category }));
}

function getProduct(sku) {
    return listProducts().find(p => p.sku === sku);
}

function tierLabel(tier) {
    return TIER_LABEL[tier] || tier;
}

function tierTone(tier) {
    return TIER_TONE[tier] || TIER_TONE.retail;
}

/* តម្លៃលក់អាស្រ័យលើកម្រិតអតិថិជន (ស្តង់ដារលេខ 10) */
function tierPrice(sku, tier) {
    const p = getProduct(sku);
    return p ? p.price[tier] : 0;
}

/* ===== សម្រង់តម្លៃ និងវិក្កយបត្រ ===== */

function listQuotes() {
    return BMS_STORE.list('quotations')
        .filter(q => q.repId === CURRENT_USER_ID)
        .map(q => pick(q, QUOTE_FIELDS));
}

function getQuote(id) {
    return listQuotes().find(q => q.id === id);
}

function listInvoices() {
    return BMS_STORE.list('invoices')
        .filter(i => i.repId === CURRENT_USER_ID)
        .map(i => ({ ...pick(i, INVOICE_FIELDS), paid: invoicePaid(i) }));
}

function getInvoice(id) {
    return listInvoices().find(i => i.id === id);
}

/* បំណុលនៅសល់របស់អតិថិជនម្នាក់ (ផ្អែកលើវិក្កយបត្រដែលមិនទាន់ទូទាត់ពេញ) */
function customerDebt(customerId) {
    return listInvoices()
        .filter(i => i.customerId === customerId)
        .reduce((sum, i) => sum + invoiceState(i).due, 0);
}

/* ===== សកម្មភាព — ភ្ជាប់អត្តសញ្ញាណអ្នកប្រើជាមួយសកម្មភាពរបស់ឃ្លាំង ===== */

const seActions = {
    createQuotation: (data, submit) => BMS_STORE.actions.createQuotation(data, CURRENT_USER_ID, submit),
    updateQuotation: (id, data, submit) => BMS_STORE.actions.updateQuotation(id, data, CURRENT_USER_ID, submit),
    submitQuotation: id => BMS_STORE.actions.submitQuotation(id, CURRENT_USER_ID),
    cancelQuotation: (id, reason) => BMS_STORE.actions.cancelQuotation(id, CURRENT_USER_ID, reason),
    sendQuotation: id => BMS_STORE.actions.sendQuotation(id, CURRENT_USER_ID),
    recordAcceptance: id => BMS_STORE.actions.acceptQuotation(id, CURRENT_USER_ID, 'SE_RECORDED'),
    recordDecline: (id, reason) => BMS_STORE.actions.declineQuotation(id, CURRENT_USER_ID, reason),
    createInvoice: data => BMS_STORE.actions.createInvoice(data, CURRENT_USER_ID),
    updateInvoice: (id, data) => BMS_STORE.actions.updateInvoice(id, data, CURRENT_USER_ID),
    createCustomer: data => BMS_STORE.actions.createCustomer(data, CURRENT_USER_ID),
    updateCustomer: (id, data) => BMS_STORE.actions.updateCustomer(id, data, CURRENT_USER_ID),
    requestVoid: (invoiceId, reason) => BMS_STORE.actions.requestVoidInvoice(invoiceId, reason, CURRENT_USER_ID),
    requestCreditIncrease: (customerId, requestedLimit, reason) => BMS_STORE.actions.requestCreditIncrease(customerId, requestedLimit, reason, CURRENT_USER_ID)
};

/* ===== វិសាលភាពខែបច្ចុប្បន្ន =====
   ផ្ទាំងការងារមិនមានតម្រងកាលបរិច្ឆេទទេ (ឯកសាររចនាលេខ 04 ផ្នែក 3.1)
   គ្រប់តួលេខគិតលើខែបច្ចុប្បន្ន ចាប់ពីថ្ងៃទី 1 ដល់ថ្ងៃនេះ។ */

function monthRange(monthsBack) {
    const back = monthsBack || 0;
    const start = new Date(BMS_TODAY.getFullYear(), BMS_TODAY.getMonth() - back, 1);
    const end = back === 0
        ? new Date(BMS_TODAY)
        : new Date(BMS_TODAY.getFullYear(), BMS_TODAY.getMonth() - back + 1, 0);
    return { start, end };
}

/* ===== អតិថិជនសម្រាប់ផ្ទាំងកាត =====
   បន្ថែមបំណុល ការប្រើប្រាស់ឥណទាន និងកាលបរិច្ឆេទទិញចុងក្រោយ ទៅលើការបង្ហាញអតិថិជន។
   គ្មានថ្លៃដើម ឬកម្រិតចំណេញត្រូវបានគណនានៅទីនេះឡើយ។ */

function customerCards() {
    const invs = listInvoices();
    return listCustomers().map(c => {
        const mine = invs.filter(i => i.customerId === c.id && i.status !== 'CANCELLED');
        const debt = mine.reduce((sum, i) => sum + invoiceState(i).due, 0);
        const overdue = mine.filter(i => invoiceState(i).key === 'OVERDUE');
        const overdueAmount = overdue.reduce((sum, i) => sum + invoiceState(i).due, 0);
        const last = mine.map(i => i.date).sort().pop() || '';
        return {
            ...c,
            debt,
            overdueCount: overdue.length,
            overdueAmount,
            orderCount: mine.length,
            lastOrder: last,
            usage: c.creditLimit ? Math.min((debt / c.creditLimit) * 100, 100) : 0,
            overLimit: c.creditLimit > 0 && debt > c.creditLimit
        };
    });
}

/* អក្សរដើមសម្រាប់រូបតំណាងអតិថិជន (ព្យាង្គដំបូងនៃពាក្យចុងក្រោយដែលមានន័យ) */
function customerInitial(name) {
    const words = String(name || '').trim().split(/\s+/).filter(Boolean);
    const word = words.length > 1 ? words[words.length - 1] : (words[0] || '?');
    return Array.from(word)[0] || '?';
}

/* ===== បញ្ជីទូរស័ព្ទតាមដានថ្ងៃនេះ (ឯកសាររចនាលេខ 04 ផ្នែក 3.1 ផ្នែក គ) =====
   តម្រៀប៖ អតិថិជនជំពាក់ហួសកាលកំណត់មុន (ទឹកប្រាក់ច្រើនទៅតិច) បន្ទាប់មកកិច្ចការតាមដានតាមកាលវិភាគ។ */

function callList(limit) {
    const rows = [];
    const seen = {};

    listInvoices().map(i => ({ i, s: invoiceState(i) }))
        .filter(x => x.s.key === 'OVERDUE')
        .sort((a, b) => b.s.due - a.s.due)
        .forEach(x => {
            const c = getCustomer(x.i.customerId);
            if (!c || seen[c.id]) return;
            seen[c.id] = true;
            rows.push({
                customer: c,
                reason: 'AR_OVERDUE',
                reasonLabel: 'បំណុលហួសកាលកំណត់',
                tone: 'rose',
                amount: x.s.due,
                detail: `${x.i.id} · យឺត ${x.s.overdueDays} ថ្ងៃ`,
                href: `${getRoleRoot()}/invoices/view-invoice.html?id=${x.i.id}`
            });
        });

    followUps().filter(f => f.urgency !== 'upcoming').forEach(f => {
        if (!f.customer || seen[f.customer.id]) return;
        seen[f.customer.id] = true;
        rows.push({
            customer: f.customer,
            reason: f.urgency === 'overdue' ? 'FOLLOW_LATE' : 'FOLLOW_TODAY',
            reasonLabel: f.urgency === 'overdue' ? `កិច្ចការតាមដានយឺត ${f.late} ថ្ងៃ` : 'កិច្ចការតាមដានថ្ងៃនេះ',
            tone: f.urgency === 'overdue' ? 'amber' : 'sky',
            amount: 0,
            detail: `${f.refId} · ${f.note}`,
            href: f.type === 'quote' ? `${getRoleRoot()}/quotes/view-quote.html?id=${f.refId}` : ''
        });
    });

    return limit ? rows.slice(0, limit) : rows;
}

/* លេខទូរស័ព្ទបិទបាំងមួយផ្នែក — បង្ហាញពេញនៅពេលចុចប៊ូតុងទូរស័ព្ទ */
function maskedPhone(phone) {
    const digits = String(phone || '');
    if (digits.length < 5) return digits;
    return digits.slice(0, digits.length - 4).replace(/\d/g, '•') + digits.slice(-4);
}

/* ===== សម្រង់តម្លៃដែលត្រូវការសកម្មភាពពីខ្ញុំ (ឯកសាររចនាលេខ 04 ផ្នែក 3.1 ផ្នែក ឃ) =====
   រួមទាំងរង់ចាំអនុម័ត បដិសេធត្រូវកែ អនុម័តរួចត្រូវផ្ញើ និងអតិថិជនព្រមរួចត្រូវបំប្លែង។ */

const SE_ACTION_HINT = {
    PENDING_APPROVAL: { label: 'រង់ចាំការអនុម័ត', tone: 'amber', cta: '' },
    REJECTED: { label: 'ត្រូវកែតាមមតិអ្នកគ្រប់គ្រង', tone: 'rose', cta: 'edit' },
    APPROVED: { label: 'ត្រូវផ្ញើជូនអតិថិជន', tone: 'sky', cta: 'send' },
    ACCEPTED_BY_CUSTOMER: { label: 'អតិថិជនបានយល់ព្រម ត្រូវបំប្លែង', tone: 'emerald', cta: 'convert' }
};

function quotesNeedingAction(limit) {
    const order = ['REJECTED', 'ACCEPTED_BY_CUSTOMER', 'APPROVED', 'PENDING_APPROVAL'];
    const rows = listQuotes()
        .filter(q => SE_ACTION_HINT[q.status])
        .sort((a, b) => {
            const d = order.indexOf(a.status) - order.indexOf(b.status);
            return d !== 0 ? d : new Date(b.date) - new Date(a.date);
        });
    return limit ? rows.slice(0, limit) : rows;
}

/* ===== សូចនាករផ្ទាល់ខ្លួន ===== */

function myMetrics(range) {
    const invs = listInvoices().filter(i => i.status !== 'CANCELLED' && inRange(i.date, range));
    const revenue = invs.reduce((sum, i) => sum + docTotals(i).grandTotal, 0);
    const collected = invs.reduce((sum, i) => sum + i.paid, 0);
    const receivable = invs.reduce((sum, i) => sum + invoiceState(i).due, 0);

    const overdue = listInvoices().filter(i => invoiceState(i).key === 'OVERDUE');
    const overdueAmount = overdue.reduce((sum, i) => sum + invoiceState(i).due, 0);

    const qs = listQuotes().filter(q => inRange(q.date, range));
    const converted = qs.filter(q => q.status === 'CONVERTED_TO_INVOICE').length;

    return {
        revenue,
        collected,
        receivable,
        overdue,
        overdueAmount,
        invoiceCount: invs.length,
        quoteCount: qs.length,
        convertedCount: converted,
        winRate: qs.length ? (converted / qs.length) * 100 : 0,
        pendingCount: listQuotes().filter(q => q.status === 'PENDING_APPROVAL').length,
        target: CURRENT_REP.monthlyTarget,
        quotaPercent: CURRENT_REP.monthlyTarget ? (revenue / CURRENT_REP.monthlyTarget) * 100 : 0,
        commission: collected * (CURRENT_REP.commissionRate / 100)
    };
}

/* ការលក់ 4 សប្តាហ៍ចុងក្រោយ (ក្រុមតាម 7 ថ្ងៃ បញ្ចប់នៅថ្ងៃនេះ) — គណនាពីវិក្កយបត្រពិត */
function weeklySales() {
    const invs = listInvoices().filter(i => i.status !== 'CANCELLED');
    return [3, 2, 1, 0].map((back, idx) => {
        const end = new Date(BMS_TODAY); end.setDate(end.getDate() - back * 7);
        const start = new Date(end); start.setDate(start.getDate() - 6);
        const actual = invs.filter(i => inRange(i.date, { start, end })).reduce((s, i) => s + docTotals(i).grandTotal, 0);
        return { week: `សប្តាហ៍ទី ${idx + 1}`, actual: Math.round(actual) };
    });
}

/* ការរំលឹកតាមដានអតិថិជន — តម្រៀបតាមភាពបន្ទាន់ */
function followUps() {
    return BMS_STORE.list('followUps')
        .filter(f => f.repId === CURRENT_USER_ID)
        .map(f => {
            const late = daysBetween(f.due);
            return {
                ...f,
                customer: getCustomer(f.customerId),
                late,
                urgency: late > 0 ? 'overdue' : late === 0 ? 'today' : 'upcoming'
            };
        }).sort((a, b) => b.late - a.late);
}

/* ===== ផ្លាកលេខក្នុងម៉ឺនុយចំហៀង (ហៅដោយ portal.js) ===== */

function totalPending() {
    return listQuotes().filter(q => q.status === 'PENDING_APPROVAL').length;
}

function totalAlerts() {
    return listInvoices().filter(i => invoiceState(i).key === 'OVERDUE').length;
}

/* ===== កូដ KHQR បាគង (គំរូសាកល្បង) =====
   បង្កើតខ្លឹមសារ QR ថាមវន្តតាមទឹកប្រាក់នៃវិក្កយបត្រនីមួយៗ។
   នេះជាទម្រង់គំរូសម្រាប់ការបង្ហាញប៉ុណ្ណោះ មិនមែនជាកូដដែលចេញដោយធនាគារទេ។ */
function buildKhqrPayload(invoiceId, amount) {
    const amt = Number(amount).toFixed(2);
    return [
        '00020101',
        `0212${MERCHANT.account}`,
        '5303840',
        `54${String(amt.length).padStart(2, '0')}${amt}`,
        '5802KH',
        `59${String(MERCHANT.name.length).padStart(2, '0')}${MERCHANT.name}`,
        `60${String(MERCHANT.city.length).padStart(2, '0')}${MERCHANT.city}`,
        `62${String(invoiceId.length + 4).padStart(2, '0')}01${String(invoiceId.length).padStart(2, '0')}${invoiceId}`
    ].join('');
}

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

const SE_NOTE_STYLE = {
    QUOTE_APPROVED: { icon: 'mdi:check-decagram-outline', tone: 'success' },
    QUOTE_REJECTED: { icon: 'mdi:close-octagon-outline', tone: 'danger' },
    QUOTE_ACCEPTED: { icon: 'mdi:handshake-outline', tone: 'success' },
    QUOTE_DECLINED: { icon: 'mdi:thumb-down-outline', tone: 'warning' },
    REQUEST_APPROVED: { icon: 'mdi:check-circle-outline', tone: 'success' },
    REQUEST_REJECTED: { icon: 'mdi:close-circle-outline', tone: 'danger' }
};

function seNoteHref(n) {
    const root = getRoleRoot();
    if (n.entityType === 'quotation') return `${root}/quotes/view-quote.html?id=${n.entityId}`;
    if (n.entityType === 'invoice') return `${root}/invoices/view-invoice.html?id=${n.entityId}`;
    return '';
}

function portalNotifications() {
    const list = [];

    // ព្រឹត្តិការណ៍ពីតួនាទីផ្សេង (អនុម័ត បដិសេធ អតិថិជនឆ្លើយតប)
    BMS_STORE.notificationsFor('SE', CURRENT_USER_ID).slice(0, 6).forEach(n => {
        const style = SE_NOTE_STYLE[n.type] || { icon: 'mdi:bell-outline', tone: 'info' };
        list.push({ ...style, title: n.message, time: fmtKhDateTime(n.at), href: seNoteHref(n), unread: !n.isRead });
    });

    // កិច្ចការតាមដានដល់កំណត់ ឬហួសកំណត់
    followUps().filter(f => f.urgency !== 'upcoming').slice(0, 3).forEach(f => {
        list.push({
            icon: f.type === 'quote' ? 'mdi:phone-outgoing-outline' : 'mdi:calendar-check-outline',
            tone: f.urgency === 'overdue' ? 'danger' : 'warning',
            title: f.urgency === 'overdue'
                ? `កិច្ចការតាមដានយឺត ${f.late} ថ្ងៃ · ${f.refId}`
                : `កិច្ចការតាមដានថ្ងៃនេះ · ${f.refId}`,
            note: `${f.customer ? f.customer.name : ''} · ${f.note}`,
            time: fmtKhDate(f.due)
        });
    });

    // សម្រង់តម្លៃជិតផុតសុពលភាព
    listQuotes().filter(q => ['APPROVED', 'SENT_TO_CUSTOMER'].includes(q.status))
        .map(q => ({ q, e: quoteExpiry(q) }))
        .filter(x => x.e.days <= 3)
        .sort((a, b) => a.e.days - b.e.days)
        .slice(0, 3)
        .forEach(x => {
            const c = getCustomer(x.q.customerId);
            list.push({
                icon: 'mdi:file-clock-outline',
                tone: x.e.days < 0 ? 'danger' : 'warning',
                title: `សម្រង់តម្លៃ ${x.q.id} ${x.e.label}`,
                note: `${c ? c.name : ''} · ${fmtUSD(docTotals(x.q).grandTotal)}`,
                time: fmtKhDate(x.q.validUntil),
                href: `${getRoleRoot()}/quotes/view-quote.html?id=${x.q.id}`
            });
        });

    // វិក្កយបត្រហួសកាលកំណត់ទូទាត់របស់ខ្ញុំ
    const overdue = listInvoices().map(i => ({ i, s: invoiceState(i) }))
        .filter(x => x.s.key === 'OVERDUE')
        .sort((a, b) => b.s.overdueDays - a.s.overdueDays);
    if (overdue.length) {
        const total = overdue.reduce((sum, x) => sum + x.s.due, 0);
        const c = getCustomer(overdue[0].i.customerId);
        list.push({
            icon: 'mdi:cash-clock',
            tone: 'danger',
            title: `វិក្កយបត្រហួសកាលកំណត់ ${overdue.length} ច្បាប់`,
            note: `សរុប ${fmtUSD(total)} · យឺតបំផុត ${c ? c.name : ''} ${overdue[0].s.overdueDays} ថ្ងៃ`,
            href: `${getRoleRoot()}/quotes/quotes.html?tab=invoices&status=OVERDUE`
        });
    }

    return list;
}

/* ការជូនដំណឹងដែលមិនទាន់អាន — ប្រើសម្រាប់ចំណុចក្រហមលើកណ្តឹង */
function unreadNotificationCount() {
    return BMS_STORE.notificationsFor('SE', CURRENT_USER_ID).filter(n => !n.isRead).length;
}

function markNotificationsRead() {
    BMS_STORE.markAllRead('SE', CURRENT_USER_ID);
}
