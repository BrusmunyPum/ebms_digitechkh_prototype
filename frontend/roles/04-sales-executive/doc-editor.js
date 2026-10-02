/* កម្មវិធីកែសម្រួលបន្ទាត់មុខទំនិញរួម
   ប្រើដោយ quotes/create-quote.html និង invoices/create-invoice.html
   ដើម្បីកុំឱ្យតក្កវិជ្ជាគណនាមានច្បាប់ចម្លងពីរ ហើយបែកគ្នា។

   ទំព័រដែលប្រើត្រូវផ្តល់ធាតុទាំងនេះ៖
     #customerPickerHost · #itemLinesBody · #itemLinesEmpty · #summaryHost */

const DOC_EDITOR = {
    mode: 'quote',
    customerId: '',
    items: [],
    discountPercent: 0,
    downPayment: 0
};

function initDocEditor(options) {
    const opts = options || {};
    DOC_EDITOR.mode = opts.mode || 'quote';

    if (opts.prefillFrom) {
        const src = getQuote(opts.prefillFrom);
        if (src) {
            DOC_EDITOR.customerId = src.customerId;
            DOC_EDITOR.items = src.items.map(it => ({ ...it }));
            DOC_EDITOR.discountPercent = src.discountPercent;
            DOC_EDITOR.downPayment = src.downPayment;
        }
    }

    if (!DOC_EDITOR.items.length) DOC_EDITOR.items.push(emptyLine());

    renderCustomerPicker();
    renderLines();
    renderSummary();
}

function emptyLine() {
    return { sku: '', qty: 1, price: 0 };
}

function editorCustomer() {
    return DOC_EDITOR.customerId ? getCustomer(DOC_EDITOR.customerId) : null;
}

/* ===== អតិថិជន — ប្រើ Custom Dropdown ជំនួស Native select (ស្តង់ដារលេខ 6) ===== */

function renderCustomerPicker() {
    const host = document.getElementById('customerPickerHost');
    if (!host) return;
    const cust = editorCustomer();

    const options = listCustomers().map(c => `
        <button onclick="pickEditorCustomer('${c.id}')" class="sm-row-menu-item w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-left">
            <span class="min-w-0">
                <span class="block truncate">${c.name}</span>
                <span class="sm-td-sub text-slate-400 block">${c.code} · ${tierLabel(c.tier)}</span>
            </span>
            ${c.id === DOC_EDITOR.customerId ? '<i class="fas fa-check text-[11px] text-emerald-600 flex-shrink-0"></i>' : ''}
        </button>`).join('');

    host.innerHTML = `
        <div class="relative">
            <button onclick="toggleRowActionMenu(event, 'customerPickerMenu')" type="button"
                class="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition text-left">
                <span class="min-w-0">
                    ${cust
                        ? `<span class="sm-value text-slate-700 block truncate">${cust.name}</span>
                           <span class="sm-td-sub text-slate-500 block">${cust.code} · ${cust.contact} · ${cust.phone}</span>`
                        : '<span class="sm-td text-slate-400">សូមជ្រើសរើសអតិថិជន...</span>'}
                </span>
                <i class="fas fa-chevron-down text-[11px] text-slate-400 flex-shrink-0"></i>
            </button>
            <div id="customerPickerMenu" class="hidden bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 text-left max-h-[320px] overflow-y-auto scrollbar-hide">
                <div class="px-3 py-2 mb-1 rounded-xl bg-slate-50 border border-slate-100">
                    <p class="sm-td-sub text-slate-400">ជ្រើសរើសអតិថិជនដែលខ្ញុំទទួលបន្ទុក</p>
                </div>
                ${options}
            </div>
        </div>
        ${cust ? customerCreditPanel(cust) : ''}`;
}

function customerCreditPanel(cust) {
    const debt = customerDebt(cust.id);
    const totals = editorTotals();
    const after = debt + totals.grandTotal;
    const usage = Math.min((after / cust.creditLimit) * 100, 100);
    const over = after > cust.creditLimit;

    return `
        <div class="mt-3 p-3 rounded-xl border ${over ? 'bg-rose-50/60 border-rose-200' : 'bg-slate-50 border-slate-200'}">
            <div class="flex items-center justify-between gap-2">
                <span class="sm-label text-slate-600">ស្ថានភាពឥណទាន</span>
                <span class="sm-badge px-2 py-0.5 rounded-full border ${tierTone(cust.tier)}">${tierLabel(cust.tier)}</span>
            </div>
            <div class="grid grid-cols-3 gap-2 mt-2">
                <div>
                    <span class="sm-kpi-sub text-slate-500 block">ពិដានឥណទាន</span>
                    <span class="sm-value text-slate-700">${fmtUSD(cust.creditLimit)}</span>
                </div>
                <div>
                    <span class="sm-kpi-sub text-slate-500 block">បំណុលបច្ចុប្បន្ន</span>
                    <span class="sm-value text-slate-700">${fmtUSD(debt)}</span>
                </div>
                <div>
                    <span class="sm-kpi-sub text-slate-500 block">សរុបបើចេញឯកសារនេះ</span>
                    <span class="sm-value ${over ? 'text-rose-600' : 'text-emerald-700'}">${fmtUSD(after)}</span>
                </div>
            </div>
            <div class="w-full h-2 rounded-full bg-white border border-slate-200 overflow-hidden mt-2">
                <div class="h-full ${over ? 'bg-rose-500' : usage > 80 ? 'bg-amber-500' : 'bg-emerald-500'} rounded-full" style="width: ${usage}%"></div>
            </div>
            <p class="sm-kpi-sub ${over ? 'text-rose-600 font-semibold' : 'text-slate-500'} mt-1.5">
                ${over
                    ? `លើសពិដានឥណទាន ${fmtUSD(after - cust.creditLimit)} ដូច្នេះត្រូវស្នើសុំការលើកលែងពីអ្នកគ្រប់គ្រង`
                    : `ប្រើប្រាស់ ${fmtPercent(usage, 0)} · លក្ខខណ្ឌទូទាត់ ${cust.paymentTerms} ថ្ងៃ`}
            </p>
        </div>`;
}

function pickEditorCustomer(id) {
    DOC_EDITOR.customerId = id;
    closeAllFloatingDropdowns();

    // តម្លៃឯកតាប្រែប្រួលតាមកម្រិតអតិថិជន ដូច្នេះត្រូវគណនាឡើងវិញ (ស្តង់ដារលេខ 10)
    const cust = getCustomer(id);
    DOC_EDITOR.items.forEach(line => {
        if (line.sku) line.price = tierPrice(line.sku, cust.tier);
    });

    renderCustomerPicker();
    renderLines();
    renderSummary();
    showToast(`បានជ្រើសរើស ${cust.name} · តម្លៃឯកតាត្រូវបានកែតាម${tierLabel(cust.tier)}`, 'info');
}

/* ===== បន្ទាត់មុខទំនិញ ===== */

function renderLines() {
    const body = document.getElementById('itemLinesBody');
    const empty = document.getElementById('itemLinesEmpty');
    if (!body) return;

    const cust = editorCustomer();
    const tier = cust ? cust.tier : 'retail';

    if (!DOC_EDITOR.items.length) {
        body.innerHTML = '';
        if (empty) empty.classList.remove('hidden');
        return;
    }
    if (empty) empty.classList.add('hidden');

    body.innerHTML = DOC_EDITOR.items.map((line, idx) => {
        const prod = line.sku ? getProduct(line.sku) : null;
        const lineTotal = line.qty * line.price;
        const menuId = `lineProductMenu-${idx}`;

        const productOptions = listProducts().map(p => `
            <button onclick="setLineProduct(${idx}, '${p.sku}')" class="sm-row-menu-item w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-left">
                <span class="min-w-0">
                    <span class="block truncate">${p.name}</span>
                    <span class="sm-td-sub text-slate-400 block">${p.sku} · ស្តុក ${p.stock} ${p.unit}</span>
                </span>
                <span class="sm-value text-slate-700 flex-shrink-0">${fmtUSD(p.price[tier])}</span>
            </button>`).join('');

        return `
            <tr class="hover:bg-slate-50/60 transition">
                <td class="py-2.5 px-3 align-top">
                    <div class="relative">
                        <button onclick="toggleRowActionMenu(event, '${menuId}')" type="button"
                            class="w-full min-w-[220px] flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition text-left">
                            <span class="min-w-0">
                                ${prod
                                    ? `<span class="sm-td text-slate-700 block truncate">${prod.name}</span>
                                       <span class="sm-td-sub text-slate-400 block">${prod.sku}</span>`
                                    : '<span class="sm-td text-slate-400">ជ្រើសរើសមុខទំនិញ...</span>'}
                            </span>
                            <i class="fas fa-chevron-down text-[10px] text-slate-400 flex-shrink-0"></i>
                        </button>
                        <div id="${menuId}" class="hidden bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 text-left max-h-[300px] overflow-y-auto scrollbar-hide">
                            <div class="px-3 py-2 mb-1 rounded-xl bg-slate-50 border border-slate-100">
                                <p class="sm-td-sub text-slate-400">តម្លៃបង្ហាញតាម${tierLabel(tier)}</p>
                            </div>
                            ${productOptions}
                        </div>
                    </div>
                </td>
                <td class="py-2.5 px-3 align-top">
                    <input type="number" min="1" value="${line.qty}" onchange="setLineQty(${idx}, this.value)"
                        class="sm-td w-24 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-center focus:outline-none focus:border-[#1e3a5f] transition">
                    <span class="sm-td-sub text-slate-400 block text-center mt-1">${prod ? prod.unit : '—'}</span>
                </td>
                <td class="py-2.5 px-3 align-top">
                    <input type="number" min="0" step="0.01" value="${line.price}" onchange="setLinePrice(${idx}, this.value)"
                        class="sm-td w-28 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-right focus:outline-none focus:border-[#1e3a5f] transition">
                </td>
                <td class="py-2.5 px-3 align-top text-right">
                    <span class="sm-td-strong text-slate-700">${fmtUSD(lineTotal)}</span>
                </td>
                <td class="py-2.5 px-3 align-top text-right">
                    <button onclick="removeLine(${idx})" type="button" title="លុបបន្ទាត់"
                        class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200/70 inline-flex items-center justify-center transition">
                        <i class="fas fa-trash-can text-xs"></i>
                    </button>
                </td>
            </tr>`;
    }).join('');
}

function addLine() {
    DOC_EDITOR.items.push(emptyLine());
    renderLines();
    renderSummary();
}

function removeLine(idx) {
    DOC_EDITOR.items.splice(idx, 1);
    closeAllFloatingDropdowns();
    renderLines();
    renderSummary();
    renderCustomerPicker();
}

function setLineProduct(idx, sku) {
    const cust = editorCustomer();
    const tier = cust ? cust.tier : 'retail';
    DOC_EDITOR.items[idx].sku = sku;
    DOC_EDITOR.items[idx].price = tierPrice(sku, tier);
    closeAllFloatingDropdowns();
    renderLines();
    renderSummary();
    renderCustomerPicker();
}

function setLineQty(idx, value) {
    DOC_EDITOR.items[idx].qty = Math.max(parseInt(value, 10) || 1, 1);
    renderLines();
    renderSummary();
    renderCustomerPicker();
}

function setLinePrice(idx, value) {
    DOC_EDITOR.items[idx].price = Math.max(parseFloat(value) || 0, 0);
    renderLines();
    renderSummary();
    renderCustomerPicker();
}

/* ===== សង្ខេបហិរញ្ញវត្ថុ ===== */

function editorTotals() {
    return docTotals({
        items: DOC_EDITOR.items.filter(l => l.sku),
        discountPercent: DOC_EDITOR.discountPercent,
        downPayment: DOC_EDITOR.downPayment
    });
}

function setDiscount(value) {
    DOC_EDITOR.discountPercent = Math.min(Math.max(parseFloat(value) || 0, 0), 100);
    renderSummary();
    renderCustomerPicker();
}

function setDownPayment(value) {
    DOC_EDITOR.downPayment = Math.max(parseFloat(value) || 0, 0);
    renderSummary();
    renderCustomerPicker();
}

function renderSummary() {
    const host = document.getElementById('summaryHost');
    if (!host) return;

    const t = editorTotals();
    const needsApproval = t.discountPercent > DISCOUNT_SELF_LIMIT;

    host.innerHTML = `
        <div class="space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label class="sm-label text-slate-600 block mb-1.5">ប្រាក់កក់</label>
                    <input type="number" min="0" step="0.01" value="${DOC_EDITOR.downPayment}" onchange="setDownPayment(this.value)"
                        class="sm-td w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 focus:outline-none focus:border-[#1e3a5f] transition">
                </div>
                <div>
                    <label class="sm-label text-slate-600 block mb-1.5">បញ្ចុះតម្លៃពិសេស (%)</label>
                    <input type="number" min="0" max="100" step="0.1" value="${DOC_EDITOR.discountPercent}" onchange="setDiscount(this.value)"
                        class="sm-td w-full px-3 py-2.5 rounded-xl bg-white border ${needsApproval ? 'border-amber-300 bg-amber-50/40' : 'border-slate-200'} text-slate-700 focus:outline-none focus:border-[#1e3a5f] transition">
                </div>
            </div>

            ${needsApproval ? `
                <div class="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <i class="fas fa-triangle-exclamation text-amber-600 text-sm mt-0.5 flex-shrink-0"></i>
                    <p class="sm-card-sub text-amber-800">
                        ការបញ្ចុះតម្លៃ ${fmtPercent(t.discountPercent)} លើសពីដែនកម្រិត ${fmtPercent(DISCOUNT_SELF_LIMIT)} ដែលលោកអ្នកអនុវត្តបានដោយខ្លួនឯង។
                        ត្រូវបង្កើតជាសម្រង់តម្លៃ ហើយដាក់ស្នើឱ្យ ${CURRENT_REP.manager} អនុម័តជាមុនសិន។
                    </p>
                </div>` : ''}

            ${DOC_EDITOR.mode === 'quote' ? `
                <p class="sm-kpi-sub text-slate-500">
                    ត្រូវការការអនុម័តពី ${requiredApprovalLevels(t.grandTotal).map(l => APPROVAL_LEVEL_LABEL[l]).join(' រួចបន្តទៅ ')}
                </p>` : ''}

            <div class="pt-3 border-t border-slate-200 space-y-2">
                <div class="flex justify-between">
                    <span class="sm-label text-slate-600">សរុបរងមុខទំនិញ</span>
                    <span class="sm-value text-slate-700">${fmtUSD(t.subtotal)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="sm-label text-slate-600">ប្រាក់កក់</span>
                    <span class="sm-value text-slate-700">${fmtUSD(t.downPayment)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="sm-label ${t.discountAmount ? 'text-amber-700 font-semibold' : 'text-slate-600'}">បញ្ចុះតម្លៃពិសេស ${fmtPercent(t.discountPercent)}</span>
                    <span class="sm-value ${t.discountAmount ? 'text-amber-700' : 'text-slate-700'}">-${fmtUSD(t.discountAmount)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="sm-label text-slate-600">អាករលើតម្លៃបន្ថែម 10%</span>
                    <span class="sm-value text-slate-700">${fmtUSD(t.vatAmount)}</span>
                </div>
                <div class="flex justify-between pt-2 border-t border-slate-200">
                    <span class="sm-card-title text-slate-700">សរុបត្រូវបង់</span>
                    <span class="sm-kpi-value text-blue-700">${fmtUSD(t.grandTotal)}</span>
                </div>
            </div>
        </div>`;
}

/* ===== ប្រមូល និងផ្ទៀងផ្ទាត់ ===== */

function collectDoc() {
    return {
        customerId: DOC_EDITOR.customerId,
        items: DOC_EDITOR.items.filter(l => l.sku),
        discountPercent: DOC_EDITOR.discountPercent,
        downPayment: DOC_EDITOR.downPayment
    };
}

function validateDoc() {
    if (!DOC_EDITOR.customerId) return 'សូមជ្រើសរើសអតិថិជនជាមុនសិន';
    if (!DOC_EDITOR.items.filter(l => l.sku).length) return 'សូមបញ្ចូលមុខទំនិញយ៉ាងតិច 1 មុខ';
    if (editorTotals().subtotal <= 0) return 'ទឹកប្រាក់សរុបរងត្រូវតែធំជាង 0';
    return null;
}

function needsManagerApproval() {
    return DOC_EDITOR.discountPercent > DISCOUNT_SELF_LIMIT;
}
