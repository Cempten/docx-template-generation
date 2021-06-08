import { useEffect, useState } from 'react'
// loacl libs
import { useApi } from '@components/hooks'
// types
import { Template, UseTemplates } from './types'

export const useTemplates: UseTemplates = () => {
  const [templates, setTemplates] = useState<Array<Template>>([])
  const { getTemplates, deleteTemplate } = useApi()

  const newTemplate = (title: string): Template => ({
    title,
    checked: false,
  })

  useEffect(() => {
    const requestTemplates = async () => {
      const templiteTitles = await getTemplates()

      if (templiteTitles) {
        const newTemplates = templiteTitles.map((x) => newTemplate(x))
        setTemplates(newTemplates)
      }
    }
    requestTemplates()
  }, [])

  const handleTemplateClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const clickedTemplate = e.currentTarget.dataset.name
    const updatedTemplates = templates.map((x) =>
      x.title !== clickedTemplate
        ? x
        : {
            ...x,
            checked: !x.checked,
          },
    )
    setTemplates(updatedTemplates)
  }

  const handleDeleteClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation()
    const clickedTemplate = e.currentTarget.dataset.name

    if (clickedTemplate) {
      const deletedTemplate = await deleteTemplate(clickedTemplate)
      setTemplates(
        templates.filter((template) => template.title !== deletedTemplate),
      )
    }
  }

  return { templates, handleTemplateClick, handleDeleteClick }
}
