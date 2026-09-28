/**
 * DIGITECHKH BMS - ច្រកគ្រប់គ្រងលទ្ធកម្ម (Procurement Manager Store)
 * ផ្ទុកទិន្នន័យគំរូ និងមុខងារគ្រប់គ្រងការបញ្ជាទិញ (PO), អ្នកផ្គត់ផ្គង់ (Suppliers),
 * និងវិក្កយបត្រទិញចូល (Vendor Bills) ជាមួយ 3-Way Matching។
 */

const BMS_PM_STORAGE_KEY = 'bms_pm_store_v1';

const INITIAL_PM_STORE = {
    kpis: {
        totalPOsMonth: 18,
        totalPOValueMonth: 28450.00,
        pendingDeliveryCount: 4,
        pendingDeliveryValue: 6200.00,
        pendingMatchCount: 3,
        pendingMatchValue: 4850.00,
        pendingDisbursementCount: 2,
        pendingDisbursementValue: 3100.00,
        monthlySpendChart: {
            months: ['មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា'],
            spend: [19500, 22400, 26800, 24100, 27300, 28450]
        },
        categoryShare: [
            { name: 'កុំព្យូទ័រ & អេក្រង់', value: 42 },
            { name: 'បណ្តាញ & សេវាកម្ម', value: 25 },
            { name: 'គ្រឿងបន្លាស់ & ខ្សែ', value: 18 },
            { name: 'សម្ភារៈការិយាល័យ', value: 15 }
        ]
    },

    suppliers: [
        {
            id: 'SUP-001',
            name: 'ក្រុមហ៊ុន ហ៊ុន ត្រេឌីង ឯ.ក',
            contactName: 'លោក ហ៊ុន សុខហេង',
            phone: '012 888 999',
            email: 'info@huntrading.com.kh',
            category: 'ក្រុមហ៊ុននាំចូលផ្ទាល់',
            tin: 'K002-901823901',
            bankName: 'ធនាគារ អេប៊ីអេ (ABA Bank USD)',
            bankAccount: '001 234 567',
            paymentTerms: '30 ថ្ងៃ (Net 30)',
            rating: 4.8,
            totalOrders: 28,
            status: 'active',
            address: 'អគារ 12 ផ្លូវសហព័ន្ធរុស្ស៊ី សង្កាត់ទឹកថ្លា ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ'
        },
        {
            id: 'SUP-002',
            name: 'ក្រុមហ៊ុន ខេមបូឌា កុំព្យូទ័រ សឹបផ្លាយ',
            contactName: 'អ្នកស្រី កែវ ធីតា',
            phone: '011 345 678',
            email: 'contact@cambodiacomputer.kh',
            category: 'ដេប៉ូចែកចាយធំ',
            tin: 'K008-109283746',
            bankName: 'ធនាគារ កាណាឌីយ៉ា (Canadia USD)',
            bankAccount: '100 889 001',
            paymentTerms: '15 ថ្ងៃ (Net 15)',
            rating: 4.6,
            totalOrders: 19,
            status: 'active',
            address: 'ផ្ទះលេខ 88 ផ្លូវកម្ពុជាក្រោម សង្កាត់មិត្តភាព ខណ្ឌ 7 មករា រាជធានីភ្នំពេញ'
        },
        {
            id: 'SUP-003',
            name: 'ក្រុមហ៊ុន ស៊ីងហ្គាពួរ អេឡិចត្រូនិច ត្រេឌីង',
            contactName: 'លោក តាន់ គីមសេង',
            phone: '010 777 666',
            email: 'sales@singapore-elec.com',
            category: 'តំណាងចែកចាយម៉ាកល្បី',
            tin: 'K005-778899001',
            bankName: 'ធនាគារ អេប៊ីអេ (ABA Bank USD)',
            bankAccount: '002 998 112',
            paymentTerms: '30 ថ្ងៃ (Net 30)',
            rating: 4.9,
            totalOrders: 35,
            status: 'active',
            address: 'អគារ វឌ្ឍនៈ កាពីតាល ជាន់ទី 15 មហាវិថីព្រះមុនីវង្ស រាជធានីភ្នំពេញ'
        },
        {
            id: 'SUP-004',
            name: 'ក្រុមហ៊ុន ម៉េហ្គា ណិតវើក ខូអិលធីឌី',
            contactName: 'លោក វ៉ាន់ វុទ្ធី',
            phone: '089 555 444',
            email: 'order@meganetwork.com.kh',
            category: 'អ្នកផ្គត់ផ្គង់ឧបករណ៍បណ្តាញ',
            tin: 'K003-445566778',
            bankName: 'ធនាគារ អេស៊ីលីដា (ACLEDA USD)',
            bankAccount: '010 334 556',
            paymentTerms: 'សាច់ប្រាក់ភ្លាមៗ (COD)',
            rating: 4.4,
            totalOrders: 14,
            status: 'active',
            address: 'ផ្ទះលេខ 45 ផ្លូវ 271 សង្កាត់បឹងទំពន់ ខណ្ឌមានជ័យ រាជធានីភ្នំពេញ'
        },
        {
            id: 'SUP-005',
            name: 'រោងចក្រផលិតខ្សែ និងសម្ភារៈបច្ចេកវិទ្យា ភ្នំពេញ',
            contactName: 'អ្នកស្រី ម៉ៅ សុភី',
            phone: '096 112 233',
            email: 'factory@pp-tech.kh',
            category: 'រោងចក្រក្នុងស្រុក',
            tin: 'K001-223344556',
            bankName: 'ធនាគារ អេប៊ីអេ (ABA Bank USD)',
            bankAccount: '003 445 778',
            paymentTerms: '60 ថ្ងៃ (Net 60)',
            rating: 4.2,
            totalOrders: 9,
            status: 'active',
            address: 'តំបន់សេដ្ឋកិច្ចពិសេសភ្នំពេញ (PPSP) ផ្លូវជាតិលេខ 4'
        }
    ],

    purchaseOrders: [
        {
            id: 'PO-2026-0045',
            supplierId: 'SUP-001',
            supplierName: 'ក្រុមហ៊ុន ហ៊ុន ត្រេឌីង ឯ.ក',
            date: '2026-09-22',
            deliveryDate: '2026-09-28',
            warehouse: 'ឃ្លាំងកណ្តាលឫស្សីកែវ (WH-01)',
            paymentTerms: '30 ថ្ងៃ (Net 30)',
            status: 'sent', // draft, sent, partial, received, matched, cancelled
            threeWayStatus: 'pending_grn', // matched, pending_grn, pending_bill, mismatch
            items: [
                { id: 'ITM-01', sku: 'SKU-LOGI-MX3', name: 'Logitech MX Master 3S Wireless Mouse', qty: 20, unit: 'គ្រឿង', costPrice: 65.00, total: 1300.00 },
                { id: 'ITM-02', sku: 'SKU-LOGI-MK295', name: 'Logitech MK295 Silent Wireless Combo', qty: 15, unit: 'ឈុត', costPrice: 22.00, total: 330.00 }
            ],
            subtotal: 1630.00,
            vatRate: 10,
            vatAmount: 163.00,
            totalAmount: 1793.00,
            notes: 'សូមដឹកជញ្ជូនមុនម៉ោង 15:00 ថ្ងៃធ្វើការ។'
        },
        {
            id: 'PO-2026-0044',
            supplierId: 'SUP-002',
            supplierName: 'ក្រុមហ៊ុន ខេមបូឌា កុំព្យូទ័រ សឹបផ្លាយ',
            date: '2026-09-18',
            deliveryDate: '2026-09-24',
            warehouse: 'ឃ្លាំងកណ្តាលឫស្សីកែវ (WH-01)',
            paymentTerms: '15 ថ្ងៃ (Net 15)',
            status: 'received',
            threeWayStatus: 'matched',
            items: [
                { id: 'ITM-03', sku: 'SKU-DELL-U2723', name: 'Dell UltraSharp 27" 4K Monitor (U2723QE)', qty: 6, unit: 'គ្រឿង', costPrice: 420.00, total: 2520.00 },
                { id: 'ITM-04', sku: 'SKU-DELL-DA310', name: 'Dell USB-C Mobile Adapter DA310', qty: 10, unit: 'គ្រឿង', costPrice: 55.00, total: 550.00 }
            ],
            subtotal: 3070.00,
            vatRate: 10,
            vatAmount: 307.00,
            totalAmount: 3377.00,
            notes: 'ទំនិញបានចូលឃ្លាំងរួចរាល់ ផ្ទៀងផ្ទាត់ GRN-2026-0038'
        },
        {
            id: 'PO-2026-0043',
            supplierId: 'SUP-003',
            supplierName: 'ក្រុមហ៊ុន ស៊ីងហ្គាពួរ អេឡិចត្រូនិច ត្រេឌីង',
            date: '2026-09-15',
            deliveryDate: '2026-09-25',
            warehouse: 'ឃ្លាំងកណ្តាលឫស្សីកែវ (WH-01)',
            paymentTerms: '30 ថ្ងៃ (Net 30)',
            status: 'matched',
            threeWayStatus: 'matched',
            items: [
                { id: 'ITM-05', sku: 'SKU-DELL-XPS15', name: 'Dell XPS 15 9530 i7/32GB/1TB SSD/RTX 4060', qty: 4, unit: 'គ្រឿង', costPrice: 1550.00, total: 6200.00 }
            ],
            subtotal: 6200.00,
            vatRate: 10,
            vatAmount: 620.00,
            totalAmount: 6820.00,
            notes: 'ផ្ទៀងផ្ទាត់រួចជាមួយ Bill #BILL-2026-0043'
        },
        {
            id: 'PO-2026-0042',
            supplierId: 'SUP-004',
            supplierName: 'ក្រុមហ៊ុន ម៉េហ្គា ណិតវើក ខូអិលធីឌី',
            date: '2026-09-12',
            deliveryDate: '2026-09-17',
            warehouse: 'ឃ្លាំងកណ្តាលឫស្សីកែវ (WH-01)',
            paymentTerms: 'សាច់ប្រាក់ភ្លាមៗ (COD)',
            status: 'received',
            threeWayStatus: 'pending_bill',
            items: [
                { id: 'ITM-06', sku: 'SKU-CISCO-CBS250', name: 'Cisco Business 250 Series 24-Port GE Switch', qty: 3, unit: 'គ្រឿង', costPrice: 380.00, total: 1140.00 },
                { id: 'ITM-07', sku: 'SKU-UBIQ-U6PRO', name: 'Ubiquiti UniFi 6 Pro Access Point (U6-Pro)', qty: 8, unit: 'គ្រឿង', costPrice: 135.00, total: 1080.00 }
            ],
            subtotal: 2220.00,
            vatRate: 10,
            vatAmount: 222.00,
            totalAmount: 2442.00,
            notes: 'ឃ្លាំងទទួលទំនិញរួច រង់ចាំទទួលវិក្កយបត្រផ្លូវការពីអ្នកផ្គត់ផ្គង់'
        },
        {
            id: 'PO-2026-0041',
            supplierId: 'SUP-005',
            supplierName: 'រោងចក្រផលិតខ្សែ និងសម្ភារៈបច្ចេកវិទ្យា ភ្នំពេញ',
            date: '2026-09-10',
            deliveryDate: '2026-09-16',
            warehouse: 'ឃ្លាំងចាក់អង្រែក្រោម (WH-02)',
            paymentTerms: '60 ថ្ងៃ (Net 60)',
            status: 'matched',
            threeWayStatus: 'matched',
            items: [
                { id: 'ITM-08', sku: 'SKU-CAT6-UTP', name: 'ខ្សែបណ្តាញ Cat6 UTP Cable Box 305M', qty: 25, unit: 'កេស', costPrice: 58.00, total: 1450.00 },
                { id: 'ITM-09', sku: 'SKU-RJ45-100', name: 'ក្បាលដោតបណ្តាញ RJ45 Modular Plug (កញ្ចប់ 100)', qty: 40, unit: 'កញ្ចប់', costPrice: 6.50, total: 260.00 }
            ],
            subtotal: 1710.00,
            vatRate: 10,
            vatAmount: 171.00,
            totalAmount: 1881.00,
            notes: 'បានទូទាត់រួចរាល់'
        }
    ],

    vendorBills: [
        {
            id: 'BILL-2026-0045',
            poId: 'PO-2026-0045',
            supplierId: 'SUP-001',
            supplierName: 'ក្រុមហ៊ុន ហ៊ុន ត្រេឌីង ឯ.ក',
            billDate: '2026-09-23',
            dueDate: '2026-10-23',
            amount: 1793.00,
            status: 'pending_match', // pending_match, matched, approved, paid
            threeWayMatch: 'pending_grn', // មិនទាន់ទទួលទំនិញគ្រប់
            disbursementId: null
        },
        {
            id: 'BILL-2026-0044',
            poId: 'PO-2026-0044',
            supplierId: 'SUP-002',
            supplierName: 'ក្រុមហ៊ុន ខេមបូឌា កុំព្យូទ័រ សឹបផ្លាយ',
            billDate: '2026-09-20',
            dueDate: '2026-10-05',
            amount: 3377.00,
            status: 'matched',
            threeWayMatch: 'matched', // ត្រូវគ្នា 100%
            disbursementId: 'DIS-2026-0089'
        },
        {
            id: 'BILL-2026-0043',
            poId: 'PO-2026-0043',
            supplierId: 'SUP-003',
            supplierName: 'ក្រុមហ៊ុន ស៊ីងហ្គាពួរ អេឡិចត្រូនិច ត្រេឌីង',
            billDate: '2026-09-17',
            dueDate: '2026-10-17',
            amount: 6820.00,
            status: 'approved',
            threeWayMatch: 'matched',
            disbursementId: 'DIS-2026-0088'
        },
        {
            id: 'BILL-2026-0041',
            poId: 'PO-2026-0041',
            supplierId: 'SUP-005',
            supplierName: 'រោងចក្រផលិតខ្សែ និងសម្ភារៈបច្ចេកវិទ្យា ភ្នំពេញ',
            billDate: '2026-09-12',
            dueDate: '2026-11-12',
            amount: 1881.00,
            status: 'paid',
            threeWayMatch: 'matched',
            disbursementId: 'DIS-2026-0075'
        }
    ],

    catalogItems: [
        { sku: 'SKU-DELL-XPS15', name: 'Dell XPS 15 9530 i7/32GB/1TB SSD/RTX 4060', unit: 'គ្រឿង', costPrice: 1550.00 },
        { sku: 'SKU-DELL-U2723', name: 'Dell UltraSharp 27" 4K Monitor (U2723QE)', unit: 'គ្រឿង', costPrice: 420.00 },
        { sku: 'SKU-LOGI-MX3', name: 'Logitech MX Master 3S Wireless Mouse', unit: 'គ្រឿង', costPrice: 65.00 },
        { sku: 'SKU-LOGI-MK295', name: 'Logitech MK295 Silent Wireless Combo', unit: 'ឈុត', costPrice: 22.00 },
        { sku: 'SKU-CISCO-CBS250', name: 'Cisco Business 250 Series 24-Port GE Switch', unit: 'គ្រឿង', costPrice: 380.00 },
        { sku: 'SKU-UBIQ-U6PRO', name: 'Ubiquiti UniFi 6 Pro Access Point (U6-Pro)', unit: 'គ្រឿង', costPrice: 135.00 },
        { sku: 'SKU-CAT6-UTP', name: 'ខ្សែបណ្តាញ Cat6 UTP Cable Box 305M', unit: 'កេស', costPrice: 58.00 },
        { sku: 'SKU-RJ45-100', name: 'ក្បាលដោតបណ្តាញ RJ45 Modular Plug (កញ្ចប់ 100)', unit: 'កញ្ចប់', costPrice: 6.50 },
        { sku: 'SKU-HP-4303FDW', name: 'HP Color LaserJet Pro MFP 4303fdw', unit: 'គ្រឿង', costPrice: 560.00 },
        { sku: 'SKU-HP-58A', name: 'ទឹកខ្មៅព្រីនធ័រ HP LaserJet 58A Black Toner', unit: 'ប្រអប់', costPrice: 68.00 }
    ]
};

function getPMStore() {
    try {
        const raw = localStorage.getItem(BMS_PM_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {
        console.warn('Failed to parse PM store from localStorage:', e);
    }
    localStorage.setItem(BMS_PM_STORAGE_KEY, JSON.stringify(INITIAL_PM_STORE));
    return JSON.parse(JSON.stringify(INITIAL_PM_STORE));
}

function savePMStore(store) {
    try {
        localStorage.setItem(BMS_PM_STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
        console.error('Failed to save PM store to localStorage:', e);
    }
}

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

const PM_TODAY = new Date(2026, 8, 23); // 23 កញ្ញា 2026

function pmFmtUSD(val) {
    const n = Number(val) || 0;
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function pmDaysUntil(dateStr) {
    const parts = String(dateStr || '').split('-');
    if (parts.length !== 3) return null;
    const target = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return Math.round((target - PM_TODAY) / 86400000);
}

function portalNotifications() {
    const list = [];
    const store = getPMStore();

    // ការបញ្ជាទិញដែលហួសថ្ងៃទទួលទំនិញ
    store.purchaseOrders
        .filter(po => po.status === 'sent' || po.threeWayStatus === 'pending_grn')
        .forEach(po => {
            const left = pmDaysUntil(po.deliveryDate);
            if (left === null) return;
            if (left < 0) {
                list.push({
                    icon: 'mdi:truck-alert-outline',
                    tone: 'danger',
                    title: `${po.id} ហួសថ្ងៃទទួលទំនិញ ${Math.abs(left)} ថ្ងៃ`,
                    note: `${po.supplierName} · ${pmFmtUSD(po.totalAmount)} · ${po.warehouse}`
                });
            } else if (left <= 5) {
                list.push({
                    icon: 'mdi:truck-delivery-outline',
                    tone: 'warning',
                    title: `${po.id} នឹងទទួលទំនិញក្នុង ${left} ថ្ងៃ`,
                    note: `${po.supplierName} · ${pmFmtUSD(po.totalAmount)} · ${po.warehouse}`
                });
            }
        });

    // ការបញ្ជាទិញដែលទទួលទំនិញរួច ប៉ុន្តែមិនទាន់មានវិក្កយបត្រ
    store.purchaseOrders.filter(po => po.threeWayStatus === 'pending_bill').forEach(po => {
        list.push({
            icon: 'mdi:receipt-text-clock-outline',
            tone: 'warning',
            title: `${po.id} ទទួលទំនិញរួច តែខ្វះវិក្កយបត្រ`,
            note: `${po.supplierName} · ${pmFmtUSD(po.totalAmount)} · មិនអាចផ្ទៀងផ្ទាត់ត្រីភាគីបានទេ`
        });
    });

    // វិក្កយបត្រអ្នកផ្គត់ផ្គង់ដែលរង់ចាំការផ្ទៀងផ្ទាត់ត្រីភាគី
    store.vendorBills.filter(b => b.status === 'pending_match').forEach(b => {
        list.push({
            icon: 'mdi:file-compare',
            tone: 'warning',
            title: `${b.id} រង់ចាំការផ្ទៀងផ្ទាត់ត្រីភាគី`,
            note: `${b.supplierName} · ${pmFmtUSD(b.amount)} · យោង ${b.poId}`
        });
    });

    // វិក្កយបត្រជិតដល់កាលកំណត់ទូទាត់
    store.vendorBills
        .filter(b => b.status !== 'paid')
        .map(b => ({ b, left: pmDaysUntil(b.dueDate) }))
        .filter(x => x.left !== null && x.left <= 15)
        .sort((a, b) => a.left - b.left)
        .slice(0, 3)
        .forEach(x => {
            list.push({
                icon: 'mdi:calendar-clock-outline',
                tone: x.left < 0 ? 'danger' : 'info',
                title: x.left < 0
                    ? `${x.b.id} ហួសកាលកំណត់ទូទាត់ ${Math.abs(x.left)} ថ្ងៃ`
                    : `${x.b.id} ត្រូវទូទាត់ក្នុង ${x.left} ថ្ងៃ`,
                note: `${x.b.supplierName} · ${pmFmtUSD(x.b.amount)}`
            });
        });

    return list;
}
