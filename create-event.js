const form = document.getElementById('createEventForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    const formData = {
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value
    };

    try {
        const response = await fetch('http://localhost:5000/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Event added successfully!');
            form.reset(); // Clear the form
            // Optionally redirect to the events page
            window.location.href = 'events.html';
        } else {
            const errorData = await response.json();
            alert(`Failed to add event: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error adding event:', error);
        alert('An error occurred while adding the event.');
    }
});
