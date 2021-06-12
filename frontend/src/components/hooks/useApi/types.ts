import { PickedTemplateDataType } from '@components/store/CheckedTemplatesData'
import { Template } from '@store/templates'

export type GetTemplates = () => Promise<Array<string> | undefined>

export type DeleteTemplate = (template: string) => Promise<string | undefined>

export type PostFiles = (
  files: Array<File>,
) => Promise<Array<string> | undefined>

export type GetPickedTemplatesData = (
  templates: Array<Template>,
) => Promise<PickedTemplateDataType>

export type UseApi = () => {
  getTemplates: GetTemplates
  deleteTemplate: DeleteTemplate
  postFiles: PostFiles
  getPickedTemplatesData: GetPickedTemplatesData
}
