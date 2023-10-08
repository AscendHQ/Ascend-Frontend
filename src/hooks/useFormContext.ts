import React from "react";

export function useFormContext<T>(ReactHookForm: React.Context<T>) {
  const context = React.useContext(ReactHookForm);
  if (!context) {
    throw new Error("useFormContext must be used within a Provider");
  }
  return context;
}
