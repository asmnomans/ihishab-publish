const placeholder = { value: '', label: 'Select . . ', placeholder: true };

const month_list = {
    "january": 1,
    "february": 2,
    "march": 3,
    "april": 4,
    "may": 5,
    "june": 6,
    "july": 7,
    "august": 8,
    "september": 9,
    "october": 10,
    "november": 11,
    "december": 12,
    "jan": 1,
    "feb": 2,
    "mar": 3,
    "apr": 4,
    "may": 5,
    "jun": 6,
    "jul": 7,
    "aug": 8,
    "sep": 9,
    "oct": 10,
    "nov": 11,
    "dec": 12,
}

            //axios.interceptors.request.use(
//    function (successfulReq) {
//        console.log("Start axios");
//    },
//    function (error) {
//        console.log("Error axios");
//    }
//);
//axios.interceptors.request.use(function (config) {
//    console.log("Start axios");
//    return config
//}, function (error) {
//    return Promise.reject(error);
//});

//axios.interceptors.response.use(function (response) {
//    console.log("End axios");
//    return response;
//}, function (error) {
//    return Promise.reject(error);
//});

//axios.interceptors.request.use(req => {
//    // `req` is the Axios request config, so you can modify
//    // the `headers`.
//    debugger;
//    console.log("Start axios");
//    return req;
//});

function change_company(value) {
    //console.log('customerid => ', event.target.value);
    let _data = new FormData();
    _data.append('id', value);

    //show_loader();
    axios.post('/company/updatedefaultcompany', _data)
    .then(function (response) {
        console.log(response.data);
        //choice_list['ParentId'].setChoices(response.data);
    })
    .catch(function (error) {
        //document.getElementById('ShippingAddress').value = '';

        console.log(error);
    })
    .finally(() => {
        // settled (fulfilled or rejected)
        //choice_list['ParentId'].removeActiveItems();
        location.reload();
    });
};

function show_loader() {
    Swal.fire({
        title: "",
        width: 200,
        html: "Please wait...",
        timerProgressBar: !0,
        showCloseButton: !1,
        didOpen: function () {
            Swal.showLoading()
        }
    });
};

function hide_loader() {
    Swal.close();
}

var choice_list = {};

var userSelection = Object.values(document.getElementsByClassName('only-number'));
userSelection.forEach(link => {
    ValueWrapper(link);
    link.addEventListener('blur', event => {
        ValueWrapper(link);
    });
    link.addEventListener('keypress', (event) => {
        if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
});

userSelection = Object.values(document.getElementsByClassName('only-currency'));
userSelection.forEach(link => {
    ValueWrapper(link, 2);
    link.addEventListener('blur', event => {
        ValueWrapper(link, 2);
    });
    link.addEventListener('keypress', (event) => {
        if (event.which != 46 && event.which != 8 &&
            event.which != 0 && (event.which < 48 || event.which > 57))
        {
            event.preventDefault();
        }
    });
});

userSelection = Object.values(document.getElementsByClassName('only-price'));
userSelection.forEach(link => {
    ValueWrapper(link, 6);
    link.addEventListener('blur', event => {
        ValueWrapper(link, 6);
    });
    link.addEventListener('keypress', (event) => {
        if (event.which != 46 && event.which != 8 &&
            event.which != 0 && (event.which < 48 || event.which > 57))
        {
            event.preventDefault();
        }
    });
});

function ValueWrapper(element, decimalcount = 0) {
    if (isNaN(parseFloat(element.value.replace(/\,/g, '')))) {
        element.value = "0.00";
        //$(this).val("0.00");
    }
    else {
        let num = new Number(element.value.replace(/\,/g, ''));
        if (decimalcount > 2) {
            let value = num.toFixed(decimalcount).replace(/\B(?=(\d{3})+(?!\d))/g, ",").split('.');
            element.value = value[0] + '.' + value[1].replace(/\,/g, '');
        } else {
            element.value = num.toFixed(decimalcount).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}

userSelection = Object.values(document.getElementsByClassName('only-datetime'));
userSelection.forEach(link => {
    var dateData = {};
    var isFlatpickerVal = link.attributes;
    if (isFlatpickerVal["data-date-format"]) {
        dateData.dateFormat =
            isFlatpickerVal["data-date-format"].value.toString();
    }
    if (isFlatpickerVal["data-enable-time"]) {
        (dateData.enableTime = true),
            (dateData.dateFormat =
                isFlatpickerVal["data-date-format"].value.toString() + " H:i");
    }
    if (isFlatpickerVal["data-altFormat"]) {
        (dateData.altInput = true),
            (dateData.altFormat =
                isFlatpickerVal["data-altFormat"].value.toString());
    }
    if (isFlatpickerVal["data-minDate"]) {
        dateData.minDate = isFlatpickerVal["data-minDate"].value.toString();
        dateData.dateFormat =
            isFlatpickerVal["data-date-format"].value.toString();
    }
    if (isFlatpickerVal["data-maxDate"]) {
        dateData.maxDate = isFlatpickerVal["data-maxDate"].value.toString();
        dateData.dateFormat =
            isFlatpickerVal["data-date-format"].value.toString();
    }
    if (isFlatpickerVal["data-deafult-date"]) {
        dateData.defaultDate =
            isFlatpickerVal["data-deafult-date"].value.toString();
        dateData.dateFormat =
            isFlatpickerVal["data-date-format"].value.toString();
    }
    if (isFlatpickerVal["data-multiple-date"]) {
        dateData.mode = "multiple";
        dateData.dateFormat =
            isFlatpickerVal["data-date-format"].value.toString();
    }
    if (isFlatpickerVal["data-range-date"]) {
        dateData.mode = "range";
        dateData.dateFormat =
            isFlatpickerVal["data-date-format"].value.toString();
    }
    if (isFlatpickerVal["data-inline-date"]) {
        (dateData.inline = true),
            (dateData.defaultDate =
                isFlatpickerVal["data-deafult-date"].value.toString());
        dateData.dateFormat =
            isFlatpickerVal["data-date-format"].value.toString();
    }
    if (isFlatpickerVal["data-disable-date"]) {
        var dates = [];
        dates.push(isFlatpickerVal["data-disable-date"].value);
        dateData.disable = dates.toString().split(",");
    }
    if (isFlatpickerVal["class"] && isFlatpickerVal["class"].value.toString().includes("no-openClick")) {
        dateData.clickOpens = false;
    }
    flatpickr(link, dateData);
});

function make_choice(selector) {
    userSelection = Object.values(document.querySelectorAll(selector));
    userSelection.forEach(item => {
        var choiceData = {};
        var isChoicesVal = item.attributes;
        choiceData.shouldSort = false;
        if (isChoicesVal["data-choices-groups"]) {
            choiceData.placeholderValue = "This is a placeholder set in the config";
        }
        if (isChoicesVal["data-choices-search-false"]) {
            choiceData.searchEnabled = false;
        }
        //if (isChoicesVal["data-choices-search-true"]) {
        else {
            choiceData.searchEnabled = true;
        }
        if (isChoicesVal["data-choices-removeItem"]) {
            choiceData.removeItemButton = true;
        }
        if (isChoicesVal["data-choices-sorting-false"]) {
            choiceData.shouldSort = false;
        }
        if (isChoicesVal["data-choices-sorting-true"]) {
            choiceData.shouldSort = false;
        }
        if (isChoicesVal["data-choices-multiple-default"]) {
            // choiceData.removeItemButton=true
        }
        if (isChoicesVal["data-choices-multiple-groups"]) {
            // choiceData.removeItemButton=true
        }
        if (isChoicesVal["data-choices-multiple-remove"]) {
            choiceData.removeItemButton = true;
        }
        if (isChoicesVal["data-choices-limit"]) {
            choiceData.maxItemCount =
                isChoicesVal["data-choices-limit"].value.toString();
        }
        if (isChoicesVal["data-choices-limit"]) {
            choiceData.maxItemCount =
                isChoicesVal["data-choices-limit"].value.toString();
        }
        if (isChoicesVal["data-choices-editItem-true"]) {
            choiceData.maxItemCount = true;
        }
        if (isChoicesVal["data-choices-editItem-false"]) {
            choiceData.maxItemCount = false;
        }
        if (isChoicesVal["data-choices-text-unique-true"]) {
            choiceData.duplicateItemsAllowed = false;
        }
        if (isChoicesVal["data-choices-text-disabled-true"]) {
            choiceData.addItems = false;
        }
        choiceData.searchResultLimit = 1000;
        choiceData.fuseOptions = {
            threshold: 0.1,
            distance: 1000
        };
        choiceData.searchFields = ['label'];

        choice_list[item.getAttribute('id')] = isChoicesVal["data-choices-text-disabled-true"]
            ? new Choices(item, choiceData).disable()
            : new Choices(item, choiceData);

        // A select with no id cannot be found again here. That used to throw, and because this
        // runs at the top level of the file, the exception aborted everything after it —
        // including the listeners registered at the end. Skip the reposition instead.
        let element = document.getElementById(item.getAttribute('id'));
        if (element) {
            let parent_element = element.parentElement.parentElement.parentElement;
            let fragment = document.createDocumentFragment();
            fragment.appendChild(element);
            parent_element.prepend(fragment);
        }
    });
}

make_choice('.form-select');

userSelection = Object.values(document.getElementsByClassName('text-danger'));
userSelection.forEach(link => {
    if (link.closest('div').querySelectorAll('[data-val-required]').length > 0) {
        link.innerHTML = link.closest('div').querySelectorAll('[data-val-required]')[0].getAttribute('data-val-required');
    }
});

function pre_save() {
    userSelection = Object.values(document.getElementsByClassName('only-price'));
    userSelection.forEach(item => {
        item.value = item.value.replace(/\,/g, '');
    });

    userSelection = Object.values(document.getElementsByClassName('only-currency'));
    userSelection.forEach(item => {
        item.value = item.value.replace(/\,/g, '');
    });

    userSelection = Object.values(document.getElementsByClassName('only-number'));
    userSelection.forEach(item => {
        item.value = item.value.replace(/\,/g, '');
    });

    userSelection = Object.values(document.querySelectorAll('input'));
    userSelection.forEach(item => {
        if (item.getAttribute('name') != '__RequestVerificationToken' && !item.classList.contains('ccnormal')
            && !item.classList.contains('only-number') && !item.classList.contains('only-price') && !item.classList.contains('only-currency')
            && !item.classList.contains('date') && item.getAttribute('type') != 'file') {

            item.value = item.value.toUpperCase();
        }
    });

    userSelection = Object.values(document.querySelectorAll('textarea'));
    userSelection.forEach(item => {
        if (item.getAttribute('name') != '__RequestVerificationToken' && !item.classList.contains('ccnormal')
            && !item.classList.contains('only-number') && !item.classList.contains('only-price') && !item.classList.contains('only-currency')
            && !item.classList.contains('date') && item.getAttribute('type') != 'file') {

            item.value = item.value.toUpperCase();
        }
    });
}

function post_save() {
    userSelection = Object.values(document.getElementsByClassName('only-number'));
    userSelection.forEach(item => {
        ValueWrapper(item);
    });

    userSelection = Object.values(document.getElementsByClassName('only-currency'));
    userSelection.forEach(item => {
        ValueWrapper(item, 2);
    });

    userSelection = Object.values(document.getElementsByClassName('only-price'));
    userSelection.forEach(item => {
        ValueWrapper(item, 6);
    });
}

function download_excel(id, with_data) {
    let config = {
        headers: {
            'Content-Disposition': "attachment; filename=" + id + (with_data == true ? "_opening.xlsx" : "_list.xlsx"),
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        responseType: 'blob'
    };

    let data = new FormData();
    data.append('id', id);
    data.append('with_data', with_data);
    show_loader();
    axios.post('/miscellaneous/exporttoexcel', data, config)
    .then(function (response) {
        //console.log(response.data);
        //document.getElementById('tbl-upload-list').getElementsByTagName('tbody')[0].innerHTML = response.data;

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        let file_name = "";
        if (id == "coa_excel") {
            file_name = "COA_Excel.xlsx";
        }
        else {
            file_name = id + (with_data == true ? "_opening.xlsx" : "_list.xlsx");
        }
        console.log('file name ->', file_name);
        link.setAttribute('download', file_name);
        document.body.appendChild(link);
        link.click();

        hide_loader();
    })
    .catch(function (error) {
        Swal.fire({
            html:
                '<div class="mt-3"><lord-icon src="@Url.Content("~")/assets/images/lord-icons/tdrtiskw.json" trigger="loop" colors="primary:#f06548,secondary:#f7b84b" style="width:120px;height:120px"></lord-icon><div class="mt-4 pt-2 fs-15"><h4>Oops...! Something went Wrong !</h4><p class="text-muted mx-4 mb-0">Unknown error occured.</p></div></div>',
            showCancelButton: !0,
            showConfirmButton: !1,
            cancelButtonClass: "btn btn-primary w-xs mb-1",
            cancelButtonText: "Dismiss",
            buttonsStyling: !1,
            showCloseButton: !0,
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then(function (t) {
            post_save();
        });
        console.log(error);
    });
};

function download_pdf(id, with_data) {
    let file_name = "";
    if (id == "coa_pdf") {
        file_name = "ChartOfAccount.pdf";
    }
    else {
        file_name = id + (with_data == true ? "_opening.pdf" : "_list.pdf");
    }

    let config = {
        headers: {
            'Content-Disposition': "attachment; filename=" + file_name,
            'Content-Type': 'application/pdf'
        },
        responseType: 'blob'
    };

    let data = new FormData();
    data.append('id', id);
    data.append('with_data', with_data);
    show_loader();
    axios.post('/miscellaneous/exporttopdf', data, config)
        .then(function (response) {
            //console.log(response.data);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            console.log('file name ->', file_name);
            link.setAttribute('download', file_name);
            document.body.appendChild(link);
            link.click();

            hide_loader();
        })
        .catch(function (error) {
            Swal.fire({
                html:
                    '<div class="mt-3"><lord-icon src="@Url.Content("~")/assets/images/lord-icons/tdrtiskw.json" trigger="loop" colors="primary:#f06548,secondary:#f7b84b" style="width:120px;height:120px"></lord-icon><div class="mt-4 pt-2 fs-15"><h4>Oops...! Something went Wrong !</h4><p class="text-muted mx-4 mb-0">Unknown error occured.</p></div></div>',
                showCancelButton: !0,
                showConfirmButton: !1,
                cancelButtonClass: "btn btn-primary w-xs mb-1",
                cancelButtonText: "Dismiss",
                buttonsStyling: !1,
                showCloseButton: !0,
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then(function (t) {
                post_save();
            });
            console.log(error);
        });
};

function text_to_date(date, format) {
    let _date = date.split(' ')[0].split('-');
    //_date[1] = (100 + month_list[_date[1].toLowerCase()]).toString().slice(-2);
    _date = _date.join('-');
    _date = _date + ' 12:00:00';

    return new Date(_date)
};

function text_to_value(text) {
    return parseFloat(text.replace(/\,/g, ''));
};

function value_to_text(value, decimal_point = 2) {
    return new Number(value).toFixed(decimal_point).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


// Fits the company name in the topbar on one line by shrinking it until the
// whole name is inside its container. Company names run from an acronym to a
// full legal name, so a fixed size either wraps onto a second line or wastes
// the space. The size is set on the item rather than the list because the
// stylesheet's font-size on the list is !important.
function fit_company_caption() {
    const item = document.querySelector('.company_caption .choices__list--single .choices__item');
    if (!item) return;

    // Width the text wants, measured with the clipping turned off — with it on,
    // an overflowing name measures as exactly the width it was cut to.
    const naturalWidth = function () {
        const size = item.style.fontSize;
        const style = item.style.cssText;
        item.style.overflow = 'visible';
        item.style.textOverflow = 'clip';
        item.style.width = 'max-content';
        const width = item.getBoundingClientRect().width;
        item.style.cssText = style;
        item.style.fontSize = size;
        return width;
    };

    const max = 2, min = 0.95, step = 0.05;   // rem
    const arrow = 28;                          // the dropdown chevron sits over the text's right edge
    let size = max;
    item.style.fontSize = size + 'rem';

    while (size > min && naturalWidth() > item.clientWidth - arrow) {
        size -= step;
        item.style.fontSize = size.toFixed(2) + 'rem';
    }
}

// Choices rebuilds the selected item whenever the value is set, which can happen
// after load and again when a company is picked — a one-shot call at load gets
// thrown away with the element it styled. Watching the container covers every
// case without guessing at a delay.
function watch_company_caption() {
    const holder = document.querySelector('.company_caption');
    if (!holder) return;

    fit_company_caption();

    new MutationObserver(function () {
        fit_company_caption();
    }).observe(holder, { childList: true, subtree: true, characterData: true });
}

window.addEventListener('load', watch_company_caption);
window.addEventListener('resize', fit_company_caption);

// Fullscreen toggle. The theme binds this button itself, but its layout script
// throws on this app's horizontal topbar — it expects a vertical sidebar's
// #scrollbar element — and gives up before reaching the binding, so the icon did
// nothing. Binding it here keeps it working whatever the theme file does.
function toggle_fullscreen(event) {
    if (event) event.preventDefault();

    document.body.classList.toggle('fullscreen-enable');

    const open = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;

    if (open) {
        (document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen).call(document);
    } else {
        const el = document.documentElement;
        (el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen).call(el);
    }
}

// Leaving fullscreen with Escape does not go through the button, so the class
// has to follow the browser rather than the click.
function sync_fullscreen_class() {
    const open = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
    document.body.classList.toggle('fullscreen-enable', !!open);
}

window.addEventListener('load', function () {
    const button = document.querySelector('[data-toggle="fullscreen"]');
    if (button) button.addEventListener('click', toggle_fullscreen);
});

document.addEventListener('fullscreenchange', sync_fullscreen_class);
document.addEventListener('webkitfullscreenchange', sync_fullscreen_class);

// Flips a submenu to the left when opening it to the right would run off the
// window. The theme opens these on hover through CSS alone, so there is no event
// to hook — measure on the way in, once the element is displayed.
function fit_menu_dropdown(dropdown) {
    dropdown.classList.remove('menu-dropdown-left');

    const margin = 8;
    if (dropdown.getBoundingClientRect().right > window.innerWidth - margin) {
        dropdown.classList.add('menu-dropdown-left');
    }
}

document.addEventListener('mouseover', function (event) {
    const target = event.target instanceof Element ? event.target : null;
    const item = target && target.closest('.navbar-nav .nav-item');
    if (!item) return;

    const dropdown = item.querySelector(':scope > .menu-dropdown');
    // Next frame: on the first hover the dropdown is still display:none, and a
    // hidden element measures as zero.
    if (dropdown) requestAnimationFrame(function () { fit_menu_dropdown(dropdown); });
});

// Shrinks the top-level menu until every item fits on the bar. The horizontal
// theme lays the items out at a fixed size and simply lets the last ones fall
// off the right edge — on a smaller screen that hides whole sections with no
// indication they exist.
function fit_menu_bar() {
    const menu = document.getElementById('navbar-nav');
    if (!menu) return;

    const max = 0.925, min = 0.65, step = 0.025;   // rem
    let size = max;
    menu.style.setProperty('--ih-menu-font', size + 'rem');

    // scrollWidth is what the items need, clientWidth what the bar has.
    while (size > min && menu.scrollWidth > menu.clientWidth) {
        size -= step;
        menu.style.setProperty('--ih-menu-font', size.toFixed(3) + 'rem');
    }
}

window.addEventListener('load', fit_menu_bar);
window.addEventListener('resize', fit_menu_bar);

// Locks the screen after a spell of inactivity. Accounting screens sit open on shared desks;
// this keeps the session — company selection and all — while putting a password between the
// desk and the data. Signing out would lose that context and annoy people into avoiding it.
const LOCK_AFTER_MINUTES = 15;

let lock_timer = null;

function lock_screen() {
    // Navigating to /Lock is what locks: the page sets the flag server-side, so a click and the
    // idle timer take the same path and there is no window where the flag is set but the page is
    // not shown.
    window.location.href = '/Lock';
}

function reset_lock_timer() {
    if (lock_timer) clearTimeout(lock_timer);
    lock_timer = setTimeout(lock_screen, LOCK_AFTER_MINUTES * 60 * 1000);
}

['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'].forEach(function (event) {
    document.addEventListener(event, reset_lock_timer, { passive: true });
});

reset_lock_timer();
