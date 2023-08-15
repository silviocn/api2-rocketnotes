const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute( {name, email, password}) {
    //const userRepository = new UserRepository();
    //const database = await sqliteConnection();
    //const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]) // the "?" is to save place to [email]
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("E-mail already being used");
    }

    const hashedPassword = await hash(password, 8); // number 8 is the complexity factor (SALT)

    // await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

    const userCreated = await this.userRepository.create({ name, email, password: hashedPassword });

    return userCreated;
  }
}

module.exports = UserCreateService;