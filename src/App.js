import { useEffect, useState } from "react";

const App = () => {
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");
  const [calculation, setCalculation] = useState("");
  const operators = ["+", "-", "*", "/"];
  const specificOperators = ["%", ".", "+/-"];

  const validate = () => {
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
  };
  const calculate = () => {
    setResult(validate(prev, next, operator).toString());
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
    }
  };

  const setOperation = (value) => {
    validator(value);
    if (
      (operators.includes(value) && prev === "") ||
      (operators.includes(value) && operator.includes(calculation.slice(-1)))
    ) {
      return;
    }
    checkForSpecificOperator(value);
    // if (value === "+/-") {
    //   if (next !== "") {
    //     setNext((parseFloat(next) * -1).toString());
    //   } else {
    //     setPrev((parseFloat(prev) * -1).toString());
    //   }
    // }
    // if (value === ".") {
    //   if (operator === "" && !prev.includes(".")) {
    //     setPrev(prev + value);
    //   } else if (operator !== "" && !next.includes(".")) {
    //     setNext(next + value);
    //   } else {
    //     return;
    //   }
    // }
    // if (value === "%") {
    //   if (operator === "" && prev !== "" && result === "") {
    //     setPrev((parseFloat(prev) * 0.01).toString());
    //   } else if (operator !== "" && next !== "" && result === "") {
    //     setNext((parseFloat(next) * 0.01).toString());
    //   }
    // }
    // if (value === "C") {
    //   clear();
    // }
    if (operators.includes(value)) {
      if (operator === "") {
        setOperator(value);
      } else {
        setOperator(value);
        calculate();
        setNext("");
        setPrev("");
      }
    } else if (operator === "" && !specificOperators.includes(value)) {
      if (result === "") {
        setPrev(prev + value);
      }
    } else if (
      operator !== "" &&
      !operator.includes(value) &&
      !specificOperators.includes(value)
    ) {
      setNext(next + value);
    }
  };

  const validator = (value) => {
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
    <div>
      <div>
        Prev: {prev} Operator: {operator} Next: {next} Result: {result}
        Calculation: {calculation}
      </div>
      <button onClick={() => setOperation("1")}>1</button>
      <button onClick={() => setOperation("2")}>2</button>
      <button onClick={() => setOperation("3")}>3</button>
      <button onClick={() => setOperation("4")}>4</button>
      <button onClick={() => setOperation("5")}>5</button>
      <button onClick={() => setOperation("6")}>6</button>
      <button onClick={() => setOperation("7")}>7</button>
      <button onClick={() => setOperation("8")}>8</button>
      <button onClick={() => setOperation("9")}>9</button>
      <button onClick={() => setOperation("+")}>+</button>
      <button onClick={() => setOperation("-")}>-</button>
      <button onClick={() => setOperation("*")}>*</button>
      <button onClick={() => setOperation("/")}>/</button>
      <button onClick={() => setOperation("+/-")}>+/-</button>
      <button onClick={() => setOperation(".")}>,</button>
      <button onClick={() => setOperation("%")}>%</button>
      <button onClick={() => setOperation("C")}>C</button>
    </div>
  );
};
export default App;
