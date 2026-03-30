import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';
import TrashModal from './trashModal';
import ConfirmationModal from './confirmationModal';

const UserTable = ({ headers, data, type, onOpenTrash, onDelete }) => (
    <div>
        <div className="flex flex-row justify-between mb-2 items-center">      
            <h1 className="title">Active Users</h1>
            <button onClick={onOpenTrash} className="block font-medium text-center bg-sky-500 text-white px-1 py-2 w-20 h-10 rounded hover:bg-sky-600 focus:bg-sky-700">Trash</button>
        </div>
        
        <table className="w-full bg-white rounded-md table-fixed border-collapse border border-sky-300">
            <thead className="bg-sky-100">
                <tr className="border border-sky-200 font-medium text-lg">
                    {headers.map(h => <th className="p-2 text-center" key={h}>{h}</th>)}
                    <th className="p-2 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((items) => 
                    <tr key={items.id} className="border border-sky-200 ">
                        <td className="border border-sky-200 font-medium text-center">
                            {items.id}
                        </td>
                        <td className="border border-sky-200 text-center">
                            {items.username}
                        </td>
                        <td className="border border-sky-200 text-center">
                            {items.email}
                        </td>
                        <td className="py-4 px-4 text-center">
                            <button className="text-green-500 hover:text-green-700 mr-3">Edit</button>
                            <button onClick={() => onDelete(items.id)} className="text-red-500 hover:text-red-700">Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

const PostCards = ({ post }) => {

    return (
        <div className="card mb-1">

            {post.image && (
                <div>
                    <img 
                        src={ `/storage/${post.image}` } 
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg mb-2"/> 
                </div>
            )}

            <h2 className="font-bold text-xl mb-2">{post.title}</h2>

            <div className="text-sm text-gray-500">
                <span>Posted By </span>
                <a href={`/posts/user/${post.user?.id}`} className="text-sky-500 hover:underline">
                    {post.user?.username}
                </a>
                <span> | {new Date(post.created_at).toLocaleDateString()}</span>
            </div>

            <div>
                <div className="text-sm mt-4">
                    <p className="line-clamp-3">{post.body}</p>
                </div>
                

                <div className="text-sm mt-4">
                    <a href={`/posts/${post.id}`} className="flex justify-end text-sky-500 hover:underline">Read More &rarr;</a>
                </div>
            </div>
            
        </div>
    )
};



export default function AdminTabs ({ users, posts, trash }) {
    const userData = users ? JSON.parse(users) : [];
    const postData = posts ? JSON.parse(posts) : [];
    const trashData = trash ? JSON.parse(trash) : [];
    const [isTrashOpen, setIsTrashOpen] = useState(false);

    const handleSoftDelete = (id) => {
        triggerConfirm (
            "Move to Trash?",
            "This user will be moved to the trash and can be restored later.", () => {

                const form = document.createElement('form');
                form.method = 'POST';
                form.action = `/admin/users/${id}`;

                const methodInput = document.createElement('input');
                methodInput.type = 'hidden';
                methodInput.name = '_method';
                methodInput.value = 'DELETE';

                const tokenInput = document.createElement('input');
                tokenInput.type = 'hidden';
                tokenInput.name = '_token';
                tokenInput.value = document.querySelector('meta[name="csrf-token"]').content;

                form.appendChild(methodInput);
                form.appendChild(tokenInput);
                document.body.appendChild(form);
                form.submit();
        });
    };

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


    return (
        <div>
        <Tabs.Root className="w-full mt-6" defaultValue="users">
            <Tabs.List className="flex border-b border-slate-200 bg-slate-50/50">
                <Tabs.Trigger 
                    value="users" 
                    className="px-5 py-2 rounded-t-md text-lg font-medium hover:bg-sky-200 focus:bg-sky-300 focus:text-white">
                    Users 
                </Tabs.Trigger>
                <Tabs.Trigger 
                    value="posts"
                    className="px-5 py-2 rounded-t-md text-lg font-medium hover:bg-sky-200 focus:bg-sky-300 focus:text-white">
                    Latests Posts
                </Tabs.Trigger>
            </Tabs.List>
            
            <Tabs.Content value="users" className="animate-in fade-in duration-5000">
                <div className="py-6">
                    <UserTable headers={[ 'Id', 'Username', 'Email' ]} data={userData} type="users" onOpenTrash={() => setIsTrashOpen(true)} onDelete={handleSoftDelete}/>
                    <TrashModal 
                        isOpen={isTrashOpen} 
                        onClose={() => setIsTrashOpen(false)} 
                        data={trashData}
                    />
                </div>
                
            </Tabs.Content>

            <Tabs.Content value="posts" className="animate-in fade-in duration-5000">
                <div className="columns-1 md:columns-2 gap-4 space-y-4 py-6">
                    {postData.map(post => (
                        <div key={post.id} className="break-inside-avoid"> 
                            <PostCards post={post}/>
                        </div>
                    ))}
                </div>
            </Tabs.Content>
            
        </Tabs.Root>
        <ConfirmationModal
                isOpen={confirmConfig.isOpen}
                title={confirmConfig.title}
                message={confirmConfig.message}
                onConfirm={confirmConfig.onConfirm}
                type={confirmConfig.type}
                onClose={() => setConfirmConfig({ ...confirmConfig, isOpen: false })}
        />
    </div>
    );
}