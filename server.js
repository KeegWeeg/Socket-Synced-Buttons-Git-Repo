const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

const buttonCounts = {
    thisrevin: 0,
    benjy: 0,
    cash: 0,
    keira: 0,
    bayleigh: 0
};



// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

      // Send current button counts to the newly connected user
      socket.emit('initialCounts', buttonCounts);

      // Handle button clicks from the client
      socket.on('buttonClicked', (buttonId) => {
          // Increment the count for the clicked button
          buttonCounts[buttonId]++;

          io.emit('updateCount', { buttonId, count: buttonCounts[buttonId] });
        });
    
    

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Handle other routes (if any)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});