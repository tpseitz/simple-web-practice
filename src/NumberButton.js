const NAME = {
  '.': ['dot',       '.'],
  '/': ['divide',    <>&divide;</>],
  '=': ['equals',    '='],
  's': ['sign',      <>&plusmn;</>],
  'c': ['backspace', <>&lArr;</>],
  'C': ['clear',     'C'],
  'E': ['erase',     'CE'],
};
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
    console.log(`Pressed: ${buttonNumber}`); //XXX

    if ('0123456789'.indexOf(buttonNumber) >= 0) {
      if (current) setCurrent(current + buttonNumber);
      else setCurrent(buttonNumber);
    } else if (buttonNumber === '.' && current.indexOf('.') < 0) {
      if (current) setCurrent(current + buttonNumber);
      else setCurrent('0.');
    } else if ('+-*/='.indexOf(buttonNumber) >= 0 && previous && operation) {
      const fun = OPERATION[operation];
      const [pre, cur] = [parseFloat(previous), parseFloat(current)];
      setCurrent(null);
      setPrevious(fun(pre, cur) + '');
      setOperation(null);
    } else if ('+-*/'.indexOf(buttonNumber) >= 0 && current) {
      setCurrent(null);
      setPrevious(current);
      setOperation(null);
    } else if (buttonNumber === 's') {
      if (!current) setCurrent('-0');
      else if (current[0] === '-') setCurrent(current.slice(1));
      else setCurrent('-' + current);
    } else if (buttonNumber === 'c') {
      if (current)
        if (current.length === 1) setCurrent('0');
        else setCurrent(current.slice(0, -1));
    } else if (buttonNumber === 'C') {
      setCurrent('0');
    } else if (buttonNumber === 'E') {
      setCurrent(null);
      setPrevious(null);
      setOperation(null);
    }

    if ('+-*/'.indexOf(buttonNumber) >= 0) {
      setOperation(buttonNumber);
    }
  }

  const [cls, sign] = NAME[number] ? NAME[number]: (
      '0123456789'.indexOf(number) >= 0 ?
          ['digit', number] :
          ['operation', number]);

  return (
    <button className={cls} onClick={() => handleButtonEvent(number)}>
      {sign}
    </button>);
}

export default NumberButton;

