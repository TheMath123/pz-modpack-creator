export class LocalStorage {
  static set(key: string, value: string) {
    // Support Local Storage
    if (typeof Storage !== "undefined") {
      localStorage.setItem(key, value);
    }
  }

  static get(key: string) {
    if (typeof Storage !== "undefined") {
      return localStorage.getItem(key);
    }
  }

  static delete(key: string) {
    if (typeof Storage !== "undefined") {
      localStorage.removeItem(key);
    }
  }

  static clear() {
    if (typeof Storage !== "undefined") {
      localStorage.clear();
    }
  }
}
