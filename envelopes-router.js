const express = require('express')
const envelopesRouter = express.Router()
const {
    getAllEnvelopes,
    getEnvelopeById,
    addNewEnvelope,
    updateEnvelope,
    updateEnvelopeBalance,
    deleteEnvelope,
    transferBudget
} = require('./utils/utils.js')
const { envelopes } = require('./utils/data.js')


envelopesRouter.get('/', (req, res) => {
    const envelopes = getAllEnvelopes()
    res.status(200).json(envelopes)
})

envelopesRouter.get('/:id', (req, res) => {
    try {
        const envelope = getEnvelopeById(req.params.id)
        res.status(200).json(envelope)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

envelopesRouter.post('/', (req, res) => {
    try {
        const newEnvelope = addNewEnvelope(req.query)
        res.status(201).send(newEnvelope)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

envelopesRouter.put('/:id', (req, res) => {
    try {
        const updatedEnvelope = updateEnvelope(req.params.id, req.query)
        res.status(200).send({
            updatedEnvelope: updatedEnvelope
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
})

envelopesRouter.put('/:id/spend/', (req, res) => {
    try {
        const updatedEnvelope = updateEnvelopeBalance(req.params.id, req.query.amount)
        res.status(200).send({
            updatedEnvelope: updatedEnvelope
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
})

envelopesRouter.post('/transfer/:from/:to', (req, res) => {
    try {
        const tranfer = transferBudget(req.params.from, req.params.to, req.query.amount)
        res.status(200).send(tranfer)
    } catch (error) {
        res.status(403).send(error.message)
    }
})

envelopesRouter.delete('/:id', (req, res) => {
    try {
        const deleted = deleteEnvelope(req.params.id)
        res.status(200).send({
            envelope: deleted
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
})


module.exports = envelopesRouter