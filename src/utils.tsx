import React, { useReducer } from "react";
export function useForceUpdate() {
  const [_, dispatch] = useReducer(x => x + 1, 0);
  return dispatch;
}
