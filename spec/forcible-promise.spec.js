import { forciblePromise } from '../src/forcible-promise'

describe('Forcible Promise', function() {
  describe('when base Promise is still pending', function() {
    beforeEach(function(done) {
      this.basePromise = new Promise((resolve, reject) => {})
      this.isRejected = false
      this.isResolved = false
      this.forcibilePromise = forciblePromise(this.basePromise)

      this.forcibilePromise
        .then(() => {
          this.isResolved = true
        })
        .catch(() => {
          this.isRejected = true
        })

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
      this.basePromise = Promise.resolve()
      this.isRejected = false
      this.isResolved = false
      this.forcibilePromise = forciblePromise(this.basePromise)

      this.forcibilePromise
        .then(() => {
          this.isResolved = true
        })
        .catch(() => {
          this.isRejected = true
        })

      done()
    })

    it('should resolve the forcible Promise too', function() {
      expect(this.isResolved).toEqual(true)
    })
  })

  describe('when base Promise rejects', function() {
    beforeEach(function(done) {
      this.basePromise = Promise.reject()
      this.isRejected = false
      this.isResolved = false
      this.forcibilePromise = forciblePromise(this.basePromise)

      this.forcibilePromise
        .then(() => {
          this.isResolved = true
        })
        .catch(() => {
          this.isRejected = true
        })

      done()
    })

    it('should reject the forcible Promise too', function() {
      expect(this.isRejected).toEqual(true)
    })
  })
})
