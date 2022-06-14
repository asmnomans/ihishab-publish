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


userSelection = Object.values(document.getElementsByClassName('form-select'));
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

