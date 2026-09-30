/* ច្រកប្រធានគណនេយ្យ — ការបង្ហាញទិន្នន័យ (projection) ពីឃ្លាំងទិន្នន័យរួម
   គ្រប់តួលេខលើរបាយការណ៍ហិរញ្ញវត្ថុ គណនាចេញពីទិនានុប្បវត្តិដែលបានចុះជាក់ស្តែង
   ក្នុង bms_store_v2 ដូច្នេះវាស៊ីសង្វាក់ជាមួយវិក្កយបត្រ និងបង្កាន់ដៃរបស់ច្រកផ្សេង។
   មិនមានលេខសរសេរដៃនៅទីនេះ ឬក្នុងទំព័រណាមួយឡើយ។ */

const CURRENT_USER_ID = 'U-CA-01';

/* ===== ប្លង់គណនី ===== */

function listAccounts() {
    return BMS_STORE.list('accounts');
}

function getAccount(code) {
    return listAccounts().find(a => a.code === code);
}

function accountName(code) {
    const a = getAccount(code);
    return a ? a.nameKh : code;
}

/* គណនីដែលកត់ត្រាបាន (មិនមែនក្រុមចំណងជើង) */
function postableAccounts() {
    return listAccounts().filter(a => !a.isGroup);
}

/* ===== ទិនានុប្បវត្តិ ===== */

const JOURNAL_SOURCE_LABEL = {
    OPENING: 'សមតុល្យដើមគ្រា',
    INVOICE: 'ចេញវិក្កយបត្រ',
    RECEIPT: 'ទទួលប្រាក់',
    MANUAL: 'កត់ត្រាដោយដៃ',
    REVERSAL: 'ការបញ្ច្រាស'
};

function sourceLabel(code) {
    return JOURNAL_SOURCE_LABEL[code] || code;
}

function listJournals(filters) {
    const f = filters || {};
    return BMS_STORE.list('journalEntries')
        .filter(j => !f.status || j.status === f.status)
        .filter(j => !f.source || j.source === f.source)
        .filter(j => inRange(j.date, f.range))
        .filter(j => {
            if (!f.search) return true;
            const q = f.search.toLowerCase();
            return j.id.toLowerCase().includes(q)
                || (j.description || '').toLowerCase().includes(q)
                || (j.reference || '').toLowerCase().includes(q);
        })
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
}

function getJournal(id) {
    return BMS_STORE.get('journalEntries', id);
}

function journalTotals(entry) {
    return BMS_STORE.journalSums(entry.lines);
}

/* ===== សៀវភៅធំ និងតុល្យភាពសាកល្បង ===== */

/* ចលនាគណនីនីមួយៗក្នុងកំឡុងពេល — គិតតែទិនានុប្បវត្តិដែលបានចុះរួច */
function accountMovements(range) {
    const map = {};
    postableAccounts().forEach(a => { map[a.code] = { dr: 0, cr: 0 }; });
    BMS_STORE.list('journalEntries')
        .filter(j => j.status === 'POSTED' && inRange(j.date, range))
        .forEach(j => j.lines.forEach(l => {
            if (!map[l.accountCode]) map[l.accountCode] = { dr: 0, cr: 0 };
            map[l.accountCode].dr += l.dr || 0;
            map[l.accountCode].cr += l.cr || 0;
        }));
    return map;
}

/* តារាងតុល្យភាពសាកល្បង — សមតុល្យតាមទិសធម្មតារបស់គណនីនីមួយៗ */
function trialBalance(range) {
    const mv = accountMovements(range);
    const rows = postableAccounts().map(a => {
        const m = mv[a.code] || { dr: 0, cr: 0 };
        const net = a.normal === 'Dr' ? m.dr - m.cr : m.cr - m.dr;
        return {
            code: a.code,
            name: a.nameKh,
            type: a.type,
            normal: a.normal,
            dr: m.dr,
            cr: m.cr,
            balance: net,
            debitColumn: a.normal === 'Dr' ? Math.max(net, 0) : Math.max(-net, 0),
            creditColumn: a.normal === 'Cr' ? Math.max(net, 0) : Math.max(-net, 0)
        };
    }).filter(r => r.dr || r.cr);

    return {
        rows,
        totalDebit: rows.reduce((s, r) => s + r.debitColumn, 0),
        totalCredit: rows.reduce((s, r) => s + r.creditColumn, 0)
    };
}

/* សមតុល្យគណនីមួយ (សរុបតាំងពីដើម) */
function balanceOf(code) {
    return BMS_STORE.accountBalances()[code] || 0;
}

/* សមតុល្យក្រុមគណនី — បូកកូនគណនីទាំងអស់ */
function groupBalance(parentCode) {
    const codes = listAccounts().filter(a => a.parent === parentCode).map(a => a.code);
    return codes.reduce((sum, c) => {
        const a = getAccount(c);
        return sum + (a && a.isGroup ? groupBalance(c) : balanceOf(c));
    }, 0);
}

/* ===== របាយការណ៍ចំណេញ-ខាត ===== */

function incomeStatement(range) {
    const mv = accountMovements(range);
    const net = (code, normal) => {
        const m = mv[code] || { dr: 0, cr: 0 };
        return normal === 'Cr' ? m.cr - m.dr : m.dr - m.cr;
    };

    const revenueRows = listAccounts()
        .filter(a => a.type === 'Revenue' && !a.isGroup)
        .map(a => ({ code: a.code, name: a.nameKh, amount: net(a.code, 'Cr') }))
        .filter(r => r.amount);

    const cogsRows = listAccounts()
        .filter(a => a.type === 'Expense' && !a.isGroup && a.parent === '5000')
        .map(a => ({ code: a.code, name: a.nameKh, amount: net(a.code, 'Dr') }))
        .filter(r => r.amount);

    const opexRows = listAccounts()
        .filter(a => a.type === 'Expense' && !a.isGroup && a.parent === '6000')
        .map(a => ({ code: a.code, name: a.nameKh, amount: net(a.code, 'Dr') }))
        .filter(r => r.amount);

    const revenue = revenueRows.reduce((s, r) => s + r.amount, 0);
    const cogs = cogsRows.reduce((s, r) => s + r.amount, 0);
    const opex = opexRows.reduce((s, r) => s + r.amount, 0);
    const grossProfit = revenue - cogs;
    const netProfit = grossProfit - opex;

    return {
        revenueRows, cogsRows, opexRows,
        revenue, cogs, opex, grossProfit, netProfit,
        grossMarginPercent: revenue ? (grossProfit / revenue) * 100 : 0,
        netMarginPercent: revenue ? (netProfit / revenue) * 100 : 0
    };
}

/* ===== តារាងតុល្យការ ===== */

function balanceSheet() {
    const byType = type => listAccounts()
        .filter(a => a.type === type && !a.isGroup)
        .map(a => ({ code: a.code, name: a.nameKh, amount: balanceOf(a.code) }))
        .filter(r => Math.abs(r.amount) > 0.005);

    const assets = byType('Asset');
    const liabilities = byType('Liability');
    const equity = byType('Equity');

    const totalAssets = assets.reduce((s, r) => s + r.amount, 0);
    const totalLiabilities = liabilities.reduce((s, r) => s + r.amount, 0);
    const totalEquityBooked = equity.reduce((s, r) => s + r.amount, 0);

    // ចំណេញក្នុងគ្រាដែលមិនទាន់បិទបញ្ជី ត្រូវបង្ហាញក្នុងមូលធន ដើម្បីឱ្យតុល្យការស្មើគ្នា
    const periodProfit = totalAssets - totalLiabilities - totalEquityBooked;

    return {
        assets, liabilities, equity,
        totalAssets, totalLiabilities,
        totalEquityBooked,
        periodProfit,
        totalEquity: totalEquityBooked + periodProfit,
        balanced: Math.abs(totalAssets - (totalLiabilities + totalEquityBooked + periodProfit)) < 0.01
    };
}

/* ===== សូចនាករផ្ទាំងគ្រប់គ្រង ===== */

function currentPeriodRange() {
    return { start: new Date(BMS_TODAY.getFullYear(), BMS_TODAY.getMonth(), 1), end: new Date(BMS_TODAY) };
}

/* តម្រងកាលបរិច្ឆេទអាចត្រឡប់ជួរទទេ (មានន័យថា គ្រប់កំឡុងពេល) ដូច្នេះត្រូវការពារ */
function safeRange(range) {
    return (range && range.start && range.end) ? range : currentPeriodRange();
}

function periodName(range) {
    const r = safeRange(range);
    return `${MONTHS_KH[r.start.getMonth()]} ${r.start.getFullYear()}`;
}

function cashAndBank() {
    return ['1111', '1121', '1122', '1123'].map(code => ({
        code, name: accountName(code), amount: balanceOf(code)
    }));
}

function invoiceDue(inv) {
    return invoiceState(inv).due;
}

function dashboardMetrics() {
    const range = currentPeriodRange();
    const pnl = incomeStatement(range);
    const cash = cashAndBank();
    const invoices = BMS_STORE.list('invoices').filter(i => i.status !== 'CANCELLED');

    const receivable = invoices.reduce((s, i) => s + invoiceDue(i), 0);
    const overdue = invoices.filter(i => invoiceState(i).key === 'OVERDUE');

    return {
        range,
        periodName: periodName(range),
        cashTotal: cash.reduce((s, c) => s + c.amount, 0),
        cashRows: cash,
        revenue: pnl.revenue,
        grossProfit: pnl.grossProfit,
        grossMarginPercent: pnl.grossMarginPercent,
        netProfit: pnl.netProfit,
        netMarginPercent: pnl.netMarginPercent,
        receivable,
        overdueCount: overdue.length,
        overdueAmount: overdue.reduce((s, i) => s + invoiceDue(i), 0),
        overdueList: overdue,
        payable: balanceOf('2111'),
        vatPayable: balanceOf('2121'),
        whtPayable: balanceOf('2122'),
        draftJournals: listJournals({ status: 'DRAFT' }),
        unverifiedClaims: BMS_STORE.list('paymentClaims').filter(c => c.status === 'PENDING_VERIFICATION')
    };
}

/* ចំណូល និងចំណេញ 6 ខែចុងក្រោយ — សម្រាប់គំនូសតាងទំព័ររបាយការណ៍ */
function monthlyProfitSeries(months) {
    const n = months || 6;
    const out = [];
    for (let back = n - 1; back >= 0; back--) {
        const start = new Date(BMS_TODAY.getFullYear(), BMS_TODAY.getMonth() - back, 1);
        const end = back === 0
            ? new Date(BMS_TODAY)
            : new Date(BMS_TODAY.getFullYear(), BMS_TODAY.getMonth() - back + 1, 0);
        const p = incomeStatement({ start, end });
        out.push({
            month: MONTHS_KH[start.getMonth()],
            revenue: Math.round(p.revenue),
            grossProfit: Math.round(p.grossProfit),
            netProfit: Math.round(p.netProfit)
        });
    }
    return out;
}

/* ===== ពន្ធ ===== */

/* អាករលើតម្លៃបន្ថែម — ចេញពីវិក្កយបត្រលក់ក្នុងគ្រា */
function vatReturn(range) {
    const r = range || currentPeriodRange();
    const invoices = BMS_STORE.list('invoices')
        .filter(i => i.status !== 'CANCELLED' && inRange(i.date, r));

    let taxableSales = 0, outputVat = 0;
    invoices.forEach(i => {
        const t = docTotals(i);
        taxableSales += t.taxBase;
        outputVat += t.vatAmount;
    });

    // ពន្ធចូល (ការទិញចូល) មិនទាន់មានឯកសារទិញក្នុងគំរូនេះទេ
    const inputVat = 0;

    return {
        period: periodName(r),
        rate: BMS_STORE.settings().vatRate,
        invoiceCount: invoices.length,
        taxableSales,
        outputVat,
        inputVat,
        netPayable: outputVat - inputVat,
        bookBalance: balanceOf('2121')
    };
}

function whtReturn(range) {
    const r = range || currentPeriodRange();
    return {
        period: periodName(r),
        goodsRate: BMS_STORE.settings().whtGoods,
        servicesRate: BMS_STORE.settings().whtServices,
        bookBalance: balanceOf('2122'),
        // ពន្ធកាត់ទុកកើតឡើងពេលទូទាត់អ្នកផ្គត់ផ្គង់ ដែលជាផ្នែកនៃវដ្តទិញ (មិនទាន់មានក្នុងគំរូ)
        pending: true
    };
}

/* ===== សកម្មភាព ===== */

const caActions = {
    createJournal: data => BMS_STORE.actions.createJournalEntry(data, CURRENT_USER_ID),
    postDraft: id => BMS_STORE.actions.postDraftJournal(id, CURRENT_USER_ID)
};

/* ===== ផ្លាកលេខក្នុងម៉ឺនុយចំហៀង (ហៅដោយ portal.js) ===== */

function totalPending() {
    return listJournals({ status: 'DRAFT' }).length
        + BMS_STORE.list('paymentClaims').filter(c => c.status === 'PENDING_VERIFICATION').length;
}

function totalAlerts() {
    return BMS_STORE.list('invoices')
        .filter(i => i.status !== 'CANCELLED' && invoiceState(i).key === 'OVERDUE').length;
}

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

const CA_NOTE_STYLE = {
    INVOICE_CREATED: { icon: 'mdi:receipt-text-outline', tone: 'info' },
    RECEIPT_POSTED: { icon: 'mdi:cash-check', tone: 'success' },
    KHQR_CLAIM: { icon: 'mdi:qrcode-scan', tone: 'warning' }
};

function caNoteHref(n) {
    const root = getRoleRoot();
    if (n.entityType === 'journalEntry') return `${root}/ledger/view-journal.html?id=${n.entityId}`;
    if (n.entityType === 'invoice') return `${root}/ledger/ledger.html`;
    return '';
}

function portalNotifications() {
    const list = [];

    BMS_STORE.notificationsFor('CA').slice(0, 5).forEach(n => {
        const style = CA_NOTE_STYLE[n.type] || { icon: 'mdi:bell-outline', tone: 'info' };
        list.push({ ...style, title: n.message, time: fmtKhDateTime(n.at), href: caNoteHref(n), unread: !n.isRead });
    });

    const drafts = listJournals({ status: 'DRAFT' });
    if (drafts.length) {
        list.push({
            icon: 'mdi:file-document-edit-outline',
            tone: 'warning',
            title: `ទិនានុប្បវត្តិព្រាង ${drafts.length} ច្បាប់មិនទាន់ចុះបញ្ជី`,
            note: drafts.slice(0, 2).map(j => `${j.id} · ${j.description}`).join(' · ')
        });
    }

    const claims = BMS_STORE.list('paymentClaims').filter(c => c.status === 'PENDING_VERIFICATION');
    if (claims.length) {
        list.push({
            icon: 'mdi:bank-check',
            tone: 'warning',
            title: `ការទូទាត់រង់ចាំការផ្ទៀងផ្ទាត់ ${claims.length}`,
            note: `សរុប ${fmtUSD(claims.reduce((s, c) => s + c.amount, 0))} · ផ្នែកគណនេយ្យបំណុលត្រូវចុះបង្កាន់ដៃ`
        });
    }

    const m = dashboardMetrics();
    if (m.overdueCount) {
        list.push({
            icon: 'mdi:cash-clock',
            tone: 'danger',
            title: `បំណុលត្រូវទារហួសកាលកំណត់ ${m.overdueCount} វិក្កយបត្រ`,
            note: `សរុប ${fmtUSD(m.overdueAmount)} ក្នុងបំណុលត្រូវទារ ${fmtUSD(m.receivable)}`
        });
    }

    const vat = vatReturn();
    if (vat.netPayable > 0) {
        list.push({
            icon: 'mdi:percent-outline',
            tone: 'info',
            title: `អាករលើតម្លៃបន្ថែម ${vat.period} ត្រូវបង់ ${fmtUSD(vat.netPayable)}`,
            note: `គិតលើការលក់ជាប់អាករ ${fmtUSD(vat.taxableSales)} ក្នុងវិក្កយបត្រ ${vat.invoiceCount} ច្បាប់`
        });
    }

    return list;
}

function unreadNotificationCount() {
    return BMS_STORE.notificationsFor('CA').filter(n => !n.isRead).length;
}

function markNotificationsRead() {
    BMS_STORE.markAllRead('CA');
}
