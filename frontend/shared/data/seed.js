/* ទិន្នន័យគំរូតែមួយគត់របស់ប្រព័ន្ធ (Canonical seed)
   ឯកសារនេះផ្ទុកកំណត់ត្រាទាំងអស់តែម្តងគត់។ គ្រប់ច្រកតួនាទីអានទិន្នន័យតាមរយៈ store.js
   ហើយមិនមានច្បាប់ចម្លងផ្ទាល់ខ្លួនទៀតឡើយ (ឯកសារ 20 ផ្នែក 2)។

   ច្បាប់ចាំបាច់
   • កាលបរិច្ឆេទទាំងអស់ត្រូវបានគណនាធៀបនឹង "ថ្ងៃនេះ" នៅពេលបង្កើតទិន្នន័យ (D(-21) = 21 ថ្ងៃមុន)
     ដូច្នេះក្រោយកំណត់ឡើងវិញ ទិន្នន័យតែងតែមើលទៅថ្មី។
   • គ្រប់ការយោងធ្វើតាមលេខសម្គាល់ (customerId, repId ...) មិនចម្លងឈ្មោះទេ។
   • ឯកសារនេះមិនមានថ្លៃដើមទិញ ឬកម្រិតចំណេញឡើយ ព្រោះមិនទាន់មានតួនាទីណាត្រូវការ។
   • បច្ចុប្បន្នផ្ទុកតែដែនផ្នែកលក់ (អ្នកប្រើ អតិថិជន ទំនិញ សម្រង់តម្លៃ វិក្កយបត្រ)។
     ដែនលទ្ធកម្ម ឃ្លាំង និងគណនេយ្យ នឹងបន្ថែមតាមជំហាន 4 ទៅ 6 នៃផែនទីផ្លូវ (ឯកសារ 22)។ */

const BMS_SCHEMA_VERSION = 2;

function bmsBuildSeed(today) {
    const pad = n => String(n).padStart(2, '0');
    const dateOf = off => {
        const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + off);
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    };
    const D = off => dateOf(off);
    const DT = (off, hm) => `${dateOf(off)}T${hm}`;
    const it = (sku, qty, price) => ({ sku, qty, price });

    /* ===== អ្នកប្រើ — លេខសម្គាល់ U-<តួនាទី>-NN ===== */
    const users = [
        { id: 'U-SA-01', role: 'SA', name: 'អភិបាល ប្រព័ន្ធ' },
        { id: 'U-GM-01', role: 'GM', name: 'លី ហាក់សេង' },
        { id: 'U-SM-01', role: 'SM', name: 'ហេង វិច្ឆិកា', phone: '012 300 100' },
        { id: 'U-SE-01', role: 'SE', name: 'សៅ សុខា', initials: 'សស', phone: '012 345 678', monthlyTarget: 26000, commissionRate: 2.0, managerId: 'U-SM-01' },
        { id: 'U-SE-02', role: 'SE', name: 'ចាន់ ធីតា', initials: 'ចធ', phone: '015 222 456', monthlyTarget: 22000, commissionRate: 2.0, managerId: 'U-SM-01' },
        { id: 'U-SE-03', role: 'SE', name: 'គឹម សុភ័ក្ត្រ', initials: 'គស', phone: '017 555 321', monthlyTarget: 27000, commissionRate: 2.5, managerId: 'U-SM-01' },
        { id: 'U-CAS-01', role: 'CAS', name: 'ចន្ទ មករា' },
        { id: 'U-PM-01', role: 'PM', name: 'ហុង ដារ៉ា' },
        { id: 'U-WM-01', role: 'WM', name: 'គង់ វិបុល' },
        { id: 'U-WS-01', role: 'WS', name: 'សុខ ចាន់ថន' },
        { id: 'U-CA-01', role: 'CA', name: 'ទៀង វណ្ណារ៉ា' },
        { id: 'U-APAR-01', role: 'APAR', name: 'អ៊ុំ ម៉ានី' },
        { id: 'U-IA-01', role: 'IA', name: 'អ៊ុំ សុវណ្ណារ៉ា' },
        { id: 'U-CS-01', role: 'CS', name: 'លី ស្រីមុំ' }
    ];
    const userName = id => (users.find(u => u.id === id) || {}).name || id;

    /* ===== អតិថិជន — លេខសម្គាល់ CUST-NNNN (CUST-0042 ទុកសម្រាប់ច្រកអតិថិជន ជំហាន 4) ===== */
    const customers = [
        { id: 'CUST-0001', name: 'ក្រុមហ៊ុន រស្មី អភិវឌ្ឍន៍', tier: 'wholesale', contact: 'លោក គង់ សំណាង', phone: '012 888 777', email: 'kong@rasmey.com.kh', address: 'ផ្លូវ 271 សង្កាត់ ទួលទំពូង ខណ្ឌ ចំការមន រាជធានីភ្នំពេញ', creditLimit: 10000, paymentTerms: 30, since: '2024-03-12', repId: 'U-SE-01' },
        { id: 'CUST-0008', name: 'ក្រុមហ៊ុន ត្រីល័ក្ខ', tier: 'retail', contact: 'លោក សំ បូរ៉ា', phone: '010 654 321', email: 'bora@treyluk.com', address: 'ផ្លូវ 128 សង្កាត់ មិត្តភាព ខណ្ឌ 7 មករា រាជធានីភ្នំពេញ', creditLimit: 3000, paymentTerms: 15, since: '2025-01-20', repId: 'U-SE-01' },
        { id: 'CUST-0014', name: 'អង្គរ ឌីជីថល សឹលូសិន', tier: 'vip', contact: 'លោកស្រី នី សុផល', phone: '017 909 090', email: 'sophal@angkordigital.kh', address: 'មហាវិថី ព្រះនរោត្តម សង្កាត់ ចតុមុខ ខណ្ឌ ដូនពេញ រាជធានីភ្នំពេញ', creditLimit: 20000, paymentTerms: 30, since: '2023-11-05', repId: 'U-SE-01' },
        { id: 'CUST-0021', name: 'ហាងគ្រឿងអេឡិចត្រូនិក មេគង្គ', tier: 'wholesale', contact: 'លោក ធីម សុវណ្ណារ៉ា', phone: '096 333 222', email: 'mekong.shop@gmail.com', address: 'ផ្សារកណ្តាល ក្រុង បាត់ដំបង ខេត្ត បាត់ដំបង', creditLimit: 8000, paymentTerms: 30, since: '2025-04-18', repId: 'U-SE-01' },
        { id: 'CUST-0027', name: 'សាលា បាយ័ន អន្តរជាតិ', tier: 'wholesale', contact: 'លោក ជា វិសាល', phone: '096 777 888', email: 'admin@bayonschool.edu.kh', address: 'ផ្លូវ 598 សង្កាត់ ភ្នំពេញថ្មី ខណ្ឌ សែនសុខ រាជធានីភ្នំពេញ', creditLimit: 12000, paymentTerms: 45, since: '2024-08-30', repId: 'U-SE-02' },
        { id: 'CUST-0033', name: 'ហាងទឹកដម្រី សុវណ្ណា', tier: 'retail', contact: 'លោកស្រី សុវណ្ណា', phone: '093 111 222', email: '', address: 'ផ្សារ ដើមគរ ខណ្ឌ ទួលគោក រាជធានីភ្នំពេញ', creditLimit: 2000, paymentTerms: 15, since: '2025-06-02', repId: 'U-SE-03' },
        { id: 'CUST-0039', name: 'សណ្ឋាគារ ភ្នំពេញ ហ្គ្រេន', tier: 'vip', contact: 'លោកស្រី ម៉ៅ សុភា', phone: '011 456 789', email: 'purchasing@ppgrand.com', address: 'មហាវិថី មុនីវង្ស សង្កាត់ វត្តភ្នំ ខណ្ឌ ដូនពេញ រាជធានីភ្នំពេញ', creditLimit: 25000, paymentTerms: 30, since: '2023-05-14', repId: 'U-SE-03' },
        { id: 'CUST-0042', name: 'ក្រុមហ៊ុន សុខុម ត្រេឌីង ឯ.ក', tier: 'vip', contact: 'លោក សុខ ជា', phone: '012 888 777', email: 'sokchea@sokhumtrading.com', tin: 'K009-902201994', address: 'ផ្ទះលេខ 45 ផ្លូវ 310 សង្កាត់បឹងកេងកង 1 ខណ្ឌបឹងកេងកង រាជធានីភ្នំពេញ', creditLimit: 15000, paymentTerms: 7, since: '2024-02-15', repId: 'U-SE-01' },
        { id: 'CUST-0045', name: 'ក្រុមហ៊ុន និម្មិត អគារ', tier: 'wholesale', contact: 'លោក ផាន់ រតនៈ', phone: '017 222 333', email: 'ratana@nimit.com.kh', address: 'ផ្លូវ 315 សង្កាត់ បឹងកក់ 1 ខណ្ឌ ទួលគោក រាជធានីភ្នំពេញ', creditLimit: 15000, paymentTerms: 30, since: '2024-10-09', repId: 'U-SE-02' }
    ];

    /* ===== ទំនិញ — តម្លៃលក់តាមកម្រិតអតិថិជន (ស្តង់ដារលេខ 10) ===== */
    /* ថ្លៃដើមទិញ (cost) ប្រើសម្រាប់កត់ត្រាថ្លៃដើមទំនិញលក់ក្នុងសៀវភៅធំ។
       វាលនេះមិនស្ថិតក្នុងបញ្ជីអនុញ្ញាតរបស់ច្រកលក់ និងច្រកឃ្លាំងទេ (ឯកសារ 14) */
    const p = (sku, name, unit, category, stock, retail, wholesale, vip, cost) =>
        ({ sku, name, unit, category, stock, cost, price: { retail, wholesale, vip } });
    const products = [
        p('DEL-OPT-7010', 'កុំព្យូទ័រ Dell OptiPlex 7010', 'ឈុត', 'computer', 24, 720, 650, 610, 455),
        p('MON-DEL-24', 'អេក្រង់ Dell 24 អ៊ីញ S2421HN', 'គ្រឿង', 'monitor', 58, 165, 140, 132, 98),
        p('PRN-CAN-2900', 'ម៉ាស៊ីនបោះពុម្ព Canon Laser LBP2900', 'គ្រឿង', 'printer', 17, 185, 160, 152, 112),
        p('KEY-KEY-K8', 'ក្តារចុចមេកានិច Keychron K8', 'គ្រឿង', 'accessory', 92, 95, 82, 76, 56),
        p('CHR-ERG-01', 'កៅអីការិយាល័យ Ergonomic', 'គ្រឿង', 'furniture', 36, 240, 210, 198, 148),
        p('UPS-APC-650', 'ម៉ាស៊ីនបម្រុងថាមពល APC 650VA', 'គ្រឿង', 'accessory', 45, 78, 68, 64, 47),
        p('NAS-SYN-220', 'ម៉ាស៊ីនរក្សាទុកទិន្នន័យ Synology DS220', 'ឈុត', 'computer', 9, 460, 415, 392, 292),
        p('RTR-TPL-ER605', 'រ៉ោតទ័រ TP-Link Omada ER605', 'គ្រឿង', 'network', 31, 95, 82, 76, 57),
        p('SWT-TPL-SG108', 'ស្វីត TP-Link 8 ច្រក SG108', 'គ្រឿង', 'network', 64, 32, 27, 25, 18),
        p('SSD-SAM-1TB', 'ថាសរឹង Samsung SSD 1TB', 'គ្រឿង', 'accessory', 40, 115, 102, 96, 71),
        p('CAM-HIK-2MP', 'កាមេរ៉ាសុវត្ថិភាព Hikvision 2MP', 'គ្រឿង', 'network', 27, 58, 50, 46, 34),
        p('LAP-LEN-T14', 'កុំព្យូទ័រយួរដៃ Lenovo ThinkPad T14', 'ឈុត', 'computer', 12, 980, 900, 860, 640)
    ];

    /* ===== ជំនួយបង្កើតប្រវត្តិឯកសារ (auditTrail) ===== */
    const trailEntry = (action, newStatus, off, hm, by, extra) => ({
        changedAt: DT(off, hm), changedBy: by, changedByName: by === 'SYSTEM' ? 'ប្រព័ន្ធ' : String(by).startsWith('CUSTOMER:') ? (customers.find(c => c.id === String(by).slice(9)) || {}).name : userName(by),
        action, newStatus, ...(extra || {})
    });
    const withPrevious = list => list.map((e, i) => ({ ...e, previousStatus: i ? list[i - 1].newStatus : null, reason: e.reason || null }));

    const vat = 0.10;
    const totalOf = (items, disc, down) => {
        const sub = items.reduce((s, x) => s + x.qty * x.price, 0);
        return (sub - sub * (disc / 100)) * (1 + vat) - down;
    };
    const levelsFor = total => ['SM'].concat(total > 5000 ? ['GM'] : [], total > 20000 ? ['DIRECTOR'] : []);

    const SE = 'U-SE-01', SE2 = 'U-SE-02', SE3 = 'U-SE-03', SM = 'U-SM-01', GM = 'U-GM-01';

    /* ===== សម្រង់តម្លៃ — លេខសម្គាល់ QT-YYYY-NNNN ===== */
    const yr = today.getFullYear();
    const num = (prefix, n) => `${prefix}-${yr}-${String(n).padStart(4, '0')}`;
    const QT = n => num('QT', n), INV = n => num('INV', n);

    const quote = (n, customerId, repId, off, hm, status, o) => {
        const items = o.items, disc = o.disc || 0, down = o.down || 0;
        const total = totalOf(items, disc, down);
        return {
            id: QT(n), customerId, repId, createdBy: repId,
            date: DT(off, hm), validUntil: D(off + (o.valid || 14)),
            status, pendingLevel: o.pendingLevel || null,
            requiredLevels: levelsFor(total),
            approvals: (o.approvals || []).map(a => ({ level: a[0], by: a[1], at: DT(a[2], a[3]) })),
            discountPercent: disc, downPayment: down, note: o.note || '',
            rejectionReason: o.rejectionReason || null, cancellationReason: o.cancellationReason || null,
            declineReason: o.declineReason || null, acceptedVia: o.acceptedVia || null,
            invoiceId: o.invoiceId ? INV(o.invoiceId) : null,
            items,
            auditTrail: withPrevious(o.trail)
        };
    };
    const C = (off, hm, by) => trailEntry('CREATE', 'DRAFT', off, hm, by);
    const S = (off, hm, by) => trailEntry('SUBMIT', 'PENDING_APPROVAL', off, hm, by);
    const AL = (level, off, hm, by) => trailEntry('APPROVE_LEVEL', 'PENDING_APPROVAL', off, hm, by, { level });
    const AF = (level, off, hm, by) => trailEntry('APPROVE', 'APPROVED', off, hm, by, { level });
    const SD = (off, hm, by) => trailEntry('SEND', 'SENT_TO_CUSTOMER', off, hm, by);
    const AC = (off, hm, by) => trailEntry('ACCEPT', 'ACCEPTED_BY_CUSTOMER', off, hm, by, { via: 'SE_RECORDED' });

    const quotations = [
        quote(89, 'CUST-0001', SE, -1, '11:30', 'PENDING_APPROVAL', {
            disc: 8, pendingLevel: 'SM', note: 'អតិថិជនស្នើសុំបញ្ចុះតម្លៃបន្ថែម ព្រោះបញ្ជាទិញច្រើន',
            items: [it('DEL-OPT-7010', 5, 650), it('MON-DEL-24', 5, 140), it('PRN-CAN-2900', 3, 160)],
            trail: [C(-1, '11:10', SE), S(-1, '11:30', SE)]
        }),
        quote(92, 'CUST-0014', SE, -3, '09:45', 'APPROVED', {
            disc: 4, down: 500, valid: 21, approvals: [['SM', SM, -3, '14:20']],
            items: [it('NAS-SYN-220', 4, 392), it('UPS-APC-650', 8, 64)],
            trail: [C(-3, '09:30', SE), S(-3, '09:50', SE), AF('SM', -3, '14:20', SM)]
        }),
        quote(96, 'CUST-0001', SE, -6, '09:15', 'SENT_TO_CUSTOMER', {
            disc: 3.5, approvals: [['SM', SM, -6, '13:00'], ['GM', GM, -5, '10:00']],
            items: [it('DEL-OPT-7010', 14, 650)],
            trail: [C(-6, '09:00', SE), S(-6, '09:15', SE), AL('SM', -6, '13:00', SM), AF('GM', -5, '10:00', GM), SD(-5, '10:30', SE)]
        }),
        quote(90, 'CUST-0008', SE, -9, '13:50', 'ACCEPTED_BY_CUSTOMER', {
            disc: 2, approvals: [['SM', SM, -9, '15:00']], acceptedVia: 'SE_RECORDED',
            items: [it('CHR-ERG-01', 20, 210)],
            trail: [C(-9, '13:30', SE), S(-9, '13:50', SE), AF('SM', -9, '15:00', SM), SD(-8, '09:00', SE), AC(-6, '16:20', SE)]
        }),
        quote(86, 'CUST-0021', SE, -19, '15:20', 'CONVERTED_TO_INVOICE', {
            disc: 4.5, invoiceId: 109, approvals: [['SM', SM, -19, '16:30']],
            items: [it('MON-DEL-24', 30, 140)],
            trail: [C(-19, '15:00', SE), S(-19, '15:20', SE), AF('SM', -19, '16:30', SM), SD(-18, '09:00', SE), AC(-17, '11:00', SE), trailEntry('CONVERT', 'CONVERTED_TO_INVOICE', -17, '11:30', SE)]
        }),
        quote(97, 'CUST-0014', SE, -2, '16:00', 'DRAFT', {
            note: 'កំពុងរង់ចាំបញ្ជីមុខទំនិញពីអតិថិជន',
            items: [it('NAS-SYN-220', 2, 392), it('KEY-KEY-K8', 5, 76)],
            trail: [C(-2, '16:00', SE)]
        }),
        quote(84, 'CUST-0021', SE, -14, '10:00', 'DECLINED_BY_CUSTOMER', {
            approvals: [['SM', SM, -14, '11:00']], declineReason: 'អតិថិជនរកឃើញតម្លៃទាបជាងពីអ្នកផ្គត់ផ្គង់ផ្សេង',
            items: [it('PRN-CAN-2900', 6, 160)],
            trail: [C(-14, '09:40', SE), S(-14, '10:00', SE), AF('SM', -14, '11:00', SM), SD(-14, '11:30', SE), trailEntry('DECLINE', 'DECLINED_BY_CUSTOMER', -11, '14:00', SE, { reason: 'អតិថិជនរកឃើញតម្លៃទាបជាងពីអ្នកផ្គត់ផ្គង់ផ្សេង' })]
        }),
        quote(72, 'CUST-0008', SE, -33, '11:00', 'REJECTED', {
            disc: 12, valid: 10, rejectionReason: 'ការបញ្ចុះតម្លៃលើសកម្រិតសម្រាប់អតិថិជនរាយ',
            items: [it('DEL-OPT-7010', 3, 720)],
            trail: [C(-33, '10:40', SE), S(-33, '11:00', SE), trailEntry('REJECT', 'REJECTED', -33, '15:00', SM, { reason: 'ការបញ្ចុះតម្លៃលើសកម្រិតសម្រាប់អតិថិជនរាយ' })]
        }),
        quote(79, 'CUST-0008', SE, -28, '10:30', 'EXPIRED', {
            valid: 7, approvals: [['SM', SM, -28, '12:00']],
            items: [it('PRN-CAN-2900', 2, 185)],
            trail: [C(-28, '10:10', SE), S(-28, '10:30', SE), AF('SM', -28, '12:00', SM), SD(-27, '09:00', SE), trailEntry('EXPIRE', 'EXPIRED', -20, '00:00', 'SYSTEM')]
        }),
        quote(74, 'CUST-0001', SE, -40, '14:00', 'CANCELLED', {
            cancellationReason: 'អតិថិជនផ្លាស់ប្តូរបញ្ជីមុខទំនិញ ត្រូវបង្កើតសម្រង់តម្លៃថ្មី',
            items: [it('MON-DEL-24', 10, 140)],
            trail: [C(-40, '14:00', SE), trailEntry('CANCEL', 'CANCELLED', -39, '09:00', SE, { reason: 'អតិថិជនផ្លាស់ប្តូរបញ្ជីមុខទំនិញ ត្រូវបង្កើតសម្រង់តម្លៃថ្មី' })]
        }),
        quote(94, 'CUST-0045', SE2, -2, '14:05', 'PENDING_APPROVAL', {
            disc: 18, pendingLevel: 'SM', valid: 14,
            items: [it('DEL-OPT-7010', 12, 650), it('CHR-ERG-01', 15, 210), it('KEY-KEY-K8', 20, 82)],
            trail: [C(-2, '13:40', SE2), S(-2, '14:05', SE2)]
        }),
        quote(82, 'CUST-0027', SE2, -21, '09:10', 'CONVERTED_TO_INVOICE', {
            disc: 4, invoiceId: 113, approvals: [['SM', SM, -21, '10:00']],
            items: [it('DEL-OPT-7010', 4, 650), it('KEY-KEY-K8', 10, 82)],
            trail: [C(-21, '08:50', SE2), S(-21, '09:10', SE2), AF('SM', -21, '10:00', SM), SD(-21, '10:30', SE2), AC(-19, '14:00', SE2), trailEntry('CONVERT', 'CONVERTED_TO_INVOICE', -18, '09:00', SE2)]
        }),
        quote(81, 'CUST-0027', SE2, -22, '10:05', 'CONVERTED_TO_INVOICE', {
            disc: 3, down: 1000, invoiceId: 104, approvals: [['SM', SM, -22, '11:00']],
            items: [it('DEL-OPT-7010', 6, 650), it('KEY-KEY-K8', 12, 82)],
            trail: [C(-22, '09:45', SE2), S(-22, '10:05', SE2), AF('SM', -22, '11:00', SM), SD(-22, '11:30', SE2), AC(-21, '15:00', SE2), trailEntry('CONVERT', 'CONVERTED_TO_INVOICE', -20, '16:00', SE2)]
        }),
        quote(93, 'CUST-0045', SE2, -12, '11:00', 'CONVERTED_TO_INVOICE', {
            disc: 5, invoiceId: 121, approvals: [['SM', SM, -12, '12:00'], ['GM', GM, -12, '16:00']],
            items: [it('DEL-OPT-7010', 10, 650)],
            trail: [C(-12, '10:40', SE2), S(-12, '11:00', SE2), AL('SM', -12, '12:00', SM), AF('GM', -12, '16:00', GM), SD(-11, '09:00', SE2), AC(-10, '10:00', SE2), trailEntry('CONVERT', 'CONVERTED_TO_INVOICE', -10, '10:30', SE2)]
        }),
        quote(95, 'CUST-0039', SE3, -11, '08:45', 'CONVERTED_TO_INVOICE', {
            disc: 5, invoiceId: 122, approvals: [['SM', SM, -11, '10:00'], ['GM', GM, -11, '14:00']],
            items: [it('CHR-ERG-01', 40, 198)],
            trail: [C(-11, '08:30', SE3), S(-11, '08:45', SE3), AL('SM', -11, '10:00', SM), AF('GM', -11, '14:00', GM), SD(-10, '09:00', SE3), AC(-9, '11:00', SE3), trailEntry('CONVERT', 'CONVERTED_TO_INVOICE', -9, '11:30', SE3)]
        }),
        quote(78, 'CUST-0039', SE3, -22, '11:05', 'CONVERTED_TO_INVOICE', {
            disc: 5, invoiceId: 118, approvals: [['SM', SM, -22, '12:00'], ['GM', GM, -22, '15:00']],
            items: [it('CHR-ERG-01', 30, 198)],
            trail: [C(-22, '10:45', SE3), S(-22, '11:05', SE3), AL('SM', -22, '12:00', SM), AF('GM', -22, '15:00', GM), SD(-21, '09:00', SE3), AC(-20, '10:00', SE3), trailEntry('CONVERT', 'CONVERTED_TO_INVOICE', -19, '09:00', SE3)]
        }),
        quote(91, 'CUST-0039', SE3, -1, '10:15', 'PENDING_APPROVAL', {
            disc: 12, down: 1000, pendingLevel: 'GM', approvals: [['SM', SM, -1, '15:00']],
            items: [it('CHR-ERG-01', 24, 198), it('MON-DEL-24', 20, 132)],
            trail: [C(-1, '09:55', SE3), S(-1, '10:15', SE3), AL('SM', -1, '15:00', SM)]
        }),
        quote(75, 'CUST-0033', SE3, -25, '14:20', 'APPROVED', {
            disc: 6, valid: 30, approvals: [['SM', SM, -25, '15:30']],
            items: [it('KEY-KEY-K8', 14, 95)],
            trail: [C(-25, '14:00', SE3), S(-25, '14:20', SE3), AF('SM', -25, '15:30', SM)]
        }),
        quote(99, 'CUST-0042', SE, -2, '09:30', 'SENT_TO_CUSTOMER', {
            disc: 2, approvals: [['SM', SM, -2, '14:00']],
            items: [it('DEL-OPT-7010', 4, 610), it('MON-DEL-24', 10, 132)],
            trail: [C(-2, '09:10', SE), S(-2, '09:30', SE), AF('SM', -2, '14:00', SM), SD(-1, '09:00', SE)]
        }),
        quote(83, 'CUST-0042', SE, -8, '10:00', 'CONVERTED_TO_INVOICE', {
            invoiceId: 124, approvals: [['SM', SM, -8, '12:00']],
            items: [it('DEL-OPT-7010', 4, 610), it('MON-DEL-24', 2, 132)],
            trail: [C(-8, '09:40', SE), S(-8, '10:00', SE), AF('SM', -8, '12:00', SM), SD(-7, '09:00', SE),
                trailEntry('ACCEPT', 'ACCEPTED_BY_CUSTOMER', -6, '10:15', 'CUSTOMER:CUST-0042', { via: 'PORTAL' }),
                trailEntry('CONVERT', 'CONVERTED_TO_INVOICE', -5, '09:00', SE)]
        }),
        quote(88, 'CUST-0033', SE3, -17, '10:30', 'CONVERTED_TO_INVOICE', {
            invoiceId: 115, approvals: [['SM', SM, -17, '11:30']],
            items: [it('MON-DEL-24', 10, 165), it('PRN-CAN-2900', 4, 185)],
            trail: [C(-17, '10:10', SE3), S(-17, '10:30', SE3), AF('SM', -17, '11:30', SM), SD(-17, '13:00', SE3), AC(-15, '09:00', SE3), trailEntry('CONVERT', 'CONVERTED_TO_INVOICE', -14, '09:30', SE3)]
        })
    ];

    /* ===== វិក្កយបត្រ — លេខសម្គាល់ INV-YYYY-NNNN ===== */
    const invoice = (n, customerId, repId, off, dueOff, o) => ({
        id: INV(n), customerId, repId, createdBy: repId,
        quoteId: o.quoteId ? QT(o.quoteId) : null,
        date: D(off), dueDate: D(dueOff), status: 'ISSUED',
        discountPercent: o.disc || 0, downPayment: o.down || 0, note: '',
        items: o.items,
        payments: (o.payments || []).map(x => ({
            date: D(x[0]), amount: x[1] === 'FULL' ? Math.round(totalOf(o.items, o.disc || 0, o.down || 0) * 100) / 100 : x[1], method: x[2]
        }))
    });

    const invoices = [
        invoice(102, 'CUST-0001', SE, -60, -30, { items: [it('DEL-OPT-7010', 5, 650), it('MON-DEL-24', 5, 140), it('CHR-ERG-01', 4, 210)] }),
        invoice(87, 'CUST-0033', SE3, -68, -53, { items: [it('KEY-KEY-K8', 8, 95), it('UPS-APC-650', 6, 78)] }),
        invoice(71, 'CUST-0045', SE2, -75, -45, { items: [it('DEL-OPT-7010', 4, 650), it('KEY-KEY-K8', 6, 82)] }),
        invoice(76, 'CUST-0008', SE, -3, 12, { items: [it('CHR-ERG-01', 4, 240), it('UPS-APC-650', 3, 78)] }),
        invoice(109, 'CUST-0021', SE, -17, 13, { quoteId: 86, disc: 4.5, items: [it('MON-DEL-24', 30, 140)] }),
        invoice(110, 'CUST-0001', SE, -10, 20, { items: [it('MON-DEL-24', 12, 140), it('KEY-KEY-K8', 15, 82)], payments: [[-4, 1000, 'KHQR']] }),
        invoice(112, 'CUST-0014', SE, -17, 13, { disc: 2, items: [it('NAS-SYN-220', 6, 392), it('MON-DEL-24', 12, 132)], payments: [[-12, 'FULL', 'BANK']] }),
        invoice(116, 'CUST-0008', SE, -16, -1, { items: [it('CHR-ERG-01', 4, 240), it('KEY-KEY-K8', 4, 95)], payments: [[-10, 1000, 'CASH']] }),
        invoice(104, 'CUST-0027', SE2, -20, 25, { quoteId: 81, disc: 3, down: 1000, items: [it('DEL-OPT-7010', 6, 650), it('KEY-KEY-K8', 12, 82)], payments: [[-15, 1500, 'KHQR']] }),
        invoice(113, 'CUST-0027', SE2, -18, 27, { quoteId: 82, disc: 4, items: [it('DEL-OPT-7010', 4, 650), it('KEY-KEY-K8', 10, 82)], payments: [[-9, 2000, 'BANK']] }),
        invoice(121, 'CUST-0045', SE2, -10, 20, { quoteId: 93, disc: 5, items: [it('DEL-OPT-7010', 10, 650)], payments: [[-6, 'FULL', 'BANK']] }),
        invoice(122, 'CUST-0039', SE3, -9, 21, { quoteId: 95, disc: 5, items: [it('CHR-ERG-01', 40, 198)], payments: [[-4, 'FULL', 'BANK']] }),
        invoice(118, 'CUST-0039', SE3, -19, 11, { quoteId: 78, disc: 5, items: [it('CHR-ERG-01', 30, 198)], payments: [[-12, 4000, 'BANK']] }),
        invoice(117, 'CUST-0042', SE, -32, -25, { items: [it('LAP-LEN-T14', 4, 860), it('MON-DEL-24', 2, 132)], payments: [[-26, 'FULL', 'BANK']] }),
        invoice(119, 'CUST-0042', SE, -15, -8, { items: [it('PRN-CAN-2900', 3, 152), it('UPS-APC-650', 12, 64), it('KEY-KEY-K8', 6, 76)], down: 200, payments: [[-9, 1000, 'KHQR']] }),
        invoice(124, 'CUST-0042', SE, -5, 2, { quoteId: 83, items: [it('DEL-OPT-7010', 4, 610), it('MON-DEL-24', 2, 132)] }),
        invoice(115, 'CUST-0033', SE3, -14, 1, { quoteId: 88, items: [it('MON-DEL-24', 10, 165), it('PRN-CAN-2900', 4, 185)], payments: [[-8, 1000, 'CASH']] })
    ];

    /* ===== ឱកាសលក់ (Pipeline) ===== */
    const deal = (n, customerId, repId, stage, value, category, off, note, link) =>
        ({ id: `OPP-${yr}-${String(n).padStart(4, '0')}`, customerId, repId, stage, value, category, date: D(off), note, ...(link || {}) });
    const pipelineDeals = [
        deal(201, 'CUST-0001', SE, 'lead', 5200, 'computer', -11, 'សាកសួរតម្លៃកុំព្យូទ័រការិយាល័យ 8 ឈុត'),
        deal(202, 'CUST-0027', SE2, 'lead', 8600, 'monitor', -12, 'គម្រោងដំឡើងបន្ទប់កុំព្យូទ័រថ្មី'),
        deal(203, 'CUST-0008', SE, 'lead', 1850, 'accessory', -13, 'ត្រូវការគ្រឿងបន្លាស់បន្ថែម'),
        deal(210, 'CUST-0039', SE3, 'qualified', 14200, 'furniture', -14, 'បានបញ្ជាក់ថវិកា និងកាលបរិច្ឆេទដឹកជញ្ជូន'),
        deal(211, 'CUST-0045', SE2, 'qualified', 9400, 'computer', -15, 'រង់ចាំការអនុម័តថវិកាពីនាយក'),
        deal(212, 'CUST-0033', SE3, 'qualified', 3600, 'printer', -16, 'ប្តូរម៉ាស៊ីនបោះពុម្ពចាស់ទាំងអស់'),
        deal(220, 'CUST-0001', SE, 'proposal', 0, 'computer', -1, 'សម្រង់តម្លៃរង់ចាំការអនុម័ត', { quoteId: QT(89) }),
        deal(221, 'CUST-0039', SE3, 'proposal', 0, 'furniture', -1, 'សម្រង់តម្លៃរង់ចាំអភិបាលទូទៅ', { quoteId: QT(91) }),
        deal(222, 'CUST-0045', SE2, 'proposal', 0, 'computer', -2, 'សម្រង់តម្លៃរង់ចាំការអនុម័ត', { quoteId: QT(94) }),
        deal(230, 'CUST-0039', SE3, 'won', 0, 'furniture', -9, `បានចេញវិក្កយបត្រ ${INV(122)}`, { invoiceId: INV(122) }),
        deal(231, 'CUST-0014', SE, 'won', 0, 'computer', -17, `បានចេញវិក្កយបត្រ ${INV(112)}`, { invoiceId: INV(112) }),
        deal(232, 'CUST-0045', SE2, 'won', 0, 'computer', -10, `បានចេញវិក្កយបត្រ ${INV(121)}`, { invoiceId: INV(121) }),
        deal(233, 'CUST-0021', SE, 'won', 0, 'monitor', -17, `បានចេញវិក្កយបត្រ ${INV(109)}`, { invoiceId: INV(109) }),
        deal(240, 'CUST-0027', SE2, 'lost', 7300, 'computer', -20, 'អតិថិជនជ្រើសរើសដៃគូប្រកួតប្រជែង ដោយសារតម្លៃទាបជាង'),
        deal(241, 'CUST-0033', SE3, 'lost', 2400, 'accessory', -22, 'អតិថិជនពន្យារគម្រោងទៅឆ្នាំក្រោយ')
    ];

    /* ===== សំណើដែលរង់ចាំអ្នកគ្រប់គ្រងផ្នែកលក់ ===== */
    const voidRequests = [
        { id: `VR-${yr}-0001`, invoiceId: INV(76), customerId: 'CUST-0008', repId: SE, date: DT(-2, '09:20'), status: 'PENDING_APPROVAL', stockReleased: false, reason: 'អតិថិជនប្តូរចិត្ត មិនទិញទំនិញនេះទៀត', decidedBy: null, decisionNote: null }
    ];
    const creditRequests = [
        { id: `CR-${yr}-0011`, customerId: 'CUST-0033', repId: SE3, date: DT(-3, '16:40'), status: 'PENDING_APPROVAL', currentLimit: 2000, requestedLimit: 3500, reason: 'អតិថិជនសន្យាទូទាត់បំណុលចាស់ក្នុងខែក្រោយ', decidedBy: null, decisionNote: null }
    ];

    /* ===== កិច្ចការតាមដានរបស់បុគ្គលិកលក់ ===== */
    const followUps = [
        { id: 'FU-01', repId: SE, customerId: 'CUST-0001', due: D(0), type: 'quote', refId: QT(89), note: 'ទូរស័ព្ទតាមដានលទ្ធផលការអនុម័តបញ្ចុះតម្លៃ' },
        { id: 'FU-02', repId: SE, customerId: 'CUST-0008', due: D(-1), type: 'payment', refId: INV(116), note: 'ទារប្រាក់វិក្កយបត្រហួសកាលកំណត់' },
        { id: 'FU-03', repId: SE, customerId: 'CUST-0014', due: D(0), type: 'quote', refId: QT(92), note: 'បញ្ជាក់កាលបរិច្ឆេទដឹកជញ្ជូនជាមួយអតិថិជន' },
        { id: 'FU-04', repId: SE, customerId: 'CUST-0014', due: D(2), type: 'lead', refId: QT(97), note: 'ទទួលបញ្ជីមុខទំនិញ ដើម្បីបញ្ចប់សម្រង់តម្លៃ' },
        { id: 'FU-05', repId: SE, customerId: 'CUST-0001', due: D(-5), type: 'payment', refId: INV(102), note: 'វិក្កយបត្រហួសកាលកំណត់ ត្រូវចាត់វិធានការបន្ទាន់' }
    ];

    /* ===== ជូនដំណឹង — ទម្រង់តាមឯកសារ 16 ផ្នែក B ===== */
    let ntSeq = 0;
    const note = (toRole, toUserId, type, entityType, entityId, message, off, hm, by, isRead) =>
        ({ id: `NT-${String(++ntSeq).padStart(5, '0')}`, at: DT(off, hm), toRole, toUserId: toUserId || null, type, entityType, entityId, message, triggeredBy: by, isRead: Boolean(isRead) });
    const notifications = [
        note('SM', null, 'QUOTE_SUBMITTED', 'quotation', QT(89), `សម្រង់តម្លៃ ${QT(89)} ត្រូវការការអនុម័ត`, -1, '11:30', SE),
        note('SM', null, 'QUOTE_SUBMITTED', 'quotation', QT(94), `សម្រង់តម្លៃ ${QT(94)} ត្រូវការការអនុម័ត`, -2, '14:05', SE2),
        note('GM', null, 'QUOTE_SUBMITTED', 'quotation', QT(91), `សម្រង់តម្លៃ ${QT(91)} ត្រូវការការអនុម័តពីអភិបាលទូទៅ`, -1, '15:00', SM),
        note('SM', null, 'VOID_REQUESTED', 'voidRequest', `VR-${yr}-0001`, `សំណើលុបចោលវិក្កយបត្រ ${INV(76)} រង់ចាំការសម្រេច`, -2, '09:20', SE),
        note('SM', null, 'CREDIT_REQUESTED', 'creditRequest', `CR-${yr}-0011`, `សំណើបង្កើនឥណទាន CR-${yr}-0011 រង់ចាំការសម្រេច`, -3, '16:40', SE3),
        note('CUSTOMER', 'CUST-0042', 'QUOTE_SENT', 'quotation', QT(99), `សម្រង់តម្លៃ ${QT(99)} ត្រូវបានផ្ញើជូនលោកអ្នក`, -1, '09:00', SE),
        note('SE', SE, 'QUOTE_APPROVED', 'quotation', QT(92), `សម្រង់តម្លៃ ${QT(92)} ត្រូវបានអនុម័ត`, -3, '14:20', SM),
        note('SE', SE, 'QUOTE_APPROVED', 'quotation', QT(96), `សម្រង់តម្លៃ ${QT(96)} ត្រូវបានអនុម័ត`, -5, '10:00', GM, true),
        note('SE', SE, 'QUOTE_REJECTED', 'quotation', QT(72), `សម្រង់តម្លៃ ${QT(72)} ត្រូវបានបដិសេធ៖ ការបញ្ចុះតម្លៃលើសកម្រិតសម្រាប់អតិថិជនរាយ`, -33, '15:00', SM, true)
    ];

    /* ===== កំណត់ហេតុសវនកម្ម — បង្កើតពីប្រវត្តិឯកសារ ===== */
    const auditLog = [];
    quotations.forEach(q => q.auditTrail.forEach(e => auditLog.push({
        at: e.changedAt, userId: e.changedBy, userName: e.changedByName, action: e.action,
        entityType: 'quotation', entityId: q.id, detail: e.reason || (e.level ? `កម្រិត ${e.level}` : '')
    })));
    auditLog.sort((a, b) => a.at.localeCompare(b.at));
    auditLog.forEach((e, i) => { e.id = `AU-${String(i + 1).padStart(6, '0')}`; });

    /* ===== តារាងគណនី (COA) — ឈ្មោះខ្មែរតែមួយភាសា ===== */
    const acct = (code, nameKh, type, normal, parent, isGroup) => ({ code, nameKh, type, normal, parent: parent || null, isGroup: Boolean(isGroup) });
    const accounts = [
        acct('1000', 'ទ្រព្យសកម្ម', 'Asset', 'Dr', null, true),
        acct('1100', 'ទ្រព្យសកម្មចរន្ត', 'Asset', 'Dr', '1000', true),
        acct('1111', 'សាច់ប្រាក់ក្នុងដៃ', 'Asset', 'Dr', '1100'),
        acct('1121', 'ធនាគារ អេប៊ីអេ (ដុល្លារ)', 'Asset', 'Dr', '1100'),
        acct('1122', 'ធនាគារ កាណាឌីយ៉ា (ដុល្លារ)', 'Asset', 'Dr', '1100'),
        acct('1123', 'ធនាគារ អេស៊ីលីដា (រៀល)', 'Asset', 'Dr', '1100'),
        acct('1131', 'បំណុលត្រូវទារពីអតិថិជន', 'Asset', 'Dr', '1100'),
        acct('1211', 'ស្តុកទំនិញក្នុងឃ្លាំង', 'Asset', 'Dr', '1100'),
        acct('1500', 'ទ្រព្យសកម្មអចលនៈ', 'Asset', 'Dr', '1000', true),
        acct('1511', 'បរិក្ខារការិយាល័យ និងកុំព្យូទ័រ', 'Asset', 'Dr', '1500'),
        acct('1521', 'រំលស់បង្គរ', 'Asset', 'Cr', '1500'),
        acct('2000', 'បំណុល', 'Liability', 'Cr', null, true),
        acct('2111', 'បំណុលត្រូវសងអ្នកផ្គត់ផ្គង់', 'Liability', 'Cr', '2000'),
        acct('2121', 'អាករលើតម្លៃបន្ថែមត្រូវបង់', 'Liability', 'Cr', '2000'),
        acct('2122', 'ពន្ធកាត់ទុកត្រូវបង់', 'Liability', 'Cr', '2000'),
        acct('3000', 'មូលធន', 'Equity', 'Cr', null, true),
        acct('3111', 'ដើមទុនចុះបញ្ជី', 'Equity', 'Cr', '3000'),
        acct('3211', 'ប្រាក់ចំណេញរក្សាទុក', 'Equity', 'Cr', '3000'),
        acct('4000', 'ចំណូល', 'Revenue', 'Cr', null, true),
        acct('4111', 'ចំណូលពីការលក់ទំនិញ', 'Revenue', 'Cr', '4000'),
        acct('5000', 'ថ្លៃដើមទំនិញលក់', 'Expense', 'Dr', null, true),
        acct('5111', 'ថ្លៃដើមទំនិញលក់', 'Expense', 'Dr', '5000'),
        acct('6000', 'ចំណាយប្រតិបត្តិការ', 'Expense', 'Dr', null, true),
        acct('6111', 'ចំណាយរដ្ឋបាល និងប្រាក់បៀវត្ស', 'Expense', 'Dr', '6000'),
        acct('6112', 'ចំណាយរំលស់ទ្រព្យសកម្ម', 'Expense', 'Dr', '6000')
    ];

    /* ===== ទិន្នានុប្បវត្តិ (JE) — បង្កើតពីវិក្កយបត្រ និងការទូទាត់ដែលមានរួច ដើម្បីឱ្យសៀវភៅធំស៊ីគ្នា ===== */
    const r2 = n => Math.round(n * 100) / 100;
    const cashAccount = { CASH: '1111', KHQR: '1121', BANK: '1121', BANK_CANADIA: '1122' };
    const rawJournals = [];
    const line = (accountCode, dr, cr, description) => ({ accountCode, description: description || '', dr: dr || 0, cr: cr || 0 });

    rawJournals.push({
        date: D(-120), description: 'សមតុល្យដើមគ្រា', source: 'OPENING', reference: 'OPENING', status: 'POSTED', by: 'U-CA-01', lines: [
            line('1111', 1600, 0), line('1121', 20000, 0), line('1122', 11200, 0), line('1123', 4880, 0), line('1211', 84500, 0), line('1511', 24000, 0),
            line('1521', 0, 7200), line('2111', 0, 12600), line('3111', 0, 75000), line('3211', 0, 51380)
        ]
    });

    invoices.forEach(inv => {
        const sub = inv.items.reduce((s, x) => s + x.qty * x.price, 0);
        const taxBase = r2(sub - sub * (inv.discountPercent / 100));
        const down = r2(inv.downPayment || 0);
        const grand = r2(totalOf(inv.items, inv.discountPercent, inv.downPayment || 0));
        const vatAmount = r2(grand + down - taxBase);
        const lines = [line('1131', grand, 0, inv.id)];
        if (down > 0) lines.push(line('1121', down, 0, 'ប្រាក់កក់'));
        lines.push(line('4111', 0, taxBase, inv.id), line('2121', 0, vatAmount, inv.id));
        rawJournals.push({ date: inv.date, description: `ចេញវិក្កយបត្រ ${inv.id}`, source: 'INVOICE', reference: inv.id, status: 'POSTED', by: inv.repId, lines });

        // ថ្លៃដើមទំនិញលក់ — ដកស្តុកចេញ បញ្ចូលទៅចំណាយ ដើម្បីឱ្យចំណេញដុលមានន័យពិត
        const cogs = r2(inv.items.reduce((sum, x) => {
            const prod = products.find(pr => pr.sku === x.sku);
            return sum + (prod && prod.cost ? prod.cost * x.qty : 0);
        }, 0));
        if (cogs > 0) {
            rawJournals.push({
                date: inv.date, description: `ថ្លៃដើមទំនិញលក់ ${inv.id}`, source: 'INVOICE',
                reference: inv.id, status: 'POSTED', by: inv.repId,
                lines: [line('5111', cogs, 0, inv.id), line('1211', 0, cogs, inv.id)]
            });
        }
    });

    /* បង្កាន់ដៃទទួលប្រាក់ — មួយសម្រាប់ការទូទាត់នីមួយៗ */
    const receipts = [];
    const paymentRows = [];
    invoices.forEach(inv => inv.payments.forEach(p => paymentRows.push({ inv, p })));
    paymentRows.sort((a, b) => a.p.date.localeCompare(b.p.date));
    paymentRows.forEach(({ inv, p }, i) => {
        const id = num('RCP', i + 1);
        p.receiptId = id;
        const prefix = { KHQR: 'BKG', BANK: 'ABA', BANK_CANADIA: 'CAN', CASH: 'CSH' }[p.method];
        receipts.push({
            id, invoiceId: inv.id, customerId: inv.customerId, date: p.date, method: p.method,
            bankRef: `${prefix}-${String(10000000 + ((i + 3) * 7919 * 13) % 89999999)}`, amount: p.amount, status: 'VERIFIED',
            receivedBy: 'U-APAR-01', note: '', journalId: null
        });
        rawJournals.push({
            date: p.date, description: `ទទួលប្រាក់ពី ${inv.customerId} តាមវិក្កយបត្រ ${inv.id}`, source: 'RECEIPT', reference: id, status: 'POSTED', by: 'U-APAR-01',
            lines: [line(cashAccount[p.method], p.amount, 0, id), line('1131', 0, p.amount, inv.id)], receiptId: id
        });
    });

    rawJournals.push({
        date: D(-20), description: 'បង់ថ្លៃជួលការិយាល័យ និងឃ្លាំងប្រចាំខែ', source: 'MANUAL', reference: 'RENT-M', status: 'POSTED', by: 'U-CA-01',
        lines: [line('6111', 1500, 0, 'ថ្លៃជួល'), line('1121', 0, 1500, 'បង់តាមធនាគារ')]
    });
    rawJournals.push({
        date: D(-1), description: 'កត់ត្រារំលស់ទ្រព្យសកម្មប្រចាំត្រីមាស', source: 'MANUAL', reference: 'DEP-Q', status: 'DRAFT', by: 'U-CA-01',
        lines: [line('6112', 1200, 0, 'ចំណាយរំលស់'), line('1521', 0, 1200, 'រំលស់បង្គរ')]
    });

    rawJournals.sort((a, b) => a.date.localeCompare(b.date));
    const journalEntries = rawJournals.map((j, i) => ({
        id: num('JE', i + 1), date: j.date, description: j.description, source: j.source, reference: j.reference, status: j.status,
        postedBy: j.by, postedAt: `${j.date}T17:00`, lines: j.lines
    }));
    rawJournals.forEach((j, i) => {
        if (!j.receiptId) return;
        const rec = receipts.find(r => r.id === j.receiptId);
        if (rec) rec.journalId = journalEntries[i].id;
    });

    /* ការទូទាត់ KHQR ដែលអតិថិជនប្រកាសថាបានធ្វើ រង់ចាំគណនេយ្យករផ្ទៀងផ្ទាត់ និងចេញបង្កាន់ដៃ */
    const paymentClaims = [];

    /* ===== ប្រវត្តិចំណូលប្រចាំខែ (ប្រាំខែមុន) សម្រាប់តារាងក្រាហ្វិក — ខែបច្ចុប្បន្នគណនាពីវិក្កយបត្រ ===== */
    const monthlyHistory = [
        { actual: 45000, target: 50000 },
        { actual: 52000, target: 50000 },
        { actual: 61000, target: 55000 },
        { actual: 58000, target: 60000 },
        { actual: 62000, target: 65000 }
    ];

    return {
        schemaVersion: BMS_SCHEMA_VERSION,
        seededOn: D(0),
        settings: {
            vatRate: 0.10,
            whtGoods: 0.10,
            whtServices: 0.15,
            exchangeRate: 4100,
            discountSelfLimit: 5.0,
            monthlyTarget: 50000,
            /* កម្រិតអនុម័តសម្រង់តម្លៃ (ឯកសារ 16 ផ្នែក A1) */
            quotationLimits: { SM: 5000, GM: 20000 },
            merchant: { name: 'DIGITECHKH CO LTD', account: 'digitechkh@aclb', city: 'PHNOM PENH', tin: 'K001-901234567' }
        },
        users, customers, products, accounts,
        quotations, invoices, receipts, paymentClaims, journalEntries, pipelineDeals, voidRequests, creditRequests, followUps,
        notifications, auditLog, monthlyHistory
    };
}
