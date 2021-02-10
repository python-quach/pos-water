export const currentTime = () => {
    const time = new Date();
    return time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });
};

export const verifyAccount = (value) => {
    if (value.match(/^[0-9]*$/) && value.length <= 10) {
        return value;
    }
};

export const currentDate = () => {
    const currentdate = new Date();
    // const currentdate = new Date(2019, 19, 5, 5, 23, 59);
    const datetime =
        currentdate.getMonth() +
        1 +
        '/' +
        currentdate.getDate() +
        '/' +
        currentdate.getFullYear();

    return datetime;
};

export const normalizeAreaCode = (value, previousValue) => {
    // console.log(value);
    if (value.length <= 3 && value.match(/^\d+$/g)) {
        if (value.length === 3) {
            // document.getElementById('Phone').focus();
            return value;
        }
        return value;
    } else {
        if (value === '') {
            return '';
        } else {
            return previousValue;
        }
    }
};
export const normalizeInput = (value, previousValue) => {
    // console.log({ value, previousValue });
    if (value.match(/^\d+$/g) && value.length <= 7) {
        if (value.length === 7 && value.length > previousValue.length) {
            // document.getElementById('firstName').focus();
            return value.slice(0, 3) + '-' + value.slice(3, 7);
        }
        if (value.length === 0) return '';
        return value;
    }

    if (
        previousValue &&
        previousValue.length > value.length &&
        value.length < 9
    ) {
        return value;
    }

    if (
        previousValue &&
        previousValue.length < value.length &&
        value.length < 9
    ) {
        // console.log('match second if', value);
        if (value.match(/^\d+$/g) || value.charAt(3) === '-') {
            return value;
        }
        return previousValue;
    }

    return previousValue;
};

export const upperCaseName = (value) => {
    if (value.match(/^[a-zA-Z]+$/g)) return value.toUpperCase();
};

export const verifyFee = (value, previousValue) => {
    if (isNaN(parseInt(value))) return 0;
    return value.length <= 4 ? parseInt(value) : previousValue;
};

export const verifyRenewGallon = (value, previousValue) => {
    if (isNaN(parseInt(value))) return 0;
    return value.length <= 4 ? parseInt(value) : previousValue;
};

export function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id)) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
