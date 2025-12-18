import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  showCloseButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  closeOnOverlayClick?: boolean;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmVariant = 'default',
  size = '3xl',
  closeOnOverlayClick = true,
}: ModalProps) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const modalSize = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    full: 'max-w-full',
  }[size];

  return (
    <Dialog open={open} onOpenChange={closeOnOverlayClick ? onOpenChange : undefined}>
      <DialogContent
        className={`${modalSize}`}
        onInteractOutside={(e) => {
          if (!closeOnOverlayClick) {
            e.preventDefault();
          }
        }}
      >
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        <div className="py-4">{children}</div>

        {(footer || onConfirm || onCancel) && (
          <DialogFooter>
            {footer ? (
              footer
            ) : (
              <>
                {(onCancel || showCloseButton) && (
                  <Button variant="outline" onClick={handleCancel}>
                    {cancelText}
                  </Button>
                )}
                {onConfirm && (
                  <Button variant={confirmVariant} onClick={handleConfirm}>
                    {confirmText}
                  </Button>
                )}
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
