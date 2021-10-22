import { FastifyInstance } from 'fastify';
import {z} from 'zod'
import Mongo from '../shared/collection';

export const TODO_SCHEMA = z.object({
    title: z.string({
        required_error: "title is required",
        invalid_type_error: "title must be a string" 
    }),
    desc: z.string({})
})
export type TodoType = z.infer<typeof TODO_SCHEMA>;
export const TODO_MODEL = (fastify: FastifyInstance) => Mongo.Collection(fastify, 'todo');