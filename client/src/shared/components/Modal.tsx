import type {ContainerType} from "../types/types.ts";

type ModalProps = ContainerType

const Modal = ({children, onClose, isOpen}: ModalProps) => {

  if (!isOpen) return null

  return (
    <div onClick={onClose}>
      {children}
    </div>
  )
}
export default Modal
