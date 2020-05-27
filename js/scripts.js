const basePrice = 0.05;
const extraFee = 1.2;
const translations = {
  en: basePrice,
  fr: basePrice,
  hy: 3 * basePrice,
};
const wordsInput = document.getElementById("words");
const languageSelector = document.getElementById("language");
const sprintCheckbox = document.getElementById("sprint");
let total = 0;

getTotal = (quantity, rate) => {
  let total = Number(
    parseFloat(
      quantity * rate * (sprintCheckbox.checked ? extraFee : 1)
    ).toFixed(2)
  );
  if (Number.isNaN(total)) {
    return Number(0);
  }
  return total;
};

printTotal = (total) => {
  document.querySelector(
    "#js-calculate-total"
  ).innerHTML = total.toLocaleString("es", {
    minimumFractionDigits: 2,
  });
};

wordsInput.addEventListener("input", function (wordsEvent) {
  total = getTotal(
    wordsEvent.target.value,
    translations[languageSelector.value]
  );
  printTotal(total);
});

languageSelector.addEventListener("input", (languageEvent) => {
  total = getTotal(wordsInput.value, translations[languageEvent.target.value]);
  printTotal(total);
});

sprintCheckbox.addEventListener("input", () => {
  total = getTotal(wordsInput.value, translations[languageSelector.value]);
  printTotal(total);
});

document.querySelector('button').addEventListener('click', () => window.print())