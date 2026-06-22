/**
 * SmartAdmin-inspired sidebar toggle behavior for Blazor WMS
 */

(function () {
    'use strict';

    // ── Desktop sidebar toggle ──────────────────────────────────────────────
    window.toggleSidebarDesktop = function () {
        document.body.classList.toggle('sidebar-collapsed');
    };

    // ── Mobile sidebar toggle ───────────────────────────────────────────────
    window.toggleSidebarMobile = function () {
        var sidebar = document.getElementById('page-sidebar');
        var overlay = document.getElementById('sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'sidebar-overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', closeMobileSidebar);
        }
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
    };

    function closeMobileSidebar() {
        var sidebar = document.getElementById('page-sidebar');
        var overlay = document.getElementById('sidebar-overlay');
        sidebar.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('active');
    }

    // ── Sub-menu accordion ──────────────────────────────────────────────────
    window.toggleSubMenu = function (anchor) {
        var li = anchor.parentElement;
        var subMenu = li.querySelector('.nav-sub-menu');
        if (!subMenu) return;

        var isOpen = li.classList.contains('open');

        // Collapse all siblings
        var siblings = li.parentElement.querySelectorAll('li.open');
        siblings.forEach(function (sib) {
            if (sib !== li) {
                sib.classList.remove('open');
                var sm = sib.querySelector('.nav-sub-menu');
                if (sm) sm.classList.remove('show');
            }
        });

        // Toggle this item
        if (isOpen) {
            li.classList.remove('open');
            subMenu.classList.remove('show');
        } else {
            li.classList.add('open');
            subMenu.classList.add('show');
        }
    };

    // ── Close mobile sidebar on route change (Blazor navigation) ───────────
    document.addEventListener('blazor:navigated', function () {
        var sidebar = document.getElementById('page-sidebar');
        var overlay = document.getElementById('sidebar-overlay');
        if (sidebar) sidebar.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('active');
    });

})();
