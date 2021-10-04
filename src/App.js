import { useEffect, useState } from "react";
import Button from "./components/button/Button";
import Input from "./components/input/Input";
import "./App.scss";

const App = () => {
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");
  const [calculation, setCalculation] = useState("");
  const [operations, setOperations] = useState("");
  const operators = ["+", "-", "*", "/"];
  const specificOperators = ["%", ".", "+/-", "C", "="];

  const calculate = () => {
    if (operator === "+") {
      return parseFloat(prev) + parseFloat(next);
    } else if (operator === "-") {
      return parseFloat(prev) - parseFloat(next);
    } else if (operator === "*") {
      return parseFloat(prev) * parseFloat(next);
    } else if (operator === "/") {
      if (next === 0) {
        return "You can not divide by 0";
      } else {
        return parseFloat(prev) / parseFloat(next);
      }
    }
  };
  const clear = () => {
    setPrev("");
    setNext("");
    setResult("");
    setOperator("");
    setCalculation("");
    setOperations("");
  };
  const calculateResult = () => {
    setResult(calculate(prev, next, operator).toString());
  };

  const checkForSpecificOperator = (value) => {
    switch (value) {
      case "+/-":
        if (next !== "") {
          setNext((parseFloat(next) * -1).toString());
        } else {
          setPrev((parseFloat(prev) * -1).toString());
        }
        break;
      case ".":
        if (operator === "" && !prev.includes(".")) {
          setPrev(prev + value);
        } else if (operator !== "" && !next.includes(".")) {
          setNext(next + value);
        } else {
          return;
        }
        break;
      case "%":
        if (operator === "" && prev !== "" && result === "") {
          setPrev((parseFloat(prev) * 0.01).toString());
        } else if (operator !== "" && next !== "" && result === "") {
          setNext((parseFloat(next) * 0.01).toString());
        }
        break;
      case "C":
        clear();
        break;
      case "=":
        calculateResult();
        setPrev("");
        setNext("");
        setOperator("");
        setOperations("");
      default:
        break;
    }
  };
  const setValues = (value) => {
    if (operators.includes(value)) {
      if (operator === "") {
        setOperator(value);
      } else {
        setOperator(value);
        calculateResult();
        setNext("");
        setPrev("");
      }
    } else if (operator === "" && !specificOperators.includes(value)) {
      result === "" && setPrev(prev + value);
    } else if (
      operator !== "" &&
      !operator.includes(value) &&
      !specificOperators.includes(value)
    ) {
      setNext(next + value);
    }
  };

  const setOperation = (value) => {
    additionalValidator(value);
    if (
      (operators.includes(value) && prev === "") ||
      (operators.includes(value) && operator.includes(calculation.slice(-1)))
    ) {
      return;
    }
    checkForSpecificOperator(value);
    setValues(value);
  };

  const additionalValidator = (value) => {
    if (
      (operators.includes(value) && prev === "") ||
      (operators.includes(value) && operator.includes(calculation.slice(-1)))
    ) {
      return;
    }
    setCalculation(calculation + value);
  };

  useEffect(() => result !== "" && setPrev(result), [result]);
  return (
    <div className="calculator_wrapper">
      <div className="calculator_display">
        <Input operations>{operations || "0"}</Input>
        <Input>{prev ? prev : "0"}</Input>
      </div>
      <div className="calculator_container">
        <Button name="%" onClick={setOperation}>
          %
        </Button>
        <Button name="+/-" onClick={setOperation}>
          +/-
        </Button>
        <Button name="C" onClick={setOperation}>
          C
        </Button>
        <Button name="/" onClick={setOperation}>
          /
        </Button>

        <Button name="7" onClick={setOperation}>
          7
        </Button>
        <Button name="8" onClick={setOperation}>
          8
        </Button>
        <Button name="9" onClick={setOperation}>
          9
        </Button>
        <Button name="*" onClick={setOperation}>
          x
        </Button>

        <Button name="4" onClick={setOperation}>
          4
        </Button>
        <Button name="5" onClick={setOperation}>
          5
        </Button>
        <Button name="6" onClick={setOperation}>
          6
        </Button>
        <Button name="-" onClick={setOperation}>
          -
        </Button>

        <Button name="1" onClick={setOperation}>
          1
        </Button>
        <Button name="2" onClick={setOperation}>
          2
        </Button>
        <Button name="3" onClick={setOperation}>
          3
        </Button>
        <Button name="+" onClick={setOperation}>
          +
        </Button>

        <Button name="0" onClick={setOperation}>
          0
        </Button>
        <Button name="." onClick={setOperation}>
          ,
        </Button>
        <Button name="=" onClick={setOperation}>
          =
        </Button>
      </div>
    </div>
  );
};
export default App;
