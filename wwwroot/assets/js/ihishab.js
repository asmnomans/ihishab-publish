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
    flatpickr(link, dateData);
});

function make_choice(selector) {
    userSelection = Object.values(document.querySelectorAll(selector));
    userSelection.forEach(item => {
        var choiceData = {};
        var isChoicesVal = item.attributes;
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
            choiceData.shouldSort = true;
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
        choice_list[item.getAttribute('id')] = isChoicesVal["data-choices-text-disabled-true"]
            ? new Choices(item, choiceData).disable()
            : new Choices(item, choiceData);

        let parent_element = document.getElementById(item.getAttribute('id')).parentElement.parentElement.parentElement;
        let fragment = document.createDocumentFragment();
        fragment.appendChild(document.getElementById(item.getAttribute('id')));
        parent_element.prepend(fragment);
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

