import * as Toast from '@radix-ui/react-toast';
import { useEffect, useState } from 'react';

export default function ToastNotification({ message, variant }){
    const [open, setOpen] = useState(!!message);

    useEffect(() => {
        if (message) {
            setOpen(true); 
        }
    }, [message]);

    if (!message) {
        return null;
    }

    const styles = variant === 'success'
        ? 'text-emerald-900 border-emerald-500' 
        : 'text-red-900 border-red-500';

    return (
        <Toast.Provider>
            <Toast.Root
                className={`bg-white fixed top-5 right-5 flex items-center justify-between p-4 rounded-lg shadow-xl border-l-4 min-w-[300px] z-100 animate-in slide-in-from-right-full ${styles}`}
                open={open}
                onOpenChange={setOpen}
                duration={5000}
            >
                <Toast.Description className='text-sm font-medium'>
                    {message}
                </Toast.Description>

                <Toast.Close className="ml-4 opacity-70 hover:opacity-100 cursor-pointer text-lg">
                    ✕
                </Toast.Close>

            </Toast.Root>
            
            
            <Toast.Viewport className="fixed bottom-0 right-0 p-6 flex flex-col gap-3 w-[390px] max-w-[100vw] m-0 list-none z-110 outline-none"/>
        </Toast.Provider>
    );

};
