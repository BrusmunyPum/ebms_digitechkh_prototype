/* ច្រកសវនករផ្ទៃក្នុង / នាយកប្រតិបត្តិ — ឃ្លាំងទិន្នន័យសាកល្បងរួម
   គ្រប់គ្រងទិន្នន័យត្រួតពិនិត្យសវនកម្មសកល, កំណត់ហេតុដែលមិនអាចលុបបាន,
   ភាពមិនប្រក្រតីនៃការគ្រប់គ្រងផ្ទៃក្នុង, និងរបាយការណ៍ហិរញ្ញវត្ថុផ្លូវការ។
   គោលការណ៍កាតព្វកិច្ច៖ មើលឃើញទិន្នន័យ ១០០% (Strict Read-Only) គ្មានសិទ្ធិកែប្រែប្រតិបត្តិការឡើយ។ */

const BMS_IA_STORAGE_KEY = 'bms_ia_store_v1';

const INITIAL_IA_STORE = {
    // ១. សូចនាករយុទ្ធសាស្ត្រប្រតិបត្តិការ និងហិរញ្ញវត្ថុ
    kpis: {
        revenueMTD: 68450.00,
        revenueGrowthPct: 14.2,
        cogsMTD: 42100.00,
        grossProfit: 26350.00,
        grossMarginPct: 38.5,
        opexMTD: 11980.00,
        netProfit: 14370.00,
        netProfitMarginPct: 21.0,
        cashLiquidity: 42180.00,
        activeExceptionsCount: 4,
        inventoryValuation: 84500.00,
        totalAR: 18240.00,
        overdueAR: 3120.00,
        totalAP: 12600.00,
        monthlyChart: {
            months: ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា'],
            revenue: [45000, 48000, 52000, 49500, 56000, 59000, 61000, 64500, 68450],
            expense: [36000, 38000, 41000, 39000, 44000, 46000, 48000, 51000, 54080],
            netProfit: [9000, 10000, 11000, 10500, 12000, 13000, 13000, 13500, 14370]
        }
    },

    // ២. បញ្ជីរំលេចសកម្មភាពប្រកបដោយហានិភ័យបន្ទាន់ (Red Flags & Anomalies Feed)
    redFlags: [
        {
            id: 'RF-01',
            code: 'INV-2026-0120',
            title: 'ការបញ្ចុះតម្លៃពិសេស 25% លើសពិដានកំណត់',
            category: 'ការលក់',
            severity: 'critical',
            severityKh: 'ហានិភ័យខ្ពស់',
            detectedAt: '23 កញ្ញា 2026, 14:23',
            amount: 1250.00,
            description: 'វិក្កយបត្រត្រូវបានកែប្រែបញ្ចុះតម្លៃពី 5% ទៅ 25% ដោយគ្មានលិខិតយោងអនុម័តពីអភិបាលទូទៅឡើយ។',
            actor: 'ហេង វិច្ឆិកា',
            role: 'ផ្នែកលក់',
            ip: '192.168.1.45',
            status: 'investigating'
        },
        {
            id: 'RF-02',
            code: 'POS-2026-0418',
            title: 'ការលុបចោលវិក្កយបត្រក្រោយការស្កេនទូទាត់ប្រាក់',
            category: 'បញ្ជរលក់រាយ',
            severity: 'critical',
            severityKh: 'ហានិភ័យខ្ពស់',
            detectedAt: '23 កញ្ញា 2026, 11:45',
            amount: 145.00,
            description: 'អ្នកគិតប្រាក់បានលុបចោលវិក្កយបត្រ បន្ទាប់ពីប្រព័ន្ធធនាគារកត់ត្រាការទូទាត់រួចរាល់។',
            actor: 'ចាន់ ធីតា',
            role: 'អ្នកគិតប្រាក់',
            ip: '192.168.1.88',
            status: 'open'
        },
        {
            id: 'RF-03',
            code: 'PO-2026-0045',
            title: 'ភាពមិនស៊ីគ្នានៃការផ្ទៀងផ្ទាត់ 3 ច្រក',
            category: 'លទ្ធកម្ម',
            severity: 'warning',
            severityKh: 'ហានិភ័យមធ្យម',
            detectedAt: '22 កញ្ញា 2026, 16:10',
            amount: 850.00,
            description: 'ការបញ្ជាទិញ 100 គ្រឿង ឃ្លាំងទទួល 90 គ្រឿង ប៉ុន្តែវិក្កយបត្រអ្នកផ្គត់ផ្គង់ទារប្រាក់ពេញ 100 គ្រឿង។',
            actor: 'ហុង ដារ៉ា',
            role: 'ផ្នែកលទ្ធកម្ម',
            ip: '192.168.1.32',
            status: 'investigating'
        },
        {
            id: 'RF-04',
            code: 'CSH-2026-0089',
            title: 'ភាពខុសគ្នានៃសាច់ប្រាក់បិទវេន 3 ថ្ងៃជាប់គ្នា',
            category: 'បេឡាសាច់ប្រាក់',
            severity: 'warning',
            severityKh: 'ហានិភ័យមធ្យម',
            detectedAt: '22 កញ្ញា 2026, 20:30',
            amount: 37.50,
            description: 'សាច់ប្រាក់ជាក់ស្តែងក្នុងថតបេឡាខ្វះជាងតួលេខក្នុងប្រព័ន្ធជាមធ្យម $12.50 ក្នុងមួយវេន។',
            actor: 'ស៊្រុន ផល្លា',
            role: 'អ្នកគិតប្រាក់',
            ip: '192.168.1.90',
            status: 'open'
        }
    ],

    // ៣. កំណត់ហេតុសវនកម្មសកល (Global Immutable Audit Trails)
    auditLogs: [
        {
            id: 'AUD-2026-0042',
            timestamp: '23 កញ្ញា 2026, 14:23:05',
            user: 'ហេង វិច្ឆិកា',
            role: 'ផ្នែកលក់',
            avatar: 'ហវ',
            module: 'sales',
            moduleKh: 'ផ្នែកលក់',
            action: 'update',
            actionKh: 'កែប្រែទិន្នន័យ',
            refCode: 'INV-2026-0120',
            diffSummary: 'កែប្រែបញ្ចុះតម្លៃពី 5.0% ទៅ 25.0% (ទឹកប្រាក់ -$250.00)',
            oldValue: 'បញ្ចុះតម្លៃ 5% ($50.00) • ទឹកប្រាក់សរុប $950.00',
            newValue: 'បញ្ចុះតម្លៃ 25% ($250.00) • ទឹកប្រាក់សរុប $750.00',
            ipAddress: '192.168.1.45',
            severity: 'critical',
            isSuspicious: true
        },
        {
            id: 'AUD-2026-0041',
            timestamp: '23 កញ្ញា 2026, 11:45:18',
            user: 'ចាន់ ធីតា',
            role: 'អ្នកគិតប្រាក់',
            avatar: 'ចធ',
            module: 'cashier',
            moduleKh: 'បញ្ជរលក់រាយ',
            action: 'void',
            actionKh: 'លុបចោលវិក្កយបត្រ',
            refCode: 'POS-2026-0418',
            diffSummary: 'លុបចោលការលក់ $145.00 (ឧបករណ៍បំពងសំឡេង Bluetooth)',
            oldValue: 'ស្ថានភាព: បានបង់ប្រាក់ • សរុប $145.00',
            newValue: 'ស្ថានភាព: បានលុបចោល • មូលហេតុ: អតិថិជនប្តូរចិត្ត',
            ipAddress: '192.168.1.88',
            severity: 'critical',
            isSuspicious: true
        },
        {
            id: 'AUD-2026-0040',
            timestamp: '23 កញ្ញា 2026, 10:15:40',
            user: 'លី ហាក់សេង',
            role: 'អភិបាលទូទៅ',
            avatar: 'លហ',
            module: 'finance',
            moduleKh: 'ហិរញ្ញវត្ថុ',
            action: 'approve',
            actionKh: 'អនុម័តផ្លូវការ',
            refCode: 'APP-2026-0038',
            diffSummary: 'ចុះហត្ថលេខាអនុម័តប័ណ្ណចំណាយទិញម៉ាស៊ីនមេ $6,500.00',
            oldValue: 'ស្ថានភាព: រង់ចាំការអនុម័ត',
            newValue: 'ស្ថានភាព: បានអនុម័តជាផ្លូវការដោយអភិបាលទូទៅ',
            ipAddress: '103.14.24.11',
            severity: 'info',
            isSuspicious: false
        },
        {
            id: 'AUD-2026-0039',
            timestamp: '23 កញ្ញា 2026, 09:30:12',
            user: 'ហុង ដារ៉ា',
            role: 'ផ្នែកលទ្ធកម្ម',
            avatar: 'ហដ',
            module: 'procurement',
            moduleKh: 'លទ្ធកម្ម',
            action: 'create',
            actionKh: 'បង្កើតថ្មី',
            refCode: 'PO-2026-0048',
            diffSummary: 'បង្កើតការបញ្ជាទិញអេក្រង់កុំព្យូទ័រ 30 គ្រឿង តម្លៃសរុប $4,500.00',
            oldValue: 'មិនមានទិន្នន័យពីមុន',
            newValue: 'បង្កើតការបញ្ជាទិញថ្មី • អ្នកផ្គត់ផ្គង់ វីរៈតិច ឯ.ក',
            ipAddress: '192.168.1.32',
            severity: 'info',
            isSuspicious: false
        },
        {
            id: 'AUD-2026-0038',
            timestamp: '22 កញ្ញា 2026, 17:10:55',
            user: 'គង់ វិបុល',
            role: 'ផ្នែកឃ្លាំង',
            avatar: 'គវ',
            module: 'warehouse',
            moduleKh: 'ឃ្លាំងស្តុក',
            action: 'override',
            actionKh: 'កែតម្រូវស្តុក',
            refCode: 'ADJ-2026-0019',
            diffSummary: 'កែតម្រូវកាត់កងទំនិញខូចខាតទឹកប្រាក់ $180.00',
            oldValue: 'ស្តុកប្រព័ន្ធ: 24 គ្រឿង',
            newValue: 'ស្តុកជាក់ស្តែង: 20 គ្រឿង (ខូចខាតកម្ទេច 4 គ្រឿង)',
            ipAddress: '192.168.1.70',
            severity: 'warning',
            isSuspicious: false
        },
        {
            id: 'AUD-2026-0037',
            timestamp: '22 កញ្ញា 2026, 16:10:30',
            user: 'អ៊ុំ ម៉ានី',
            role: 'ផ្នែកគណនេយ្យ',
            avatar: 'អម',
            module: 'accounting',
            moduleKh: 'គណនេយ្យ',
            action: 'create',
            actionKh: 'បង្កើតថ្មី',
            refCode: 'BILL-2026-0042',
            diffSummary: 'បញ្ចូលវិក្កយបត្រទិញ $8,500.00 មិនស៊ីគ្នានឹងការបញ្ជាទិញ PO-2026-0045',
            oldValue: 'មិនមានទិន្នន័យពីមុន',
            newValue: 'បង្កើតបំណុលត្រូវសង $8,500.00 ជូនអ្នកផ្គត់ផ្គង់',
            ipAddress: '192.168.1.18',
            severity: 'warning',
            isSuspicious: true
        },
        {
            id: 'AUD-2026-0036',
            timestamp: '22 កញ្ញា 2026, 14:00:21',
            user: 'សុខ ម៉ាលីស',
            role: 'ផ្នែកលក់',
            avatar: 'សម',
            module: 'sales',
            moduleKh: 'ផ្នែកលក់',
            action: 'create',
            actionKh: 'បង្កើតថ្មី',
            refCode: 'INV-2026-0119',
            diffSummary: 'ចេញវិក្កយបត្រលក់កុំព្យូទ័រយួរដៃ 2 គ្រឿង $1,800.00',
            oldValue: 'មិនមានទិន្នន័យពីមុន',
            newValue: 'វិក្កយបត្រលក់ #INV-2026-0119 • ពន្ធ អតប 10%',
            ipAddress: '192.168.1.42',
            severity: 'info',
            isSuspicious: false
        },
        {
            id: 'AUD-2026-0035',
            timestamp: '22 កញ្ញា 2026, 08:50:00',
            user: 'លី ហាក់សេង',
            role: 'អភិបាលទូទៅ',
            avatar: 'លហ',
            module: 'settings',
            moduleKh: 'ការកំណត់ប្រព័ន្ធ',
            action: 'update',
            actionKh: 'កែប្រែការកំណត់',
            refCode: 'CFG-2026-0004',
            diffSummary: 'កែសម្រួលអត្រាប្តូរប្រាក់ផ្លូវការធនាគារជាតិ 4,100 រៀល/ដុល្លារ',
            oldValue: 'អត្រាចាស់: 4,095 រៀល',
            newValue: 'អត្រាថ្មី: 4,100 រៀល',
            ipAddress: '103.14.24.11',
            severity: 'info',
            isSuspicious: false
        }
    ],

    // ៤. មជ្ឈមណ្ឌលតាមដានការបំពានច្បាប់ និងការគ្រប់គ្រងផ្ទៃក្នុង (Compliance & Exceptions)
    complianceExceptions: {
        // SoD Violations: ការបែងចែកភារកិច្ចជាន់គ្នា
        sodViolations: [
            {
                id: 'SOD-01',
                title: 'បុគ្គលិកបង្កើតការបញ្ជាទិញ និងទទួលទំនិញចូលឃ្លាំងតែម្នាក់ឯង',
                category: 'លទ្ធកម្ម និងឃ្លាំង',
                severity: 'critical',
                actor: 'សុខ ចាន់ថន',
                actorRole: 'បុគ្គលិកឃ្លាំង',
                evidence: 'បានបង្កើត PO-2026-0039 ($1,200.00) និងចុះហត្ថលេខាទទួលទំនិញ GRN-2026-0051 តែម្នាក់ឯង។',
                detectedAt: '21 កញ្ញា 2026, 15:20',
                status: 'open'
            },
            {
                id: 'SOD-02',
                title: 'បុគ្គលិកបង្កើតប័ណ្ណចំណាយ និងចុះហត្ថលេខាអនុម័តប័ណ្ណតែម្នាក់ឯង',
                category: 'គណនេយ្យ និងហិរញ្ញវត្ថុ',
                severity: 'critical',
                actor: 'ចាន់ សុផល',
                actorRole: 'ប្រធានសាខា',
                evidence: 'បានបង្កើតប័ណ្ណចំណាយថ្លៃជួសជុល $450.00 និងចុះហត្ថលេខាអនុម័តដោយគ្មានហត្ថលេខាអភិបាលទូទៅឡើយ។',
                detectedAt: '19 កញ្ញា 2026, 10:15',
                status: 'investigating'
            }
        ],

        // 3-Way Matching Discrepancies: ភាពមិនស៊ីគ្នានៃការបញ្ជាទិញ និងវិក្កយបត្រ
        threeWayMismatches: [
            {
                id: '3WAY-01',
                poCode: 'PO-2026-0045',
                grnCode: 'GRN-2026-0062',
                billCode: 'BILL-2026-0042',
                supplierName: 'វីរៈតិច ខេមបូឌា ឯ.ក',
                poQty: 100,
                poAmount: 8500.00,
                grnQty: 90,
                billQty: 100,
                billAmount: 8500.00,
                varianceQty: -10,
                varianceAmount: 850.00,
                detectedAt: '22 កញ្ញា 2026',
                note: 'វិក្កយបត្រអ្នកផ្គត់ផ្គង់ទារប្រាក់ពេញ ប៉ុន្តែឃ្លាំងទទួលខ្វះ 10 គ្រឿង ដោយគ្មានលិខិតឥណទានទូទាត់'
            },
            {
                id: '3WAY-02',
                poCode: 'PO-2026-0041',
                grnCode: 'GRN-2026-0058',
                billCode: 'BILL-2026-0038',
                supplierName: 'ខេមបូ សឹបផ្លាយ ឯ.ក',
                poQty: 50,
                poAmount: 2500.00,
                grnQty: 50,
                billQty: 50,
                billAmount: 2750.00,
                varianceQty: 0,
                varianceAmount: 250.00,
                detectedAt: '18 កញ្ញា 2026',
                note: 'តម្លៃឯកតាក្នុងវិក្កយបត្រអ្នកផ្គត់ផ្គង់ខ្ពស់ជាងតម្លៃព្រមព្រៀងលើការបញ្ជាទិញ $5.00/គ្រឿង'
            }
        ],

        // Credit Limit Breaches: ការបំពានដែនកំណត់ឥណទានអតិថិជន
        creditBreaches: [
            {
                id: 'CRD-01',
                customerName: 'ក្រុមហ៊ុន អង្គរ អ៊ិនធើណេត ឯ.ក',
                invoiceCode: 'INV-2026-0115',
                invoiceAmount: 4200.00,
                creditLimit: 5000.00,
                existingDebt: 4800.00,
                newTotalDebt: 9000.00,
                exceededAmount: 4000.00,
                overdueDays: 45,
                approvedBy: 'ហេង វិច្ឆិកា (អ្នកគ្រប់គ្រងផ្នែកលក់)',
                detectedAt: '21 កញ្ញា 2026',
                status: 'warning'
            }
        ],

        // Cashier Shift Variances: ភាពខុសគ្នានៃការបិទវេនសាច់ប្រាក់
        cashierVariances: [
            {
                id: 'CSH-01',
                shiftCode: 'SFT-2026-0922-02',
                cashierName: 'ស៊្រុន ផល្លា',
                terminal: 'បញ្ជរ 01 (សាខាកណ្តាល)',
                expectedCash: 1240.00,
                actualCash: 1227.50,
                variance: -12.50,
                shiftDate: '22 កញ្ញា 2026',
                status: 'short'
            },
            {
                id: 'CSH-02',
                shiftCode: 'SFT-2026-0921-02',
                cashierName: 'ស៊្រុន ផល្លា',
                terminal: 'បញ្ជរ 01 (សាខាកណ្តាល)',
                expectedCash: 980.00,
                actualCash: 965.00,
                variance: -15.00,
                shiftDate: '21 កញ្ញា 2026',
                status: 'short'
            },
            {
                id: 'CSH-03',
                shiftCode: 'SFT-2026-0920-01',
                cashierName: 'ចាន់ ធីតា',
                terminal: 'បញ្ជរ 02 (សាខាកណ្តាល)',
                expectedCash: 1540.00,
                actualCash: 1542.00,
                variance: 2.00,
                shiftDate: '20 កញ្ញា 2026',
                status: 'over'
            }
        ]
    },

    // ៥. របាយការណ៍ហិរញ្ញវត្ថុកម្រិតនាយកប្រតិបត្តិ (Financial Suite)
    financialOverview: {
        periodName: 'ខែកញ្ញា 2026',
        currency: 'USD',
        exchangeRate: 4100,

        // របាយការណ៍ចំណេញ-ខាត (P&L)
        incomeStatement: {
            revenue: {
                hardwareSales: 54200.00,
                softwareLicenses: 9800.00,
                maintenanceServices: 4450.00,
                totalRevenue: 68450.00
            },
            cogs: {
                inventoryBeginning: 78200.00,
                purchases: 48400.00,
                inventoryEnding: 84500.00,
                totalCOGS: 42100.00
            },
            grossProfit: 26350.00,
            grossMarginPct: 38.5,
            operatingExpenses: {
                salariesAndBenefits: 6200.00,
                officeRent: 2800.00,
                utilitiesAndInternet: 680.00,
                marketingAndSales: 1200.00,
                depreciation: 650.00,
                otherAdminExpenses: 450.00,
                totalOPEX: 11980.00
            },
            operatingProfit: 14370.00,
            incomeTaxEstimated: 2874.00, // 20%
            netProfitAfterTax: 11496.00,
            netProfitMarginPct: 16.8
        },

        // តារាងតុល្យការ (Balance Sheet)
        balanceSheet: {
            assets: {
                currentAssets: {
                    cashAndBank: 42180.00,
                    accountsReceivable: 18240.00,
                    inventory: 84500.00,
                    prepaidExpenses: 3400.00,
                    totalCurrentAssets: 148320.00
                },
                nonCurrentAssets: {
                    propertyAndEquipment: 36500.00,
                    accumulatedDepreciation: -8200.00,
                    intangibleAssets: 1880.00,
                    totalNonCurrentAssets: 30180.00
                },
                totalAssets: 178500.00
            },
            liabilities: {
                currentLiabilities: {
                    accountsPayable: 12600.00,
                    accruedTaxes: 4800.00,
                    shortTermLoans: 15000.00,
                    otherPayables: 3800.00,
                    totalCurrentLiabilities: 36200.00
                },
                nonCurrentLiabilities: {
                    longTermDebt: 10000.00,
                    totalNonCurrentLiabilities: 10000.00
                },
                totalLiabilities: 46200.00
            },
            equity: {
                shareCapital: 80000.00,
                retainedEarnings: 40804.00,
                currentPeriodProfit: 11496.00,
                totalEquity: 132300.00
            }
        },

        // របាយការណ៍លំហូរសាច់ប្រាក់ (Cash Flow Statement)
        cashFlow: {
            operatingCashFlow: 18400.00,
            investingCashFlow: -4500.00,
            financingCashFlow: 0.00,
            netCashChange: 13900.00,
            beginningCash: 28280.00,
            endingCash: 42180.00
        }
    },

    // ៦. បញ្ជីរបាយការណ៍សវនកម្មផ្លូវការ (Official Audit Reports)
    reports: [
        {
            id: 'RPT-01',
            title: 'របាយការណ៍សវនកម្មផ្ទៃក្នុងប្រចាំត្រីមាសទី 3',
            type: 'ត្រួតពិនិត្យទូទៅ',
            period: 'កក្កដា - កញ្ញា 2026',
            generatedDate: '23 កញ្ញា 2026',
            pages: 14,
            status: 'ready',
            fileName: 'Internal_Audit_Q3_2026.pdf'
        },
        {
            id: 'RPT-02',
            title: 'របាយការណ៍វិភាគការបាត់បង់ស្តុក និងកាត់កងទំនិញខូច',
            type: 'សវនកម្មស្តុក',
            period: 'ខែកញ្ញា 2026',
            generatedDate: '22 កញ្ញា 2026',
            pages: 8,
            status: 'ready',
            fileName: 'Stock_Variance_Audit_Sep2026.pdf'
        },
        {
            id: 'RPT-03',
            title: 'តារាងផ្ទៀងផ្ទាត់ពន្ធកាត់ទុក និងពន្ធលើតម្លៃបន្ថែម (អតប)',
            type: 'អនុលោមភាពពន្ធដារ',
            period: 'ខែសីហា 2026',
            generatedDate: '20 កញ្ញា 2026',
            pages: 6,
            status: 'ready',
            fileName: 'Tax_Reconciliation_Aug2026.pdf'
        },
        {
            id: 'RPT-04',
            title: 'តារាងវិភាគផលចំណេញតាមមុខទំនិញ និងអតិថិជន',
            type: 'យុទ្ធសាស្ត្រប្រតិបត្តិ',
            period: '9 ខែ ឆ្នាំ 2026',
            generatedDate: '21 កញ្ញា 2026',
            pages: 12,
            status: 'ready',
            fileName: 'Profitability_Analysis_2026.pdf'
        }
    ]
};

// ដំណើរការរក្សាទុក និងទាញយកទិន្នន័យពី sessionStorage
function getIAStore() {
    try {
        const stored = sessionStorage.getItem(BMS_IA_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error reading IA store:', e);
    }
    sessionStorage.setItem(BMS_IA_STORAGE_KEY, JSON.stringify(INITIAL_IA_STORE));
    return JSON.parse(JSON.stringify(INITIAL_IA_STORE));
}

function saveIAStore(store) {
    try {
        sessionStorage.setItem(BMS_IA_STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
        console.error('Error saving IA store:', e);
    }
}

// Global API Object សម្រាប់ Internal Auditor
window.BMS_IA = {
    getStore: getIAStore,

    getKPIs: function() {
        const store = getIAStore();
        return store.kpis;
    },

    getRedFlags: function() {
        const store = getIAStore();
        return store.redFlags || [];
    },

    getAuditLogs: function(moduleFilter = 'all', actionFilter = 'all', searchQuery = '') {
        const store = getIAStore();
        let logs = store.auditLogs || [];

        if (moduleFilter !== 'all') {
            logs = logs.filter(l => l.module === moduleFilter);
        }
        if (actionFilter !== 'all') {
            logs = logs.filter(l => l.action === actionFilter);
        }
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            logs = logs.filter(l => 
                l.refCode.toLowerCase().includes(q) ||
                l.user.toLowerCase().includes(q) ||
                l.diffSummary.toLowerCase().includes(q) ||
                l.ipAddress.includes(q) ||
                l.id.toLowerCase().includes(q)
            );
        }
        return logs;
    },

    getAuditLogById: function(id) {
        const store = getIAStore();
        return (store.auditLogs || []).find(l => l.id === id || l.refCode === id);
    },

    getComplianceExceptions: function() {
        const store = getIAStore();
        return store.complianceExceptions;
    },

    getFinancialOverview: function() {
        const store = getIAStore();
        return store.financialOverview;
    },

    getReports: function() {
        const store = getIAStore();
        return store.reports || [];
    },

    // Formatters
    fmtCurrencyKh: function(amount) {
        const num = Number(amount) || 0;
        return '$' + num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    },

    fmtPercent: function(num) {
        return (Number(num) || 0).toFixed(1) + '%';
    }
};

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

function portalNotifications() {
    const list = [];
    const store = getIAStore();
    const fmt = window.BMS_IA.fmtCurrencyKh;

    // សញ្ញាក្រហមដែលមិនទាន់បិទបញ្ចប់
    (store.redFlags || [])
        .filter(f => f.status !== 'resolved')
        .sort((a, b) => (a.severity === 'critical' ? -1 : 1) - (b.severity === 'critical' ? -1 : 1))
        .slice(0, 3)
        .forEach(f => {
            list.push({
                icon: f.severity === 'critical' ? 'mdi:flag-remove' : 'mdi:flag-outline',
                tone: f.severity === 'critical' ? 'danger' : 'warning',
                title: `${f.code} · ${f.title}`,
                note: `${f.category} · ${fmt(f.amount)} · ${f.actor} (${f.role})`,
                time: f.detectedAt
            });
        });

    const ce = store.complianceExceptions || {};

    // ការបំពានការបែងចែកភារកិច្ច
    (ce.sodViolations || []).filter(v => v.status !== 'resolved').slice(0, 2).forEach(v => {
        list.push({
            icon: 'mdi:account-alert-outline',
            tone: v.severity === 'critical' ? 'danger' : 'warning',
            title: `${v.id} · ការបំពានការបែងចែកភារកិច្ច`,
            note: `${v.actor} (${v.actorRole}) · ${v.title}`,
            time: v.detectedAt
        });
    });

    // ភាពមិនស៊ីគ្នានៃការផ្ទៀងផ្ទាត់ត្រីភាគី
    (ce.threeWayMismatches || []).slice(0, 2).forEach(m => {
        list.push({
            icon: 'mdi:file-compare',
            tone: 'danger',
            title: `${m.poCode} មិនស៊ីគ្នានឹងវិក្កយបត្រទិញ`,
            note: `${m.supplierName} · គម្លាត ${fmt(m.varianceAmount)}${m.varianceQty ? ` · ចំនួន ${m.varianceQty}` : ''}`,
            time: m.detectedAt
        });
    });

    // ការលើសពិដានឥណទានអតិថិជន
    (ce.creditBreaches || []).slice(0, 2).forEach(c => {
        list.push({
            icon: 'mdi:credit-card-off-outline',
            tone: 'danger',
            title: `${c.customerName} លើសពិដានឥណទាន ${fmt(c.exceededAmount)}`,
            note: `${c.invoiceCode} · បំណុលសរុប ${fmt(c.newTotalDebt)} / ពិដាន ${fmt(c.creditLimit)} · យឺត ${c.overdueDays} ថ្ងៃ`,
            time: c.detectedAt
        });
    });

    // គម្លាតសាច់ប្រាក់បិទវេនរបស់បេឡាករ
    const short = (ce.cashierVariances || []).filter(v => v.status === 'short');
    if (short.length) {
        const total = short.reduce((sum, v) => sum + Math.abs(v.variance), 0);
        list.push({
            icon: 'mdi:cash-remove',
            tone: 'warning',
            title: `គម្លាតសាច់ប្រាក់បិទវេនខ្វះ ${short.length} វេន`,
            note: `ខ្វះសរុប ${fmt(total)} · ${short[0].cashierName} · ${short[0].terminal}`,
            time: short[0].shiftDate
        });
    }

    // សកម្មភាពគួរឲ្យសង្ស័យក្នុងកំណត់ហេតុប្រព័ន្ធ
    const suspicious = (store.auditLogs || []).filter(l => l.isSuspicious);
    if (suspicious.length) {
        list.push({
            icon: 'mdi:eye-check-outline',
            tone: 'info',
            title: `សកម្មភាពគួរឲ្យសង្ស័យក្នុងកំណត់ហេតុ ${suspicious.length}`,
            note: `ថ្មីបំផុត៖ ${suspicious[0].user} · ${suspicious[0].actionKh} · ${suspicious[0].refCode}`,
            time: suspicious[0].timestamp
        });
    }

    return list;
}
