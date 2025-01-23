document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createEventForm');
    const eventDateInput = document.getElementById('eventDate');
    const formMessage = document.getElementById('formMessage');

    // Ensure the date input does not accept past dates
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.setAttribute('min', today);

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Clear previous messages
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        // Validate form fields
        const eventName = document.getElementById('eventName').value.trim();
        const eventDate = eventDateInput.value;
        const eventDescription = document.getElementById('eventDescription').value.trim();
        const status = document.getElementById('status').value;

        if (eventName.length < 3 || eventName.length > 100) {
            formMessage.textContent = 'Event name must be between 3 and 100 characters.';
            formMessage.className = 'form-message error';
            return;
        }

        if (!eventDate) {
            formMessage.textContent = 'Event date is required.';
            formMessage.className = 'form-message error';
            return;
        }

        if (new Date(eventDate) < new Date(today)) {
            formMessage.textContent = 'Event date cannot be in the past.';
            formMessage.className = 'form-message error';
            return;
        }


        if (eventDescription.length < 10 || eventDescription.length > 500) {
            formMessage.textContent = 'Event description must be between 10 and 500 characters.';
            formMessage.className = 'form-message error';
            return;
        }

        // If validation passes, send data to the backend
        const eventData = {
            name: eventName,
            date: eventDate,
            description: eventDescription,
            status: status
        };

        try {
            const response = await fetch('http://localhost:5000/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            formMessage.textContent = 'Event created successfully!';
            formMessage.className = 'form-message success';

            console.log('Event created:', data);

            // Optionally clear the form
            form.reset();
            eventDateInput.setAttribute('min', today); // Reset min date after form reset
        } catch (error) {
            console.error('Error creating event:', error);
            formMessage.textContent = 'Failed to create event. Try again.';
            formMessage.className = 'form-message error';
        }
    });
});
