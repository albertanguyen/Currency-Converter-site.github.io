/* VND, KRW, IDR, and EUR. Converter*/

function CurrencyConverter(input, firstCurrency, secondCurrency) {
  let amount = parseFloat(input);
  if (isNaN(amount)) {
    alert("Please enter a correct input!");
  }
  const formattedCurrency = secondCurrency.toLowerCase();
  if (firstCurrency === "vnd") {
    switch (formattedCurrency) {
      case "usd":
        return addFormattingToMoney(amount / 23216);
        break;
      case "krw":
        return addFormattingToMoney(amount / 19.653);
        break;
      case "idr":
        return addFormattingToMoney(amount / 1.617);
        break;
      default:
        return "Currency not found or the First Currency Unit is duplicated with the Second Currency Unit. Please check!";
    }
  }
  if (firstCurrency === "usd") {
    switch (formattedCurrency) {
      case "vnd":
        return addFormattingToMoney(amount * 23216);
        break;
      case "krw":
        return addFormattingToMoney(amount * 1187);
        break;
      case "idr":
        return addFormattingToMoney(amount * 14419);
        break;
      default:
        return "Currency not found or the First Currency Unit is duplicated with the Second Currency Unit. Please check!";
    }
  }
  if (firstCurrency === "krw") {
    switch (formattedCurrency) {
      case "vnd":
        return addFormattingToMoney(amount * 19.653);
        break;
      case "usd":
        return addFormattingToMoney(amount / 1187);
        break;
      case "idr":
        return addFormattingToMoney(amount * 12.13);
        break;
      default:
        return "Currency not found or the First Currency Unit is duplicated with the Second Currency Unit. Please check!";
    }
  } else if (firstCurrency === "idr") {
    switch (formattedCurrency) {
      case "vnd":
        return addFormattingToMoney(amount * 1.617);
        break;
      case "usd":
        return addFormattingToMoney(amount / 14419);
        break;
      case "krw":
        return addFormattingToMoney(amount / 12.13);
        break;
      default:
        return "Currency not found or the First Currency Unit is duplicated with the Second Currency Unit. Please check!";
    }
  }
}

function addFormattingToMoney(amount) {
  return amount.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function ExecutionCurrencyConverter() {
  const valueOfInput = document.getElementById("amount").value;
  const firstCurrency = document.getElementById("Start").value;
  const secondCurrency = document.getElementById("End").value;
  console.log(valueOfInput, firstCurrency, secondCurrency);
  const convertedValue = CurrencyConverter(
    valueOfInput,
    firstCurrency,
    secondCurrency
  );

  document.getElementById("result").value = convertedValue;
}

function callApi(currency) {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://free.currencyconverterapi.com/api/v6/convert?q=" +
      currency +
      "_VND&compact=y"
  );
  xhr.onload = function() {
    if (xhr.status === 200) {
      updateResults(JSON.parse(xhr.responseText));
    } else {
      alert("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}

function updateResults(response) {
  console.log(response);
}
