export default defineEventHandler(async (event) => {
  return {
    message: "Hello from the API!",
    timestamp: new Date().toISOString(),
    method: event.method,
    url: getRequestURL(event).pathname,
  };
});
