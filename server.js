const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000
const io = require('socket.io')(4000, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

app.use(express.static(path.join(__dirname, 'client', 'dist')))

let unasignedUsers = [];
let pairs = {}

io.on('connection', socket => {
  socket.send('This is a message from server!')

  socket.on('new user', newUserId => {
    if (unasignedUsers.length < 1) {
      unasignedUsers.push(newUserId)
    } else {
      let partnerId = unasignedUsers.pop();

      let randomSign = Math.random() < 0.5;
      io.to(newUserId).emit('partnerId', partnerId);
      io.to(newUserId).emit('sign', randomSign ? 'X' : 'O');
      pairs[newUserId] = partnerId;

      io.to(partnerId).emit('partnerId', newUserId);
      io.to(partnerId).emit('sign', randomSign ? 'O' : 'XS');
      pairs[partnerId] = newUserId;
    }
  })

  socket.on('turn', (args) => {
    const [i, j, partnerId] = args;
    io.to(partnerId).emit('turn', args)
  })

  socket.on('disconnect', () => {
    let partnerId = pairs[socket.id]
    io.to(partnerId).emit('partner left')
    delete pairs[socket.id];
    delete pairs[partnerId];
    unasignedUsers = unasignedUsers.filter(id => id !== socket.id)
  })
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})