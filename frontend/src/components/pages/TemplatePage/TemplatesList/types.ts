import { Template } from '@store/templates'

export type UseTemplates = () => {
  templates: Array<Template>
  handleTemplateClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  handleDeleteClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => Promise<void>
}
