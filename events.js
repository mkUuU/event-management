document.addEventListener("DOMContentLoaded", () => {
    const eventsList = document.getElementById("eventsList");
    const editPopup = document.getElementById("editPopup");
    const editForm = document.getElementById("editForm");
    const editName = document.getElementById("editName");
    const editDate = document.getElementById("editDate");
    const editDescription = document.getElementById("editDescription");
    const editStatus = document.getElementById("editStatus");
    let editingEventId = null;

    const fetchEvents = () => {
        fetch("http://localhost:5000/api/events")
            .then(response => response.json())
            .then(data => {
                eventsList.innerHTML = "";
                data.forEach(event => {
                    const card = `
                        <div class="card" data-id="${event.id}">
                            <h2>${event.name}</h2>
                            <p>Date: ${event.date}</p>
                            <p>${event.description}</p>
                            <p>Status: ${event.status}</p>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        </div>
                    `;
                    eventsList.insertAdjacentHTML("beforeend", card);
                });

                attachEventListeners();
            });
    };

    const attachEventListeners = () => {
        document.querySelectorAll(".edit-btn").forEach(button =>
            button.addEventListener("click", handleEdit)
        );
        document.querySelectorAll(".delete-btn").forEach(button =>
            button.addEventListener("click", handleDelete)
        );
    };

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
            });
    };

    const handleDelete = (e) => {
        const card = e.target.closest(".card");
        const id = card.dataset.id;

        if (confirm("Are you sure you want to delete this event?")) {
            fetch(`http://localhost:5000/api/events/${id}`, {
                method: "DELETE",
            })
                .then(response => response.json())
                .then(() => {
                    alert("Event deleted successfully!");
                    fetchEvents();
                });
        }
    };

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
        
            .then(response => response.json())
            .then(() => {
                alert("Event updated successfully!");
                editPopup.classList.add("hidden");
                fetchEvents();
            });
    });

    document.getElementById("cancelEdit").addEventListener("click", () => {
        editPopup.classList.add("hidden");
    });

    fetchEvents();
});
