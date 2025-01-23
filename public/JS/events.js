document.addEventListener("DOMContentLoaded", () => {
    const eventsList = document.getElementById("eventsList");
    const editPopup = document.getElementById("editPopup");
    const editForm = document.getElementById("editForm");
    const editName = document.getElementById("editName");
    const editDate = document.getElementById("editDate");
    const editDescription = document.getElementById("editDescription");
    const editStatus = document.getElementById("editStatus");
    const searchInput = document.getElementById('searchEvents');
    let editingEventId = null;

    // Fetch events from the backend
    const fetchEvents = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/events");
            const events = await response.json();
            displayEvents(events);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    // Display events in the DOM
    const displayEvents = (events) => {
        eventsList.innerHTML = ""; // Clear existing events

        events.forEach(event => {
            const card = `
                <div class="card" data-id="${event.id}">
                    <h2>${event.name}</h2>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Description:</strong> ${event.description}</p>
                    <p><strong>Status:</strong> ${event.status}</p>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            eventsList.insertAdjacentHTML("beforeend", card);
        });

        attachEventListeners();
    };

    // Attach event listeners for edit and delete buttons
    const attachEventListeners = () => {
        document.querySelectorAll(".edit-btn").forEach(button =>
            button.addEventListener("click", handleEdit)
        );
        document.querySelectorAll(".delete-btn").forEach(button =>
            button.addEventListener("click", handleDelete)
        );
    };

    // Handle editing an event
    const handleEdit = (e) => {
        const card = e.target.closest(".card");
        const id = card.dataset.id.trim();

        fetch(`http://localhost:5000/api/events/${id}`)
            .then(response => response.json())
            .then(event => {
                editingEventId = id;
                editName.value = event.name;
                editDate.value = event.date;
                editDescription.value = event.description;
                editStatus.value = event.status;

                editPopup.classList.remove("hidden");
            })
            .catch(error => console.error("Error fetching event details:", error));
    };

    // Handle deleting an event
    const handleDelete = (e) => {
        const card = e.target.closest(".card");
        const id = card.dataset.id;

        if (confirm("Are you sure you want to delete this event?")) {
            fetch(`http://localhost:5000/api/events/${id}`, {
                method: "DELETE",
            })
                .then(response => {
                    if (response.ok) {
                        alert("Event deleted successfully!");
                        fetchEvents();
                    } else {
                        alert("Failed to delete the event.");
                    }
                })
                .catch(error => console.error("Error deleting event:", error));
        }
    };

    // Handle form submission for editing an event
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const updatedEvent = {
            name: editName.value,
            date: editDate.value,
            description: editDescription.value,
            status: editStatus.value,
        };

        fetch(`http://localhost:5000/api/events/${editingEventId.trim()}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedEvent),
        })
            .then(response => {
                if (response.ok) {
                    alert("Event updated successfully!");
                    editPopup.classList.add("hidden");
                    fetchEvents();
                } else {
                    alert("Failed to update the event.");
                }
            })
            .catch(error => console.error("Error updating event:", error));
    });

    // Cancel edit popup
    document.getElementById("cancelEdit").addEventListener("click", () => {
        editPopup.classList.add("hidden");
    });

    // Search functionality
    const handleSearch = async () => {
        const searchTerm = searchInput.value.toLowerCase();

        try {
            const events = await fetch("http://localhost:5000/api/events").then(response => response.json());

            const filteredEvents = events.filter(event =>
                event.name.toLowerCase().includes(searchTerm) ||
                event.description.toLowerCase().includes(searchTerm)
            );

            displayEvents(filteredEvents);
        } catch (error) {
            console.error("Error during search:", error);
        }
    };

    searchInput.addEventListener('input', handleSearch);

    // Fetch and display events on page load
    fetchEvents();
});
