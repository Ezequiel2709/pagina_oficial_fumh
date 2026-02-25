// ESPERAR A QUE EL DOM ESTÉ CARGADO
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 FUMH Buenavista - Inicializando...');
    
    // ============================================
    // ELEMENTOS PRINCIPALES
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const menuGraduados = document.getElementById('menuGraduados');
    const panelGraduados = document.getElementById('panelGraduados');
    const cerrarPanel = document.getElementById('cerrarPanel');
    const overlay = document.getElementById('overlay');
    
    // ============================================
    // 1. MENÚ HAMBURGUESA (MÓVIL)
    // ============================================
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('🍔 Hamburguesa clickeada');
            dropdownMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // ============================================
    // 2. SUBMENÚ "NOSOTROS" - VERSIÓN MEJORADA
    // ============================================
    const menuItemNosotros = document.querySelector('.menu-item.has-submenu');
    
    if (menuItemNosotros) {
        const submenu = menuItemNosotros.querySelector('.submenu');
        const menuEnlace = menuItemNosotros.querySelector('.menu-enlace');
        const submenuArrow = menuItemNosotros.querySelector('.submenu-arrow');
        
        console.log('✅ Submenú Nosotros encontrado', {
            submenu: !!submenu,
            menuEnlace: !!menuEnlace,
            submenuArrow: !!submenuArrow
        });
        
        // ========= PARA PC =========
        if (window.innerWidth > 768) {
            console.log('🖥️ Configurando submenú para PC (hover)');
            
            menuItemNosotros.addEventListener('mouseenter', function() {
                if (submenu) {
                    submenu.style.opacity = '1';
                    submenu.style.visibility = 'visible';
                    submenu.style.transform = 'translateY(0)';
                }
                if (submenuArrow) {
                    submenuArrow.style.transform = 'rotate(180deg)';
                }
                menuItemNosotros.classList.add('active');
            });
            
            menuItemNosotros.addEventListener('mouseleave', function() {
                if (submenu) {
                    submenu.style.opacity = '0';
                    submenu.style.visibility = 'hidden';
                    submenu.style.transform = 'translateY(-10px)';
                }
                if (submenuArrow) {
                    submenuArrow.style.transform = 'rotate(0deg)';
                }
                menuItemNosotros.classList.remove('active');
            });
        }
        
        // ========= PARA MÓVIL =========
        if (window.innerWidth <= 768) {
            console.log('📱 Configurando submenú para móvil (touch)');
            
            // Solo configurar si tenemos los elementos necesarios
            if (menuEnlace && submenu) {
                // Hacer el enlace clickeable
                menuEnlace.style.cursor = 'pointer';
                
                // Evento para expandir/contraer submenú
                menuEnlace.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('👆 Tocado enlace Nosotros en móvil');
                    
                    // Alternar clases
                    const isExpanding = !submenu.classList.contains('expanded');
                    
                    if (isExpanding) {
                        submenu.classList.add('expanded');
                        menuItemNosotros.classList.add('active');
                        if (submenuArrow) {
                            submenuArrow.style.transform = 'rotate(180deg)';
                        }
                        console.log('⬇️ Submenú expandido');
                    } else {
                        submenu.classList.remove('expanded');
                        menuItemNosotros.classList.remove('active');
                        if (submenuArrow) {
                            submenuArrow.style.transform = 'rotate(0deg)';
                        }
                        console.log('⬆️ Submenú contraído');
                    }
                });
                
                // Cerrar submenú al tocar fuera
                document.addEventListener('click', function(event) {
                    if (!menuItemNosotros.contains(event.target)) {
                        submenu.classList.remove('expanded');
                        menuItemNosotros.classList.remove('active');
                        if (submenuArrow) {
                            submenuArrow.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Cerrar todo al tocar un enlace del submenú
                const submenuLinks = submenu.querySelectorAll('a');
                submenuLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        console.log('🔗 Enlace del submenú clickeado');
                        
                        // Cerrar menú hamburguesa
                        if (dropdownMenu) dropdownMenu.classList.remove('active');
                        if (hamburger) hamburger.classList.remove('active');
                        
                        // Cerrar submenú
                        submenu.classList.remove('expanded');
                        menuItemNosotros.classList.remove('active');
                        if (submenuArrow) {
                            submenuArrow.style.transform = 'rotate(0deg)';
                        }
                        
                        console.log('✅ Todo cerrado');
                    });
                });
            } else {
                console.log('⚠️ Elementos del submenú no encontrados para móvil');
            }
        }
        
        // ========= REAJUSTAR AL REDIMENSIONAR =========
        window.addEventListener('resize', function() {
            console.log('🔄 Redimensionando ventana:', window.innerWidth);
            
            if (window.innerWidth > 768) {
                // Para PC: limpiar clases de móvil
                if (submenu) {
                    submenu.classList.remove('expanded');
                    submenu.style.maxHeight = '';
                }
                menuItemNosotros.classList.remove('active');
                if (submenuArrow) {
                    submenuArrow.style.transform = 'rotate(0deg)';
                }
            } else {
                // Para móvil: limpiar estilos de PC
                if (submenu) {
                    submenu.style.opacity = '';
                    submenu.style.visibility = '';
                    submenu.style.transform = '';
                }
            }
        });
    } else {
        console.log('⚠️ No se encontró el elemento .menu-item.has-submenu');
        
        // Depuración: ver todos los elementos del menú
        const menuItems = document.querySelectorAll('.dropdown-menu li');
        console.log('🔍 Elementos del menú encontrados:', menuItems.length);
        menuItems.forEach((item, index) => {
            console.log(`  ${index + 1}.`, item.className, '-', item.textContent);
        });
    }
    
    // ============================================
    // 3. CERRAR MENÚ AL CLIC EN ENLACE
    // ============================================
    document.querySelectorAll('.dropdown-menu a:not(.menu-enlace)').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                console.log('🔗 Enlace del menú clickeado en móvil');
                
                dropdownMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
                
                // Si es enlace interno, hacer scroll suave
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
    
    // ============================================
    // 4. PANEL DE GRADUADOS
    // ============================================
    if (menuGraduados) {
        menuGraduados.addEventListener('click', function(e) {
            e.preventDefault();
            panelGraduados.classList.add('active');
            overlay.classList.add('active');
            dropdownMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    }
    
    if (cerrarPanel) {
        cerrarPanel.addEventListener('click', function() {
            panelGraduados.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', function() {
            panelGraduados.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    
    // ============================================
    // 5. CERRAR MENÚ AL CLIC FUERA
    // ============================================
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav')) {
            dropdownMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
    
    // ============================================
    // 6. TECLA ESC
    // ============================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdownMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            panelGraduados.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
    
    // ============================================
    // 7. SCROLL SUAVE
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#nosotros') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // 8. ANIMACIONES AL SCROLL
    // ============================================
    function initAnimacionesScroll() {
        const elementos = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
        
        function checkScroll() {
            elementos.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    el.classList.add('active');
                }
            });
        }
        
        setTimeout(checkScroll, 100);
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
    }
    
    setTimeout(initAnimacionesScroll, 500);
    
    // ============================================
    // 9. BOTONES FLOTANTES
    // ============================================
    function configurarBotonesFlotantes() {
        // WhatsApp
        const whatsappBtn = document.querySelector('.btn-red-whatsapp');
        if (whatsappBtn) {
            whatsappBtn.href = `https://wa.me/59174667906?text=${encodeURIComponent('Hola, me contacto desde FUMH Buenavista')}`;
        }
        
        // Efectos
        document.querySelectorAll('.btn-red-flotante').forEach(btn => {
            btn.addEventListener('click', function() {
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });
    }
    
    configurarBotonesFlotantes();
    
   
    setTimeout(() => {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.querySelectorAll('.reveal, .delay-1').forEach(el => {
                el.classList.add('active');
            });
        }
    }, 1000);
    

    const currentPage = window.location.pathname;
    console.log('📄 Página actual:', currentPage);
    console.log('📱 Modo actual:', window.innerWidth <= 768 ? 'Móvil' : 'PC');
    console.log('✅ Todo configurado correctamente');
    
    console.log('🔍 DEBUG - Estructura del menú:');
    const menuItems = document.querySelectorAll('.dropdown-menu > li');
    menuItems.forEach((item, index) => {
        const hasSubmenu = item.classList.contains('has-submenu');
        const text = item.textContent.trim();
        console.log(`  ${index + 1}. ${text} ${hasSubmenu ? '(con submenú)' : ''}`);
        
        if (hasSubmenu) {
            const submenu = item.querySelector('.submenu');
            const submenuItems = submenu ? submenu.querySelectorAll('li') : [];
            console.log(`     Submenú items: ${submenuItems.length}`);
            submenuItems.forEach((subItem, subIndex) => {
                console.log(`     - ${subIndex + 1}. ${subItem.textContent.trim()}`);
            });
        }
    });
});