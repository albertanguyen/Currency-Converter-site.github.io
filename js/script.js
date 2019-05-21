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

/* Compute number of bills*/
function VNDBillsComputation(amount) {
  let NumberBill = [];
  let Bill500k = amount % 500000;
  let Bill200k = Bill500k % 200000;
  let Bill100k = Bill200k % 100000;
  let Bill50k = Bill100k % 50000;
  let Bill20k = Bill50k % 20000;
  let Bill10k = Bill20k % 10000;
  let Bill5k = Bill10k % 5000;
  let Bill2k = Bill5k % 2000;
  let Bill1k = Bill2k % 1000;
  NumberBill.push(Bill500k);
  NumberBill.push(Bill200k);
  NumberBill.push(Bill100k);
  NumberBill.push(Bill50k);
  NumberBill.push(Bill20k);
  NumberBill.push(Bill10k);
  NumberBill.push(Bill5k);
  NumberBill.push(Bill2k);
  NumberBill.push(Bill1k);
  return NumberBill;
}

function ThanksMessage(firstCurrency, secondCurrency) {
    const formattedCurrency = secondCurrency.toLowerCase();
    if (firstCurrency === "vnd") {
    switch (formattedCurrency) {
      case "usd":
        return "Thank you";
        break;
      case "krw":
        return "고맙습니다";
        break;
      case "idr":
        return "Terima kasih";
    }
  }
  if (firstCurrency === "usd") {
    switch (formattedCurrency) {
      case "vnd":
        return "Cám ơn";
        break;
      case "krw":
        return "고맙습니다";
        break;
      case "idr":
        return "Terima kasih";
    }
  }
  if (firstCurrency === "krw") {
    switch (formattedCurrency) {
      case "vnd":
        return "Cám ơn";
        break;
      case "usd":
        return ;
        break;
      case "idr":
        return "Terima kasih";
    }
  } else if (firstCurrency === "idr") {
    switch (formattedCurrency) {
      case "vnd":
        return "Cám ơn";
        break;
      case "usd":
        return "Thank you";
        break;
      case "krw":
        return "고맙습니다";
    }
  }
}

function displayBillsVND(amount) {
  const convertedValue = amount;
  const NumOfBill = VNDBillsComputation(convertedValue);
  return [` 500,000 VND x ${NumOfBill[0]}\n`,
          `200,000 VND x ${NumOfBill[1]}\n`,
          `100,000 VND x ${NumOfBill[2]}\n`,
          `50,000 VND x ${NumOfBill[3]}\n`,
          `20,000 VND x ${NumOfBill[4]}\n`,
          `10,000 VND x ${NumOfBill[5]}\n`,
          `5,000 VND x ${NumOfBill[6]}\n`,
          `2,000 VND x ${NumOfBill[7]}\n`,
          `1,000 VND x ${NumOfBill[8]}\n`];

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
  let mess = ThanksMessage(firstCurrency, secondCurrency);
  document.getElementById("Thankyou").innerText = mess;
  let bills = displayBillsVND(convertedValue);
  document.getElementById("NumberOfBills").innerText = bills[0]


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
