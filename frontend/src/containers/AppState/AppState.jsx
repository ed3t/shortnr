import React, { useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppStateContext } from "./AppStateContext";
import { initialAppState } from "./state";
import reduceAppState from "./reducer";
import ErrorBoundary from "../Layout";

const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reduceAppState, initialAppState);

  useEffect(() => {
    try {
      if (state.error) {
        dispatch({
          type: "displayError",
          payload: { error: "unhandled", errorId: uuidv4() },
        });
      }
    } catch (error) {
      dispatch({
        type: "displayError",
        payload: { error: error.message, errorId: uuidv4() },
      });
    }
  }, [state.error, dispatch]);

  useEffect(() => {
    const globalErrorHandler = (event) => {
      dispatch({
        type: "displayError",
        payload: { error: event.message, errorId: uuidv4() },
      });
    };

    window.addEventListener("error", globalErrorHandler);

    return () => {
      window.removeEventListener("error", globalErrorHandler);
    };
  }, [dispatch]);

  return (
    <AppStateContext.Provider value={[state, dispatch]}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
