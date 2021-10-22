import fp from "fastify-plugin";
import mongodb, { FastifyMongodbOptions } from 'fastify-mongodb'

export default fp<FastifyMongodbOptions>(async (fastify, opts) => {
    fastify.register(mongodb, {
        // force to close the mongodb connection when app stopped
        // the default value is false
        forceClose: true,
        url: 'mongodb://localhost:27017/fastify'
    })
});