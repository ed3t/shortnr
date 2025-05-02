import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { decodeUrl } from '@utils/api';

const RedirectToLongUrl = () => {
  const { shortUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      try {
        const res = await decodeUrl(shortUrl);
        const { longUrl } = res.data;

        window.location.href = longUrl;
      } catch (err) {
        console.error('Redirect failed:', err);
        navigate('/not-found');
      }
    };

    redirect();
  }, [shortUrl, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectToLongUrl;