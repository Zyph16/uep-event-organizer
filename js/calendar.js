document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");

  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    contentHeight: '100%',
    expandRows: true,     // evenly distribute rows
    aspectRatio: 1.8, 
    headerToolbar: {
      left: "today",
      center: "prev title next",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listYear",
    },
    selectable: true,
    editable: true,
    events: [
      {
        title: "Team Meeting",
        start: "2025-08-21",
        color: "#4a90e2",
      },
      {
        title: "Conference",
        start: "2025-08-23",
        end: "2025-08-25",
        color: "#50c878",
      },
      {
        title: "Booked Room",
        start: "2025-12-22",
        color: "#ff6b6b",
      },
    ],
  });

  calendar.render();
});
