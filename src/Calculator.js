import { useState } from 'react';
import NumberButton from './NumberButton.js';
import './Calculator.css';

const BUTTON_LAYOUT = 'CEc/789*456-123+.0s='.split('');


function Calculator() {
  const [current, setCurrent] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [operation, setOperation] = useState(null);
  const staticProps = {
      setCurrent, setPrevious, setOperation,
      current, previous, operation };

  const buttons = BUTTON_LAYOUT.map(
    (num) => <NumberButton {...staticProps} number={num} key={`btn-${num}`} />
  );


  const value = current ? current : (previous ? previous : '0');
  const display = value.replace(/^(-?)0+(\d)/, '$1$2');
  console.log(`Values: ${previous} ${operation} ${current} => ${display}`); //XXX

  return (
    <div id='calculator'>
      <span id='display'>{display}</span>
      {buttons}
    </div>
  );
}


export default Calculator;
