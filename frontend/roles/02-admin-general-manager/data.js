/* ច្រកអភិបាលទូទៅ — ឃ្លាំងទិន្នន័យសាកល្បងរួម
   គ្រប់គ្រងទិន្នន័យប្រតិបត្តិការអាជីវកម្ម, មជ្ឈមណ្ឌលអនុម័ត, គណនីបុគ្គលិក, 
   ព័ត៌មានក្រុមហ៊ុន និងការកំណត់ប្រព័ន្ធ/ការបិទគ្រាគណនេយ្យ។
   រក្សាទុកស្ថានភាពក្នុង sessionStorage ដើម្បីឱ្យការធ្វើបច្ចុប្បន្នភាពមានប្រសិទ្ធភាពភ្លាមៗ។ */

const BMS_GM_TODAY = new Date(2026, 8, 23); // 23 កញ្ញា 2026

const GM_STORAGE_KEY = 'bms_gm_store_v1';

const INITIAL_GM_STORE = {
    // 1. សូចនាករយុទ្ធសាស្ត្រប្រតិបត្តិការ និងហិរញ្ញវត្ថុ
    kpis: {
        revenueMTD: 68450.00,
        revenueGrowthPct: 14.2,
        estimatedNetProfit: 14370.00,
        netProfitMarginPct: 21.0,
        cashLiquidity: 42180.00,
        cashRunwayMonths: 3.4,
        monthlyBurnRate: 12400.00,
        totalAR: 18240.00,
        overdueAR: 3120.00,
        totalAP: 12600.00,
        dueSoonAP: 4200.00,
        inventoryValuation: 84500.00,
        monthlyChart: {
            months: ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'],
            revenue: [45000, 48200, 52100, 49800, 56300, 58900, 61200, 64500, 68450, 0, 0, 0],
            expense: [36000, 38100, 41000, 39200, 44000, 46100, 48000, 50800, 54080, 0, 0, 0],
            netProfit: [9000, 10100, 11100, 10600, 12300, 12800, 13200, 13700, 14370, 0, 0, 0]
        },
        deptHealth: {
            sales: { label: 'ផ្នែកលក់', progressPct: 78, note: 'សម្រេចបាន 78% នៃគោលដៅប្រចាំខែ ($68k/$88k)', status: 'good' },
            procure: { label: 'ផ្នែកលទ្ធកម្ម', progressPct: 92, note: 'ការបញ្ជាទិញ 3 ឯកសារកំពុងរង់ចាំទំនិញចូល', status: 'good' },
            warehouse: { label: 'ផ្នែកឃ្លាំងស្តុក', progressPct: 65, note: 'ទំនិញ 12 មុខជិតអស់ពីស្តុក', status: 'warning' },
            finance: { label: 'ផ្នែកគណនេយ្យ', progressPct: 88, note: 'វិក្កយបត្រដល់ថ្ងៃទូទាត់ 4 ឯកសារ ($4.2k)', status: 'good' }
        }
    },

    // 2. ព័ត៌មានក្រុមហ៊ុន និងសាខា
    companyProfile: {
        nameKh: 'ក្រុមហ៊ុន ឌីជីថេក ខេអេច ឯ.ក',
        nameEn: 'DIGITECH KH Co., Ltd.',
        tin: 'K002-90218847',
        taxType: 'អ្នកជាប់ពន្ធធំ',
        phone: '023 999 888 / 012 345 678',
        email: 'contact@digitechkh.com',
        website: 'www.digitechkh.com',
        address: 'អគារលេខ 168 មហាវិថីព្រះសីហនុ សង្កាត់បឹងកេងកង 1 ខណ្ឌចំការមន រាជធានីភ្នំពេញ',
        logoInitial: 'ឌថ',
        directorName: 'លី ហាក់សេង',
        directorTitle: 'អភិបាលក្រុមហ៊ុន / អ្នកគ្រប់គ្រងទូទៅ',
        bankAccounts: [
            { id: 'BANK-01', bank: 'ធនាគារ អេប៊ីអេ', accNo: '001 234 567', accName: 'DIGITECH KH CO., LTD.', currency: 'USD', balance: 26450.00, isDefault: true, qr: 'ABA-KHQR-USD' },
            { id: 'BANK-02', bank: 'ធនាគារ អេប៊ីអេ', accNo: '001 234 568', accName: 'DIGITECH KH CO., LTD.', currency: 'KHR', balance: 14200000.00, isDefault: false, qr: 'ABA-KHQR-KHR' },
            { id: 'BANK-03', bank: 'ធនាគារ កាណាឌីយ៉ា', accNo: '010 888 999', accName: 'DIGITECH KH CO., LTD.', currency: 'USD', balance: 14230.00, isDefault: false, qr: null }
        ],
        branches: [
            { id: 'BR-01', name: 'ទីស្នាក់ការកណ្តាល (ភ្នំពេញ)', address: 'អគារលេខ 168 មហាវិថីព្រះសីហនុ រាជធានីភ្នំពេញ', phone: '023 999 888', manager: 'លី ហាក់សេង', staffCount: 18, status: 'active', isHQ: true },
            { id: 'BR-02', name: 'សាខាខេត្តសៀមរាប', address: 'ផ្លូវស៊ីវត្ថា ភូមិមណ្ឌល 2 សង្កាត់ស្វាយដង្គំ ក្រុងសៀមរាប', phone: '063 999 777', manager: 'ចាន់ សុផល', staffCount: 6, status: 'active', isHQ: false },
            { id: 'BR-03', name: 'ឃ្លាំងកណ្តាលឫស្សីកែវ', address: 'ផ្លូវជាតិលេខ 5 សង្កាត់គីឡូម៉ែត្រលេខ 6 ខណ្ឌឫស្សីកែវ', phone: '012 888 777', manager: 'គង់ វិបុល', staffCount: 8, status: 'active', isHQ: false }
        ]
    },

    // 3. ការកំណត់ប្រព័ន្ធ និងការបិទគ្រាគណនេយ្យ
    systemSettings: {
        exchangeRateNBC: 4100,
        exchangeRateDate: '23 កញ្ញា 2026',
        taxVAT: 10.0,
        taxWHTServices: 15.0,
        taxWHTRental: 10.0,
        thresholds: {
            poGM: 1000.00,
            disbursementGM: 500.00,
            discountGM: 10.0,
            writeoffGM: 200.00
        },
        periodLocks: [
            { year: 2026, month: 1, nameKh: 'មករា 2026', isLocked: true, lockedBy: 'លី ហាក់សេង', lockedAt: '01 កុម្ភៈ 2026, 09:30', note: 'បានប្រកាសពន្ធរួចរាល់' },
            { year: 2026, month: 2, nameKh: 'កុម្ភៈ 2026', isLocked: true, lockedBy: 'លី ហាក់សេង', lockedAt: '01 មីនា 2026, 10:15', note: 'បានប្រកាសពន្ធរួចរាល់' },
            { year: 2026, month: 3, nameKh: 'មីនា 2026', isLocked: true, lockedBy: 'លី ហាក់សេង', lockedAt: '01 មេសា 2026, 08:45', note: 'បានប្រកាសពន្ធរួចរាល់' },
            { year: 2026, month: 4, nameKh: 'មេសា 2026', isLocked: true, lockedBy: 'លី ហាក់សេង', lockedAt: '02 ឧសភា 2026, 11:20', note: 'បានប្រកាសពន្ធរួចរាល់' },
            { year: 2026, month: 5, nameKh: 'ឧសភា 2026', isLocked: true, lockedBy: 'លី ហាក់សេង', lockedAt: '01 មិថុនា 2026, 09:00', note: 'បានប្រកាសពន្ធរួចរាល់' },
            { year: 2026, month: 6, nameKh: 'មិថុនា 2026', isLocked: true, lockedBy: 'លី ហាក់សេង', lockedAt: '01 កក្កដា 2026, 14:10', note: 'បានប្រកាសពន្ធរួចរាល់' },
            { year: 2026, month: 7, nameKh: 'កក្កដា 2026', isLocked: true, lockedBy: 'លី ហាក់សេង', lockedAt: '01 សីហា 2026, 16:30', note: 'បានប្រកាសពន្ធរួចរាល់' },
            { year: 2026, month: 8, nameKh: 'សីហា 2026', isLocked: false, status: 'pending', note: 'រង់ចាំការរាយការណ៍ពន្ធអេឡិចត្រូនិកចុងខែ' },
            { year: 2026, month: 9, nameKh: 'កញ្ញា 2026', isLocked: false, status: 'open', isCurrent: true, note: 'គ្រាប្រតិបត្តិការបច្ចុប្បន្ន' },
            { year: 2026, month: 10, nameKh: 'តុលា 2026', isLocked: false, status: 'future', note: 'គ្រានាពេលអនាគត' },
            { year: 2026, month: 11, nameKh: 'វិច្ឆិកា 2026', isLocked: false, status: 'future', note: 'គ្រានាពេលអនាគត' },
            { year: 2026, month: 12, nameKh: 'ធ្នូ 2026', isLocked: false, status: 'future', note: 'គ្រានាពេលអនាគត' }
        ]
    },

    // 4. បញ្ជីសំណើអនុម័តសកល
    approvals: [
        {
            id: 'APP-2026-0038',
            type: 'disbursement',
            typeNameKh: 'ប័ណ្ណចំណាយទូទាត់',
            typeBadgeColor: 'blue',
            requesterName: 'អ៊ុំ ម៉ានី',
            requesterRole: 'គណនេយ្យករទូទាត់ និងទារបំណុល',
            requesterAvatar: 'អម',
            refCode: 'DISB-2026-0038',
            subject: 'ទូទាត់ថ្លៃទិញកុំព្យូទ័រ Dell 10 គ្រឿងជូន Smart IT Co.',
            amount: 3200.00,
            requestedDate: '23 កញ្ញា 2026, 10:15',
            status: 'pending', // pending, approved, rejected
            reason: 'វិក្កយបត្រដល់ថ្ងៃកំណត់ទូទាត់ 30 ថ្ងៃ និងបានផ្ទៀងផ្ទាត់ 3 ផ្នែករួចរាល់ 100% ជាមួយ PO-2026-0040 និង GRN-2026-0062។',
            impactAssessment: 'សាច់ប្រាក់ធនាគារបច្ចុប្បន្នមាន $42,180.00 បន្ទាប់ពីទូទាត់នៅសល់ $38,980.00 មិនប៉ះពាល់ដល់សន្ទនីយភាព 3 ខែឡើយ។',
            items: [
                { name: 'Laptop Dell Vostro 3520 (i5, 16GB, 512GB SSD)', qty: 6, unitPrice: 350.00, total: 2100.00 },
                { name: 'Dell UltraSharp 27" 4K Monitor', qty: 4, unitPrice: 275.00, total: 1100.00 }
            ],
            attachments: ['Vendor_Bill_SMART_IT_8892.pdf', 'PO_2026_0040_Signed.pdf', 'GRN_2026_0062_Warehouse.pdf'],
            timeline: [
                { action: 'បានដាក់សំណើ', actor: 'អ៊ុំ ម៉ានី (គណនេយ្យករ)', time: '23 កញ្ញា 2026, 10:15' },
                { action: 'ត្រួតពិនិត្យជំហានទី 1 រួចរាល់', actor: 'ទៀង វណ្ណារ៉ា (ប្រធានគណនេយ្យ)', time: '23 កញ្ញា 2026, 10:45' }
            ]
        },
        {
            id: 'APP-2026-0039',
            type: 'purchase_order',
            typeNameKh: 'ការបញ្ជាទិញទំនិញ',
            typeBadgeColor: 'emerald',
            requesterName: 'ហុង ដារ៉ា',
            requesterRole: 'អ្នកគ្រប់គ្រងលទ្ធកម្ម',
            requesterAvatar: 'ហដ',
            refCode: 'PO-2026-0045',
            subject: 'បញ្ជាទិញអេក្រង់ Dell UltraSharp 27" ចំនួន 30 គ្រឿង',
            amount: 4500.00,
            requestedDate: '23 កញ្ញា 2026, 09:30',
            status: 'pending',
            reason: 'ស្តុកអេក្រង់នៅសល់តែ 3 គ្រឿងប៉ុណ្ណោះក្នុងឃ្លាំង ស្របពេលដែលមានសម្រង់តម្លៃរង់ចាំផ្គត់ផ្គង់គម្រោងធនាគារ 20 គ្រឿង។',
            impactAssessment: 'ថ្លៃដើមទិញ $150.00/គ្រឿង (ទាបជាងទីផ្សារ 8%) តម្លៃលក់ចេញ $220.00 រំពឹងផលចំណេញដុល $2,100.00 (ផលចំណេញដុល 31.8%)។',
            items: [
                { name: 'Dell UltraSharp 27" IPS Monitor (U2723QE)', qty: 30, unitPrice: 150.00, total: 4500.00 }
            ],
            attachments: ['Quotation_Supplier_VireakTech.pdf', 'Stock_Reorder_Analysis.pdf'],
            timeline: [
                { action: 'បានបង្កើតការបញ្ជាទិញ', actor: 'ហុង ដារ៉ា (អ្នកគ្រប់គ្រងលទ្ធកម្ម)', time: '23 កញ្ញា 2026, 09:30' }
            ]
        },
        {
            id: 'APP-2026-0040',
            type: 'high_discount',
            typeNameKh: 'ការបញ្ចុះតម្លៃពិសេស',
            typeBadgeColor: 'purple',
            requesterName: 'ហេង វិច្ឆិកា',
            requesterRole: 'អ្នកគ្រប់គ្រងផ្នែកលក់',
            requesterAvatar: 'ហវ',
            refCode: 'QT-2026-0042',
            subject: 'ស្នើសុំបញ្ចុះតម្លៃ 15% លើសម្រង់តម្លៃទំហំ $12,000.00 ជូនធនាគារ កាណាឌីយ៉ា',
            amount: 12000.00,
            discountPct: 15.0,
            discountAmount: 1800.00,
            finalAmount: 10200.00,
            requestedDate: '22 កញ្ញា 2026, 16:40',
            status: 'pending',
            reason: 'អតិថិជនជាដៃគូយុទ្ធសាស្ត្រ VIP បានស្នើសុំបញ្ចុះតម្លៃ 15% សម្រាប់ការបញ្ជាទិញជាកញ្ចប់កុំព្យូទ័រ និង Server សាខាថ្មី។',
            impactAssessment: 'ផលចំណេញដុលដើម 28% ($3,360) ក្រោយបញ្ចុះតម្លៃនៅសល់ផលចំណេញ 15.3% ($1,560)។ មានសក្តានុពលកិច្ចសន្យាប្រចាំឆ្នាំបន្ត។',
            items: [
                { name: 'Dell PowerEdge R750 Server', qty: 1, unitPrice: 6500.00, total: 6500.00 },
                { name: 'Dell OptiPlex 7010 Desktop Complete Set', qty: 11, unitPrice: 500.00, total: 5500.00 }
            ],
            attachments: ['Quote_Draft_QT_2026_0042.pdf', 'Customer_Purchase_Commitment_Letter.pdf'],
            timeline: [
                { action: 'បានពិនិត្យ និងបញ្ជូនបន្ត', actor: 'ហេង វិច្ឆិកា (អ្នកគ្រប់គ្រងផ្នែកលក់)', time: '22 កញ្ញា 2026, 16:40' }
            ]
        },
        {
            id: 'APP-2026-0041',
            type: 'credit_override',
            typeNameKh: 'លើកលែងពិដានឥណទាន',
            typeBadgeColor: 'amber',
            requesterName: 'ហេង វិច្ឆិកា',
            requesterRole: 'អ្នកគ្រប់គ្រងផ្នែកលក់',
            requesterAvatar: 'ហវ',
            refCode: 'INV-2026-0091',
            subject: 'លើកលែងពិដានបំណុល $2,500.00 ជូនក្រុមហ៊ុន អង្គរ ត្រេឌីង (សរុប = $7,500.00)',
            amount: 2500.00,
            requestedDate: '22 កញ្ញា 2026, 14:20',
            status: 'pending',
            reason: 'អតិថិជនជំពាក់ដល់ពិដាន $5,000.00 រួចហើយ ប៉ុន្តែបានចេញមូលប្បទានបត្រធនាគាររួចរាល់ កំពុងរង់ចាំថ្ងៃបើកប្រាក់នៅថ្ងៃទី 28 កញ្ញា។',
            impactAssessment: 'ប្រវត្តិសងប្រាក់ 12 ខែកន្លងមកទៀងទាត់ 100% គ្មានប្រវត្តិកកស្ទះបំណុលឡើយ។ ហានិភ័យទាបខ្លាំង។',
            items: [
                { name: 'Network Switch Cisco Catalyst 24 Port', qty: 2, unitPrice: 850.00, total: 1700.00 },
                { name: 'Cat6 UTP Cable Box 305M', qty: 8, unitPrice: 100.00, total: 800.00 }
            ],
            attachments: ['Canadia_Bank_Cheque_Scan.pdf', 'Customer_Ledger_History.pdf'],
            timeline: [
                { action: 'បានស្នើសុំលើកលែងពិដានឥណទាន', actor: 'ហេង វិច្ឆិកា (អ្នកគ្រប់គ្រងផ្នែកលក់)', time: '22 កញ្ញា 2026, 14:20' }
            ]
        },
        {
            id: 'APP-2026-0042',
            type: 'stock_writeoff',
            typeNameKh: 'កាត់កងស្តុកខូចខាត',
            typeBadgeColor: 'rose',
            requesterName: 'គង់ វិបុល',
            requesterRole: 'អ្នកគ្រប់គ្រងឃ្លាំងស្តុក',
            requesterAvatar: 'គវ',
            refCode: 'WR-2026-0012',
            subject: 'ស្នើសុំកាត់កងម៉ាស៊ីនបោះពុម្ព និងគ្រឿងបន្លាស់ខូចទឹកភ្លៀងជ្រាប 4 មុខទំនិញ',
            amount: 1800.00,
            requestedDate: '21 កញ្ញា 2026, 11:00',
            status: 'pending',
            reason: 'ភ្លៀងធ្លាក់ខ្លាំងកាលពីយប់ថ្ងៃទី 20 កញ្ញា បណ្តាលឱ្យទឹកជ្រាបតាមដំបូលឃ្លាំងប៉ះចំប្រអប់ទំនិញបណ្តាលឱ្យសៀគ្វីខូចទាំងស្រុង។',
            impactAssessment: 'កាត់បន្ថយថ្លៃដើមស្តុក $1,800.00 កត់ត្រាចូលគណនីខាតបង់ការខូចខាតស្តុក។ ក្រុមហ៊ុនបានទាមទារសំណងធានារ៉ាប់រង Forte រួចរាល់។',
            items: [
                { name: 'HP LaserJet Pro MFP M428fdw', qty: 2, unitPrice: 450.00, total: 900.00 },
                { name: 'Epson EcoTank L3250 Color Printer', qty: 4, unitPrice: 175.00, total: 700.00 },
                { name: 'Toner Cartridge HP 58A Black', qty: 4, unitPrice: 50.00, total: 200.00 }
            ],
            attachments: ['Incident_Investigation_Report.pdf', 'Damaged_Goods_Photos.pdf', 'Forte_Insurance_Claim_Form.pdf'],
            timeline: [
                { action: 'បានបង្កើតរបាយការណ៍កាត់កង', actor: 'គង់ វិបុល (អ្នកគ្រប់គ្រងឃ្លាំង)', time: '21 កញ្ញា 2026, 11:00' }
            ]
        },
        {
            id: 'APP-2026-0043',
            type: 'void_invoice',
            typeNameKh: 'លុបចោលវិក្កយបត្រ',
            typeBadgeColor: 'slate',
            requesterName: 'សួន ស្រីពេជ្រ',
            requesterRole: 'បុគ្គលិកលក់',
            requesterAvatar: 'សស',
            refCode: 'INV-2026-0078',
            subject: 'ស្នើសុំលុបវិក្កយបត្រចេញខុសព័ត៌មានអត្តសញ្ញាណកម្មសារពើពន្ធអតិថិជន',
            amount: 850.00,
            requestedDate: '21 កញ្ញា 2026, 09:15',
            status: 'pending',
            reason: 'បុគ្គលិកបានវាយបញ្ចូលលេខអត្តសញ្ញាណកម្មសារពើពន្ធខុសមួយខ្ទង់ អតិថិជនមិនអាចយកទៅកាត់កងពន្ធបាន។ ត្រូវលុបចោល និងចេញវិក្កយបត្រថ្មីជំនួស។',
            impactAssessment: 'វិក្កយបត្រមិនទាន់បានបង់ប្រាក់ និងមិនទាន់បានប្រកាសពន្ធប្រចាំខែឡើយ គ្មានផលប៉ះពាល់ដល់ការប្រកាសពន្ធទេ។',
            items: [
                { name: 'Brother Laser Printer HL-L2320D', qty: 5, unitPrice: 170.00, total: 850.00 }
            ],
            attachments: ['Customer_Tax_Correction_Request.pdf', 'Original_Invoice_Scan.pdf'],
            timeline: [
                { action: 'ស្នើសុំលុបវិក្កយបត្រ', actor: 'សួន ស្រីពេជ្រ (បុគ្គលិកលក់)', time: '21 កញ្ញា 2026, 09:15' }
            ]
        },
        // ប្រវត្តិអនុម័តរួច
        {
            id: 'APP-2026-0035',
            type: 'disbursement',
            typeNameKh: 'ប័ណ្ណចំណាយទូទាត់',
            typeBadgeColor: 'blue',
            requesterName: 'អ៊ុំ ម៉ានី',
            requesterRole: 'គណនេយ្យករទូទាត់ និងទារបំណុល',
            requesterAvatar: 'អម',
            refCode: 'DISB-2026-0035',
            subject: 'ទូទាត់ថ្លៃជួលអគារទីស្នាក់ការកណ្តាលខែកញ្ញា 2026',
            amount: 6800.00,
            requestedDate: '18 កញ្ញា 2026, 09:00',
            status: 'approved',
            approverName: 'លី ហាក់សេង',
            decidedAt: '18 កញ្ញា 2026, 11:20',
            decisionNotes: 'បានផ្ទៀងផ្ទាត់កិច្ចសន្យាជួលត្រឹមត្រូវ។ អនុម័តផ្ទេរប្រាក់ចេញពីគណនីធនាគារ ABA។',
            reason: 'ថ្លៃឈ្នួលអគារប្រចាំខែតាមកិច្ចសន្យា រួមទាំងពន្ធកាត់ទុក 10%។',
            items: [{ name: 'ថ្លៃជួលអគារការិយាល័យកណ្តាល (កញ្ញា 2026)', qty: 1, unitPrice: 6800.00, total: 6800.00 }],
            timeline: [
                { action: 'បានដាក់សំណើ', actor: 'អ៊ុំ ម៉ានី (គណនេយ្យករ)', time: '18 កញ្ញា 2026, 09:00' },
                { action: 'បានអនុម័តជាផ្លូវការ', actor: 'លី ហាក់សេង', time: '18 កញ្ញា 2026, 11:20' }
            ]
        },
        {
            id: 'APP-2026-0036',
            type: 'purchase_order',
            typeNameKh: 'ការបញ្ជាទិញទំនិញ',
            typeBadgeColor: 'emerald',
            requesterName: 'ហុង ដារ៉ា',
            requesterRole: 'អ្នកគ្រប់គ្រងលទ្ធកម្ម',
            requesterAvatar: 'ហដ',
            refCode: 'PO-2026-0041',
            subject: 'បញ្ជាទិញ Switch Cisco Catalyst 10 គ្រឿងពី Mega Tech',
            amount: 8200.00,
            requestedDate: '19 កញ្ញា 2026, 14:00',
            status: 'approved',
            approverName: 'លី ហាក់សេង',
            decidedAt: '19 កញ្ញា 2026, 15:30',
            decisionNotes: 'អនុម័តទិញជាបន្ទាន់ដើម្បីទាន់ពេលផ្គត់ផ្គង់គម្រោងក្រសួង។',
            reason: 'គ្រឿងបន្លាស់បណ្តាញសម្រាប់គម្រោងក្រសួងអប់រំ។',
            items: [{ name: 'Cisco Catalyst 1000 Series Switch', qty: 10, unitPrice: 820.00, total: 8200.00 }],
            timeline: [
                { action: 'បានដាក់សំណើ', actor: 'ហុង ដារ៉ា (លទ្ធកម្ម)', time: '19 កញ្ញា 2026, 14:00' },
                { action: 'បានអនុម័តជាផ្លូវការ', actor: 'លី ហាក់សេង', time: '19 កញ្ញា 2026, 15:30' }
            ]
        },
        {
            id: 'APP-2026-0037',
            type: 'high_discount',
            typeNameKh: 'ការបញ្ចុះតម្លៃពិសេស',
            typeBadgeColor: 'purple',
            requesterName: 'ហេង វិច្ឆិកា',
            requesterRole: 'អ្នកគ្រប់គ្រងផ្នែកលក់',
            requesterAvatar: 'ហវ',
            refCode: 'QT-2026-0038',
            subject: 'ស្នើសុំបញ្ចុះតម្លៃ 18% ជូនអតិថិជនថ្មីលើសម្រង់តម្លៃ $8,500.00',
            amount: 8500.00,
            discountPct: 18.0,
            requestedDate: '20 កញ្ញា 2026, 10:30',
            status: 'rejected',
            approverName: 'លី ហាក់សេង',
            decidedAt: '20 កញ្ញា 2026, 14:00',
            decisionNotes: 'អត្រាចំណេញទាបពេក (ផលចំណេញដុលតិចជាង 8%) មិនអាចទទួលយកបានឡើយ។ អនុញ្ញាតឱ្យចរចាបញ្ចុះតម្លៃអតិបរមាត្រឹមតែ 10% ប៉ុណ្ណោះ។',
            reason: 'អតិថិជនទាមទារបញ្ចុះតម្លៃខ្ពស់ដើម្បីប្រកួតប្រជែងជាមួយដៃគូផ្សេង។',
            items: [{ name: 'កញ្ចប់ឧបករណ៍រឹង និងគ្រឿងបន្លាស់កុំព្យូទ័រ', qty: 1, unitPrice: 8500.00, total: 8500.00 }],
            timeline: [
                { action: 'បានដាក់សំណើ', actor: 'ហេង វិច្ឆិកា (ផ្នែកលក់)', time: '20 កញ្ញា 2026, 10:30' },
                { action: 'បានបដិសេធសំណើ', actor: 'លី ហាក់សេង', time: '20 កញ្ញា 2026, 14:00' }
            ]
        }
    ],

    // 5. បញ្ជីបុគ្គលិក និងសិទ្ធិប្រើប្រាស់
    users: [
        {
            id: 'USR-001',
            fullNameKh: 'លី ហាក់សេង',
            fullNameEn: 'Ly Hakseng',
            email: 'gm@digitechkh.com',
            phone: '012 999 888',
            roleId: 'admin_gm',
            roleNameKh: 'អភិបាលក្រុមហ៊ុន / អ្នកគ្រប់គ្រងទូទៅ',
            department: 'ថ្នាក់ដឹកនាំកំពូល',
            branchId: 'BR-01',
            branchName: 'ទីស្នាក់ការកណ្តាល (ភ្នំពេញ)',
            avatar: 'លហ',
            avatarBg: 'bg-[#1e3a5f]',
            status: 'active',
            joinedDate: '01 មករា 2023',
            lastLogin: '23 កញ្ញា 2026, 08:30',
            permissions: ['full_supreme_command', 'approve_po', 'approve_disbursement', 'approve_discount', 'period_lock', 'user_manage']
        },
        {
            id: 'USR-002',
            fullNameKh: 'ហេង វិច្ឆិកា',
            fullNameEn: 'Heng Vicheka',
            email: 'vicheka@digitechkh.com',
            phone: '012 345 678',
            roleId: 'sales_manager',
            roleNameKh: 'អ្នកគ្រប់គ្រងផ្នែកលក់',
            department: 'ផ្នែកលក់',
            branchId: 'BR-01',
            branchName: 'ទីស្នាក់ការកណ្តាល (ភ្នំពេញ)',
            avatar: 'ហវ',
            avatarBg: 'bg-emerald-600',
            status: 'active',
            joinedDate: '15 មីនា 2023',
            lastLogin: '23 កញ្ញា 2026, 09:12',
            permissions: ['sales_full', 'approve_quote_discount_10', 'view_customers', 'create_invoice']
        },
        {
            id: 'USR-003',
            fullNameKh: 'សួន ស្រីពេជ្រ',
            fullNameEn: 'Suon Sreypich',
            email: 'sreypich@digitechkh.com',
            phone: '098 765 432',
            roleId: 'sales_exec',
            roleNameKh: 'បុគ្គលិកប្រតិបត្តិផ្នែកលក់',
            department: 'ផ្នែកលក់',
            branchId: 'BR-01',
            branchName: 'ទីស្នាក់ការកណ្តាល (ភ្នំពេញ)',
            avatar: 'សស',
            avatarBg: 'bg-sky-600',
            status: 'active',
            joinedDate: '01 កក្កដា 2024',
            lastLogin: '23 កញ្ញា 2026, 08:45',
            permissions: ['create_quote', 'create_invoice', 'view_customers']
        },
        {
            id: 'USR-004',
            fullNameKh: 'ចាន់ សុផល',
            fullNameEn: 'Chan Sophal',
            email: 'sophal.sr@digitechkh.com',
            phone: '063 999 111',
            roleId: 'sales_exec',
            roleNameKh: 'បុគ្គលិកលក់ប្រចាំសាខា',
            department: 'ផ្នែកលក់',
            branchId: 'BR-02',
            branchName: 'សាខាខេត្តសៀមរាប',
            avatar: 'ចស',
            avatarBg: 'bg-sky-600',
            status: 'active',
            joinedDate: '10 តុលា 2024',
            lastLogin: '23 កញ្ញា 2026, 08:15',
            permissions: ['create_quote', 'create_invoice', 'view_customers']
        },
        {
            id: 'USR-005',
            fullNameKh: 'គង់ វិបុល',
            fullNameEn: 'Kong Vibol',
            email: 'vibol.wh@digitechkh.com',
            phone: '012 888 777',
            roleId: 'warehouse_manager',
            roleNameKh: 'អ្នកគ្រប់គ្រងឃ្លាំងស្តុក',
            department: 'ផ្នែកឃ្លាំង',
            branchId: 'BR-03',
            branchName: 'ឃ្លាំងកណ្តាលឫស្សីកែវ',
            avatar: 'គវ',
            avatarBg: 'bg-orange-600',
            status: 'active',
            joinedDate: '01 មិថុនា 2023',
            lastLogin: '23 កញ្ញា 2026, 07:45',
            permissions: ['warehouse_full', 'approve_stock_adjust_200', 'create_transfer', 'inventory_audit']
        },
        {
            id: 'USR-006',
            fullNameKh: 'សុខ ចាន់ថន',
            fullNameEn: 'Sok Chanthon',
            email: 'chanthon@digitechkh.com',
            phone: '097 555 444',
            roleId: 'warehouse_staff',
            roleNameKh: 'បុគ្គលិកជាន់ឃ្លាំង',
            department: 'ផ្នែកឃ្លាំង',
            branchId: 'BR-03',
            branchName: 'ឃ្លាំងកណ្តាលឫស្សីកែវ',
            avatar: 'សច',
            avatarBg: 'bg-amber-600',
            status: 'active',
            joinedDate: '15 វិច្ឆិកា 2024',
            lastLogin: '23 កញ្ញា 2026, 07:30',
            permissions: ['pick_and_pack', 'receive_grn', 'stock_count']
        },
        {
            id: 'USR-007',
            fullNameKh: 'ហុង ដារ៉ា',
            fullNameEn: 'Hong Dara',
            email: 'dara.po@digitechkh.com',
            phone: '010 333 222',
            roleId: 'procurement_manager',
            roleNameKh: 'អ្នកគ្រប់គ្រងលទ្ធកម្ម',
            department: 'ផ្នែកលទ្ធកម្ម',
            branchId: 'BR-01',
            branchName: 'ទីស្នាក់ការកណ្តាល (ភ្នំពេញ)',
            avatar: 'ហដ',
            avatarBg: 'bg-blue-600',
            status: 'active',
            joinedDate: '01 កុម្ភៈ 2024',
            lastLogin: '23 កញ្ញា 2026, 08:50',
            permissions: ['create_po', 'approve_po_1000', 'manage_suppliers', 'view_cost_prices']
        },
        {
            id: 'USR-008',
            fullNameKh: 'ទៀង វណ្ណារ៉ា',
            fullNameEn: 'Tieng Vannara',
            email: 'vannara.acct@digitechkh.com',
            phone: '011 444 333',
            roleId: 'chief_accountant',
            roleNameKh: 'ប្រធានគណនេយ្យ',
            department: 'ផ្នែកហិរញ្ញវត្ថុ',
            branchId: 'BR-01',
            branchName: 'ទីស្នាក់ការកណ្តាល (ភ្នំពេញ)',
            avatar: 'ទវ',
            avatarBg: 'bg-indigo-600',
            status: 'active',
            joinedDate: '01 មេសា 2023',
            lastLogin: '23 កញ្ញា 2026, 08:40',
            permissions: ['financial_full', 'review_disbursement', 'tax_filing_review', 'gl_entries']
        },
        {
            id: 'USR-009',
            fullNameKh: 'អ៊ុំ ម៉ានី',
            fullNameEn: 'Oum Many',
            email: 'many.ap@digitechkh.com',
            phone: '089 222 111',
            roleId: 'apar_accountant',
            roleNameKh: 'គណនេយ្យករទូទាត់ និងទារបំណុល',
            department: 'ផ្នែកហិរញ្ញវត្ថុ',
            branchId: 'BR-01',
            branchName: 'ទីស្នាក់ការកណ្តាល (ភ្នំពេញ)',
            avatar: 'អម',
            avatarBg: 'bg-indigo-500',
            status: 'active',
            joinedDate: '15 សីហា 2024',
            lastLogin: '23 កញ្ញា 2026, 09:05',
            permissions: ['create_disbursement', 'receive_payments', 'ar_ap_aging']
        },
        {
            id: 'USR-010',
            fullNameKh: 'លី ស្រីមុំ',
            fullNameEn: 'Ly Sreymom',
            email: 'sreymom.cs@digitechkh.com',
            phone: '016 777 888',
            roleId: 'customer_support',
            roleNameKh: 'ប្រធានផ្នែកបម្រើអតិថិជន',
            department: 'ផ្នែកគាំទ្រអតិថិជន',
            branchId: 'BR-01',
            branchName: 'ទីស្នាក់ការកណ្តាល (ភ្នំពេញ)',
            avatar: 'លស',
            avatarBg: 'bg-teal-600',
            status: 'active',
            joinedDate: '01 ឧសភា 2024',
            lastLogin: '23 កញ្ញា 2026, 08:20',
            permissions: ['support_tickets', 'order_lookup', 'delivery_tracking']
        },
        {
            id: 'USR-011',
            fullNameKh: 'កែវ សម្បត្តិ',
            fullNameEn: 'Keo Sambath',
            email: 'sambath.pos@digitechkh.com',
            phone: '092 111 333',
            roleId: 'cashier_pos',
            roleNameKh: 'អ្នកគិតលុយលក់រាយ',
            department: 'ផ្នែកលក់រាយ',
            branchId: 'BR-01',
            branchName: 'ទីស្នាក់ការកណ្តាល (ភ្នំពេញ)',
            avatar: 'កស',
            avatarBg: 'bg-emerald-500',
            status: 'active',
            joinedDate: '01 ធ្នូ 2024',
            lastLogin: '23 កញ្ញា 2026, 07:55',
            permissions: ['touch_pos', 'cash_drawer', 'print_receipt']
        },
        {
            id: 'USR-012',
            fullNameKh: 'ប៉ែន វុទ្ធី',
            fullNameEn: 'Pen Vuthy',
            email: 'vuthy.former@digitechkh.com',
            phone: '078 999 000',
            roleId: 'sales_exec',
            roleNameKh: 'បុគ្គលិកលក់ (លាឈប់)',
            department: 'ផ្នែកលក់',
            branchId: 'BR-01',
            branchName: 'ទីស្នាក់ការកណ្តាល (ភ្នំពេញ)',
            avatar: 'បវ',
            avatarBg: 'bg-slate-400',
            status: 'suspended',
            joinedDate: '01 មករា 2024',
            lastLogin: '10 សីហា 2026, 17:00',
            permissions: []
        }
    ]
};

// ===== DATA STORE ACCESS & PERSISTENCE HELPERS =====

function getGMStore() {
    try {
        const stored = sessionStorage.getItem(GM_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading GM store from sessionStorage:', e);
    }
    // Save initial store
    sessionStorage.setItem(GM_STORAGE_KEY, JSON.stringify(INITIAL_GM_STORE));
    return JSON.parse(JSON.stringify(INITIAL_GM_STORE));
}

function saveGMStore(store) {
    try {
        sessionStorage.setItem(GM_STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
        console.error('Error saving GM store to sessionStorage:', e);
    }
}

// ===== APPROVALS API =====

function getApprovals(filterType = 'all', filterStatus = 'all') {
    const store = getGMStore();
    let list = store.approvals || [];

    if (filterType !== 'all') {
        list = list.filter(item => item.type === filterType);
    }
    if (filterStatus !== 'all') {
        list = list.filter(item => item.status === filterStatus);
    }
    return list;
}

function getApprovalById(id) {
    const store = getGMStore();
    return (store.approvals || []).find(item => item.id === id) || null;
}

function approveRequest(id, decisionNotes = '') {
    const store = getGMStore();
    const item = (store.approvals || []).find(a => a.id === id);
    if (!item) return { success: false, message: 'រកមិនឃើញសំណើនេះឡើយ' };

    item.status = 'approved';
    item.approverName = 'លី ហាក់សេង';
    item.decidedAt = '23 កញ្ញា 2026, 11:30';
    item.decisionNotes = decisionNotes || 'បានអនុម័តជាផ្លូវការដោយអភិបាលទូទៅ';
    item.timeline = item.timeline || [];
    item.timeline.push({
        action: 'បានអនុម័តជាផ្លូវការ',
        actor: 'លី ហាក់សេង',
        time: '23 កញ្ញា 2026, 11:30'
    });

    saveGMStore(store);
    return { success: true, item };
}

function rejectRequest(id, rejectReason = '') {
    const store = getGMStore();
    const item = (store.approvals || []).find(a => a.id === id);
    if (!item) return { success: false, message: 'រកមិនឃើញសំណើនេះឡើយ' };

    item.status = 'rejected';
    item.approverName = 'លី ហាក់សេង';
    item.decidedAt = '23 កញ្ញា 2026, 11:30';
    item.decisionNotes = rejectReason || 'សំណើត្រូវបានបដិសេធដោយអភិបាលទូទៅ';
    item.timeline = item.timeline || [];
    item.timeline.push({
        action: 'បានបដិសេធសំណើ',
        actor: 'លី ហាក់សេង',
        time: '23 កញ្ញា 2026, 11:30'
    });

    saveGMStore(store);
    return { success: true, item };
}

// ===== USERS API =====

function getUsers(filterRole = 'all', filterBranch = 'all', filterStatus = 'all') {
    const store = getGMStore();
    let list = store.users || [];

    if (filterRole !== 'all') {
        list = list.filter(u => u.roleId === filterRole);
    }
    if (filterBranch !== 'all') {
        list = list.filter(u => u.branchId === filterBranch);
    }
    if (filterStatus !== 'all') {
        list = list.filter(u => u.status === filterStatus);
    }
    return list;
}

function getUserById(id) {
    const store = getGMStore();
    return (store.users || []).find(u => u.id === id) || null;
}

function saveUser(userData) {
    const store = getGMStore();
    store.users = store.users || [];

    const existingIndex = store.users.findIndex(u => u.id === userData.id);
    if (existingIndex >= 0) {
        store.users[existingIndex] = { ...store.users[existingIndex], ...userData };
    } else {
        const newId = `USR-${String(store.users.length + 1).padStart(3, '0')}`;
        userData.id = newId;
        userData.status = userData.status || 'active';
        userData.joinedDate = '23 កញ្ញា 2026';
        userData.lastLogin = 'មិនទាន់ចូលប្រព័ន្ធ';
        userData.avatar = userData.fullNameKh ? userData.fullNameKh.split(' ').map(w => w[0]).join('') : 'បក';
        userData.avatarBg = 'bg-[#1e3a5f]';
        store.users.unshift(userData);
    }

    saveGMStore(store);
    return { success: true, user: userData };
}

function toggleUserStatus(id) {
    const store = getGMStore();
    const user = (store.users || []).find(u => u.id === id);
    if (!user) return { success: false, message: 'រកមិនឃើញគណនីនេះឡើយ' };

    user.status = user.status === 'active' ? 'suspended' : 'active';
    saveGMStore(store);
    return { success: true, status: user.status };
}

// ===== COMPANY PROFILE API =====

function getCompanyProfile() {
    const store = getGMStore();
    return store.companyProfile || {};
}

function saveCompanyProfile(profileData) {
    const store = getGMStore();
    store.companyProfile = { ...store.companyProfile, ...profileData };
    saveGMStore(store);
    return { success: true, profile: store.companyProfile };
}

// ===== SYSTEM SETTINGS & PERIOD LOCK API =====

function getSystemSettings() {
    const store = getGMStore();
    return store.systemSettings || {};
}

function saveSystemSettings(settingsData) {
    const store = getGMStore();
    store.systemSettings = { ...store.systemSettings, ...settingsData };
    saveGMStore(store);
    return { success: true, settings: store.systemSettings };
}

function togglePeriodLock(year, month) {
    const store = getGMStore();
    const period = (store.systemSettings.periodLocks || []).find(p => p.year === Number(year) && p.month === Number(month));
    if (!period) return { success: false, message: 'រកមិនឃើញគ្រាហិរញ្ញវត្ថុនេះឡើយ' };

    period.isLocked = !period.isLocked;
    if (period.isLocked) {
        period.lockedBy = 'លី ហាក់សេង';
        period.lockedAt = '23 កញ្ញា 2026, 11:30';
        period.note = 'បានចាក់សោរគ្រាហិរញ្ញវត្ថុផ្លូវការ';
    } else {
        period.unlockedBy = 'លី ហាក់សេង';
        period.unlockedAt = '23 កញ្ញា 2026, 11:30';
        period.note = 'បានដោះសោរបណ្តោះអាសន្នសម្រាប់ការកែសម្រួលសវនកម្ម';
    }

    saveGMStore(store);
    return { success: true, period };
}

// ===== FORMATTING UTILITIES (100% Khmer with English Numerals 0-9) =====

function fmtCurrencyKh(amount, currency = 'USD') {
    const num = Number(amount) || 0;
    if (currency === 'KHR') {
        return num.toLocaleString('en-US') + ' ៛';
    }
    return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPercent(num) {
    return (Number(num) || 0).toFixed(1) + '%';
}

function fmtDateKh(dateStr) {
    if (!dateStr) return '';
    return String(dateStr);
}

// ធ្វើឱ្យមានសកលសម្រាប់ Window
window.BMS_GM = {
    getGMStore,
    saveGMStore,
    getApprovals,
    getApprovalById,
    approveRequest,
    rejectRequest,
    getUsers,
    getUserById,
    saveUser,
    toggleUserStatus,
    getCompanyProfile,
    saveCompanyProfile,
    getSystemSettings,
    saveSystemSettings,
    togglePeriodLock,
    fmtCurrencyKh,
    fmtPercent,
    fmtDateKh
};

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

function portalNotifications() {
    const list = [];
    const store = getGMStore();
    const kpis = store.kpis;

    // សំណើរង់ចាំការអនុម័តរបស់អភិបាលទូទៅ
    const pending = store.approvals
        .filter(a => a.status === 'pending')
        .sort((a, b) => (b.amount || 0) - (a.amount || 0));

    pending.slice(0, 3).forEach(a => {
        list.push({
            icon: 'mdi:clipboard-check-outline',
            tone: (a.amount || 0) >= 1000 ? 'danger' : 'warning',
            title: `${a.typeNameKh} ${a.refCode} រង់ចាំអនុម័ត`,
            note: `${a.requesterName} (${a.requesterRole}) · ${fmtCurrencyKh(a.amount)}`,
            time: a.requestedDate
        });
    });

    if (pending.length > 3) {
        list.push({
            icon: 'mdi:inbox-full-outline',
            tone: 'info',
            title: `មានសំណើរង់ចាំការអនុម័តសរុប ${pending.length}`,
            note: `ទឹកប្រាក់សរុប ${fmtCurrencyKh(pending.reduce((s, a) => s + (a.amount || 0), 0))}`
        });
    }

    // បំណុលត្រូវទារហួសកាលកំណត់
    if (kpis.overdueAR > 0) {
        list.push({
            icon: 'mdi:cash-clock',
            tone: 'danger',
            title: `បំណុលត្រូវទារហួសកាលកំណត់ ${fmtCurrencyKh(kpis.overdueAR)}`,
            note: `គិតជា ${fmtPercent(kpis.overdueAR / kpis.totalAR * 100)} នៃបំណុលត្រូវទារសរុប ${fmtCurrencyKh(kpis.totalAR)}`
        });
    }

    // បំណុលត្រូវសងជិតដល់កាលកំណត់
    if (kpis.dueSoonAP > 0) {
        list.push({
            icon: 'mdi:file-document-arrow-right-outline',
            tone: 'warning',
            title: `បំណុលត្រូវសងជិតដល់កំណត់ ${fmtCurrencyKh(kpis.dueSoonAP)}`,
            note: `បំណុលត្រូវសងសរុប ${fmtCurrencyKh(kpis.totalAP)} · សាច់ប្រាក់ងាយស្រួល ${fmtCurrencyKh(kpis.cashLiquidity)}`
        });
    }

    // សមត្ថភាពសាច់ប្រាក់
    if (kpis.cashRunwayMonths < 6) {
        list.push({
            icon: 'mdi:gauge-low',
            tone: kpis.cashRunwayMonths < 3 ? 'danger' : 'warning',
            title: `សាច់ប្រាក់គ្រប់ប្រើបាន ${kpis.cashRunwayMonths} ខែ`,
            note: `ចំណាយប្រចាំខែជាមធ្យម ${fmtCurrencyKh(kpis.monthlyBurnRate)}`
        });
    }

    // គ្រាហិរញ្ញវត្ថុដែលមិនទាន់បិទបញ្ជី
    (store.systemSettings.periodLocks || [])
        .filter(p => !p.isLocked && p.status === 'pending')
        .forEach(p => {
            list.push({
                icon: 'mdi:lock-open-alert-outline',
                tone: 'warning',
                title: `គ្រា ${p.nameKh} មិនទាន់បិទបញ្ជី`,
                note: p.note || 'សូមបិទគ្រាបន្ទាប់ពីប្រកាសពន្ធរួចរាល់'
            });
        });

    // គណនីបុគ្គលិកដែលត្រូវបានផ្អាក
    const suspended = store.users.filter(u => u.status === 'suspended');
    if (suspended.length) {
        list.push({
            icon: 'mdi:account-lock-outline',
            tone: 'info',
            title: `គណនីបុគ្គលិកត្រូវបានផ្អាក ${suspended.length}`,
            note: suspended.map(u => u.fullNameKh).join(' · ')
        });
    }

    return list;
}
