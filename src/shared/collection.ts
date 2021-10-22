import { FastifyInstance } from "fastify";

export default class Mongo {
    static db?: string = process.env['db'] ||  'test';
    static Collection(fastify: FastifyInstance, name: string ) {
        return fastify.mongo.client.db(Mongo.db).collection(name);
    }
}