var App = function() {
    var MediaSize = {
        xl: 1200,
        lg: 992,
        md: 991,
        sm: 576
    };

    var Dom = {
        main: document.querySelector('html, body'),
        id: {
            container: document.querySelector("#container"),
        },
        class: {
            navbar: document.querySelector(".navbar"),
            overlay: document.querySelector('.overlay'),
            search: document.querySelector('.toggle-search'),
            searchOverlay: document.querySelector('.search-overlay'),
            searchForm: document.querySelector('.search-form-control'),
            mainContainer: document.querySelector('.main-container'),
            mainHeader: document.querySelector('.header.navbar')
        }
    };

    var categoryScroll = {
        scrollCat: function() {
            var sidebarWrapper = document.querySelector('.sidebar-wrapper li.active');
            if (sidebarWrapper) {
                var sidebarWrapperTop = sidebarWrapper.offsetTop - 12;
                setTimeout(function() {
                    var scroll = document.querySelector('.menu-categories');
                    if (scroll) {
                        scroll.scrollTop = sidebarWrapperTop;
                    }
                }, 50);
            }
        }
    };

    var toggleFunction = {
        sidebar: function($recentSubmenu) {
            var sidebarCollapseEle = document.querySelectorAll('.sidebarCollapse');
            sidebarCollapseEle.forEach(function(el) {
                el.addEventListener('click', function(sidebar) {
                    sidebar.preventDefault();
                    var getSidebar = document.querySelector('.sidebar-wrapper');

                    if ($recentSubmenu === true) {
                        var submenu = document.querySelector('.collapse.submenu.show');
                        if (submenu) {
                            submenu.classList.add('mini-recent-submenu');
                            submenu.classList.remove('show');
                            submenu.parentNode.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
                        } else if (Dom.class.mainContainer.classList.contains('sidebar-closed')) {
                            var recentSubmenu = document.querySelector('.collapse.submenu.recent-submenu');
                            if (recentSubmenu) {
                                recentSubmenu.classList.add('show');
                                recentSubmenu.parentNode.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
                                recentSubmenu.classList.remove('mini-recent-submenu');
                            } else {
                                var activeSubmenu = document.querySelector('li.active .submenu');
                                if (activeSubmenu) {
                                    activeSubmenu.classList.add('recent-submenu');
                                    activeSubmenu.classList.add('show');
                                    activeSubmenu.parentNode.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
                                }
                            }
                        }
                    }

                    Dom.class.mainContainer.classList.toggle("sidebar-closed");
                    Dom.class.mainHeader.classList.toggle('expand-header');
                    Dom.class.mainContainer.classList.toggle("sbar-open");
                    Dom.class.overlay.classList.toggle('show');
                    Dom.main.classList.toggle('sidebar-noneoverflow');
                });
            });
        },
        onToggleSidebarSubmenu: function() {
            var sidebarWrapper = document.querySelector('.sidebar-wrapper');
            if (sidebarWrapper) {
                ['mouseenter', 'mouseleave'].forEach(function(e) {
                    sidebarWrapper.addEventListener(e, function() {
                        if (document.querySelector('body').classList.contains('alt-menu')) {
                            if (Dom.class.mainContainer.classList.contains('sidebar-closed')) {
                                if (e === 'mouseenter') {
                                    var activeMenu = document.querySelector('li.menu.active .submenu');
                                    if (activeMenu) {
                                        activeMenu.classList.add('recent-submenu');
                                        activeMenu.classList.add('show');
                                        activeMenu.parentNode.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
                                    }
                                } else if (e === 'mouseleave') {
                                    var menus = document.querySelectorAll('li.menu');
                                    menus.forEach(function(menu) {
                                        var submenu = menu.querySelector('.collapse.submenu.show');
                                        if (submenu) {
                                            submenu.classList.remove('show');
                                        }
                                        var expandedToggle = menu.querySelector('.dropdown-toggle[aria-expanded="true"]');
                                        if (expandedToggle) {
                                            expandedToggle.setAttribute('aria-expanded', 'false');
                                        }
                                    });
                                }
                            }
                        }
                    });
                });
            }
        },
        overlay: function() {
            var dismissElements = document.querySelectorAll('#dismiss, .overlay');
            dismissElements.forEach(function(el) {
                el.addEventListener('click', function() {
                    Dom.class.mainContainer.classList.add('sidebar-closed');
                    Dom.class.mainContainer.classList.remove('sbar-open');
                    Dom.class.overlay.classList.remove('show');
                    Dom.main.classList.remove('sidebar-noneoverflow');
                });
            });
        },
        search: function() {
            if (Dom.class.search) {
                Dom.class.search.addEventListener('click', function() {
                    Dom.class.search.classList.add('show-search');
                    Dom.class.searchOverlay.classList.add('show');
                    document.querySelector('body').classList.add('search-active');
                });

                Dom.class.searchOverlay.addEventListener('click', function() {
                    Dom.class.searchOverlay.classList.remove('show');
                    Dom.class.search.classList.remove('show-search');
                    document.querySelector('body').classList.remove('search-active');
                });

                var searchClose = document.querySelector('.search-close');
                if (searchClose) {
                    searchClose.addEventListener('click', function(event) {
                        event.stopPropagation();
                        Dom.class.searchOverlay.classList.remove('show');
                        Dom.class.search.classList.remove('show-search');
                        document.querySelector('body').classList.remove('search-active');
                        Dom.class.searchForm.value = '';
                    });
                }
            }
        },
        themeToggle: function() {
            var togglethemeEl = document.querySelector('.theme-toggle');
            var getBodyEl = document.body;

            if (togglethemeEl) {
                togglethemeEl.addEventListener('click', function() {
                    var getLocalStorage = localStorage.getItem("theme");
                    var parseObj = JSON.parse(getLocalStorage);

                    var darkMode = parseObj.settings.layout.darkMode;
                    var newMode = !darkMode;

                    parseObj.settings.layout.darkMode = newMode;
                    localStorage.setItem("theme", JSON.stringify(parseObj));

                    if (newMode) {
                        getBodyEl.classList.add('dark');
                        document.querySelector('.navbar-logo').setAttribute('src', parseObj.settings.layout.logo.darkLogo);
                    } else {
                        getBodyEl.classList.remove('dark');
                        document.querySelector('.navbar-logo').setAttribute('src', parseObj.settings.layout.logo.lightLogo);
                    }
                });
            }
        }
    };

    var _mobileResolution = {
        onRefresh: function() {
            var windowWidth = window.innerWidth;
            if (windowWidth <= MediaSize.md) {
                categoryScroll.scrollCat();
                toggleFunction.sidebar();
            }
        },
        onResize: function() {
            window.addEventListener('resize', function(event) {
                event.preventDefault();
                var windowWidth = window.innerWidth;
                if (windowWidth <= MediaSize.md) {
                    toggleFunction.offToggleSidebarSubmenu();
                }
            });
        }
    };

    var _desktopResolution = {
        onRefresh: function() {
            var windowWidth = window.innerWidth;
            if (windowWidth > MediaSize.md) {
                // Additional desktop refresh functionalities can be added here.
            }
        }
    };

    return {
        init: function() {
            toggleFunction.sidebar();
            toggleFunction.onToggleSidebarSubmenu();
            toggleFunction.search();
            toggleFunction.overlay();
            toggleFunction.themeToggle();
            _mobileResolution.onRefresh();
            _desktopResolution.onRefresh();
            _mobileResolution.onResize();
        }
    };
}();

document.addEventListener("DOMContentLoaded", function() {
    App.init();
});
