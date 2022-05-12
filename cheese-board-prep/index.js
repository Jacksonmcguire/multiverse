const {sequelize, Sequelize} = require('./db')

const User = sequelize.define('User', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
})

const Board = sequelize.define('Board', {
  type: Sequelize.STRING,
  description: Sequelize.STRING,
  rating: Sequelize.INTEGER
})

const Cheese = sequelize.define('Cheese', {
  title: Sequelize.STRING,
  description: Sequelize.STRING
})

const CheeseBoards = sequelize.define('CheeseBoards', {
  CheeseId: {
    type: Sequelize.INTEGER,
    references: {
      model: Cheese,
      key: 'id'
    }
  },
  BoardId: {
    type: Sequelize.INTEGER,
    references: {
      model: Board,
      key: 'id'
    }
  }
})

User.hasMany(Board)
Board.belongsTo(User)

Board.belongsToMany(Cheese, {through: "CheeseBoards"})
Cheese.belongsToMany(Board, {through: "CheeseBoards"})

module.exports = {
  User,
  Cheese,
  Board
}