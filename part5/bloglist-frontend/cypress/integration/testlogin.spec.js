
describe('login tests js', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', { name: 'testman', username: 'test', password: 'test' })
        cy.visit('http://localhost:3000')
        cy.get('.loginForm').as('loginForm')
        cy.get('#username').as('username')
        cy.get('#password').as('password')
    })

    it('Login form is shown', () => {
        cy.get('@loginForm')
            .should('contain', 'username')
            .should('contain',  'password')
        cy.get('@username')
        cy.get('@password')
        cy.contains('Bloglist: A list of your favourite blogs!')
    })

    it('Successful user login', () => {
        cy.get('@username').type('test')
        cy.get('@password').type('test')
        cy.get('.loginForm button').click()
        expect(cy.get('h2').contains('testman is logged in'))
    })

    it('Failed user login', () => {
        cy.get('@username').type('test')
        cy.get('@password').type('dpd')
        cy.get('.loginForm button').click()
        // expect(cy.get('h2').to.not.equal('testman is logged in'))
        cy.get('#notificationMessage')
            .should('contain', 'Username or password incorrect')
            // .should('have.css', 'color: red')
    })
})

