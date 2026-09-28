/**
 * ច្រកបុគ្គលិកជាន់ឃ្លាំង — ទិន្នន័យគំរូ និងម៉ាស៊ីនគណនា (Floor Warehouse Data)
 * គោលការណ៍ Zero Price Leakage: គ្មានទិន្នន័យតម្លៃទិញ លក់ ឬប្រាក់ចំណេញឡើយ!
 */

const WAREHOUSE_STAFF_STORAGE_KEY = 'digitechkh_bms_warehouse_staff_data';

const DEFAULT_WAREHOUSE_STAFF_DATA = {
    staffProfile: {
        id: 'WS-008',
        name: 'សុខ ចាន់ថន',
        role: 'បុគ្គលិកជាន់ឃ្លាំង (Floor Warehouse Staff)',
        assignedWarehouse: 'WH-PP01',
        warehouseName: 'ឃ្លាំងកណ្តាលភ្នំពេញ (Main Hub)',
        shift: 'វេនពេលថ្ងៃ (07:30 - 17:00)'
    },
    // បញ្ជីមុខទំនិញ និងទីតាំងធ្នើរ (SKUs & Bin Locations - ZERO PRICE)
    inventoryItems: [
        { sku: 'SKU-001', name: 'ម៉ាស៊ីនត្រជាក់ Inverter 1.5HP', category: 'គ្រឿងអេឡិចត្រូនិច', bin: 'A-01-03', barcode: '885123456001', onHand: 45, reorderPoint: 30, unit: 'គ្រឿង' },
        { sku: 'SKU-002', name: 'ទូរទស្សន៍ឆ្លាតវៃ 55" 4K UHD', category: 'ទូរទស្សន៍', bin: 'A-02-01', barcode: '885123456002', onHand: 28, reorderPoint: 35, unit: 'គ្រឿង' },
        { sku: 'SKU-003', name: 'ទូទឹកកក Side-by-Side 600L', category: 'គ្រឿងប្រើប្រាស់ផ្ទះបាយ', bin: 'B-01-02', barcode: '885123456003', onHand: 14, reorderPoint: 20, unit: 'គ្រឿង' },
        { sku: 'SKU-004', name: 'ម៉ាស៊ីនបោកគក់ទ្វារមុខ 10kg', category: 'គ្រឿងអេឡិចត្រូនិច', bin: 'B-03-01', barcode: '885123456004', onHand: 19, reorderPoint: 25, unit: 'គ្រឿង' },
        { sku: 'SKU-005', name: 'កង្ហារបញ្ឈរតេឡេបញ្ជា', category: 'កង្ហារ', bin: 'C-01-04', barcode: '885123456005', onHand: 112, reorderPoint: 50, unit: 'គ្រឿង' },
        { sku: 'SKU-006', name: 'ឆ្នាំងដាំបាយអេឡិចត្រូនិច 1.8L', category: 'គ្រឿងប្រើប្រាស់ផ្ទះបាយ', bin: 'C-02-02', barcode: '885123456006', onHand: 64, reorderPoint: 40, unit: 'គ្រឿង' },
        { sku: 'SKU-007', name: 'ម៉ាស៊ីនបន្សុទ្ធខ្យល់ UV Filter', category: 'សុខភាព & បរិស្ថាន', bin: 'D-01-01', barcode: '885123456007', onHand: 36, reorderPoint: 30, unit: 'គ្រឿង' },
        { sku: 'SKU-008', name: 'អាំងភ្លើងកម្តៅស្វ័យប្រវត្ត', category: 'គ្រឿងប្រើប្រាស់ផ្ទះបាយ', bin: 'D-02-05', barcode: '885123456008', onHand: 50, reorderPoint: 45, unit: 'គ្រឿង' }
    ],
    // បញ្ជីរើស និងវេចខ្ចប់ទំនិញ (Dispatch Pick Lists)
    pickLists: [
        {
            id: 'PKL-2026-0891',
            orderNo: 'SO-2026-1042',
            customerName: 'ហាងអគ្គិសនី សុវណ្ណភូមិ',
            targetZone: 'ភ្នំពេញ - ខណ្ឌទួលគោក',
            priority: 'បន្ទាន់ (High)',
            status: 'pending', // pending, picking, packed, dispatched
            createdAt: '2026-09-23 08:30',
            assignedTo: 'សុខ ចាន់ថន',
            items: [
                { sku: 'SKU-001', name: 'ម៉ាស៊ីនត្រជាក់ Inverter 1.5HP', bin: 'A-01-03', barcode: '885123456001', reqQty: 4, pickedQty: 0, verified: false },
                { sku: 'SKU-005', name: 'កង្ហារបញ្ឈរតេឡេបញ្ជា', bin: 'C-01-04', barcode: '885123456005', reqQty: 6, pickedQty: 0, verified: false }
            ]
        },
        {
            id: 'PKL-2026-0892',
            orderNo: 'SO-2026-1045',
            customerName: 'ក្រុមហ៊ុន គឹមសេង ត្រេឌីង',
            targetZone: 'សៀមរាប - ផ្ញើតាមឡានក្រុង',
            priority: 'ធម្មតា (Normal)',
            status: 'picking',
            createdAt: '2026-09-23 09:15',
            assignedTo: 'សុខ ចាន់ថន',
            items: [
                { sku: 'SKU-002', name: 'ទូរទស្សន៍ឆ្លាតវៃ 55" 4K UHD', bin: 'A-02-01', barcode: '885123456002', reqQty: 2, pickedQty: 2, verified: true },
                { sku: 'SKU-006', name: 'ឆ្នាំងដាំបាយអេឡិចត្រូនិច 1.8L', bin: 'C-02-02', barcode: '885123456006', reqQty: 5, pickedQty: 0, verified: false }
            ]
        },
        {
            id: 'PKL-2026-0890',
            orderNo: 'SO-2026-1038',
            customerName: 'សណ្ឋាគារ រីជែនស៊ី ភ្នំពេញ',
            targetZone: 'ភ្នំពេញ - ខណ្ឌដូនពេញ',
            priority: 'ធម្មតា (Normal)',
            status: 'packed',
            createdAt: '2026-09-23 07:45',
            assignedTo: 'សុខ ចាន់ថន',
            items: [
                { sku: 'SKU-004', name: 'ម៉ាស៊ីនបោកគក់ទ្វារមុខ 10kg', bin: 'B-03-01', barcode: '885123456004', reqQty: 3, pickedQty: 3, verified: true },
                { sku: 'SKU-007', name: 'ម៉ាស៊ីនបន្សុទ្ធខ្យល់ UV Filter', bin: 'D-01-01', barcode: '885123456007', reqQty: 4, pickedQty: 4, verified: true }
            ]
        }
    ],
    // បញ្ជីទទួលទំនិញចូលឃ្លាំងពី PO (Inbound GRN Receipts)
    inboundPOs: [
        {
            id: 'GRN-PO-9041',
            poNo: 'PO-2026-0412',
            supplierName: 'DAIKIN Cambodia Supplier Ltd',
            driverInfo: 'ឡានដឹកលេខ 2B-8941 (តៃកុង: ជា សុផាត)',
            arrivalDate: '2026-09-23 09:00',
            status: 'receiving', // pending, receiving, completed
            items: [
                { sku: 'SKU-001', name: 'ម៉ាស៊ីនត្រជាក់ Inverter 1.5HP', orderQty: 20, receivedQty: 18, damagedQty: 0, binTarget: 'A-01-03', batchNo: 'B26-09A', inspected: true },
                { sku: 'SKU-007', name: 'ម៉ាស៊ីនបន្សុទ្ធខ្យល់ UV Filter', orderQty: 15, receivedQty: 15, damagedQty: 0, binTarget: 'D-01-01', batchNo: 'B26-09B', inspected: true }
            ]
        },
        {
            id: 'GRN-PO-9042',
            poNo: 'PO-2026-0415',
            supplierName: 'SAMSUNG Electronics Distribution KH',
            driverInfo: 'កុងតឺន័រលេខ 3A-1102 (តៃកុង: ម៉េង ហុង)',
            arrivalDate: '2026-09-23 10:30',
            status: 'pending',
            items: [
                { sku: 'SKU-002', name: 'ទូរទស្សន៍ឆ្លាតវៃ 55" 4K UHD', orderQty: 30, receivedQty: 0, damagedQty: 0, binTarget: 'A-02-01', batchNo: 'SM-2026-Q3', inspected: false },
                { sku: 'SKU-003', name: 'ទូទឹកកក Side-by-Side 600L', orderQty: 10, receivedQty: 0, damagedQty: 0, binTarget: 'B-01-02', batchNo: 'SM-2026-Q3', inspected: false }
            ]
        },
        {
            id: 'GRN-PO-9039',
            poNo: 'PO-2026-0398',
            supplierName: 'MIDEA Household Appliance Co.',
            driverInfo: 'ឡានដឹកលេខ 2E-9932 (តៃកុង: កែវ សំណាង)',
            arrivalDate: '2026-09-22 15:40',
            status: 'completed',
            items: [
                { sku: 'SKU-005', name: 'កង្ហារបញ្ឈរតេឡេបញ្ជា', orderQty: 50, receivedQty: 50, damagedQty: 0, binTarget: 'C-01-04', batchNo: 'MD-2609', inspected: true },
                { sku: 'SKU-006', name: 'ឆ្នាំងដាំបាយអេឡិចត្រូនិច 1.8L', orderQty: 40, receivedQty: 40, damagedQty: 0, binTarget: 'C-02-02', batchNo: 'MD-2609', inspected: true }
            ]
        }
    ],
    // សន្លឹករាប់ស្តុកជាក់ស្តែង (Physical Cycle Count Sheets)
    cycleCounts: [
        {
            id: 'CNT-2026-044',
            zone: 'តំបន់ A (Aisle A - A-01 ដល់ A-02)',
            date: '2026-09-23',
            assignedAuditor: 'សុខ ចាន់ថន',
            status: 'in_progress', // pending, in_progress, submitted
            items: [
                { sku: 'SKU-001', name: 'ម៉ាស៊ីនត្រជាក់ Inverter 1.5HP', bin: 'A-01-03', systemQty: 45, countedQty: 45, variance: 0, note: 'ចំនួនត្រូវគ្នាល្អ' },
                { sku: 'SKU-002', name: 'ទូរទស្សន៍ឆ្លាតវៃ 55" 4K UHD', bin: 'A-02-01', systemQty: 28, countedQty: 27, variance: -1, note: 'ខ្វះ 1 គ្រឿងក្នុងកេះធ្នើរ' }
            ]
        },
        {
            id: 'CNT-2026-043',
            zone: 'តំបន់ B (Aisle B - B-01 ដល់ B-03)',
            date: '2026-09-22',
            assignedAuditor: 'សុខ ចាន់ថន',
            status: 'submitted',
            items: [
                { sku: 'SKU-003', name: 'ទូទឹកកក Side-by-Side 600L', bin: 'B-01-02', systemQty: 14, countedQty: 14, variance: 0, note: 'រាប់រួចត្រឹមត្រូវ' },
                { sku: 'SKU-004', name: 'ម៉ាស៊ីនបោកគក់ទ្វារមុខ 10kg', bin: 'B-03-01', systemQty: 19, countedQty: 19, variance: 0, note: 'រាប់រួចត្រឹមត្រូវ' }
            ]
        }
    ]
};

function getWarehouseStaffData() {
    try {
        const data = sessionStorage.getItem(WAREHOUSE_STAFF_STORAGE_KEY);
        if (data) return JSON.parse(data);
    } catch (e) {
        console.warn('SessionStorage not available, using default data');
    }
    return DEFAULT_WAREHOUSE_STAFF_DATA;
}

function saveWarehouseStaffData(data) {
    try {
        sessionStorage.setItem(WAREHOUSE_STAFF_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving warehouse staff data', e);
    }
}

/* ===== ផ្លាកលេខក្នុងម៉ឺនុយចំហៀង (ហៅដោយ portal.js) ===== */

function totalPending() {
    return getWarehouseStaffData().inboundPOs.filter(po => po.status === 'pending').length;
}

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js)
   គោលការណ៍លាក់តម្លៃ ១០០%៖ មិនបង្ហាញតម្លៃទិញ តម្លៃលក់ ឬទឹកប្រាក់ណាមួយឡើយ ===== */

function portalNotifications() {
    const list = [];
    const data = getWarehouseStaffData();

    // បញ្ជីរើសទំនិញបន្ទាន់ដែលមិនទាន់ចាប់ផ្តើម
    data.pickLists.filter(pl => pl.status === 'pending').forEach(pl => {
        const urgent = String(pl.priority || '').includes('បន្ទាន់');
        list.push({
            icon: 'mdi:clipboard-list-outline',
            tone: urgent ? 'danger' : 'warning',
            title: `បញ្ជីរើសទំនិញ ${pl.id} រង់ចាំដំណើរការ`,
            note: `${pl.orderNo} · ${pl.targetZone} · ${pl.items.length} ប្រភេទទំនិញ · ${pl.priority}`,
            time: pl.createdAt
        });
    });

    // ទំនិញចូលដែលកំពុងទទួល ឬមានចំនួនមិនត្រូវគ្នា
    data.inboundPOs.forEach(po => {
        const short = po.items.filter(it => (it.receivedQty || 0) < it.orderQty);
        const damaged = po.items.filter(it => (it.damagedQty || 0) > 0);
        if (po.status === 'receiving') {
            list.push({
                icon: 'mdi:truck-check-outline',
                tone: 'info',
                title: `ការទទួលទំនិញ ${po.poNo} កំពុងដំណើរការ`,
                note: `${po.supplierName} · ${po.driverInfo}`,
                time: po.arrivalDate
            });
        } else if (po.status === 'pending') {
            list.push({
                icon: 'mdi:truck-outline',
                tone: 'warning',
                title: `ទំនិញចូល ${po.poNo} រង់ចាំការទទួល`,
                note: `${po.supplierName} · ${po.items.length} ប្រភេទទំនិញ`,
                time: po.arrivalDate
            });
        }
        if (damaged.length) {
            list.push({
                icon: 'mdi:package-variant-closed-remove',
                tone: 'danger',
                title: `${po.poNo} មានទំនិញខូចខាត ${damaged.length} ប្រភេទ`,
                note: damaged.map(it => `${it.name} (${it.damagedQty})`).join(' · ')
            });
        } else if (short.length && po.status === 'receiving') {
            list.push({
                icon: 'mdi:package-variant-minus',
                tone: 'warning',
                title: `${po.poNo} ទទួលមិនគ្រប់ចំនួន ${short.length} ប្រភេទ`,
                note: short.map(it => `${it.name} (${it.receivedQty}/${it.orderQty})`).join(' · ')
            });
        }
    });

    // ការរាប់ស្តុកដែលមានគម្លាត
    data.cycleCounts.forEach(cc => {
        const varItems = cc.items.filter(it => (it.variance || 0) !== 0);
        if (cc.status === 'in_progress') {
            list.push({
                icon: 'mdi:counter',
                tone: varItems.length ? 'warning' : 'info',
                title: `ការរាប់ស្តុក ${cc.id} កំពុងដំណើរការ`,
                note: varItems.length
                    ? `${cc.zone} · មានគម្លាត ${varItems.length} ប្រភេទ ត្រូវរាយការណ៍`
                    : `${cc.zone} · ចំនួនត្រូវគ្នាទាំងអស់`,
                time: cc.date
            });
        }
    });

    // ទំនិញដល់ចំណុចបញ្ជាទិញឡើងវិញ (បង្ហាញតែចំនួន មិនបង្ហាញតម្លៃ)
    data.inventoryItems.filter(it => it.onHand <= it.reorderPoint).slice(0, 3).forEach(it => {
        list.push({
            icon: 'mdi:alert-outline',
            tone: it.onHand === 0 ? 'danger' : 'warning',
            title: `${it.name} នៅសល់ ${it.onHand} ${it.unit}`,
            note: `ធ្នើ ${it.bin} · ចំណុចបញ្ជាទិញឡើងវិញ ${it.reorderPoint} ${it.unit}`
        });
    });

    return list;
}
