import React, { useContext } from "react";
import Button from "../Button/Button";
import RomanNumCalc from "../../Logic/romanNumCalc";
import ArabicNumCalc from "../../Logic/arabicNumCalc";
import Context from "../../store/context";

function Panel({ setInput, input, ans, setAns }) {
  const { state } = useContext(Context);
  let handleInput = (children) => {
    switch (children) {
      case "cancel":
        cancelAll();
        break;
      case "=":
        getAns();
        break;
      default:
        // when inputs are number
        addInput(children);
    }
  };

  const getAns = () => {
    let expression;
    if (state.isRomanMode) {
      expression = new RomanNumCalc(input);
    } else {
      expression = new ArabicNumCalc(input);
    }
    if (expression.validation()) {
      let ans = expression.calculation();
      setAns(ans);
    } else {
      setAns("Invalid Input");
    }
  };

  const addInput = (children) => {
    if (ans) {
      setAns("");
      setInput(children);
    } else {
      setInput((input += children));
    }
  };

  const cancelAll = () => {
    setInput("");
    setAns("");
  };

  let numBtns;
  if (state.isRomanMode) {
    numBtns = [`I`, `V`, `X`, `L`, `C`, `D`, `M`];
  } else {
    numBtns = [`7`, `8`, `9`, `4`, `5`, `6`, `1`, `2`, `3`, `0`];
  }

  numBtns = numBtns.map((el, i) => {
    return (
      <Button key={i} onClickFn={() => handleInput(el)}>
        {el}
      </Button>
    );
  });

  let operators = [`+`, `-`, `*`, `/`, `cancel`, `=`];
  operators = operators.map((el, i) => {
    return (
      <Button key={i} onClickFn={() => handleInput(el)}>
        {el}
      </Button>
    );
  });

  return (
    <div>
      {numBtns}
      {operators}
    </div>
  );
}

export default Panel;
