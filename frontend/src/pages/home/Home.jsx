import Form from "@components/forms/UrlForm";
import "./Home.scss";

const Home = (props) => {
  return (
    <>
      <div className="section">
        <div className="text-container center">
          {props.environment == "local" && (
            <a
              href="https://github.com/ed3t/shortnr"
              target="_blank"
              className="badge-grid margin-bottom"
            >
              <div className="badge">NOTE</div>
              <p className="paragraph">
                This is a tasked project for the <strong>Indicina</strong> team.
              </p>
            </a>
          )}
          <h1 className="margin-bottom heading">
            <span>Shortnr</span> is a URL shortening service
          </h1>
          <p className="paragraph large margin-bottom">
            Put in a really long URL, it returns a short one.
          </p>
          <Form />
        </div>
      </div>
    </>
  );
}

export default Home;
