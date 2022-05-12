const {sequelize} = require('./db')
const {Cheese, Board, User} = require('./index')

describe('Cheese Board tests', () => {
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the 
    // test suite is run
    await sequelize.sync({ force: true });
  })

  test('Should be able to create a cheese instance', async () => {
    const newCheese = await Cheese.create({
      title: "Brie",
      description: "Soft french cheese"
    })

    expect(newCheese.title).toBe("Brie")
    expect(newCheese.description).toBe("Soft french cheese")
  })
  test('Should be able to create a board instance', async () => {
    const newBoard = await Board.create({
      type: "Soft",
      description: "Selection of soft cheeses",
      rating: 9.8
    })

    expect(newBoard.type).toBe("Soft")
    expect(newBoard.rating).toBe(9.8)
  })
  test('Should be able to create a User instance', async () => {
    const newUser = await User.create({
      name: "jax",
      email: "jaxmcguire@gmail.com"
    })

    expect(newUser.name).toBe("jax")
    expect(newUser.email).toBe("jaxmcguire@gmail.com")
  })
  test('A board can be loaded with its cheeses', async () => {
    const board1 = await Board.findByPk(1)
    const cheese1 = await Cheese.findByPk(1)

    await board1.addCheese(cheese1)
    
    const boardWithCheese = await Board.findByPk(1, {
      include: [
        {model: Cheese, as: "Cheeses"}
      ]
    })
    expect(boardWithCheese.Cheeses[0].dataValues.title).toBe('Brie')
  })
  test('A user can be loaded with its boards', async () => {
    const user1 = await User.findByPk(1)
    const board1 = await Board.findByPk(1)

    await user1.addBoard(board1)

    const userWithBoard = await User.findByPk(1, {
      include: [
        {model: Board, as: "Boards"}
      ]
    })
    expect(userWithBoard.Boards[0].dataValues.type).toBe('Soft')

  })
  test('A cheese can be loaded with board data', async () => {
    const board1 = await Board.findByPk(1)
    const cheese1 = await Cheese.findByPk(1)

    await cheese1.addBoard(board1)
    
    const cheeseWithBoard = await Cheese.findByPk(1, {
      include: [
        {model: Board, as: "Boards"}
      ]
    })
    expect(cheeseWithBoard.Boards[0].dataValues.type).toBe('Soft')
  })
})