const request = require('supertest');
const app = require('../../app');

describe('Integration Tests - Tasks API', () => {
  it('Deve listar todas as tarefas (GET /tasks)', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Deve substituir todas as tarefas (POST /tasks)', async () => {
    const newTasks = [
      { id: 1, title: "Tarefa de teste", status: "todo" },
      { id: 2, title: "Outra tarefa", status: "in-progress" }
    ];

    const res = await request(app)
      .post('/tasks')
      .send(newTasks);

    expect(res.statusCode).toEqual(201);
    expect(res.body.ok).toEqual(true);
  });
});