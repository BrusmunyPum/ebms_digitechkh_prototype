/**
 * ច្រកបម្រើ និងគាំទ្រអតិថិជន — ទិន្នន័យគំរូ និងម៉ាស៊ីនដំណើរការ (Customer Support Data)
 * Data Scope: Read-Only លើវិក្កយបត្រ, តាមដានអ្នកដឹក, ដោះស្រាយបណ្តឹង Tickets, និង Zero Margin/Cost Leakage
 */

const CUSTOMER_SUPPORT_STORAGE_KEY = 'digitechkh_bms_customer_support_data';

const DEFAULT_CUSTOMER_SUPPORT_DATA = {
    userProfile: {
        id: 'CS-012',
        name: 'លី ស្រីមុំ',
        role: 'បុគ្គលិកបម្រើអតិថិជន',
        channel: 'តេឡេក្រាម និងទូរស័ព្ទទាន់ហេតុការណ៍'
    },
    // បញ្ជីសំបុត្របណ្តឹង និងសំណើជំនួយ
    tickets: [
        {
            id: 'TCK-2026-081',
            customerName: 'អ៊ុច វ៉ាន់ដា',
            phone: '012 345 678',
            channel: 'តេឡេក្រាម',
            category: 'សាកសួរទីតាំងដឹកជញ្ជូន',
            priority: 'បន្ទាន់',
            status: 'pending', // pending, in_progress, resolved
            createdAt: '2026-09-23 09:10',
            slaMinutesRemaining: 25,
            relatedInvoice: 'INV-2026-0891',
            subject: 'អតិថិជនសួរនាំអំពីម៉ោងមកដល់របស់ឡានដឹកទំនិញ',
            messages: [
                { sender: 'customer', text: 'សួស្តីបង ខ្ញុំបានកុម្ម៉ង់ទូរទស្សន៍ព្រឹកមិញ តើឡានដឹកមកដល់ម៉ោងប៉ុន្មានដែរ?', time: '09:10' }
            ],
            internalNotes: 'បានពិនិត្យឃើញអ្នកដឹកលេខ 2E-9932 កំពុងធ្វើដំណើរលើផ្លូវ 271'
        },
        {
            id: 'TCK-2026-080',
            customerName: 'ហាងលក់គ្រឿងបន្លាស់ ម៉េងហួរ',
            phone: '098 765 432',
            channel: 'ទូរស័ព្ទផ្ទាល់',
            category: 'ស្នើសុំប្តូរទំនិញថ្មី',
            priority: 'បន្ទាន់ខ្លាំង',
            status: 'in_progress',
            createdAt: '2026-09-23 08:35',
            slaMinutesRemaining: 15,
            relatedInvoice: 'INV-2026-0885',
            subject: 'កង្ហារបញ្ឈរមានស្នាមប្រេះកង្ហារពេលបកកេស',
            messages: [
                { sender: 'customer', text: 'ពេលទទួលកង្ហារមក ឃើញស្លាបកង្ហារប្រេះ ខ្ញុំចង់ប្តូរថ្មីមួយគ្រឿងបង', time: '08:35' },
                { sender: 'support', text: 'ជម្រាបសួរលោកម្ចាស់ហាង! ខាងប្អូនបានទទួលរូបភាព និងបញ្ជូនសំណើទៅឃ្លាំងដើម្បីត្រៀមដូរជូនហើយ', time: '08:42' }
            ],
            internalNotes: 'បានដាក់សំណើ RMA-2026-019 ទៅកាន់អ្នកគ្រប់គ្រងឃ្លាំងរួចរាល់'
        },
        {
            id: 'TCK-2026-078',
            customerName: 'គ្លីនិក សុខភាពល្អ',
            phone: '077 889 900',
            channel: 'មកផ្ទាល់ / ទូរស័ព្ទបន្ទាន់',
            category: 'សុំចម្លងវិក្កយបត្រពន្ធ',
            priority: 'ធម្មតា',
            status: 'resolved',
            createdAt: '2026-09-22 16:20',
            slaMinutesRemaining: 0,
            relatedInvoice: 'INV-2026-0870',
            subject: 'សុំទាញយកវិក្កយបត្រពន្ធឡើងវិញ',
            messages: [
                { sender: 'customer', text: 'សុំវិក្កយបត្រសម្រាប់ខែមុនផងបង', time: '16:20' },
                { sender: 'support', text: 'បានផ្ញើឯកសារផ្លូវការចូលតេឡេក្រាមរួចរាល់ហើយបង។ អរគុណច្រើន!', time: '16:28' }
            ],
            internalNotes: 'បានទាញយកវិក្កយបត្រពីផ្ទាំងស្វែងរកវិក្កយបត្រ ហើយបញ្ជូនជូនអតិថិជន'
        }
    ],
    // មូលដ្ឋានទិន្នន័យស្វែងរកវិក្កយបត្រ
    orders: [
        {
            invoiceId: 'INV-2026-0891',
            orderNo: 'SO-2026-1042',
            date: '2026-09-23',
            customerName: 'អ៊ុច វ៉ាន់ដា',
            phone: '012 345 678',
            address: 'ផ្ទះលេខ 12Eo ផ្លូវ 271 សង្កាត់ទឹកល្អក់3 ខណ្ឌទួលគោក ភ្នំពេញ',
            paymentStatus: 'បានបង់ប្រាក់រួច (បាគង)',
            deliveryStatus: 'out_for_delivery', // packing, dispatched, out_for_delivery, delivered
            salesRep: 'ហេង វិច្ឆិកា',
            driverName: 'កែវ សំណាង (011 223 344)',
            vehiclePlate: 'ភ្នំពេញ 2E-9932 (ម៉ូតូរឺម៉ក)',
            items: [
                { sku: 'SKU-001', name: 'ម៉ាស៊ីនត្រជាក់ 1.5HP', qty: 2, unitPrice: 380.00, total: 760.00 },
                { sku: 'SKU-005', name: 'កង្ហារបញ្ឈរតេឡេបញ្ជា', qty: 3, unitPrice: 35.00, total: 105.00 }
            ],
            grandTotal: 865.00
        },
        {
            invoiceId: 'INV-2026-0885',
            orderNo: 'SO-2026-1035',
            date: '2026-09-22',
            customerName: 'ហាងលក់គ្រឿងបន្លាស់ ម៉េងហួរ',
            phone: '098 765 432',
            address: 'បុរីពិភពថ្មី ចំការដូង ផ្ទះលេខ 45 ផ្លូវ 03',
            paymentStatus: 'បានបង់ប្រាក់រួច (សាច់ប្រាក់)',
            deliveryStatus: 'delivered',
            salesRep: 'ស៊ុន ចាន់ដារ៉ា',
            driverName: 'ជា សុផាត (016 554 433)',
            vehiclePlate: 'ភ្នំពេញ 2B-8941 (រថយន្តដឹក)',
            items: [
                { sku: 'SKU-005', name: 'កង្ហារបញ្ឈរតេឡេបញ្ជា', qty: 10, unitPrice: 35.00, total: 350.00 }
            ],
            grandTotal: 350.00
        },
        {
            invoiceId: 'INV-2026-0894',
            orderNo: 'SO-2026-1048',
            date: '2026-09-23',
            customerName: 'ក្រុមហ៊ុន គឹមសេង ត្រេឌីង',
            phone: '085 123 999',
            address: 'ក្រុងសៀមរាប ផ្ញើតាមឡានក្រុងវីរៈប៊ុនថាំ',
            paymentStatus: 'ជំពាក់ (រយៈពេល 30 ថ្ងៃ)',
            deliveryStatus: 'dispatched',
            salesRep: 'ហេង វិច្ឆិកា',
            driverName: 'ម៉េង ហុង (092 887 766)',
            vehiclePlate: 'ភ្នំពេញ 3A-1102 (ឡានដឹកធំ)',
            items: [
                { sku: 'SKU-002', name: 'ទូរទស្សន៍ឆ្លាតវៃ 55 អ៊ីញ', qty: 4, unitPrice: 420.00, total: 1680.00 },
                { sku: 'SKU-006', name: 'ឆ្នាំងដាំបាយអេឡិចត្រូនិច 1.8L', qty: 5, unitPrice: 28.00, total: 140.00 }
            ],
            grandTotal: 1820.00
        }
    ],
    // បញ្ជីតាមដានការដឹកជញ្ជូនជាក់ស្តែង
    deliveries: [
        {
            trackingCode: 'TRK-2026-091',
            invoiceId: 'INV-2026-0891',
            customerName: 'អ៊ុច វ៉ាន់ដា',
            phone: '012 345 678',
            destination: 'ខណ្ឌទួលគោក ភ្នំពេញ',
            driverName: 'កែវ សំណាង',
            driverPhone: '011 223 344',
            vehicle: 'ម៉ូតូរឺម៉កដឹក (2E-9932)',
            currentStage: 3, // 1: Packed, 2: Dispatched, 3: Out for delivery, 4: Delivered
            stageLabels: ['បានវេចខ្ចប់', 'បានចេញពីឃ្លាំង', 'កំពុងធ្វើដំណើរជិតដល់', 'បានប្រគល់ជោគជ័យ'],
            estimatedArrival: '10:45 ព្រឹក ថ្ងៃនេះ',
            lastUpdated: '10:05 ព្រឹក (នៅជិតស្តុបផ្សារដើមគ)',
            itemsCount: 5
        },
        {
            trackingCode: 'TRK-2026-092',
            invoiceId: 'INV-2026-0894',
            customerName: 'ក្រុមហ៊ុន គឹមសេង ត្រេឌីង',
            phone: '085 123 999',
            destination: 'ស្ថានីយ៍ឡានក្រុងវីរៈប៊ុនថាំ (ទៅសៀមរាប)',
            driverName: 'ម៉េង ហុង',
            driverPhone: '092 887 766',
            vehicle: 'រថយន្តដឹកធំ (3A-1102)',
            currentStage: 2,
            stageLabels: ['បានវេចខ្ចប់', 'បានចេញពីឃ្លាំង', 'កំពុងធ្វើដំណើរជិតដល់', 'បានប្រគល់ជោគជ័យ'],
            estimatedArrival: '11:30 ព្រឹក ថ្ងៃនេះ',
            lastUpdated: '09:50 ព្រឹក (ចេញពីឃ្លាំងកណ្តាល)',
            itemsCount: 9
        },
        {
            trackingCode: 'TRK-2026-088',
            invoiceId: 'INV-2026-0885',
            customerName: 'ហាងលក់គ្រឿងបន្លាស់ ម៉េងហួរ',
            phone: '098 765 432',
            destination: 'បុរីពិភពថ្មី ចំការដូង',
            driverName: 'ជា សុផាត',
            driverPhone: '016 554 433',
            vehicle: 'រថយន្តដឹក (2B-8941)',
            currentStage: 4,
            stageLabels: ['បានវេចខ្ចប់', 'បានចេញពីឃ្លាំង', 'កំពុងធ្វើដំណើរជិតដល់', 'បានប្រគល់ជោគជ័យ'],
            estimatedArrival: 'បានប្រគល់រួច',
            lastUpdated: 'ម្សិលមិញ 16:30',
            itemsCount: 10
        }
    ]
};

function getCustomerSupportData() {
    try {
        const data = sessionStorage.getItem(CUSTOMER_SUPPORT_STORAGE_KEY);
        if (data) return JSON.parse(data);
    } catch (e) {
        console.warn('SessionStorage not available, using default support data');
    }
    return DEFAULT_CUSTOMER_SUPPORT_DATA;
}

function saveCustomerSupportData(data) {
    try {
        sessionStorage.setItem(CUSTOMER_SUPPORT_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving customer support data', e);
    }
}

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

function portalNotifications() {
    const list = [];
    const data = getCustomerSupportData();

    // សំបុត្រជំនួយដែលជិតហួសកាលកំណត់ឆ្លើយតប
    (data.tickets || [])
        .filter(t => t.status !== 'closed')
        .sort((a, b) => (a.slaMinutesRemaining || 0) - (b.slaMinutesRemaining || 0))
        .slice(0, 3)
        .forEach(t => {
            const late = (t.slaMinutesRemaining || 0) <= 0;
            const soon = (t.slaMinutesRemaining || 0) <= 30;
            list.push({
                icon: late ? 'mdi:timer-alert-outline' : 'mdi:ticket-confirmation-outline',
                tone: late ? 'danger' : (soon ? 'warning' : 'info'),
                title: late
                    ? `សំបុត្រ ${t.id} ហួសកាលកំណត់ឆ្លើយតប`
                    : `សំបុត្រ ${t.id} នៅសល់ ${t.slaMinutesRemaining} នាទី`,
                note: `${t.customerName} · ${t.channel} · ${t.category} · អាទិភាព ${t.priority}`,
                time: t.createdAt
            });
        });

    // ការដឹកជញ្ជូនដែលកំពុងដំណើរការ
    (data.deliveries || []).forEach(d => {
        const stageLabel = (d.stageLabels || [])[d.currentStage] || '';
        const done = d.currentStage >= (d.stageLabels || []).length - 1;
        if (done) return;
        list.push({
            icon: 'mdi:map-marker-path',
            tone: 'info',
            title: `${d.trackingCode} · ${stageLabel}`,
            note: `${d.customerName} · ${d.destination} · អ្នកបើកបរ ${d.driverName} (${d.driverPhone}) · រំពឹងដល់ ${d.estimatedArrival}`,
            time: d.lastUpdated
        });
    });

    // ការបញ្ជាទិញដែលនៅរង់ចាំការទូទាត់
    (data.orders || [])
        .filter(o => !String(o.paymentStatus || '').includes('រួច'))
        .slice(0, 2)
        .forEach(o => {
            list.push({
                icon: 'mdi:cash-clock',
                tone: 'warning',
                title: `${o.orderNo} មិនទាន់ទូទាត់ពេញ`,
                note: `${o.customerName} · ${o.phone} · ${o.paymentStatus}`,
                time: o.date
            });
        });

    return list;
}
