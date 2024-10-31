describe('Processo de crud de Tarefas', () => {

  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-cy=login]').type('Teste2');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);

  });

  it('Deve redirecionar para Tarefas', () => {
    cy.visit('/tarefas/listar');

    cy.contains('Listagem de Tarefas');
  });

  it('Deve Cadastrar uma Tarefa', () => {
    cy.visit('/tarefas/listar');

    cy.get('[data-cy=cadastrar]').click();

    cy.get('[data-cy=titulo]').type('testeTitulo');

    cy.get('[data-cy=prioridade]').click();
    cy.get('[data-cy-select-option]').first().click();

    cy.get('[data-cy=tituloItem]').type('teste');

    cy.get('[data-cy=botaoAdd]').click();

    cy.get('[data-cy=submit]').click();

    cy.contains('Listagem de Tarefas');
  });

  it('Deve Editar uma Tarefa', () => {
    cy.visit('/tarefas/listar');

    cy.get('[data-cy=editar]').first().click();

    cy.get('[data-cy=titulo]').clear().type('tituloEditado');

    cy.get('[data-cy=submit]').click();

    cy.contains('Listagem de Tarefas');
  });

  it('Deve Excluir uma Tarefa', () => {
    cy.visit('/tarefas/listar');

    cy.get('[data-cy=excluir]').first().click();

    cy.get('[data-cy=submit]').click();

    cy.contains('Listagem de Tarefas');
  });
});
