import durex from '@gem-mine/durex'
import request from '@gem-mine/request'

const { demo } = request

durex.model({
  name: 'demo',
  state: {
    count: 5
  },
  reducers: {
    change(n) {
      return this.setField({
        count: (prev) => prev + n
      })
    },
    reset() {
      return this.setField({
        data: undefined,
        status: undefined
      })
    },
    success(data) {
      return this.setField({
        status: 'success',
        data
      })
    }
  },
  effects: {
    successGet() {
      this.actions.reset()
      demo.get('/user/101').then(this.actions.success)
    },
    failureGet() {
      this.actions.reset()
      demo.get('/user/0').then(this.actions.success)
    },
    loadingGet() {
      this.actions.reset()
      demo
        .get('/user/102', {
          params: {
            sleep: 3500
          }
        })
        .then(this.actions.success)
    },
    successPost() {
      this.actions.reset()
      demo.post('/user').then(this.actions.success)
    },
    customErrorGet() {
      this.actions.reset()
      demo
        .get('/user/0', {
          customError: true
        })
        .catch((e) => {
          this.setField({
            status: 'failure(custom)',
            data: e.data
          })
        })
    }
  }
})
