module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  });

  Reservation.associate = function(models) {
     // we can define associates
  };

  return Reservation;
};
