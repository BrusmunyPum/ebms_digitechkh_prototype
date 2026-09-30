/* ស្ថានភាពឯកសារ — ប្រភពតែមួយ (ឯកសារ 19 ផ្នែក 2 · ឯកសារ 15)
   លេខកូដស្ថានភាព → ស្លាកភាសាខ្មែរ + ពណ៌ស្លាក។ ទំព័រមិនសរសេរ class ស្លាកដោយដៃឡើយ
   គឺហៅ statusBadge(code) ជំនួស។ បន្ថែមស្ថានភាពថ្មី ត្រូវបន្ថែមក្នុងឯកសារ 19 មុនសិន។ */

const STATUS_TONES = {
    slate: 'bg-slate-100 text-slate-600 border-slate-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    sky: 'bg-sky-50 text-sky-700 border-sky-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200'
};

const STATUS_META = {
    DRAFT: { label: 'ព្រាង', tone: 'slate' },
    PENDING_APPROVAL: { label: 'រង់ចាំអនុម័ត', tone: 'amber' },
    APPROVED: { label: 'បានអនុម័ត', tone: 'emerald' },
    REJECTED: { label: 'បានបដិសេធ', tone: 'rose' },
    SENT_TO_CUSTOMER: { label: 'បានផ្ញើជូនអតិថិជន', tone: 'sky' },
    ACCEPTED_BY_CUSTOMER: { label: 'អតិថិជនបានយល់ព្រម', tone: 'emerald' },
    DECLINED_BY_CUSTOMER: { label: 'អតិថិជនបានបដិសេធ', tone: 'slate' },
    CONVERTED_TO_INVOICE: { label: 'បានបំប្លែងជាវិក្កយបត្រ', tone: 'indigo' },
    EXPIRED: { label: 'ផុតសុពលភាព', tone: 'slate' },
    CANCELLED: { label: 'បានលុបចោល', tone: 'slate' },
    OVERDUE: { label: 'ហួសកាលកំណត់', tone: 'rose' },
    PARTIALLY_PAID: { label: 'បានទូទាត់ខ្លះ', tone: 'amber' },
    PAID: { label: 'បានទូទាត់', tone: 'emerald' },
    UNPAID: { label: 'មិនទាន់ទូទាត់', tone: 'slate' },
    AWAITING_DELIVERY: { label: 'រង់ចាំទទួលទំនិញ', tone: 'amber' },
    IN_TRANSIT: { label: 'កំពុងដឹកជញ្ជូន', tone: 'sky' },
    DELIVERED: { label: 'បានទទួលទំនិញ', tone: 'emerald' },
    PARTIAL_DELIVERY: { label: 'ទទួលទំនិញមិនគ្រប់', tone: 'amber' },
    MATCHED: { label: 'បានផ្គូផ្គង', tone: 'purple' },
    DISPUTED: { label: 'មានវិសមភាព', tone: 'rose' },
    CLOSED: { label: 'បានបិទ', tone: 'slate' },
    POSTED: { label: 'បានចុះបញ្ជី', tone: 'emerald' },
    VERIFIED: { label: 'បានផ្ទៀងផ្ទាត់', tone: 'emerald' },
    PENDING_VERIFICATION: { label: 'រង់ចាំការផ្ទៀងផ្ទាត់', tone: 'amber' }
};

function statusMeta(code) {
    const m = STATUS_META[code] || { label: String(code || ''), tone: 'slate' };
    return { label: m.label, tone: STATUS_TONES[m.tone] || STATUS_TONES.slate };
}

function statusLabel(code) {
    return statusMeta(code).label;
}

function statusBadge(code, extraClass) {
    const m = statusMeta(code);
    return `<span class="sm-badge px-2 py-0.5 rounded-full border ${m.tone}${extraClass ? ' ' + extraClass : ''}">${m.label}</span>`;
}

/* ឈ្មោះកម្រិតអនុម័ត (ដំណាក់កាលក្នុងសម្រង់តម្លៃដែលមានច្រើនកម្រិត) */
const APPROVAL_LEVEL_LABEL = {
    SM: 'អ្នកគ្រប់គ្រងផ្នែកលក់',
    GM: 'អភិបាលទូទៅ',
    DIRECTOR: 'នាយក'
};

/* ឈ្មោះតួនាទីជាភាសាខ្មែរ សម្រាប់សារជូនដំណឹង និងកំណត់ហេតុ (ឯកសារ 19 ផ្នែក 5) */
const ROLE_LABEL = {
    SA: 'អភិបាលប្រព័ន្ធ',
    GM: 'អភិបាលទូទៅ',
    SM: 'អ្នកគ្រប់គ្រងផ្នែកលក់',
    SE: 'បុគ្គលិកប្រតិបត្តិផ្នែកលក់',
    CAS: 'អ្នកគិតលុយ',
    PM: 'អ្នកគ្រប់គ្រងលទ្ធកម្ម',
    WM: 'អ្នកគ្រប់គ្រងឃ្លាំងស្តុក',
    WS: 'បុគ្គលិកជាន់ឃ្លាំង',
    CA: 'ប្រធានគណនេយ្យ',
    APAR: 'គណនេយ្យករបំណុល និងទារប្រាក់',
    IA: 'សវនករផ្ទៃក្នុង',
    CS: 'ផ្នែកគាំទ្រអតិថិជន',
    CUSTOMER: 'អតិថិជន'
};

const TIER_LABEL = {
    retail: 'អតិថិជនរាយ',
    wholesale: 'អតិថិជនដុំ',
    vip: 'តំណាងចែកចាយ · VIP'
};

const TIER_TONE = {
    retail: 'bg-slate-100 text-slate-600 border-slate-200',
    wholesale: 'bg-blue-50 text-blue-700 border-blue-200',
    vip: 'bg-purple-50 text-purple-700 border-purple-200'
};

const CATEGORIES = {
    computer: 'កុំព្យូទ័រ',
    monitor: 'អេក្រង់',
    printer: 'ម៉ាស៊ីនបោះពុម្ព',
    accessory: 'គ្រឿងបន្លាស់',
    furniture: 'គ្រឿងសង្ហារិម',
    network: 'ឧបករណ៍បណ្តាញ'
};

const PAYMENT_METHOD_LABEL = {
    CASH: 'សាច់ប្រាក់',
    KHQR: 'KHQR',
    BANK: 'ធនាគារ អេប៊ីអេ',
    BANK_CANADIA: 'ធនាគារ កាណាឌីយ៉ា'
};

const CLAIM_STATUS_LABEL = {
    PENDING_VERIFICATION: 'រង់ចាំផ្ទៀងផ្ទាត់',
    RECORDED: 'បានចេញបង្កាន់ដៃ'
};

/* ===== ប្រវត្តិឯកសារ (auditTrail) — ទំព័រ view-* ត្រូវបង្ហាញនៅខាងក្រោម (ឯកសារ 15, 21) ===== */

const AUDIT_ACTION_LABEL = {
    CREATE: 'បង្កើតឯកសារ',
    SUBMIT: 'ដាក់ស្នើ',
    APPROVE_LEVEL: 'អនុម័តតាមកម្រិត',
    APPROVE: 'អនុម័ត',
    REJECT: 'បដិសេធ',
    REVISE: 'កែប្រែឡើងវិញ',
    CANCEL: 'លុបចោល',
    SEND: 'ផ្ញើជូនអតិថិជន',
    ACCEPT: 'អតិថិជនបានយល់ព្រម',
    DECLINE: 'អតិថិជនបានបដិសេធ',
    CONVERT: 'បំប្លែងជាវិក្កយបត្រ',
    EXPIRE: 'ផុតសុពលភាព'
};

const AUDIT_ACTION_TONE = {
    APPROVE: 'bg-emerald-500', APPROVE_LEVEL: 'bg-emerald-400', ACCEPT: 'bg-emerald-500',
    REJECT: 'bg-rose-500', DECLINE: 'bg-slate-400', CANCEL: 'bg-slate-400', EXPIRE: 'bg-slate-400',
    SUBMIT: 'bg-amber-500', SEND: 'bg-sky-500', CONVERT: 'bg-indigo-500', CREATE: 'bg-slate-300', REVISE: 'bg-slate-300'
};

function trailTimelineHtml(trail) {
    if (!trail || !trail.length) return '<p class="sm-card-sub text-slate-500">មិនទាន់មានប្រវត្តិទេ</p>';
    return `<ol class="space-y-4">${trail.slice().reverse().map(e => {
        const label = AUDIT_ACTION_LABEL[e.action] || e.action;
        const level = e.level ? ` · ${APPROVAL_LEVEL_LABEL[e.level] || e.level}` : '';
        return `
            <li class="flex items-start gap-3">
                <span class="w-2.5 h-2.5 rounded-full ${AUDIT_ACTION_TONE[e.action] || 'bg-slate-300'} mt-1.5 flex-shrink-0"></span>
                <div class="min-w-0">
                    <p class="sm-value text-slate-700">${label}${level}</p>
                    <p class="sm-td-sub text-slate-500">${e.changedByName} · ${fmtKhDateTime(e.changedAt)}</p>
                    ${e.reason ? `<p class="sm-td-sub text-slate-600 mt-0.5">មូលហេតុ៖ ${e.reason}</p>` : ''}
                </div>
            </li>`;
    }).join('')}</ol>`;
}
