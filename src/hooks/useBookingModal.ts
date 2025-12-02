import { useState } from "react"


export enum ModalType {
  create = 'create',
  edit = 'edit',
}

export const useBookingModal = <T = void>() => {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<ModalType.create | ModalType.edit>(ModalType.create)
  const [data, setData] = useState<T | null>(null)

  return {
    isOpen,
    mode,
    data,
    open: (modeOrData?: ModalType.create | ModalType.edit | T) => {
      if (typeof modeOrData === "string") {
        setMode(modeOrData  as ModalType.create | ModalType.edit)
      } else if (modeOrData) {
        setData(modeOrData)
      }
      setIsOpen(true)
    },
    close: () => {
      setIsOpen(false)
      setData(null)
    },
  }
}