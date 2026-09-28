/* ច្រកគ្រប់គ្រងផ្នែកលក់ — ឃ្លាំងទិន្នន័យសាកល្បងរួម
   គ្រប់ទំព័រទាំងអស់អានទិន្នន័យពីឯកសារនេះតែមួយគត់ ដូច្នេះលេខនៅលើផ្ទាំងគ្រប់គ្រង
   បញ្ជីអនុម័ត និងរបាយការណ៍ ស៊ីសង្វាក់គ្នាជានិច្ច។
   ការសម្រេច (អនុម័ត/បដិសេធ/បញ្ជូនបន្ត) ត្រូវរក្សាទុកក្នុង sessionStorage
   ដូច្នេះនៅពេលប្តូរទំព័រ ចំនួនសំណើនៅតែត្រឹមត្រូវ។ */

const BMS_TODAY = new Date(2026, 8, 3);

const MONTHS_KH = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];

const TIER_LABEL = {
    retail: 'អតិថិជនរាយ',
    wholesale: 'អតិថិជនដុំ',
    dealer: 'តំណាងចែកចាយ'
};

const SALES_REPS = [
    { id: 'u-heng', name: 'ហេង វិច្ឆិកា', initials: 'ហវ', target: 27000, commission: 2.5 },
    { id: 'u-sao', name: 'សៅ សុខា', initials: 'សស', target: 26000, commission: 2.0 },
    { id: 'u-chan', name: 'ចាន់ ធីតា', initials: 'ចធ', target: 22000, commission: 2.0 }
];

const CUSTOMERS = [
    { id: 'c-rasmey', name: 'ក្រុមហ៊ុន រស្មី អភិវឌ្ឍន៍', tier: 'wholesale', contact: 'លោក គង់ សំណាង', phone: '012 888 777', creditLimit: 10000, oldDebt: 1850, repId: 'u-sao' },
    { id: 'c-hotel', name: 'សណ្ឋាគារ ភ្នំពេញ ហ្គ្រេន', tier: 'dealer', contact: 'លោកស្រី ម៉ៅ សុភា', phone: '011 456 789', creditLimit: 25000, oldDebt: 4200, repId: 'u-heng' },
    { id: 'c-nimit', name: 'ក្រុមហ៊ុន និម្មិត អគារ', tier: 'wholesale', contact: 'លោក ផាន់ រតនៈ', phone: '017 222 333', creditLimit: 15000, oldDebt: 0, repId: 'u-chan' },
    { id: 'c-treyluk', name: 'ក្រុមហ៊ុន ត្រីល័ក្ខ', tier: 'retail', contact: 'លោក សំ បូរ៉ា', phone: '010 654 321', creditLimit: 3000, oldDebt: 640, repId: 'u-sao' },
    { id: 'c-domrey', name: 'ហាងទឹកដម្រី សុវណ្ណា', tier: 'wholesale', contact: 'លោកស្រី សុវណ្ណា', phone: '093 111 222', creditLimit: 2000, oldDebt: 1620, repId: 'u-heng' },
    { id: 'c-school', name: 'សាលារៀន អន្តរជាតិ អាស៊ី', tier: 'wholesale', contact: 'លោក ជា វិសាល', phone: '096 777 888', creditLimit: 12000, oldDebt: 3150, repId: 'u-chan' }
];

const CATEGORIES = {
    computer: 'កុំព្យូទ័រ',
    monitor: 'អេក្រង់',
    printer: 'ម៉ាស៊ីនបោះពុម្ព',
    accessory: 'គ្រឿងបន្លាស់',
    furniture: 'គ្រឿងសង្ហារិម'
};

const PRODUCTS = {
    'DEL-OPT-7010': { name: 'កុំព្យូទ័រ Dell OptiPlex 7010', unit: 'ឈុត', category: 'computer', retail: 720, wholesale: 650, dealer: 610 },
    'MON-DEL-24': { name: 'អេក្រង់ Dell 24 អ៊ីញ S2421HN', unit: 'គ្រឿង', category: 'monitor', retail: 165, wholesale: 140, dealer: 132 },
    'PRN-CAN-2900': { name: 'ម៉ាស៊ីនព្រីន Canon Laser LBP2900', unit: 'គ្រឿង', category: 'printer', retail: 185, wholesale: 160, dealer: 152 },
    'KEY-KEY-K8': { name: 'ក្តារចុចមេកានិច Keychron K8', unit: 'គ្រឿង', category: 'accessory', retail: 95, wholesale: 82, dealer: 76 },
    'CHR-ERG-01': { name: 'កៅអីការិយាល័យ Ergonomic', unit: 'គ្រឿង', category: 'furniture', retail: 240, wholesale: 210, dealer: 198 }
};

/* បំពង់លំហូរការលក់ — ដំណាក់កាល: lead, qualified, proposal, won, lost */
const PIPELINE_STAGES = [
    { id: 'lead', label: 'អតិថិជនសក្តានុពល', tone: 'slate', accent: '#94a3b8' },
    { id: 'qualified', label: 'បានផ្ទៀងផ្ទាត់', tone: 'sky', accent: '#0ea5e9' },
    { id: 'proposal', label: 'បានដាក់សម្រង់តម្លៃ', tone: 'amber', accent: '#f59e0b' },
    { id: 'won', label: 'បិទការលក់ជោគជ័យ', tone: 'emerald', accent: '#10b981' },
    { id: 'lost', label: 'បាត់បង់ឱកាស', tone: 'rose', accent: '#f43f5e' }
];

const PIPELINE_DEALS = [
    { id: 'OPP-2026-0201', customerId: 'c-rasmey', repId: 'u-sao', stage: 'lead', value: 5200, category: 'computer', date: '2026-09-19', note: 'សាកសួរតម្លៃកុំព្យូទ័រការិយាល័យ 8 ឈុត' },
    { id: 'OPP-2026-0202', customerId: 'c-school', repId: 'u-chan', stage: 'lead', value: 8600, category: 'monitor', date: '2026-09-18', note: 'គម្រោងដំឡើងបន្ទប់កុំព្យូទ័រថ្មី' },
    { id: 'OPP-2026-0203', customerId: 'c-treyluk', repId: 'u-sao', stage: 'lead', value: 1850, category: 'accessory', date: '2026-09-17', note: 'ត្រូវការគ្រឿងបន្លាស់បន្ថែម' },
    { id: 'OPP-2026-0210', customerId: 'c-hotel', repId: 'u-heng', stage: 'qualified', value: 14200, category: 'furniture', date: '2026-09-16', note: 'បានបញ្ជាក់ថវិកា និងកាលបរិច្ឆេទដឹកជញ្ជូន' },
    { id: 'OPP-2026-0211', customerId: 'c-nimit', repId: 'u-chan', stage: 'qualified', value: 9400, category: 'computer', date: '2026-09-15', note: 'រង់ចាំការអនុម័តថវិកាពីនាយក' },
    { id: 'OPP-2026-0212', customerId: 'c-domrey', repId: 'u-heng', stage: 'qualified', value: 3600, category: 'printer', date: '2026-09-14', note: 'ប្តូរម៉ាស៊ីនបោះពុម្ពចាស់ទាំងអស់' },
    { id: 'OPP-2026-0220', customerId: 'c-rasmey', repId: 'u-sao', stage: 'proposal', value: 4483, category: 'computer', date: '2026-09-17', quoteId: 'QT-2026-0089', note: 'សម្រង់តម្លៃរង់ចាំការអនុម័តបញ្ចុះតម្លៃ 8.0%' },
    { id: 'OPP-2026-0221', customerId: 'c-hotel', repId: 'u-heng', stage: 'proposal', value: 6155, category: 'furniture', date: '2026-09-17', quoteId: 'QT-2026-0091', note: 'សម្រង់តម្លៃរង់ចាំការអនុម័តបញ្ចុះតម្លៃ 12.0%' },
    { id: 'OPP-2026-0222', customerId: 'c-nimit', repId: 'u-chan', stage: 'proposal', value: 11356, category: 'computer', date: '2026-09-16', quoteId: 'QT-2026-0094', note: 'បញ្ចុះតម្លៃ 18.0% ត្រូវបញ្ជូនទៅអភិបាលទូទៅ' },
    { id: 'OPP-2026-0230', customerId: 'c-hotel', repId: 'u-heng', stage: 'won', value: 8450, category: 'furniture', date: '2026-09-18', note: 'បានចេញវិក្កយបត្រ INV-2026-0122' },
    { id: 'OPP-2026-0231', customerId: 'c-rasmey', repId: 'u-sao', stage: 'won', value: 9860, category: 'computer', date: '2026-09-19', note: 'បានចេញវិក្កយបត្រ INV-2026-0124' },
    { id: 'OPP-2026-0232', customerId: 'c-nimit', repId: 'u-chan', stage: 'won', value: 6780, category: 'computer', date: '2026-09-17', note: 'បានចេញវិក្កយបត្រ INV-2026-0121' },
    { id: 'OPP-2026-0233', customerId: 'c-treyluk', repId: 'u-sao', stage: 'won', value: 5420, category: 'furniture', date: '2026-09-14', note: 'បានចេញវិក្កយបត្រ INV-2026-0116' },
    { id: 'OPP-2026-0240', customerId: 'c-school', repId: 'u-chan', stage: 'lost', value: 7300, category: 'computer', date: '2026-09-10', note: 'អតិថិជនជ្រើសរើសដៃគូប្រកួតប្រជែង ដោយសារតម្លៃទាបជាង' },
    { id: 'OPP-2026-0241', customerId: 'c-domrey', repId: 'u-heng', stage: 'lost', value: 2400, category: 'accessory', date: '2026-09-08', note: 'អតិថិជនពន្យារគម្រោងទៅឆ្នាំក្រោយ' }
];

/* សម្រង់តម្លៃ — ស្ថានភាព: draft, pending_approval, approved, rejected, converted, expired */
const QUOTES = [
    {
        id: 'QT-2026-0089', customerId: 'c-rasmey', repId: 'u-sao', date: '2026-09-17T11:30',
        status: 'pending_approval', discountPercent: 8.0, downPayment: 0, validUntil: '2026-09-24',
        items: [
            { sku: 'DEL-OPT-7010', qty: 5, price: 650 },
            { sku: 'MON-DEL-24', qty: 5, price: 140 },
            { sku: 'PRN-CAN-2900', qty: 3, price: 160 }
        ]
    },
    {
        id: 'QT-2026-0091', customerId: 'c-hotel', repId: 'u-heng', date: '2026-09-17T10:15',
        status: 'pending_approval', discountPercent: 12.0, downPayment: 1000, validUntil: '2026-09-27',
        items: [
            { sku: 'CHR-ERG-01', qty: 24, price: 198 },
            { sku: 'MON-DEL-24', qty: 20, price: 132 }
        ]
    },
    {
        id: 'QT-2026-0094', customerId: 'c-nimit', repId: 'u-chan', date: '2026-09-16T14:05',
        status: 'pending_approval', discountPercent: 18.0, downPayment: 0, validUntil: '2026-09-30',
        items: [
            { sku: 'DEL-OPT-7010', qty: 12, price: 650 },
            { sku: 'CHR-ERG-01', qty: 15, price: 210 },
            { sku: 'KEY-KEY-K8', qty: 20, price: 82 }
        ]
    },
    { id: 'QT-2026-0082', customerId: 'c-school', repId: 'u-chan', date: '2026-09-12T09:10', status: 'converted', discountPercent: 4.0, downPayment: 0, validUntil: '2026-09-20', items: [{ sku: 'DEL-OPT-7010', qty: 4, price: 650 }, { sku: 'KEY-KEY-K8', qty: 10, price: 82 }] },
    { id: 'QT-2026-0080', customerId: 'c-rasmey', repId: 'u-sao', date: '2026-09-10T15:40', status: 'converted', discountPercent: 2.5, downPayment: 500, validUntil: '2026-09-18', items: [{ sku: 'MON-DEL-24', qty: 12, price: 140 }] },
    { id: 'QT-2026-0078', customerId: 'c-hotel', repId: 'u-heng', date: '2026-09-08T11:05', status: 'converted', discountPercent: 5.0, downPayment: 0, validUntil: '2026-09-16', items: [{ sku: 'CHR-ERG-01', qty: 30, price: 198 }] },
    { id: 'QT-2026-0075', customerId: 'c-domrey', repId: 'u-heng', date: '2026-09-05T14:20', status: 'approved', discountPercent: 6.0, downPayment: 0, validUntil: '2026-09-25', items: [{ sku: 'KEY-KEY-K8', qty: 14, price: 82 }] },
    { id: 'QT-2026-0072', customerId: 'c-treyluk', repId: 'u-sao', date: '2026-09-03T10:00', status: 'draft', discountPercent: 0, downPayment: 0, validUntil: '2026-09-22', items: [{ sku: 'PRN-CAN-2900', qty: 2, price: 185 }] },
    { id: 'QT-2026-0068', customerId: 'c-nimit', repId: 'u-chan', date: '2026-08-28T16:30', status: 'rejected', discountPercent: 22.0, downPayment: 0, validUntil: '2026-09-10', items: [{ sku: 'DEL-OPT-7010', qty: 8, price: 650 }] },
    { id: 'QT-2026-0060', customerId: 'c-school', repId: 'u-chan', date: '2026-08-20T13:15', status: 'expired', discountPercent: 3.0, downPayment: 0, validUntil: '2026-09-01', items: [{ sku: 'MON-DEL-24', qty: 6, price: 140 }] },
    { id: 'QT-2026-0095', customerId: 'c-hotel', repId: 'u-heng', date: '2026-09-18T08:45', status: 'converted', discountPercent: 5.0, downPayment: 0, validUntil: '2026-09-28', items: [{ sku: 'CHR-ERG-01', qty: 40, price: 198 }] },
    { id: 'QT-2026-0088', customerId: 'c-domrey', repId: 'u-heng', date: '2026-09-13T10:30', status: 'converted', discountPercent: 4.0, downPayment: 0, validUntil: '2026-09-23', items: [{ sku: 'DEL-OPT-7010', qty: 9, price: 650 }] },
    { id: 'QT-2026-0096', customerId: 'c-rasmey', repId: 'u-sao', date: '2026-09-19T09:15', status: 'converted', discountPercent: 3.5, downPayment: 0, validUntil: '2026-09-29', items: [{ sku: 'DEL-OPT-7010', qty: 14, price: 650 }] },
    { id: 'QT-2026-0090', customerId: 'c-treyluk', repId: 'u-sao', date: '2026-09-14T13:50', status: 'converted', discountPercent: 2.0, downPayment: 0, validUntil: '2026-09-24', items: [{ sku: 'CHR-ERG-01', qty: 24, price: 210 }] },
    { id: 'QT-2026-0086', customerId: 'c-rasmey', repId: 'u-sao', date: '2026-09-11T15:20', status: 'converted', discountPercent: 4.5, downPayment: 0, validUntil: '2026-09-21', items: [{ sku: 'MON-DEL-24', qty: 30, price: 140 }] },
    { id: 'QT-2026-0093', customerId: 'c-nimit', repId: 'u-chan', date: '2026-09-17T11:00', status: 'converted', discountPercent: 5.0, downPayment: 0, validUntil: '2026-09-27', items: [{ sku: 'DEL-OPT-7010', qty: 10, price: 650 }] },
    { id: 'QT-2026-0087', customerId: 'c-school', repId: 'u-chan', date: '2026-09-12T14:40', status: 'converted', discountPercent: 3.0, downPayment: 0, validUntil: '2026-09-22', items: [{ sku: 'KEY-KEY-K8', qty: 45, price: 82 }] }
];

/* វិក្កយបត្រ — ស្ថានភាព: unpaid, partial, paid, overdue, void */
const INVOICES = [
    { id: 'INV-2026-0102', customerId: 'c-rasmey', repId: 'u-sao', date: '2026-08-01', dueDate: '2026-08-31', total: 4850, paid: 0, status: 'overdue' },
    { id: 'INV-2026-0087', customerId: 'c-domrey', repId: 'u-heng', date: '2026-07-24', dueDate: '2026-07-24', total: 1620, paid: 0, status: 'overdue' },
    { id: 'INV-2026-0071', customerId: 'c-school', repId: 'u-chan', date: '2026-07-13', dueDate: '2026-07-13', total: 3150, paid: 0, status: 'overdue' },
    { id: 'INV-2026-0118', customerId: 'c-hotel', repId: 'u-heng', date: '2026-09-15', dueDate: '2026-10-15', total: 7920, paid: 4000, status: 'partial' },
    { id: 'INV-2026-0120', customerId: 'c-nimit', repId: 'u-chan', date: '2026-09-16', dueDate: '2026-10-16', total: 2860, paid: 0, status: 'unpaid' },
    { id: 'INV-2026-0112', customerId: 'c-school', repId: 'u-chan', date: '2026-09-12', dueDate: '2026-10-12', total: 3420, paid: 3420, status: 'paid' },
    { id: 'INV-2026-0109', customerId: 'c-rasmey', repId: 'u-sao', date: '2026-09-10', dueDate: '2026-10-10', total: 1680, paid: 1680, status: 'paid' },
    { id: 'INV-2026-0105', customerId: 'c-hotel', repId: 'u-heng', date: '2026-09-08', dueDate: '2026-10-08', total: 5940, paid: 5940, status: 'paid' },
    { id: 'INV-2026-0076', customerId: 'c-treyluk', repId: 'u-sao', date: '2026-09-02', dueDate: '2026-10-02', total: 1240, paid: 0, status: 'unpaid' },
    { id: 'INV-2026-0122', customerId: 'c-hotel', repId: 'u-heng', date: '2026-09-18', dueDate: '2026-10-18', total: 8450, paid: 8450, status: 'paid' },
    { id: 'INV-2026-0115', customerId: 'c-domrey', repId: 'u-heng', date: '2026-09-13', dueDate: '2026-10-13', total: 6140, paid: 3000, status: 'partial' },
    { id: 'INV-2026-0124', customerId: 'c-rasmey', repId: 'u-sao', date: '2026-09-19', dueDate: '2026-10-19', total: 9860, paid: 9860, status: 'paid' },
    { id: 'INV-2026-0116', customerId: 'c-treyluk', repId: 'u-sao', date: '2026-09-14', dueDate: '2026-10-14', total: 5420, paid: 5420, status: 'paid' },
    { id: 'INV-2026-0110', customerId: 'c-rasmey', repId: 'u-sao', date: '2026-09-11', dueDate: '2026-10-11', total: 4600, paid: 0, status: 'unpaid' },
    { id: 'INV-2026-0121', customerId: 'c-nimit', repId: 'u-chan', date: '2026-09-17', dueDate: '2026-10-17', total: 6780, paid: 6780, status: 'paid' },
    { id: 'INV-2026-0113', customerId: 'c-school', repId: 'u-chan', date: '2026-09-12', dueDate: '2026-10-12', total: 4140, paid: 2000, status: 'partial' }
];

/* សំណើផ្សេងទៀតដែលរង់ចាំការសម្រេចពីអ្នកគ្រប់គ្រងផ្នែកលក់ */
const VOID_REQUESTS = [
    {
        id: 'INV-2026-0076', customerId: 'c-treyluk', repId: 'u-sao', date: '2026-09-16T09:20',
        amount: 1240, stockReleased: false, reason: 'អតិថិជនប្តូរចិត្ត មិនទិញទំនិញនេះទៀត'
    }
];

const CREDIT_REQUESTS = [
    {
        id: 'CR-2026-0011', customerId: 'c-domrey', repId: 'u-heng', date: '2026-09-15T16:40',
        currentLimit: 2000, requestedLimit: 3500, reason: 'អតិថិជនសន្យាទូទាត់បំណុលចាស់ក្នុងខែក្រោយ'
    }
];

const MONTHLY_REVENUE = [
    { month: 'តុលា', actual: 45000, target: 50000 },
    { month: 'វិច្ឆិកា', actual: 52000, target: 50000 },
    { month: 'ធ្នូ', actual: 61000, target: 55000 },
    { month: 'មករា', actual: 58000, target: 60000 },
    { month: 'កុម្ភៈ', actual: 62000, target: 65000 },
    { month: 'មីនា', actual: 68450, target: 75000 }
];

const WEEKLY_REVENUE = [
    { week: 'សប្តាហ៍ទី 1', actual: 14200 },
    { week: 'សប្តាហ៍ទី 2', actual: 18500 },
    { week: 'សប្តាហ៍ទី 3', actual: 16400 },
    { week: 'សប្តាហ៍ទី 4', actual: 19350 }
];

/* ===== អនុគមន៍ជំនួយ ===== */

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
    const from = new Date(fromIso);
    return Math.round((toDate - from) / 86400000);
}

function getCustomer(id) {
    return CUSTOMERS.find(c => c.id === id);
}

function getRep(id) {
    return SALES_REPS.find(r => r.id === id);
}

function tierLabel(tier) {
    return TIER_LABEL[tier] || tier;
}

/* សង្ខេបហិរញ្ញវត្ថុ 5 ដំណាក់កាល (ស្តង់ដារលេខ 13) */
function quoteTotals(quote) {
    const subtotal = quote.items.reduce((sum, it) => sum + (it.qty * it.price), 0);
    const discountAmount = subtotal * (quote.discountPercent / 100);
    const taxBase = subtotal - discountAmount;
    const vatAmount = taxBase * 0.10;
    const grandTotal = taxBase + vatAmount - quote.downPayment;
    return {
        subtotal,
        downPayment: quote.downPayment,
        discountPercent: quote.discountPercent,
        discountAmount,
        taxBase,
        vatAmount,
        grandTotal
    };
}

function getQuote(id) {
    return QUOTES.find(q => q.id === id);
}

/* ===== ការសម្រេចដែលបានរក្សាទុកក្នុងវេនបច្ចុប្បន្ន ===== */

const DECISION_KEY = 'sm_decisions';

function loadDecisions() {
    try {
        return JSON.parse(sessionStorage.getItem(DECISION_KEY)) || {};
    } catch (e) {
        return {};
    }
}

function saveDecision(id, action) {
    const all = loadDecisions();
    all[id] = action;
    try {
        sessionStorage.setItem(DECISION_KEY, JSON.stringify(all));
    } catch (e) {
        // វេនឯកជន ឬការផ្ទុកត្រូវបានបិទ — ការសម្រេចនៅរស់ត្រឹមទំព័របច្ចុប្បន្ន
    }
}

function isDecided(id) {
    return Boolean(loadDecisions()[id]);
}

/* ===== សំណើរង់ចាំការអនុម័ត ===== */

function pendingQuotes() {
    return QUOTES.filter(q => q.status === 'pending_approval' && !isDecided(q.id));
}

function pendingVoids() {
    return VOID_REQUESTS.filter(v => !isDecided(v.id));
}

function pendingCredits() {
    return CREDIT_REQUESTS.filter(c => !isDecided(c.id));
}

function totalPending() {
    return pendingQuotes().length + pendingVoids().length + pendingCredits().length;
}

/* ===== សូចនាករផ្ទាំងគ្រប់គ្រង ===== */

function inRange(iso, range) {
    if (!range || !range.start || !range.end) return true;
    const d = new Date(iso);
    d.setHours(0, 0, 0, 0);
    const s = new Date(range.start); s.setHours(0, 0, 0, 0);
    const e = new Date(range.end); e.setHours(23, 59, 59, 999);
    return d >= s && d <= e;
}

function invoicesInRange(range) {
    return INVOICES.filter(inv => inv.status !== 'void' && inRange(inv.date, range));
}

function quotesInRange(range) {
    return QUOTES.filter(q => inRange(q.date, range));
}

function dashboardMetrics(range) {
    const invs = invoicesInRange(range);
    const revenue = invs.reduce((sum, i) => sum + i.total, 0);
    const collected = invs.reduce((sum, i) => sum + i.paid, 0);
    const receivable = invs.reduce((sum, i) => sum + (i.total - i.paid), 0);

    const overdue = INVOICES.filter(i => i.status === 'overdue');
    const overdueAmount = overdue.reduce((sum, i) => sum + (i.total - i.paid), 0);

    const qs = quotesInRange(range);
    const converted = qs.filter(q => q.status === 'converted').length;
    const winRate = qs.length ? (converted / qs.length) * 100 : 0;

    const totalTarget = SALES_REPS.reduce((sum, r) => sum + r.target, 0);

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
    return SALES_REPS.map(rep => {
        const mine = invs.filter(i => i.repId === rep.id);
        const revenue = mine.reduce((sum, i) => sum + i.total, 0);
        const collected = mine.reduce((sum, i) => sum + i.paid, 0);
        const myQuotes = quotesInRange(range).filter(q => q.repId === rep.id);
        const myConverted = myQuotes.filter(q => q.status === 'converted').length;
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
    return [
        { name: 'សេចក្តីព្រាង', value: qs.length, color: '#94a3b8' },
        { name: 'រង់ចាំអនុម័ត', value: qs.length - count('draft'), color: '#f59e0b' },
        { name: 'បានអនុម័ត', value: count('approved') + count('converted'), color: '#0ea5e9' },
        { name: 'បានចេញវិក្កយបត្រ', value: count('converted'), color: '#2563eb' },
        { name: 'បានទូទាត់', value: INVOICES.filter(i => i.status === 'paid' && inRange(i.date, range)).length, color: '#1e3a5f' }
    ];
}

/* ===== បំពង់លំហូរការលក់ (Kanban) ===== */

const PIPELINE_KEY = 'sm_pipeline_moves';

function loadPipelineMoves() {
    try {
        return JSON.parse(sessionStorage.getItem(PIPELINE_KEY)) || {};
    } catch (e) {
        return {};
    }
}

function savePipelineMove(dealId, stage) {
    const all = loadPipelineMoves();
    all[dealId] = stage;
    try {
        sessionStorage.setItem(PIPELINE_KEY, JSON.stringify(all));
    } catch (e) {
        // វេនឯកជន ឬការផ្ទុកត្រូវបានបិទ — ការផ្លាស់ទីនៅរស់ត្រឹមទំព័របច្ចុប្បន្ន
    }
}

function dealStage(deal) {
    return loadPipelineMoves()[deal.id] || deal.stage;
}

function dealsByStage(filters) {
    const f = filters || {};
    const result = {};
    PIPELINE_STAGES.forEach(s => { result[s.id] = []; });

    PIPELINE_DEALS
        .filter(d => !f.repId || d.repId === f.repId)
        .filter(d => !f.category || d.category === f.category)
        .filter(d => inRange(d.date, f.range))
        .forEach(d => result[dealStage(d)].push(d));

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

    QUOTES
        .filter(q => q.status === 'converted')
        .filter(q => !f.repId || q.repId === f.repId)
        .filter(q => inRange(q.date, f.range))
        .forEach(q => {
            const seen = new Set();
            q.items.forEach(it => {
                const cat = PRODUCTS[it.sku].category;
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
    const converted = quotesInRange(range).filter(q => q.status === 'converted');

    const revenue = invs.reduce((sum, i) => sum + i.total, 0);
    const avgDealSize = invs.length ? revenue / invs.length : 0;

    // រយៈពេលជាមធ្យមពីថ្ងៃចេញសម្រង់តម្លៃ រហូតដល់ថ្ងៃផុតសុពលភាព ជាការប៉ាន់ស្មានវដ្តបិទការលក់
    const cycleDays = converted.length
        ? converted.reduce((sum, q) => sum + Math.max(daysBetween(q.date, new Date(q.validUntil)), 0), 0) / converted.length
        : 0;

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
        { label: 'សេចក្តីព្រាង', value: count('draft'), color: 'text-slate-600' },
        { label: 'រង់ចាំការអនុម័ត', value: pendingQuotes().length, color: 'text-amber-600' },
        { label: 'បានអនុម័ត មិនទាន់បម្លែង', value: count('approved'), color: 'text-blue-600' },
        { label: 'បានបម្លែងជាវិក្កយបត្រ', value: count('converted'), color: 'text-emerald-600' },
        { label: 'បានបដិសេធ', value: count('rejected'), color: 'text-rose-600' },
        { label: 'ផុតសុពលភាព', value: count('expired'), color: 'text-slate-500' }
    ];
}

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

function portalNotifications() {
    const list = [];

    pendingQuotes().slice(0, 3).forEach(q => {
        const c = getCustomer(q.customerId);
        const rep = getRep(q.repId);
        list.push({
            icon: 'mdi:file-percent-outline',
            tone: q.discountPercent >= 10 ? 'danger' : 'warning',
            title: `សម្រង់តម្លៃ ${q.id} រង់ចាំអនុម័ត`,
            note: `${c ? c.name : ''} · បញ្ចុះតម្លៃ ${fmtPercent(q.discountPercent)} · ${fmtUSD(quoteTotals(q).grandTotal)} · ${rep ? rep.name : ''}`,
            time: fmtKhDate(q.date)
        });
    });

    pendingVoids().forEach(v => {
        const c = getCustomer(v.customerId);
        list.push({
            icon: 'mdi:file-remove-outline',
            tone: 'danger',
            title: `សំណើលុបចោលវិក្កយបត្រ ${v.id}`,
            note: `${c ? c.name : ''} · ${fmtUSD(v.amount)} · ${v.stockReleased ? 'ទំនិញចេញពីឃ្លាំងរួច' : 'ទំនិញមិនទាន់ចេញ'}`,
            time: fmtKhDate(v.date)
        });
    });

    pendingCredits().forEach(c => {
        const cust = getCustomer(c.customerId);
        list.push({
            icon: 'mdi:credit-card-clock-outline',
            tone: 'warning',
            title: `សំណើបង្កើនឥណទាន ${c.id}`,
            note: `${cust ? cust.name : ''} · ${fmtUSD(c.currentLimit)} → ${fmtUSD(c.requestedLimit)}`,
            time: fmtKhDate(c.date)
        });
    });

    // វិក្កយបត្រហួសកាលកំណត់ទូទាត់
    const overdue = INVOICES.filter(i => i.status === 'overdue');
    if (overdue.length) {
        const amount = overdue.reduce((sum, i) => sum + Math.max(i.total - i.paid, 0), 0);
        const worst = overdue.slice().sort((a, b) => daysBetween(b.dueDate) - daysBetween(a.dueDate))[0];
        list.push({
            icon: 'mdi:cash-clock',
            tone: 'danger',
            title: `វិក្កយបត្រហួសកាលកំណត់ ${overdue.length} ច្បាប់`,
            note: `សរុបត្រូវទារ ${fmtUSD(amount)} · យឺតបំផុត ${worst.id} ${daysBetween(worst.dueDate)} ថ្ងៃ`
        });
    }

    // ឱកាសលក់ដែលនៅដំណាក់កាលចរចាយូរថ្ងៃ
    const stuck = PIPELINE_DEALS
        .filter(d => dealStage(d) === 'negotiation' && daysBetween(d.date) >= 7)
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
