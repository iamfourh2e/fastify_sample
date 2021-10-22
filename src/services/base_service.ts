import { FastifyInstance } from "fastify";
import { Collection, Document } from "mongodb";

export interface BaseService<T> {
    fastify: FastifyInstance;
    todo: Collection<Document>;
    create(doc: T): Promise<Document | null>;
    update(id: string, doc: T): Promise<Document | null>;
    remove(selector: {}): Promise<Document | null>;
    getAll(arg: {}): Promise<Document[]>;
    getOne(id: string): Promise<Document | null>;
}