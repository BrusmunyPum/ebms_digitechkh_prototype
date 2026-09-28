/**
 * DIGITECHKH BMS - ច្រកប្រធានគណនេយ្យ (Chief Accountant Store)
 * គ្រប់គ្រងអភិបាលកិច្ចហិរញ្ញវត្ថុ, ការចាក់សោរគ្រាហិរញ្ញវត្ថុ (Period Lock),
 * មជ្ឈមណ្ឌលអនុម័ត (> $500), របាយការណ៍ហិរញ្ញវត្ថុផ្លូវការ CIFRS, និងពន្ធដារ GDT។
 */

const BMS_CA_STORAGE_KEY = 'bms_ca_store_v1';

const INITIAL_CA_STORE = {
    kpis: {
        totalCashBank: 42180.00,
        revenueMTD: 68450.00,
        revenueGrowthPct: 14.2,
        grossProfit: 26350.00,
        grossMarginPct: 38.5,
        netProfit: 14370.00,
        netProfitMarginPct: 21.0,
        totalAR: 18240.00,
        totalAP: 12600.00,
        pendingApprovalsCount: 3,
        periodLockStatus: 'unlocked', // 'locked' or 'unlocked'
        currentPeriod: 'កញ្ញា 2026',
        monthlyTrend: {
            months: ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា'],
            revenue: [45000, 48000, 52000, 49500, 56000, 59000, 61000, 64500, 68450],
            expense: [36000, 38000, 41000, 39000, 44000, 46000, 48000, 51000, 54080],
            netProfit: [9000, 10000, 11000, 10500, 12000, 13000, 13000, 13500, 14370]
        },
        bankBalances: [
            { bank: 'ធនាគារ អេប៊ីអេ (ABA USD)', account: '001 888 234', balance: 24500.00, type: 'ធនាគារ' },
            { bank: 'ធនាគារ កាណាឌីយ៉ា (Canadia USD)', account: '100 223 998', balance: 11200.00, type: 'ធនាគារ' },
            { bank: 'ធនាគារ អេស៊ីលីដា (ACLEDA KHR)', account: '010 998 776', balance: 4880.00, type: 'ធនាគារ' },
            { bank: 'បេឡាសាច់ប្រាក់ក្នុងដៃ (Petty Cash)', account: 'PC-MAIN', balance: 1600.00, type: 'សាច់ប្រាក់' }
        ]
    },

    approvals: [
        {
            id: 'APV-2026-0089',
            type: 'disbursement', // disbursement, adjustment, writeoff
            title: 'ប័ណ្ណចំណាយទូទាត់អ្នកផ្គត់ផ្គង់ (ហ៊ុន ត្រេឌីង Co., Ltd.)',
            refNo: 'DIS-2026-0089',
            requestor: 'អ៊ុំ ម៉ានី (AP/AR Accountant)',
            date: '2026-09-24',
            amount: 3377.00,
            status: 'pending', // pending, approved, rejected
            level: 'chief_accountant',
            description: 'ទូទាត់វិក្កយបត្រ BILL-2026-0044 តាមការបញ្ជាទិញ PO-2026-0044។ ផ្ទៀងផ្ទាត់ 3-Way Match ត្រូវគ្នា 100%។',
            glEntries: [
                { accountCode: '2111', accountName: 'បំណុលត្រូវសងអ្នកផ្គត់ផ្គង់ (AP)', debit: 3377.00, credit: 0.00 },
                { accountCode: '1121', accountName: 'ធនាគារ អេប៊ីអេ (ABA USD)', debit: 0.00, credit: 3377.00 }
            ]
        },
        {
            id: 'APV-2026-0088',
            type: 'disbursement',
            title: 'ប័ណ្ណចំណាយទូទាត់ (ស៊ីងហ្គាពួរ អេឡិចត្រូនិច ត្រេឌីង)',
            refNo: 'DIS-2026-0088',
            requestor: 'អ៊ុំ ម៉ានី (AP/AR Accountant)',
            date: '2026-09-21',
            amount: 6820.00,
            status: 'approved',
            level: 'general_manager',
            description: 'ទូទាត់វិក្កយបត្រ BILL-2026-0043 (Dell XPS 15 ចំនួន 4 គ្រឿង)។ Chief Accountant បានត្រួតពិនិត្យរួច។',
            glEntries: [
                { accountCode: '2111', accountName: 'បំណុលត្រូវសងអ្នកផ្គត់ផ្គង់ (AP)', debit: 6820.00, credit: 0.00 },
                { accountCode: '1121', accountName: 'ធនាគារ អេប៊ីអេ (ABA USD)', debit: 0.00, credit: 6820.00 }
            ]
        },
        {
            id: 'APV-2026-0087',
            type: 'adjustment',
            title: 'ប័ណ្ណចុះបញ្ជីកែតម្រូវ៖ រំលស់ទ្រព្យសកម្មប្រចាំត្រីមាសទី 3',
            refNo: 'JV-2026-0034',
            requestor: 'ទៀង វណ្ណារ៉ា (Chief Accountant)',
            date: '2026-09-25',
            amount: 1200.00,
            status: 'pending',
            level: 'chief_accountant',
            description: 'កត់ត្រារំលស់កុំព្យូទ័រ និងសម្ភារៈការិយាល័យ ត្រីមាសទី 3 ឆ្នាំ 2026 ស្របតាម CIFRS for SMEs។',
            glEntries: [
                { accountCode: '6112', accountName: 'ចំណាយរំលស់ទ្រព្យសកម្ម (Depreciation Expense)', debit: 1200.00, credit: 0.00 },
                { accountCode: '1520', accountName: 'រំលស់បង្គរលើបរិក្ខារការិយាល័យ (Accumulated Dep.)', debit: 0.00, credit: 1200.00 }
            ]
        },
        {
            id: 'APV-2026-0086',
            type: 'writeoff',
            title: 'សំណើសុំលុបបំណុលខូច (Bad Debt Write-off): អតិថិជន សុវណ្ណ ត្រេឌីង',
            refNo: 'WO-2026-0002',
            requestor: 'អ៊ុំ ម៉ានី (AP/AR Accountant)',
            date: '2026-09-20',
            amount: 450.00,
            status: 'pending',
            level: 'general_manager',
            description: 'បំណុលហួសកំណត់ជាង 380 ថ្ងៃ។ ក្រុមហ៊ុនក្ស័យធន មិនអាចទាក់ទងបាន។ ភ្ជាប់លិខិតទារបំណុល 3 លើក។',
            glEntries: [
                { accountCode: '1139', accountName: 'ប្រាក់បម្រុងសម្រាប់បំណុលសង្ស័យ (Allowance for Bad Debts)', debit: 450.00, credit: 0.00 },
                { accountCode: '1131', accountName: 'បំណុលត្រូវទារពីអតិថិជន (Accounts Receivable)', debit: 0.00, credit: 450.00 }
            ]
        }
    ],

    financialStatements: {
        pnl: {
            period: '1 មករា 2026 ដល់ 30 កញ្ញា 2026 (9 ខែ)',
            revenue: {
                salesRevenue: 504000.00,
                serviceRevenue: 15450.00,
                discountsGiven: -8500.00,
                totalRevenue: 510950.00
            },
            cogs: {
                openingStock: 62000.00,
                purchases: 345000.00,
                closingStock: -84500.00,
                totalCogs: 322500.00
            },
            grossProfit: 188450.00,
            opex: {
                salaries: 68000.00,
                rent: 13500.00,
                utilities: 4800.00,
                marketing: 7200.00,
                depreciation: 3600.00,
                otherAdmin: 5120.00,
                totalOpex: 102220.00
            },
            netProfitBeforeTax: 86230.00,
            taxOnIncome: 17246.00, // 20%
            netProfitAfterTax: 68984.00
        },
        balanceSheet: {
            asOfDate: '30 កញ្ញា 2026',
            currentAssets: {
                cashAndBank: 42180.00,
                accountsReceivable: 18240.00,
                inventoryValuation: 84500.00,
                prepaidExpenses: 3200.00,
                totalCurrentAssets: 148120.00
            },
            nonCurrentAssets: {
                officeEquipment: 24000.00,
                accumulatedDepreciation: -7200.00,
                netFixedAssets: 16800.00
            },
            totalAssets: 164920.00,
            currentLiabilities: {
                accountsPayable: 12600.00,
                taxPayable: 4520.00,
                accruedExpenses: 3800.00,
                totalCurrentLiabilities: 20920.00
            },
            equity: {
                shareCapital: 75000.00,
                retainedEarnings: 69000.00,
                totalEquity: 144000.00
            },
            totalLiabilitiesAndEquity: 164920.00
        },
        trialBalance: [
            { code: '1111', name: 'សាច់ប្រាក់ក្នុងដៃ (Cash on Hand)', debit: 1600.00, credit: 0.00 },
            { code: '1121', name: 'ធនាគារ អេប៊ីអេ USD (ABA Bank USD)', debit: 24500.00, credit: 0.00 },
            { code: '1122', name: 'ធនាគារ កាណាឌីយ៉ា USD (Canadia USD)', debit: 11200.00, credit: 0.00 },
            { code: '1123', name: 'ធនាគារ អេស៊ីលីដា KHR (ACLEDA KHR)', debit: 4880.00, credit: 0.00 },
            { code: '1131', name: 'បំណុលត្រូវទារពីអតិថិជន (Accounts Receivable)', debit: 18240.00, credit: 0.00 },
            { code: '1211', name: 'ស្តុកទំនិញក្នុងឃ្លាំង (Merchandise Inventory)', debit: 84500.00, credit: 0.00 },
            { code: '1511', name: 'បរិក្ខារការិយាល័យ និងកុំព្យូទ័រ (Fixed Assets)', debit: 24000.00, credit: 0.00 },
            { code: '1521', name: 'រំលស់បង្គរ (Accumulated Depreciation)', debit: 0.00, credit: 7200.00 },
            { code: '2111', name: 'បំណុលត្រូវសងអ្នកផ្គត់ផ្គង់ (Accounts Payable)', debit: 0.00, credit: 12600.00 },
            { code: '2121', name: 'អាករលើតម្លៃបន្ថែមត្រូវបង់ (VAT Output Payable)', debit: 0.00, credit: 4000.00 },
            { code: '2122', name: 'ពន្ធកាត់ទុកត្រូវបង់ (WHT Payable)', debit: 0.00, credit: 520.00 },
            { code: '3111', name: 'ដើមទុនចុះបញ្ជី (Share Capital)', debit: 0.00, credit: 75000.00 },
            { code: '3211', name: 'ប្រាក់ចំណេញរក្សាទុក (Retained Earnings)', debit: 0.00, credit: 69000.00 },
            { code: '4111', name: 'ចំណូលពីការលក់ទំនិញ (Sales Revenue)', debit: 0.00, credit: 510950.00 },
            { code: '5111', name: 'ថ្លៃដើមទំនិញលក់ (Cost of Goods Sold)', debit: 322500.00, credit: 0.00 },
            { code: '6111', name: 'ចំណាយរដ្ឋបាល និងប្រាក់បៀវត្ស (Admin & OPEX)', debit: 102220.00, credit: 0.00 },
            { code: '8111', name: 'បន្ទុកពន្ធលើប្រាក់ចំណេញ (TOI Expense)', debit: 5530.00, credit: 0.00 }
        ]
    },

    taxReturns: {
        vat: {
            month: 'កញ្ញា 2026',
            dueDate: '20 តុលា 2026',
            outputTaxableSales: 68450.00,
            outputVat10: 6845.00,
            inputTaxablePurchases: 28450.00,
            inputVat10: 2845.00,
            netVatPayable: 4000.00,
            status: 'draft'
        },
        wht: {
            month: 'កញ្ញា 2026',
            dueDate: '20 តុលា 2026',
            services15Amount: 2000.00,
            services15Tax: 300.00,
            rent10Amount: 1500.00,
            rent10Tax: 150.00,
            interestWht: 70.00,
            totalWhtPayable: 520.00,
            status: 'draft'
        }
    }
};

function getCAStore() {
    try {
        const raw = localStorage.getItem(BMS_CA_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {
        console.warn('Failed to parse CA store from localStorage:', e);
    }
    localStorage.setItem(BMS_CA_STORAGE_KEY, JSON.stringify(INITIAL_CA_STORE));
    return JSON.parse(JSON.stringify(INITIAL_CA_STORE));
}

function saveCAStore(store) {
    try {
        localStorage.setItem(BMS_CA_STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
        console.error('Failed to save CA store to localStorage:', e);
    }
}

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

const CA_APPROVAL_LABEL = {
    disbursement: 'ប័ណ្ណចំណាយទូទាត់',
    adjustment: 'ទិន្នានុប្បវត្តកែតម្រូវ',
    writeoff: 'ការលុបបំណុលជាបាត់បង់'
};

function caFmtUSD(val) {
    const n = Number(val) || 0;
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function portalNotifications() {
    const list = [];
    const store = getCAStore();
    const kpis = store.kpis;

    // សំណើរង់ចាំការអនុម័តរបស់ប្រធានគណនេយ្យ
    const pending = store.approvals
        .filter(a => a.status === 'pending')
        .sort((a, b) => (b.amount || 0) - (a.amount || 0));

    pending.slice(0, 3).forEach(a => {
        list.push({
            icon: 'mdi:file-check-outline',
            tone: (a.amount || 0) >= 1000 ? 'danger' : 'warning',
            title: `${CA_APPROVAL_LABEL[a.type] || 'សំណើ'} ${a.refNo} រង់ចាំអនុម័ត`,
            note: `${a.requestor} · ${caFmtUSD(a.amount)}`,
            time: a.date
        });
    });

    // ការប្រកាសពន្ធអាករលើតម្លៃបន្ថែម និងពន្ធកាត់ទុក
    ['vat', 'wht'].forEach(key => {
        const t = store.taxReturns[key];
        if (!t || t.status !== 'draft') return;
        list.push({
            icon: key === 'vat' ? 'mdi:percent-outline' : 'mdi:cash-minus',
            tone: 'warning',
            title: key === 'vat'
                ? `ពន្ធអាករលើតម្លៃបន្ថែម ${t.month} មិនទាន់ដាក់លិខិតប្រកាស`
                : `ពន្ធកាត់ទុក ${t.month} មិនទាន់ដាក់លិខិតប្រកាស`,
            note: `ត្រូវបង់ ${caFmtUSD(key === 'vat' ? t.netVatPayable : t.totalWhtPayable)} · ផុតកំណត់ ${t.dueDate}`
        });
    });

    // ស្ថានភាពបិទគ្រាហិរញ្ញវត្ថុ
    if (kpis.periodLockStatus !== 'locked') {
        list.push({
            icon: 'mdi:lock-open-variant-outline',
            tone: 'info',
            title: `គ្រាហិរញ្ញវត្ថុ ${kpis.currentPeriod} នៅបើកចំហ`,
            note: 'ទិន្នានុប្បវត្តនៅតែអាចកែប្រែបាន រហូតដល់បិទគ្រា'
        });
    }

    // តុល្យភាពបំណុលត្រូវទារ និងត្រូវសង
    list.push({
        icon: 'mdi:scale-balance',
        tone: kpis.totalAR > kpis.totalAP ? 'info' : 'warning',
        title: `បំណុលត្រូវទារ ${caFmtUSD(kpis.totalAR)} · ត្រូវសង ${caFmtUSD(kpis.totalAP)}`,
        note: `សាច់ប្រាក់ និងប្រាក់បញ្ញើធនាគារសរុប ${caFmtUSD(kpis.totalCashBank)}`
    });

    return list;
}
