const Queue = require('bull');
const reservationQueue = new Queue('reservationQueue');

reservationQueue.process(async (job) => {
  try {
    const reservation = job.data;
    // logic to send the email
    console.log(`Processing reservation for room ${reservation.roomId}`);
  } catch (error) {
    console.error('Error processing reservation:', error);
  }
});


const addReservationToQueue = (reservation) => {
  reservationQueue.add(reservation);
};

module.exports = { addReservationToQueue };
