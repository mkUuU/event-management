const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db'
};
const SECRET_KEY = ''

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

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0) return res.status(401).json({ message: 'Invalid username or password' });

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(401).json({ message: 'Invalid username or password' });

        const token = jwt.sign({ id: user.rows[0].id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Middleware to Protect Routes
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Logout Route (Optional: Token Invalidation)
router.post('/logout', (req, res) => {
    // Typically, you'll handle this client-side by clearing the token.
    res.json({ message: 'Logout successful' });
});

module.exports = router;

app.get('/api/events', authenticateToken, async (req, res) => {
    const [rows] = await db.promise().query('SELECT * FROM events');
    res.json(rows);
});


// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
