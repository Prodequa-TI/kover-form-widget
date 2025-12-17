import { Modal } from '@/shared/Modal';
import type { Dispatch } from 'react';
import { Assistantinfo } from './AssistantInfo';
type AssistantModalProps = {
  openAssistant: boolean;
  setOpenAssistant: Dispatch<React.SetStateAction<boolean>>;
};

export const AssistantModal = ({
  openAssistant,
  setOpenAssistant,
}: AssistantModalProps) => {
  return (
    <Modal open={openAssistant} onOpenChange={setOpenAssistant}>
      <Assistantinfo />
    </Modal>
  );
};
