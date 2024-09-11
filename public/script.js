const socket = io();

// Listen for the initial button counts when connected
socket.on('initialCounts', (counts) => {
    for (const buttonId in counts) {
        document.getElementById(buttonId.toLowerCase() + '-counter').textContent = counts[buttonId];
    }
});

// Add event listeners to each button to send the click event to the server
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        socket.emit('buttonClicked', button.id);
    });
});

// Listen for updates from the server for each button
socket.on('updateCount', ({ buttonId, count }) => {
    document.getElementById(buttonId.toLowerCase() + '-counter').textContent = count;
});