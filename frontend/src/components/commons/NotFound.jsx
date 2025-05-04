import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="section index">
      <div className="text-container">
        <div className="margin-bottom large">
          <img src="/404.svg" alt="Page not found" />
          <h2 className="margin-bottom small">
            Sorry, this page doesn’t exist or has been moved
          </h2>
          <p>Please, consider going back to our homepage.</p>
        </div>
        <button onClick={handleGoHome} className="button primary-button" type="button">
          <div className="button-text">Go back home</div>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
