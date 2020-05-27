const basePrice = 0.05;
const extraFee = 1.2;
const translations = {
  en: basePrice,
  fr: basePrice,
  hy: 3 * basePrice,
};

const wordsIpunt = document.getElementById("words");
const languageSelector = document.getElementById("language");
const sprintCheckbox = document.getElementById("sprint");
const totalSpan = document.getElementById("js-total");

isExtraFeeEnabled = () => sprintCheckbox.checked;

getFinalPrice = (quantity, rate) => {
  if (isExtraFeeEnabled()) {
    return Number(parseFloat(quantity * rate * extraFee));
  }
  return Number(parseFloat(quantity * rate));
};

setLocalePrice = (number, locale = "es") =>
  number.toLocaleString(locale, {
    minimumFractionDigits: 2,
  });

getTotalString = (price) => {
  if (Number.isNaN(price)) {
    return setLocalePrice(Number(0));
  }
  return setLocalePrice(price);
};

calculateTotal = (words, rate) => {
  totalSpan.innerText = getTotalString(getFinalPrice(words, rate));
};

wordsIpunt.addEventListener("input", (e) => {
  calculateTotal(e.target.value, translations[languageSelector.value]);
});
languageSelector.addEventListener("input", (e) => {
  calculateTotal(wordsIpunt.value, translations[e.target.value]);
});
sprintCheckbox.addEventListener("input", (e) => {
  calculateTotal(wordsIpunt.value, translations[languageSelector.value]);
});

calculateTotal(wordsIpunt.value, translations[languageSelector.value]);

document
  .querySelector("button")
  .addEventListener("click", () => window.print());
