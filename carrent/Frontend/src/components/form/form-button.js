import "./style.css"
const FormButton = ({ bgColor = "", btnText }) => {
  return (
    <div className="form-group">
      <button type="submit" className={ " form-btn-primary ab"}>
        {btnText}
      </button>
    </div>
  );
};

export default FormButton;
