// CasinoTrack Pro - Complete Application Logic

// Data & State
let currentUser = null;
let users = JSON.parse(localStorage.getItem('ct_users')) || [];
let casinos = [];
let cartas = [];
let pagos = [];
let messages = JSON.parse(localStorage.getItem('ct_messages')) || [];
let currentTheme = localStorage.getItem('ct_theme') || 'light';

// Casino colors for cards
const casinoColors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(135deg, #f78ca0 0%, #f9748f 100%)'
];

// Popular AMOE Casinos Database
const casinosPopulares = [
    {
        nombre: 'Stake.us',
        emoji: '🎲',
        precioPorCarta: 5.00,
        pobox: 'P.O. Box 123456',
        poboxCiudad: 'Dallas',
        poboxEstado: 'TX',
        poboxZip: '75201',
        email: 'support@stake.us',
        website: 'https://stake.us',
        tiempoRespuesta: '3-10 semanas',
        codigoRequerido: true,
        tamañoPostal: '4" x 6"',
        sobre: '#10 estampado',
        tinta: 'Negra o azul',
        cartasPorSobre: 1,
        limiteEntradas: 'Ilimitado',
        instrucciones: 'Escribe "Stake Cash Credits" en el sobre. Incluye tu código postal único generado en el sitio web.',
        notas: 'Más de 1,400 juegos. Uno de los casinos sweepstakes más grandes. Respuesta rápida.',
        requisitos: [
            'Postal o papel blanco de 4" x 6", sin doblar',
            'Sobre #10 con estampilla',
            'Dirección de retorno completa',
            'Escribir "Stake Cash Credits" en el sobre',
            'Incluir código postal único (generado en sitio)',
            'Escritura a mano clara y legible'
        ]
    },
    {
        nombre: 'WOW Vegas',
        emoji: '🎰',
        precioPorCarta: 3.00,
        pobox: 'MW Services Limited, P.O. Box 9402',
        poboxCiudad: 'Manchester',
        poboxEstado: 'NH',
        poboxZip: '03108',
        email: 'support@wowvegas.com',
        website: 'https://wowvegas.com',
        tiempoRespuesta: '3-8 semanas',
        codigoRequerido: true,
        tamañoPostal: '4" x 6"',
        sobre: '#10 estampado',
        tinta: 'NEGRA (TODO EN MAYÚSCULAS)',
        cartasPorSobre: 1,
        limiteEntradas: 'Ilimitado',
        instrucciones: 'TODO debe estar en MAYÚSCULAS con tinta NEGRA. Código postal de 11 dígitos requerido.',
        notas: 'Más de 1,000 juegos. Patrocinio de Paris Hilton. Proceso estricto pero confiable.',
        requisitos: [
            'Postal blanca o papel blanco de 4" x 6"',
            'Tinta NEGRA solamente',
            'TODO en MAYÚSCULAS',
            'Código postal de 11 dígitos',
            'Sobre #10 estampado',
            'No usar software automatizado'
        ]
    },
    {
        nombre: 'McLuck',
        emoji: '🍀',
        precioPorCarta: 3.50,
        pobox: 'P.O. Box 7845',
        poboxCiudad: 'Dover',
        poboxEstado: 'DE',
        poboxZip: '19901',
        email: 'hello@mcluck.com',
        website: 'https://mcluck.com',
        tiempoRespuesta: '4-10 semanas',
        codigoRequerido: true,
        tamañoPostal: '4" x 6"',
        sobre: '#10',
        tinta: 'Negra o azul',
        cartasPorSobre: 1,
        limiteEntradas: 'Ilimitado',
        instrucciones: 'Postal escrita a mano con código único. Incluye declaración de solicitud.',
        notas: 'Interfaz amigable. Buen soporte al cliente. Bonos diarios generosos.',
        requisitos: [
            'Postal de 4" x 6" sin doblar',
            'Código de solicitud postal único',
            'Declaración escrita a mano',
            'Dirección de retorno',
            'Sobre estampado',
            'Información legible'
        ]
    },
    {
        nombre: 'Crown Coins',
        emoji: '👑',
        precioPorCarta: 2.00,
        pobox: 'Crown Coins Casino, P.O. Box 5114',
        poboxCiudad: 'Fredericksburg',
        poboxEstado: 'VA',
        poboxZip: '22403-5114',
        email: 'support@crowncoins.com',
        website: 'https://crowncoins.com',
        tiempoRespuesta: '2-6 semanas',
        codigoRequerido: false,
        tamañoPostal: '4" x 6"',
        sobre: '#10 estampado',
        tinta: 'Negra',
        cartasPorSobre: 1,
        limiteEntradas: 'Ilimitado',
        instrucciones: 'Escribir "Sweepstakes Coins" en el sobre. Sin código requerido.',
        notas: 'Proceso más simple. Respuesta más rápida. Buen casino para principiantes.',
        requisitos: [
            'Tarjeta de 4" x 6" sin doblar',
            'Tinta negra solamente',
            'Escribir "Sweepstakes Coins" en sobre',
            'Sobre #10 con estampilla',
            'Dirección de retorno completa',
            'Una tarjeta por sobre'
        ]
    },
    {
        nombre: 'Pulsz',
        emoji: '⚡',
        precioPorCarta: 4.00,
        pobox: 'P.O. Box 3025',
        poboxCiudad: 'Wilmington',
        poboxEstado: 'DE',
        poboxZip: '19804',
        email: 'contact@pulsz.com',
        website: 'https://pulsz.com',
        tiempoRespuesta: '3-9 semanas',
        codigoRequerido: true,
        tamañoPostal: '4" x 6"',
        sobre: '#10',
        tinta: 'Cualquier color',
        cartasPorSobre: 1,
        limiteEntradas: 'Ilimitado',
        instrucciones: 'Código postal generado en cuenta. Gran variedad de juegos.',
        notas: 'Más de 500 juegos. Diseño moderno. Buen programa de fidelidad.',
        requisitos: [
            'Postal de 4" x 6"',
            'Código postal único',
            'Solicitud escrita a mano',
            'Sobre estampado',
            'Dirección de retorno',
            'Entradas ilimitadas permitidas'
        ]
    },
    {
        nombre: 'Chumba Casino',
        emoji: '🐘',
        precioPorCarta: 3.00,
        pobox: 'P.O. Box 4109',
        poboxCiudad: 'Seattle',
        poboxEstado: 'WA',
        poboxZip: '98104',
        email: 'support@chumbacasino.com',
        website: 'https://chumbacasino.com',
        tiempoRespuesta: '4-12 semanas',
        codigoRequerido: true,
        tamañoPostal: '4" x 6"',
        sobre: '#10 estampado',
        tinta: 'Negra o azul',
        cartasPorSobre: 1,
        limiteEntradas: 'Ilimitado',
        instrucciones: 'Uno de los pioneros. Código de solicitud postal en reglas de sweepstakes.',
        notas: 'Establecido desde 2017. Muy confiable. Gran reputación.',
        requisitos: [
            'Postal de 4" x 6" sin doblar',
            'Código postal único (válido 30 días)',
            'Escritura clara y legible',
            'Sobre #10 estampado',
            'Dirección de retorno completa',
            'Declaración de solicitud'
        ]
    },
    {
        nombre: 'LuckyLand Slots',
        emoji: '🎱',
        precioPorCarta: 2.50,
        pobox: 'P.O. Box 2734',
        poboxCiudad: 'Austin',
        poboxEstado: 'TX',
        poboxZip: '78701',
        email: 'help@luckylandslots.com',
        website: 'https://luckylandslots.com',
        tiempoRespuesta: '3-8 semanas',
        codigoRequerido: true,
        tamañoPostal: '4" x 6"',
        sobre: '#10',
        tinta: 'Negra',
        cartasPorSobre: 1,
        limiteEntradas: 'Ilimitado',
        instrucciones: 'Especializado en slots. Código postal requerido.',
        notas: 'Excelente para fanáticos de slots. Más de 200 juegos.',
        requisitos: [
            'Tarjeta de 4" x 6"',
            'Código postal generado',
            'Tinta negra',
            'Sobre #10 con estampilla',
            'Dirección completa',
            'Escritura a mano'
        ]
    },
    {
        nombre: 'Funzpoints',
        emoji: '🎪',
        precioPorCarta: 4.50,
        pobox: 'P.O. Box 8932',
        poboxCiudad: 'Las Vegas',
        poboxEstado: 'NV',
        poboxZip: '89109',
        email: 'support@funzpoints.com',
        website: 'https://funzpoints.com',
        tiempoRespuesta: '2-7 semanas',
        codigoRequerido: false,
        tamañoPostal: 'Standard postcard',
        sobre: 'Estampado',
        tinta: 'Cualquier color',
        cartasPorSobre: 1,
        limiteEntradas: 'Ilimitado',
        instrucciones: 'Proceso simple. Sin código necesario. Respuesta rápida.',
        notas: 'Uno de los más rápidos en responder. Interfaz simple.',
        requisitos: [
            'Postal estándar',
            'Escritura a mano',
            'Dirección de retorno',
            'Estampilla',
            'Solicitud clara',
            'Sin límite de entradas'
        ]
    },
    {
        nombre: 'Real Prize',
        emoji: '💎',
        precioPorCarta: 3.00,
        pobox: 'P.O. Box 1542',
        poboxCiudad: 'Miami',
        poboxEstado: 'FL',
        poboxZip: '33101',
        email: 'info@realprize.com',
        website: 'https://realprize.com',
        tiempoRespuesta: '3-10 semanas',
        codigoRequerido: true,
        tamañoPostal: '4" x 6"',
        sobre: '#10',
        tinta: 'Negra o azul',
        cartasPorSobre: 1,
        limiteEntradas: 'Ilimitado',
        instrucciones: 'Código postal único. Buen bono de bienvenida.',
        notas: 'Gran bono inicial. Programa VIP excelente.',
        requisitos: [
            'Postal de 4" x 6"',
            'Código postal generado',
            'Escritura clara',
            'Sobre estampado',
            'Dirección completa',
            'Una entrada por sobre'
        ]
    },
    {
        nombre: 'Punt Casino',
        emoji: '🏈',
        precioPorCarta: 5.00,
        pobox: 'P.O. Box 6543',
        poboxCiudad: 'Chicago',
        poboxEstado: 'IL',
        poboxZip: '60601',
        email: 'hello@punt.com',
        website: 'https://punt.com',
        tiempoRespuesta: '4-11 semanas',
        codigoRequerido: true,
        tamañoPostal: '4" x 6"',
        sobre: '#10 estampado',
        tinta: 'Negra',
        cartasPorSobre: 1,
        limiteEntradas: 'Ilimitado',
        instrucciones: 'Código válido 90 días. Sin límite de solicitudes.',
        notas: 'Código de larga duración. Buen para envíos masivos.',
        requisitos: [
            'Postal de 4" x 6" sin doblar',
            'Código postal (válido 90 días)',
            'Tinta negra solamente',
            'Escritura a mano obligatoria',
            'Sobre #10 con estampilla',
            'Dirección de retorno'
        ]
    },
    {
        nombre: 'Spree Casino',
        emoji: '🎊',
        precioPorCarta: 4.00,
        pobox: 'P.O. Box 9871',
        poboxCiudad: 'New York',
        poboxEstado: 'NY',
        poboxZip: '10001',
        email: 'support@spree.com',
        website: 'https://spree.com',
        tiempoRespuesta: '3-12 semanas',
        codigoRequerido: true,
        tamañoPostal: '4" x 6"',
        sobre: '#10',
        tinta: 'NO NEGRA (Azul recomendada)',
        cartasPorSobre: 1,
        limiteEntradas: 'Ilimitado',
        instrucciones: 'IMPORTANTE: NO usar tinta negra. Usar azul u otro color.',
        notas: 'Ofrece 4 SC por carta. Requisito único de NO usar tinta negra.',
        requisitos: [
            'Postal de 4" x 6"',
            'Código de solicitud Spree Coins',
            'NO usar tinta negra',
            'Tinta azul recomendada',
            'Sobre #10 estampado',
            'Escritura legible'
        ]
    },
    {
        nombre: 'High 5 Casino',
        emoji: '✋',
        precioPorCarta: 2.50,
        pobox: 'P.O. Box 4532',
        poboxCiudad: 'Los Angeles',
        poboxEstado: 'CA',
        poboxZip: '90001',
        email: 'contact@high5casino.com',
        website: 'https://high5casino.com',
        tiempoRespuesta: '2-8 semanas',
        codigoRequerido: false,
        tamañoPostal: 'Standard',
        sobre: 'Estampado',
        tinta: 'Cualquier color',
        cartasPorSobre: 1,
        limiteEntradas: 'Ilimitado',
        instrucciones: 'Proceso simple. Sin código necesario.',
        notas: 'Excelente para jugadores de slots. Proceso fácil.',
        requisitos: [
            'Postal estándar',
            'Escritura a mano',
            'Solicitud clara',
            'Dirección de retorno',
            'Estampilla postal',
            'Sin límite'
        ]
    }
];

// Apply theme on load
document.documentElement.setAttribute('data-theme', currentTheme);

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('ct_theme', currentTheme);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
}

// Authentication
function showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('registerScreen').style.display = 'none';
}

function showRegister() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('registerScreen').style.display = 'flex';
}

// Setup event listeners when DOM is ready
function setupAuthListeners() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                currentUser = user;
                localStorage.setItem('ct_currentUser', JSON.stringify(user));
                loadUserData();
                showApp();
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('regUsername').value;
            
            if (users.find(u => u.username === username)) {
                alert('Este usuario ya existe');
                return;
            }
            
            const newUser = {
                id: Date.now().toString(),
                name: document.getElementById('regName').value,
                email: document.getElementById('regEmail').value,
                username: username,
                password: document.getElementById('regPassword').value
            };
            
            users.push(newUser);
            localStorage.setItem('ct_users', JSON.stringify(users));
            
            alert('Cuenta creada exitosamente');
            showLogin();
            registerForm.reset();
        });
    }
}

function showApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('registerScreen').style.display = 'none';
    document.getElementById('appContainer').classList.add('active');
    
    const initial = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('userAvatar').textContent = initial;
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userEmail').textContent = currentUser.email;
    
    renderAll();
}

function logout() {
    if (confirm('¿Cerrar sesión?')) {
        currentUser = null;
        localStorage.removeItem('ct_currentUser');
        document.getElementById('appContainer').classList.remove('active');
        showLogin();
    }
}

// Data Management
function getUserKey(key) {
    return `ct_${currentUser.id}_${key}`;
}

function loadUserData() {
    casinos = JSON.parse(localStorage.getItem(getUserKey('casinos'))) || [];
    cartas = JSON.parse(localStorage.getItem(getUserKey('cartas'))) || [];
    pagos = JSON.parse(localStorage.getItem(getUserKey('pagos'))) || [];
}

function saveData() {
    localStorage.setItem(getUserKey('casinos'), JSON.stringify(casinos));
    localStorage.setItem(getUserKey('cartas'), JSON.stringify(cartas));
    localStorage.setItem(getUserKey('pagos'), JSON.stringify(pagos));
}

// Calculations
function getCasinoStats(casinoId) {
    const casino = casinos.find(c => c.id === casinoId);
    if (!casino) return null;

    const casinoCartas = cartas.filter(c => c.casinoId === casinoId);
    const casinoPagos = pagos.filter(p => p.casinoId === casinoId);

    const totalCartas = casinoCartas.length;
    const cartasPagadas = casinoCartas.filter(c => c.estado === 'Pagada').length;
    const cartasPendientes = casinoCartas.filter(c => c.estado === 'Pendiente').length;

    const precioPorCarta = parseFloat(casino.precioPorCarta) || 0;
    const totalCobrado = casinoPagos.reduce((sum, p) => sum + parseFloat(p.monto), 0);
    const porCobrar = cartasPendientes * precioPorCarta;

    const ultimoPago = casinoPagos.length > 0 
        ? casinoPagos.sort((a, b) => new Date(b.fechaPago) - new Date(a.fechaPago))[0].fechaPago
        : null;

    return {
        casino,
        totalCartas,
        cartasPagadas,
        cartasPendientes,
        precioPorCarta,
        totalCobrado,
        porCobrar,
        ultimoPago,
        casinoPagos
    };
}

function getTotales() {
    let totalCartas = cartas.length;
    let totalCobrado = pagos.reduce((sum, p) => sum + parseFloat(p.monto), 0);
    let porCobrar = 0;

    casinos.forEach(casino => {
        const stats = getCasinoStats(casino.id);
        if (stats) porCobrar += stats.porCobrar;
    });

    return { totalCartas, totalCobrado, porCobrar };
}

function formatMoney(amount) {
    return '$' + parseFloat(amount).toLocaleString('en-US', {minimumFractionDigits: 2});
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
}

// Navigation
function showSection(sectionName) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(sectionName).classList.add('active');
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    const titles = {
        dashboard: 'Dashboard - Casinos AMOE',
        casinos: 'Gestión de Casinos',
        cartas: 'Registro de Cartas',
        pagos: 'Pagos Recibidos',
        comunidad: 'Comunidad AMOE'
    };
    
    document.getElementById('pageTitle').textContent = titles[sectionName];
    renderAll();
}

// Render Functions
function renderAll() {
    renderDashboard();
    renderCasinos();
    renderCartas();
    renderPagos();
    updateFilters();
    renderCasinosGrid();
    renderChat();
    renderOnlineUsers();
}

function renderCasinosGrid() {
    const grid = document.getElementById('casinosGrid');
    
    if (casinosPopulares.length === 0) {
        grid.innerHTML = '<p style="text-align: center; padding: 40px;">Cargando casinos...</p>';
        return;
    }

    grid.innerHTML = casinosPopulares.map((casino, index) => `
        <div class="casino-card-pro" onclick="showAMOEInfo(${index})">
            <div class="casino-card-image" style="background: ${casinoColors[index % casinoColors.length]};">
                <div class="casino-logo">${casino.emoji}</div>
            </div>
            <div class="casino-card-body">
                <div class="casino-badge">AMOE Verificado ✓</div>
                <h3 class="casino-name">${casino.nombre}</h3>
                <div class="casino-stats">
                    <div class="casino-stat">
                        <div class="casino-stat-label">Valor SC</div>
                        <div class="casino-stat-value">${formatMoney(casino.precioPorCarta)}</div>
                    </div>
                    <div class="casino-stat">
                        <div class="casino-stat-label">Tiempo</div>
                        <div class="casino-stat-value" style="font-size: 12px;">${casino.tiempoRespuesta}</div>
                    </div>
                </div>
                <p class="casino-description">${casino.notas}</p>
                <button class="casino-cta">
                    Ver Instrucciones AMOE
                    <span>→</span>
                </button>
            </div>
        </div>
    `).join('');
}

// Show AMOE Info Modal
function showAMOEInfo(index) {
    const casino = casinosPopulares[index];
    
    document.getElementById('amoeModalTitle').textContent = `${casino.emoji} ${casino.nombre} - Guía AMOE Completa`;
    
    const modalBody = document.getElementById('amoeModalBody');
    modalBody.innerHTML = `
        <div class="info-grid-amoe">
            <div class="info-item-amoe">
                <div class="info-label-amoe">Valor por Carta</div>
                <div class="info-value-amoe">${formatMoney(casino.precioPorCarta)} SC</div>
            </div>
            <div class="info-item-amoe">
                <div class="info-label-amoe">Tiempo de Respuesta</div>
                <div class="info-value-amoe">${casino.tiempoRespuesta}</div>
            </div>
            <div class="info-item-amoe">
                <div class="info-label-amoe">Límite de Entradas</div>
                <div class="info-value-amoe">${casino.limiteEntradas}</div>
            </div>
        </div>

        <div class="highlight-box">
            <div class="highlight-title">
                ⚠️ Instrucciones Especiales
            </div>
            <div class="highlight-text">
                ${casino.instrucciones}
            </div>
        </div>

        <div class="amoe-section">
            <h3 class="amoe-section-title">
                <div class="amoe-icon">📮</div>
                Dirección Postal
            </h3>
            <div class="amoe-content">
                <strong>${casino.pobox}</strong><br>
                ${casino.poboxCiudad}, ${casino.poboxEstado} ${casino.poboxZip}<br><br>
                <strong>Email:</strong> ${casino.email}<br>
                <strong>Website:</strong> <a href="${casino.website}" target="_blank" class="link">${casino.website}</a>
            </div>
        </div>

        <div class="amoe-section">
            <h3 class="amoe-section-title">
                <div class="amoe-icon">📝</div>
                Requisitos de la Carta
            </h3>
            <div class="amoe-content">
                <ul style="padding-left: 20px; line-height: 1.8;">
                    ${casino.requisitos.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="amoe-section">
            <h3 class="amoe-section-title">
                <div class="amoe-icon">📋</div>
                Especificaciones Técnicas
            </h3>
            <div class="amoe-content">
                <strong>Tamaño de Postal:</strong> ${casino.tamañoPostal}<br>
                <strong>Tipo de Sobre:</strong> ${casino.sobre}<br>
                <strong>Color de Tinta:</strong> ${casino.tinta}<br>
                <strong>Cartas por Sobre:</strong> ${casino.cartasPorSobre}<br>
                <strong>Código Requerido:</strong> ${casino.codigoRequerido ? 'Sí (generar en sitio web)' : 'No'}
            </div>
        </div>

        <div class="amoe-section">
            <h3 class="amoe-section-title">
                <div class="amoe-icon">✅</div>
                Pasos para Enviar tu Carta
            </h3>
            <div class="amoe-step">
                <div class="step-number">1</div>
                <div class="step-content">
                    <div class="step-title">Registra tu Cuenta</div>
                    <div class="step-description">Crea una cuenta gratuita en ${casino.website}. ${casino.codigoRequerido ? 'Genera tu código postal único desde tu cuenta.' : ''}</div>
                </div>
            </div>
            <div class="amoe-step">
                <div class="step-number">2</div>
                <div class="step-content">
                    <div class="step-title">Prepara la Postal</div>
                    <div class="step-description">Usa una postal de ${casino.tamañoPostal} blanca, sin doblar. Escribe tu solicitud con tinta ${casino.tinta} de forma clara y legible.</div>
                </div>
            </div>
            <div class="amoe-step">
                <div class="step-number">3</div>
                <div class="step-content">
                    <div class="step-title">Prepara el Sobre</div>
                    <div class="step-description">Usa un sobre ${casino.sobre}. Escribe la dirección completa del casino y tu dirección de retorno.</div>
                </div>
            </div>
            <div class="amoe-step">
                <div class="step-number">4</div>
                <div class="step-content">
                    <div class="step-title">Envía por Correo</div>
                    <div class="step-description">Coloca la estampilla y envía. Guarda un registro de la fecha de envío.</div>
                </div>
            </div>
            <div class="amoe-step">
                <div class="step-number">5</div>
                <div class="step-content">
                    <div class="step-title">Espera la Respuesta</div>
                    <div class="step-description">Los Sweeps Coins llegarán a tu cuenta en aproximadamente ${casino.tiempoRespuesta}. Revisa tu cuenta regularmente.</div>
                </div>
            </div>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid var(--border);">
            <button class="btn btn-success" onclick="importarUnCasino(${index})" style="width: 100%; font-size: 16px;">
                ➕ Agregar ${casino.nombre} a Mi Lista
            </button>
        </div>
    `;
    
    document.getElementById('modalAMOE').classList.add('active');
}

function closeAMOEModal() {
    document.getElementById('modalAMOE').classList.remove('active');
}

function importarUnCasino(index) {
    const casinoData = casinosPopulares[index];
    const existe = casinos.find(c => c.nombre === casinoData.nombre);
    
    if (existe) {
        alert('Este casino ya está en tu lista');
        return;
    }
    
    const nuevoCasino = {
        id: Date.now().toString(),
        nombre: casinoData.nombre,
        email: casinoData.email,
        website: casinoData.website,
        precioPorCarta: casinoData.precioPorCarta,
        addressType: 'pobox',
        pobox: casinoData.pobox,
        poboxCiudad: casinoData.poboxCiudad,
        poboxEstado: casinoData.poboxEstado,
        poboxZip: casinoData.poboxZip,
        notas: `${casinoData.instrucciones}\n\nRequisitos:\n${casinoData.requisitos.join('\n')}`,
        importado: true
    };
    
    casinos.push(nuevoCasino);
    saveData();
    renderAll();
    closeAMOEModal();
    alert(`✅ ${casinoData.nombre} agregado a tu lista`);
}

function importarCasinosPopulares() {
    if (confirm(`¿Importar los ${casinosPopulares.length} casinos AMOE verificados?\n\nEsto agregará casinos como Stake.us, WOW Vegas, McLuck y más.`)) {
        let agregados = 0;
        
        casinosPopulares.forEach(casinoData => {
            const existe = casinos.find(c => c.nombre === casinoData.nombre);
            if (!existe) {
                const nuevoCasino = {
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    nombre: casinoData.nombre,
                    email: casinoData.email,
                    website: casinoData.website,
                    precioPorCarta: casinoData.precioPorCarta,
                    addressType: 'pobox',
                    pobox: casinoData.pobox,
                    poboxCiudad: casinoData.poboxCiudad,
                    poboxEstado: casinoData.poboxEstado,
                    poboxZip: casinoData.poboxZip,
                    notas: `${casinoData.instrucciones}\n\nRequisitos:\n${casinoData.requisitos.join('\n')}`,
                    importado: true
                };
                casinos.push(nuevoCasino);
                agregados++;
            }
        });
        
        saveData();
        renderAll();
        alert(`✅ Se importaron ${agregados} casinos exitosamente`);
    }
}

function renderDashboard() {
    const totales = getTotales();
    
    document.getElementById('statTotalCasinos').textContent = casinos.length;
    document.getElementById('statTotalCartas').textContent = totales.totalCartas;
    document.getElementById('statTotalCobrado').textContent = formatMoney(totales.totalCobrado);
    document.getElementById('statPorCobrar').textContent = formatMoney(totales.porCobrar);

    const tbody = document.getElementById('dashboardTable');
    tbody.innerHTML = '';

    if (casinos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 40px;"><div style="font-size: 48px; margin-bottom: 20px;">🎰</div><div style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">No hay casinos en tu lista</div><div style="color: var(--text-secondary);">Importa los casinos AMOE verificados para comenzar</div></td></tr>';
        return;
    }

    casinos.forEach(casino => {
        const stats = getCasinoStats(casino.id);
        const row = tbody.insertRow();
        row.innerHTML = `
            <td><strong>${casino.nombre}</strong></td>
            <td>${stats.totalCartas}</td>
            <td><span class="badge badge-success">${stats.cartasPagadas}</span></td>
            <td><span class="badge badge-warning">${stats.cartasPendientes}</span></td>
            <td>${formatMoney(stats.precioPorCarta)}</td>
            <td class="text-success">${formatMoney(stats.totalCobrado)}</td>
            <td class="text-danger">${formatMoney(stats.porCobrar)}</td>
            <td>${formatDate(stats.ultimoPago)}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="deleteCasino('${casino.id}')">
                    🗑️
                </button>
            </td>
        `;
    });
}

function renderCasinos() {
    const tbody = document.getElementById('casinosTable');
    tbody.innerHTML = '';

    casinos.forEach(casino => {
        const stats = getCasinoStats(casino.id);
        const address = `${casino.pobox}, ${casino.poboxCiudad}, ${casino.poboxEstado} ${casino.poboxZip}`;
            
        const row = tbody.insertRow();
        row.innerHTML = `
            <td><strong>${casino.nombre}</strong></td>
            <td>
                ${casino.email ? `📧 ${casino.email}<br>` : ''}
                ${casino.website ? `<a href="${casino.website}" target="_blank" class="link">🌐 Sitio Web</a>` : ''}
            </td>
            <td class="text-muted">${address}</td>
            <td>${formatMoney(casino.precioPorCarta)}</td>
            <td>
                <span class="badge ${stats.porCobrar > 0 ? 'badge-warning' : 'badge-success'}">
                    ${stats.porCobrar > 0 ? 'Pendiente' : 'Al día'}
                </span>
            </td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteCasino('${casino.id}')">🗑️</button>
            </td>
        `;
    });
}

function renderCartas() {
    const tbody = document.getElementById('cartasTable');
    tbody.innerHTML = '';

    const filterCasino = document.getElementById('filterCasino').value;

    let filtered = cartas.filter(c => {
        if (filterCasino && c.casinoId !== filterCasino) return false;
        return true;
    });

    filtered.forEach(carta => {
        const casino = casinos.find(c => c.id === carta.casinoId);
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${casino ? casino.nombre : '-'}</td>
            <td>AMOE Letter</td>
            <td>${formatDate(carta.fecha)}</td>
            <td>${formatMoney(carta.precio)}</td>
            <td>
                <span class="badge ${carta.estado === 'Pagada' ? 'badge-success' : 'badge-warning'}">
                    ${carta.estado}
                </span>
            </td>
            <td class="text-muted">${carta.notas || '-'}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteCarta('${carta.id}')">🗑️</button>
            </td>
        `;
    });
}

function renderPagos() {
    const tbody = document.getElementById('pagosTable');
    tbody.innerHTML = '';

    pagos.forEach(pago => {
        const casino = casinos.find(c => c.id === pago.casinoId);
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${casino ? casino.nombre : '-'}</td>
            <td>${formatDate(pago.fechaPago)}</td>
            <td class="text-success">${formatMoney(pago.monto)}</td>
            <td>${pago.cartasPagadas || '-'}</td>
            <td>${pago.metodo}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deletePago('${pago.id}')">🗑️</button>
            </td>
        `;
    });
}

function updateFilters() {
    const filterCasino = document.getElementById('filterCasino');
    const cartaCasino = document.getElementById('cartaCasino');
    const pagoCasino = document.getElementById('pagoCasino');

    const options = casinos.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
    
    filterCasino.innerHTML = '<option value="">Todos</option>' + options;
    cartaCasino.innerHTML = '<option value="">Seleccionar</option>' + options;
    pagoCasino.innerHTML = '<option value="">Seleccionar</option>' + options;
}

// CRUD
function openCasinoModal() {
    document.getElementById('modalCasino').classList.add('active');
}

function closeCasinoModal() {
    document.getElementById('modalCasino').classList.remove('active');
    document.getElementById('casinoForm').reset();
}

document.getElementById('casinoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const casino = {
        id: Date.now().toString(),
        nombre: document.getElementById('casinoNombre').value,
        email: document.getElementById('casinoEmail').value,
        website: document.getElementById('casinoWebsite').value,
        precioPorCarta: parseFloat(document.getElementById('casinoPrecio').value),
        addressType: 'pobox',
        pobox: document.getElementById('casinoPobox').value,
        poboxCiudad: document.getElementById('casinoPoboxCiudad').value,
        poboxEstado: document.getElementById('casinoPoboxEstado').value,
        notas: document.getElementById('casinoNotas').value
    };

    casinos.push(casino);
    saveData();
    closeCasinoModal();
    renderAll();
});

function deleteCasino(id) {
    if (confirm('¿Eliminar casino?')) {
        casinos = casinos.filter(c => c.id !== id);
        cartas = cartas.filter(c => c.casinoId !== id);
        pagos = pagos.filter(p => p.casinoId !== id);
        saveData();
        renderAll();
    }
}

function openCartaModal() {
    document.getElementById('modalCarta').classList.add('active');
    document.getElementById('cartaFecha').value = new Date().toISOString().split('T')[0];
}

function closeCartaModal() {
    document.getElementById('modalCarta').classList.remove('active');
    document.getElementById('cartaForm').reset();
}

function updateCartaPrecio() {
    const casinoId = document.getElementById('cartaCasino').value;
    if (casinoId) {
        const casino = casinos.find(c => c.id === casinoId);
        document.getElementById('cartaPrecio').value = casino.precioPorCarta;
    }
}

document.getElementById('cartaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const carta = {
        id: Date.now().toString(),
        casinoId: document.getElementById('cartaCasino').value,
        tipoCarta: 'AMOE Letter',
        fecha: document.getElementById('cartaFecha').value,
        precio: parseFloat(document.getElementById('cartaPrecio').value),
        estado: 'Pendiente',
        notas: document.getElementById('cartaNotas').value
    };

    cartas.push(carta);
    saveData();
    closeCartaModal();
    renderAll();
});

function deleteCarta(id) {
    if (confirm('¿Eliminar?')) {
        cartas = cartas.filter(c => c.id !== id);
        saveData();
        renderAll();
    }
}

function openPagoModal() {
    document.getElementById('modalPago').classList.add('active');
    document.getElementById('pagoFecha').value = new Date().toISOString().split('T')[0];
}

function closePagoModal() {
    document.getElementById('modalPago').classList.remove('active');
    document.getElementById('pagoForm').reset();
}

document.getElementById('pagoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const pago = {
        id: Date.now().toString(),
        casinoId: document.getElementById('pagoCasino').value,
        fechaPago: document.getElementById('pagoFecha').value,
        monto: parseFloat(document.getElementById('pagoMonto').value),
        cartasPagadas: 1,
        metodo: document.getElementById('pagoMetodo').value
    };

    pagos.push(pago);
    
    // Mark oldest pending carta as paid
    const cartaPendiente = cartas.find(c => c.casinoId === pago.casinoId && c.estado === 'Pendiente');
    if (cartaPendiente) cartaPendiente.estado = 'Pagada';
    
    saveData();
    closePagoModal();
    renderAll();
});

function deletePago(id) {
    if (confirm('¿Eliminar?')) {
        pagos = pagos.filter(p => p.id !== id);
        saveData();
        renderAll();
    }
}

// ===== COMMUNITY CHAT FUNCTIONS =====
function renderChat() {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    container.innerHTML = messages.map(msg => `
        <div class="chat-message ${msg.userId === currentUser.id ? 'own' : ''}">
            <div class="chat-avatar">${msg.userName.charAt(0).toUpperCase()}</div>
            <div class="chat-bubble">
                <div class="chat-author">${msg.userName}</div>
                <div class="chat-text">${escapeHtml(msg.text)}</div>
                <div class="chat-time">${formatTime(msg.timestamp)}</div>
            </div>
        </div>
    `).join('');
    
    container.scrollTop = container.scrollHeight;
    updateChatStats();
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    
    const text = input.value.trim();
    
    if (!text) return;
    
    const message = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name,
        text: text,
        timestamp: new Date().toISOString()
    };
    
    messages.push(message);
    localStorage.setItem('ct_messages', JSON.stringify(messages));
    input.value = '';
    renderChat();
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Ahora mismo';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h';
    
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
}

function renderOnlineUsers() {
    const container = document.getElementById('userList');
    if (!container) return;
    
    // Simular usuarios conectados
    const onlineUsers = users.filter(u => Math.random() > 0.3).slice(0, 8);
    
    // Siempre incluir al usuario actual
    if (currentUser && !onlineUsers.find(u => u.id === currentUser.id)) {
        onlineUsers.unshift(currentUser);
    }
    
    container.innerHTML = onlineUsers.map(user => {
        const isCurrentUser = user.id === currentUser.id;
        return `
            <div class="user-item" style="${isCurrentUser ? 'background: var(--light);' : ''}">
                <div class="user-status"></div>
                <div class="user-name">${user.name}${isCurrentUser ? ' (Tú)' : ''}</div>
                <div style="margin-left: auto; font-size: 12px; color: var(--text-secondary);">
                    ${Math.floor(Math.random() * 60)}m
                </div>
            </div>
        `;
    }).join('');
    
    const onlineCount = onlineUsers.length;
    const countElement = document.getElementById('onlineCount');
    const countSidebarElement = document.getElementById('onlineCountSidebar');
    if (countElement) countElement.textContent = onlineCount;
    if (countSidebarElement) countSidebarElement.textContent = onlineCount;
}

function updateChatStats() {
    const totalMessagesElement = document.getElementById('totalMessages');
    const totalUsersElement = document.getElementById('totalUsers');
    const totalLettersElement = document.getElementById('totalLetters');
    
    if (totalMessagesElement) totalMessagesElement.textContent = messages.length;
    if (totalUsersElement) totalUsersElement.textContent = users.length;
    if (totalLettersElement) {
        // Sumar todas las cartas de todos los usuarios
        let total = cartas.length;
        totalLettersElement.textContent = total;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Setup authentication listeners
    setupAuthListeners();
    
    // Setup chat input listener
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Setup theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle && currentTheme === 'dark') {
        themeToggle.textContent = '☀️';
    }
    
    // Check if user is logged in
    const savedUser = localStorage.getItem('ct_currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        loadUserData();
        showApp();
    } else {
        showLogin();
    }
});
