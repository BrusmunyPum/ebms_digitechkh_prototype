/* ច្រកគ្រប់គ្រងផ្នែកលក់ — Shared runtime
ផ្ទុក៖ ថតរបារចំហៀងចល័ត, តម្រងកាលបរិច្ឆេទរួម (ស្តង់ដារលេខ 3), ម៉ឺនុយសកម្មភាពជួរតារាង (ស្តង់ដារលេខ 9) */

/* ===== 0. របារចំហៀង — បង្កើតចេញពីប្រភពតែមួយ =====
ទំព័រនីមួយៗគ្រាន់តែដាក់ <div id="sidebarHost"></div> ហើយកំណត់
data-role-root និង data-active លើ <body> ប៉ុណ្ណោះ។ ដោយសារ HTML
ត្រូវបង្កើតចេញពីអនុគមន៍តែមួយ របារចំហៀងគ្រប់ទំព័រដូចគ្នា 100%
ដោយស្វ័យប្រវត្តិ ទោះស្ថិតក្នុងថតជាន់ផ្សេងគ្នាក៏ដោយ។ */

// ផ្ទុក Iconify MDI Web Component ដោយស្វ័យប្រវត្តិ
if (!document.querySelector('script[src*="iconify"]')) {
    const iconifyScript = document.createElement('script');
    iconifyScript.src = 'https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js';
    document.head.appendChild(iconifyScript);
}

function getIconHtml(icon, extraClass = '') {
    if (!icon) return '';
    if (icon.startsWith('mdi:') || icon.startsWith('mdi-')) {
        const iconName = icon.startsWith('mdi-') ? `mdi:${icon.replace('mdi-', '')}` : icon;
        return `<iconify-icon icon="${iconName}" class="${extraClass} text-lg inline-block align-middle"></iconify-icon>`;
    }
    return `<i class="fas ${icon} ${extraClass}"></i>`;
}

const PORTAL_CONFIGS = {
    smPortal: {
        sidebarV2: true,
        title: 'ច្រកគ្រប់គ្រងលក់',
        roleName: 'អ្នកគ្រប់គ្រងផ្នែកលក់',
        roleIcon: 'mdi:account-tie',
        userInitials: 'ហវ',
        userName: 'ហេង វិច្ឆិកា',
        userRole: 'អ្នកគ្រប់គ្រងផ្នែកលក់',
        policyNote: 'បញ្ចុះតម្លៃ 0.0% ដល់ 15.0% អនុម័តដោយផ្ទាល់។ លើសពី 15.0% ត្រូវបញ្ជូនទៅអភិបាលទូទៅ។',
        nav: [
            { id: 'dashboard', label: 'ផ្ទាំងគ្រប់គ្រង', icon: 'mdi:chart-pie', href: 'dashboard.html' },
            { id: 'approvals', label: 'ការអនុម័ត', icon: 'mdi:stamper', href: 'approvals/approvals.html', badge: true },
            { id: 'pipeline', label: 'បំពង់លំហូរការលក់', icon: 'mdi:sitemap-outline', href: 'pipeline/pipeline.html' },
            { id: 'reports', label: 'របាយការណ៍លក់', icon: 'mdi:chart-bar', href: 'reports/reports.html' }
        ]
    },
    sePortal: {
        sidebarV2: true,
        title: 'ច្រកបុគ្គលិកលក់',
        roleName: 'បុគ្គលិកប្រតិបត្តិផ្នែកលក់',
        roleIcon: 'mdi:briefcase-account-outline',
        userInitials: 'សស',
        userName: 'សៅ សុខា',
        userRole: 'បុគ្គលិកប្រតិបត្តិផ្នែកលក់',
        policyNote: 'បញ្ចុះតម្លៃ 0.0% ដល់ 5.0% អនុវត្តបានដោយផ្ទាល់។ លើសពី 5.0% ត្រូវស្នើសុំការអនុម័តពីអ្នកគ្រប់គ្រងផ្នែកលក់។ ថ្លៃដើមទិញត្រូវលាក់ 100%។',
        nav: [
            { id: 'dashboard', label: 'ផ្ទាំងការងារ', icon: 'mdi:chart-pie', href: 'dashboard.html' },
            { id: 'customers', label: 'អតិថិជនរបស់ខ្ញុំ', icon: 'mdi:account-multiple-outline', href: 'customers/customers.html' },
            { id: 'quotes', label: 'សម្រង់តម្លៃ', icon: 'mdi:file-document-edit-outline', href: 'quotes/quotes.html', badge: true },
            { id: 'invoices', label: 'វិក្កយបត្រ', icon: 'mdi:receipt-text-outline', href: 'invoices/invoices.html', alertBadge: true }
        ]
    },
    posPortal: {
        sidebarV2: true,
        title: 'ច្រកគិតលុយលក់រាយ',
        roleName: 'អ្នកគិតលុយ',
        roleIcon: 'mdi:cash-register',
        userInitials: 'ចម',
        userName: 'ចន្ទ មករា',
        userRole: 'អ្នកគិតលុយលក់រាយ (POS)',
        policyNote: 'ជាប់សោរត្រឹមវេនថ្ងៃនេះ — មិនអាចរុករកប្រតិបត្តិការ ឬចំណូលពីវេនមុនបានឡើយ។',
        nav: [
            { id: 'pos', label: 'ផ្ទាំងគិតលុយ', icon: 'mdi:point-of-sale', href: 'pos-terminal.html' },
            { id: 'receipts', label: 'វិក្កយបត្រក្នុងវេន', icon: 'mdi:receipt-text-outline', href: 'receipts/receipts.html', badge: true },
            { id: 'close-shift', label: 'បិទវេន និងរាប់សាច់ប្រាក់', icon: 'mdi:cash-lock-open', href: 'close-shift.html' }
        ]
    },
    wmPortal: {
        sidebarV2: true,
        title: 'ច្រកគ្រប់គ្រងស្តុក',
        roleName: 'អ្នកគ្រប់គ្រងឃ្លាំងស្តុក',
        roleIcon: 'mdi:store-24-hour',
        userInitials: 'គវ',
        userName: 'គង់ វិបុល',
        userRole: 'អ្នកគ្រប់គ្រងឃ្លាំងស្តុក',
        policyNote: 'អនុម័តការកែតម្រូវស្តុក ≤ $200.00 ដោយផ្ទាល់។ លើសពី $200.00 ត្រូវបញ្ជូនទៅអភិបាលទូទៅ។ ហាមបង្ហាញតម្លៃលក់។',
        nav: [
            { id: 'dashboard', label: 'ផ្ទាំងគ្រប់គ្រងស្តុក', icon: 'mdi:view-dashboard-outline', href: 'dashboard.html' },
            { id: 'balance', label: 'តុល្យភាពស្តុក', icon: 'mdi:package-variant-closed', href: 'stock-balance/balance.html' },
            { id: 'movements', label: 'ចលនា & កែតម្រូវ', icon: 'mdi:swap-horizontal', href: 'movements/movements.html', badge: true },
            { id: 'reports', label: 'របាយការណ៍ស្តុក', icon: 'mdi:chart-bar', href: 'reports/reports.html' }
        ]
    },
    wsPortal: {
        sidebarV2: true,
        title: 'ច្រកបុគ្គលិកឃ្លាំង',
        roleName: 'បុគ្គលិកជាន់ឃ្លាំង',
        roleIcon: 'mdi:account-hard-hat',
        userInitials: 'សច',
        userName: 'សុខ ចាន់ថន',
        userRole: 'បុគ្គលិកជាន់ឃ្លាំង',
        policyNote: 'គោលការណ៍រក្សាការសម្ងាត់ថ្លៃដើម — ឃើញតែចំនួនទំនិញ និងទីតាំងធ្នើរប៉ុណ្ណោះ។',
        nav: [
            { id: 'dashboard', label: 'ផ្ទាំងការងារប្រចាំថ្ងៃ', icon: 'mdi:view-dashboard-outline', href: 'dashboard.html' },
            { id: 'pick-pack', label: 'រើស និងវេចខ្ចប់', icon: 'mdi:package-variant-closed', href: 'pick-and-pack.html' },
            { id: 'receive-stock', label: 'ទទួលទំនិញចូលស្តុក', icon: 'mdi:truck-delivery-outline', href: 'receive-stock.html', badge: true },
            { id: 'stock-count', label: 'រាប់ស្តុកជាក់ស្តែង', icon: 'mdi:clipboard-check-outline', href: 'stock-count.html' },
            { id: 'product-lookup', label: 'ស្វែងរកផលិតផល', icon: 'mdi:barcode-scan', href: 'product-lookup.html' }
        ]
    },
    csPortal: {
        sidebarV2: true,
        title: 'ច្រកបម្រើអតិថិជន',
        roleName: 'ផ្នែកគាំទ្រអតិថិជន',
        roleIcon: 'mdi:headset',
        userInitials: 'លស',
        userName: 'លី ស្រីមុំ',
        userRole: 'ផ្នែកបម្រើអតិថិជន',
        policyNote: 'ឆ្លើយតបសំណួរអតិថិជន, តាមដានអ្នកដឹក និងស្នើសុំប្តូរទំនិញដោយសុវត្ថិភាព។',
        nav: [
            { id: 'dashboard', label: 'ផ្ទាំងសំណើ', icon: 'mdi:ticket-confirmation-outline', href: 'dashboard.html', badge: true },
            { id: 'orders-lookup', label: 'ស្វែងរកវិក្កយបត្រ', icon: 'mdi:file-document-outline', href: 'orders-lookup.html' },
            { id: 'delivery-status', label: 'តាមដានការដឹកជញ្ជូន', icon: 'mdi:truck-check-outline', href: 'delivery-status.html' }
        ]
    },
    cpPortal: {
        sidebarV2: false,
        title: 'ច្រកអតិថិជន',
        roleName: 'អតិថិជន',
        roleIcon: 'mdi:account-star-outline',
        userInitials: 'អរ',
        userName: 'ក្រុមហ៊ុន អាកទិក រីនីវ ឯ.ក',
        userRole: 'អតិថិជនកម្រិតមាស',
        policyNote: 'មើលវិក្កយបត្រ ទូទាត់តាម KHQR និងតាមដានការដឹកជញ្ជូនរបស់ខ្លួន។',
        nav: []
    },
    spPortal: {
        sidebarV2: false,
        title: 'ច្រកអ្នកផ្គត់ផ្គង់',
        roleName: 'អ្នកផ្គត់ផ្គង់',
        roleIcon: 'mdi:truck-outline',
        userInitials: 'ហត',
        userName: 'ក្រុមហ៊ុន ហ៊ុន ត្រេឌីង ឯ.ក',
        userRole: 'ដៃគូផ្គត់ផ្គង់កម្រិតមាស',
        policyNote: 'ទទួលការបញ្ជាទិញ ចេញវិក្កយបត្រទារប្រាក់ និងតាមដានការដឹកជញ្ជូន។',
        nav: []
    },
    gmPortal: {
        sidebarV2: true,
        title: 'ច្រកអភិបាលទូទៅ',
        roleName: 'អភិបាលទូទៅ',
        roleIcon: 'mdi:shield-account',
        userInitials: 'លហ',
        userName: 'លី ហាក់សេង',
        userRole: 'អភិបាលក្រុមហ៊ុន / អ្នកគ្រប់គ្រងទូទៅ',
        policyNote: 'សិទ្ធិបញ្ជាការដ្ឋាន និងអនុម័តកំពូលនៃក្រុមហ៊ុន។',
        nav: [
            { id: 'dashboard', label: 'ផ្ទាំងគ្រប់គ្រង', icon: 'mdi:view-dashboard-outline', href: 'dashboard.html' },
            { id: 'approvals', label: 'មជ្ឈមណ្ឌលអនុម័ត', icon: 'mdi:stamper', href: 'approvals/approvals.html', badge: true },
            { id: 'users', label: 'គណនីបុគ្គលិក', icon: 'mdi:account-group-outline', href: 'users/users.html' },
            { id: 'company-profile', label: 'ព័ត៌មានក្រុមហ៊ុន', icon: 'mdi:domain', href: 'company-profile/company-profile.html' },
            { id: 'system-settings', label: 'ការកំណត់ប្រព័ន្ធ', icon: 'mdi:cog-outline', href: 'system-settings/system-settings.html' }
        ]
    },
    saPortal: {
        sidebarV2: true,
        title: 'ច្រកស៊ុបភើរអភិបាល',
        roleName: 'ស៊ុបភើរ អភិបាល',
        roleIcon: 'mdi:shield-crown-outline',
        userInitials: 'សភ',
        userName: 'អភិបាល ប្រព័ន្ធ',
        userRole: 'ស៊ុបភើរ អភិបាលប្រព័ន្ធ',
        policyNote: 'គ្រប់គ្រងប្រព័ន្ធ និងក្រុមហ៊ុនសាខាកម្រិតសកល។ គ្មានសិទ្ធិបង្កើត ឬកែប្រែប្រតិបត្តិការអាជីវកម្មផ្ទៃក្នុងក្រុមហ៊ុនឡើយ។',
        nav: [
            { id: 'dashboard', label: 'ផ្ទាំងគ្រប់គ្រង', icon: 'mdi:view-dashboard-outline', href: 'dashboard.html' },
            { id: 'companies', label: 'គ្រប់គ្រងក្រុមហ៊ុន', icon: 'mdi:domain', href: 'companies/companies.html' },
            { id: 'subscriptions', label: 'កញ្ចប់សេវា & ការជាវ', icon: 'mdi:credit-card-outline', href: 'subscriptions/subscriptions.html' },
            { id: 'audit-logs', label: 'កំណត់ហេតុសវនកម្ម', icon: 'mdi:clipboard-text-clock-outline', href: 'audit-logs/audit-logs.html' }
        ]
    },
    iaPortal: {
        sidebarV2: true,
        title: 'ច្រកសវនករផ្ទៃក្នុង',
        roleName: 'សវនករផ្ទៃក្នុង / នាយកប្រតិបត្តិ',
        roleIcon: 'mdi:shield-search',
        userInitials: 'អស',
        userName: 'អ៊ុំ សុវណ្ណារ៉ា',
        userRole: 'សវនករផ្ទៃក្នុងជាន់ខ្ពស់ / នាយកប្រតិបត្តិ',
        policyNote: 'សិទ្ធិត្រួតពិនិត្យទិន្នន័យសកល (មើលប៉ុណ្ណោះ)។ គ្មានសិទ្ធិកែប្រែប្រតិបត្តិការអាជីវកម្មឡើយ។',
        nav: [
            { id: 'dashboard', label: 'ផ្ទាំងគ្រប់គ្រង', icon: 'mdi:view-dashboard-outline', href: 'dashboard.html' },
            { id: 'audit-logs', label: 'កំណត់ហេតុសវនកម្ម', icon: 'mdi:clipboard-text-clock-outline', href: 'audit-logs.html' },
            { id: 'internal-controls', label: 'ការគ្រប់គ្រងផ្ទៃក្នុង', icon: 'mdi:shield-alert-outline', href: 'internal-controls.html', alertBadge: true },
            { id: 'financial-overview', label: 'របាយការណ៍ហិរញ្ញវត្ថុ', icon: 'mdi:finance', href: 'financial-overview.html' },
            { id: 'reports', label: 'របាយការណ៍សវនកម្ម', icon: 'mdi:file-chart-outline', href: 'reports.html' }
        ]
    },
    pmPortal: {
        sidebarV2: true,
        title: 'ច្រកគ្រប់គ្រងលទ្ធកម្ម',
        roleName: 'អ្នកគ្រប់គ្រងលទ្ធកម្ម',
        roleIcon: 'mdi:cart-outline',
        userInitials: 'ហដ',
        userName: 'ហុង ដារ៉ា',
        userRole: 'អ្នកគ្រប់គ្រងផ្នែកលទ្ធកម្ម',
        policyNote: 'អនុម័ត PO ≤ $1,000.00 ដោយផ្ទាល់។ លើសពី $1,000.00 ត្រូវបញ្ជូនទៅអភិបាលទូទៅ។ ហាមឃើញចំណូលលក់ និងទិន្នន័យអតិថិជន។',
        nav: [
            { id: 'dashboard', label: 'ផ្ទាំងគ្រប់គ្រង', icon: 'mdi:chart-pie', href: 'dashboard.html' },
            { id: 'purchase-orders', label: 'បញ្ជាទិញទំនិញ PO', icon: 'mdi:clipboard-text-outline', href: 'purchase-orders/purchase-orders.html', badge: true },
            { id: 'vendor-bills', label: 'វិក្កយបត្រទិញចូល', icon: 'mdi:receipt-text-outline', href: 'vendor-bills/vendor-bills.html', alertBadge: true },
            { id: 'suppliers', label: 'អ្នកផ្គត់ផ្គង់', icon: 'mdi:truck-delivery-outline', href: 'suppliers/suppliers.html' }
        ]
    },
    caPortal: {
        sidebarV2: true,
        title: 'ច្រកប្រធានគណនេយ្យ',
        roleName: 'ប្រធានគណនេយ្យ',
        roleIcon: 'mdi:bank',
        userInitials: 'ទវ',
        userName: 'ទៀង វណ្ណារ៉ា',
        userRole: 'ប្រធានគណនេយ្យ និងហិរញ្ញវត្ថុ',
        policyNote: 'សិទ្ធិផ្តាច់មុខលើតារាងគណនី (COA), ចាក់សោរគ្រាហិរញ្ញវត្ថុ, អនុម័តប័ណ្ណចំណាយ > $500, និងរបាយការណ៍ពន្ធដារ GDT ផ្លូវការ។',
        nav: [
            { id: 'dashboard', label: 'ផ្ទាំងគ្រប់គ្រង', icon: 'mdi:chart-pie', href: 'dashboard.html' },
            { id: 'ledger', label: 'សៀវភៅធំ & COA', icon: 'mdi:book-open-outline', href: 'ledger/ledger.html' },
            { id: 'approvals', label: 'មជ្ឈមណ្ឌលអនុម័ត', icon: 'mdi:stamper', href: 'approvals/approvals.html', badge: true },
            { id: 'financial-statements', label: 'របាយការណ៍ហិរញ្ញវត្ថុ', icon: 'mdi:finance', href: 'financial-statements/financial-statements.html' },
            { id: 'tax-reports', label: 'របាយការណ៍ពន្ធដារ GDT', icon: 'mdi:file-percent-outline', href: 'tax-reports/tax-reports.html' }
        ]
    },
    aparPortal: {
        sidebarV2: true,
        title: 'ច្រកគណនេយ្យករទូទាត់',
        roleName: 'គណនេយ្យករបំណុល និងទារប្រាក់',
        roleIcon: 'mdi:cash-multiple',
        userInitials: 'អម',
        userName: 'អ៊ុំ ម៉ានី',
        userRole: 'គណនេយ្យករបំណុល និងការទារប្រាក់ (AP/AR)',
        policyNote: 'គ្រប់គ្រងចរន្តសាច់ប្រាក់ប្រចាំថ្ងៃ, បង្កាន់ដៃទទួលប្រាក់ AR, ប័ណ្ណចំណាយ AP (ភ្ជាប់ពន្ធ WHT), និងផ្ទៀងផ្ទាត់ 3-Way Match។ ហាមកែប្រែ COA ឬបិទបញ្ជី។',
        nav: [
            { id: 'dashboard', label: 'ផ្ទាំងចរន្តសាច់ប្រាក់', icon: 'mdi:chart-pie', href: 'dashboard.html' },
            { id: 'receipts', label: 'បង្កាន់ដៃទទួលប្រាក់ AR', icon: 'mdi:receipt-text-check-outline', href: 'receipts/receipts.html', badge: true },
            { id: 'vouchers', label: 'ប័ណ្ណចំណាយទូទាត់ AP', icon: 'mdi:file-document-edit-outline', href: 'vouchers/vouchers.html', alertBadge: true }
        ]
    }
};

const NAV_ACTIVE_CLASS = 'flex items-center justify-between p-3 bg-white/15 text-white rounded-xl shadow-sm transition-all whitespace-nowrap border border-white/10';
const NAV_IDLE_CLASS = 'flex items-center justify-between p-3 text-sky-100 hover:bg-white/10 hover:text-white rounded-xl transition-all whitespace-nowrap';

function getRoleRoot() {
    if (document.body.dataset.roleRoot) {
        return document.body.dataset.roleRoot;
    }
    const loc = window.location.pathname.replace(/\\/g, '/');
    const isSub = /\/(stock-[a-z]+|movements|approvals|pipeline|reports|companies|subscriptions|audit-logs|users|company-profile|system-settings|customers|quotes|invoices|receipts|purchase-orders|vendor-bills|suppliers|financial-statements|tax-reports|vouchers|ledger)(\/|$)/.test(loc);
    return isSub ? '..' : '.';
}

/* ===== របារចំហៀងកំណែទី 2 =====
   បើកដោយដាក់ sidebarV2: true ក្នុងការកំណត់ច្រកនីមួយៗ។
   កែលម្អធៀបនឹងកំណែដើម៖
     • បង្ហាញអ្នកប្រើដែលកំពុងចូល (ប្រើ userName/userInitials/userRole ដែលមានស្រាប់)
     • បង្រួមបាន ហើយចងចាំស្ថានភាព
     • ផ្លាកលេខលាក់ពេលគ្មានអ្វី
     • ធាតុសកម្មមានបន្ទាត់សម្គាល់ និង aria-current
     • សេចក្តីណែនាំគោលការណ៍បត់បាន ដើម្បីសន្សំទីធ្លា */

const SIDEBAR_KEY = 'bms_sidebar_collapsed';

function sidebarCollapsed() {
    try {
        return localStorage.getItem(SIDEBAR_KEY) === '1';
    } catch (e) {
        return false;
    }
}

function togglePortalSidebar() {
    const el = document.getElementById('portalSidebar');
    if (!el) return;
    const collapsed = el.classList.toggle('is-collapsed');
    const chevron = document.getElementById('sbCollapseIcon');
    if (chevron) chevron.setAttribute('icon', collapsed ? 'mdi:chevron-right' : 'mdi:chevron-left');
    try {
        localStorage.setItem(SIDEBAR_KEY, collapsed ? '1' : '0');
    } catch (e) {
        // ការផ្ទុកត្រូវបានបិទ — ស្ថានភាពនៅរស់ត្រឹមទំព័របច្ចុប្បន្ន
    }
}

function togglePolicyNote() {
    const box = document.getElementById('sbPolicyBody');
    const icon = document.getElementById('sbPolicyIcon');
    if (!box) return;
    const hidden = box.classList.toggle('hidden');
    if (icon) icon.setAttribute('icon', hidden ? 'mdi:chevron-down' : 'mdi:chevron-up');
}

function renderPortalSidebarV2(host, cfg, roleRoot, activeId, sharedRoot) {
    const collapsed = sidebarCollapsed();

    const navHtml = cfg.nav.map(item => {
        const isActive = item.id === activeId;
        let badgeHtml = '';
        if (item.badge) {
            badgeHtml = '<span id="navQueueBadge" class="sb-badge sm-badge bg-rose-500 text-white px-2 py-0.5 rounded-full flex-shrink-0 hidden">0</span>';
        } else if (item.alertBadge) {
            badgeHtml = '<span id="navAlertBadge" class="sb-badge sm-badge bg-amber-500 text-white px-2 py-0.5 rounded-full flex-shrink-0 hidden">0</span>';
        }
        return `
            <a href="${roleRoot}/${item.href}" ${isActive ? 'aria-current="page"' : ''}
               class="sb-nav-item relative flex items-center justify-between gap-2 p-3 rounded-xl transition-all whitespace-nowrap ${isActive
                ? 'bg-white/15 text-white border border-white/10 shadow-sm'
                : 'text-sky-100 hover:bg-white/10 hover:text-white border border-transparent'}">
                <span class="flex items-center min-w-0">
                    <span class="w-6 flex items-center justify-center text-sky-300 flex-shrink-0">
                        ${getIconHtml(item.icon)}
                    </span>
                    <span class="ml-3 sm-nav-label truncate sb-expand-only">${item.label}</span>
                </span>
                ${badgeHtml}
                <span class="sb-tip">${item.label}</span>
            </a>`;
    }).join('');

    host.outerHTML = `
        <aside id="portalSidebar" class="w-64 bg-[#1e3a5f] text-white flex flex-col flex-shrink-0 select-none z-20 border-r border-slate-700${collapsed ? ' is-collapsed' : ''}">
            <div class="sb-brand h-[72px] px-6 flex items-center gap-3 border-b border-white/10 flex-shrink-0">
                <div class="sb-expand-only w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src="${sharedRoot}/assets/logo-mark-transparent.png" alt="DIGITECHKH" class="w-full h-full object-contain">
                </div>
                <div class="min-w-0 flex-1 sb-expand-only">
                    <h1 class="text-lg font-semibold tracking-wider whitespace-nowrap text-white">DIGITECHKH</h1>
                    <span class="sm-nav-note font-medium text-sky-300 uppercase tracking-wider block truncate">${cfg.title}</span>
                </div>
                <button onclick="togglePortalSidebar()" type="button" aria-label="បង្រួម ឬពង្រីករបារចំហៀង"
                    class="sb-collapse-btn relative hidden lg:flex w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-sky-200 hover:text-white items-center justify-center transition flex-shrink-0">
                    <iconify-icon id="sbCollapseIcon" icon="${collapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'}" class="text-lg"></iconify-icon>
                    <span class="sb-tip">ពង្រីករបារចំហៀង</span>
                </button>
            </div>

            <nav aria-label="ម៉ឺនុយរុករក" class="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-hide">
                ${navHtml}

                <div class="sb-expand-only pt-4 mt-4 border-t border-white/10">
                    <button onclick="togglePolicyNote()" type="button"
                        class="w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg text-sky-300 hover:bg-white/5 transition">
                        <span class="sm-nav-note inline-flex items-center gap-1.5">
                            <iconify-icon icon="mdi:shield-check-outline" class="text-base"></iconify-icon>
                            គោលការណ៍សិទ្ធិ
                        </span>
                        <iconify-icon id="sbPolicyIcon" icon="mdi:chevron-down" class="text-base"></iconify-icon>
                    </button>
                    <div id="sbPolicyBody" class="hidden mt-2 p-3 rounded-xl bg-white/5 border border-white/10 sm-nav-note text-sky-200">
                        ${cfg.policyNote}
                    </div>
                </div>
            </nav>

            <div class="border-t border-white/10 bg-black/20 p-3 space-y-2">
                <div class="sb-user relative flex items-center gap-3 px-2 py-1.5 rounded-xl">
                    <div class="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-100 flex items-center justify-center font-semibold text-xs flex-shrink-0">
                        ${cfg.userInitials}
                    </div>
                    <div class="min-w-0 sb-expand-only">
                        <p class="sm-value text-white truncate">${cfg.userName}</p>
                        <p class="sm-nav-note text-sky-300 truncate">${cfg.userRole}</p>
                    </div>
                    <span class="sb-tip">${cfg.userName} · ${cfg.userRole}</span>
                </div>

                <button onclick="handleLogout()" type="button" aria-label="ចាកចេញពីប្រព័ន្ធ"
                    class="sb-nav-item relative w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-rose-600 text-sky-100 hover:text-white font-semibold transition border border-white/10 shadow-sm cursor-pointer group">
                    <iconify-icon icon="mdi:logout" class="text-lg text-rose-300 group-hover:text-white transition-colors"></iconify-icon>
                    <span class="sm-nav-label sb-expand-only">ចាកចេញ</span>
                    <span class="sb-tip">ចាកចេញ</span>
                </button>
            </div>
        </aside>`;
}

/* ===== ក្បាលទំព័ររួម =====
   ទំព័រគ្រាន់តែដាក់ <div id="headerHost" data-title="..." data-subtitle="..."></div>
   រួចក្បាលទំព័របង្កើតចេញពីអនុគមន៍តែមួយ ដូច្នេះគ្រប់ទំព័រដូចគ្នា 100%។
   រចនា៖ ចំណងជើង និងចំណងជើងរងខាងឆ្វេង · ជូនដំណឹង និងប្រវត្តិរូបខាងស្តាំ។

   ទិន្នន័យជូនដំណឹងមកពីអនុគមន៍ portalNotifications() ក្នុង data.js របស់តួនាទី
   នីមួយៗ (ស្រេចចិត្ត)។ បើគ្មាន ប្រអប់នឹងបង្ហាញសារថាគ្មានដំណឹងថ្មី។ */

function portalNotificationList() {
    if (typeof portalNotifications === 'function') {
        try {
            return portalNotifications() || [];
        } catch (e) {
            return [];
        }
    }
    return [];
}

/* ទំព័រខ្លះកំណត់ចំណងជើង និងចំណងជើងរងតាមទិន្នន័យពេលដំណើរការ (ឧ. លេខវេន ឬលេខវិក្កយបត្រ) */
function setPortalSubtitle(text) {
    const el = document.getElementById('portalSubtitle');
    if (el) el.textContent = text;
}

function setPortalTitle(text) {
    const el = document.getElementById('portalTitle');
    if (el) el.textContent = text;
}

/* ប្តូរគោលដៅប៊ូតុងត្រឡប់ក្រោយពេលដំណើរការ (ទំព័រកែប្រែខ្លះត្រឡប់ទៅទំព័រលម្អិត) */
function setPortalBackHref(href) {
    const el = document.getElementById('portalBackBtn');
    if (el) el.href = href;
}

function isDarkMode() {
    try {
        return localStorage.getItem('bms_theme') === 'dark';
    } catch (e) {
        return false;
    }
}

function updateDarkModeUI(isDark) {
    const icon = document.getElementById('darkModeIcon');
    if (icon) {
        icon.setAttribute('icon', isDark ? 'mdi:weather-sunny' : 'mdi:weather-night');
        icon.className = isDark ? 'text-xl text-amber-400' : 'text-xl text-slate-500';
    }
    if (isDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
    }

    // Dispatch custom event for pages with specialized widgets
    window.dispatchEvent(new CustomEvent('bms-theme-change', { detail: { isDark } }));

    // Trigger chart resize / update if chart exists
    if (window.echarts) {
        const charts = document.querySelectorAll('[_echarts_instance_]');
        charts.forEach(el => {
            const chart = echarts.getInstanceByDom(el);
            if (chart) {
                chart.resize();
            }
        });
    }
}

function toggleDarkMode() {
    const nextDark = !isDarkMode();
    try {
        localStorage.setItem('bms_theme', nextDark ? 'dark' : 'light');
    } catch (e) {}
    updateDarkModeUI(nextDark);
    if (typeof showToast === 'function') {
        showToast(nextDark ? 'បានប្តូរទៅ Dark Mode' : 'បានប្តូរទៅ Light Mode', 'info');
    }
}

function initDarkMode() {
    updateDarkModeUI(isDarkMode());
}

function renderPortalHeader() {
    const host = document.getElementById('headerHost');
    if (!host) return;

    const portalId = document.body.dataset.portal || document.body.id || 'smPortal';
    const cfg = PORTAL_CONFIGS[portalId] || PORTAL_CONFIGS.smPortal;
    const title = host.dataset.title || '';
    const subtitle = host.dataset.subtitle || '';
    const backHref = host.dataset.back || '';
    const avatarSrc = `${getRoleRoot()}/../../shared/assets/avatars/${portalId}.jpg`;

    const notes = portalNotificationList();
    const toneMap = {
        info: 'bg-sky-100 text-sky-700',
        success: 'bg-emerald-100 text-emerald-700',
        warning: 'bg-amber-100 text-amber-700',
        danger: 'bg-rose-100 text-rose-700'
    };

    const notifRows = notes.length
        ? notes.map(n => `
            <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition">
                <span class="w-8 h-8 rounded-lg ${toneMap[n.tone] || toneMap.info} flex items-center justify-center flex-shrink-0 mt-0.5">
                    <iconify-icon icon="${n.icon || 'mdi:bell-outline'}" class="text-base"></iconify-icon>
                </span>
                <div class="min-w-0 flex-1">
                    <p class="text-xs font-semibold text-slate-800 leading-snug">${n.title}</p>
                    ${n.note ? `<p class="text-[11px] text-slate-500 mt-1 leading-relaxed">${n.note}</p>` : ''}
                    ${n.time ? `<span class="inline-block text-[10px] text-slate-400 font-medium mt-1">${n.time}</span>` : ''}
                </div>
            </div>`).join('')
        : `<div class="py-8 text-center text-slate-400">
               <iconify-icon icon="mdi:bell-check-outline" class="text-3xl text-slate-300 mb-1"></iconify-icon>
               <p class="text-xs">គ្មានដំណឹងថ្មីទេ</p>
           </div>`;

    const backBtn = backHref
        ? `<a id="portalBackBtn" href="${backHref}" title="ត្រឡប់ក្រោយ"
              class="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition border border-slate-200/70 flex-shrink-0">
               <i class="fas fa-arrow-left text-sm"></i>
           </a>`
        : '';

    host.outerHTML = `
        <header class="bg-white px-6 h-[72px] flex justify-between items-center shadow-sm z-10 flex-shrink-0 w-full transition-colors duration-200">
            <div class="flex items-center gap-4 min-w-0">
                ${backBtn}
                <div class="min-w-0">
                    <h2 id="portalTitle" class="text-xl font-semibold text-gray-800 leading-tight truncate">${title}</h2>
                    <p id="portalSubtitle" class="text-xs text-gray-400 mt-0.5 truncate">${subtitle}</p>
                </div>
            </div>

            <div class="flex items-center gap-1.5 flex-shrink-0">
                <!-- Dark Mode Toggle Button -->
                <button onclick="toggleDarkMode()" type="button" aria-label="ប្តូរទម្រង់ពណ៌ (Dark/Light Mode)" id="darkModeToggleBtn"
                    class="w-10 h-10 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition cursor-pointer"
                    title="ប្តូរ Dark / Light Mode">
                    <iconify-icon id="darkModeIcon" icon="mdi:weather-night" class="text-xl"></iconify-icon>
                </button>

                <!-- Notification Menu -->
                <div class="relative">
                    <button onclick="toggleRowActionMenu(event, 'portalNotifMenu')" type="button" aria-label="ការជូនដំណឹង"
                        class="relative w-10 h-10 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition cursor-pointer">
                        <iconify-icon icon="mdi:bell-outline" class="text-xl"></iconify-icon>
                        ${notes.length
            ? '<span class="absolute top-2 right-2.5 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white"></span>'
            : ''}
                    </button>
                    <div id="portalNotifMenu" class="hidden bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 text-left z-50">
                        <div class="px-3 py-2 mb-1.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2">
                            <span class="text-xs font-semibold text-slate-700">ការជូនដំណឹង</span>
                            <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">${notes.length}</span>
                        </div>
                        <div class="max-h-[360px] overflow-y-auto scrollbar-hide space-y-1">${notifRows}</div>
                    </div>
                </div>
            </div>
        </header>`;

    initDarkMode();
}

function renderPortalSidebar() {
    // ច្រកខាងក្រៅ (អតិថិជន/អ្នកផ្គត់ផ្គង់) មាន <aside> ផ្ទាល់ខ្លួន ដូច្នេះមិនជំនួសទេ
    const host = document.getElementById('sidebarHost');
    if (!host) return;

    const portalId = document.body.dataset.portal || document.body.id || 'smPortal';
    const cfg = PORTAL_CONFIGS[portalId] || PORTAL_CONFIGS.smPortal;
    const roleRoot = getRoleRoot();
    const activeId = document.body.dataset.active || '';
    const sharedRoot = `${roleRoot}/../../shared`;

    if (cfg.sidebarV2) {
        renderPortalSidebarV2(host, cfg, roleRoot, activeId, sharedRoot);
        return;
    }

    const navHtml = cfg.nav.map(item => {
        const isActive = item.id === activeId;
        let badgeHtml = '';
        if (item.badge) {
            badgeHtml = '<span id="navQueueBadge" class="sm-badge bg-rose-500 text-white px-2 py-0.5 rounded-full flex-shrink-0">0</span>';
        } else if (item.alertBadge) {
            badgeHtml = '<span id="navAlertBadge" class="sm-badge bg-amber-500 text-white px-2 py-0.5 rounded-full flex-shrink-0">0</span>';
        }
        return `
            <a href="${roleRoot}/${item.href}" class="${isActive ? NAV_ACTIVE_CLASS : NAV_IDLE_CLASS}">
                <span class="flex items-center min-w-0">
                    <span class="w-6 flex items-center justify-center text-sky-300 flex-shrink-0">
                        ${getIconHtml(item.icon)}
                    </span>
                    <span class="ml-3 sm-nav-label truncate">${item.label}</span>
                </span>
                ${badgeHtml}
            </a>`;
    }).join('');

    host.outerHTML = `
        <aside class="w-64 bg-[#1e3a5f] text-white flex flex-col flex-shrink-0 select-none z-20 border-r border-slate-700">
            <div class="h-[72px] px-6 flex items-center gap-3 border-b border-white/10 flex-shrink-0">
                <div class="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src="${sharedRoot}/assets/logo-mark-transparent.png" alt="DIGITECHKH" class="w-full h-full object-contain">
                </div>
                <div class="min-w-0">
                    <h1 class="text-lg font-semibold tracking-wider whitespace-nowrap text-white">DIGITECHKH</h1>
                    <span class="sm-nav-note font-medium text-sky-300 uppercase tracking-wider block">${cfg.title}</span>
                </div>
            </div>

            <div class="px-5 py-3 border-b border-white/5 bg-black/15">
                <div class="flex items-center justify-between">
                    <span class="sm-nav-note text-sky-200">តួនាទី:</span>
                    <span class="sm-badge inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-200 border border-sky-400/30">
                        ${getIconHtml(cfg.roleIcon, 'text-[13px]')} ${cfg.roleName}
                    </span>
                </div>
            </div>

            <nav class="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 scrollbar-hide">
                ${navHtml}
                <div class="p-3 rounded-xl bg-white/5 border border-white/10 sm-nav-note text-sky-200 mt-6 flex items-start gap-2">
                    <iconify-icon icon="mdi:information-outline" class="text-sky-300 text-base mt-0.5 flex-shrink-0"></iconify-icon>
                    <span>${cfg.policyNote}</span>
                </div>
            </nav>

            <div class="p-3.5 border-t border-white/10 bg-black/20">
                <button onclick="handleLogout()" type="button"
                    class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-rose-600 text-sky-100 hover:text-white text-sm font-semibold transition border border-white/10 shadow-sm cursor-pointer group">
                    <iconify-icon icon="mdi:logout" class="text-lg text-rose-300 group-hover:text-white group-hover:translate-x-0.5 transition-transform"></iconify-icon>
                    <span>ចាកចេញ</span>
                </button>
            </div>
        </aside>`;
}

function handleLogout() {
    if (typeof showCustomConfirm === 'function') {
        showCustomConfirm({
            title: 'ចាកចេញពីប្រព័ន្ធ',
            message: 'តើលោកអ្នកពិតជាចង់ចាកចេញពីប្រព័ន្ធមែនទេ?',
            confirmText: 'ចាកចេញ',
            cancelText: 'បោះបង់',
            confirmColor: 'danger',
            onConfirm: () => {
                showToast('កំពុងចាកចេញពីប្រព័ន្ធ...', 'info');
                const roleRoot = getRoleRoot();
                setTimeout(() => {
                    window.location.href = `${roleRoot}/../00-auth/login.html`;
                }, 400);
            }
        });
    } else {
        if (confirm('តើលោកអ្នកពិតជាចង់ចាកចេញពីប្រព័ន្ធមែនទេ?')) {
            const roleRoot = getRoleRoot();
            window.location.href = `${roleRoot}/../00-auth/login.html`;
        }
    }
}

/* ===== 1. របារចំហៀងចល័តសម្រាប់អេក្រង់តូច (< 1024px) ===== */
function initPortalMobileDrawer() {
    const aside = document.querySelector('aside');
    const header = document.querySelector('header');
    if (!aside || !header) return;

    let backdrop = document.getElementById('bmsMobileBackdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'bmsMobileBackdrop';
        backdrop.onclick = closePortalDrawer;
        document.body.appendChild(backdrop);
    }

    // ទំព័ររងដែលមានប៊ូតុងត្រឡប់ក្រោយស្រាប់ មិនបញ្ចូលប៊ូតុងម៉ឺនុយទេ ដើម្បីកុំឱ្យក្បាលទំព័ររញ៉េរញ៉ៃ
    const hasBackButton = header.querySelector('a i.fa-arrow-left');
    if (!hasBackButton && !document.getElementById('bmsMobileMenuBtn')) {
        const btn = document.createElement('button');
        btn.id = 'bmsMobileMenuBtn';
        btn.type = 'button';
        btn.title = 'បើកម៉ឺនុយ';
        btn.className = 'lg:hidden w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition border border-slate-200/70 flex-shrink-0 mr-3';
        btn.innerHTML = '<i class="fas fa-bars text-sm"></i>';
        btn.onclick = openPortalDrawer;
        header.insertBefore(btn, header.firstElementChild);
    }

    if (!document.getElementById('bmsSidebarCloseBtn')) {
        const brand = aside.firstElementChild;
        if (brand) {
            const close = document.createElement('button');
            close.id = 'bmsSidebarCloseBtn';
            close.type = 'button';
            close.title = 'បិទម៉ឺនុយ';
            close.className = 'lg:hidden w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition flex-shrink-0 ml-auto';
            close.innerHTML = '<i class="fas fa-xmark text-sm"></i>';
            close.onclick = closePortalDrawer;
            brand.appendChild(close);
        }
    }
}

function openPortalDrawer() {
    const aside = document.querySelector('aside');
    const backdrop = document.getElementById('bmsMobileBackdrop');
    if (aside) aside.classList.add('mobile-open');
    if (backdrop) backdrop.classList.add('active');
}

function closePortalDrawer() {
    const aside = document.querySelector('aside');
    const backdrop = document.getElementById('bmsMobileBackdrop');
    if (aside) aside.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
}

/* ===== 2. តម្រងកាលបរិច្ឆេទរួម (ស្តង់ដារលេខ 3) =====
   ទម្រង់ HTML ត្រូវបានបង្កើតចេញពីអនុគមន៍តែមួយ ដូច្នេះគ្រប់ទំព័រទាំងអស់ដូចគ្នាបេះបិទ 100% ដោយស្វ័យប្រវត្តិ */

const MONTH_NAMES_KH = {
    1: 'មករា', 2: 'កុម្ភៈ', 3: 'មីនា', 4: 'មេសា',
    5: 'ឧសភា', 6: 'មិថុនា', 7: 'កក្កដា', 8: 'សីហា',
    9: 'កញ្ញា', 10: 'តុលា', 11: 'វិច្ឆិកា', 12: 'ធ្នូ'
};

const DATE_PRESETS = [
    'ថ្ងៃនេះ', 'ម្សិលមិញ', 'សប្តាហ៍នេះ', 'សប្តាហ៍មុន', 'ខែនេះ',
    'ខែមុន', 'ឆ្នាំនេះ', '7 ថ្ងៃចុងក្រោយ', '14 ថ្ងៃចុងក្រោយ', '30 ថ្ងៃចុងក្រោយ'
];

let rangeStartDate = null;
let rangeEndDate = null;
let selectingRangeStart = false;
let currentPresetName = 'ខែនេះ';
let calCurrentMonth = 9;
let calCurrentYear = 2026;

function renderDateRangePicker(hostId) {
    const host = document.getElementById(hostId);
    if (!host) return;

    const presetButtons = DATE_PRESETS.map(name => {
        const isDefault = name === 'ខែនេះ';
        const cls = isDefault
            ? 'preset-btn w-full text-left px-3 py-1.5 rounded-lg bg-[#0f2b5c] text-white font-medium shadow-sm transition-colors'
            : 'preset-btn w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-600';
        return `<button class="${cls}" onclick="selectPreset('${name}')">${name}</button>`;
    }).join('');

    host.classList.add('relative');
    host.innerHTML = `
        <span class="text-xs text-slate-400 hidden sm:inline mr-1.5">កាលបរិច្ឆេទ:</span>
        <button onclick="toggleDatePicker(event)" class="h-9 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs rounded-xl inline-flex items-center gap-2 shadow-sm transition-all focus:outline-none cursor-pointer">
            <i class="fas fa-calendar-days text-primary text-xs"></i>
            <span id="selectedDateLabel" class="font-medium text-slate-800">1 កញ្ញា - 30 កញ្ញា</span>
            <i class="fas fa-chevron-down text-[10px] text-slate-400 transition-transform duration-200 ml-0.5" id="datePickerChevron"></i>
        </button>
        <div id="datePickerPopover" onclick="event.stopPropagation()" class="hidden absolute right-0 top-full mt-1.5 w-[480px] max-w-[92vw] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 select-none">
            <div class="grid grid-cols-[140px_1fr]">
                <div class="p-3 border-r border-slate-100 space-y-0.5 text-xs">${presetButtons}</div>
                <div class="p-3.5">
                    <div class="flex items-center justify-between mb-2">
                        <button onclick="changeCalendarMonth(-1)" class="w-6 h-6 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition">
                            <i class="fas fa-chevron-left text-[10px]"></i>
                        </button>
                        <span id="calMonthYearLabel" class="text-xs font-semibold text-slate-800"></span>
                        <button onclick="changeCalendarMonth(1)" class="w-6 h-6 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition">
                            <i class="fas fa-chevron-right text-[10px]"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-7 gap-y-1 text-center text-[10px] text-slate-400 font-semibold mb-1">
                        <span>ច</span><span>អ</span><span>ព</span><span>ព្រ</span><span>សុ</span><span>ស</span><span>អា</span>
                    </div>
                    <div id="calendarDaysGrid" class="grid grid-cols-7 gap-y-1 text-center text-xs"></div>
                </div>
            </div>
            <div class="flex items-center justify-between gap-2 p-3 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-medium text-slate-700">
                    <span id="rangeTagLabel">ខែនេះ</span>
                    <button onclick="clearRangeTag()" class="text-slate-400 hover:text-rose-500 transition"><i class="fas fa-xmark text-[10px]"></i></button>
                </span>
                <div class="flex items-center gap-2">
                    <button onclick="toggleDatePicker(event)" class="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-200 text-[11px] font-medium transition">បោះបង់</button>
                    <button onclick="applyDateRange()" class="px-3.5 py-1.5 rounded-lg bg-[#0f2b5c] hover:bg-[#0a1d3f] text-white text-[11px] font-semibold shadow-sm transition">ជ្រើសរើស</button>
                </div>
            </div>
        </div>`;

    selectPreset('ខែនេះ');
}

function toggleDatePicker(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const popover = document.getElementById('datePickerPopover');
    const chevron = document.getElementById('datePickerChevron');
    if (!popover) return;
    if (popover.classList.contains('hidden')) {
        popover.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
        renderCalendarGrid();
    } else {
        popover.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
    }
}

function changeCalendarMonth(delta) {
    calCurrentMonth += delta;
    if (calCurrentMonth > 12) { calCurrentMonth = 1; calCurrentYear += 1; }
    else if (calCurrentMonth < 1) { calCurrentMonth = 12; calCurrentYear -= 1; }
    renderCalendarGrid();
}

function updateRangeLabels(btnText, tagText) {
    const btnEl = document.getElementById('selectedDateLabel');
    const tagEl = document.getElementById('rangeTagLabel');
    if (btnEl) btnEl.textContent = btnText;
    if (tagEl) tagEl.textContent = tagText;
}

function highlightPresetButton(name) {
    document.querySelectorAll('.preset-btn').forEach(btn => {
        if (name && btn.textContent.trim() === name) {
            btn.className = 'preset-btn w-full text-left px-3 py-1.5 rounded-lg bg-[#0f2b5c] text-white font-medium shadow-sm transition-colors';
        } else {
            btn.className = 'preset-btn w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-600';
        }
    });
}

function handleDateClick(year, month, day) {
    const clickedDate = new Date(year, month - 1, day);
    clickedDate.setHours(0, 0, 0, 0);

    if (!selectingRangeStart || (rangeStartDate && rangeEndDate)) {
        rangeStartDate = clickedDate;
        rangeEndDate = null;
        selectingRangeStart = true;
        currentPresetName = null;
        const tagEl = document.getElementById('rangeTagLabel');
        if (tagEl) tagEl.textContent = `${day} ${MONTH_NAMES_KH[month]} (សូមជ្រើសថ្ងៃបញ្ចប់)`;
    } else {
        if (clickedDate < rangeStartDate) {
            rangeEndDate = rangeStartDate;
            rangeStartDate = clickedDate;
        } else {
            rangeEndDate = clickedDate;
        }
        selectingRangeStart = false;

        const sD = rangeStartDate.getDate();
        const sM = MONTH_NAMES_KH[rangeStartDate.getMonth() + 1];
        const eD = rangeEndDate.getDate();
        const eM = MONTH_NAMES_KH[rangeEndDate.getMonth() + 1];
        const rangeText = `${sD} ${sM} - ${eD} ${eM}`;
        updateRangeLabels(rangeText, rangeText);
    }

    highlightPresetButton(null);
    renderCalendarGrid();
}

function renderCalendarGrid() {
    const grid = document.getElementById('calendarDaysGrid');
    const monthLabel = document.getElementById('calMonthYearLabel');
    if (!grid) return;

    monthLabel.textContent = `${MONTH_NAMES_KH[calCurrentMonth]} ${calCurrentYear}`;
    grid.innerHTML = '';

    const daysInMonth = new Date(calCurrentYear, calCurrentMonth, 0).getDate();
    const firstDayIndex = new Date(calCurrentYear, calCurrentMonth - 1, 1).getDay();
    const leadingBlanks = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    for (let i = 0; i < leadingBlanks; i++) {
        grid.appendChild(document.createElement('span'));
    }

    let effectiveStart = rangeStartDate ? new Date(rangeStartDate) : null;
    let effectiveEnd = rangeEndDate ? new Date(rangeEndDate) : null;
    if (effectiveStart) effectiveStart.setHours(0, 0, 0, 0);
    if (effectiveEnd) effectiveEnd.setHours(0, 0, 0, 0);

    for (let d = 1; d <= daysInMonth; d++) {
        const currentD = new Date(calCurrentYear, calCurrentMonth - 1, d);
        currentD.setHours(0, 0, 0, 0);

        const isStart = effectiveStart && currentD.getTime() === effectiveStart.getTime();
        const isEnd = effectiveEnd && currentD.getTime() === effectiveEnd.getTime();
        const isInRange = effectiveStart && effectiveEnd && currentD > effectiveStart && currentD < effectiveEnd;

        const cell = document.createElement('div');
        cell.className = 'flex items-center justify-center cursor-pointer h-7';
        cell.onclick = () => handleDateClick(calCurrentYear, calCurrentMonth, d);

        if (isStart && isEnd) {
            cell.innerHTML = `<span class="w-7 h-7 rounded-full bg-[#0f2b5c] text-white flex items-center justify-center font-bold text-xs shadow">${d}</span>`;
        } else if (isStart && effectiveEnd) {
            cell.className += ' bg-slate-100 rounded-l-full';
            cell.innerHTML = `<span class="w-7 h-7 rounded-full bg-[#0f2b5c] text-white flex items-center justify-center font-bold text-xs shadow">${d}</span>`;
        } else if (isStart && !effectiveEnd) {
            cell.innerHTML = `<span class="w-7 h-7 rounded-full bg-[#0f2b5c] text-white flex items-center justify-center font-bold text-xs ring-2 ring-primary/30 shadow">${d}</span>`;
        } else if (isEnd) {
            cell.className += ' bg-slate-100 rounded-r-full';
            cell.innerHTML = `<span class="w-7 h-7 rounded-full bg-[#0f2b5c] text-white flex items-center justify-center font-bold text-xs shadow">${d}</span>`;
        } else if (isInRange) {
            cell.className += ' bg-slate-100 text-slate-800 font-medium text-xs';
            cell.innerHTML = `<span>${d}</span>`;
        } else {
            cell.className += ' rounded-lg hover:bg-slate-100 text-slate-700 transition text-xs';
            cell.innerHTML = `<span>${d}</span>`;
        }

        grid.appendChild(cell);
    }
}

function selectPreset(name) {
    currentPresetName = name;
    selectingRangeStart = false;

    const seed = {
        'ថ្ងៃនេះ': [9, new Date(2026, 8, 3), new Date(2026, 8, 3), '3 កញ្ញា'],
        'ម្សិលមិញ': [9, new Date(2026, 8, 2), new Date(2026, 8, 2), '2 កញ្ញា'],
        'សប្តាហ៍នេះ': [9, new Date(2026, 8, 1), new Date(2026, 8, 7), '1 កញ្ញា - 7 កញ្ញា'],
        'សប្តាហ៍មុន': [8, new Date(2026, 7, 24), new Date(2026, 7, 30), '24 សីហា - 30 សីហា'],
        'ខែនេះ': [9, new Date(2026, 8, 1), new Date(2026, 8, 30), '1 កញ្ញា - 30 កញ្ញា'],
        'ខែមុន': [8, new Date(2026, 7, 1), new Date(2026, 7, 31), '1 សីហា - 31 សីហា'],
        'ឆ្នាំនេះ': [9, new Date(2026, 0, 1), new Date(2026, 11, 31), 'ឆ្នាំ 2026'],
        '7 ថ្ងៃចុងក្រោយ': [9, new Date(2026, 7, 28), new Date(2026, 8, 3), '28 សីហា - 3 កញ្ញា'],
        '14 ថ្ងៃចុងក្រោយ': [9, new Date(2026, 7, 21), new Date(2026, 8, 3), '21 សីហា - 3 កញ្ញា'],
        '30 ថ្ងៃចុងក្រោយ': [9, new Date(2026, 7, 5), new Date(2026, 8, 3), '5 សីហា - 3 កញ្ញា']
    }[name];

    if (seed) {
        calCurrentMonth = seed[0];
        rangeStartDate = seed[1];
        rangeEndDate = seed[2];
        updateRangeLabels(seed[3], seed[3]);
    }

    highlightPresetButton(name);
    renderCalendarGrid();
}

function clearRangeTag() {
    currentPresetName = 'ទាំងអស់';
    rangeStartDate = null;
    rangeEndDate = null;
    selectingRangeStart = false;
    updateRangeLabels('ទាំងអស់', 'ទាំងអស់');
    highlightPresetButton(null);
    renderCalendarGrid();
}

function applyDateRange() {
    if (selectingRangeStart && rangeStartDate && !rangeEndDate) {
        rangeEndDate = new Date(rangeStartDate);
        selectingRangeStart = false;
        const text = `${rangeStartDate.getDate()} ${MONTH_NAMES_KH[rangeStartDate.getMonth() + 1]}`;
        updateRangeLabels(text, text);
    }
    toggleDatePicker();
    const label = document.getElementById('selectedDateLabel');
    showToast('បានអនុវត្តតម្រងកាលបរិច្ឆេទ៖ ' + (label ? label.textContent : ''), 'info');
    notifyRangeChanged();
}

function getSelectedRange() {
    return { start: rangeStartDate, end: rangeEndDate };
}

function notifyRangeChanged() {
    if (typeof window.onDateRangeApplied === 'function') {
        window.onDateRangeApplied(getSelectedRange());
    }
}

/* ===== 3. ម៉ឺនុយសកម្មភាពជួរតារាង (ស្តង់ដារលេខ 9) ===== */
function toggleRowActionMenu(event, menuId) {
    if (event && event.stopPropagation) event.stopPropagation();
    const btn = event ? event.currentTarget : null;
    const menu = document.getElementById(menuId);
    if (!menu) return;

    if (menu.dataset.floatingActive === 'true') {
        if (typeof closeFloatingDropdown === 'function') closeFloatingDropdown(menu);
    } else {
        if (typeof openFloatingDropdown === 'function') openFloatingDropdown(btn, menu);
    }
}

/* ===== 4. ប្រព័ន្ធរុករកទំព័រភ្លាមៗឥត Reload (Seamless Instant SPA Navigation) ===== */
function initSeamlessNavigation() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link || !link.href) return;

        // Skip if modifier keys or target blank or hash or javascript
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (link.target === '_blank' || link.getAttribute('target') === '_blank') return;
        if (link.href.startsWith('javascript:') || link.getAttribute('href') === '#') return;

        // Check if internal link within the current site
        const url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin) return;

        // Only handle .html files within roles
        if (!url.pathname.endsWith('.html') && !url.pathname.includes('.html')) return;

        e.preventDefault();
        navigateSeamlessly(url.href, true);
    });

    window.addEventListener('popstate', () => {
        navigateSeamlessly(window.location.href, false);
    });
}

async function navigateSeamlessly(targetUrl, pushState = true) {
    try {
        const res = await fetch(targetUrl);
        if (!res.ok) throw new Error('Network error');

        const htmlText = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        const newMain = doc.querySelector('main');
        const newHeader = doc.querySelector('header');
        const currentMain = document.querySelector('main');
        const currentHeader = document.querySelector('header');

        if (!newMain) {
            window.location.href = targetUrl;
            return;
        }

        // Close any open modals or floating dropdowns
        closeAllFloatingDropdowns?.();
        closePortalDrawer();

        // Smooth transition animation
        if (currentMain) {
            currentMain.style.transition = 'opacity 0.15s ease-out, transform 0.15s ease-out';
            currentMain.style.opacity = '0';
            currentMain.style.transform = 'translateY(4px)';
        }

        setTimeout(() => {
            if (pushState) {
                history.pushState({ path: targetUrl }, '', targetUrl);
            }

            // Update page metadata
            document.title = doc.title || document.title;
            if (doc.body.id) document.body.id = doc.body.id;
            if (doc.body.dataset.active) document.body.dataset.active = doc.body.dataset.active;
            if (doc.body.dataset.roleRoot) document.body.dataset.roleRoot = doc.body.dataset.roleRoot;

            // Replace header and main content
            if (currentHeader && newHeader) {
                currentHeader.innerHTML = newHeader.innerHTML;
            }
            if (currentMain && newMain) {
                currentMain.innerHTML = newMain.innerHTML;
                currentMain.className = newMain.className;
                currentMain.scrollTop = 0;
            }

            // Sync any modals/popovers that live outside main in the target document
            const newModals = doc.querySelectorAll('[id$="Modal"], [id$="Menu"], [id$="Drawer"]');
            newModals.forEach(m => {
                const existing = document.getElementById(m.id);
                if (existing) {
                    existing.outerHTML = m.outerHTML;
                } else {
                    document.body.appendChild(m.cloneNode(true));
                }
            });

            // Update sidebar navigation active highlight with updated location
            renderPortalSidebar();
            renderPortalHeader();
            initPortalMobileDrawer();

            // Update badge counters
            updatePortalBadges();

            // Execute scripts inside the target page
            const scripts = doc.querySelectorAll('body script:not([src])');
            scripts.forEach(s => {
                try {
                    const scriptFn = new Function(s.textContent);
                    scriptFn();
                } catch (err) {
                    console.warn('Inline script execution:', err);
                }
            });

            // Trigger DOMContentLoaded callbacks if any
            if (typeof totalPending === 'function') updatePortalBadges();

            // Fade in content
            if (currentMain) {
                currentMain.style.opacity = '1';
                currentMain.style.transform = 'translateY(0)';
            }
        }, 150);

    } catch (err) {
        // Graceful fallback for environments where fetch might be restricted
        window.location.href = targetUrl;
    }
}

function updatePortalBadges() {
    // ផ្លាកលេខបង្ហាញតែពេលមានចំនួនពិតប្រាកដ — លេខ 0 ជារំខាន
    const paint = (id, value) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = value;
        el.classList.toggle('hidden', !value);
    };
    if (typeof totalPending === 'function') paint('navQueueBadge', totalPending());
    if (typeof totalAlerts === 'function') paint('navAlertBadge', totalAlerts());
}

document.addEventListener('DOMContentLoaded', () => {
    renderPortalSidebar();
    // ក្បាលទំព័រត្រូវបង្កើតមុនថតចល័ត ព្រោះថតចល័តបញ្ចូលប៊ូតុងម៉ឺនុយទៅក្នុងក្បាលទំព័រ
    renderPortalHeader();
    initPortalMobileDrawer();
    // initSeamlessNavigation(); // បិទការស្ទាក់ចាប់ SPA នេះ ដើម្បីឱ្យការប្តូរទំព័រដំណើរការតាម Browser ធម្មជាតិ និងដំណើរការ DOMContentLoaded គ្រប់ទំព័រ 100%
    updatePortalBadges();

    document.addEventListener('click', (e) => {
        const popover = document.getElementById('datePickerPopover');
        if (popover && !popover.classList.contains('hidden') && !popover.contains(e.target)) {
            const trigger = e.target.closest('button');
            const isTrigger = trigger && trigger.querySelector('#selectedDateLabel');
            if (!isTrigger) {
                popover.classList.add('hidden');
                const chevron = document.getElementById('datePickerChevron');
                if (chevron) chevron.classList.remove('rotate-180');
            }
        }
    });
});
