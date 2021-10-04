import "./Button.scss";

const isOperator = (val) => {
  return (
    !isNaN(val) ||
    val === "," ||
    val === "=" ||
    val === "%" ||
    val === "C" ||
    val === "+/-"
  );
};
const isEqual = (val) => {
  return val === "=";
};
const isZero = (val) => {
  return val === "0";
};

const Button = ({ name, children, onClick }) => {
  return (
    <div
      className={`button ${
        isOperator(name)
          ? (isEqual(name) && "equal") || (isZero(name) && "zero")
          : "operator"
      }`}
      onClick={() => onClick(name)}
    >
      {children}
    </div>
  );
};
export default Button;
