export function setSecureStorage(name: string, value: string): void {
  sessionStorage.setItem(name, value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSecureStorage(name: string): any {
  const sessionValue = window.sessionStorage?.getItem(name);
  if (sessionValue !== null) {
    return JSON.parse(sessionValue);
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
