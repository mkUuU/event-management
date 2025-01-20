document.getElementById('createEventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const eventData = {
        name: document.getElementById('eventName').value,
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        location: document.getElementById('eventLocation').value,
        maxParticipants: document.getElementById('maxParticipants').value,
        description: document.getElementById('eventDescription').value,
    };
    console.log('Event created:', eventData);
    // Here you would typically send this data to your server to create the event
    // For now, we'll just log it and redirect to the events page
    alert('Event created successfully!');
    window.location.href = 'events.html';
});

