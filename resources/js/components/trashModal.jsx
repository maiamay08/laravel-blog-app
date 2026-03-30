import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import ConfirmationModal from './confirmationModal';

const submitForm =(action, method) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = action;

    const methodInput = document.createElement('input');
    methodInput.type = 'hidden';
    methodInput.name = '_method';
    methodInput.value = method;

    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = '_token';
    tokenInput.value = document.querySelector('meta[name="csrf-token"]').content;

    form.appendChild(methodInput);
    form.appendChild(tokenInput);
    document.body.appendChild(form);
    form.submit();
};

const TrashModal = ({ isOpen, onClose, data }) => {

    const [confirmConfig, setConfirmConfig] = useState({ 
        isOpen: false, 
        title: '', 
        message: '', 
        onConfirm: () => {}, 
        type: 'danger' 
    });

    const triggerConfirm = (title, message, onConfirm, type = 'danger') => {
        setConfirmConfig({ isOpen: true, title, message, onConfirm, type });
    };

    const handleRestore = (id) => {
        triggerConfirm (
            "Restore?",
            "This user will be restored.", () => 
                submitForm(`/admin/users/${id}/restore`, 'POST'), 'success'
        ); 
    }

    const handleDelete = (id) => {
        triggerConfirm (
            "Restore?",
            "This user will be restored.", () => 
            submitForm(`/admin/users/${id}/force`, 'DELETE'), 'danger'
        );
    }

    if (!isOpen) return null;

       
    return (
    <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
           <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 overflow-hidden">
                <div className="flex flex-row justify-between mb-2 items-center">      
                    <h1 className="title">Trashed Users</h1>
                    <button onClick={onClose} className="block font-medium text-center bg-red-500 text-white px-1 py-2 w-10 h-10 rounded hover:bg-red-600 focus:bg-red-700">X</button>
                </div>
                    
                <table className="w-full bg-white rounded-md table-fixed border-collapse border border-sky-300">
                    <thead className="bg-sky-100">
                        <tr className="border border-sky-200 font-medium text-lg">
                            <th className="p-2 text-center">Id</th>
                            <th className="p-2 text-center">Username</th>
                            <th className="p-2 text-center">Email</th>
                            <th className="p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {data.length > 0 ? data.map(user => (
                            <tr key={user.id} className="border border-sky-200 ">
                                <td className="border border-sky-200 font-medium text-center">
                                    {user.id}
                                </td>
                                <td className="border border-sky-200 text-center">
                                    {user.username}
                                </td>
                                <td className="border border-sky-200 text-center">
                                    {user.email}
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <button onClick={() => handleRestore(user.id)} className="text-green-500 hover:text-green-700 mr-3">Restore</button>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr className="caption-bottom col-span-4 text-center">Trash is empty.</tr>
                    )}
                        </tbody>
                 </table>
            </div>
        </div>
        <ConfirmationModal
            isOpen={confirmConfig.isOpen}
            title={confirmConfig.title}
            message={confirmConfig.message}
            onConfirm={confirmConfig.onConfirm}
            type={confirmConfig.type}
            onClose={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
        />
    </>
    )
};

export default TrashModal;