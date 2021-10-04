import "./Input.scss";

const Input = ({ children, operations }) => {
  return (
    <div className={`input ${operations ? "operations" : "result"}`}>
      {children}
    </div>
  );
};
export default Input;
