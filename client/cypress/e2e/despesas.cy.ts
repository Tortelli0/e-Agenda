describe('Processo de crud de Despesas', () => {

  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-cy=login]').type('Teste2');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);

  });

  it('Deve redirecionar para Despesas', () => {
    cy.visit('/despesas/listar');

    cy.contains('Listagem de Despesas');
  });

  it('Deve Cadastrar uma Despesa', () => {
    cy.visit('/categorias/listar');

    cy.get('[data-cy=cadastrar]').click();

    cy.get('[data-cy=titulo]').type('testeTitulo');

    cy.get('[data-cy=submit]').click();

    cy.contains('Listagem de Categorias');

    cy.visit('/despesas/listar');

    cy.get('[data-cy=cadastrar]').click();

    cy.get('[data-cy=descricao]').type('testeDescricao');

    cy.get('[data-cy=valor]').type('40');

    cy.get('[data-cy=formaPagamento]').click();
    cy.get('[data-cy-select-option]').first().click();

    cy.get('[data-cy=categoriasSelecionadas]').click();
    cy.get('[data-cy-select-option]').first().click();

    cy.get('[data-cy=categoriasSelecionadas]').focus().type('{esc}');

    cy.wait(2000);

    cy.get('button[type=submit]').click();

    cy.contains('Listagem de Despesas');
  });

  it('Deve Editar uma Despesa', () => {
    cy.visit('/despesas/listar');

    cy.get('[data-cy=editar]').first().click();

    cy.get('[data-cy=descricao]').clear().type('descricaoEditada');

    cy.get('button[type=submit]').click();

    cy.contains('Listagem de Despesas');
  });

  it('Deve Excluir uma Despesa', () => {
    cy.visit('/despesas/listar');

    cy.get('[data-cy=excluir]').first().click();

    cy.get('[data-cy=submit]').click();

    cy.contains('Listagem de Despesas');
  });
});
