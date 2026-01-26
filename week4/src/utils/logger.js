export const logger = {
  error: (msg, data) => {
    if (import.meta.env.DEV) console.error(msg, data);
  }
};