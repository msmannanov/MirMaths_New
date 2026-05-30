document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const subMenu = document.querySelector('.sub-menu');
    const primaryMenu = document.querySelector('.primary-menu');
    

    // 1. БУРГЕР ТУГМАСИ: Асосий менюларни очиш ва ёпиш
    if (menuToggle && subMenu && primaryMenu) {
        menuToggle.addEventListener('click', function() {
            subMenu.classList.toggle('active');
            primaryMenu.classList.toggle('active');
            
            if (subMenu.classList.contains('active')) {
                menuToggle.innerHTML = '&#10005;'; // Крестик (✕)
                
                // Биринчи меню баландлигини ҳисоблаб, иккинчисини тагига жойлаштириш
                setTimeout(() => {
                    const height = subMenu.offsetHeight;
                    document.documentElement.style.setProperty('--sub-menu-height', height + 'px');
                }, 50);
            } else {
                menuToggle.innerHTML = '&#9776;'; // Бургер (☰)
            }
        });
    }

    // 2. ИЧКИ МЕНЮЛАР (Dropdown ва Мега-меню)НИ БОСГАНДА ОЧИШ ВА ЁПИШ
    const dropdowns = document.querySelectorAll('.dropdown, .dropdown-mega');

    dropdowns.forEach(function(dropdown) {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu, .mega-menu');

        if (link && menu) {
            link.addEventListener('click', function(e) {
                // Фақат мобил телефон экранида (768px ва ундан кичик) ишлайди
                if (window.innerWidth <= 768) {
                    e.preventDefault(); // Линка бўйича саҳифага ўтиб кетмаслик
                    
                    // Агар босилган меню аллақачон очиқ бўлса — уни ЁПАДИ
                    if (menu.classList.contains('open')) {
                        menu.classList.remove('open');
                    } 
                    // Агар ёпиқ бўлса — бошқаларни ёпиб, буни ОЧАДИ
                    else {
                        dropdowns.forEach(function(other) {
                            const otherMenu = other.querySelector('.dropdown-menu, .mega-menu');
                            if (otherMenu) otherMenu.classList.remove('open');
                        });
                        menu.classList.add('open');
                    }

                    // Меню очилиб/ёпилганда баландликни қайта ҳисоблаш (бўлиниб кетмаслиги учун)
                    setTimeout(() => {
                        const height = subMenu.offsetHeight;
                        document.documentElement.style.setProperty('--sub-menu-height', height + 'px');
                    }, 50);
                }
            });
        }
    });
});
