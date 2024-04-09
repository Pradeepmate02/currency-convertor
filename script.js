const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};
const BASE_URL ="https://api.currencyapi.com/v3/latest?apikey=cur_live_BnHBckOA2DpzzYg1Ced3OemNksx6LNeDVzqaspnn"
// const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_BnHBckOA2DpzzYg1Ced3OemNksx6LNeDVzqaspnn&currencies=INR&base_currency=EUR"


let btn = document.querySelector("form button");
let selectOp = document.querySelectorAll(".select-container select");
let amount = document.querySelector("form input");
let fromCurr = document.querySelector("#from select");
let toCurr = document.querySelector("#into select");
let msg = document.querySelector("form .msg")
 for(let select of selectOp){
    for(currCode in countryList){
      newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      select.append(newOption)
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target)
    })
 }

 const updateFlag = (element) =>{
  let currCode = element.value;
  let countryCode = countryList[currCode]
  let newImg = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img")
  img.src = newImg;
 }


 btn.addEventListener("click", (evt) =>{
      evt.preventDefault();
      conversion()
      // updateMsg()
 })

 const conversion = async () =>{
      let amt = amount.value;
      if(amt < 1 && amt == ""){
        let amt = 1;
        amount.value = "1";
      }
      let tCurr = toCurr.value;
      const URL = `${BASE_URL}&currencies=${tCurr}&base_currency=${fromCurr.value}`
      let promise =await fetch(URL);
      let info = await promise.json();
      
      let rate = info.data[tCurr].value;
      let finalAmt = amt*rate;
      msg.innerText = `${amt} ${fromCurr.value} = ${finalAmt} ${tCurr}`
 }

 window.addEventListener("load", () =>{
      conversion();
 })
