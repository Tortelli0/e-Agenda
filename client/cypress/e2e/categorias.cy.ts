describe('Processo de crud de Categorias', () => {

  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-cy=login]').type('Teste2');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);

  });

  it('Deve redirecionar para Categorias', () => {
    cy.visit('/categorias/listar');

    cy.contains('Listagem de Categorias');
  });

  it('Deve Cadastrar uma Categoria', () => {
    cy.visit('/categorias/listar');


    cy.get('[data-cy=cadastrar]').click();

    cy.get('[data-cy=titulo]').type('testeTitulo');

    cy.get('[data-cy=submit]').click();

    cy.contains('Listagem de Categorias');
  });

  it('Deve Editar uma Categoria', () => {
    cy.visit('/categorias/listar');

    cy.get('[data-cy=editar]').first().click();

    cy.get('[data-cy=titulo]').clear().type('tituloEditado');

    cy.get('[data-cy=submit]').click();

    cy.contains('Listagem de Categorias');
  });

  it('Deve Excluir uma Categoria', () => {
    cy.visit('/categorias/listar');

    cy.get('[data-cy=excluir]').first().click();

    cy.get('[data-cy=submit]').click();

    cy.contains('Listagem de Categorias');
  });
});
