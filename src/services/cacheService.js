// Simple in-memory cache to avoid redundant API calls
const cache = new Map();

const cacheService = {
  get(key) {
    if (cache.has(key)) {
      console.log(`[Cache] HIT para a chave: ${key.substring(0, 50)}...`);
      return cache.get(key);
    }
    console.log(`[Cache] MISS para a chave: ${key.substring(0, 50)}...`);
    return null;
  },

  set(key, value) {
    cache.set(key, value);
    console.log(`[Cache] Valor armazenado para a chave: ${key.substring(0, 50)}...`);
  },

  clear() {
    cache.clear();
    console.log("[Cache] Limpo.");
  }
};

export default cacheService;
