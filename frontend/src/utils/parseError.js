export const parseApiError = (err) => {
    let dataResponse = null;
    if (typeof err?.response?.data === 'string') {
        dataResponse = err?.response?.data;
    }
    return (
      dataResponse || 
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      'Something went wrong!'
    );
};