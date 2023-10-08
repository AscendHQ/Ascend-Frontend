export function formatNames(params: string) {
  return params
    .split(",")
    .map(name => name.trim())
    .slice(0, 2)
    .join(", ");
}
export function additionalInfo(params: string) {
  return params.split(",").length > 2
    ? ` ,+${params.split(",").length - 2} more`
    : "";
}
