/**
 * ច្រកអតិថិជន — ការបង្ហាញទិន្នន័យ (projection) ពីឃ្លាំងរួច bms_store_v2
 * អតិថិជនម្នាក់ៗឃើញតែសម្រង់តម្លៃ វិក្កយបត្រ និងការដឹកជញ្ជូនផ្ទាល់ខ្លួនរបស់ខ្លួនប៉ុណ្ណោះ
 * ហើយឃើញតែវាលដែលអនុញ្ញាត (whitelist)៖ គ្មានថ្លៃដើម កម្រិតចំណេញ ឬកំណត់ចំណាំផ្ទៃក្នុងឡើយ។
 *
 * សម្រង់តម្លៃដែលមិនទាន់ផ្ញើជូនអតិថិជន (ព្រាង រង់ចាំអនុម័ត បានបដិសេធ លុបចោល) មិនបង្ហាញនៅទីនេះទេ។
 * ការយល់ព្រម បដិសេធ និងការទូទាត់ KHQR សរសេរតាម cpActions ដែលកត់ត្រាអត្តសញ្ញាណជាអតិថិជន។
 */

const CURRENT_CUSTOMER_ID = 'CUST-0042';
const CUSTOMER_ACTOR = 'CUSTOMER:' + CURRENT_CUSTOMER_ID;

const CP_PROFILE_FIELDS = ['id', 'name', 'contact', 'phone', 'email', 'tin', 'address', 'tier', 'paymentTerms'];
const CP_QUOTE_FIELDS = ['id', 'date', 'validUntil', 'status', 'discountPercent', 'downPayment', 'note', 'invoiceId', 'items', 'acceptedVia', 'declineReason'];
const CP_INVOICE_FIELDS = ['id', 'quoteId', 'date', 'dueDate', 'status', 'discountPercent', 'downPayment', 'items', 'payments'];

/* សម្រង់តម្លៃដែលអតិថិជនមានសិទ្ធិឃើញ (បានផ្ញើហើយ) */
const CP_VISIBLE_QUOTE_STATUSES = ['SENT_TO_CUSTOMER', 'ACCEPTED_BY_CUSTOMER', 'DECLINED_BY_CUSTOMER', 'CONVERTED_TO_INVOICE', 'EXPIRED'];

function cpPick(obj, fields) {
    const out = {};
    fields.forEach(f => { if (obj[f] !== undefined) out[f] = obj[f]; });
    return out;
}

/* ===== ទ្រង់ទ្រាយបង្ហាញ (ឈ្មោះដើមរក្សាទុក ដើម្បីកុំឱ្យទំព័រដែលមានរួចខូច) ===== */

function cpFmtUSD(n) {
    return fmtUSD(n || 0);
}

function cpFmtDate(dateStr) {
    return fmtKhDate(dateStr);
}

function cpDaysUntil(dateStr) {
    return dateStr ? -daysBetween(dateStr) : null;
}

/* ===== ព័ត៌មានផ្ទាល់ខ្លួន ===== */

function cpProfile() {
    const c = BMS_STORE.get('customers', CURRENT_CUSTOMER_ID);
    const rep = BMS_STORE.user(c.repId);
    return {
        ...cpPick(c, CP_PROFILE_FIELDS),
        companyName: c.name,
        contactName: c.contact,
        tier: c.tier === 'vip' ? 'VIP' : TIER_LABEL[c.tier],
        accountManager: rep ? `${rep.name} (អ្នកគ្រប់គ្រងគណនី)` : ''
    };
}

function cpProduct(sku) {
    const p = BMS_STORE.get('products', sku);
    return p ? { name: p.name, unit: p.unit } : { name: sku, unit: 'គ្រឿង' };
}

/* ===== វិក្កយបត្រ (បំប្លែងជាទម្រង់ដែលទំព័រអតិថិជនប្រើ) ===== */

const CP_LEGACY_KEY = { PAID: 'paid', PARTIALLY_PAID: 'partial', UNPAID: 'unpaid', OVERDUE: 'overdue', CANCELLED: 'cancelled' };

function cpAdaptInvoice(raw) {
    const inv = cpPick(raw, CP_INVOICE_FIELDS);
    const st = invoiceState(inv);
    const t = st.totals;
    return {
        id: inv.id,
        date: inv.date,
        dueDate: inv.dueDate,
        quoteId: inv.quoteId,
        description: inv.items.map(it => cpProduct(it.sku).name).slice(0, 2).join(' · ') + (inv.items.length > 2 ? ` និងមុខទំនិញផ្សេងទៀត` : ''),
        paymentTerm: daysBetween(inv.dueDate, parseIso(inv.date)) === 0 ? 'ទូទាត់សាច់ប្រាក់ភ្លាម' : `${-daysBetween(inv.dueDate, parseIso(inv.date))} ថ្ងៃ`,
        items: inv.items.map(it => { const p = cpProduct(it.sku); return { name: p.name, note: '', qty: it.qty, unit: p.unit, unitPrice: it.price }; }),
        downPayment: t.downPayment,
        specialDiscount: t.discountAmount,
        discountPercent: t.discountPercent,
        vatRate: BMS_STORE.settings().vatRate * 100,
        paidAmount: st.paid,
        status: CP_LEGACY_KEY[st.key],
        stateKey: st.key,
        payments: inv.payments,
        raw: inv,
        claim: BMS_STORE.list('paymentClaims').find(c => c.invoiceId === inv.id && c.status === 'PENDING_VERIFICATION') || null
    };
}

function cpInvoices() {
    return BMS_STORE.list('invoices')
        .filter(i => i.customerId === CURRENT_CUSTOMER_ID)
        .map(cpAdaptInvoice);
}

function cpInvoiceTotals(invoice) {
    const t = docTotals(invoice.raw);
    return { subtotal: t.subtotal, vat: t.vatAmount, grandTotal: t.grandTotal, remaining: invoiceState(invoice.raw).due };
}

function cpInvoiceStatusMeta(invoice) {
    const m = statusMeta(invoice.stateKey);
    return { label: m.label, badge: m.tone };
}

/* ===== សម្រង់តម្លៃ ===== */

function cpQuotes() {
    return BMS_STORE.list('quotations')
        .filter(q => q.customerId === CURRENT_CUSTOMER_ID && CP_VISIBLE_QUOTE_STATUSES.includes(q.status)
            && (q.status !== 'EXPIRED' || q.auditTrail.some(e => e.action === 'SEND')))
        .map(q => {
            const quote = cpPick(q, CP_QUOTE_FIELDS);
            return {
                ...quote,
                items: quote.items.map(it => ({ ...it, ...cpProduct(it.sku) })),
                totals: docTotals(quote),
                expiry: quoteExpiry(quote)
            };
        });
}

function cpQuote(id) {
    return cpQuotes().find(q => q.id === id);
}

/* ===== ការដឹកជញ្ជូន — ទិន្នន័យគំរូតាមវិក្កយបត្រ (ដែនដឹកជញ្ជូននឹងផ្លាស់ទៅឃ្លាំងរួចនៅជំហានទី 4) ===== */

function cpStamp(offsetDays, hm) {
    const d = new Date(BMS_TODAY.getFullYear(), BMS_TODAY.getMonth(), BMS_TODAY.getDate() + offsetDays);
    return `${d.getDate()} ${MONTHS_KH[d.getMonth()]} - ${hm}`;
}

function cpOrders() {
    const profile = cpProfile();
    const byInvoice = id => cpInvoices().find(i => i.id === id);
    const year = BMS_TODAY.getFullYear();
    const items = inv => (inv ? inv.items : []).map(it => ({ name: it.name, spec: '', qty: it.qty, serials: 'N/A', qcStatus: 'បានពិនិត្យរួច' }));
    const common = {
        recipient: `${profile.contactName} (${profile.companyName})`,
        address: profile.address,
        driverRole: 'បុគ្គលិកដឹកជញ្ជូន DIGITECHKH'
    };
    const inv124 = byInvoice(`INV-${year}-0124`);
    const inv119 = byInvoice(`INV-${year}-0119`);
    const inv117 = byInvoice(`INV-${year}-0117`);
    return [
        inv124 && {
            ...common, id: `SO-${year}-0042`, relatedInvoice: inv124.id, date: inv124.date, currentStage: 3,
            stageTimestamps: [cpStamp(-5, '08:30'), cpStamp(-5, '11:00'), cpStamp(-4, '09:15'), 'រង់ចាំទទួល'],
            driverName: 'សុខ ជា', driverPhone: '012 888 777', vehicle: 'ម៉ូតូ Honda Dream 125cc (ភ្នំពេញ 1AZ-9988)', experience: '3 ឆ្នាំ (ផ្ទៀងផ្ទាត់រួច)',
            deliveryCode: 'DLV-9921', note: 'សូមទូរស័ព្ទមុនពេលមកដល់ 10 នាទី ដើម្បីឱ្យបុគ្គលិកចុះទៅទទួលនៅជាន់ផ្ទាល់ដី។',
            eta: 'ប៉ាន់ស្មានមកដល់ក្នុងរយៈពេល 30 នាទីទៀត', items: items(inv124)
        },
        inv119 && {
            ...common, id: `SO-${year}-0039`, relatedInvoice: inv119.id, date: inv119.date, currentStage: 4,
            stageTimestamps: [cpStamp(-15, '09:00'), cpStamp(-15, '13:30'), cpStamp(-14, '08:45'), cpStamp(-14, '15:20')],
            driverName: 'ម៉េង ហុង', driverPhone: '092 887 766', vehicle: 'រថយន្តដឹកធំ (ភ្នំពេញ 3A-1102)', experience: '5 ឆ្នាំ (ផ្ទៀងផ្ទាត់រួច)',
            deliveryCode: 'DLV-9918', note: 'បានប្រគល់ជូនផ្ទាល់ដៃ និងបានថតរូបបញ្ជាក់ការទទួល។',
            eta: 'បានប្រគល់ជោគជ័យ', items: items(inv119)
        },
        inv117 && {
            ...common, id: `SO-${year}-0035`, relatedInvoice: inv117.id, date: inv117.date, currentStage: 4,
            stageTimestamps: [cpStamp(-32, '10:15'), cpStamp(-32, '14:00'), cpStamp(-31, '09:30'), cpStamp(-31, '10:50')],
            driverName: 'កែវ សំណាង', driverPhone: '011 223 344', vehicle: 'ម៉ូតូរឺម៉កដឹក (ភ្នំពេញ 2E-9932)', experience: '4 ឆ្នាំ (ផ្ទៀងផ្ទាត់រួច)',
            deliveryCode: 'DLV-9905', note: 'បានប្រគល់ជូននៅផ្នែកទទួលភ្ញៀវ។',
            eta: 'បានប្រគល់ជោគជ័យ', items: items(inv117)
        }
    ].filter(Boolean);
}

const CP_BANK_ACCOUNT = { bank: 'ធនាគារ អេប៊ីអេ', accountName: 'DIGITECHKH CO., LTD.', accountNumber: '001 888 999 (ដុល្លារ)' };

/* ប្រមូលទិន្នន័យទាំងអស់ដែលទំព័រអតិថិជនត្រូវការ (ឈ្មោះដើមរក្សាទុក) */
function getCustomerPortalData() {
    return {
        customerProfile: cpProfile(),
        invoices: cpInvoices(),
        quotes: cpQuotes(),
        orders: cpOrders(),
        bankAccount: CP_BANK_ACCOUNT
    };
}

/* ===== សកម្មភាព ===== */

const cpActions = {
    acceptQuote: id => BMS_STORE.actions.acceptQuotation(id, CUSTOMER_ACTOR),
    declineQuote: (id, reason) => BMS_STORE.actions.declineQuotation(id, CUSTOMER_ACTOR, reason),
    payKhqr: invoiceId => BMS_STORE.actions.submitKhqrPayment(invoiceId, CUSTOMER_ACTOR)
};

/* ===== ផ្លាកលេខ ===== */

function cpTotalOutstanding() {
    return cpInvoices().filter(inv => !['PAID', 'CANCELLED'].includes(inv.stateKey)).length;
}

function cpActiveOrdersCount() {
    return cpOrders().filter(o => o.currentStage < 4).length;
}

function cpQuotesAwaiting() {
    return cpQuotes().filter(q => q.status === 'SENT_TO_CUSTOMER').length;
}

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

const CP_NOTE_STYLE = {
    QUOTE_SENT: { icon: 'mdi:file-document-edit-outline', tone: 'info' },
    PAYMENT_RECEIVED: { icon: 'mdi:cash-check', tone: 'success' }
};

function cpNoteHref(n) {
    if (n.entityType === 'quotation') return `view-quote.html?id=${n.entityId}`;
    if (n.entityType === 'invoice') return `view-invoice.html?id=${n.entityId}`;
    return '';
}

function portalNotifications() {
    const list = [];

    BMS_STORE.notificationsFor('CUSTOMER', CURRENT_CUSTOMER_ID).slice(0, 5).forEach(n => {
        const style = CP_NOTE_STYLE[n.type] || { icon: 'mdi:bell-outline', tone: 'info' };
        list.push({ ...style, title: n.message, time: fmtKhDateTime(n.at), href: cpNoteHref(n), unread: !n.isRead });
    });

    // វិក្កយបត្រដែលនៅជំពាក់ ឬហួសកាលកំណត់
    cpInvoices()
        .filter(inv => !['PAID', 'CANCELLED'].includes(inv.stateKey))
        .map(inv => ({ inv, left: cpDaysUntil(inv.dueDate) }))
        .sort((a, b) => a.left - b.left)
        .slice(0, 3)
        .forEach(x => {
            const overdue = x.left < 0;
            const t = cpInvoiceTotals(x.inv);
            list.push({
                icon: overdue ? 'mdi:invoice-text-clock-outline' : 'mdi:invoice-text-outline',
                tone: overdue ? 'danger' : (x.left <= 3 ? 'warning' : 'info'),
                title: overdue
                    ? `វិក្កយបត្រ ${x.inv.id} ហួសកាលកំណត់ ${Math.abs(x.left)} ថ្ងៃ`
                    : `វិក្កយបត្រ ${x.inv.id} ត្រូវទូទាត់ក្នុង ${x.left} ថ្ងៃ`,
                note: `នៅសល់ត្រូវបង់ ${cpFmtUSD(t.remaining)}`,
                time: cpFmtDate(x.inv.dueDate),
                href: `view-invoice.html?id=${x.inv.id}`
            });
        });

    // ការដឹកជញ្ជូនកំពុងដំណើរការ
    cpOrders().filter(o => o.currentStage < 4).forEach(o => {
        list.push({
            icon: 'mdi:truck-delivery-outline',
            tone: 'info',
            title: `ការបញ្ជាទិញ ${o.id} កំពុងដឹកជញ្ជូន`,
            note: `${o.driverName} (${o.driverPhone}) · ${o.vehicle}`,
            time: cpFmtDate(o.date),
            href: `order-tracking.html?id=${o.id}`
        });
    });

    return list;
}

function unreadNotificationCount() {
    return BMS_STORE.notificationsFor('CUSTOMER', CURRENT_CUSTOMER_ID).filter(n => !n.isRead).length;
}

function markNotificationsRead() {
    BMS_STORE.markAllRead('CUSTOMER', CURRENT_CUSTOMER_ID);
}
