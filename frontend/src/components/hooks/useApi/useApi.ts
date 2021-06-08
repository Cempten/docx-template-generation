import axios, { AxiosResponse } from 'axios'
// types
import { GetTemplates, UseApi, DeleteTemplate } from './types'

const URL = 'http://localhost:8000'

export const useApi: UseApi = () => {
  const getTemplates: GetTemplates = async () => {
    const response: AxiosResponse<Array<string>> | void = await axios(
      `${URL}/template`,
    )
    if (response) {
      return response.data
    }
  }

  const deleteTemplate: DeleteTemplate = async (template) => {
    const response: AxiosResponse<string> | void = await axios({
      url: `${URL}/template/${template}`,
      method: 'DELETE',
    })

    if (response) {
      return response.data
    }
  }

  return { getTemplates, deleteTemplate }
}
