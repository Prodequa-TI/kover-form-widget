import { Modal } from '@/shared/Modal';
import { Assistantinfo } from './Assistantinfo';
import type { Dispatch } from 'react';
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
