var slider = document.getElementById('main-sidebar')

// var subMenu = slider.querySelectorAll();
customFuncs.addMultipleEventListener(slider, 'touchstart touchend', (e) => {
    //	e.target.closest(".sidebar__nav__link").classList.toggle("hover");
    slider.classList.toggle('hover')
    slider
        .querySelectorAll('.sidebar__nav__link')
        .forEach((nav) => nav.classList.remove('hover'))
})

function hoverSidebarChild(e) {
    var touches = e.changedTouches[0]
    var element = document.elementFromPoint(touches.clientX, touches.clientY)
    if (element) {
        slider
            .querySelectorAll('.sidebar__nav__link')
            .forEach((btn) => btn.classList.remove('hover'))
        var navE = element.closest('.sidebar__nav__link')
        if (navE) navE.classList.add('hover')
    }
}
slider.querySelectorAll('.sidebar__nav__link').forEach((btn) => {
    btn.addEventListener('touchmove', hoverSidebarChild)
    btn.addEventListener('touchend', (e) => {
        link = slider.querySelector('.sidebar__nav__link.hover')
        if (link) {
            link.click()
        }
        e.target.closest('.sidebar__nav__link').classList.remove('hover')
    })
})
document.querySelectorAll('a[href]').forEach((a) =>
    a.addEventListener('click', (e) => {
        if (e.target.closest('a').querySelector('span'))
            alert(e.target.closest('a').querySelector('span').textContent)
    })
)
