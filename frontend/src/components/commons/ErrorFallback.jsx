const ErrorFallback = ({ error }) => {
  const refreshWindow = () => {
    window.location.reload();
  }

  return (
    <div className="section index">
      <div className="text-container">
        <div className="margin-bottom large">
          <img src="/500.svg" />
          <h2 className="margin-bottom small">Something went wrong</h2>
          <p>{error?.message ? error.message : 'This is not your fault, our team is working to fix it.'}</p>
        </div>
        <button onClick={refreshWindow} className="button primary-button">
          <div className="button-text">Refresh page</div>
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
