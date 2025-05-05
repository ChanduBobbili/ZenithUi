export type LightBoxClassNames = {
  /**
   * The class to apply to the lightbox.
   */
  lightBox?: string
  /**
   * The class to apply to the caption.
   */
  caption?: string
  /**
   * The class to apply to the caption description.
   */
  captionDescription?: string
  /**
   * The class to apply to the pagination.
   */
  pagination?: string
  /**
   * The class to apply to the pagination button.
   */
  paginationButton?: string
  /**
   * The class to apply to the pagination button icon.
   */
  paginationButtonActive?: string
  /**
   * The class to apply to the navigate button.
   */
  navigateButton?: string
  /**
   * The class to apply to the navigate button left.
   */
  navigateButtonLeft?: string
  /**
   * The class to apply to the navigate button right.
   */
  navigateButtonRight?: string
  /**
   * The class to apply to the close button.
   */
  closeButton?: string
  /**
   * The class to apply to the delete button.
   */
  deleteButton?: string
  /**
   * The class to apply to the overlay.
   */
  overLay?: string
  /**
   * The class to apply to the controls container.
   */
  controls?: string
  /**
   * The class to apply to the navigation container.
   */
  navigation?: string
  /**
   * The class to apply to the footer.
   */
  footer?: string
}

export type LightBoxImages = {
  /**
   * The source of the image.
   */
  src: string
  /**
   * The alt text of the image.
   */
  alt?: string
  /**
   * The caption of the image.
   */
  caption?: string
  /**
   * The description of the image.
   */
  captionDescription?: string
}

export type PaginationDotProps = {
  /**
   * Whether the pagination dot is active.
   */
  active: boolean
  /**
   * The function to call when the pagination dot is clicked.
   */
  onClick: () => void
  /**
   * The class to apply to the pagination dot.
   */
  className?: string
  /**
   * The class to apply to the active pagination dot.
   */
  activeClassName?: string
}

export type NavigationButtonProps = {
  /**
   * The direction of the navigation button.
   */
  direction: "left" | "right"
  /**
   * The function to call when the navigation button is clicked.
   */
  onClick: () => void
  /**
   * The class to apply to the navigation button.
   */
  className?: string
  /**
   * The children to render inside the navigation button.
   */
  children?: React.ReactNode
}

export type DeleteButtonProps = {
  /**
   * The class to apply to the delete button.
   */
  className?: string
  /**
   * The function to call when the image is deleted.
   */
  onImageDelete?: (index: number) => void
  /**
   * The current index of the image.
   */
  currentIndex: number
  /**
   * The images to display in the lightbox.
   */
  images: LightBoxImages[] | string[]
  /**
   * The function to call when the open state of the lightbox changes.
   */
  onOpenChange: (open: boolean) => void
  /**
   * The function to call when the current index of the image changes.
   */
  setCurrentIndex: (index: number) => void
  /**
   * The children to render inside the delete button.
   */
  children?: React.ReactNode
}

export type CloseButtonProps = {
  /**
   * The function to call when the open state of the lightbox changes.
   */
  onOpenChange: (open: boolean) => void
  /**
   * The class to apply to the close button.
   */
  className?: string
  /**
   * The children to render inside the close button.
   */
  children?: React.ReactNode
}

export type LightBoxComponents = {
  /**
   * The component to use for the navigation button.
   */
  NavigationButtonLeft: React.FC<NavigationButtonProps>
  /**
   * The icon to use for the navigation button left.
   */
  NavigationButtonLeftIcon: React.ReactNode
  /**
   * The component to use for the navigation button right.
   */
  NavigationButtonRight: React.FC<NavigationButtonProps>
  /**
   * The icon to use for the navigation button right.
   */
  NavigationButtonRightIcon: React.ReactNode
  /**
   * The component to use for the delete button.
   */
  DeleteButton: React.FC<DeleteButtonProps>
  /**
   * The icon to use for the delete button.
   */
  DeleteButtonIcon: React.ReactNode
  /**
   * The component to use for the close button.
   */
  CloseButton: React.FC<CloseButtonProps>
  /**
   * The icon to use for the close button.
   */
  CloseButtonIcon: React.ReactNode
}

export type LightBoxProps = {
  /**
   * The open state of the lightbox.
   */
  open: boolean
  /**
   * The function to call when the open state of the lightbox changes.
   */
  onOpenChange: (open: boolean) => void
  /**
   * The images to display in the lightbox.
   */
  images: LightBoxImages[] | string[]
  /**
   * The initial index of the image to display.
   */
  initialIndex?: number
  /**
   * Whether to show the close button.
   */
  showCloseButton?: boolean
  /**
   * Whether to show the delete button.
   */
  showDeleteButton?: boolean
  /**
   * Whether to show the pagination.
   */
  showPagination?: boolean
  /**
   * The animation to use for the lightbox.
   */
  animation?: "slide" | "fade" | "stretch" | "flip" | "blur"
  /**
   * The function to call when the image deletes.
   */
  onImageDelete?: (index: number) => void
  /**
   * Whether to show the caption.
   */
  showCaption?: boolean
  /**
   * The class names to apply to the lightbox.
   */
  classNames?: LightBoxClassNames
  /**
   * The components to use for the lightbox.
   */
  components?: Partial<LightBoxComponents>
}
