import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "@components/commons/NotFound";
import { parseApiError } from "@utils/parseError";
import { decodeUrl } from "@utils/api";

const RedirectToLongUrl = () => {
  const { shortUrl } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const redirect = async () => {
      try {
        const res = await decodeUrl(shortUrl);
        const { longUrl } = res.data;
        window.location.href = longUrl;
      } catch (err) {
        console.log(parseApiError(err));
        setError(true);
      }
    };

    redirect();
  }, [shortUrl]);

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="redirect">
      <div className="pageloader"></div>
    </div>
  );
};

export default RedirectToLongUrl;
