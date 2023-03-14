var slider = document.getElementById('main-sidebar');
function detectWidth() {
    return (
        window.screen.width ||
        window.innerWidth ||
        window.document.documentElement.clientWidth ||
        Math.min(
            window.innerWidth,
            window.document.documentElement.clientWidth
        ) ||
        window.innerWidth ||
        window.document.documentElement.clientWidth ||
        window.document.getElementsByTagName('body')[0].clientWidth
    );
}
// addevent toggle mobile
if (detectWidth() < 769) {
    customFuncs.addMultipleEventListener(slider, 'touchstart touchend', (e) => {
        //	e.target.closest(".sidebar__nav__link").classList.toggle("hover");
        slider.classList.toggle('hover');
        slider
            .querySelectorAll('.sidebar__nav__link')
            .forEach((nav) => nav.classList.remove('hover'));
    });
    function removeActiveNavs() {
        slider
            .querySelectorAll('.sidebar__nav__link')
            .forEach((btn) => btn.classList.remove('hover'));
    }
    function hoverSidebarChild(e) {
        var touches = e.changedTouches[0];
        var element = document.elementFromPoint(
            touches.clientX,
            touches.clientY
        );
        if (element) {
            var navE = element.closest('.sidebar__nav__link');
            removeActiveNavs();
            if (navE) navE.classList.add('hover');
        }
    }

    slider.querySelectorAll('.sidebar__nav__link').forEach((btn) => {
        btn.addEventListener('touchmove', hoverSidebarChild);
        btn.addEventListener('touchend', (e) => {
            var link = slider.querySelector('.sidebar__nav__link.hover');
            if (link) {
                removeActiveNavs();

                link.click();
            }
        });
    });
    // document.querySelectorAll('a[href]').forEach((a) =>
    //     a.addEventListener('click', (e) => {
    //         if (e.target.closest('a').querySelector('span'))
    //             alert(e.target.closest('a').querySelector('span').textContent)
    //     })
    // )
}
