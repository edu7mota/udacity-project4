import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'
import { createAttachmentPresignedUrl } from '../../helpers/todos'
import { getUserId } from '../utils'
import { getUploadUrl } from '../../helpers/attachmentUtils'

const logger = createLogger('generateUploadUrl')
const bucketName = process.env.ATTACHEMENTS_S3_BUCKET

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    
     // Update dynamoDb with Url
    const uploadUrl = getUploadUrl(todoId)
    const userId = getUserId(event)
    const updatedTodo = {
      attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${todoId}`
    }
	logger.info("Creating presigned url")
    await createAttachmentPresignedUrl(updatedTodo, userId, todoId)
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )