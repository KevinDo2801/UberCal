const ARRAY_PRICE_X = [8000, 12000, 10000];
const WAIT_X = 2000;

const ARRAY_PRICE_SUV = [9000, 14000, 12000];
const WAIT_SUV = 3000;

const ARRAY_PRICE_BLACK = [10000, 16000, 14000];
const WAIT_BLACK = 4000;

function checkTypeUber() {
    var uberX = document.getElementById('uberX');
    var uberSUV = document.getElementById('uberSUV');
    var uberBlack = document.getElementById('uberBlack');

    if (uberX.checked) {
        return "uberX";
    } else if (uberSUV.checked) {
        return "uberSUV";
    } else if (uberBlack.checked) {
        return "uberBlack";
    }
}

function calWaitMoney(timeWait, priceWait) {
    var moneyWait = 0;
    if (timeWait >= 3) {
        moneyWait = Math.round(timeWait / 3.0) * priceWait;
    }

    return moneyWait;
}

function calMoney(numKM, timeWait, arrayPrice, priceWait) {
    var moneyWait = calWaitMoney(timeWait, priceWait);
    if (numKM <= 1) {
        return arrayPrice[0] + moneyWait;
    } else if (numKM > 1 && numKM <= 20) {
        return arrayPrice[0] + arrayPrice[1] * (numKM - 1) + moneyWait;
    } else if (numKM > 20) {
        return arrayPrice[0] + arrayPrice[1] * 19 + arrayPrice[2] * (numKM - 20) + moneyWait;
    }
}

function calTotal() {
    var numKM = document.getElementById("numKM").value;
    var numTO = document.getElementById("numTimeout").value;

    numKM = parseFloat(numKM);
    numTO = parseFloat(numTO);

    var totalMoney = 0;
    var typeUber = checkTypeUber();

    switch (typeUber) {
        case "uberX":
            totalMoney = calMoney(numKM, numTO, ARRAY_PRICE_X, WAIT_X);
            break;
        case "uberSUV":
            totalMoney = calMoney(numKM, numTO, ARRAY_PRICE_SUV, WAIT_SUV);
            break;
        case "uberBlack":
            totalMoney = calMoney(numKM, numTO, ARRAY_PRICE_BLACK, WAIT_BLACK);
            break;
        default:
            alert("Please choose type Uber");
    }

    return totalMoney;

}

document.getElementById("btnCalMoney").onclick = function () {
    var totalMoney = calTotal();
    document.getElementById("divTotal").style.display = "block";
    document.getElementById("outMoney").innerHTML = totalMoney;
}

function renderRowDetailKm(typeUber, arrayKm, arrayPrice, tblBody) {
    for (var i = 0; i < arrayKm.length; i++) {
        var tr = document.createElement("tr");

        var tdTypeUber = document.createElement("td");
        var tdUse = document.createElement("td");
        var tdUnit = document.createElement("td");
        var tdTotal = document.createElement("td");

        tdTypeUber.innerHTML = typeUber;
        tdUse.innerHTML = arrayKm[i] + " km";
        tdUnit.innerHTML = arrayPrice[i];
        tdTotal.innerHTML = arrayKm[i] * arrayPrice[i];

        tr.appendChild(tdTypeUber);
        tr.appendChild(tdUse);
        tr.appendChild(tdUnit);
        tr.appendChild(tdTotal);

        tblBody.appendChild(tr);
    }
}

function renderRowTimeWait(timeWait, priceWait, tblBody) {
    var moneyWait = calWaitMoney(timeWait, priceWait);
    var trTimeWait = document.createElement("tr");

    var tdMinTitle = document.createElement("td");
    var tdMin = document.createElement("td");
    var tdUnit = document.createElement("td");
    var tdTotal = document.createElement("td");

    tdMinTitle.innerHTML = "Time for waiting";
    tdMin.innerHTML = timeWait;
    tdUnit.innerHTML = priceWait;
    tdTotal.innerHTML = moneyWait;

    trTimeWait.appendChild(tdMinTitle);
    trTimeWait.appendChild(tdMin);
    trTimeWait.appendChild(tdUnit);
    trTimeWait.appendChild(tdTotal);

    tblBody.appendChild(trTimeWait);
}

function renderRowTotal(total, tblBody) {
    var trTotal = document.createElement("tr");
    trTotal.className = "alert alert-success";

    var tdTotalTitle = document.createElement("td");
    tdTotalTitle.setAttribute("colspan", 3);
    var tdTotal = document.createElement("td");

    tdTotalTitle.innerHTML = "Total: ";
    tdTotal.innerHTML = total;

    trTotal.appendChild(tdTotalTitle);
    trTotal.appendChild(tdTotal);

    tblBody.appendChild(trTotal);
}

function renderPrintBill(typeUber, numKm, timeWait, priceWait, arrayPrice, total) {
    var tblBody = document.getElementById("tblBody");
    tblBody.innerHTML = ""; // reset

    if (numKm <= 1) {
        renderRowDetailKm(typeUber, [1], arrayPrice, tblBody);
    }
    else if (numKm > 1 && numKm <= 20) {
        renderRowDetailKm(typeUber, [1, numKm - 1], arrayPrice, tblBody);
    }
    else if (numKm > 20) {
        renderRowDetailKm(typeUber, [1, 19, numKm - 20], arrayPrice, tblBody);
    }

    if (timeWait > 2) {
        renderRowTimeWait(timeWait, priceWait, tblBody);
    }

    renderRowTotal(total, tblBody);
}

document.getElementById("btnPrintBill").onclick = function () {
    var numKm = document.getElementById("numKM").value;
    var timeWait = document.getElementById("numTimeout").value;
    numKm = parseFloat(numKm);
    timeWait = parseFloat(timeWait);

    var total = calTotal();
    var typeUber = checkTypeUber();

    switch (typeUber) {
        case "uberX":
            renderPrintBill(typeUber, numKm, timeWait, WAIT_X, ARRAY_PRICE_X, total);
            break;
        case "uberSUV":
            renderPrintBill(typeUber, numKm, timeWait, WAIT_SUV, ARRAY_PRICE_SUV, total);
            break; 
        case "uberBlack":
            renderPrintBill(typeUber, numKm, timeWait, WAIT_BLACK, ARRAY_PRICE_BLACK, total);
            break;
        default:
            alert("Please select choose type Uber");
    }
}