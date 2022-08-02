describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'S Sub',
      username: 'ssub',
      password: 'bradada'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })


  it('login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    
    it('fails with wrong credentials', function() {
      cy.get('input:first').type('agwqeaewq')
      cy.get('input:last').type('eqwfqefeqw')
      cy.contains('login').click()
      cy.contains('Wrong credentials')
    })


    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('ssub')
      cy.get('input:last').type('bradada')
      cy.contains('login').click()
      cy.contains('S Sub logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({username: 'ssub', password: 'bradada'})
      cy.createBlog({
        title: 'coolbeans',
        author: 'ssub',
        url: 'misc',
        likes: 0
      })
    })
  
    it('a blog can be liked', function() {
      cy.contains('coolbeans') 
      cy.contains('view').click()
      cy.get('.likeButton').click()
      cy.contains('likes 1')
    })

    it('a blog can be deleted', function() {
      cy.contains('view').click()
      cy.get('.deleteButton').click()
      cy.contains('coolbeans').should('not.exist')
    })
  })

  describe('with multiple blogs', function() {
    beforeEach(function() {
      cy.login({username: 'ssub', password: 'bradada'})
      cy.createBlog({
        title: 'coolbeans',
        author: 'ssub',
        url: 'misc',
        likes: 5
      })
      cy.createBlog({
        title: 'coolbeans2',
        author: 'ssub',
        url: 'misc',
        likes: 10
      })
      cy.createBlog({
        title: 'coolbeans3',
        author: 'ssub',
        url: 'misc',
        likes: 20
      })
    })
  
    it('each blog is sorted by likes', function() {
      cy.contains('coolbeans') 
      cy.get('.blog').eq(0).should('contain', 'coolbeans3')
      cy.get('.blog').eq(1).should('contain', 'coolbeans2')
      cy.get('.blog').eq(2).should('contain', 'coolbeans')
    })

  })

})