import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "@components/commons/NotFound";
import { parseApiError } from "@utils/parseError";
import { apiDecode } from "@utils/api";

const RedirectToLongUrl = () => {
  const { urlPath } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const redirect = async () => {
      try {
        const { longUrl } = await apiDecode(urlPath);
        window.location.href = longUrl;
      } catch (err) {
        console.log(parseApiError(err));
        setError(true);
      }
    };

    redirect();
  }, [urlPath]);

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
