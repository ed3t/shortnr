function displayError(prevState, errorType, errorId) {
  return {
    ...prevState,
    error: {
      id: errorId,
      type: errorType
    },
    loading: false
  };
}

function displayLoader(prevState, value) {
  return {
    ...prevState,
    loading: value
  };
}

function reduceAppState(prevState, action) {
  switch (action.type) {
    case "displayError":
      return displayError(
        prevState,
        action.payload.error,
        action.payload.errorId
      );
    case "displayLoader":
      return displayLoader(prevState, action.payload.value);
    default:
      return prevState;
  }
}

export default reduceAppState;
