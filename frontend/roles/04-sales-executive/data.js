/* ច្រកបុគ្គលិកប្រតិបត្តិផ្នែកលក់ — ឃ្លាំងទិន្នន័យសាកល្បង

   ⚠️ គោលការណ៍សុវត្ថិភាពតឹងរ៉ឹង (Zero Cost Leakage)
   ឯកសារនេះ "មិនមាន" ថ្លៃដើមទិញ (Purchase Cost), ថ្លៃដើមមធ្យម ឬកម្រិតចំណេញ
   (Profit Margin) ណាមួយឡើយ។ បុគ្គលិកលក់មើលឃើញត្រឹមតែតម្លៃលក់តាមកម្រិត
   អតិថិជនប៉ុណ្ណោះ។ ហាមបញ្ចូលទិន្នន័យថ្លៃដើមចូលក្នុងឯកសារនេះជាដាច់ខាត។

   វិសាលភាពទិន្នន័យ៖ អតិថិជន សម្រង់តម្លៃ និងវិក្កយបត្រ ដែលបុគ្គលិកនេះ
   ទទួលបន្ទុកផ្ទាល់ប៉ុណ្ណោះ។ */

const BMS_TODAY = new Date(2026, 8, 3);

const MONTHS_KH = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];

/* ដែនកម្រិតបញ្ចុះតម្លៃដែលបុគ្គលិកលក់អនុវត្តបានដោយខ្លួនឯង */
const DISCOUNT_SELF_LIMIT = 5.0;

const CURRENT_REP = {
    id: 'u-sao',
    name: 'សៅ សុខា',
    initials: 'សស',
    phone: '012 345 678',
    monthlyTarget: 26000,
    commissionRate: 2.0,
    manager: 'ហេង វិច្ឆិកា'
};

const TIER_LABEL = {
    retail: 'អតិថិជនរាយ',
    wholesale: 'អតិថិជនដុំ',
    vip: 'តំណាងចែកចាយ · VIP'
};

const TIER_TONE = {
    retail: 'bg-slate-100 text-slate-600 border-slate-200',
    wholesale: 'bg-blue-50 text-blue-700 border-blue-200',
    vip: 'bg-purple-50 text-purple-700 border-purple-200'
};

/* អតិថិជនក្រោមការទទួលបន្ទុករបស់បុគ្គលិកនេះ */
const CUSTOMERS = [
    { id: 'c-rasmey', code: 'CUST-2026-0001', name: 'ក្រុមហ៊ុន រស្មី អភិវឌ្ឍន៍', tier: 'wholesale', contact: 'លោក គង់ សំណាង', phone: '012 888 777', email: 'kong@rasmey.com.kh', address: 'ផ្លូវ 271 សង្កាត់ ទួលទំពូង ខណ្ឌ ចំការមន រាជធានីភ្នំពេញ', creditLimit: 10000, paymentTerms: 30, since: '2024-03-12' },
    { id: 'c-treyluk', code: 'CUST-2026-0008', name: 'ក្រុមហ៊ុន ត្រីល័ក្ខ', tier: 'retail', contact: 'លោក សំ បូរ៉ា', phone: '010 654 321', email: 'bora@treyluk.com', address: 'ផ្លូវ 128 សង្កាត់ មិត្តភាព ខណ្ឌ 7 មករា រាជធានីភ្នំពេញ', creditLimit: 3000, paymentTerms: 15, since: '2025-01-20' },
    { id: 'c-angkor', code: 'CUST-2026-0014', name: 'អង្គរ ឌីជីថល សឹលូសិន', tier: 'vip', contact: 'លោកស្រី នី សុផល', phone: '017 909 090', email: 'sophal@angkordigital.kh', address: 'មហាវិថី ព្រះនរោត្តម សង្កាត់ ចតុមុខ ខណ្ឌ ដូនពេញ រាជធានីភ្នំពេញ', creditLimit: 20000, paymentTerms: 30, since: '2023-11-05' },
    { id: 'c-mekong', code: 'CUST-2026-0021', name: 'ហាងគ្រឿងអេឡិចត្រូនិក មេគង្គ', tier: 'wholesale', contact: 'លោក ធីម សុវណ្ណារ៉ា', phone: '096 333 222', email: 'mekong.shop@gmail.com', address: 'ផ្សារកណ្តាល ក្រុង បាត់ដំបង ខេត្ត បាត់ដំបង', creditLimit: 8000, paymentTerms: 30, since: '2025-04-18' },
    { id: 'c-bayon', code: 'CUST-2026-0027', name: 'សាលា បាយ័ន អន្តរជាតិ', tier: 'wholesale', contact: 'លោក ជា វិសាល', phone: '096 777 888', email: 'admin@bayonschool.edu.kh', address: 'ផ្លូវ 598 សង្កាត់ ភ្នំពេញថ្មី ខណ្ឌ សែនសុខ រាជធានីភ្នំពេញ', creditLimit: 12000, paymentTerms: 45, since: '2024-08-30' },
    { id: 'c-sovann', code: 'CUST-2026-0033', name: 'ហាងទឹកដម្រី សុវណ្ណា', tier: 'retail', contact: 'លោកស្រី សុវណ្ណា', phone: '093 111 222', email: '', address: 'ផ្សារ ដើមគរ ខណ្ឌ ទួលគោក រាជធានីភ្នំពេញ', creditLimit: 2000, paymentTerms: 15, since: '2025-06-02' },
    { id: 'c-phnom', code: 'CUST-2026-0039', name: 'សណ្ឋាគារ ភ្នំពេញ ហ្គ្រេន', tier: 'vip', contact: 'លោកស្រី ម៉ៅ សុភា', phone: '011 456 789', email: 'purchasing@ppgrand.com', address: 'មហាវិថី មុនីវង្ស សង្កាត់ វត្តភ្នំ ខណ្ឌ ដូនពេញ រាជធានីភ្នំពេញ', creditLimit: 25000, paymentTerms: 30, since: '2023-05-14' }
];

/* កាតាឡុកទំនិញ — មានតែតម្លៃលក់តាមកម្រិតអតិថិជន គ្មានថ្លៃដើមទិញឡើយ */
const PRODUCTS = [
    { sku: 'DEL-OPT-7010', name: 'កុំព្យូទ័រ Dell OptiPlex 7010', unit: 'ឈុត', category: 'កុំព្យូទ័រ', stock: 24, price: { retail: 720, wholesale: 650, vip: 610 } },
    { sku: 'MON-DEL-24', name: 'អេក្រង់ Dell 24 អ៊ីញ S2421HN', unit: 'គ្រឿង', category: 'អេក្រង់', stock: 58, price: { retail: 165, wholesale: 140, vip: 132 } },
    { sku: 'PRN-CAN-2900', name: 'ម៉ាស៊ីនបោះពុម្ព Canon Laser LBP2900', unit: 'គ្រឿង', category: 'ម៉ាស៊ីនបោះពុម្ព', stock: 17, price: { retail: 185, wholesale: 160, vip: 152 } },
    { sku: 'KEY-KEY-K8', name: 'ក្តារចុចមេកានិច Keychron K8', unit: 'គ្រឿង', category: 'គ្រឿងបន្លាស់', stock: 92, price: { retail: 95, wholesale: 82, vip: 76 } },
    { sku: 'CHR-ERG-01', name: 'កៅអីការិយាល័យ Ergonomic', unit: 'គ្រឿង', category: 'គ្រឿងសង្ហារិម', stock: 36, price: { retail: 240, wholesale: 210, vip: 198 } },
    { sku: 'UPS-APC-650', name: 'ម៉ាស៊ីនបម្រុងថាមពល APC 650VA', unit: 'គ្រឿង', category: 'គ្រឿងបន្លាស់', stock: 45, price: { retail: 78, wholesale: 68, vip: 64 } },
    { sku: 'NAS-SYN-220', name: 'ម៉ាស៊ីនរក្សាទុកទិន្នន័យ Synology DS220', unit: 'ឈុត', category: 'កុំព្យូទ័រ', stock: 9, price: { retail: 460, wholesale: 415, vip: 392 } }
];

/* សម្រង់តម្លៃ — ស្ថានភាព: draft, pending_approval, approved, rejected, converted, expired */
const QUOTES = [
    {
        id: 'QT-2026-0089', customerId: 'c-rasmey', date: '2026-09-17T11:30', validUntil: '2026-09-24',
        status: 'pending_approval', discountPercent: 8.0, downPayment: 0,
        note: 'អតិថិជនស្នើសុំបញ្ចុះតម្លៃបន្ថែម ព្រោះបញ្ជាទិញច្រើន',
        items: [
            { sku: 'DEL-OPT-7010', qty: 5, price: 650 },
            { sku: 'MON-DEL-24', qty: 5, price: 140 },
            { sku: 'PRN-CAN-2900', qty: 3, price: 160 }
        ]
    },
    {
        id: 'QT-2026-0092', customerId: 'c-angkor', date: '2026-09-16T09:45', validUntil: '2026-09-30',
        status: 'approved', discountPercent: 4.0, downPayment: 500,
        note: '',
        items: [
            { sku: 'NAS-SYN-220', qty: 4, price: 392 },
            { sku: 'UPS-APC-650', qty: 8, price: 64 }
        ]
    },
    {
        id: 'QT-2026-0086', customerId: 'c-mekong', date: '2026-09-11T15:20', validUntil: '2026-09-21',
        status: 'converted', discountPercent: 4.5, downPayment: 0, invoiceId: 'INV-2026-0109',
        note: '',
        items: [{ sku: 'MON-DEL-24', qty: 30, price: 140 }]
    },
    {
        id: 'QT-2026-0081', customerId: 'c-bayon', date: '2026-09-08T10:05', validUntil: '2026-09-18',
        status: 'converted', discountPercent: 3.0, downPayment: 0, invoiceId: 'INV-2026-0104',
        note: '',
        items: [
            { sku: 'DEL-OPT-7010', qty: 6, price: 650 },
            { sku: 'KEY-KEY-K8', qty: 12, price: 82 }
        ]
    },
    {
        id: 'QT-2026-0095', customerId: 'c-sovann', date: '2026-09-02T14:10', validUntil: '2026-09-09',
        status: 'expired', discountPercent: 0, downPayment: 0,
        note: 'អតិថិជនមិនបានឆ្លើយតបវិញទេ',
        items: [{ sku: 'PRN-CAN-2900', qty: 2, price: 185 }]
    },
    {
        id: 'QT-2026-0097', customerId: 'c-phnom', date: '2026-09-19T16:00', validUntil: '2026-10-03',
        status: 'draft', discountPercent: 0, downPayment: 0,
        note: 'កំពុងរង់ចាំបញ្ជីមុខទំនិញពីអតិថិជន',
        items: [{ sku: 'CHR-ERG-01', qty: 20, price: 198 }]
    },
    {
        id: 'QT-2026-0072', customerId: 'c-treyluk', date: '2026-08-28T11:00', validUntil: '2026-09-07',
        status: 'rejected', discountPercent: 12.0, downPayment: 0,
        note: 'អ្នកគ្រប់គ្រងបដិសេធ ដោយសារបញ្ចុះតម្លៃលើសកម្រិតសម្រាប់អតិថិជនរាយ',
        items: [{ sku: 'DEL-OPT-7010', qty: 3, price: 720 }]
    }
];

/* វិក្កយបត្រ — ស្ថានភាព: unpaid, partial, paid, overdue */
const INVOICES = [
    {
        id: 'INV-2026-0109', customerId: 'c-mekong', quoteId: 'QT-2026-0086',
        date: '2026-09-11', dueDate: '2026-10-11', discountPercent: 4.5, downPayment: 0, paid: 0,
        items: [{ sku: 'MON-DEL-24', qty: 30, price: 140 }]
    },
    {
        id: 'INV-2026-0104', customerId: 'c-bayon', quoteId: 'QT-2026-0081',
        date: '2026-09-08', dueDate: '2026-10-23', discountPercent: 3.0, downPayment: 1000, paid: 1500,
        items: [
            { sku: 'DEL-OPT-7010', qty: 6, price: 650 },
            { sku: 'KEY-KEY-K8', qty: 12, price: 82 }
        ]
    },
    {
        id: 'INV-2026-0112', customerId: 'c-angkor',
        date: '2026-09-13', dueDate: '2026-10-13', discountPercent: 2.0, downPayment: 0, paid: 4243.01,
        items: [
            { sku: 'NAS-SYN-220', qty: 6, price: 392 },
            { sku: 'MON-DEL-24', qty: 12, price: 132 }
        ]
    },
    {
        id: 'INV-2026-0102', customerId: 'c-rasmey',
        date: '2026-08-01', dueDate: '2026-08-31', discountPercent: 0, downPayment: 0, paid: 0,
        items: [
            { sku: 'DEL-OPT-7010', qty: 5, price: 650 },
            { sku: 'MON-DEL-24', qty: 5, price: 140 },
            { sku: 'CHR-ERG-01', qty: 4, price: 210 }
        ]
    },
    {
        id: 'INV-2026-0087', customerId: 'c-sovann',
        date: '2026-07-24', dueDate: '2026-08-08', discountPercent: 0, downPayment: 0, paid: 0,
        items: [
            { sku: 'KEY-KEY-K8', qty: 8, price: 95 },
            { sku: 'UPS-APC-650', qty: 6, price: 78 }
        ]
    },
    {
        id: 'INV-2026-0116', customerId: 'c-treyluk',
        date: '2026-09-14', dueDate: '2026-09-29', discountPercent: 0, downPayment: 0, paid: 1394.80,
        items: [
            { sku: 'CHR-ERG-01', qty: 4, price: 240 },
            { sku: 'KEY-KEY-K8', qty: 4, price: 95 }
        ]
    }
];

/* ការរំលឹកតាមដានអតិថិជន */
const FOLLOW_UPS = [
    { id: 'FU-01', customerId: 'c-rasmey', due: '2026-09-03', type: 'quote', refId: 'QT-2026-0089', note: 'ទូរស័ព្ទតាមដានលទ្ធផលការអនុម័តបញ្ចុះតម្លៃ' },
    { id: 'FU-02', customerId: 'c-sovann', due: '2026-09-01', type: 'payment', refId: 'INV-2026-0087', note: 'ទារប្រាក់វិក្កយបត្រហួសកាលកំណត់' },
    { id: 'FU-03', customerId: 'c-angkor', due: '2026-09-03', type: 'quote', refId: 'QT-2026-0092', note: 'បញ្ជាក់កាលបរិច្ឆេទដឹកជញ្ជូនជាមួយអតិថិជន' },
    { id: 'FU-04', customerId: 'c-phnom', due: '2026-09-05', type: 'lead', refId: 'QT-2026-0097', note: 'ទទួលបញ្ជីមុខទំនិញ ដើម្បីបញ្ចប់សម្រង់តម្លៃ' },
    { id: 'FU-05', customerId: 'c-rasmey', due: '2026-08-30', type: 'payment', refId: 'INV-2026-0102', note: 'វិក្កយបត្រហួសកាលកំណត់ ត្រូវចាត់វិធានការបន្ទាន់' }
];

const WEEKLY_SALES = [
    { week: 'សប្តាហ៍ទី 1', actual: 4200 },
    { week: 'សប្តាហ៍ទី 2', actual: 6850 },
    { week: 'សប្តាហ៍ទី 3', actual: 5400 },
    { week: 'សប្តាហ៍ទី 4', actual: 6350 }
];

/* ===== អនុគមន៍ធ្វើទ្រង់ទ្រាយ ===== */

function fmtUSD(amount) {
    return '$' + Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPercent(value, digits = 1) {
    return Number(value).toFixed(digits) + '%';
}

function fmtKhDate(iso) {
    const d = new Date(iso);
    return `${d.getDate()} ${MONTHS_KH[d.getMonth()]} ${d.getFullYear()}`;
}

function fmtKhDateTime(iso) {
    const d = new Date(iso);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${fmtKhDate(iso)} ${hh}:${mm}`;
}

function daysBetween(fromIso, toDate = BMS_TODAY) {
    return Math.round((toDate - new Date(fromIso)) / 86400000);
}

/* ===== អនុគមន៍ស្វែងរក ===== */

function getCustomer(id) {
    return CUSTOMERS.find(c => c.id === id);
}

function getProduct(sku) {
    return PRODUCTS.find(p => p.sku === sku);
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

/* ===== សង្ខេបហិរញ្ញវត្ថុ 5 ដំណាក់កាល (ស្តង់ដារលេខ 13) =====
   សរុបរង → ចូលរួមមុន → បញ្ចុះតម្លៃពិសេស → អតប 10% → សរុបចុងក្រោយ */
function docTotals(doc) {
    const subtotal = doc.items.reduce((sum, it) => sum + (it.qty * it.price), 0);
    const discountAmount = subtotal * ((doc.discountPercent || 0) / 100);
    const taxBase = subtotal - discountAmount;
    const vatAmount = taxBase * 0.10;
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

function getQuote(id) {
    return QUOTES.find(q => q.id === id);
}

function getInvoice(id) {
    return INVOICES.find(i => i.id === id);
}

/* ===== ស្ថានភាពសម្រង់តម្លៃ ===== */

const QUOTE_STATUS = {
    draft: { label: 'សេចក្តីព្រាង', tone: 'bg-slate-100 text-slate-600 border-slate-200' },
    pending_approval: { label: 'រង់ចាំការអនុម័ត', tone: 'bg-amber-50 text-amber-700 border-amber-200' },
    approved: { label: 'បានអនុម័ត', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    rejected: { label: 'បានបដិសេធ', tone: 'bg-rose-50 text-rose-700 border-rose-200' },
    converted: { label: 'បានបម្លែងជាវិក្កយបត្រ', tone: 'bg-blue-50 text-blue-700 border-blue-200' },
    expired: { label: 'ផុតសុពលភាព', tone: 'bg-slate-100 text-slate-500 border-slate-200' }
};

/* សុពលភាពនៅសល់របស់សម្រង់តម្លៃ */
function quoteExpiry(quote) {
    const left = -daysBetween(quote.validUntil);
    if (quote.status === 'converted') return { days: left, label: 'បានបម្លែងរួច', tone: 'text-slate-500' };
    if (left < 0) return { days: left, label: `ផុតសុពលភាព ${Math.abs(left)} ថ្ងៃមុន`, tone: 'text-rose-600 font-semibold' };
    if (left === 0) return { days: left, label: 'ផុតសុពលភាពថ្ងៃនេះ', tone: 'text-rose-600 font-semibold' };
    if (left <= 3) return { days: left, label: `នៅសល់ ${left} ថ្ងៃ`, tone: 'text-amber-600 font-semibold' };
    return { days: left, label: `នៅសល់ ${left} ថ្ងៃ`, tone: 'text-slate-500' };
}

/* ===== ស្ថានភាពការទូទាត់វិក្កយបត្រ ===== */

function invoiceState(inv) {
    const totals = docTotals(inv);
    // ការបង់លើសមិនត្រូវបង្ហាញជាលេខអវិជ្ជមានទេ
    const due = Math.max(totals.grandTotal - inv.paid, 0);
    const overdueDays = daysBetween(inv.dueDate);

    let key;
    if (due <= 0.005) key = 'paid';
    else if (overdueDays > 0) key = 'overdue';
    else if (inv.paid > 0) key = 'partial';
    else key = 'unpaid';

    const meta = {
        paid: { label: 'បានទូទាត់ពេញ', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        partial: { label: 'ទូទាត់មួយផ្នែក', tone: 'bg-blue-50 text-blue-700 border-blue-200' },
        unpaid: { label: 'មិនទាន់ទូទាត់', tone: 'bg-slate-100 text-slate-600 border-slate-200' },
        overdue: { label: 'ហួសកាលកំណត់', tone: 'bg-rose-50 text-rose-700 border-rose-200' }
    }[key];

    return { key, due, overdueDays, totals, ...meta };
}

/* ===== តម្រងកាលបរិច្ឆេទ ===== */

function inRange(iso, range) {
    if (!range || !range.start || !range.end) return true;
    const d = new Date(iso); d.setHours(0, 0, 0, 0);
    const s = new Date(range.start); s.setHours(0, 0, 0, 0);
    const e = new Date(range.end); e.setHours(23, 59, 59, 999);
    return d >= s && d <= e;
}

/* ===== សូចនាករផ្ទាល់ខ្លួន ===== */

function myMetrics(range) {
    const invs = INVOICES.filter(i => inRange(i.date, range));
    const revenue = invs.reduce((sum, i) => sum + docTotals(i).grandTotal, 0);
    const collected = invs.reduce((sum, i) => sum + i.paid, 0);
    const receivable = invs.reduce((sum, i) => sum + invoiceState(i).due, 0);

    const overdue = INVOICES.filter(i => invoiceState(i).key === 'overdue');
    const overdueAmount = overdue.reduce((sum, i) => sum + invoiceState(i).due, 0);

    const qs = QUOTES.filter(q => inRange(q.date, range));
    const converted = qs.filter(q => q.status === 'converted').length;

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
        pendingCount: QUOTES.filter(q => q.status === 'pending_approval').length,
        target: CURRENT_REP.monthlyTarget,
        quotaPercent: CURRENT_REP.monthlyTarget ? (revenue / CURRENT_REP.monthlyTarget) * 100 : 0,
        commission: collected * (CURRENT_REP.commissionRate / 100)
    };
}

/* ការរំលឹកតាមដាន — តម្រៀបតាមភាពបន្ទាន់ */
function followUps() {
    return FOLLOW_UPS.map(f => {
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
    return QUOTES.filter(q => q.status === 'pending_approval').length;
}

function totalAlerts() {
    return INVOICES.filter(i => invoiceState(i).key === 'overdue').length;
}

/* ===== ឯកសារថ្មីដែលបង្កើតក្នុងវេនបច្ចុប្បន្ន ===== */

const DRAFT_KEY = 'se_new_docs';

function loadNewDocs() {
    try {
        return JSON.parse(sessionStorage.getItem(DRAFT_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function saveNewDoc(doc) {
    const all = loadNewDocs();
    all.push(doc);
    try {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(all));
    } catch (e) {
        // វេនឯកជន ឬការផ្ទុកត្រូវបានបិទ — ឯកសារនៅរស់ត្រឹមទំព័របច្ចុប្បន្ន
    }
}

function nextDocNumber(prefix) {
    const pool = prefix === 'QT' ? QUOTES : INVOICES;
    const created = loadNewDocs().filter(d => d.id.startsWith(prefix));
    const maxExisting = pool.reduce((max, d) => {
        const n = parseInt(d.id.split('-').pop(), 10);
        return n > max ? n : max;
    }, 0);
    const maxCreated = created.reduce((max, d) => {
        const n = parseInt(d.id.split('-').pop(), 10);
        return n > max ? n : max;
    }, 0);
    const next = Math.max(maxExisting, maxCreated) + 1;
    return `${prefix}-2026-${String(next).padStart(4, '0')}`;
}

/* ===== កូដ KHQR បាគង (គំរូសាកល្បង) =====
   បង្កើតខ្លឹមសារ QR ថាមវន្តតាមទឹកប្រាក់នៃវិក្កយបត្រនីមួយៗ។
   នេះជាទម្រង់គំរូសម្រាប់ការបង្ហាញប៉ុណ្ណោះ មិនមែនជាកូដដែលចេញដោយធនាគារទេ។ */
const MERCHANT = {
    name: 'DIGITECHKH CO LTD',
    account: 'digitechkh@aclb',
    city: 'PHNOM PENH',
    tin: 'K001-901234567'
};

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

function portalNotifications() {
    const list = [];

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
    QUOTES.filter(q => ['pending_approval', 'approved'].includes(q.status))
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
                time: fmtKhDate(x.q.validUntil)
            });
        });

    // វិក្កយបត្រហួសកាលកំណត់ទូទាត់របស់ខ្ញុំ
    const overdue = INVOICES.map(i => ({ i, s: invoiceState(i) }))
        .filter(x => x.s.key === 'overdue')
        .sort((a, b) => b.s.overdueDays - a.s.overdueDays);
    if (overdue.length) {
        const total = overdue.reduce((sum, x) => sum + x.s.due, 0);
        const c = getCustomer(overdue[0].i.customerId);
        list.push({
            icon: 'mdi:cash-clock',
            tone: 'danger',
            title: `វិក្កយបត្រហួសកាលកំណត់ ${overdue.length} ច្បាប់`,
            note: `សរុប ${fmtUSD(total)} · យឺតបំផុត ${c ? c.name : ''} ${overdue[0].s.overdueDays} ថ្ងៃ`
        });
    }

    // ព្រំដែនបញ្ចុះតម្លៃដោយខ្លួនឯង
    const needApproval = QUOTES.filter(q => q.status === 'pending_approval');
    if (needApproval.length) {
        list.push({
            icon: 'mdi:shield-check-outline',
            tone: 'info',
            title: `សម្រង់តម្លៃ ${needApproval.length} រង់ចាំប្រធានផ្នែកលក់អនុម័ត`,
            note: `ការបញ្ចុះតម្លៃលើសពី ${fmtPercent(DISCOUNT_SELF_LIMIT)} ត្រូវការការអនុម័ត`
        });
    }

    return list;
}
