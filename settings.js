document.getElementById('accountSettingsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('newPassword').value;
    console.log('Updating account settings:', { email, newPassword });
    // Here you would typically send this data to your server to update the account
    alert('Account settings updated successfully!');
});

document.getElementById('emailNotifications').addEventListener('change', function(e) {
    console.log('Email notifications:', e.target.checked);
    // Here you would typically send this preference to your server
});

document.getElementById('pushNotifications').addEventListener('change', function(e) {
    console.log('Push notifications:', e.target.checked);
    // Here you would typically send this preference to your server
});

document.getElementById('privateProfile').addEventListener('change', function(e) {
    console.log('Private profile:', e.target.checked);
    // Here you would typically send this preference to your server
});

