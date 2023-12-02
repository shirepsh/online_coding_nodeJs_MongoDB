require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// connect to the right DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const codeBlockSchema = new mongoose.Schema({
  title: String,
  code: String,
  solution: String,
});

// connect to the right collection
const CodeBlock = mongoose.model('codeblocks', codeBlockSchema);

// set the template engine
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');
app.use(express.static('public'));

// set the Lobby path and rendring the hbs file & the data
app.get('/', async (req, res) => {
  try {
    const codeBlocks = await CodeBlock.find().lean();
    console.log('Fetched code blocks:', codeBlocks);
    res.render('Lobby', { codeBlocks });
  } catch (error) {
    console.error('Error fetching code blocks:', error);
    res.status(500).send('Internal Server Error');
  }
});

// set the codeBlock path and rendring the hbs file & data
app.get('/code/:id', async (req, res) => {
  try {
    const codeBlock = await CodeBlock.findById(req.params.id).lean();

    if (!codeBlock) {
      return res.status(404).send('Code block not found');
    }

    console.log('Fetched code block:', codeBlock);
    res.render('codeBlock', { codeBlock });
  } catch (error) {
    console.error('Error fetching code block:', error);
    res.status(500).send('Internal Server Error');
  }
});

// set the socket
io.on('connection', (socket) => {
  socket.on('join', (room) => {
    console.log(`${room} room  number`)
    socket.join(room);

    // define the user's role based on the number of clients in the room
    const clientsInRoom = io.sockets.adapter.rooms.get(room);
    const isMentor = clientsInRoom.size === 1;

    socket.emit('role-assigned', isMentor ? 'mentor' : 'student');
  });

  socket.on('code-change', (data) => {
    io.to(data.room).emit('code-change', data.codeData);
  });
});

// server.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// use process.env.PORT for dynamic port assignment
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
