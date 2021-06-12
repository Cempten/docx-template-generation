import { PickedTemplateDataType } from '@components/store/CheckedTemplatesData'
import { Template } from '@store/templates'

export type CustomError = {
  message: string
  status: number
}

export type GetTemplates = () => Promise<Array<string> | undefined>

export type DeleteTemplate = (template: string) => Promise<string | undefined>

export type PostFiles = (
  files: Array<File>,
) => Promise<Array<string> | undefined>

export type GetPickedTemplatesData = (
  templates: Array<Template>,
) => Promise<PickedTemplateDataType>

export type GetPreparedFileNames = (
  pickedTemplates: Array<string>,
  placeholders: Record<string, string>,
) => Promise<Array<string>>

export type DownloadFile = (fileName: string) => void

export type UseApi = () => {
  getTemplates: GetTemplates
  deleteTemplate: DeleteTemplate
  postFiles: PostFiles
  getPickedTemplatesData: GetPickedTemplatesData
  getPreparedFileNames: GetPreparedFileNames
  downloadFile: DownloadFile
}
