const { Reservation } = require('../models');
const { emitReservationEvent } = require('../events/reservationEvents');

exports.createReservation = async (req, res) => {
  const { roomId, userId, startDate, endDate, version } = req.body;

  let transaction;

  try {
    transaction = await Reservation.sequelize.transaction();

    const latestReservation = await Reservation.findOne({
      where: { roomId },
      order: [['createdAt', 'DESC']],
      transaction
    });

    if (latestReservation && latestReservation.version !== version) {
      throw new Error('Conflicto de versión. Intente de nuevo.');
    }

    const reservation = await Reservation.create({
      roomId,
      userId,
      startDate,
      endDate,
      version: (version || 0) + 1
    }, { transaction });

    await transaction.commit();
    emitReservationEvent(reservation);
    res.status(201).json(reservation);
  } catch (error) {
    if (transaction) await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};
