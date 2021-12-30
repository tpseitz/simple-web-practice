import { useState } from "react";
import NumberButton from "./NumberButton.js";

function Calculator() {
  const [current, setCurrent] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [operation, setOperation] = useState(null);
  const staticProps = {
      setCurrent, setPrevious, setOperation,
      current, previous, operation };

  const buttons = "123/456*789-0.=+".split("").map(
    (num) => <NumberButton {...staticProps} number={num} key={`btn-${num}`} />
  );


  const display = current ? current : (previous ? previous : "0");
  console.log(`Values: ${previous} ${operation} ${current} => ${display}`); //XXX

  return (
    <div className="calculator">
      <span id="display">{display}</span>
      <div id="button-panel">
        {buttons}
      </div>
    </div>
  );
}

export default Calculator;
