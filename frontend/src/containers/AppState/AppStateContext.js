import React from "react";
import { initialAppState } from "./state";

export const AppStateContext = React.createContext([
  initialAppState,
  () => undefined
]);

export const { Consumer } = AppStateContext;
