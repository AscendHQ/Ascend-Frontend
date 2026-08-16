export function setSecureStorage(name: string, value: string): void {
  localStorage.setItem(name, value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSecureStorage(name: string): any {
  if (typeof window === "undefined") {
    return undefined;
  }

  const sessionValue = window.localStorage?.getItem(name);
  if (sessionValue !== null && sessionValue !== undefined) {
    try {
      return JSON.parse(sessionValue);
    } catch {
      window.localStorage.removeItem(name);
      return undefined;
    }
  }
}

export function clearAllStorage(): void {
  const cookies: string[] = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos: number = cookie.indexOf("=");
    const name: string = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}

export function clearStorage(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
