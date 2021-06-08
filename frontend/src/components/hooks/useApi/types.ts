export type GetTemplates = () => Promise<Array<string> | undefined>

export type DeleteTemplate = (template: string) => Promise<string | undefined>

export type UseApi = () => {
  getTemplates: GetTemplates
  deleteTemplate: DeleteTemplate
}
