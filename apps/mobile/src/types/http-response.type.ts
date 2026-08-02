import { HTTPResponseStatus } from '@repo/enums/http-status.enums'


export type HTTPResponseData<T> = {
  status: HTTPResponseStatus
  data: T
  message: string
}
