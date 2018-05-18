import { forciblePromise } from '../src/forcible-promise'

function setUpForcible(basePromise) {
  this.isRejected = false
  this.isResolved = false
  this.forcibilePromise = forciblePromise(basePromise)

  this.forcibilePromise
    .then(() => {
      this.isResolved = true
    })
    .catch(() => {
      this.isRejected = true
    })
}

describe('Forcible Promise', function() {
  beforeEach(function() {
    this.setUpForcible = setUpForcible.bind(this);
  })

  describe('when base Promise is still pending', function() {
    beforeEach(function(done) {
      const basePromise = new Promise((resolve, reject) => {})
      this.setUpForcible(basePromise);

      done()
    })

    describe('when forceReject is called', function() {
      beforeEach(function(done) {
        this.forcibilePromise.forceReject()

        done()
      })

      it('should force the Promise reject', function() {
        expect(this.isRejected).toEqual(true)
      })
    })

    describe('when forceResolve is called', function() {
      beforeEach(function(done) {
        this.forcibilePromise.forceResolve()

        done()
      })

      it('should force the Promise resolve', function() {
        expect(this.isResolved).toEqual(true)
      })
    })
  })

  describe('when base Promise resolves', function() {
    beforeEach(function(done) {
      const basePromise = Promise.resolve()
      this.setUpForcible(basePromise);

      done()
    })

    it('should resolve the forcible Promise too', function() {
      expect(this.isResolved).toEqual(true)
    })
  })

  describe('when base Promise rejects', function() {
    beforeEach(function(done) {
      const basePromise = Promise.reject()
      this.setUpForcible(basePromise);

      done()
    })

    it('should reject the forcible Promise too', function() {
      expect(this.isRejected).toEqual(true)
    })
  })
})
