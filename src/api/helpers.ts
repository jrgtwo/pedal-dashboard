function throwOnError<T>(response: { data?: T | null; error?: unknown }) {
  if (response.error) throw response.error;
  return response?.data;
}

export { throwOnError }
