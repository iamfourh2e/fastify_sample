import { FastifyInstance, FastifyLoggerInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { Collection, Document, ObjectId } from "mongodb";
import { TODO_MODEL, TodoType } from "../models/todo_model";
import { BaseService } from "./base_service";

class TodoService implements BaseService<TodoType>{
    fastify: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>;
    todo: Collection<Document>;
    constructor(fastify: FastifyInstance) {
        this.fastify = fastify;
        this.todo = TODO_MODEL(fastify);
    }
    async create(doc: TodoType): Promise<Document | null> {
        return await this.todo.insertOne(doc);
    }
    
    async update(id:string, doc: TodoType): Promise<Document | null> {
        return await this.todo.updateOne({_id: new ObjectId(id)},{$set:doc});
    }

    async remove(selector: {}): Promise<Document | null> {
        return await this.todo.deleteOne(selector);
    }

    async getAll(arg: {} = {}): Promise<Document[]> {
        return await this.todo.find(arg).toArray();
    }


    async getOne(id: string): Promise<Document | null> {
        return await this.todo.findOne({ _id: id });
    }
    
}

export default TodoService;