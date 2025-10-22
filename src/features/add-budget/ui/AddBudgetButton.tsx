'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@/shared/ui/Modal';

/**
 * Feature component que encapsula el botón y modal para agregar un nuevo presupuesto.
 * Este componente está aislado para evitar re-renders innecesarios en la página padre.
 *
 * TODO: Agregar lógica para crear presupuesto en Supabase
 */
export const AddBudgetButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAddBudget = () => {
    // TODO: Aquí irá la lógica para crear el presupuesto en Supabase
    console.log('Agregando presupuesto...');
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleOpenModal}>
        Add New Budget
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalHeader>
          <h2 className="text-preset-1 font-bold text-grey-900">Add New Budget</h2>
          <p className="text-grey-500">Choose a category to set a spending budget. These categories can help you monitor spending.</p>
        </ModalHeader>
        <ModalContent>
          <p className="text-grey-500">
            Add a new budget here...
          </p>
        </ModalContent>
        <ModalFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddBudget}>
            Add Budget
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
