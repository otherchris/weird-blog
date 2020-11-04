const showit = () => {
const B = window.document.getElementById("biden").value
const T = window.document.getElementById("trump").value
const R = window.document.getElementById("remaining").value

const display = window.document.getElementById("display")

const diff = T-B;
const num = (((R - diff)/2) + diff) / R;

const pct = num * 100;

display.innerText = pct;
}
