export function setSecureCookie(
  name: string,
  value: string,
  days: number
): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  const secureFlag = location.protocol === "https:" ? ";secure" : "";
  document.cookie = `${name}=${value};${expires};path=/${secureFlag}`;
}

export function clearAllCookies(): void {
  const cookies: string[] = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos: number = cookie.indexOf("=");
    const name: string = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}

export function clearCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
