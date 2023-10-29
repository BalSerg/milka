const urlParams = new URLSearchParams(window.location.search);

const paramEnum = ["1", "2", "3"];

let param = "1";

const val = urlParams.get("room");
if (val !== "" && val !== null) {
  if (paramEnum.includes(val) === true) {
    param = val;
  }
}

export default `${param}`;
