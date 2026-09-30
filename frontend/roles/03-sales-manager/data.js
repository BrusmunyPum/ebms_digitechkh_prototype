/* ច្រកគ្រប់គ្រងផ្នែកលក់ — ការបង្ហាញទិន្នន័យ (projection) ពីឃ្លាំងទិន្នន័យរួម
   គ្រប់ទំព័រអានតាមអនុគមន៍ខាងក្រោម ដូច្នេះលេខនៅលើផ្ទាំងគ្រប់គ្រង បញ្ជីអនុម័ត និងរបាយការណ៍
   ស៊ីសង្វាក់គ្នាជានិច្ច ហើយស៊ីគ្នាជាមួយច្រកបុគ្គលិកលក់ (ឯកសារតែមួយក្នុង bms_store_v2)។
   ការសម្រេច (អនុម័ត បដិសេធ) សរសេរតាម smActions ប៉ុណ្ណោះ ដែលត្រួតពិនិត្យស្ថានភាព កត់ត្រា និងជូនដំណឹង។ */

const CURRENT_USER_ID = 'U-SM-01';

function pick(obj, fields) {
    const out = {};
    fields.forEach(f => { if (obj[f] !== undefined) out[f] = obj[f]; });
    return out;
}

const CUSTOMER_FIELDS = ['id', 'name', 'tier', 'contact', 'phone', 'creditLimit', 'repId'];
const PRODUCT_FIELDS = ['sku', 'name', 'unit', 'price'];
const QUOTE_FIELDS = ['id', 'customerId', 'repId', 'date', 'validUntil', 'status', 'pendingLevel', 'requiredLevels', 'approvals',
    'discountPercent', 'downPayment', 'note', 'rejectionReason', 'items', 'auditTrail'];
const INVOICE_FIELDS = ['id', 'customerId', 'repId', 'quoteId', 'date', 'dueDate', 'status', 'discountPercent', 'downPayment', 'items', 'payments'];

/* ក្រុមបុគ្គលិកលក់ក្រោមការគ្រប់គ្រង */
function listReps() {
    return BMS_STORE.list('users')
        .filter(u => u.role === 'SE' && u.managerId === CURRENT_USER_ID)
        .map(u => ({ id: u.id, name: u.name, initials: u.initials, target: u.monthlyTarget, commission: u.commissionRate }));
}

function getRep(id) {
    return listReps().find(r => r.id === id);
}

function listCustomers() {
    return BMS_STORE.list('customers').map(c => pick(c, CUSTOMER_FIELDS));
}

function getCustomer(id) {
    return listCustomers().find(c => c.id === id);
}

function listProducts() {
    return BMS_STORE.list('products').map(p => ({ ...pick(p, PRODUCT_FIELDS), category: p.category }));
}

function getProduct(sku) {
    return listProducts().find(p => p.sku === sku);
}

function tierLabel(tier) {
    return TIER_LABEL[tier] || tier;
}

function listQuotes() {
    return BMS_STORE.list('quotations').map(q => pick(q, QUOTE_FIELDS));
}

function getQuote(id) {
    return listQuotes().find(q => q.id === id);
}

function listInvoices() {
    return BMS_STORE.list('invoices').map(i => ({ ...pick(i, INVOICE_FIELDS), paid: invoicePaid(i) }));
}

/* បំណុលនៅសល់របស់អតិថិជនម្នាក់ */
function customerDebt(customerId) {
    return listInvoices()
        .filter(i => i.customerId === customerId)
        .reduce((sum, i) => sum + invoiceState(i).due, 0);
}

function quoteTotals(quote) {
    return docTotals(quote);
}

/* ===== សកម្មភាព ===== */

const smActions = {
    approveQuote: (id, comment) => BMS_STORE.actions.approveQuotation(id, CURRENT_USER_ID, comment),
    rejectQuote: (id, reason) => BMS_STORE.actions.rejectQuotation(id, CURRENT_USER_ID, reason),
    decideVoid: (id, decision, comment) => BMS_STORE.actions.decideRequest('void', id, decision, CURRENT_USER_ID, comment),
    decideCredit: (id, decision, comment) => BMS_STORE.actions.decideRequest('credit', id, decision, CURRENT_USER_ID, comment),
    moveDeal: (id, stage) => BMS_STORE.actions.moveDeal(id, stage, CURRENT_USER_ID)
};

/* ===== សំណើរង់ចាំការអនុម័ត =====
   សម្រង់តម្លៃចូលជួរអ្នកគ្រប់គ្រងផ្នែកលក់ តែពេលកម្រិតបច្ចុប្បន្នគឺ SM។
   បើអនុម័តកម្រិត SM រួច ហើយត្រូវការអភិបាលទូទៅបន្ត វាចេញពីជួរនេះ (ឯកសារ 16 ផ្នែក A1)។ */

function pendingQuotes() {
    return listQuotes().filter(q => q.status === 'PENDING_APPROVAL' && q.pendingLevel === 'SM');
}

function pendingVoids() {
    return BMS_STORE.list('voidRequests').filter(v => v.status === 'PENDING_APPROVAL');
}

function pendingCredits() {
    return BMS_STORE.list('creditRequests').filter(c => c.status === 'PENDING_APPROVAL');
}

function totalPending() {
    return pendingQuotes().length + pendingVoids().length + pendingCredits().length;
}

/* ===== សូចនាករផ្ទាំងគ្រប់គ្រង ===== */

function invoicesInRange(range) {
    return listInvoices().filter(inv => inv.status !== 'CANCELLED' && inRange(inv.date, range));
}

function quotesInRange(range) {
    return listQuotes().filter(q => inRange(q.date, range));
}

function invoiceTotal(inv) {
    return docTotals(inv).grandTotal;
}

function dashboardMetrics(range) {
    const invs = invoicesInRange(range);
    const revenue = invs.reduce((sum, i) => sum + invoiceTotal(i), 0);
    const collected = invs.reduce((sum, i) => sum + i.paid, 0);
    const receivable = invs.reduce((sum, i) => sum + invoiceState(i).due, 0);

    const overdue = listInvoices().filter(i => invoiceState(i).key === 'OVERDUE');
    const overdueAmount = overdue.reduce((sum, i) => sum + invoiceState(i).due, 0);

    const qs = quotesInRange(range);
    const converted = qs.filter(q => q.status === 'CONVERTED_TO_INVOICE').length;
    const winRate = qs.length ? (converted / qs.length) * 100 : 0;

    const totalTarget = listReps().reduce((sum, r) => sum + r.target, 0);

    return {
        revenue,
        collected,
        receivable,
        overdueAmount,
        overdueList: overdue,
        pendingCount: pendingQuotes().length,
        winRate,
        invoiceCount: invs.length,
        quoteCount: qs.length,
        convertedCount: converted,
        totalTarget,
        quotaPercent: totalTarget ? (revenue / totalTarget) * 100 : 0
    };
}

function repPerformance(range) {
    const invs = invoicesInRange(range);
    return listReps().map(rep => {
        const mine = invs.filter(i => i.repId === rep.id);
        const revenue = mine.reduce((sum, i) => sum + invoiceTotal(i), 0);
        const collected = mine.reduce((sum, i) => sum + i.paid, 0);
        const myQuotes = quotesInRange(range).filter(q => q.repId === rep.id);
        const myConverted = myQuotes.filter(q => q.status === 'CONVERTED_TO_INVOICE').length;
        return {
            ...rep,
            invoiceCount: mine.length,
            revenue,
            collected,
            outstanding: revenue - collected,
            conversion: myQuotes.length ? (myConverted / myQuotes.length) * 100 : 0,
            quotaPercent: rep.target ? (revenue / rep.target) * 100 : 0
        };
    }).sort((a, b) => b.revenue - a.revenue);
}

function pipelineStages(range) {
    const qs = quotesInRange(range);
    const count = status => qs.filter(q => q.status === status).length;
    const submitted = qs.filter(q => q.status !== 'DRAFT' && q.status !== 'CANCELLED').length;
    const approved = qs.filter(q => q.approvals.length && q.status !== 'PENDING_APPROVAL' && q.status !== 'REJECTED').length;
    return [
        { name: 'សម្រង់តម្លៃទាំងអស់', value: qs.length, color: '#94a3b8' },
        { name: 'បានដាក់ស្នើ', value: submitted, color: '#f59e0b' },
        { name: 'បានអនុម័ត', value: approved, color: '#0ea5e9' },
        { name: 'បានបំប្លែងជាវិក្កយបត្រ', value: count('CONVERTED_TO_INVOICE'), color: '#2563eb' },
        { name: 'បានទូទាត់', value: invoicesInRange(range).filter(i => invoiceState(i).key === 'PAID').length, color: '#1e3a5f' }
    ];
}

/* ចំណូលប្រចាំខែ 6 ខែ — ប្រាំខែមុនមកពីប្រវត្តិ ហើយខែបច្ចុប្បន្ន (ដល់ថ្ងៃនេះ) គណនាពីវិក្កយបត្រពិត */
function monthlyRevenueSeries() {
    const hist = BMS_STORE.list('monthlyHistory');
    const series = hist.map((h, i) => {
        const d = new Date(BMS_TODAY.getFullYear(), BMS_TODAY.getMonth() - (hist.length - i), 1);
        return { month: MONTHS_KH[d.getMonth()], actual: h.actual, target: h.target };
    });
    const cur = new Date(BMS_TODAY.getFullYear(), BMS_TODAY.getMonth(), 1);
    const actual = Math.round(invoicesInRange({ start: cur, end: BMS_TODAY }).reduce((s, i) => s + invoiceTotal(i), 0));
    series.push({ month: MONTHS_KH[cur.getMonth()], actual, target: BMS_STORE.settings().monthlyTarget });
    return series;
}

function weeklyRevenueSeries() {
    const invs = invoicesInRange(null);
    return [3, 2, 1, 0].map((back, idx) => {
        const end = new Date(BMS_TODAY); end.setDate(end.getDate() - back * 7);
        const start = new Date(end); start.setDate(start.getDate() - 6);
        const actual = invs.filter(i => inRange(i.date, { start, end })).reduce((s, i) => s + invoiceTotal(i), 0);
        return { week: `សប្តាហ៍ទី ${idx + 1}`, actual: Math.round(actual) };
    });
}

/* ===== បំពង់លំហូរការលក់ (Kanban) ===== */

const PIPELINE_STAGES = [
    { id: 'lead', label: 'អតិថិជនសក្តានុពល', tone: 'slate', accent: '#94a3b8' },
    { id: 'qualified', label: 'បានផ្ទៀងផ្ទាត់', tone: 'sky', accent: '#0ea5e9' },
    { id: 'proposal', label: 'បានដាក់សម្រង់តម្លៃ', tone: 'amber', accent: '#f59e0b' },
    { id: 'won', label: 'បិទការលក់ជោគជ័យ', tone: 'emerald', accent: '#10b981' },
    { id: 'lost', label: 'បាត់បង់ឱកាស', tone: 'rose', accent: '#f43f5e' }
];

/* តម្លៃឱកាសលក់ដែលភ្ជាប់ឯកសារ យកពីឯកសារនោះផ្ទាល់ ដើម្បីកុំឱ្យខុសគ្នា */
function dealValue(deal) {
    if (deal.quoteId) {
        const q = listQuotes().find(x => x.id === deal.quoteId);
        if (q) return docTotals(q).grandTotal;
    }
    if (deal.invoiceId) {
        const inv = listInvoices().find(x => x.id === deal.invoiceId);
        if (inv) return docTotals(inv).grandTotal;
    }
    return deal.value;
}

function listDeals() {
    return BMS_STORE.list('pipelineDeals').map(d => ({ ...d, value: dealValue(d) }));
}

function getDeal(id) {
    return listDeals().find(d => d.id === id);
}

function dealsByStage(filters) {
    const f = filters || {};
    const result = {};
    PIPELINE_STAGES.forEach(s => { result[s.id] = []; });

    listDeals()
        .filter(d => !f.repId || d.repId === f.repId)
        .filter(d => !f.category || d.category === f.category)
        .filter(d => inRange(d.date, f.range))
        .forEach(d => result[d.stage].push(d));

    return result;
}

function pipelineSummary(filters) {
    const grouped = dealsByStage(filters);
    const open = ['lead', 'qualified', 'proposal'].reduce((sum, s) =>
        sum + grouped[s].reduce((t, d) => t + d.value, 0), 0);
    const won = grouped.won.reduce((t, d) => t + d.value, 0);
    const lost = grouped.lost.reduce((t, d) => t + d.value, 0);
    const closed = grouped.won.length + grouped.lost.length;
    return {
        open,
        won,
        lost,
        openCount: grouped.lead.length + grouped.qualified.length + grouped.proposal.length,
        winRate: closed ? (grouped.won.length / closed) * 100 : 0
    };
}

/* ===== ការវិភាគតាមប្រភេទទំនិញ ===== */

function categoryRevenue(filters) {
    const f = filters || {};
    const buckets = {};
    Object.keys(CATEGORIES).forEach(k => {
        buckets[k] = { id: k, label: CATEGORIES[k], revenue: 0, qty: 0, deals: 0 };
    });

    listQuotes()
        .filter(q => q.status === 'CONVERTED_TO_INVOICE')
        .filter(q => !f.repId || q.repId === f.repId)
        .filter(q => inRange(q.date, f.range))
        .forEach(q => {
            const seen = new Set();
            q.items.forEach(it => {
                const cat = getProduct(it.sku).category;
                if (f.category && cat !== f.category) return;
                buckets[cat].revenue += it.qty * it.price;
                buckets[cat].qty += it.qty;
                seen.add(cat);
            });
            seen.forEach(cat => { buckets[cat].deals += 1; });
        });

    return Object.values(buckets)
        .filter(b => !f.category || b.id === f.category)
        .sort((a, b) => b.revenue - a.revenue);
}

/* ===== ល្បឿនលក់ និងកម្រៃជើងសារ ===== */

function salesVelocity(range) {
    const invs = invoicesInRange(range);
    const converted = quotesInRange(range).filter(q => q.status === 'CONVERTED_TO_INVOICE');

    const revenue = invs.reduce((sum, i) => sum + invoiceTotal(i), 0);
    const avgDealSize = invs.length ? revenue / invs.length : 0;

    // វដ្តបិទការលក់ = ពីថ្ងៃចេញសម្រង់តម្លៃ ដល់ថ្ងៃដែលវាត្រូវបានបំប្លែងជាវិក្កយបត្រ (យកពីប្រវត្តិឯកសារ)
    const cycles = converted.map(q => {
        const conv = q.auditTrail.find(e => e.action === 'CONVERT');
        return conv ? Math.max(Math.round((parseIso(conv.changedAt.slice(0, 10)) - parseIso(q.date.slice(0, 10))) / 86400000), 0) : 0;
    });
    const cycleDays = cycles.length ? cycles.reduce((s, x) => s + x, 0) / cycles.length : 0;

    const days = range && range.start && range.end
        ? Math.max(Math.round((new Date(range.end) - new Date(range.start)) / 86400000) + 1, 1)
        : 30;

    return {
        avgDealSize,
        cycleDays,
        dealsPerWeek: invs.length / (days / 7),
        revenuePerDay: revenue / days
    };
}

function commissionRows(range) {
    return repPerformance(range).map(rep => ({
        ...rep,
        commissionAmount: rep.revenue * (rep.commission / 100),
        // កម្រៃជើងសារបើកជូនតែលើទឹកប្រាក់ដែលប្រមូលបានជាក់ស្តែង
        payableNow: rep.collected * (rep.commission / 100)
    }));
}

function quoteStatusBreakdown(range) {
    const qs = quotesInRange(range);
    const count = s => qs.filter(q => q.status === s).length;
    return [
        { label: statusLabel('DRAFT'), value: count('DRAFT'), color: 'text-slate-600' },
        { label: statusLabel('PENDING_APPROVAL'), value: count('PENDING_APPROVAL'), color: 'text-amber-600' },
        { label: statusLabel('APPROVED'), value: count('APPROVED'), color: 'text-blue-600' },
        { label: statusLabel('SENT_TO_CUSTOMER'), value: count('SENT_TO_CUSTOMER'), color: 'text-sky-600' },
        { label: statusLabel('ACCEPTED_BY_CUSTOMER'), value: count('ACCEPTED_BY_CUSTOMER'), color: 'text-emerald-600' },
        { label: statusLabel('CONVERTED_TO_INVOICE'), value: count('CONVERTED_TO_INVOICE'), color: 'text-indigo-600' },
        { label: statusLabel('REJECTED'), value: count('REJECTED'), color: 'text-rose-600' },
        { label: statusLabel('DECLINED_BY_CUSTOMER'), value: count('DECLINED_BY_CUSTOMER'), color: 'text-slate-600' },
        { label: statusLabel('EXPIRED'), value: count('EXPIRED'), color: 'text-slate-500' },
        { label: statusLabel('CANCELLED'), value: count('CANCELLED'), color: 'text-slate-500' }
    ];
}

/* ចំនួនសម្រេចរបស់អ្នកគ្រប់គ្រងផ្នែកលក់ គណនាពីប្រវត្តិឯកសារ (មិនមាន store ដាច់ដោយឡែក) */
function approvalStats() {
    const smEntries = [];
    listQuotes().forEach(q => q.auditTrail.forEach(e => { if (BMS_STORE.user(e.changedBy) && BMS_STORE.user(e.changedBy).role === 'SM') smEntries.push(e); }));
    const count = a => smEntries.filter(e => e.action === a).length;
    return {
        approved: count('APPROVE') + count('APPROVE_LEVEL'),
        rejected: count('REJECT'),
        forwarded: count('APPROVE_LEVEL'),
        pending: totalPending()
    };
}

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

const SM_NOTE_STYLE = {
    QUOTE_SUBMITTED: { icon: 'mdi:file-percent-outline', tone: 'warning' },
    QUOTE_ACCEPTED: { icon: 'mdi:handshake-outline', tone: 'success' },
    QUOTE_DECLINED: { icon: 'mdi:thumb-down-outline', tone: 'warning' },
    INVOICE_CREATED: { icon: 'mdi:receipt-text-outline', tone: 'info' },
    VOID_REQUESTED: { icon: 'mdi:file-remove-outline', tone: 'danger' },
    CREDIT_REQUESTED: { icon: 'mdi:credit-card-clock-outline', tone: 'warning' }
};

function smNoteHref(n) {
    const root = getRoleRoot();
    if (n.entityType === 'quotation') return `${root}/approvals/view-approval.html?type=quote&id=${n.entityId}`;
    if (n.entityType === 'voidRequest' || n.entityType === 'creditRequest') return `${root}/approvals/approvals.html`;
    return '';
}

function portalNotifications() {
    const list = [];

    BMS_STORE.notificationsFor('SM').slice(0, 6).forEach(n => {
        const style = SM_NOTE_STYLE[n.type] || { icon: 'mdi:bell-outline', tone: 'info' };
        list.push({ ...style, title: n.message, time: fmtKhDateTime(n.at), href: smNoteHref(n), unread: !n.isRead });
    });

    // វិក្កយបត្រហួសកាលកំណត់ទូទាត់
    const overdue = listInvoices().filter(i => invoiceState(i).key === 'OVERDUE');
    if (overdue.length) {
        const amount = overdue.reduce((sum, i) => sum + invoiceState(i).due, 0);
        const worst = overdue.slice().sort((a, b) => daysBetween(b.dueDate) - daysBetween(a.dueDate))[0];
        list.push({
            icon: 'mdi:cash-clock',
            tone: 'danger',
            title: `វិក្កយបត្រហួសកាលកំណត់ ${overdue.length} ច្បាប់`,
            note: `សរុបត្រូវទារ ${fmtUSD(amount)} · យឺតបំផុត ${worst.id} ${daysBetween(worst.dueDate)} ថ្ងៃ`,
            href: ''
        });
    }

    // ឱកាសលក់ដែលនៅដំណាក់កាលដាក់សម្រង់តម្លៃយូរថ្ងៃ
    const stuck = listDeals()
        .filter(d => d.stage === 'proposal' && daysBetween(d.date) >= 7)
        .sort((a, b) => daysBetween(b.date) - daysBetween(a.date));
    if (stuck.length) {
        const top = stuck[0];
        const c = getCustomer(top.customerId);
        list.push({
            icon: 'mdi:handshake-outline',
            tone: 'info',
            title: `ឱកាសលក់ ${stuck.length} កំពុងជាប់គាំងក្នុងការចរចា`,
            note: `${c ? c.name : ''} · ${fmtUSD(top.value)} · មិនមានចលនា ${daysBetween(top.date)} ថ្ងៃ`
        });
    }

    return list;
}

function unreadNotificationCount() {
    return BMS_STORE.notificationsFor('SM').filter(n => !n.isRead).length;
}

function markNotificationsRead() {
    BMS_STORE.markAllRead('SM');
}
