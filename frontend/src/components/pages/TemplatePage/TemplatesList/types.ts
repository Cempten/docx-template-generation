export type Template = {
  title: string
  checked: boolean
}

export type UseTemplates = () => {
  templates: Array<Template>
  handleTemplateClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  handleDeleteClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => Promise<void>
}
