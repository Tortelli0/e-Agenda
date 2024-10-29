describe('Processo de crud de Contato', () => {

  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-cy=login]').type('Teste2');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);
  });

  it('Deve redirecionar para Contatos', () => {
    cy.visit('/contatos/listar');

    cy.contains('Listagem de Contatos');
  });

  it('Deve Cadastrar um Contato', () => {
    cy.visit('/contatos/listar');

    cy.get('[data-cy=cadastrar]').click();

    cy.get('[data-cy=nome]').type('teste');

    cy.get('[data-cy=email]').type('teste@gmail.com');

    cy.get('[data-cy=telefone]').type('49 9999-9899');

    cy.get('[data-cy=empresa]').type('Testes');

    cy.get('[data-cy=cargo]').type('CEO');

    cy.get('[data-cy=submit]').first().click();

    cy.contains('Listagem de Contatos');
  });

  it('Deve Editar um Contato', () => {
    cy.visit('/contatos/listar');

    cy.get('[data-cy=editar]').first().click();

    cy.get('[data-cy=nome]').clear().type('testeEditado');

    cy.get('[data-cy=email]').clear().type('testeEditado@gmail.com');

    cy.get('[data-cy=telefone]').clear().type('49 9999-9899');

    cy.get('[data-cy=empresa]').clear().type('TestesEditados');

    cy.get('[data-cy=cargo]').clear().type('CEOEditados');

    cy.get('[data-cy=submit]').click();

    cy.contains('Listagem de Contatos');
  });

  it('Deve Excluir um Contato', () => {
    cy.visit('/contatos/listar');

    cy.get('[data-cy=excluir]').last().click();

    cy.get('[data-cy=submit]').click();

    cy.contains('Listagem de Contatos');
  });
});
