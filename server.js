const express = require('express')
const app  =  express()
const PORT  = 3000
const envelopesRouter = require('./envelopes-router.js')
const transactionsRouter = require('./transactions-router.js')
const bodyParser = require('body-parser')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const path = require('path')
const swaggerDefinition = {
    openapi: "3.0.3",
    info: {
        title: "Personal Budget API",
        description: "This is an API that enables users to create and manage their personal budgets using the famous [Envelope Budgeting principles](https://www.thebalancemoney.com/what-is-envelope-budgeting-1293682)",
        termsOfService: "http://swagger.io/terms/",
        contact: {
            email: "abdihakim.muhumedo@gmail.com"
        },
        license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html"
        },
        version: "1.0.0"
    },
    externalDocs: {
        description: "Find out more about Personal Budget API here",
        url: "https://github.com/Abdihakim-Muhumed/my-pf-api",
        servers:{
            url: "http://localhost/3000"
        }
    }
}
const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, './docs/swagger.yaml')]
}
const swaggerSpec = swaggerJsDoc(options)

app.use('/doc',swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/envelopes', envelopesRouter)
app.use('/transactions', transactionsRouter)
app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.use(bodyParser.json())
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}/`)
})