describe('Unit Tests', () => {
  it('Deve somar corretamente', () => {
    expect(5 + 3).toBe(8);
  });

  it('Deve verificar se uma string contém palavra', () => {
    expect('TaskFlow é ótimo').toContain('ótimo');
  });
});