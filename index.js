const express = require('express');
const app = express();
const PORT = process.env.PORT || 3011;
const morgan = require('morgan');

let guests = [{
  name: 'Isaac Morgenstern',
  bring: 'vodka'
}, {
  name: 'Adam Cooper',
  bring: 'Jägermeister'
}, {
  name: 'Steven van Woerkom',
  bring: "O'Doul's"
}];

app.use(morgan('combined'));
app.use(express.json()); // Body-parser functionality

app.get('/', (request, response) => {
  response.send('RESTful guests: Slash route works.');
});

// Read (all)
app.get('/guests', (request,response) => {
  response.send(guests);
});

// Read (individual)
app.get('/guests/:guestId', (request, response) => {
  const index = parseInt(request.params.guestId);
  response.send(guests[index].name);
});

// Create
app.post('/guests', (request, response) => {
  guests.push({
    name: request.body.name,
    bring: request.body.bring
  });
  response.send(guests);
});

// Update
app.put('/guests/:guestId', (request, response) => {
  const index = parseInt(request.params.guestId);
  let guest = guests[index];
  /* Refactor:
     1. Iterate over the request.body to check all the keys, or
     2. Leverage ES6 to update the guest object.
  */
  if (request.body.name) {
    guest.name = request.body.name;
  }
  if (request.body.bring) {
    guest.bring = request.body.bring;
  }
  guests[index] = guest;
  response.send(guests[index]);
});

// Delete
app.delete('/guests/:guestId', (request, response) => {
  const index = parseInt(request.params.guestId);
  let deleted = guests.splice(index, 1); // deleted is an array
  response.send(deleted[0]);
});

app.listen( PORT, () => {
  console.log(`RESTful guests: Listening on port no. ${PORT}`);
});
