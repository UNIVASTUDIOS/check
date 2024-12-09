// Format the date string according to UI
// values for month is either short or long
export function formatDateString(isoString, month) {
  const date = new Date(isoString);

  const options = { year: "numeric", month: month, day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// this is for the one with dashes
export function formatDateDash(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Month mapping
const monthMap = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

// Convert the first format string to Iso string
export function parseFormattedDateString(formattedString) {
  const [monthStr, dayStr, yearStr] = formattedString.split(" ");
  const day = parseInt(dayStr.replace(",", ""), 10); // Remove comma and parse as integer
  const year = parseInt(yearStr, 10);
  const month = monthMap[monthStr];

  if (!isNaN(day) && !isNaN(year) && month !== undefined) {
    const date = new Date(year, month, day);
    return date.toISOString();
  } else {
    throw new Error("Invalid date format");
  }
}
