const EventEmitter = require('events');
const reservationQueue = require('../quees/reservationQueue');

const eventEmitter = new EventEmitter();

const emitReservationEvent = (reservation) => {
  eventEmitter.emit('newReservation', reservation);
};

eventEmitter.on('newReservation', (reservation) => {
  reservationQueue.addReservationToQueue(reservation);
});

module.exports = { emitReservationEvent };
