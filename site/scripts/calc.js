const showit = () => {
const B = parseInt(window.document.getElementById("biden").value.replace(/,/g, ''))
const T = parseInt(window.document.getElementById("trump").value.replace(/,/g, ''))

const R = parseInt(window.document.getElementById("remaining").value.replace(/,/g, ''))


const display = window.document.getElementById("display")

const diff = T-B;
const num = (((R - diff)/2) + diff) / R;

const pct = num * 100;

display.innerText = pct;
}
