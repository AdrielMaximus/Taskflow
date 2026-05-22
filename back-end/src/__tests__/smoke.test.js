const request = require("supertest");
const app = require("../app");

describe("Smoke Tests", () => {
  it("Aplicação deve estar saudável", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("healthy");
    expect(res.body.service).toEqual("taskflow-backend");
  });
});
