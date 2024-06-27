export const API_URL =
    import.meta.env.MODE === 'development'
        ? 'http://localhost:5000'
        : import.meta.env.VITE_APP_API_URL ||
          'https://api.bookbliss.logic-nest.me'
