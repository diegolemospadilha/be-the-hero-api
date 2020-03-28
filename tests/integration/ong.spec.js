const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");
describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(() => {
    connection.destroy();
  });
  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "APAD ONG",
        email: "apad@contato.com.br",
        whatsapp: "11987339089",
        city: "Curitiba",
        uf: "PR"
      });
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
    expect(response.status).toBe(201);
  });
});
