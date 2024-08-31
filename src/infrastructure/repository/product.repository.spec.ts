import { Sequelize } from "sequelize-typescript";

describe('Product respository test', () => {
  let sequileze: Sequelize;

  beforeAll(async () => {
    sequileze = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    
    afterEach(async () => {
      await sequileze.close();
    })
  })

})