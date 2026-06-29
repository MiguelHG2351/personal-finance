'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Modal, ModalContent, ModalHeader } from '@/shared/ui/Modal';
import { AddBudgetForm, type AddBudgetFormData } from '@/features/budget/ui/AddBudgetForm';
import { useCreateBudget } from '@/entities/budget';

/**
 * Feature component que encapsula el botón y modal para agregar un nuevo presupuesto.
 * Está aislado para evitar re-renders innecesarios en la página padre.
 */
export const AddBudgetButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const createBudget = useCreateBudget();

  const handleClose = () => {
    setIsOpen(false);
    createBudget.reset();
  };

  const handleAddBudget = (data: AddBudgetFormData) => {
    createBudget.mutate(data, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Add New Budget
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalHeader>
          <h2 className="text-preset-1 font-bold text-grey-900">Add New Budget</h2>
          <p className="text-grey-500">
            Choose a category to set a spending budget. These categories can help you monitor
            spending.
          </p>
        </ModalHeader>
        <ModalContent>
          <AddBudgetForm
            onSubmit={handleAddBudget}
            isSubmitting={createBudget.isPending}
            error={createBudget.isError ? 'Could not create budget. It may already exist.' : null}
          />
        </ModalContent>
      </Modal>
    </>
  );
};
