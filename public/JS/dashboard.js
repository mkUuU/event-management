document.addEventListener("DOMContentLoaded", () => {
    const eventsTableBody = document.querySelector("tbody");

    // Fetch events from the backend
    fetch("http://localhost:5000/api/events")
        .then(response => response.json())
        .then(data => {
            // Populate the table with events
            data.forEach(event => {
                const row = `
                    <tr>
                        <td>${event.name}</td>
                        <td>${event.date}</td>
                        <td>${event.description}</td>
                        <td>${event.status}</td>
                    </tr>
                `;
                eventsTableBody.insertAdjacentHTML("beforeend", row);
            });
        })
        .catch(error => console.error("Error fetching events:", error));
});
