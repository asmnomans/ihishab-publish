// Stand-ins for the theme markup this build does not ship.
//
// app.js was written against the Velzon demo page and reaches for a dozen elements by id with no
// check that they are there -- a shopping cart, a language picker, a topbar search box, and the
// sidebar blocks and radios this build does not offer as a choice. The first one missing throws, and
// because it all runs inside one IIFE the rest of app.js never runs at all. That is what used to
// stop the horizontal menu bar being built on the dashboard, the only page that loads app.js.
//
// Each stand-in is only as much element as app.js asks of it: an <input> where it reads .value,
// an <img> where it sets .src, a <div> where it sets .style or .classList. They live in one
// hidden container and do nothing.
//
// customizer-layout03 is deliberately not here. app.js guards that one, and clicking it -- which
// it does when it finds it -- switches the layout to twocolumn.
(function () {
    var stand_ins = {
        'back-to-top': 'div',
        'cart-item-total': 'span',
        'sidebar-size': 'div',
        'sidebar-view': 'div',
        'sidebar-color': 'div',
        'checkout-elem': 'div',
        'empty-cart': 'div',
        'header-lang-img': 'img',
        'sidebar-size-default': 'radio',
        'sidebar-size-small-hover': 'radio',
        'search-options': 'text',
        'search-close-options': 'span',
        'search-dropdown': 'div'
    };

    // app.js builds assets/lang/<localStorage.language>.json before it has filled that key in, so
    // a browser that has never set it asks for lang/null.json and takes a 404. It only gets that
    // far now that nothing throws before it. English is what the pages are written in.
    try {
        if (!localStorage.getItem('language')) { localStorage.setItem('language', 'en'); }
    } catch (e) { /* private mode */ }

    var holder = null;

    Object.keys(stand_ins).forEach(function (id) {
        if (document.getElementById(id)) return;

        if (!holder) {
            holder = document.createElement('div');
            holder.id = 'theme-shim';
            holder.hidden = true;
            document.body.appendChild(holder);
        }

        var kind = stand_ins[id];
        var el;

        if (kind === 'radio' || kind === 'text') {
            el = document.createElement('input');
            el.type = kind === 'radio' ? 'radio' : 'text';
        } else {
            el = document.createElement(kind);
        }

        el.id = id;
        holder.appendChild(el);
    });
})();
