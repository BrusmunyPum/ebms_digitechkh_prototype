/**
 * ច្រកអតិថិជន — ទិន្នន័យគំរូ និងម៉ាស៊ីនគណនា (Customer Self-Service Portal Data)
 * Data Scope: អតិថិជនម្នាក់ៗឃើញតែវិក្កយបត្រ និងការបញ្ជាទិញផ្ទាល់ខ្លួនរបស់ខ្លួនប៉ុណ្ណោះ។
 */

const CUSTOMER_PORTAL_STORAGE_KEY = 'digitechkh_bms_customer_portal_data';

const DEFAULT_CUSTOMER_PORTAL_DATA = {
    customerProfile: {
        id: 'CUST-0042',
        companyName: 'ក្រុមហ៊ុន សុខុម ត្រេឌីង ឯ.ក',
        contactName: 'លោក សុខ ជា',
        phone: '012 888 777',
        email: 'sokchea@sokhumtrading.com',
        tin: 'K009-902201994',
        address: 'ផ្ទះលេខ 45 ផ្លូវ 310 សង្កាត់បឹងកេងកង 1 ខណ្ឌបឹងកេងកង រាជធានីភ្នំពេញ',
        tier: 'VIP',
        accountManager: 'ហេង វិច្ឆិកា (អ្នកគ្រប់គ្រងគណនី)'
    },
    // បញ្ជីវិក្កយបត្រចេញឱ្យអតិថិជននេះ
    invoices: [
        {
            id: 'INV-2026-0108',
            date: '2026-09-20',
            dueDate: '2026-09-27',
            description: 'កុំព្យូទ័រយួរដៃ Dell XPS 15 និងអេក្រង់ Dell UltraSharp',
            paymentTerm: '7 ថ្ងៃ (Net 7)',
            items: [
                { name: 'Dell XPS 15 9530 (i7-13700H / 32GB / 1TB SSD / RTX 4060)', note: 'ការធានាផ្លូវការ 2 ឆ្នាំ', qty: 4, unit: 'គ្រឿង', unitPrice: 1800.00 },
                { name: 'Dell UltraSharp 27" 4K Monitor (U2723QE)', note: 'IPS Black, Type-C Hub', qty: 2, unit: 'គ្រឿង', unitPrice: 500.00 }
            ],
            downPayment: 0,
            specialDiscount: 0,
            vatRate: 0,
            paidAmount: 0,
            status: 'unpaid' // paid, partial, unpaid, overdue
        },
        {
            id: 'INV-2026-0107',
            date: '2026-09-15',
            dueDate: '2026-09-22',
            description: 'ម៉ាស៊ីនព្រីនធ័រការិយាល័យ និងសម្ភារៈបន្ថែម',
            paymentTerm: '7 ថ្ងៃ (Net 7)',
            items: [
                { name: 'HP LaserJet Pro MFP 4303fdw', note: 'ការធានាផ្លូវការ 1 ឆ្នាំ', qty: 3, unit: 'គ្រឿង', unitPrice: 650.00 },
                { name: 'ទឹកខ្មៅព្រីនធ័រ HP 58A (ប្រអប់)', note: '', qty: 12, unit: 'ប្រអប់', unitPrice: 275.00 / 4 }
            ],
            downPayment: 500.00,
            specialDiscount: 50.00,
            vatRate: 10,
            paidAmount: 2000.00,
            status: 'overdue'
        },
        {
            id: 'INV-2026-0104',
            date: '2026-09-05',
            dueDate: '2026-09-12',
            description: 'គ្រឿងបន្លាស់បណ្តាញ និងឧបករណ៍ភ្ជាប់',
            paymentTerm: 'សាច់ប្រាក់ភ្លាមៗ (COD)',
            items: [
                { name: 'TP-Link Omada ER8411 Router', note: '', qty: 1, unit: 'គ្រឿង', unitPrice: 2100.00 },
                { name: 'ខ្សែបណ្តាញ Cat6 (រមូរ 305m)', note: '', qty: 3, unit: 'រមូរ', unitPrice: 350.00 }
            ],
            downPayment: 0,
            specialDiscount: 0,
            vatRate: 10,
            paidAmount: 3150.00,
            status: 'paid'
        },
        {
            id: 'INV-2026-0098',
            date: '2026-08-20',
            dueDate: '2026-08-27',
            description: 'ម៉ាស៊ីនមេ Server និងឧបករណ៍ផ្ទុកទិន្នន័យ',
            paymentTerm: '7 ថ្ងៃ (Net 7)',
            items: [
                { name: 'Dell PowerEdge R760 Rack Server', note: 'Xeon Silver 4410Y, 64GB RAM', qty: 1, unit: 'គ្រឿង', unitPrice: 11200.00 },
                { name: 'Dell PowerVault ME5024 Storage', note: '', qty: 1, unit: 'គ្រឿង', unitPrice: 1200.00 }
            ],
            downPayment: 0,
            specialDiscount: 0,
            vatRate: 0,
            paidAmount: 12400.00,
            status: 'paid'
        },
        {
            id: 'INV-2026-0091',
            date: '2026-08-10',
            dueDate: '2026-08-17',
            description: 'គ្រឿងសង្ហារឹមការិយាល័យ',
            paymentTerm: 'សាច់ប្រាក់ភ្លាមៗ (COD)',
            items: [
                { name: 'តុធ្វើការឯកទេស ជើងដែក 1.4m', note: '', qty: 6, unit: 'ឈុត', unitPrice: 270.00 }
            ],
            downPayment: 0,
            specialDiscount: 0,
            vatRate: 0,
            paidAmount: 1620.00,
            status: 'paid'
        }
    ],
    // ប្រវត្តិ និងស្ថានភាពការបញ្ជាទិញ (Order Tracking)
    orders: [
        {
            id: 'SO-2026-0042',
            relatedInvoice: 'INV-2026-0108',
            date: '2026-09-24',
            currentStage: 3, // 1: Confirmed, 2: Packing, 3: Out for delivery, 4: Delivered
            stageTimestamps: ['24 កញ្ញា - 08:30', '24 កញ្ញា - 11:00', '25 កញ្ញា - 09:15', 'រង់ចាំទទួល'],
            driverName: 'សុខ ជា',
            driverRole: 'បុគ្គលិកដឹកជញ្ជូន DIGITECHKH',
            driverPhone: '012 888 777',
            vehicle: 'ម៉ូតូ Honda Dream 125cc (ភ្នំពេញ 1AZ-9988)',
            experience: '3 ឆ្នាំ (ផ្ទៀងផ្ទាត់រួច)',
            deliveryCode: 'DLV-9921',
            recipient: 'លោក សុខ ជា (ក្រុមហ៊ុន សុខុម ត្រេឌីង ឯ.ក)',
            address: 'ផ្ទះលេខ 45 ផ្លូវ 310 សង្កាត់បឹងកេងកង 1 ខណ្ឌបឹងកេងកង រាជធានីភ្នំពេញ',
            note: 'សូមទូរស័ព្ទមុនពេលមកដល់ 10 នាទី ដើម្បីឱ្យបុគ្គលិកចុះទៅទទួលនៅជាន់ផ្ទាល់ដី។',
            eta: 'ប៉ាន់ស្មានមកដល់ក្នុងរយៈពេល 30 នាទីទៀត',
            items: [
                { name: 'Dell XPS 15 9530', spec: 'i7-13700H / 32GB / 1TB SSD / RTX 4060', qty: 4, serials: 'SN-DELL-991201 ... SN-DELL-991204', qcStatus: 'បានពិនិត្យ QC រួច' },
                { name: 'Dell UltraSharp 27" 4K Monitor', spec: 'U2723QE, IPS Black', qty: 2, serials: 'SN-MON-77210 / SN-MON-77211', qcStatus: 'បានពិនិត្យ QC រួច' }
            ]
        },
        {
            id: 'SO-2026-0039',
            relatedInvoice: 'INV-2026-0107',
            date: '2026-09-18',
            currentStage: 4,
            stageTimestamps: ['18 កញ្ញា - 09:00', '18 កញ្ញា - 13:30', '19 កញ្ញា - 08:45', '19 កញ្ញា - 15:20'],
            driverName: 'ម៉េង ហុង',
            driverRole: 'បុគ្គលិកដឹកជញ្ជូន DIGITECHKH',
            driverPhone: '092 887 766',
            vehicle: 'រថយន្តដឹកធំ (ភ្នំពេញ 3A-1102)',
            experience: '5 ឆ្នាំ (ផ្ទៀងផ្ទាត់រួច)',
            deliveryCode: 'DLV-9918',
            recipient: 'លោក សុខ ជា (ក្រុមហ៊ុន សុខុម ត្រេឌីង ឯ.ក)',
            address: 'ផ្ទះលេខ 45 ផ្លូវ 310 សង្កាត់បឹងកេងកង 1 ខណ្ឌបឹងកេងកង រាជធានីភ្នំពេញ',
            note: 'បានប្រគល់ជូនផ្ទាល់ដៃលោក សុខ ជា និងបានថតរូបបញ្ជាក់ការទទួល។',
            eta: 'បានប្រគល់ជោគជ័យ',
            items: [
                { name: 'HP LaserJet Pro MFP 4303fdw', spec: '', qty: 3, serials: 'SN-HP-40021 ... SN-HP-40023', qcStatus: 'បានពិនិត្យ QC រួច' }
            ]
        },
        {
            id: 'SO-2026-0035',
            relatedInvoice: 'INV-2026-0104',
            date: '2026-09-10',
            currentStage: 4,
            stageTimestamps: ['10 កញ្ញា - 10:15', '10 កញ្ញា - 14:00', '11 កញ្ញា - 09:30', '11 កញ្ញា - 10:50'],
            driverName: 'កែវ សំណាង',
            driverRole: 'បុគ្គលិកដឹកជញ្ជូន DIGITECHKH',
            driverPhone: '011 223 344',
            vehicle: 'ម៉ូតូរឺម៉កដឹក (ភ្នំពេញ 2E-9932)',
            experience: '4 ឆ្នាំ (ផ្ទៀងផ្ទាត់រួច)',
            deliveryCode: 'DLV-9905',
            recipient: 'លោក សុខ ជា (ក្រុមហ៊ុន សុខុម ត្រេឌីង ឯ.ក)',
            address: 'ផ្ទះលេខ 45 ផ្លូវ 310 សង្កាត់បឹងកេងកង 1 ខណ្ឌបឹងកេងកង រាជធានីភ្នំពេញ',
            note: 'បានប្រគល់ជូននៅផ្នែកទទួលភ្ញៀវ។',
            eta: 'បានប្រគល់ជោគជ័យ',
            items: [
                { name: 'TP-Link Omada ER8411 Router', spec: '', qty: 1, serials: 'SN-TPL-55210', qcStatus: 'បានពិនិត្យ QC រួច' },
                { name: 'ខ្សែបណ្តាញ Cat6 (រមូរ 305m)', spec: '', qty: 3, serials: 'N/A', qcStatus: 'បានពិនិត្យ QC រួច' }
            ]
        }
    ],
    bankAccount: {
        bank: 'ABA Bank',
        accountName: 'DIGITECHKH CO., LTD.',
        accountNumber: '001 888 999 (USD)'
    }
};

function getCustomerPortalData() {
    try {
        const data = sessionStorage.getItem(CUSTOMER_PORTAL_STORAGE_KEY);
        if (data) return JSON.parse(data);
    } catch (e) {
        console.warn('SessionStorage not available, using default customer portal data');
    }
    return DEFAULT_CUSTOMER_PORTAL_DATA;
}

function saveCustomerPortalData(data) {
    try {
        sessionStorage.setItem(CUSTOMER_PORTAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving customer portal data', e);
    }
}

/* ===== ម៉ាស៊ីនគណនា និងជំនួយការទូទៅ ===== */

function cpFmtUSD(n) {
    return '$' + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const CP_KH_MONTHS = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];

function cpFmtDate(dateStr) {
    const d = new Date(dateStr);
    return `${d.getDate()} ${CP_KH_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function cpInvoiceTotals(invoice) {
    const subtotal = invoice.items.reduce((s, it) => s + (it.qty * it.unitPrice), 0);
    const afterDownPayment = subtotal - invoice.downPayment;
    const afterDiscount = afterDownPayment - invoice.specialDiscount;
    const vat = afterDiscount * (invoice.vatRate / 100);
    const grandTotal = afterDiscount + vat;
    const remaining = Math.max(grandTotal - invoice.paidAmount, 0);
    return { subtotal, vat, grandTotal, remaining };
}

function cpInvoiceStatusMeta(invoice) {
    const map = {
        paid: { label: 'បានទូទាត់រួច', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        partial: { label: 'បង់ខ្លះមួយផ្នែក', badge: 'bg-sky-50 text-sky-700 border-sky-200' },
        unpaid: { label: 'នៅជំពាក់', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
        overdue: { label: 'ហួសកាលកំណត់', badge: 'bg-rose-50 text-rose-700 border-rose-200' }
    };
    return map[invoice.status] || map.unpaid;
}

/* ===== ផ្លាកលេខក្នុងម៉ឺនុយចំហៀង ===== */

function cpTotalOutstanding() {
    const data = getCustomerPortalData();
    return data.invoices.filter(inv => inv.status !== 'paid').length;
}

function cpActiveOrdersCount() {
    const data = getCustomerPortalData();
    return data.orders.filter(o => o.currentStage < 4).length;
}

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

const CP_TODAY = new Date(2026, 8, 25); // 25 កញ្ញា 2026

function cpDaysUntil(dateStr) {
    const parts = String(dateStr || '').split('-');
    if (parts.length !== 3) return null;
    const target = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return Math.round((target - CP_TODAY) / 86400000);
}

function portalNotifications() {
    const list = [];
    const data = getCustomerPortalData();

    // វិក្កយបត្រដែលនៅជំពាក់ ឬហួសកាលកំណត់
    data.invoices
        .filter(inv => inv.status !== 'paid')
        .map(inv => ({ inv, left: cpDaysUntil(inv.dueDate) }))
        .sort((a, b) => (a.left === null ? 99 : a.left) - (b.left === null ? 99 : b.left))
        .slice(0, 3)
        .forEach(x => {
            const overdue = x.left !== null && x.left < 0;
            const t = cpInvoiceTotals(x.inv);
            list.push({
                icon: overdue ? 'mdi:invoice-text-clock-outline' : 'mdi:invoice-text-outline',
                tone: overdue ? 'danger' : (x.left !== null && x.left <= 3 ? 'warning' : 'info'),
                title: overdue
                    ? `វិក្កយបត្រ ${x.inv.id} ហួសកាលកំណត់ ${Math.abs(x.left)} ថ្ងៃ`
                    : `វិក្កយបត្រ ${x.inv.id} ត្រូវទូទាត់ក្នុង ${x.left} ថ្ងៃ`,
                note: `នៅសល់ត្រូវបង់ ${cpFmtUSD(t.remaining)} · ${x.inv.paymentTerm}`,
                time: cpFmtDate(x.inv.dueDate)
            });
        });

    // ការដឹកជញ្ជូនកំពុងដំណើរការ
    data.orders.filter(o => o.currentStage < 4).forEach(o => {
        list.push({
            icon: 'mdi:truck-delivery-outline',
            tone: 'info',
            title: `ការបញ្ជាទិញ ${o.id} កំពុងដឹកជញ្ជូន`,
            note: `${o.driverName} (${o.driverPhone}) · ${o.vehicle} · រំពឹងដល់ ${o.eta}`,
            time: cpFmtDate(o.date)
        });
    });

    return list;
}
