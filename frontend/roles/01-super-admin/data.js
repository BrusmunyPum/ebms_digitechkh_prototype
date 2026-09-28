/* ច្រកស៊ុបភើរអភិបាល — ឃ្លាំងទិន្នន័យសាកល្បងរួម (Super Admin Shared Mock Data)
   គ្រប់គ្រងទិន្នន័យក្រុមហ៊ុន (Tenants), កញ្ចប់សេវា (Subscriptions),
   និងកំណត់ហេតុសវនកម្មសកល (Global Audit Logs)។
   រក្សាទុកស្ថានភាពក្នុង sessionStorage ដើម្បីឱ្យការធ្វើបច្ចុប្បន្នភាពមានប្រសិទ្ធភាពភ្លាមៗ។ */

const BMS_SA_TODAY = new Date(2026, 8, 23); // 23 កញ្ញា 2026

const SA_STORAGE_KEYS = {
    TENANTS: 'bms_sa_tenants_v1',
    AUDIT_LOGS: 'bms_sa_audit_logs_v1'
};

const SUBSCRIPTION_PLANS = {
    starter: {
        id: 'starter',
        name: 'កញ្ចប់ចាប់ផ្តើម',
        nameEn: 'Starter',
        price: 29,
        maxUsers: 5,
        badgeColor: 'sky',
        description: 'ស័ក្តិសមសម្រាប់អាជីវកម្មខ្នាតតូច និងហាងទំនិញទើបចាប់ផ្តើម',
        features: [
            'គ្រប់គ្រងការលក់ និងសម្រង់តម្លៃ',
            'ម៉ូឌុលគិតប្រាក់លក់រហ័ស (Touch POS)',
            'គ្រប់គ្រងស្តុកទំនិញមូលដ្ឋាន',
            'របាយការណ៍ចំណូល និងការលក់ប្រចាំថ្ងៃ',
            'អ្នកប្រើប្រាស់អតិបរមា 5 នាក់'
        ]
    },
    pro: {
        id: 'pro',
        name: 'កញ្ចប់អាជីព',
        nameEn: 'Pro',
        price: 69,
        maxUsers: 15,
        badgeColor: 'indigo',
        description: 'ស័ក្តិសមសម្រាប់ក្រុមហ៊ុនពាណិជ្ជកម្មដុំ និងអាជីវកម្មពង្រីកសាខា',
        features: [
            'មុខងារទាំងអស់របស់កញ្ចប់ Starter',
            'ម៉ូឌុលធនធានមនុស្ស & បៀវត្សរ៍ (HR & Payroll)',
            'ការជូនដំណឹងស្វ័យប្រវត្តិតាម Telegram',
            'គ្រប់គ្រងពហុឃ្លាំងស្តុក (Multi-Warehouse)',
            'តាមដានលេខកូដឡូត៍ និងកាលបរិច្ឆេទផុតកំណត់',
            'អ្នកប្រើប្រាស់អតិបរមា 15 នាក់'
        ]
    },
    enterprise: {
        id: 'enterprise',
        name: 'កញ្ចប់សហគ្រាស',
        nameEn: 'Enterprise',
        price: 199,
        maxUsers: 50,
        badgeColor: 'purple',
        description: 'ដំណោះស្រាយពេញលេញសម្រាប់សហគ្រាសធំៗ និងសាជីវកម្ម',
        features: [
            'មុខងារទាំងអស់នៃប្រព័ន្ធទាំងមូល 100%',
            'គេហទំព័រដាក់តាំងផលិតផលឌីជីថល (Digital Showroom)',
            'សវនកម្មផ្ទៃក្នុងកម្រិតស៊ីជម្រៅ & Anti-Fraud',
            'ការបម្រុងទុកទិន្នន័យស្វ័យប្រវត្តិតាមនាទី (Auto Backup)',
            'ជំនួយការបច្ចេកទេសពិសេស 24/7 (SLA 99.9%)',
            'អ្នកប្រើប្រាស់អតិបរមា 50 នាក់ (អាចពង្រីកបាន)'
        ]
    }
};

const INITIAL_TENANTS = [
    {
        id: 'TNT-1001',
        nameKh: 'ក្រុមហ៊ុន អង្គរ អេឡិចត្រូនិច ឯ.ក',
        nameEn: 'Angkor Electronics Co., Ltd.',
        tin: 'K001-90218847',
        contactName: 'លោក អ៊ុក ចាន់ដារ៉ា',
        contactEmail: 'admin@angkor-elec.com',
        contactPhone: '012 345 678',
        address: 'អគារលេខ 45 មហាវិថីព្រះមុនីវង្ស សង្កាត់ស្រះចក ខណ្ឌដូនពេញ រាជធានីភ្នំពេញ',
        logoInitial: 'អអ',
        plan: 'enterprise',
        quotaUsers: 50,
        usersCount: 42,
        baseCurrency: 'USD',
        status: 'active', // active, expiring, suspended
        createdAt: '2026-01-15',
        expiresAt: '2027-01-15',
        features: {
            pos: true,
            showroom: true,
            hr: true,
            telegram: true,
            multiWarehouse: true,
            lotTracking: true
        },
        stats: {
            invoicesThisMonth: 380,
            storageMb: 480,
            lastLogin: '2026-09-23 18:45',
            activeSessions: 12
        },
        notes: 'អតិថិជនសហគ្រាសធំ មានកិច្ចសន្យាប្រចាំឆ្នាំបន្តស្វ័យប្រវត្តិ'
    },
    {
        id: 'TNT-1002',
        nameKh: 'ក្រុមហ៊ុន មេគង្គ ឡូជីស្ទីក សេវាកម្ម',
        nameEn: 'Mekong Logistics Services',
        tin: 'K002-88192031',
        contactName: 'លោកស្រី ជា ស្រីមុំ',
        contactEmail: 'operations@mekonglog.com',
        contactPhone: '011 888 999',
        address: 'ផ្លូវជាតិលេខ 4 សង្កាត់ចោមចៅ ខណ្ឌពោធិ៍សែនជ័យ រាជធានីភ្នំពេញ',
        logoInitial: 'មឡ',
        plan: 'pro',
        quotaUsers: 15,
        usersCount: 14,
        baseCurrency: 'USD',
        status: 'active',
        createdAt: '2026-03-01',
        expiresAt: '2027-03-01',
        features: {
            pos: false,
            showroom: false,
            hr: true,
            telegram: true,
            multiWarehouse: true,
            lotTracking: true
        },
        stats: {
            invoicesThisMonth: 195,
            storageMb: 260,
            lastLogin: '2026-09-23 15:20',
            activeSessions: 6
        },
        notes: 'ប្រើប្រាស់ម៉ូឌុលស្តុក និងពហុឃ្លាំងជាចម្បង'
    },
    {
        id: 'TNT-1003',
        nameKh: 'ហាងទំនិញ ភ្នំពេញ ម៉ាត',
        nameEn: 'Phnom Penh Supermart',
        tin: 'K003-77281924',
        contactName: 'លោក ហេង វណ្ណា',
        contactEmail: 'vanna@ppmart.com',
        contactPhone: '010 445 566',
        address: 'ផ្ទះលេខ 128 ផ្លូវ 271 សង្កាត់ទួលទំពូង ខណ្ឌចំការមន រាជធានីភ្នំពេញ',
        logoInitial: 'ភម',
        plan: 'pro',
        quotaUsers: 15,
        usersCount: 15,
        baseCurrency: 'USD',
        status: 'expiring',
        createdAt: '2025-09-28',
        expiresAt: '2026-09-28',
        features: {
            pos: true,
            showroom: true,
            hr: true,
            telegram: true,
            multiWarehouse: false,
            lotTracking: false
        },
        stats: {
            invoicesThisMonth: 520,
            storageMb: 390,
            lastLogin: '2026-09-22 11:20',
            activeSessions: 5
        },
        notes: 'ការជាវជិតផុតកំណត់ក្នុងរយៈពេល 5 ថ្ងៃ (រង់ចាំការបង់ប្រាក់បន្ត)'
    },
    {
        id: 'TNT-1004',
        nameKh: 'ក្រុមហ៊ុន សុវណ្ណភូមិ ត្រេឌីង',
        nameEn: 'Sovannaphum Trading Co., Ltd.',
        tin: 'K004-66391022',
        contactName: 'លោកស្រី កែវ រចនា',
        contactEmail: 'admin@sovannaphum.com',
        contactPhone: '017 999 111',
        address: 'ផ្លូវលេខ 1003 សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ',
        logoInitial: 'សត្រ',
        plan: 'starter',
        quotaUsers: 5,
        usersCount: 4,
        baseCurrency: 'USD',
        status: 'active',
        createdAt: '2026-05-10',
        expiresAt: '2026-11-10',
        features: {
            pos: true,
            showroom: false,
            hr: false,
            telegram: true,
            multiWarehouse: false,
            lotTracking: false
        },
        stats: {
            invoicesThisMonth: 85,
            storageMb: 110,
            lastLogin: '2026-09-21 15:40',
            activeSessions: 2
        },
        notes: 'ហាងលក់សម្ភារការិយាល័យ និងគ្រឿងបន្លាស់'
    },
    {
        id: 'TNT-1005',
        nameKh: 'ក្រុមហ៊ុន បាត់ដំបង កសិឧស្សាហកម្ម',
        nameEn: 'Battambang Agro Industry',
        tin: 'K005-55482910',
        contactName: 'លោក ស៊ឹម បូរ៉ា',
        contactEmail: 'bora@bb-agro.com',
        contactPhone: '089 223 344',
        address: 'ផ្លូវជាតិលេខ 5 ក្រុងបាត់ដំបង ខេត្តបាត់ដំបង',
        logoInitial: 'បក',
        plan: 'pro',
        quotaUsers: 15,
        usersCount: 11,
        baseCurrency: 'USD',
        status: 'active',
        createdAt: '2026-02-20',
        expiresAt: '2027-02-20',
        features: {
            pos: false,
            showroom: false,
            hr: true,
            telegram: true,
            multiWarehouse: true,
            lotTracking: true
        },
        stats: {
            invoicesThisMonth: 140,
            storageMb: 215,
            lastLogin: '2026-09-23 09:15',
            activeSessions: 4
        },
        notes: 'អាជីវកម្មកែច្នៃកសិផល មានឃ្លាំងស្តុកធំនៅបាត់ដំបង'
    },
    {
        id: 'TNT-1006',
        nameKh: 'ក្រុមហ៊ុន សៀមរាប ទេសចរណ៍ & សេវាកម្ម',
        nameEn: 'Siem Reap Travel & Services',
        tin: 'K006-44391823',
        contactName: 'លោកស្រី ឌួង ម៉ានី',
        contactEmail: 'mani@srtravel.com',
        contactPhone: '092 556 677',
        address: 'ផ្លូវស៊ីវត្ថា សង្កាត់ស្វាយដង្គំ ក្រុងសៀមរាប ខេត្តសៀមរាប',
        logoInitial: 'សទ',
        plan: 'starter',
        quotaUsers: 5,
        usersCount: 5,
        baseCurrency: 'USD',
        status: 'suspended',
        createdAt: '2025-08-01',
        expiresAt: '2026-08-01',
        suspendedAt: '2026-08-10',
        features: {
            pos: true,
            showroom: true,
            hr: false,
            telegram: false,
            multiWarehouse: false,
            lotTracking: false
        },
        stats: {
            invoicesThisMonth: 0,
            storageMb: 95,
            lastLogin: '2026-08-08 14:10',
            activeSessions: 0
        },
        notes: 'ផ្អាកដំណើរការដោយសារខកខានបង់ប្រាក់បន្តការជាវលើសពី 7 ថ្ងៃ'
    },
    {
        id: 'TNT-1007',
        nameKh: 'ក្រុមហ៊ុន ខេមបូឌា ឌីជីថល សូលូសិន',
        nameEn: 'Cambodia Digital Solutions',
        tin: 'K007-33291845',
        contactName: 'លោក លឹម សុគន្ធ',
        contactEmail: 'sokun@camdigital.com',
        contactPhone: '078 667 788',
        address: 'មជ្ឈមណ្ឌលកាណាឌីយ៉ា ជាន់ទី 16 មហាវិថីព្រះមុនីវង្ស រាជធានីភ្នំពេញ',
        logoInitial: 'ខឌ',
        plan: 'enterprise',
        quotaUsers: 50,
        usersCount: 38,
        baseCurrency: 'USD',
        status: 'active',
        createdAt: '2026-04-12',
        expiresAt: '2027-04-12',
        features: {
            pos: true,
            showroom: true,
            hr: true,
            telegram: true,
            multiWarehouse: true,
            lotTracking: true
        },
        stats: {
            invoicesThisMonth: 410,
            storageMb: 510,
            lastLogin: '2026-09-23 17:30',
            activeSessions: 15
        },
        notes: 'ដៃគូបច្ចេកវិទ្យាកម្រិតយុទ្ធសាស្ត្រ សមាជិកភាព VIP'
    },
    {
        id: 'TNT-1008',
        nameKh: 'ហាងលក់សម្ភារសំណង់ រតនៈ',
        nameEn: 'Ratanak Construction Supply',
        tin: 'K008-22183940',
        contactName: 'លោក ផាន់ រតនៈ',
        contactEmail: 'ratanak@supplies.com',
        contactPhone: '015 334 455',
        address: 'ផ្លូវជាតិលេខ 3 សង្កាត់ព្រៃស ខណ្ឌដង្កោ រាជធានីភ្នំពេញ',
        logoInitial: 'រស',
        plan: 'starter',
        quotaUsers: 5,
        usersCount: 3,
        baseCurrency: 'USD',
        status: 'expiring',
        createdAt: '2025-09-29',
        expiresAt: '2026-09-29',
        features: {
            pos: true,
            showroom: false,
            hr: false,
            telegram: true,
            multiWarehouse: false,
            lotTracking: false
        },
        stats: {
            invoicesThisMonth: 92,
            storageMb: 88,
            lastLogin: '2026-09-20 16:05',
            activeSessions: 1
        },
        notes: 'ការជាវជិតផុតកំណត់ក្នុងរយៈពេល 6 ថ្ងៃ'
    }
];

const INITIAL_AUDIT_LOGS = [
    {
        id: 'LOG-8891',
        timestamp: '2026-09-23 18:45:12',
        companyName: 'ក្រុមហ៊ុន អង្គរ អេឡិចត្រូនិច ឯ.ក',
        companyId: 'TNT-1001',
        userName: 'អ៊ុក ចាន់ដារ៉ា',
        userRole: 'Admin ក្រុមហ៊ុន',
        ipAddress: '192.168.1.45',
        action: 'LOGIN',
        actionLabel: 'ចូលប្រព័ន្ធ',
        entity: 'ប្រព័ន្ធចូលគណនី',
        result: 'SUCCESS',
        resultLabel: 'ជោគជ័យ',
        details: 'ចូលប្រើប្រព័ន្ធតាមរយៈ Browser Firefox លើ Windows 11'
    },
    {
        id: 'LOG-8890',
        timestamp: '2026-09-23 17:30:20',
        companyName: 'ក្រុមហ៊ុន ខេមបូឌា ឌីជីថល សូលូសិន',
        companyId: 'TNT-1007',
        userName: 'លឹម សុគន្ធ',
        userRole: 'Admin ក្រុមហ៊ុន',
        ipAddress: '119.82.252.14',
        action: 'CREATE_USER',
        actionLabel: 'បង្កើតគណនី',
        entity: 'បុគ្គលិក #USR-1082',
        result: 'SUCCESS',
        resultLabel: 'ជោគជ័យ',
        details: 'បានបង្កើតគណនីបុគ្គលិកលក់ថ្មី (ឈ្មោះ សេង គឹមសាន)'
    },
    {
        id: 'LOG-8889',
        timestamp: '2026-09-23 16:15:08',
        companyName: 'ក្រុមហ៊ុន សៀមរាប ទេសចរណ៍ & សេវាកម្ម',
        companyId: 'TNT-1006',
        userName: 'ឌួង ម៉ានី',
        userRole: 'Admin ក្រុមហ៊ុន',
        ipAddress: '175.100.12.90',
        action: 'LOGIN',
        actionLabel: 'ចូលប្រព័ន្ធ',
        entity: 'ច្រកចូលប្រព័ន្ធ',
        result: 'FAILED',
        resultLabel: 'បរាជ័យ',
        details: 'ការចូលត្រូវបានរារាំង៖ គណនីក្រុមហ៊ុនត្រូវបានផ្អាកដំណើរការ (Suspended)'
    },
    {
        id: 'LOG-8888',
        timestamp: '2026-09-23 14:02:44',
        companyName: 'DIGITECHKH Platform',
        companyId: 'PLATFORM',
        userName: 'អភិបាល ប្រព័ន្ធ',
        userRole: 'ស៊ុបភើរ អភិបាល',
        ipAddress: '10.0.0.1',
        action: 'SUSPEND_TENANT',
        actionLabel: 'ផ្អាកក្រុមហ៊ុន',
        entity: 'ក្រុមហ៊ុន #TNT-1006',
        result: 'SUCCESS',
        resultLabel: 'ជោគជ័យ',
        details: 'បានផ្អាកដំណើរការក្រុមហ៊ុន សៀមរាប ទេសចរណ៍ ដោយសារខកខានបង់ប្រាក់'
    },
    {
        id: 'LOG-8887',
        timestamp: '2026-09-22 11:20:19',
        companyName: 'ហាងទំនិញ ភ្នំពេញ ម៉ាត',
        companyId: 'TNT-1003',
        userName: 'ហេង វណ្ណា',
        userRole: 'Admin ក្រុមហ៊ុន',
        ipAddress: '120.72.88.19',
        action: 'LOGIN',
        actionLabel: 'ចូលប្រព័ន្ធ',
        entity: 'ប្រព័ន្ធចូលគណនី',
        result: 'FAILED',
        resultLabel: 'បរាជ័យ',
        details: 'បញ្ចូលពាក្យសម្ងាត់មិនត្រឹមត្រូវលើកទី 5 (ប្រព័ន្ធបានកត់ត្រាការដាស់តឿនសុវត្ថិភាព)'
    },
    {
        id: 'LOG-8886',
        timestamp: '2026-09-22 10:14:35',
        companyName: 'DIGITECHKH Platform',
        companyId: 'PLATFORM',
        userName: 'អភិបាល ប្រព័ន្ធ',
        userRole: 'ស៊ុបភើរ អភិបាល',
        ipAddress: '10.0.0.1',
        action: 'RESET_PASSWORD',
        actionLabel: 'កំណត់ពាក្យសម្ងាត់',
        entity: 'Admin ក្រុមហ៊ុន #TNT-1003',
        result: 'SUCCESS',
        resultLabel: 'ជោគជ័យ',
        details: 'បានផ្ញើតំណភ្ជាប់កំណត់ពាក្យសម្ងាត់ឡើងវិញទៅកាន់អ៊ីមែល vanna@ppmart.com'
    },
    {
        id: 'LOG-8885',
        timestamp: '2026-09-21 15:40:00',
        companyName: 'ក្រុមហ៊ុន សុវណ្ណភូមិ ត្រេឌីង',
        companyId: 'TNT-1004',
        userName: 'កែវ រចនា',
        userRole: 'Admin ក្រុមហ៊ុន',
        ipAddress: '110.74.200.8',
        action: 'EXPORT_DATA',
        actionLabel: 'ទាញយកទិន្នន័យ',
        entity: 'របាយការណ៍លក់',
        result: 'SUCCESS',
        resultLabel: 'ជោគជ័យ',
        details: 'បានទាញយកទិន្នន័យរបាយការណ៍លក់ប្រចាំត្រីមាសជាឯកសារ Excel'
    },
    {
        id: 'LOG-8884',
        timestamp: '2026-09-20 09:00:15',
        companyName: 'DIGITECHKH Platform',
        companyId: 'PLATFORM',
        userName: 'អភិបាល ប្រព័ន្ធ',
        userRole: 'ស៊ុបភើរ អភិបាល',
        ipAddress: '10.0.0.1',
        action: 'CREATE_TENANT',
        actionLabel: 'ចុះឈ្មោះក្រុមហ៊ុន',
        entity: 'ក្រុមហ៊ុន #TNT-1007',
        result: 'SUCCESS',
        resultLabel: 'ជោគជ័យ',
        details: 'បានចុះឈ្មោះក្រុមហ៊ុនថ្មី ខេមបូឌា ឌីជីថល សូលូសិន ជាមួយកញ្ចប់សហគ្រាស Enterprise'
    }
];

// Helper Functions សម្រាប់ទាញយក និងរក្សាទុកទិន្នន័យ
function getTenants() {
    try {
        const stored = sessionStorage.getItem(SA_STORAGE_KEYS.TENANTS);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn('sessionStorage not accessible:', e);
    }
    return INITIAL_TENANTS;
}

function saveTenants(tenants) {
    try {
        sessionStorage.setItem(SA_STORAGE_KEYS.TENANTS, JSON.stringify(tenants));
    } catch (e) {
        console.warn('Failed to save tenants to sessionStorage:', e);
    }
}

function getTenantById(id) {
    const tenants = getTenants();
    return tenants.find(t => t.id === id) || null;
}

function addTenant(data) {
    const tenants = getTenants();
    const nextNum = tenants.length + 1001;
    const newId = `TNT-${nextNum}`;

    const newTenant = {
        id: newId,
        nameKh: data.nameKh || 'ក្រុមហ៊ុនថ្មី',
        nameEn: data.nameEn || 'New Company',
        tin: data.tin || 'K000-00000000',
        contactName: data.contactName || '',
        contactEmail: data.contactEmail || '',
        contactPhone: data.contactPhone || '',
        address: data.address || '',
        logoInitial: data.nameKh ? data.nameKh.substring(0, 2) : 'កថ',
        plan: data.plan || 'starter',
        quotaUsers: parseInt(data.quotaUsers) || (SUBSCRIPTION_PLANS[data.plan] ? SUBSCRIPTION_PLANS[data.plan].maxUsers : 5),
        usersCount: 1, // គណនី Admin ដំបូង
        baseCurrency: data.baseCurrency || 'USD',
        status: 'active',
        createdAt: data.createdAt || '2026-09-23',
        expiresAt: data.expiresAt || '2027-09-23',
        features: {
            pos: !!data.features?.pos,
            showroom: !!data.features?.showroom,
            hr: !!data.features?.hr,
            telegram: !!data.features?.telegram,
            multiWarehouse: !!data.features?.multiWarehouse,
            lotTracking: !!data.features?.lotTracking
        },
        stats: {
            invoicesThisMonth: 0,
            storageMb: 12,
            lastLogin: 'ទើបបង្កើត',
            activeSessions: 0
        },
        notes: data.notes || ''
    };

    tenants.unshift(newTenant);
    saveTenants(tenants);

    // បញ្ចូល Audit Log
    addAuditLog({
        companyName: newTenant.nameKh,
        companyId: newTenant.id,
        userName: 'អភិបាល ប្រព័ន្ធ',
        userRole: 'ស៊ុបភើរ អភិបាល',
        action: 'CREATE_TENANT',
        actionLabel: 'ចុះឈ្មោះក្រុមហ៊ុន',
        entity: `ក្រុមហ៊ុន #${newTenant.id}`,
        result: 'SUCCESS',
        resultLabel: 'ជោគជ័យ',
        details: `បានចុះឈ្មោះក្រុមហ៊ុនថ្មី «${newTenant.nameKh}» ជាមួយកញ្ចប់ ${SUBSCRIPTION_PLANS[newTenant.plan]?.name || newTenant.plan}`
    });

    return newTenant;
}

function updateTenant(id, updates) {
    const tenants = getTenants();
    const idx = tenants.findIndex(t => t.id === id);
    if (idx === -1) return null;

    tenants[idx] = { ...tenants[idx], ...updates };
    saveTenants(tenants);

    addAuditLog({
        companyName: tenants[idx].nameKh,
        companyId: tenants[idx].id,
        userName: 'អភិបាល ប្រព័ន្ធ',
        userRole: 'ស៊ុបភើរ អភិបាល',
        action: 'UPDATE_TENANT',
        actionLabel: 'កែប្រែក្រុមហ៊ុន',
        entity: `ក្រុមហ៊ុន #${tenants[idx].id}`,
        result: 'SUCCESS',
        resultLabel: 'ជោគជ័យ',
        details: `បានធ្វើបច្ចុប្បន្នភាពព័ត៌មានក្រុមហ៊ុន «${tenants[idx].nameKh}»`
    });

    return tenants[idx];
}

function toggleTenantStatus(id) {
    const tenants = getTenants();
    const idx = tenants.findIndex(t => t.id === id);
    if (idx === -1) return null;

    const current = tenants[idx].status;
    const nextStatus = current === 'suspended' ? 'active' : 'suspended';
    tenants[idx].status = nextStatus;

    if (nextStatus === 'suspended') {
        tenants[idx].suspendedAt = '2026-09-23';
    } else {
        delete tenants[idx].suspendedAt;
    }

    saveTenants(tenants);

    addAuditLog({
        companyName: tenants[idx].nameKh,
        companyId: tenants[idx].id,
        userName: 'អភិបាល ប្រព័ន្ធ',
        userRole: 'ស៊ុបភើរ អភិបាល',
        action: nextStatus === 'suspended' ? 'SUSPEND_TENANT' : 'REACTIVATE_TENANT',
        actionLabel: nextStatus === 'suspended' ? 'ផ្អាកក្រុមហ៊ុន' : 'បើកដំណើរការឡើងវិញ',
        entity: `ក្រុមហ៊ុន #${tenants[idx].id}`,
        result: 'SUCCESS',
        resultLabel: 'ជោគជ័យ',
        details: nextStatus === 'suspended'
            ? `បានផ្អាកដំណើរការក្រុមហ៊ុន «${tenants[idx].nameKh}»`
            : `បានបើកដំណើរការឡើងវិញនូវក្រុមហ៊ុន «${tenants[idx].nameKh}»`
    });

    return tenants[idx];
}

function getAuditLogs() {
    try {
        const stored = sessionStorage.getItem(SA_STORAGE_KEYS.AUDIT_LOGS);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn('sessionStorage not accessible:', e);
    }
    return INITIAL_AUDIT_LOGS;
}

function addAuditLog(entry) {
    const logs = getAuditLogs();
    const nextId = `LOG-${9000 + logs.length}`;
    const now = new Date();
    const nowStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newLog = {
        id: nextId,
        timestamp: entry.timestamp || nowStr,
        companyName: entry.companyName || 'DIGITECHKH Platform',
        companyId: entry.companyId || 'PLATFORM',
        userName: entry.userName || 'អភិបាល ប្រព័ន្ធ',
        userRole: entry.userRole || 'ស៊ុបភើរ អភិបាល',
        ipAddress: entry.ipAddress || '10.0.0.1',
        action: entry.action || 'GENERAL_ACTION',
        actionLabel: entry.actionLabel || 'សកម្មភាព',
        entity: entry.entity || 'ប្រព័ន្ធ',
        result: entry.result || 'SUCCESS',
        resultLabel: entry.resultLabel || (entry.result === 'FAILED' ? 'បរាជ័យ' : 'ជោគជ័យ'),
        details: entry.details || ''
    };

    logs.unshift(newLog);
    try {
        sessionStorage.setItem(SA_STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
    } catch (e) {
        console.warn('Failed to save audit log:', e);
    }
    return newLog;
}

function getPlatformKPIs() {
    const tenants = getTenants();
    const activeTenants = tenants.filter(t => t.status === 'active');
    const expiringTenants = tenants.filter(t => t.status === 'expiring');
    const suspendedTenants = tenants.filter(t => t.status === 'suspended');

    let mrr = 0;
    tenants.forEach(t => {
        if (t.status !== 'suspended') {
            const plan = SUBSCRIPTION_PLANS[t.plan];
            if (plan) mrr += plan.price;
        }
    });

    const totalUsers = tenants.reduce((sum, t) => sum + (t.usersCount || 0), 0);

    return {
        totalTenants: tenants.length,
        activeCount: activeTenants.length,
        expiringCount: expiringTenants.length,
        suspendedCount: suspendedTenants.length,
        mrr: mrr,
        totalUsers: totalUsers,
        systemUptime: '99.98%',
        storageTotalMb: tenants.reduce((s, t) => s + (t.stats?.storageMb || 0), 0)
    };
}

// Formatters
function fmtUSD(val) {
    const n = Number(val) || 0;
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDateKh(dateStr) {
    if (!dateStr) return '—';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const months = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
    const mIdx = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const year = parts[0];
    return `${day} ${months[mIdx] || parts[1]} ${year}`;
}

/* ===== ការជូនដំណឹងក្នុងក្បាលទំព័រ (អានដោយ portal.js) ===== */

function daysUntilSA(dateStr) {
    const parts = String(dateStr || '').split('-');
    if (parts.length !== 3) return null;
    const target = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return Math.round((target - BMS_SA_TODAY) / 86400000);
}

function portalNotifications() {
    const list = [];
    const tenants = getTenants();

    // ការជាវជិតផុតកំណត់
    tenants.filter(t => t.status === 'expiring')
        .sort((a, b) => (daysUntilSA(a.expiresAt) || 0) - (daysUntilSA(b.expiresAt) || 0))
        .slice(0, 3)
        .forEach(t => {
            const left = daysUntilSA(t.expiresAt);
            list.push({
                icon: 'mdi:calendar-alert',
                tone: left !== null && left <= 7 ? 'danger' : 'warning',
                title: `ការជាវរបស់ ${t.nameKh} ជិតផុតកំណត់`,
                note: `កញ្ចប់ ${SUBSCRIPTION_PLANS[t.plan] ? SUBSCRIPTION_PLANS[t.plan].name : t.plan} · នៅសល់ ${left} ថ្ងៃ`,
                time: fmtDateKh(t.expiresAt)
            });
        });

    // គណនីដែលត្រូវបានផ្អាក
    tenants.filter(t => t.status === 'suspended').slice(0, 2).forEach(t => {
        list.push({
            icon: 'mdi:account-cancel-outline',
            tone: 'danger',
            title: `${t.nameKh} ត្រូវបានផ្អាកដំណើរការ`,
            note: t.notes || 'សូមពិនិត្យស្ថានភាពការទូទាត់ មុនបើកដំណើរការឡើងវិញ'
        });
    });

    // កូតាអ្នកប្រើប្រាស់ជិតពេញ
    tenants.filter(t => t.quotaUsers && t.usersCount / t.quotaUsers >= 0.9 && t.status !== 'suspended')
        .slice(0, 2)
        .forEach(t => {
            list.push({
                icon: 'mdi:account-group-outline',
                tone: 'warning',
                title: `${t.nameKh} ប្រើកូតាអ្នកប្រើប្រាស់ជិតពេញ`,
                note: `${t.usersCount} / ${t.quotaUsers} គណនី · គួរស្នើឲ្យតម្លើងកញ្ចប់សេវា`
            });
        });

    // ព្រឹត្តិការណ៍សុវត្ថិភាពដែលបរាជ័យ
    getAuditLogs().filter(l => l.result !== 'SUCCESS').slice(0, 3).forEach(l => {
        list.push({
            icon: 'mdi:shield-alert-outline',
            tone: 'danger',
            title: `${l.actionLabel} បរាជ័យ · ${l.userName}`,
            note: `${l.companyName} · ${l.ipAddress} · ${l.details}`,
            time: l.timestamp
        });
    });

    return list;
}
