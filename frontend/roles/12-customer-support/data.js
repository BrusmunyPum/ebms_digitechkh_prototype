/**
 * ច្រកបម្រើ និងគាំទ្រអតិថិជន — ទិន្នន័យគំរូ និងម៉ាស៊ីនដំណើរការ
 *
 * វិសាលភាពសិទ្ធិ (មើលឯកសារ documentation/v2/12-customer-support.md ផ្នែកទី 5):
 *   អាចមើល    — វិក្កយបត្រ, អតិថិជន, ការដឹកជញ្ជូន
 *   អាចសរសេរ  — សំបុត្រជំនួយ, កំណត់ចំណាំ, សម្គាល់ការដឹកថាបរាជ័យ, កំណត់ពេលដឹកឡើងវិញ
 *   មិនអាច    — កែតម្លៃ, កែចំនួន, កែស្ថានភាពទូទាត់, បង្កើតវិក្កយបត្រ, លុបកំណត់ត្រា,
 *               និង «សម្គាល់ថាបានប្រគល់ជូន» (សិទ្ធិរបស់ឃ្លាំង និងអ្នកដឹកតែប៉ុណ្ណោះ)
 */

const CS_STORAGE_KEY = 'digitechkh_cs_data_v2';

/* ===== ម៉ោងបច្ចុប្បន្នពិតប្រាកដ ===== */

const CS_NOW = new Date();

/** ចំណុចពេលវេលាថយក្រោយ n នាទីពីពេលឥឡូវ */
function csMinutesAgo(n) {
    return new Date(CS_NOW.getTime() - n * 60000).toISOString();
}

/** ចំណុចពេលវេលាទៅមុខ n នាទីពីពេលឥឡូវ */
function csMinutesAhead(n) {
    return new Date(CS_NOW.getTime() + n * 60000).toISOString();
}

/** ដើមថ្ងៃនេះ (ម៉ោង 0:00) */
function csStartOfToday() {
    const d = new Date(CS_NOW);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * ថយក្រោយ n នាទី ប៉ុន្តែមិនឲ្យហួសដើមថ្ងៃនេះឡើយ
 * ប្រើសម្រាប់ទិន្នន័យគំរូដែលត្រូវតែលេចឡើងក្នុងទិដ្ឋភាព «ថ្ងៃនេះ»
 * ទោះបីបើកប្រព័ន្ធនៅម៉ោងណាក៏ដោយ
 */
function csTodayAgo(n) {
    const t = new Date(CS_NOW.getTime() - n * 60000);
    const midnight = csStartOfToday();
    return (t < midnight ? midnight : t).toISOString();
}

/* ===== កាលបរិច្ឆេទ និងពេលវេលា (លេខអារ៉ាប់ទាំងអស់) ===== */

function csFmtDate(iso) {
    const d = new Date(iso);
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function csFmtTime(iso) {
    const d = new Date(iso);
    const p = n => String(n).padStart(2, '0');
    return `${p(d.getHours())}:${p(d.getMinutes())}`;
}

function csFmtDateTime(iso) {
    return `${csFmtDate(iso)} ${csFmtTime(iso)}`;
}

/** រយៈពេលកន្លងមកជាអក្សរខ្មែរ — ឧ. «25 នាទីមុន» */
function csRelative(iso) {
    const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (mins < 1) return 'ទើបតែឥឡូវនេះ';
    if (mins < 60) return `${mins} នាទីមុន`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} ម៉ោង ${mins % 60} នាទីមុន`;
    const days = Math.floor(hrs / 24);
    return `${days} ថ្ងៃមុន`;
}

/** រយៈពេលជា ម៉ោង:នាទី សម្រាប់នាឡិការាប់ថយក្រោយ */
function csClock(minutes) {
    const sign = minutes < 0 ? '-' : '';
    const abs = Math.abs(Math.round(minutes));
    const p = n => String(n).padStart(2, '0');
    return `${sign}${p(Math.floor(abs / 60))}:${p(abs % 60)}`;
}

function csMoney(v) {
    return '$' + Number(v || 0).toFixed(2);
}

/* ===== កម្រិតអាទិភាព និងកាលកំណត់ឆ្លើយតប ===== */

const CS_PRIORITY = {
    critical: { label: 'បន្ទាន់ខ្លាំង', slaMinutes: 15, tone: 'rose' },
    urgent: { label: 'បន្ទាន់', slaMinutes: 30, tone: 'amber' },
    normal: { label: 'ធម្មតា', slaMinutes: 60, tone: 'slate' }
};

const CS_CATEGORY = {
    delivery: { label: 'ការដឹកជញ្ជូន', tone: 'amber', icon: 'fa-truck-fast' },
    exchange: { label: 'ប្តូរទំនិញ ឬបង្វិលមកវិញ', tone: 'orange', icon: 'fa-rotate-left' },
    payment: { label: 'ការទូទាត់ និងវិក្កយបត្រ', tone: 'violet', icon: 'fa-file-invoice-dollar' },
    complaint: { label: 'ការត្អូញត្អែរ', tone: 'rose', icon: 'fa-face-frown' },
    general: { label: 'សាកសួរទូទៅ', tone: 'sky', icon: 'fa-circle-question' }
};

const CS_TICKET_STATUS = {
    pending: { label: 'រង់ចាំឆ្លើយ', tone: 'amber', icon: 'fa-clock' },
    in_progress: { label: 'កំពុងដោះស្រាយ', tone: 'sky', icon: 'fa-arrows-rotate' },
    resolved: { label: 'បានដោះស្រាយ', tone: 'emerald', icon: 'fa-circle-check' }
};

const CS_CHANNEL = {
    telegram: 'តេឡេក្រាម',
    call: 'ទូរស័ព្ទបន្ទាន់',
    facebook: 'ទំព័រហ្វេសប៊ុក',
    walk_in: 'មកជួបផ្ទាល់'
};

const CS_DELIVERY_STATUS = {
    preparing: { label: 'កំពុងរៀបចំវេចខ្ចប់', tone: 'slate', icon: 'fa-box-open' },
    out: { label: 'កំពុងដឹកជញ្ជូន', tone: 'sky', icon: 'fa-truck-fast' },
    delivered: { label: 'បានទទួលទំនិញ', tone: 'emerald', icon: 'fa-circle-check' },
    failed: { label: 'ដឹកមិនជោគជ័យ', tone: 'rose', icon: 'fa-circle-exclamation' }
};

/**
 * ដំណាក់កាលដឹកជញ្ជូន — សម្រាប់របារស្ថានភាព (bmsStepper)
 * ស្ថានភាព «ដឹកមិនជោគជ័យ» ឈប់នៅដំណាក់កាលទី 3 ព្រោះទំនិញមិនបានដល់ដៃអតិថិជន
 */
const CS_DELIVERY_STAGES = [
    { label: 'បានបញ្ជាទិញ', icon: 'fa-file-invoice' },
    { label: 'កំពុងរៀបចំវេចខ្ចប់', icon: 'fa-box-open' },
    { label: 'កំពុងដឹកជញ្ជូន', icon: 'fa-truck-fast' },
    { label: 'បានទទួលទំនិញ', icon: 'fa-house-circle-check' }
];

/** ដំណាក់កាលបច្ចុប្បន្ន (1-4) តាមស្ថានភាពកញ្ចប់ */
function csDeliveryStage(status) {
    if (status === 'preparing') return 2;
    if (status === 'out') return 3;
    if (status === 'delivered') return 4;
    if (status === 'failed') return 3;
    return 1;
}

const CS_FAILURE_REASONS = [
    'អតិថិជនមិននៅផ្ទះ',
    'អាសយដ្ឋានមិនត្រឹមត្រូវ',
    'អតិថិជនបដិសេធមិនទទួល',
    'ទំនិញខូចខាតពេលដឹក',
    'មូលហេតុផ្សេងៗ'
];

const CS_NOTE_TYPES = [
    { value: 'support', label: 'ការជួយគាំទ្រ' },
    { value: 'verify', label: 'ការផ្ទៀងផ្ទាត់' },
    { value: 'complaint', label: 'ការត្អូញត្អែរ' },
    { value: 'other', label: 'ផ្សេងៗ' }
];

/**
 * គណនាកាលកំណត់ឆ្លើយតប (SLA) ពីពេលបើកសំបុត្រ
 * កម្រិត: ok = នៅសល់ច្រើនជាងពាក់កណ្តាល, risk = ជិតដល់, breach = ហួសកាលកំណត់
 */
function csSla(ticket) {
    const budget = (CS_PRIORITY[ticket.priority] || CS_PRIORITY.normal).slaMinutes;
    if (ticket.status === 'resolved') {
        return { budget, elapsed: 0, remaining: budget, level: 'done', label: 'បានបិទរួច', tone: 'slate' };
    }
    const elapsed = (Date.now() - new Date(ticket.openedAt).getTime()) / 60000;
    const remaining = budget - elapsed;
    if (remaining <= 0) {
        return { budget, elapsed, remaining, level: 'breach', label: 'ហួសកាលកំណត់', tone: 'rose' };
    }
    if (remaining <= budget / 2) {
        return { budget, elapsed, remaining, level: 'risk', label: 'ជិតដល់កាលកំណត់', tone: 'amber' };
    }
    return { budget, elapsed, remaining, level: 'ok', label: 'នៅទាន់ពេល', tone: 'emerald' };
}

/* ===== ទិន្នន័យដើម ===== */

const CS_DEFAULT_DATA = {
    schemaVersion: 2,
    userProfile: {
        id: 'CS-012',
        name: 'លី ស្រីមុំ',
        role: 'បុគ្គលិកបម្រើអតិថិជន',
        channel: 'តេឡេក្រាម និងទូរស័ព្ទបន្ទាន់'
    },

    customers: [
        { id: 'CUS-104', name: 'អ៊ុច វ៉ាន់ដា', phone: '012 345 678', since: '2025-03-12', totalOrders: 23, lastOrder: csFmtDate(csMinutesAgo(120)) },
        { id: 'CUS-118', name: 'ហាងលក់គ្រឿងបន្លាស់ ម៉េងហួរ', phone: '098 765 432', since: '2024-11-04', totalOrders: 47, lastOrder: csFmtDate(csMinutesAgo(1540)) },
        { id: 'CUS-131', name: 'ក្រុមហ៊ុន គឹមសេង ត្រេឌីង', phone: '085 123 999', since: '2025-06-21', totalOrders: 12, lastOrder: csFmtDate(csMinutesAgo(180)) },
        { id: 'CUS-142', name: 'គ្លីនិក សុខភាពល្អ', phone: '077 889 900', since: '2025-09-02', totalOrders: 8, lastOrder: csFmtDate(csMinutesAgo(2900)) },
        { id: 'CUS-156', name: 'ភោជនីយដ្ឋាន អង្គរសួស្តី', phone: '070 445 112', since: '2026-01-18', totalOrders: 5, lastOrder: csFmtDate(csMinutesAgo(300)) }
    ],

    tickets: [
        {
            id: 'TCK-2026-081', customerId: 'CUS-104', customerName: 'អ៊ុច វ៉ាន់ដា', phone: '012 345 678',
            channel: 'telegram', category: 'delivery', priority: 'urgent', status: 'pending',
            openedAt: csMinutesAgo(10), relatedInvoice: 'INV-2026-0891', agent: '',
            subject: 'អតិថិជនសួរនាំអំពីម៉ោងមកដល់របស់ឡានដឹកទំនិញ',
            messages: [
                { sender: 'customer', text: 'សួស្តីបង ខ្ញុំបានកុម្ម៉ង់ទូរទស្សន៍ព្រឹកមិញ តើឡានដឹកមកដល់ម៉ោងប៉ុន្មានដែរ?', at: csMinutesAgo(10) }
            ],
            internalNotes: 'បានពិនិត្យឃើញអ្នកដឹកលេខ 2E-9932 កំពុងធ្វើដំណើរលើផ្លូវ 271'
        },
        {
            id: 'TCK-2026-080', customerId: 'CUS-118', customerName: 'ហាងលក់គ្រឿងបន្លាស់ ម៉េងហួរ', phone: '098 765 432',
            channel: 'call', category: 'exchange', priority: 'critical', status: 'in_progress',
            openedAt: csMinutesAgo(9), relatedInvoice: 'INV-2026-0885', agent: 'លី ស្រីមុំ',
            subject: 'កង្ហារបញ្ឈរមានស្នាមប្រេះពេលបកកេស',
            messages: [
                { sender: 'customer', text: 'ពេលទទួលកង្ហារមក ឃើញស្លាបកង្ហារប្រេះ ខ្ញុំចង់ប្តូរថ្មីមួយគ្រឿងបង', at: csMinutesAgo(9) },
                { sender: 'support', text: 'ជម្រាបសួរលោកម្ចាស់ហាង! ខាងប្អូនបានទទួលរូបភាព និងបញ្ជូនសំណើទៅឃ្លាំងដើម្បីត្រៀមដូរជូនហើយ', at: csMinutesAgo(5) }
            ],
            internalNotes: 'បានដាក់សំណើ RMA-2026-019 ទៅកាន់អ្នកគ្រប់គ្រងឃ្លាំងរួចរាល់'
        },
        {
            id: 'TCK-2026-079', customerId: 'CUS-131', customerName: 'ក្រុមហ៊ុន គឹមសេង ត្រេឌីង', phone: '085 123 999',
            channel: 'telegram', category: 'delivery', priority: 'urgent', status: 'pending',
            openedAt: csMinutesAgo(8), relatedInvoice: 'INV-2026-0894', agent: '',
            subject: 'សុំពន្យារពេលទទួលទំនិញនៅសៀមរាបមួយថ្ងៃ',
            messages: [
                { sender: 'customer', text: 'បង ឃ្លាំងយើងនៅសៀមរាបបិទថ្ងៃនេះ សុំដឹកថ្ងៃស្អែកបានទេ?', at: csMinutesAgo(8) }
            ],
            internalNotes: ''
        },
        {
            id: 'TCK-2026-077', customerId: 'CUS-156', customerName: 'ភោជនីយដ្ឋាន អង្គរសួស្តី', phone: '070 445 112',
            channel: 'facebook', category: 'payment', priority: 'normal', status: 'pending',
            openedAt: csMinutesAgo(40), relatedInvoice: 'INV-2026-0896', agent: '',
            subject: 'សាកសួរអំពីលក្ខខណ្ឌទូទាត់រយៈពេល 30 ថ្ងៃ',
            messages: [
                { sender: 'customer', text: 'សុំសួរបន្តិច បើយើងបើកគណនីជំពាក់ 30 ថ្ងៃ តើត្រូវមានឯកសារអ្វីខ្លះ?', at: csMinutesAgo(40) }
            ],
            internalNotes: ''
        },
        {
            id: 'TCK-2026-076', customerId: 'CUS-104', customerName: 'អ៊ុច វ៉ាន់ដា', phone: '012 345 678',
            channel: 'call', category: 'complaint', priority: 'critical', status: 'in_progress',
            openedAt: csMinutesAgo(95), relatedInvoice: 'INV-2026-0888', agent: 'លី ស្រីមុំ',
            subject: 'អតិថិជនមិនពេញចិត្តនឹងអាកប្បកិរិយារបស់អ្នកដឹក',
            messages: [
                { sender: 'customer', text: 'អ្នកដឹកម្សិលមិញនិយាយមិនសូវល្អ ខ្ញុំចង់ឲ្យក្រុមហ៊ុនដោះស្រាយ', at: csMinutesAgo(95) },
                { sender: 'support', text: 'សូមទោសយ៉ាងជ្រាលជ្រៅ! ខាងប្អូនបានរាយការណ៍ទៅប្រធានផ្នែកដឹកជញ្ជូនហើយ នឹងទាក់ទងត្រឡប់វិញក្នុងថ្ងៃនេះ', at: csMinutesAgo(80) }
            ],
            internalNotes: 'បានបញ្ជូនបន្តទៅប្រធានផ្នែកដឹកជញ្ជូនសម្រាប់វិន័យផ្ទៃក្នុង'
        },
        {
            id: 'TCK-2026-078', customerId: 'CUS-142', customerName: 'គ្លីនិក សុខភាពល្អ', phone: '077 889 900',
            channel: 'walk_in', category: 'payment', priority: 'normal', status: 'resolved',
            openedAt: csMinutesAgo(1180), relatedInvoice: 'INV-2026-0870', agent: 'លី ស្រីមុំ',
            resolvedAt: csMinutesAgo(1172),
            subject: 'សុំទាញយកវិក្កយបត្រពន្ធឡើងវិញ',
            messages: [
                { sender: 'customer', text: 'សុំវិក្កយបត្រសម្រាប់ខែមុនផងបង', at: csMinutesAgo(1180) },
                { sender: 'support', text: 'បានផ្ញើឯកសារផ្លូវការចូលតេឡេក្រាមរួចរាល់ហើយបង។ អរគុណច្រើន!', at: csMinutesAgo(1172) }
            ],
            internalNotes: 'បានទាញយកវិក្កយបត្រពីផ្ទាំងស្វែងរកវិក្កយបត្រ ហើយបញ្ជូនជូនអតិថិជន'
        },
        {
            id: 'TCK-2026-075', customerId: 'CUS-118', customerName: 'ហាងលក់គ្រឿងបន្លាស់ ម៉េងហួរ', phone: '098 765 432',
            channel: 'telegram', category: 'general', priority: 'normal', status: 'resolved',
            openedAt: csMinutesAgo(1620), relatedInvoice: '', agent: 'លី ស្រីមុំ',
            resolvedAt: csMinutesAgo(1605),
            subject: 'សាកសួរអំពីរយៈពេលធានាម៉ាស៊ីនត្រជាក់',
            messages: [
                { sender: 'customer', text: 'ម៉ាស៊ីនត្រជាក់ធានាប៉ុន្មានឆ្នាំដែរបង?', at: csMinutesAgo(1620) },
                { sender: 'support', text: 'ធានា 2 ឆ្នាំលើម៉ាស៊ីនបង្ហាប់ និង 1 ឆ្នាំលើគ្រឿងបន្លាស់ផ្សេងៗបង', at: csMinutesAgo(1605) }
            ],
            internalNotes: ''
        }
    ],

    orders: [
        {
            invoiceId: 'INV-2026-0891', orderNo: 'SO-2026-1042', customerId: 'CUS-104',
            date: csFmtDate(csMinutesAgo(120)), customerName: 'អ៊ុច វ៉ាន់ដា', phone: '012 345 678',
            address: 'ផ្ទះលេខ 12Eo ផ្លូវ 271 សង្កាត់ទឹកល្អក់3 ខណ្ឌទួលគោក ភ្នំពេញ',
            paymentStatus: 'បានទូទាត់', paymentMethod: 'បាគង',
            deliveryStatus: 'out', deliveryId: 'TRK-2026-091',
            salesRep: 'ហេង វិច្ឆិកា',
            items: [
                { sku: 'SKU-001', name: 'ម៉ាស៊ីនត្រជាក់ 1.5HP', qty: 2, unitPrice: 380.00, total: 760.00 },
                { sku: 'SKU-005', name: 'កង្ហារបញ្ឈរតេឡេបញ្ជា', qty: 3, unitPrice: 35.00, total: 105.00 }
            ],
            subtotal: 865.00, discount: 0, vat: 0, grandTotal: 865.00
        },
        {
            invoiceId: 'INV-2026-0885', orderNo: 'SO-2026-1035', customerId: 'CUS-118',
            date: csFmtDate(csMinutesAgo(1540)), customerName: 'ហាងលក់គ្រឿងបន្លាស់ ម៉េងហួរ', phone: '098 765 432',
            address: 'បុរីពិភពថ្មី ចំការដូង ផ្ទះលេខ 45 ផ្លូវ 03',
            paymentStatus: 'បានទូទាត់', paymentMethod: 'សាច់ប្រាក់',
            deliveryStatus: 'delivered', deliveryId: 'TRK-2026-088',
            salesRep: 'ស៊ុន ចាន់ដារ៉ា',
            items: [
                { sku: 'SKU-005', name: 'កង្ហារបញ្ឈរតេឡេបញ្ជា', qty: 10, unitPrice: 35.00, total: 350.00 }
            ],
            subtotal: 350.00, discount: 0, vat: 0, grandTotal: 350.00
        },
        {
            invoiceId: 'INV-2026-0894', orderNo: 'SO-2026-1048', customerId: 'CUS-131',
            date: csFmtDate(csMinutesAgo(180)), customerName: 'ក្រុមហ៊ុន គឹមសេង ត្រេឌីង', phone: '085 123 999',
            address: 'ក្រុងសៀមរាប ផ្ញើតាមឡានក្រុងវីរៈប៊ុនថាំ',
            paymentStatus: 'មិនទាន់ទូទាត់', paymentMethod: 'ជំពាក់រយៈពេល 30 ថ្ងៃ',
            deliveryStatus: 'out', deliveryId: 'TRK-2026-092',
            salesRep: 'ហេង វិច្ឆិកា',
            items: [
                { sku: 'SKU-002', name: 'ទូរទស្សន៍ឆ្លាតវៃ 55 អ៊ីញ', qty: 4, unitPrice: 420.00, total: 1680.00 },
                { sku: 'SKU-006', name: 'ឆ្នាំងដាំបាយអេឡិចត្រូនិច 1.8L', qty: 5, unitPrice: 28.00, total: 140.00 }
            ],
            subtotal: 1820.00, discount: 0, vat: 0, grandTotal: 1820.00
        },
        {
            invoiceId: 'INV-2026-0888', orderNo: 'SO-2026-1044', customerId: 'CUS-104',
            date: csFmtDate(csMinutesAgo(1700)), customerName: 'អ៊ុច វ៉ាន់ដា', phone: '012 345 678',
            address: 'ផ្ទះលេខ 12Eo ផ្លូវ 271 សង្កាត់ទឹកល្អក់3 ខណ្ឌទួលគោក ភ្នំពេញ',
            paymentStatus: 'បានទូទាត់', paymentMethod: 'សាច់ប្រាក់',
            deliveryStatus: 'delivered', deliveryId: 'TRK-2026-085',
            salesRep: 'ហេង វិច្ឆិកា',
            items: [
                { sku: 'SKU-006', name: 'ឆ្នាំងដាំបាយអេឡិចត្រូនិច 1.8L', qty: 2, unitPrice: 28.00, total: 56.00 }
            ],
            subtotal: 56.00, discount: 0, vat: 0, grandTotal: 56.00
        },
        {
            invoiceId: 'INV-2026-0896', orderNo: 'SO-2026-1051', customerId: 'CUS-156',
            date: csFmtDate(csMinutesAgo(300)), customerName: 'ភោជនីយដ្ឋាន អង្គរសួស្តី', phone: '070 445 112',
            address: 'ផ្លូវ 63 សង្កាត់បឹងកេងកង1 ខណ្ឌចំការមន ភ្នំពេញ',
            paymentStatus: 'មិនទាន់ទូទាត់', paymentMethod: 'ជំពាក់រយៈពេល 30 ថ្ងៃ',
            deliveryStatus: 'failed', deliveryId: 'TRK-2026-093',
            salesRep: 'ស៊ុន ចាន់ដារ៉ា',
            items: [
                { sku: 'SKU-009', name: 'ទូរទឹកកកបញ្ឈរ 2 ទ្វារ', qty: 1, unitPrice: 540.00, total: 540.00 }
            ],
            subtotal: 540.00, discount: 0, vat: 0, grandTotal: 540.00
        },
        {
            invoiceId: 'INV-2026-0897', orderNo: 'SO-2026-1053', customerId: 'CUS-142',
            date: csFmtDate(csMinutesAgo(90)), customerName: 'គ្លីនិក សុខភាពល្អ', phone: '077 889 900',
            address: 'ផ្លូវ 271 សង្កាត់ទួលទំពូង2 ខណ្ឌចំការមន ភ្នំពេញ',
            paymentStatus: 'បានទូទាត់', paymentMethod: 'ផ្ទេរតាមធនាគារ',
            deliveryStatus: 'preparing', deliveryId: 'TRK-2026-094',
            salesRep: 'ស៊ុន ចាន់ដារ៉ា',
            items: [
                { sku: 'SKU-001', name: 'ម៉ាស៊ីនត្រជាក់ 1.5HP', qty: 3, unitPrice: 380.00, total: 1140.00 }
            ],
            subtotal: 1140.00, discount: 0, vat: 0, grandTotal: 1140.00
        },
        {
            invoiceId: 'INV-2026-0898', orderNo: 'SO-2026-1054', customerId: 'CUS-118',
            date: csFmtDate(csTodayAgo(260)), customerName: 'ហាងលក់គ្រឿងបន្លាស់ ម៉េងហួរ', phone: '098 765 432',
            address: 'បុរីពិភពថ្មី ចំការដូង ផ្ទះលេខ 45 ផ្លូវ 03',
            paymentStatus: 'បានទូទាត់', paymentMethod: 'បាគង',
            deliveryStatus: 'delivered', deliveryId: 'TRK-2026-095',
            salesRep: 'ស៊ុន ចាន់ដារ៉ា',
            items: [
                { sku: 'SKU-005', name: 'កង្ហារបញ្ឈរតេឡេបញ្ជា', qty: 4, unitPrice: 35.00, total: 140.00 },
                { sku: 'SKU-006', name: 'ឆ្នាំងដាំបាយអេឡិចត្រូនិច 1.8L', qty: 2, unitPrice: 28.00, total: 56.00 }
            ],
            subtotal: 196.00, discount: 0, vat: 0, grandTotal: 196.00
        },
        {
            invoiceId: 'INV-2026-0899', orderNo: 'SO-2026-1055', customerId: 'CUS-131',
            date: csFmtDate(csTodayAgo(210)), customerName: 'ក្រុមហ៊ុន គឹមសេង ត្រេឌីង', phone: '085 123 999',
            address: 'ផ្លូវព្រះនរោត្តម សង្កាត់ផ្សារថ្មី1 ខណ្ឌដូនពេញ ភ្នំពេញ',
            paymentStatus: 'បានទូទាត់', paymentMethod: 'ផ្ទេរតាមធនាគារ',
            deliveryStatus: 'delivered', deliveryId: 'TRK-2026-096',
            salesRep: 'ហេង វិច្ឆិកា',
            items: [
                { sku: 'SKU-002', name: 'ទូរទស្សន៍ឆ្លាតវៃ 55 អ៊ីញ', qty: 2, unitPrice: 420.00, total: 840.00 }
            ],
            subtotal: 840.00, discount: 0, vat: 0, grandTotal: 840.00
        },
        {
            invoiceId: 'INV-2026-0870', orderNo: 'SO-2026-1020', customerId: 'CUS-142',
            date: csFmtDate(csMinutesAgo(2900)), customerName: 'គ្លីនិក សុខភាពល្អ', phone: '077 889 900',
            address: 'ផ្លូវ 271 សង្កាត់ទួលទំពូង2 ខណ្ឌចំការមន ភ្នំពេញ',
            paymentStatus: 'បានទូទាត់', paymentMethod: 'ផ្ទេរតាមធនាគារ',
            deliveryStatus: 'delivered', deliveryId: 'TRK-2026-080',
            salesRep: 'ស៊ុន ចាន់ដារ៉ា',
            items: [
                { sku: 'SKU-005', name: 'កង្ហារបញ្ឈរតេឡេបញ្ជា', qty: 4, unitPrice: 35.00, total: 140.00 }
            ],
            subtotal: 140.00, discount: 0, vat: 0, grandTotal: 140.00
        }
    ],

    deliveries: [
        {
            trackingCode: 'TRK-2026-094', invoiceId: 'INV-2026-0897', customerId: 'CUS-142',
            customerName: 'គ្លីនិក សុខភាពល្អ', phone: '077 889 900',
            district: 'ខណ្ឌចំការមន', province: 'ភ្នំពេញ',
            driverName: 'ជា សុផាត', driverPhone: '016 554 433', vehicle: 'រថយន្តដឹក (2B-8941)',
            status: 'preparing', itemsCount: 3,
            dispatchedAt: '', estimatedArrival: csMinutesAhead(150), deliveredAt: '',
            failureReason: '', rescheduledDate: '', note: '',
            lastUpdated: csMinutesAgo(25)
        },
        {
            trackingCode: 'TRK-2026-091', invoiceId: 'INV-2026-0891', customerId: 'CUS-104',
            customerName: 'អ៊ុច វ៉ាន់ដា', phone: '012 345 678',
            district: 'ខណ្ឌទួលគោក', province: 'ភ្នំពេញ',
            driverName: 'កែវ សំណាង', driverPhone: '011 223 344', vehicle: 'ម៉ូតូរឺម៉កដឹក (2E-9932)',
            status: 'out', itemsCount: 5,
            dispatchedAt: csMinutesAgo(70), estimatedArrival: csMinutesAhead(35), deliveredAt: '',
            failureReason: '', rescheduledDate: '', note: 'នៅជិតស្តុបផ្សារដើមគ',
            lastUpdated: csMinutesAgo(8)
        },
        {
            trackingCode: 'TRK-2026-092', invoiceId: 'INV-2026-0894', customerId: 'CUS-131',
            customerName: 'ក្រុមហ៊ុន គឹមសេង ត្រេឌីង', phone: '085 123 999',
            district: 'ក្រុងសៀមរាប', province: 'សៀមរាប',
            driverName: 'ម៉េង ហុង', driverPhone: '092 887 766', vehicle: 'រថយន្តដឹកធំ (3A-1102)',
            status: 'out', itemsCount: 9,
            dispatchedAt: csMinutesAgo(130), estimatedArrival: csMinutesAhead(90), deliveredAt: '',
            failureReason: '', rescheduledDate: '', note: 'ចេញពីឃ្លាំងកណ្តាលទៅស្ថានីយ៍ឡានក្រុង',
            lastUpdated: csMinutesAgo(40)
        },
        {
            trackingCode: 'TRK-2026-093', invoiceId: 'INV-2026-0896', customerId: 'CUS-156',
            customerName: 'ភោជនីយដ្ឋាន អង្គរសួស្តី', phone: '070 445 112',
            district: 'ខណ្ឌចំការមន', province: 'ភ្នំពេញ',
            driverName: 'កែវ សំណាង', driverPhone: '011 223 344', vehicle: 'ម៉ូតូរឺម៉កដឹក (2E-9932)',
            status: 'failed', itemsCount: 1,
            dispatchedAt: csMinutesAgo(260), estimatedArrival: '', deliveredAt: '',
            failureReason: 'អតិថិជនមិននៅផ្ទះ', rescheduledDate: '', note: 'ខលទូរស័ព្ទ 3 ដងមិនទទួល',
            lastUpdated: csMinutesAgo(190)
        },
        {
            trackingCode: 'TRK-2026-095', invoiceId: 'INV-2026-0898', customerId: 'CUS-118',
            customerName: 'ហាងលក់គ្រឿងបន្លាស់ ម៉េងហួរ', phone: '098 765 432',
            district: 'ចំការដូង', province: 'ភ្នំពេញ',
            driverName: 'ជា សុផាត', driverPhone: '016 554 433', vehicle: 'រថយន្តដឹក (2B-8941)',
            status: 'delivered', itemsCount: 6,
            dispatchedAt: csTodayAgo(240), estimatedArrival: '', deliveredAt: csTodayAgo(165),
            failureReason: '', rescheduledDate: '', note: '',
            lastUpdated: csTodayAgo(165)
        },
        {
            trackingCode: 'TRK-2026-096', invoiceId: 'INV-2026-0899', customerId: 'CUS-131',
            customerName: 'ក្រុមហ៊ុន គឹមសេង ត្រេឌីង', phone: '085 123 999',
            district: 'ខណ្ឌដូនពេញ', province: 'ភ្នំពេញ',
            driverName: 'កែវ សំណាង', driverPhone: '011 223 344', vehicle: 'ម៉ូតូរឺម៉កដឹក (2E-9932)',
            status: 'delivered', itemsCount: 2,
            dispatchedAt: csTodayAgo(190), estimatedArrival: '', deliveredAt: csTodayAgo(140),
            failureReason: '', rescheduledDate: '', note: '',
            lastUpdated: csTodayAgo(140)
        },
        {
            trackingCode: 'TRK-2026-088', invoiceId: 'INV-2026-0885', customerId: 'CUS-118',
            customerName: 'ហាងលក់គ្រឿងបន្លាស់ ម៉េងហួរ', phone: '098 765 432',
            district: 'ចំការដូង', province: 'ភ្នំពេញ',
            driverName: 'ជា សុផាត', driverPhone: '016 554 433', vehicle: 'រថយន្តដឹក (2B-8941)',
            status: 'delivered', itemsCount: 10,
            dispatchedAt: csMinutesAgo(1600), estimatedArrival: '', deliveredAt: csMinutesAgo(1495),
            failureReason: '', rescheduledDate: '', note: '',
            lastUpdated: csMinutesAgo(1495)
        },
        {
            trackingCode: 'TRK-2026-080', invoiceId: 'INV-2026-0870', customerId: 'CUS-142',
            customerName: 'គ្លីនិក សុខភាពល្អ', phone: '077 889 900',
            district: 'ខណ្ឌចំការមន', province: 'ភ្នំពេញ',
            driverName: 'ជា សុផាត', driverPhone: '016 554 433', vehicle: 'រថយន្តដឹក (2B-8941)',
            status: 'delivered', itemsCount: 4,
            dispatchedAt: csMinutesAgo(2960), estimatedArrival: '', deliveredAt: csMinutesAgo(2880),
            failureReason: '', rescheduledDate: '', note: '',
            lastUpdated: csMinutesAgo(2880)
        },
        {
            trackingCode: 'TRK-2026-085', invoiceId: 'INV-2026-0888', customerId: 'CUS-104',
            customerName: 'អ៊ុច វ៉ាន់ដា', phone: '012 345 678',
            district: 'ខណ្ឌទួលគោក', province: 'ភ្នំពេញ',
            driverName: 'ម៉េង ហុង', driverPhone: '092 887 766', vehicle: 'រថយន្តដឹកធំ (3A-1102)',
            status: 'delivered', itemsCount: 2,
            dispatchedAt: csMinutesAgo(1760), estimatedArrival: '', deliveredAt: csMinutesAgo(1690),
            failureReason: '', rescheduledDate: '', note: '',
            lastUpdated: csMinutesAgo(1690)
        }
    ],

    /* កំណត់ចំណាំគាំទ្រ — បន្ថែមបានតែប៉ុណ្ណោះ មិនអាចកែ ឬលុប */
    notes: [
        {
            id: 'NOTE-2026-041', orderId: 'INV-2026-0896', customerId: 'CUS-156',
            noteType: 'support', agent: 'លី ស្រីមុំ', createdAt: csMinutesAgo(185),
            content: 'បានទាក់ទងអតិថិជន ហើយព្រមព្រៀងឲ្យដឹកជញ្ជូនសាជាថ្មីនៅថ្ងៃបន្ទាប់ម៉ោងរសៀល'
        },
        {
            id: 'NOTE-2026-039', orderId: 'INV-2026-0885', customerId: 'CUS-118',
            noteType: 'complaint', agent: 'លី ស្រីមុំ', createdAt: csMinutesAgo(10),
            content: 'អតិថិជនរាយការណ៍កង្ហារប្រេះ 1 គ្រឿង — បានថតរូបភាពទុក និងបញ្ជូនទៅឃ្លាំង'
        }
    ],

    /* សំណើប្តូរទំនិញ ឬបង្វិលមកវិញ */
    rma: [
        {
            id: 'RMA-2026-019', invoiceId: 'INV-2026-0885', customerId: 'CUS-118',
            sku: 'SKU-005', itemName: 'កង្ហារបញ្ឈរតេឡេបញ្ជា', qty: 1,
            reason: 'ទំនិញខូចខាតពេលដឹកជញ្ជូន', description: 'ស្លាបកង្ហារប្រេះពេលបកកេស',
            status: 'រង់ចាំឃ្លាំងពិនិត្យ', agent: 'លី ស្រីមុំ', createdAt: csMinutesAgo(9)
        }
    ]
};

/* ===== ស្រទាប់ផ្ទុកទិន្នន័យ ===== */

function getCustomerSupportData() {
    try {
        const raw = localStorage.getItem(CS_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            // បើគ្រោងទិន្នន័យចាស់ ត្រូវកសាងឡើងវិញដើម្បីឲ្យម៉ោងត្រឹមត្រូវ
            if (parsed && parsed.schemaVersion === CS_DEFAULT_DATA.schemaVersion) return parsed;
        }
    } catch (e) {
        console.warn('មិនអាចអានទិន្នន័យដែលបានរក្សាទុក — ប្រើទិន្នន័យដើមជំនួស');
    }
    return JSON.parse(JSON.stringify(CS_DEFAULT_DATA));
}

function saveCustomerSupportData(data) {
    try {
        localStorage.setItem(CS_STORAGE_KEY, JSON.stringify(data));
        if (typeof window !== 'undefined' && typeof window.onStoreChanged === 'function') {
            window.onStoreChanged();
        }
    } catch (e) {
        console.error('មិនអាចរក្សាទុកទិន្នន័យបាន', e);
    }
}

function resetCustomerSupportData() {
    try { localStorage.removeItem(CS_STORAGE_KEY); } catch (e) { /* មិនអីទេ */ }
}

/* ===== ការអានទិន្នន័យ (Read-only projections) ===== */

/* លំដាប់អាទិភាពនៃការបង្ហាញ — ហួសកាលកំណត់មុនគេ រួចជិតដល់ រួចទាន់ពេល ហើយបិទរួចក្រោយគេ */
const CS_SLA_RANK = { breach: 0, risk: 1, ok: 2, done: 3 };

function csTickets(filter) {
    const list = getCustomerSupportData().tickets || [];
    const sorted = list.slice().sort((a, b) => {
        // រៀបតាមកម្រិតបន្ទាន់ជាមុន ដើម្បីកុំឲ្យសំបុត្រជិតដល់កាលកំណត់ធ្លាក់ក្រោម
        // សំបុត្រដែលនៅទាន់ពេល ដោយសារតែថវិកាពេលវេលាខុសគ្នា
        const rank = CS_SLA_RANK[csSla(a).level] - CS_SLA_RANK[csSla(b).level];
        if (rank !== 0) return rank;
        return csSla(a).remaining - csSla(b).remaining;
    });
    if (!filter || filter === 'all') return sorted;
    return sorted.filter(t => t.status === filter);
}

function csTicket(id) {
    return (getCustomerSupportData().tickets || []).find(t => t.id === id) || null;
}

function csTicketCounts() {
    const list = getCustomerSupportData().tickets || [];
    return {
        all: list.length,
        pending: list.filter(t => t.status === 'pending').length,
        in_progress: list.filter(t => t.status === 'in_progress').length,
        resolved: list.filter(t => t.status === 'resolved').length,
        breached: list.filter(t => t.status !== 'resolved' && csSla(t).level === 'breach').length,
        atRisk: list.filter(t => t.status !== 'resolved' && csSla(t).level === 'risk').length
    };
}

function csOrders() {
    return (getCustomerSupportData().orders || []).slice()
        .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function csOrder(invoiceId) {
    return (getCustomerSupportData().orders || []).find(o => o.invoiceId === invoiceId) || null;
}

function csCustomer(id) {
    return (getCustomerSupportData().customers || []).find(c => c.id === id) || null;
}

function csDeliveries(filter) {
    const list = (getCustomerSupportData().deliveries || []).slice();
    // រៀបតាមពេលចេញដំណើរពីចាស់ទៅថ្មី — អ្វីដែលចាស់ជាងត្រូវការការយកចិត្តទុកដាក់មុន
    list.sort((a, b) => String(a.dispatchedAt || a.lastUpdated).localeCompare(String(b.dispatchedAt || b.lastUpdated)));
    if (!filter || filter === 'all') return list;
    return list.filter(d => d.status === filter);
}

function csDelivery(trackingCode) {
    return (getCustomerSupportData().deliveries || []).find(d => d.trackingCode === trackingCode) || null;
}

function csDeliveryCounts() {
    const list = getCustomerSupportData().deliveries || [];
    return {
        preparing: list.filter(d => d.status === 'preparing').length,
        out: list.filter(d => d.status === 'out').length,
        delivered: list.filter(d => d.status === 'delivered').length,
        failed: list.filter(d => d.status === 'failed').length
    };
}

/** ការដឹកជញ្ជូនដែលមានបញ្ហាក្នុងរយៈពេល 48 ម៉ោងចុងក្រោយ */
function csProblemDeliveries(limit) {
    const cutoff = Date.now() - 48 * 60 * 60000;
    const list = (getCustomerSupportData().deliveries || [])
        .filter(d => d.status === 'failed' && new Date(d.lastUpdated).getTime() >= cutoff)
        .sort((a, b) => String(b.lastUpdated).localeCompare(String(a.lastUpdated)));
    return limit ? list.slice(0, limit) : list;
}

function csDrivers() {
    const seen = {};
    (getCustomerSupportData().deliveries || []).forEach(d => {
        if (d.driverName) seen[d.driverName] = d.driverPhone;
    });
    return Object.keys(seen).map(name => ({ name, phone: seen[name] }));
}

function csNotesFor(orderId) {
    return (getCustomerSupportData().notes || [])
        .filter(n => n.orderId === orderId)
        .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

function csRmaFor(invoiceId) {
    return (getCustomerSupportData().rma || []).filter(r => r.invoiceId === invoiceId);
}

/**
 * ស្វែងរកទូទាំងប្រព័ន្ធ — តាមលេខវិក្កយបត្រ, លេខទូរស័ព្ទ ឬឈ្មោះអតិថិជន
 * ត្រឡប់ជាក្រុម ដើម្បីបង្ហាញក្នុងបញ្ជីលទ្ធផលរហ័ស
 */
function csSearch(query, perGroup) {
    const q = String(query || '').trim().toLowerCase();
    const cap = perGroup || 5;
    if (q.length < 2) return { query: q, orders: [], customers: [], total: 0 };

    const data = getCustomerSupportData();
    const matchOrder = o =>
        o.invoiceId.toLowerCase().includes(q) ||
        o.orderNo.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.phone.replace(/\s/g, '').includes(q.replace(/\s/g, '')) ||
        (o.items || []).some(i => i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q));

    const matchCustomer = c =>
        c.name.toLowerCase().includes(q) ||
        c.phone.replace(/\s/g, '').includes(q.replace(/\s/g, '')) ||
        c.id.toLowerCase().includes(q);

    const orders = (data.orders || []).filter(matchOrder);
    const customers = (data.customers || []).filter(matchCustomer);

    return {
        query: q,
        orders: orders.slice(0, cap),
        customers: customers.slice(0, cap),
        total: orders.length + customers.length
    };
}

/* ===== សកម្មភាពដែលអនុញ្ញាត (ទាំងអស់ឆ្លងកាត់ត្រង់នេះ) ===== */

const csActions = {
    /** ផ្ញើសារឆ្លើយតបទៅអតិថិជន — សំបុត្រប្តូរទៅ «កំពុងដោះស្រាយ» ដោយស្វ័យប្រវត្តិ */
    reply(ticketId, text) {
        const body = String(text || '').trim();
        if (!body) return { ok: false, error: 'សូមវាយបញ្ចូលសារជាមុនសិន' };
        const data = getCustomerSupportData();
        const ticket = (data.tickets || []).find(t => t.id === ticketId);
        if (!ticket) return { ok: false, error: 'រកមិនឃើញសំបុត្រនេះទេ' };

        ticket.messages.push({ sender: 'support', text: body, at: new Date().toISOString() });
        if (ticket.status === 'pending') ticket.status = 'in_progress';
        if (!ticket.agent) ticket.agent = data.userProfile.name;
        saveCustomerSupportData(data);
        return { ok: true, ticket };
    },

    /** រក្សាទុកកំណត់ចំណាំផ្ទៃក្នុងរបស់ក្រុមការងារ */
    saveInternalNote(ticketId, note) {
        const data = getCustomerSupportData();
        const ticket = (data.tickets || []).find(t => t.id === ticketId);
        if (!ticket) return { ok: false, error: 'រកមិនឃើញសំបុត្រនេះទេ' };
        ticket.internalNotes = String(note || '');
        saveCustomerSupportData(data);
        return { ok: true, ticket };
    },

    /** ប្តូរស្ថានភាពសំបុត្រ — អនុញ្ញាតតែ pending / in_progress / resolved */
    setTicketStatus(ticketId, status, note) {
        if (!CS_TICKET_STATUS[status]) return { ok: false, error: 'ស្ថានភាពមិនត្រឹមត្រូវ' };
        const data = getCustomerSupportData();
        const ticket = (data.tickets || []).find(t => t.id === ticketId);
        if (!ticket) return { ok: false, error: 'រកមិនឃើញសំបុត្រនេះទេ' };

        ticket.status = status;
        if (!ticket.agent) ticket.agent = data.userProfile.name;
        if (status === 'resolved') ticket.resolvedAt = new Date().toISOString();
        else delete ticket.resolvedAt;
        if (note !== undefined && note !== null) ticket.internalNotes = String(note);
        saveCustomerSupportData(data);
        return { ok: true, ticket };
    },

    /** បង្កើតសំបុត្រជំនួយថ្មីពីការខលចូល ឬសារចូល */
    createTicket(form) {
        const data = getCustomerSupportData();
        const name = String(form.customerName || '').trim();
        const phone = String(form.phone || '').trim();
        const subject = String(form.subject || '').trim();
        if (!name || !phone || !subject) {
            return { ok: false, error: 'សូមបំពេញ ឈ្មោះអតិថិជន លេខទូរស័ព្ទ និងចំណងជើង' };
        }

        const maxNo = (data.tickets || []).reduce((m, t) => {
            const n = parseInt(String(t.id).split('-').pop(), 10);
            return isNaN(n) ? m : Math.max(m, n);
        }, 0);
        const id = `TCK-${CS_NOW.getFullYear()}-${String(maxNo + 1).padStart(3, '0')}`;

        const match = (data.customers || []).find(c => c.phone.replace(/\s/g, '') === phone.replace(/\s/g, ''));

        const ticket = {
            id,
            customerId: match ? match.id : '',
            customerName: name,
            phone,
            channel: CS_CHANNEL[form.channel] ? form.channel : 'call',
            category: CS_CATEGORY[form.category] ? form.category : 'general',
            priority: CS_PRIORITY[form.priority] ? form.priority : 'normal',
            status: 'pending',
            openedAt: new Date().toISOString(),
            relatedInvoice: String(form.relatedInvoice || '').trim(),
            agent: '',
            subject,
            messages: form.firstMessage
                ? [{ sender: 'customer', text: String(form.firstMessage), at: new Date().toISOString() }]
                : [],
            internalNotes: String(form.internalNotes || '')
        };

        data.tickets.unshift(ticket);
        saveCustomerSupportData(data);
        return { ok: true, ticket };
    },

    /** បន្ថែមកំណត់ចំណាំទៅវិក្កយបត្រ — បន្ថែមបានតែប៉ុណ្ណោះ មិនប៉ះពាល់ទិន្នន័យហិរញ្ញវត្ថុ */
    addNote(form) {
        const content = String(form.content || '').trim();
        if (!content) return { ok: false, error: 'សូមវាយបញ្ចូលខ្លឹមសារកំណត់ចំណាំ' };
        const data = getCustomerSupportData();
        const maxNo = (data.notes || []).reduce((m, n) => {
            const v = parseInt(String(n.id).split('-').pop(), 10);
            return isNaN(v) ? m : Math.max(m, v);
        }, 0);

        const note = {
            id: `NOTE-${CS_NOW.getFullYear()}-${String(maxNo + 1).padStart(3, '0')}`,
            orderId: String(form.orderId || ''),
            customerId: String(form.customerId || ''),
            noteType: CS_NOTE_TYPES.some(t => t.value === form.noteType) ? form.noteType : 'other',
            agent: data.userProfile.name,
            createdAt: new Date().toISOString(),
            content
        };
        data.notes.unshift(note);
        saveCustomerSupportData(data);
        return { ok: true, note };
    },

    /** ស្នើសុំប្តូរទំនិញ ឬបង្វិលមកវិញ — បញ្ជូនទៅឃ្លាំងដើម្បីពិនិត្យ */
    requestRma(form) {
        const data = getCustomerSupportData();
        const order = (data.orders || []).find(o => o.invoiceId === form.invoiceId);
        if (!order) return { ok: false, error: 'រកមិនឃើញវិក្កយបត្រនេះទេ' };
        const item = (order.items || []).find(i => i.sku === form.sku);
        if (!item) return { ok: false, error: 'សូមជ្រើសរើសមុខទំនិញ' };
        const description = String(form.description || '').trim();
        if (!description) return { ok: false, error: 'សូមបរិយាយលម្អិតអំពីបញ្ហា' };

        const maxNo = (data.rma || []).reduce((m, r) => {
            const n = parseInt(String(r.id).split('-').pop(), 10);
            return isNaN(n) ? m : Math.max(m, n);
        }, 0);

        const rma = {
            id: `RMA-${CS_NOW.getFullYear()}-${String(maxNo + 1).padStart(3, '0')}`,
            invoiceId: order.invoiceId,
            customerId: order.customerId,
            sku: item.sku,
            itemName: item.name,
            qty: Number(form.qty) > 0 ? Math.min(Number(form.qty), item.qty) : 1,
            reason: form.reason || CS_FAILURE_REASONS[0],
            description,
            status: 'រង់ចាំឃ្លាំងពិនិត្យ',
            agent: data.userProfile.name,
            createdAt: new Date().toISOString()
        };
        data.rma.unshift(rma);
        saveCustomerSupportData(data);
        return { ok: true, rma };
    },

    /**
     * សម្គាល់ការដឹកជញ្ជូនថាបរាជ័យ — ជាសិទ្ធិរបស់ផ្នែកបម្រើអតិថិជន
     * មិនប៉ះពាល់កំណត់ត្រាហិរញ្ញវត្ថុឡើយ គឺប្តូរតែស្ថានភាពដឹកជញ្ជូនប៉ុណ្ណោះ
     */
    markFailed(trackingCode, reason, note) {
        if (!reason) return { ok: false, error: 'សូមជ្រើសរើសមូលហេតុ' };
        const data = getCustomerSupportData();
        const del = (data.deliveries || []).find(d => d.trackingCode === trackingCode);
        if (!del) return { ok: false, error: 'រកមិនឃើញកញ្ចប់ដឹកជញ្ជូននេះទេ' };
        if (del.status !== 'out') {
            return { ok: false, error: 'សម្គាល់ថាបរាជ័យបានតែកញ្ចប់ដែលកំពុងដឹកជញ្ជូនប៉ុណ្ណោះ' };
        }

        del.status = 'failed';
        del.failureReason = reason;
        del.note = String(note || '');
        del.lastUpdated = new Date().toISOString();
        del.estimatedArrival = '';

        const order = (data.orders || []).find(o => o.invoiceId === del.invoiceId);
        if (order) order.deliveryStatus = 'failed';

        saveCustomerSupportData(data);
        csNotifyWarehouse(del.trackingCode);
        return { ok: true, delivery: del };
    },

    /**
     * កំណត់ពេលដឹកជញ្ជូនឡើងវិញ — រក្សាទុកតែកាលបរិច្ឆេទ និងកំណត់ចំណាំ
     * មិនចាត់តាំងអ្នកដឹកថ្មី ហើយមិនបង្កើតបញ្ជាដឹកថ្មីទេ (ជាការងាររបស់ឃ្លាំង)
     */
    reschedule(trackingCode, dateText, note) {
        const when = String(dateText || '').trim();
        if (!when) return { ok: false, error: 'សូមបញ្ចូលថ្ងៃដឹកជញ្ជូនថ្មី' };
        const data = getCustomerSupportData();
        const del = (data.deliveries || []).find(d => d.trackingCode === trackingCode);
        if (!del) return { ok: false, error: 'រកមិនឃើញកញ្ចប់ដឹកជញ្ជូននេះទេ' };
        if (del.status !== 'failed') {
            return { ok: false, error: 'កំណត់ពេលឡើងវិញបានតែកញ្ចប់ដែលដឹកមិនជោគជ័យប៉ុណ្ណោះ' };
        }

        del.rescheduledDate = when;
        if (note) del.note = String(note);
        del.lastUpdated = new Date().toISOString();
        saveCustomerSupportData(data);
        return { ok: true, delivery: del };
    }
};

/**
 * ជូនដំណឹងទៅឃ្លាំង — នៅកំណែគំរូនេះគ្រាន់តែកត់ត្រាទុក
 * នៅកំណែពេញលេញ នឹងបញ្ជូនតាមប្រព័ន្ធជូនដំណឹងកណ្តាល
 */
function csNotifyWarehouse(trackingCode) {
    console.info(`[ជូនដំណឹងឃ្លាំង] កញ្ចប់ ${trackingCode} ត្រូវបានសម្គាល់ថាដឹកមិនជោគជ័យ`);
}

/* ===== ផ្លាកលេខនៅរបារចំហៀង (អានដោយ portal.js) ===== */

/** ចំនួនសំបុត្រដែលមិនទាន់បិទ — បង្ហាញជាផ្លាកក្រហម */
function totalPending() {
    const c = csTicketCounts();
    return c.pending + c.in_progress;
}

/** ចំនួនសំបុត្រហួសកាលកំណត់ និងកញ្ចប់ដឹកមិនជោគជ័យ — បង្ហាញជាផ្លាកពណ៌លឿង */
function totalAlerts() {
    return csTicketCounts().breached + csDeliveryCounts().failed;
}

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

function portalNotifications() {
    const list = [];

    // សំបុត្រជំនួយដែលជិត ឬហួសកាលកំណត់ឆ្លើយតប
    csTickets().filter(t => t.status !== 'resolved').slice(0, 4).forEach(t => {
        const sla = csSla(t);
        list.push({
            icon: sla.level === 'breach' ? 'mdi:timer-alert-outline' : 'mdi:ticket-confirmation-outline',
            tone: sla.level === 'breach' ? 'danger' : (sla.level === 'risk' ? 'warning' : 'info'),
            title: sla.level === 'breach'
                ? `សំបុត្រ ${t.id} ហួសកាលកំណត់ឆ្លើយតប ${csClock(-sla.remaining)}`
                : `សំបុត្រ ${t.id} នៅសល់ ${csClock(sla.remaining)}`,
            note: `${t.customerName} · ${CS_CHANNEL[t.channel] || ''} · ${(CS_CATEGORY[t.category] || {}).label || ''}`,
            time: csRelative(t.openedAt)
        });
    });

    // កញ្ចប់ដែលដឹកមិនជោគជ័យ
    csProblemDeliveries(3).forEach(d => {
        list.push({
            icon: 'mdi:truck-alert-outline',
            tone: 'danger',
            title: `${d.trackingCode} ដឹកមិនជោគជ័យ`,
            note: `${d.customerName} · ${d.district} · ${d.failureReason} · អ្នកដឹក ${d.driverName}`,
            time: csRelative(d.lastUpdated)
        });
    });

    // កញ្ចប់កំពុងធ្វើដំណើរ
    csDeliveries('out').slice(0, 2).forEach(d => {
        list.push({
            icon: 'mdi:map-marker-path',
            tone: 'info',
            title: `${d.trackingCode} កំពុងដឹកជញ្ជូន`,
            note: `${d.customerName} · ${d.district} · អ្នកដឹក ${d.driverName} (${d.driverPhone}) · រំពឹងដល់ ${csFmtTime(d.estimatedArrival)}`,
            time: csRelative(d.lastUpdated)
        });
    });

    return list;
}
