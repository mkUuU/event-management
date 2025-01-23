const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let events = [
    { id: 1, name: "Tech Conference 2023", date: "June 15, 2023", description: "A conference for tech enthusiasts.", status: "Completed" },
    { id: 2, name: "Marketing Workshop", date: "July 10, 2023", description: "Learn marketing strategies.", status: "Upcoming" },
    { id: 3, name: "AI Summit", date: "August 20, 2023", description: "Exploring AI advancements.", status: "Upcoming" },
];

// Endpoint to get all events
app.get('/api/events', (req, res) => {
    res.json(events);
});

// Endpoint to get a specific event by ID
app.get('/api/events/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
});

// Endpoint to search for events by name
app.get('/api/events/search', (req, res) => {
    const query = req.query.q;
    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(query.toLowerCase())
    );
    res.json(filteredEvents);
});

// Endpoint to create a new event
app.post('/api/events', (req, res) => {
    const { name, date, description, status } = req.body;

    if (!name || !date || !description || !status) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newEvent = {
        id: events.length + 1, // Simple ID generation (replace with UUID in real apps)
        name,
        date,
        description,
        status
    };

    events.push(newEvent); // Add the new event to the list
    res.status(201).json(newEvent); // Respond with the created event
});


// Endpoint to update an event
app.put('/api/events/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Update event properties
    event.name = req.body.name || event.name;
    event.date = req.body.date || event.date;
    event.description = req.body.description || event.description;
    event.status = req.body.status || event.status;

    res.json(event);
});


// Endpoint to delete an event
app.delete('/api/events/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) return res.status(404).json({ message: "Event not found" });

    events = events.filter(e => e.id !== event.id);
    res.json({ message: "Event deleted successfully" });
});


// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
