describe('When user logged in', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', { name: 'testman', username: 'test', password: 'test' })
        cy.login({ username: 'test', password: 'test' })
    })

    afterEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
    })
    it('A blog can be created', () => {
        expect(cy.get('h2').contains('testman is logged in'))
        cy.contains('New blog').click()
        cy.get('#title').type('test')
        cy.get('#author').type('test')
        cy.get('#url').type('test')
        cy.contains('Create').click()
        cy.contains('test by test')
    })

    it('User can like a blog', () => {
        cy.createBlog({ url: 'test', author: 'test', title: 'test' })
        cy.contains('Show').click()
        cy.contains('Like').click()
        cy.contains('likes: 1')
    })

    it('User can delete their posts', () => {
        cy.createBlog({ url: 'test', author: 'test', title: 'test' })
        cy.contains('Show').click()
        cy.contains('Delete').click()
        cy.get('#blogComponent').should('not.exist')
    })

    it('User can only delete their posts', () => {
        cy.createBlog({ url: 'This should not be deleted', author: 'testman', title: 'test' })
        cy.logout()
        cy.request('POST', 'http://localhost:3003/api/users', { name: 'freshuser', username: 'fresh', password: 'fresh' })
        cy.login({ username: 'fresh', password: 'fresh' })
        cy.contains('Show').click()
        cy.contains('Delete').click()
        cy.get('#notificationMessage')
            .should('contain', 'Only creator of blog has delete privellage')
    })

    it('Blogs are ordered by likes', () => {
        let likesArray = []
        for (let i = 0; i < 5; i++) {
            cy.createBlog({ url: 'Testing the ordering mechanics', author: 'testman',
                title: 'Testing the ordering mechanics' })
        }
        cy.get('.showButton').each( (item, index) => {
            cy.wrap(item).click()
        })
        cy.get('.likeButton').each( (item, index) => {
            for (let j = 0; j < (Math.random() * (10 - 0 + 1) ) << 0; j++) {
                cy.wrap(item).click()
            }
        })
        cy.get('.likeText').each((item) => {
            cy.wrap(item).invoke('text').as('selectedText')// for input or textarea, .invoke('val')
            cy.get('@selectedText').then((text) => {
                likesArray.push(parseInt(text.split(':')[1]))
            })
        })
        cy.request('GET', 'http://localhost:3003/api/blogs').then((res) => {
            const sortedList = res.body.map(item => item.likes).sort((a, b) => {
                if (a > b) {
                    return -1
                }
                if (b > a) {
                    return 1
                }
                return 0
            })
            expect(likesArray).to.have.ordered.members(sortedList)
        })
    })
})