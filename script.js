const result = document.getElementById("result");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

// Exchange rates (example rates, in real app you would fetch these from an API)
const exchangeRates = {
  USD: { EUR: 0.92, UAH: 38.5, GBP: 0.79, USD: 1 },
  EUR: { USD: 1.09, UAH: 41.8, GBP: 0.86, EUR: 1 },
  UAH: { USD: 0.026, EUR: 0.024, GBP: 0.021, UAH: 1 },
  GBP: { USD: 1.27, EUR: 1.16, UAH: 48.7, GBP: 1 },
};

function appendNumber(number) {
  result.value += number;
}

function appendOperator(operator) {
  if (result.value !== "") {
    const lastChar = result.value.slice(-1);
    if ("+-*/%".includes(lastChar)) {
      result.value = result.value.slice(0, -1) + operator;
    } else {
      result.value += operator;
    }
  }
}

function clearDisplay() {
  result.value = "";
}

function deleteLastChar() {
  result.value = result.value.slice(0, -1);
}

function calculatePercentage() {
  try {
    const value = parseFloat(result.value);
    if (!isNaN(value)) {
      result.value = (value / 100).toString();
    }
  } catch (error) {
    result.value = "Error";
  }
}

function calculate() {
  try {
    const expression = result.value.replace(/×/g, "*");
    const answer = eval(expression);

    if (isFinite(answer)) {
      result.value = Number.isInteger(answer) ? answer : answer.toFixed(2);
    } else {
      result.value = "Error";
    }
  } catch (error) {
    result.value = "Error";
  }
}

async function convertCurrency() {
  try {
    const amount = parseFloat(result.value);
    if (isNaN(amount)) {
      result.value = "Error";
      return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    // In a real application, you would fetch current exchange rates from an API
    const rate = exchangeRates[from][to];
    const convertedAmount = amount * rate;

    result.value = convertedAmount.toFixed(2);
  } catch (error) {
    result.value = "Error";
  }
}

// Add keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/[0-9]/.test(key)) {
    appendNumber(key);
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    appendOperator(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteLastChar();
  } else if (key === "Escape") {
    clearDisplay();
  } else if (key === ".") {
    appendNumber(".");
  }
});
