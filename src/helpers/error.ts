export const getMessage = (error: unknown) =>
  error && typeof error === "object" && "message" in error
    ? `${error.message}`
    : "";
