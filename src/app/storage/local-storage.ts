class StorageService {
  save<T>(key: string, data: T): void {
    if (typeof localStorage === "undefined") {
      return;
    }

    localStorage.setItem(key, JSON.stringify(data));
  }

  retrieve<T>(key: string): T | null {
    if (typeof localStorage === "undefined") {
      return [] as T;
    }

    const data = localStorage.getItem(key);
    if (data === null) {
      return null;
    }
    return JSON.parse(data) as T;
  }

  remove(key: string): void {
    if (typeof localStorage === "undefined") {
      return;
    }

    localStorage.removeItem(key);
  }
}

const storage = new StorageService();

export { StorageService, storage };
