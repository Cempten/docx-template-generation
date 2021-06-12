import { useEffect } from 'react'
// loacl libs
import { useAppDispatch, useAppSelector } from '@store'
import { selectTemplates, setTemplates, Template } from '@store/templates'
import { useApi } from '@components/hooks'
// types
import { UseTemplates } from './types'

export const useTemplates: UseTemplates = () => {
  const templates = useAppSelector(selectTemplates)
  const dispatch = useAppDispatch()

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
        dispatch(setTemplates(newTemplates))
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
    dispatch(setTemplates(updatedTemplates))
  }

  const handleDeleteClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation()
    const clickedTemplate = e.currentTarget.dataset.name

    if (clickedTemplate) {
      const deletedTemplate = await deleteTemplate(clickedTemplate)
      const updatedTemplates = templates.filter(
        (template) => template.title !== deletedTemplate,
      )
      dispatch(setTemplates(updatedTemplates))
    }
  }

  return { templates, handleTemplateClick, handleDeleteClick }
}
