import * as Dialog from '@radix-ui/react-dialog';

export default function DeleteModal({ postId, postTitle }){
    const handleDelete = () => {
        document.getElementById(`delete-form-${ postId }`).submit();
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="text-red-500 hover:text-red-700">Delete</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50"/>
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 p-6">
                    <Dialog.Title className="text-lg font-bold">Delete Confirmation</Dialog.Title>
                    <Dialog.Description className="mt-2 text-slate-500">Are you sure you want to delete <strong>{postTitle}</strong> ?</Dialog.Description>

                    <div className="flex justify-around mt-2">
                        <Dialog.Close>
                            <button className="p-2 bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600">Cancel</button>
                        </Dialog.Close>
                        <button onClick={handleDelete} className="p-2 hover:bg-gray-300 rounded">Yes, Delete</button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

        
    );
}