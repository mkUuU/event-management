const events = [
    {
        id: 1,
        name: 'Tech Conference 2023',
        date: 'June 15, 2023',
        location: 'San Francisco, CA',
        participants: 250,
        description: 'Annual technology conference featuring the latest innovations.',
    },
    {
        id: 2,
        name: 'Marketing Workshop',
        date: 'July 10, 2023',
        location: 'New York, NY',
        participants: 100,
        description: 'Hands-on workshop for digital marketing professionals.',
    },
    {
        id: 3,
        name: 'Startup Pitch Night',
        date: 'August 5, 2023',
        location: 'Austin, TX',
        participants: 150,
        description: 'Exciting event where startups pitch their ideas to investors.',
    },
];

function renderEvents(eventsToRender) {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';
    eventsToRender.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'card';
        eventCard.innerHTML = `
            <h2>${event.name}</h2>
            <p>${event.description}</p>
            <p>Date: ${event.date}</p>
            <p>Location: ${event.location}</p>
            <p>Participants: ${event.participants}</p>
        `;
        eventsList.appendChild(eventCard);
    });
}

document.getElementById('searchEvents').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm)
    );
    renderEvents(filteredEvents);
});

// Initial render
renderEvents(events);

