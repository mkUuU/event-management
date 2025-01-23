document.getElementById('profileImageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const profileData = {
        name: document.getElementById('name').value,
        bio: document.getElementById('bio').value,
        location: document.getElementById('location').value,
    };
    console.log('Updating profile:', profileData);
    // Here you would typically send this data to your server to update the profile
    alert('Profile updated successfully!');
});

// Sample user events data
const userEvents = [
    { name: 'Tech Conference 2023', date: 'June 15, 2023' },
    { name: 'Marketing Workshop', date: 'July 10, 2023' },
];

function renderUserEvents() {
    const userEventsContainer = document.getElementById('userEvents');
    userEventsContainer.innerHTML = '';
    userEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'card';
        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.date}</p>
        `;
        userEventsContainer.appendChild(eventCard);
    });
}

// Initial render of user events
renderUserEvents();

