describe('Processo de crud de Compromissos', () => {

  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-cy=login]').type('Teste2');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);
  });

  it('Deve redirecionar para Compromissos', () => {
    cy.visit('/compromissos/listar');

    cy.contains('Listagem de Compromissos');
  });

  it('Deve Cadastrar um Compromisso', () => {

    cy.visit('/compromissos/listar');

    cy.get('[data-cy=cadastrar]').click();

    cy.get('[data-cy=assunto]').type('teste');

    cy.get('[data-cy=tipoLocal]').click();
    cy.get('[data-cy-select-option]').first().click();

    // cy.get('[data-cy=local]').type('');

    cy.get('[data-cy=link]').type('www.google.com');

    // cy.get('[data-cy=data]').type('31122024');

    cy.get('[data-cy=horaInicio]').type('15:00');

    cy.get('[data-cy=horaTermino]').type('17:00');

    cy.get('[data-cy=contatoId]').click().first();
    cy.get('[data-cy-select-option]').first().click();

    cy.get('[data-cy=submit]').click();

    cy.contains('Listagem de Compromissos');
  });

  it('Deve Editar um Compromisso', () => {
    cy.visit('/compromissos/listar');

    cy.get('[data-cy=editar]').first().click();

    cy.get('[data-cy=assunto]').clear().type('assuntoEditado');

    cy.get('[data-cy=submit]').click();

    cy.contains('Listagem de Compromissos');
  });

  it('Deve Excluir um Compromisso', () => {
    cy.visit('/compromissos/listar');

    cy.get('[data-cy=excluir]').first().click();

    cy.get('[data-cy=submit]').click();

    cy.contains('Listagem de Compromissos');
  });
});
