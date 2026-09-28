/* ច្រកគ្រប់គ្រងឃ្លាំងស្តុក (Warehouse Manager) — ឃ្លាំងទិន្នន័យសាកល្បងរួម
   គ្រប់ទំព័រទាំងអស់អាន និងកែប្រែទិន្នន័យពីឯកសារនេះតែមួយគត់។
   ការសម្រេច (អនុម័ត/បដិសេធ/បង្កើតថ្មី) ត្រូវបានរក្សាទុកក្នុង sessionStorage។ */

const WM_TODAY = new Date(2026, 8, 23);

const WAREHOUSES = {
    'WH-01': { id: 'WH-01', name: 'ឃ្លាំងកណ្តាល (ភ្នំពេញ)', location: 'រាជធានីភ្នំពេញ', capacity: 15000, used: 11850, manager: 'គង់ វិបុល', phone: '012 999 111' },
    'WH-02': { id: 'WH-02', name: 'ឃ្លាំងសាខាទួលគោក', location: 'ខណ្ឌទួលគោក', capacity: 6000, used: 4320, manager: 'ស៊្រុន ធារ៉ា', phone: '011 333 444' },
    'WH-03': { id: 'WH-03', name: 'ឃ្លាំងសាខាសៀមរាប', location: 'ក្រុងសៀមរាប', capacity: 8000, used: 6880, manager: 'លាង សុខុម', phone: '017 555 666' },
    'WH-04': { id: 'WH-04', name: 'ឃ្លាំងសាខាបាត់ដំបង', location: 'ក្រុងបាត់ដំបង', capacity: 5000, used: 2450, manager: 'គឹម វណ្ណា', phone: '010 777 888' }
};

const CATEGORIES = {
    computer: 'កុំព្យូទ័រ',
    monitor: 'អេក្រង់',
    printer: 'ម៉ាស៊ីនបោះពុម្ព',
    accessory: 'គ្រឿងបន្លាស់',
    furniture: 'គ្រឿងសង្ហារិម'
};

const MASTER_PRODUCTS = [
    { sku: 'DEL-OPT-7010', name: 'កុំព្យូទ័រ Dell OptiPlex 7010', unit: 'ឈុត', category: 'computer', mac: 520, stocks: { 'WH-01': 45, 'WH-02': 18, 'WH-03': 12, 'WH-04': 10 }, min: 50, max: 150, bin: 'Zone A - R01-B02' },
    { sku: 'MON-DEL-24', name: 'អេក្រង់ Dell 24 អ៊ីញ S2421HN', unit: 'គ្រឿង', category: 'monitor', mac: 110, stocks: { 'WH-01': 80, 'WH-02': 25, 'WH-03': 15, 'WH-04': 20 }, min: 80, max: 200, bin: 'Zone A - R02-B01' },
    { sku: 'PRN-CAN-2900', name: 'ម៉ាស៊ីនព្រីន Canon Laser LBP2900', unit: 'គ្រឿង', category: 'printer', mac: 125, stocks: { 'WH-01': 14, 'WH-02': 5, 'WH-03': 3, 'WH-04': 2 }, min: 30, max: 80, bin: 'Zone B - R01-B04' },
    { sku: 'KEY-KEY-K8', name: 'ក្តារចុចមេកានិច Keychron K8', unit: 'គ្រឿង', category: 'accessory', mac: 62, stocks: { 'WH-01': 120, 'WH-02': 40, 'WH-03': 35, 'WH-04': 30 }, min: 60, max: 250, bin: 'Zone B - R03-B02' },
    { sku: 'CHR-ERG-01', name: 'កៅអីការិយាល័យ Ergonomic', unit: 'គ្រឿង', category: 'furniture', mac: 145, stocks: { 'WH-01': 35, 'WH-02': 12, 'WH-03': 8, 'WH-04': 6 }, min: 40, max: 100, bin: 'Zone C - R01-B01' },
    { sku: 'CAB-CAT6-305', name: 'ខ្សែកាបបណ្តាញ Cat6 UTP 305m', unit: 'ដុំ', category: 'accessory', mac: 75, stocks: { 'WH-01': 8, 'WH-02': 2, 'WH-03': 1, 'WH-04': 0 }, min: 25, max: 60, bin: 'Zone B - R04-B01' },
    { sku: 'SW-CISCO-24', name: 'ស្វីត Cisco Catalyst 24 Port', unit: 'គ្រឿង', category: 'accessory', mac: 340, stocks: { 'WH-01': 5, 'WH-02': 1, 'WH-03': 0, 'WH-04': 1 }, min: 15, max: 40, bin: 'Zone A - R03-B03' },
    { sku: 'TON-CAN-303', name: 'ទឹកថ្នាំព្រីន Canon Cartridge 303', unit: 'ប្រអប់', category: 'printer', mac: 28, stocks: { 'WH-01': 18, 'WH-02': 6, 'WH-03': 4, 'WH-04': 2 }, min: 50, max: 150, bin: 'Zone B - R02-B03' },
    { sku: 'UPS-APC-650', name: 'ឧបករណ៍រក្សាភ្លើង APC 650VA', unit: 'គ្រឿង', category: 'accessory', mac: 58, stocks: { 'WH-01': 60, 'WH-02': 20, 'WH-03': 15, 'WH-04': 12 }, min: 40, max: 120, bin: 'Zone A - R04-B02' },
    { sku: 'DSK-OFC-120', name: 'តុការិយាល័យទំនើប 1.2m', unit: 'គ្រឿង', category: 'furniture', mac: 115, stocks: { 'WH-01': 22, 'WH-02': 8, 'WH-03': 5, 'WH-04': 4 }, min: 20, max: 60, bin: 'Zone C - R02-B01' }
];

const INITIAL_MOVEMENTS = [
    {
        id: 'TRF-2026-0046', date: '2026-09-23T08:30', fromWh: 'WH-01', toWh: 'WH-02', status: 'pending_approval',
        driver: 'កែវ វិចិត្រ (PP-2A-5566)', note: 'ផ្ទេរបំពេញស្តុកសាខាទួលគោកប្រចាំសប្តាហ៍', requester: 'ស៊្រុន ធារ៉ា',
        items: [
            { sku: 'DEL-OPT-7010', qty: 5 },
            { sku: 'MON-DEL-24', qty: 10 }
        ]
    },
    {
        id: 'TRF-2026-0045', date: '2026-09-22T14:15', fromWh: 'WH-01', toWh: 'WH-03', status: 'in_transit',
        driver: 'សំ សុខ (PP-2B-8899)', note: 'ផ្ទេរតាមការស្នើសុំរបស់សាខាសៀមរាប', requester: 'លាង សុខុម',
        items: [
            { sku: 'KEY-KEY-K8', qty: 20 },
            { sku: 'UPS-APC-650', qty: 10 },
            { sku: 'CHR-ERG-01', qty: 5 }
        ]
    },
    {
        id: 'TRF-2026-0044', date: '2026-09-21T09:00', fromWh: 'WH-01', toWh: 'WH-02', status: 'completed',
        driver: 'កែវ វិចិត្រ (PP-2A-5566)', note: 'ផ្ទេរគ្រឿងបន្លាស់', requester: 'ស៊្រុន ធារ៉ា',
        items: [
            { sku: 'CAB-CAT6-305', qty: 5 },
            { sku: 'TON-CAN-303', qty: 15 }
        ]
    },
    {
        id: 'TRF-2026-0043', date: '2026-09-20T11:40', fromWh: 'WH-01', toWh: 'WH-04', status: 'completed',
        driver: 'សំ សុខ (PP-2B-8899)', note: 'ផ្ទេរស្តុកបាត់ដំបង', requester: 'គឹម វណ្ណា',
        items: [
            { sku: 'DEL-OPT-7010', qty: 8 },
            { sku: 'MON-DEL-24', qty: 15 },
            { sku: 'KEY-KEY-K8', qty: 15 },
            { sku: 'UPS-APC-650', qty: 4 }
        ]
    },
    {
        id: 'TRF-2026-0042', date: '2026-09-18T16:20', fromWh: 'WH-02', toWh: 'WH-01', status: 'completed',
        driver: 'ហេង រិទ្ធ (PP-2C-1122)', note: 'បង្វិលស្តុកលើសតម្រូវការចូលឃ្លាំងកណ្តាល', requester: 'ស៊្រុន ធារ៉ា',
        items: [
            { sku: 'CHR-ERG-01', qty: 6 }
        ]
    }
];

const INITIAL_ADJUSTMENTS = [
    {
        id: 'ADJ-2026-0018', date: '2026-09-22T15:30', whId: 'WH-01', sku: 'DEL-OPT-7010',
        systemQty: 46, physicalQty: 45, unitCost: 520, reason: 'damaged',
        reasonLabel: 'ខូចខាតពេលលើកទម្លាក់ចូលធ្នើរ', status: 'escalated_gm',
        reporter: 'ម៉ម សុវណ្ណ (បុគ្គលិកឃ្លាំង)', note: 'អេក្រង់ និងតួម៉ាស៊ីនបែកបាក់ ត្រូវការ GM អនុម័តព្រោះលើសពី $200'
    },
    {
        id: 'ADJ-2026-0017', date: '2026-09-21T10:00', whId: 'WH-02', sku: 'KEY-KEY-K8',
        systemQty: 38, physicalQty: 40, unitCost: 62, reason: 'count_error',
        reasonLabel: 'កំហុសរាប់ស្តុកជុំមុន (រកឃើញបន្ថែម ២ គ្រឿង)', status: 'pending_approval',
        reporter: 'ស៊្រុន ធារ៉ា (ប្រធានសាខា)', note: 'ចំនួនកើនឡើង $124.00 ក្នុងដែនសមត្ថកិច្ចរបស់ Warehouse Manager'
    },
    {
        id: 'ADJ-2026-0016', date: '2026-09-20T14:45', whId: 'WH-01', sku: 'TON-CAN-303',
        systemQty: 20, physicalQty: 18, unitCost: 28, reason: 'damaged',
        reasonLabel: 'ប្រអប់បែកធ្លាយទឹកថ្នាំ', status: 'pending_approval',
        reporter: 'ម៉ម សុវណ្ណ (បុគ្គលិកឃ្លាំង)', note: 'ខូចខាតចំនួន ២ ប្រអប់ សរុប $56.00'
    },
    {
        id: 'ADJ-2026-0015', date: '2026-09-17T11:20', whId: 'WH-03', sku: 'MON-DEL-24',
        systemQty: 16, physicalQty: 15, unitCost: 110, reason: 'sample_loss',
        reasonLabel: 'ដកជាគំរូតាំងបង្ហាញអតិថិជន', status: 'approved',
        reporter: 'លាង សុខុម', approver: 'គង់ វិបុល', note: 'បានអនុម័តកាត់ស្តុកផ្លូវការ'
    }
];

/* ===== SessionStorage Persistence Helpers ===== */
function getStorage(key, fallback) {
    try {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (e) {
        return fallback;
    }
}

function setStorage(key, val) {
    try {
        sessionStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
}

function getMovements() {
    return getStorage('wm_movements', INITIAL_MOVEMENTS);
}

function saveMovements(list) {
    setStorage('wm_movements', list);
}

function getAdjustments() {
    return getStorage('wm_adjustments', INITIAL_ADJUSTMENTS);
}

function saveAdjustments(list) {
    setStorage('wm_adjustments', list);
}

function getProducts() {
    return getStorage('wm_products', MASTER_PRODUCTS);
}

function saveProducts(list) {
    setStorage('wm_products', list);
}

/* ===== Formatting Utilities (Standard Khmer & Arabic Numerals) ===== */
function fmtUSD(num) {
    if (num === null || num === undefined || isNaN(num)) return '$0.00';
    return '$' + Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtNumber(num) {
    if (num === null || num === undefined || isNaN(num)) return '0';
    return Number(num).toLocaleString('en-US');
}

function fmtKhDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const months = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function fmtKhDateTime(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const months = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} · ${hh}:${mm}`;
}

/* ===== Business Logic & Calculations ===== */
function getProduct(sku) {
    return getProducts().find(p => p.sku === sku);
}

function getWarehouse(id) {
    return WAREHOUSES[id] || { id, name: id, location: '-' };
}

function totalProductStock(product) {
    return Object.values(product.stocks).reduce((sum, qty) => sum + qty, 0);
}

function getLowStockAlerts() {
    const products = getProducts();
    const alerts = [];

    products.forEach(p => {
        const total = totalProductStock(p);
        if (total <= p.min) {
            const deficit = p.min - total;
            const isCritical = total <= Math.round(p.min * 0.35);
            alerts.push({
                ...p,
                totalStock: total,
                deficit: deficit,
                urgency: isCritical ? 'critical' : 'warning',
                urgencyLabel: isCritical ? 'កម្រិតអាសន្នខ្លាំង' : 'ក្រោមចំណុចបញ្ជាទិញ',
                suggestedOrder: Math.max(p.max - total, 0)
            });
        }
    });

    return alerts.sort((a, b) => (a.urgency === 'critical' ? -1 : 1));
}

function getDashboardMetrics() {
    const products = getProducts();
    const movements = getMovements();
    const adjustments = getAdjustments();
    const alerts = getLowStockAlerts();

    let totalUnits = 0;
    let totalValuation = 0;

    products.forEach(p => {
        const stock = totalProductStock(p);
        totalUnits += stock;
        totalValuation += stock * p.mac;
    });

    const pendingAdj = adjustments.filter(a => a.status === 'pending_approval');
    const pendingMov = movements.filter(m => m.status === 'pending_approval');
    const inTransitMov = movements.filter(m => m.status === 'in_transit');

    return {
        skuCount: products.length,
        totalUnits,
        totalValuation,
        stockTurnover: 4.2,
        lowStockCount: alerts.length,
        criticalAlertCount: alerts.filter(a => a.urgency === 'critical').length,
        pendingAdjCount: pendingAdj.length,
        pendingMovCount: pendingMov.length,
        inTransitMovCount: inTransitMov.length,
        totalPendingActions: pendingAdj.length + pendingMov.length
    };
}

/* ===== Actions & Approvals ===== */
function approveAdjustment(id) {
    const list = getAdjustments();
    const item = list.find(a => a.id === id);
    if (!item) return false;

    item.status = 'approved';
    item.approver = 'គង់ វិបុល (អ្នកគ្រប់គ្រងឃ្លាំង)';
    item.approvedDate = new Date().toISOString();
    saveAdjustments(list);

    // Update product stock if applicable
    const products = getProducts();
    const p = products.find(prod => prod.sku === item.sku);
    if (p && p.stocks[item.whId] !== undefined) {
        p.stocks[item.whId] = item.physicalQty;
        saveProducts(products);
    }

    return true;
}

function rejectAdjustment(id, reason) {
    const list = getAdjustments();
    const item = list.find(a => a.id === id);
    if (!item) return false;

    item.status = 'rejected';
    item.rejectionReason = reason || 'មិនត្រូវតាមលក្ខខណ្ឌ';
    saveAdjustments(list);
    return true;
}

function approveMovement(id) {
    const list = getMovements();
    const item = list.find(m => m.id === id);
    if (!item) return false;

    item.status = 'in_transit';
    item.approver = 'គង់ វិបុល';
    saveMovements(list);
    return true;
}

function completeMovement(id) {
    const list = getMovements();
    const item = list.find(m => m.id === id);
    if (!item) return false;

    item.status = 'completed';
    saveMovements(list);

    // Apply transfer in stock balances
    const products = getProducts();
    item.items.forEach(it => {
        const prod = products.find(p => p.sku === it.sku);
        if (prod) {
            if (prod.stocks[item.fromWh] !== undefined) prod.stocks[item.fromWh] = Math.max(prod.stocks[item.fromWh] - it.qty, 0);
            if (prod.stocks[item.toWh] !== undefined) prod.stocks[item.toWh] = (prod.stocks[item.toWh] || 0) + it.qty;
        }
    });
    saveProducts(products);

    return true;
}

function createMovement(data) {
    const list = getMovements();
    const nextNum = list.length + 47;
    const newId = `TRF-2026-00${nextNum}`;

    const newMov = {
        id: newId,
        date: new Date().toISOString(),
        fromWh: data.fromWh,
        toWh: data.toWh,
        driver: data.driver || 'មិនទាន់ចាត់តាំង',
        note: data.note || '',
        requester: 'គង់ វិបុល',
        status: 'pending_approval',
        items: data.items || []
    };

    list.unshift(newMov);
    saveMovements(list);
    return newMov;
}

function createAdjustment(data) {
    const list = getAdjustments();
    const nextNum = list.length + 19;
    const newId = `ADJ-2026-00${nextNum}`;

    const prod = getProduct(data.sku);
    const unitCost = prod ? prod.mac : (data.unitCost || 0);
    const diff = data.physicalQty - data.systemQty;
    const totalDiffVal = Math.abs(diff * unitCost);
    const isEscalated = totalDiffVal > 200;

    const newAdj = {
        id: newId,
        date: new Date().toISOString(),
        whId: data.whId,
        sku: data.sku,
        systemQty: data.systemQty,
        physicalQty: data.physicalQty,
        unitCost: unitCost,
        reason: data.reason,
        reasonLabel: data.reasonLabel || data.reason,
        status: isEscalated ? 'escalated_gm' : 'pending_approval',
        reporter: 'គង់ វិបុល (អ្នកគ្រប់គ្រងឃ្លាំង)',
        note: data.note || ''
    };

    list.unshift(newAdj);
    saveAdjustments(list);
    return newAdj;
}

function totalPending() {
    const metrics = getDashboardMetrics();
    return metrics.pendingAdjCount + metrics.pendingMovCount;
}

function totalAlerts() {
    return getLowStockAlerts().length;
}

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

function portalNotifications() {
    const list = [];

    // ស្តុកក្រោមចំណុចបញ្ជាទិញ
    getLowStockAlerts().slice(0, 3).forEach(a => {
        list.push({
            icon: a.urgency === 'critical' ? 'mdi:package-variant-remove' : 'mdi:alert-outline',
            tone: a.urgency === 'critical' ? 'danger' : 'warning',
            title: `${a.name} នៅសល់ ${fmtNumber(a.totalStock)} ${a.unit}`,
            note: `${a.urgencyLabel} · ខ្វះ ${fmtNumber(a.deficit)} ${a.unit} · គួរបញ្ជាទិញបន្ថែម ${fmtNumber(a.suggestedOrder)} ${a.unit}`
        });
    });

    // ប័ណ្ណកែតម្រូវស្តុករង់ចាំការអនុម័ត
    getAdjustments()
        .filter(a => a.status === 'pending_approval' || a.status === 'escalated_gm')
        .slice(0, 3)
        .forEach(a => {
            const p = getProduct(a.sku);
            const wh = getWarehouse(a.whId);
            const diff = a.physicalQty - a.systemQty;
            list.push({
                icon: 'mdi:clipboard-edit-outline',
                tone: a.status === 'escalated_gm' ? 'danger' : 'warning',
                title: a.status === 'escalated_gm'
                    ? `ប័ណ្ណកែតម្រូវ ${a.id} បញ្ជូនទៅអភិបាលទូទៅ`
                    : `ប័ណ្ណកែតម្រូវ ${a.id} រង់ចាំអនុម័ត`,
                note: `${p ? p.name : a.sku} · ${wh ? wh.name : a.whId} · ${diff > 0 ? '+' : ''}${fmtNumber(diff)} ${p ? p.unit : ''} · ${a.reasonLabel}`,
                time: fmtKhDateTime(a.date)
            });
        });

    // ប័ណ្ណផ្ទេរស្តុករង់ចាំការអនុម័ត
    getMovements().filter(m => m.status === 'pending_approval').slice(0, 2).forEach(m => {
        const from = getWarehouse(m.fromWh);
        const to = getWarehouse(m.toWh);
        list.push({
            icon: 'mdi:swap-horizontal',
            tone: 'warning',
            title: `ប័ណ្ណផ្ទេរ ${m.id} រង់ចាំអនុម័ត`,
            note: `${from ? from.name : m.fromWh} → ${to ? to.name : m.toWh} · ${m.items.length} ប្រភេទទំនិញ · ស្នើដោយ ${m.requester}`,
            time: fmtKhDateTime(m.date)
        });
    });

    // ប័ណ្ណផ្ទេរកំពុងដឹកជញ្ជូន
    getMovements().filter(m => m.status === 'in_transit').slice(0, 2).forEach(m => {
        const to = getWarehouse(m.toWh);
        list.push({
            icon: 'mdi:truck-fast-outline',
            tone: 'info',
            title: `ប័ណ្ណផ្ទេរ ${m.id} កំពុងដឹកជញ្ជូន`,
            note: `ទិសដៅ ${to ? to.name : m.toWh} · អ្នកបើកបរ ${m.driver} · ត្រូវបញ្ជាក់ការទទួល`,
            time: fmtKhDateTime(m.date)
        });
    });

    return list;
}
