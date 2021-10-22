import { ObjectId } from 'bson';
import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod';
import { TodoType, TODO_SCHEMA } from '../../models/todo_model';
import TodoService from '../../services/todo';
const todos: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const todoService = new TodoService(fastify);
    // const schema = { body: TODO_SCHEMA }
    fastify.get('/', async (req, reply) => {
        await todoService.getAll()
            .then(val => {
                reply.send({
                    data: val
                })
            })
    })

    fastify.post('/', async (req, reply) => {
        try {
            TODO_SCHEMA.parse(req.body);
            todoService.create(req.body as TodoType)
                .then(val => {
                    reply.send(val)
                })
                .catch((err: any) => {
                    reply.send({
                        message: err.message
                    })

                })
        } catch (err: any) {
            reply.code(400).send(err.message)
        }
    })
    fastify.put('/:id', async (req, reply) => {
        try {
            const params: any = req.params;
            TODO_SCHEMA.parse(req.body);
            todoService.update(params.id, req.body as TodoType)
                .then(val => {
                    reply.send(val)
                })
                .catch((err: any) => {
                    reply.send({
                        message: err.message
                    })

                })
        } catch (err: any) {
            reply.code(400).send(err.message)
        }
    })

    fastify.delete('/:id', async (req, reply) => {
        try {
            const params: any = req.params;
            z.string({
                required_error: "id is required"
            }).parse(params.id)
            todoService.remove({ _id: new ObjectId(params.id) })
                .then(val => {
                    reply.send({
                        data: val
                    })
                })
                .catch((err: any) => {
                    reply.code(400).send({ message: err })
                })
        } catch (err: any) {
            reply.code(400).send(err.message)

        }

    })
}


export default todos;