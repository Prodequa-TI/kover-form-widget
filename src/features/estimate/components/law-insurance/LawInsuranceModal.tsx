import { Modal } from '@/shared/Modal';
import { LawInsurancePlans } from './LawInsurancePlans';
import type { Dispatch } from 'react';

type LawInsuranceModalProps = {
  openLaw: boolean;
  setOpenLaw: Dispatch<React.SetStateAction<boolean>>;
};

export const LawInsuranceModal = ({ openLaw, setOpenLaw }: LawInsuranceModalProps) => {
  return (
    <Modal open={openLaw} onOpenChange={setOpenLaw} >
      <LawInsurancePlans />
    </Modal>
  );
};
