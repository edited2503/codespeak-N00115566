const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 1000;
const people = [];
var express = require('express');

app.use(express.static('public'))

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/php', (req, res) => {
    res.sendFile(__dirname + '/public/php.html');
});

app.get('/javascript', (req, res) => {
    res.sendFile(__dirname + '/public/javascript.html');
});

app.get('/css', (req, res) => {
    res.sendFile(__dirname + '/public/css3.html');
});

app.get('/java', (req, res) => {
    res.sendFile(__dirname + '/public/java.html');
});

app.get('/laravel', (req, res) => {
    res.sendFile(__dirname + '/public/laravel.html');
});

app.get('/vue', (req, res) => {
    res.sendFile(__dirname + '/public/vue.html');
});



// coding language namespace
const language = io.of('/language');

language.on('connection', (socket) => {
    
	socket.on('join', (data) => {
        socket.join(data.room);
        language.in(data.room).emit('message', `New user joined ${data.room} room!`);
    })

    socket.on('message', (data) => {
        console.log(`message: ${data.msg}`);
        language.in(data.room).emit('message', data.msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');

        language.emit('message', 'user disconnected');
    })
})






