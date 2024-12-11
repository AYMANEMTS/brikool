import React from 'react';
import { Dialog, DialogHeader, DialogBody, Button } from '@material-tailwind/react';
import CategoryForm from './CategoryForm';
import { useTranslation } from 'react-i18next';

function CategoryModal({ open, handleOpen, selectedCategory, isUpdate }) {
    const { i18n } = useTranslation();
    const { language: lng } = i18n;

    return (
        <Dialog open={open} handler={handleOpen} size="lg">
            <DialogHeader className="flex justify-between items-center">
                <span>
                  {selectedCategory?.name?.[lng]
                      ? `Edit (${selectedCategory?.name?.[lng]})`
                      : 'Create New Category'}
                </span>
                <Button
                    color="gray"
                    size="sm"
                    variant="text"
                    onClick={handleOpen}
                    className="absolute top-2 right-2"
                >
                    ✕
                </Button>
            </DialogHeader>
            <DialogBody divider>
                <CategoryForm
                    handleOpen={handleOpen}
                    selectedCategory={selectedCategory}
                    isUpdate={isUpdate}
                />
            </DialogBody>
        </Dialog>
    );
}

export default CategoryModal;
