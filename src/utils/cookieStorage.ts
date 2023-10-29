export function setSecureStorage(
  name: string,
  value: string,
  days: number,
  rememberMe: boolean
): void {
  if (rememberMe) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    const secureFlag = location.protocol === "https:" ? ";secure" : "";
    document.cookie = `${name}=${value};${expires};path=/${secureFlag}`;
  } else {
    sessionStorage.setItem(name, value);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSecureStorage(name: string): any {
  const sessionValue = sessionStorage.getItem(name);
  if (sessionValue !== null) {
    return sessionValue;
  }

  const cookieValue = document.cookie
    .split("; ")
    .find(row => row.startsWith(name))
    ?.split("=")[1];

  return cookieValue || null;
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
