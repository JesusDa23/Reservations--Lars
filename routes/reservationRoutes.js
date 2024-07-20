const express = require('express');
const router = express.Router();
const reservationController = require('../controllers.js/reservationController');

router.post('/reservations', reservationController.createReservation);

module.exports = router;
