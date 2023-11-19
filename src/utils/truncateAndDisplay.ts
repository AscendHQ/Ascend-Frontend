// Define the type for the subject parameter (assuming it's a string)
type SubjectType = string;

/**
 * Truncates a comma-separated list of names and displays the first 'maxItems' names,
 * followed by a "+ more" message if there are additional items.
 * @param subject - The comma-separated list of names.
 * @param maxItems - The maximum number of items to display. Default is 10.
 * @returns The formatted string with trimmed names and a "+ more" message if applicable.
 *
 * `Example`: truncateAndDisplay("Joseph,John,Stephen,Jude",2)
 *
 * `Output`: `Joseph,John, +2 more`
 */
export default function truncateAndDisplay(
  subject: SubjectType,
  maxItems: number = 10
): string {
  // Split the subject string by commas, trim each name, take the first 'maxItems', and join them with commas
  const trimmedNames: string = subject
    .split(",")
    .map((name: string) => name.trim())
    .slice(0, maxItems)
    .join(", ");

  // Determine if there are more items beyond 'maxItems' and construct the "+ more" message if needed
  const moreItems: string =
    subject.split(",").length > maxItems
      ? ` +${subject.split(",").length - maxItems} more`
      : "";

  // Combine the trimmed names and the "+ more" message (if applicable) and return the result
  return `${trimmedNames}${moreItems}`;
}
