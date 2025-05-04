import React, { useContext } from "react";
import { AppStateContext } from "@app/containers/AppState/AppStateContext";

function useAppState() {
  const stateAndDispatch = useContext(AppStateContext);

  return stateAndDispatch;
}

export default useAppState;
