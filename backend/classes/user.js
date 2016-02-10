var user = function (name, color, connection, id) {
    this.color = color;
    this.connection = connection;
    this.id = id;
    this.name = name;
};

module.exports = user;