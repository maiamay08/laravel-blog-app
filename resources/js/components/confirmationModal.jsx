import * as Dialog from '@radix-ui/react-dialog';


export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) {
    const btnColor = type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'
    
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[101]"/>
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-[101] p-6">
                    <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
                    <Dialog.Description className="mt-2 text-slate-500">{message}</Dialog.Description>

                    <div className="flex justify-around mt-2">
                        <Dialog.Close>
                            <button onClick={onClose} className="p-2 bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600">Cancel</button>
                        </Dialog.Close>
                        <button onClick={() => {onConfirm(); onClose();}} className={`p-2 text-white px-4 py-2 rounded ${btnColor}`}>Confirm</button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>        
    );
}