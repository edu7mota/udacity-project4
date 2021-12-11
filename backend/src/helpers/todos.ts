import { TodosAccess } from './todosAcess'
//import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

// TODO: Implement businessLogic

const logger = createLogger('todos')

const todoAccess = new TodosAccess()

export async function getTodosForUser(userId: string): Promise<TodoItem[]>{
	logger.info('In getTodosForUser() function')
    return todoAccess.getTodosForUser(userId)
}

export async function getTodo(userId: string, todoId: string): Promise<TodoItem[]>{
logger.info('In getTodo() function')
    return todoAccess.getTodo(userId, todoId)
}

export async function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem>{
    const createdAt = new Date().toISOString()
    const todoId = uuid.v4()
	logger.info('In createTodo() function')
    return await todoAccess.createTodo({
        userId,
        todoId,
        createdAt,
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        done: false,
    })
}

export async function updateTodo(
    updateTodoRequest: UpdateTodoRequest, 
    userId: string, 
    todoId: string
): Promise<TodoItem>{
    logger.info('In updateTodo() function')
    return await todoAccess.updateTodo({
        userId,
        todoId,
        name: updateTodoRequest.name,
        dueDate: updateTodoRequest.dueDate,
        done: updateTodoRequest.done
    })
}

export async function deleteTodo(userId: string, todoId: string){
    logger.info('In deleteTodo() function')
    return await todoAccess.deleteTodo(userId, todoId)
}
export async function createAttachmentPresignedUrl(updateTodo, userId: string, todoId: string): Promise<TodoItem>{
  logger.info('In createAttachmentPresignedUrl() function')
  return await todoAccess.createAttachmentPresignedUrl({
    userId,
    todoId,
    attachmentUrl: updateTodo.attachmentUrl,
  })
}