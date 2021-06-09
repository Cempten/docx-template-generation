export type DropzoneProps = {
  onDrop: (acceptedFiles: Array<File>) => void
  files: Array<File>
  onDelete: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  margin?: string
}

export type DivRootProps = {
  active: boolean
  margin?: string
}
