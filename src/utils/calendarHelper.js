// =======================================================================
// CALENDAR HELPER
// Generates .ics file download and Google Calendar links
// =======================================================================

export function downloadIcsFile(event) {
  const startDateStr = "20261206T143000";
  const endDateStr = "20261206T180000";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Toy Story Baby Shower//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${event.parents.combined}'s Baby Shower (It's A Boy Story!)`,
    `DESCRIPTION:You are joyfully invited to celebrate Jannah & Josiah's baby shower! Location: ${event.venue.name}. RSVP to Jo: ${event.rsvp.phoneFormatted}.`,
    `LOCATION:${event.venue.name}, ${event.venue.address}`,
    `DTSTART:${startDateStr}`,
    `DTEND:${endDateStr}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `baby-shower-jannah-josiah.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(event) {
  const title = encodeURIComponent(`${event.parents.combined}'s Baby Shower (It's A Boy Story!)`);
  const details = encodeURIComponent(
    `Join Jannah & Josiah to celebrate the upcoming arrival of their baby boy!\nVenue: ${event.venue.name}\nAddress: ${event.venue.address}\nRSVP to Jo: ${event.rsvp.phoneFormatted}`
  );
  const location = encodeURIComponent(`${event.venue.name}, ${event.venue.address}`);
  const dates = "20261206T223000Z/20261207T020000Z";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
}
