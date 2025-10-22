'use client';

import { useEffect, useRef } from 'react';
import { Icon } from '../Icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
}

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function Modal({
  isOpen,
  onClose,
  children,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEsc = true,
  showCloseButton = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Guardar el elemento enfocado anteriormente
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';

      // Enfocar el modal
      modalRef.current?.focus();
    } else {
      // Restaurar scroll del body
      document.body.style.overflow = 'unset';

      // Restaurar el enfoque anterior
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!closeOnEsc) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEsc]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative w-full ${sizeClasses[size]} bg-white rounded-xl shadow-2xl max-h-[90vh] flex flex-col`}
        tabIndex={-1}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 text-grey-500 hover:text-grey-900 transition-colors"
            aria-label="Cerrar modal"
          >
            <Icon name="x" size="md" />
          </button>
        )}

        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children, className = '' }: ModalHeaderProps) {
  return (
    <div className={`px-8 pt-8 pb-4 ${className}`}>
      {children}
    </div>
  );
}

export function ModalContent({ children, className = '' }: ModalContentProps) {
  return (
    <div className={`px-8 py-5 overflow-y-auto flex-1 ${className}`}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, className = '' }: ModalFooterProps) {
  return (
    <div className={`px-8 py-4 flex justify-end gap-3 ${className}`}>
      {children}
    </div>
  );
}
