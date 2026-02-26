import express from 'express'

import { ENV } from './libs/env.js'
import connectDB from './libs/db.js'

const app = express();


connectDB().then( () => {
    app.listen( ENV.PORT, () => {
        console.log(`Server running on port ${ENV.PORT}`)
    } )
})