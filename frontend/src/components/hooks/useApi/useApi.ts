import axios, { AxiosResponse } from 'axios'
// types
import { GetTemplates, UseApi, DeleteTemplate, PostFiles } from './types'

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

  const postFiles: PostFiles = async (files) => {
    const requests: Array<Promise<AxiosResponse<string>>> = []

    files.forEach((file) => {
      const data: FormData = new FormData()
      data.append('file', file)

      requests.push(
        axios.request({
          url: `${URL}/template`,
          method: 'POST',
          headers: { ['Content-Type']: `multipart/form-data;` },
          data,
        }),
      )
    })

    const results = await Promise.all(requests)

    const fileNamesList = results.map((result) => {
      if (result) return result.data
      else return 'Plug'
    })
    return fileNamesList.filter((filename) => filename !== 'Plug')
  }

  return { getTemplates, deleteTemplate, postFiles }
}
