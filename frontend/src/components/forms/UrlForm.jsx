import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import { toast } from "react-hot-toast";

import successAnimation from "@app/assets/lotties/confetti";
import { parseApiError } from "@utils/parseError";
import { encodeUrl } from "@utils/api";
import CopyIcon from "@components/icons/CopyIcon";

const defaultLottieOptions = {
  loop: false,
  autoplay: true,
  animationData: successAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const UrlForm = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const lottieOptions = useMemo(() => defaultLottieOptions, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!inputValue) return;

      setIsLoading(true);
      try {
        const { data } = await encodeUrl(inputValue);
        setResult(data);
        setInputValue("");
      } catch (err) {
        toast.error(parseApiError(err), {
          iconTheme: { primary: "#F00", secondary: "#222" },
        });
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue]
  );

  const handleCopy = useCallback(async (e) => {
    e.preventDefault();
    if (!result?.shortUrl) return;

    try {
      await navigator.clipboard.writeText(result.shortUrl);
      toast.success("Copied to clipboard", {
        iconTheme: { primary: "#0F0", secondary: "#222" },
      });
    } catch {
      toast.error("Failed to copy link", {
        iconTheme: { primary: "#F00", secondary: "#222" },
      });
    }
  }, [result]);

  const handleViewAll = useCallback(() => {
    navigate("/urls");
  }, [navigate]);

  return (
    <>
      <form className="utilities-form" onSubmit={handleSubmit}>
        <input
          className="large-field"
          name="URL"
          type="text"
          placeholder="Enter a long URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
          autoFocus
        />
        <button
          type="submit"
          className={`button utilities-button${isLoading ? " is-loading" : ""}`}
          disabled={!inputValue || isLoading}
        >
          Shorten URL
        </button>
      </form>

      {result && (
        <div className="container narrow margin-top">
        <div className="card">
          <div className="space-between">
            <div className="space-between-vertical hide-on-tablet">
              <h6 className="title">Shortened URL</h6>
              <Lottie
                style={{
                  margin: 0,
                  position: "relative",
                  left: "18px",
                  bottom: "5px",
                }}
                options={lottieOptions}
                height={35}
                width={60}
              />
            </div>
            <div className="margin-bottom">
              <div className="badge-grid margin-bottom small">
                <p className="paragraph long-url">{result.longUrl}</p>
              </div>
              <div className="badge-grid margin-bottom small">
                <a
                  className="link paragraph"
                  href={result.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {result.shortUrl}{" "}
                  <span>
                    <button onClick={handleCopy} className="copy-button">
                      <CopyIcon />
                    </button>
                  </span>
                </a>
              </div>
            </div>
            <div className="align-bottom-vertical relative">
              <button onClick={handleViewAll} className="button primary-button">
                <div className="button-text">View All</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default UrlForm;
