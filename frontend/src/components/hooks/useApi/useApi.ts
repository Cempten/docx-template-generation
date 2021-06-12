import axios, { AxiosResponse } from 'axios'
// types
import {
  GetTemplates,
  UseApi,
  DeleteTemplate,
  PostFiles,
  GetPickedTemplatesData,
  GetPreparedFileNames,
} from './types'

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

    const fileNamesList = results
      .map((result) => {
        if (result) return result.data
        else return 'Plug'
      })
      .filter((filename) => filename !== 'Plug')
    return fileNamesList
  }

  const getPickedTemplatesData: GetPickedTemplatesData = async (templates) => {
    const requests: Array<Promise<AxiosResponse<Array<string>> | void>> = []
    const pickedTemplates: Array<string> = []
    const placeholders: Set<string> = new Set()

    templates.forEach(({ title, checked }) => {
      if (checked) {
        const req = axios.get<Array<string>>(
          `${URL}/template/${title}/placeholders`,
        )

        requests.push(req)
        pickedTemplates.push(title)
      }
    })

    const responses = await Promise.all(requests)

    responses.forEach((oneResponse) => {
      const placeholdersArray = oneResponse?.data
      if (placeholdersArray) {
        placeholdersArray.forEach((placeholder) =>
          placeholders.add(placeholder),
        )
      }
    })

    return {
      placeholders: Array.from(placeholders),
      pickedTemplates,
    }
  }

  const getPreparedFileNames: GetPreparedFileNames = async (
    pickedTemplates,
    placeholders,
  ) => {
    const requests: Array<Promise<AxiosResponse<string> | void>> = []

    pickedTemplates.forEach((title) => {
      requests.push(
        axios.request({
          url: `${URL}/template/${title}`,
          method: 'POST',
          data: { placeholders },
        }),
      )
    })

    const responses = await Promise.all(requests)

    const fileNames: Array<string> = []
    responses.forEach((oneResponse) => {
      const fileName = oneResponse?.data
      if (fileName) fileNames.push(fileName)
    })

    return fileNames
  }

  return {
    getTemplates,
    deleteTemplate,
    postFiles,
    getPickedTemplatesData,
    getPreparedFileNames,
  }
}
