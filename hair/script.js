
const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const now = new Date();
const dayIndex = now.getDay(); 

const weeklyPlan = [
    { day: 1, type: 'FULL WASH', detail: 'Sampo Selsun + Condi', badge: 'badge-wash' },
    { day: 2, type: 'WATER ONLY', detail: 'Bilas Air Dingin + Tonic', badge: 'badge-water' },
    { day: 3, type: 'CO-WASH', detail: 'Condi Only (No Sampo)', badge: 'badge-cowash' },
    { day: 4, type: 'FULL WASH', detail: 'Sampo Selsun + Condi', badge: 'badge-wash' },
    { day: 5, type: 'WATER ONLY', detail: 'Bilas Air Dingin + Tonic', badge: 'badge-water' },
    { day: 6, type: 'FULL WASH', detail: 'Sampo Selsun + Condi', badge: 'badge-wash' },
    { day: 0, type: 'REST DAY', detail: 'Istirahat (Jangan Basah)', badge: 'badge-rest' }
];

function getTasksForDay(dIndex) {
    const plan = weeklyPlan.find(p => p.day === dIndex);
    if (!plan) return [];

    let tasks = [];

    if (plan.type === 'REST DAY') {
        tasks.push({
            label: '🚿 Mandi Tanpa Basahi Rambut',
            sub: 'Gunakan <strong>Shower Cap</strong>. Biarkan minyak alami bekerja. Jangan kena air.'
        });
    } else {
        let washSub = "";
        if (plan.type === 'FULL WASH') washSub = '<strong>Step 1:</strong> Sampo Selsun (Pijat 1 menit).<br><strong>Step 2:</strong> Bilas.<br><strong>Step 3:</strong> Conditioner Pantene (Batang rambut, 2 menit).';
        else if (plan.type === 'CO-WASH') washSub = 'Cuci pakai <strong>Conditioner Saja</strong> (Tanpa Sampo). Bersihkan keringat, bilas.';
        else if (plan.type === 'WATER ONLY') washSub = 'Hanya bilas air dingin. Gosok lembut kulit kepala. <strong>NO SABUN.</strong>';

        tasks.push({
            label: `🚿 Proses Keramas (${plan.type})`,
            sub: washSub
        });
    }

    if (plan.type !== 'REST DAY') {
        tasks.push({
            label: '🧖‍♂️ Pengeringan & Tonic',
            sub: '<strong>Handuk:</strong> TEPUK-TEPUK (Jangan gosok!).<br><strong>Tonic:</strong> Tetes Natur di kulit kepala lembap, pijat.'
        });
    }

    if (plan.type !== 'REST DAY') {
        tasks.push({
            label: '🎨 Pre-Styling (Base)',
            sub: 'Rambut lembap -> Gatsby Biru (dikit) -> Bentuk "Koma" pakai jari.'
        });
        tasks.push({
            label: '🔒 Locking (Finish)',
            sub: '90% Kering -> Wax Ungu -> Acak volume atas -> Kunci poni.'
        });
    } else {
        tasks.push({ label: '🛌 Istirahat', sub: 'Biarkan rambut bernapas tanpa produk.' });
    }

    return tasks;
}

const shoppingItems = [
    { 
        id: 'shop_selsun', 
        label: 'Selsun Blue 5', 
        sub: 'Anti Gatal/Ketombe (2-3x seminggu).',
        details: {
            active: 'Selenium Sulfide 1%',
            desc: 'Zat ini spesifik mematikan jamur Malassezia di kulit kepala. Lebih kuat dari Zinc Pyrithione (sampo biasa).',
            others: [
                '<strong>Aloe Barbadensis Leaf Juice:</strong> Ekstrak lidah buaya untuk menenangkan kulit kepala agar tidak iritasi akibat obat keras.',
                '<strong>Ammonium Lauryl Sulfate:</strong> Agen pembersih (deterjen) kuat untuk mengangkat minyak berlebih.',
                '<strong>Dimethicone:</strong> Silikon untuk melapisi rambut agar tetap halus meski kena obat antiketombe.'
            ],
            alt: 'Selsun Gold (Lebih keras), Head & Shoulders Clinical Strength, Ketomed (Ketoconazole - Apotek).'
        }
    },
    { 
        id: 'shop_pantene', 
        label: 'Pantene Conditioner', 
        sub: 'Varian Hair Fall (Pink/Emas). Wajib.',
        details: {
            active: 'Pro-Vitamin B5 (Panthenol)',
            desc: 'Meresap ke dalam batang rambut untuk memperbaiki struktur protein yang rusak.',
            others: [
                '<strong>Bis-Aminopropyl Dimethicone:</strong> Silikon pintar yang hanya menempel di bagian rambut rusak, bikin licin tapi nggak lepek.',
                '<strong>Histidine:</strong> Asam amino antioksidan yang melindungi rambut dari kerusakan UV dan polusi.',
                '<strong>Behentrimonium Methosulfate:</strong> Agen anti-statik biar rambut nggak "terbang" (frizzy) saat kering.'
            ],
            alt: 'Dove Total Damage Treatment, Tresemme Keratin Smooth, Rejoice (Varian Rich/Soft).'
        }
    },
    { 
        id: 'shop_natur', 
        label: 'Natur Hair Tonic', 
        sub: 'Varian Ginseng. Nutrisi akar.',
        details: {
            active: 'Panax Ginseng Extract',
            desc: 'Bioaktif Ginsenosides melancarkan peredaran darah mikro di folikel rambut, mencegah kematian akar rambut.',
            others: [
                '<strong>Morus Alba Extract (Murbei):</strong> Merangsang fase anagen (fase tumbuh) pada siklus rambut.',
                '<strong>Vitex Trifolia Fruit Extract:</strong> Antiseptik alami untuk mencegah peradangan/gatal ringan.',
                '<strong>PEG-40 Hydrogenated Castor Oil:</strong> Pelarut minyak jarak yang melembapkan kulit kepala tanpa bikin berminyak.'
            ],
            alt: 'Mustika Ratu Hair Tonic (Penyubur), Makarizo Hair Energy Scentsations (Untuk bau saja), NR Hair Tonic.'
        }
    },
    { 
        id: 'shop_wax', 
        label: 'Gatsby Wax Ungu', 
        sub: 'Mat & Hard. Kunci gaya seharian.',
        details: {
            active: 'Microcrystalline Wax',
            desc: 'Lilin sintetis dengan kristal mikro yang memberikan daya rekat kuat (Hold) tapi fleksibel.',
            others: [
                '<strong>Beeswax (Lilin Lebah):</strong> Memberikan tekstur alami dan tidak mengkilap (Matte finish).',
                '<strong>Petrolatum (Vaseline):</strong> Menjaga kelembapan rambut agar wax tidak bikin rambut kering patah.',
                '<strong>Carnauba Wax:</strong> Lilin dari daun palem, titik lelehnya tinggi, jadi gaya rambut tahan panas matahari.'
            ],
            alt: 'Gatsby Styling Wax (Abu-abu), Kahf Hair Clay, Tezzen Clay (Lokal High End).'
        }
    }
];

function initApp() {
    renderToday();
    renderWeeklyList();
    renderChecklist('dailyList', getTasksForDay(dayIndex), true);
    renderShoppingList();
}

function renderToday() {
    const dayName = days[dayIndex];
    const dateString = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('dateDisplay').innerText = `${dayName}, ${dateString}`;
    
    const todayPlan = weeklyPlan.find(p => p.day === dayIndex);
    if (todayPlan) {
        const actionEl = document.getElementById('actionDisplay');
        let icon = "🚿";
        if(todayPlan.type === 'REST DAY') icon = "🛑";
        if(todayPlan.type === 'WATER ONLY') icon = "💧";
        if(todayPlan.type === 'CO-WASH') icon = "🧴";
        
        actionEl.innerText = `${icon} ${todayPlan.type}`;
        document.getElementById('detailDisplay').innerText = todayPlan.detail;
        
        let cssClass = "";
        if (todayPlan.badge === 'badge-wash') cssClass = 'wash';
        if (todayPlan.badge === 'badge-cowash') cssClass = 'cowash';
        if (todayPlan.badge === 'badge-water') cssClass = 'water';
        if (todayPlan.badge === 'badge-rest') cssClass = 'rest';
        actionEl.className = `today-action ${cssClass}`;
    }
}

function renderWeeklyList() {
    const container = document.getElementById('weeklyScheduleList');
    container.innerHTML = '';
    weeklyPlan.forEach(plan => {
        const dayLabel = days[plan.day];
        const isToday = plan.day === dayIndex;
        const div = document.createElement('div');
        div.className = `weekly-item ${isToday ? 'active' : ''}`;
        div.onclick = () => openDayDetail(plan.day);
        div.innerHTML = `
            <div style="display:flex; align-items:center; width:100%">
                <span class="weekly-day">${dayLabel}</span>
                <span class="weekly-type ${plan.badge}">${plan.type}</span>
                ${isToday ? '<span style="font-size:0.7em; color:var(--text-muted); margin-left:8px;">(Hari Ini)</span>' : ''}
                <i class="fa-solid fa-chevron-right icon-arrow"></i>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderChecklist(containerId, tasks, useStorage) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    tasks.forEach((item, index) => {
        const storageId = useStorage ? `task_${dayIndex}_${index}` : item.id;
        const div = document.createElement('div');
        div.className = 'checklist-item';
        
        let isChecked = false;
        if(useStorage) {
            isChecked = localStorage.getItem(storageId) === 'true';
        }
        if(isChecked) div.classList.add('checked');

        div.innerHTML = `
            <div class="check-area" onclick="toggleTask('${storageId}', '${containerId}', ${useStorage})">
                <div class="custom-checkbox"></div>
                <div class="checklist-text">
                    <span class="checklist-label">${item.label}</span>
                    <span class="checklist-sub">${item.sub}</span>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
    if(useStorage) updateProgress();
}

function renderShoppingList() {
    const container = document.getElementById('shoppingList');
    container.innerHTML = '';
    shoppingItems.forEach((item) => {
        const storageId = item.id;
        const div = document.createElement('div');
        div.className = 'checklist-item';
        
        const isChecked = localStorage.getItem(storageId) === 'true';
        if(isChecked) div.classList.add('checked');

        div.innerHTML = `
            <div class="check-area" onclick="toggleShopping('${storageId}')">
                <div class="custom-checkbox"></div>
                <div class="checklist-text">
                    <span class="checklist-label">${item.label}</span>
                    <span class="checklist-sub">${item.sub}</span>
                </div>
            </div>
            <button class="btn-detail" onclick="openProductDetail('${item.id}')">
                <i class="fa-solid fa-circle-info"></i>
            </button>
        `;
        container.appendChild(div);
    });
}

function toggleTask(id, containerId, useStorage) {
    if(!useStorage) return; 
    const currentState = localStorage.getItem(id) === 'true';
    localStorage.setItem(id, !currentState);
    renderChecklist(containerId, getTasksForDay(dayIndex), true);
    updateProgress();
}

function toggleShopping(id) {
    const currentState = localStorage.getItem(id) === 'true';
    localStorage.setItem(id, !currentState);
    renderShoppingList();
}

function updateProgress() {
    const tasks = getTasksForDay(dayIndex);
    let checkedCount = 0;
    tasks.forEach((_, index) => {
            if(localStorage.getItem(`task_${dayIndex}_${index}`) === 'true') checkedCount++;
    });
    document.getElementById('progressText').innerText = `${checkedCount}/${tasks.length}`;
}

function resetChecklist() {
    if(confirm('Reset checklist hari ini?')) {
        const tasks = getTasksForDay(dayIndex);
        tasks.forEach((_, index) => localStorage.removeItem(`task_${dayIndex}_${index}`));
        renderChecklist('dailyList', tasks, true);
    }
}

function openDayDetail(dIndex) {
    const plan = weeklyPlan.find(p => p.day === dIndex);
    document.getElementById('modalTitle').innerText = `Detail: ${days[dIndex]}`;
    const tasks = getTasksForDay(dIndex);
    const modalList = document.getElementById('modalTaskList');
    modalList.innerHTML = '';
    tasks.forEach(item => {
        const div = document.createElement('div');
        div.className = 'checklist-item';
        div.style.cursor = 'default';
        div.innerHTML = `
            <div class="custom-checkbox" style="border-color: var(--primary); background: rgba(99,102,241,0.2);"></div>
            <div class="checklist-text">
                <span class="checklist-label">${item.label}</span>
                <span class="checklist-sub">${item.sub}</span>
            </div>
        `;
        modalList.appendChild(div);
    });
    document.getElementById('dayDetailModal').classList.add('active');
}

function openProductDetail(prodId) {
    const item = shoppingItems.find(p => p.id === prodId);
    if(!item) return;

    document.getElementById('prodModalTitle').innerText = item.label;
    const body = document.getElementById('prodModalBody');
    
    let othersHtml = '';
    if(item.details.others && item.details.others.length > 0) {
        othersHtml = `<ul class="ing-list">`;
        item.details.others.forEach(ing => {
            othersHtml += `<li>${ing}</li>`;
        });
        othersHtml += `</ul>`;
    }

    body.innerHTML = `
        <div class="prod-section">
            <span class="prod-label">Senjata Utama (Active Ingredient)</span>
            <span class="prod-value prod-active-ing">${item.details.active}</span>
        </div>
        <div class="prod-section">
            <span class="prod-label">Fungsi Strategis</span>
            <span class="prod-value">${item.details.desc}</span>
        </div>
        <div class="prod-section">
            <span class="prod-label">Support System (Bahan Pendukung)</span>
            ${othersHtml}
        </div>
        <div class="prod-section" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
            <span class="prod-label">Alternatif Merk Lain</span>
            <span class="prod-value" style="color: var(--warning)">${item.details.alt}</span>
        </div>
    `;
    
    document.getElementById('productDetailModal').classList.add('active');
}

function openGlossary() {
    document.getElementById('glossaryModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}

window.addEventListener('DOMContentLoaded', initApp);