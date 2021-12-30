const OPERATION = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

function NumberButton(props) {
  const { setCurrent, setPrevious, setOperation } = props;
  const { current, previous, operation } = props;
  const { number } = props;

  function handleButtonEvent(buttonNumber) {
    if ("0123456789".indexOf(buttonNumber) >= 0) {
      if (current) setCurrent(current + buttonNumber);
      else setCurrent(buttonNumber);
    } else if (buttonNumber === '.' && current.indexOf('.') < 0) {
      if (current) setCurrent(current + buttonNumber);
      else setCurrent('0.');
    } else if ('+-*/='.indexOf(buttonNumber) >= 0 && previous && operation) {
      const fun = OPERATION[operation];
      const [pre, cur] = [parseFloat(previous), parseFloat(current)];
      setCurrent(null);
      setPrevious(fun(pre, cur));
      setOperation(null);
    } else if ('+-*/'.indexOf(buttonNumber) >= 0 && current) {
      setCurrent(null);
      setPrevious(current);
      setOperation(null);
    }

    if ("+-*/".indexOf(buttonNumber) >= 0) {
      setOperation(buttonNumber);
    }
  }

  const className = ("0123456789.".indexOf(number) >= 0 ?
      "digit" : "operation") + "-button";

  return <button
        className={className}
        onClick={() => handleButtonEvent(number)}>
    {number}
  </button>;
}

export default NumberButton;

