import express from 'express'

const apiRoutes = require('./routes/api')

class App {
    public express

    constructor() {
        this.express = express()
        this.mountRoutes()
    }

    private mountRoutes(): void {
        this.express.use('/api/v1', apiRoutes)
    }
}

export default new App().express