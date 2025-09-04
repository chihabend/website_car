import "./style.css";

const Card = ({ children }) => {
  // children[0] = sub-card (photo), children[1] = form
  return (
    <div className="auth-flex-card">
      <div className="auth-photo-col">{children[0]}</div>
      <div className="auth-form-col">{children[1]}</div>
    </div>
  );
};

export default Card;
