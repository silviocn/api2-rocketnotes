const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => { // describe is used to group tests (better one per archive)
  let userRepositoryInMemory = null; // need to be 'let' because you want to change the value later
  let userCreateService = null;
  
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });
    
  it("user should be created", async () => { 
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    };
   
    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty("id");

  });

  it("user shouldn't be create with existing email", async () => {
    const user1 = {
      name: "User Test 1",
      email: "user@test.com",
      password: "123"
    };
    
    const user2 = {
      name: "User Test 2",
      email: "user@test.com",
      password: "456"
    };

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("E-mail already being used"));
    // you expect that the code is gone have a rejection and that the message is equal to this one above

  });
});