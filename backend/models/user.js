'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    mobile_number: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};