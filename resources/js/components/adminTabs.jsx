import * as Tabs from '@radix-ui/react-tabs';
import { useEffect, useState } from 'react';
import TrashModal from './trashModal';
import ConfirmationModal from './confirmationModal';
import ToastNotification from './toast';

const UserTable = ({ headers, data, onOpenTrash, onDelete, flash }) => {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ username: '', email: '' });

    const handleEdit = (items) => {
        setEditForm({ username: items.username, email: items.email });
        setEditingId(items.id);
    }

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({ username: '', email: '' });
    }

    const handleSave = (id) => {
        console.log('Saving:', id, editForm);

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/admin/users/${id}`;

        const methodInput = document.createElement('input');
        methodInput.type = 'hidden';
        methodInput.name = '_method';
        methodInput.value = 'PATCH';

        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = '_token';
        tokenInput.value = document.querySelector('meta[name="csrf-token"]').content;

        const usernameInput = document.createElement('input');
        usernameInput.type = 'hidden';
        usernameInput.name = 'username';
        usernameInput.value = editForm.username;

        const emailInput = document.createElement('input');
        emailInput.type = 'hidden';
        emailInput.name = 'email';
        emailInput.value = editForm.email;

        form.appendChild(methodInput);
        form.appendChild(tokenInput);
        form.appendChild(usernameInput);
        form.appendChild(emailInput);
        document.body.appendChild(form);
        form.submit();
    }

    return (
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
                        <tr key={items.id} className="border border-sky-200">
                            <td className="border border-sky-200 font-medium text-center">
                                {items.id}
                            </td>
                            <td className="border border-sky-200 text-center">
                                {editingId === items.id ? (
                                    <input 
                                        className="w-full bg-transparent text-center px-2 py-1 focus:outline-none border-0 focus:border-sky-600 focus:ring-0"
                                        type="text"
                                        value={editForm.username}
                                        placeholder={items.username}
                                        onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                                    />
                                ) : (
                                    items.username
                                )}
                            </td>
                            <td className="border border-sky-200 text-center">
                                {editingId === items.id ? (
                                    <input 
                                        className="w-full bg-transparent text-center px-2 py-1 focus:outline-none border-0 focus:border-sky-600 focus:ring-0"
                                        type="text"
                                        value={editForm.email}
                                        placeholder={items.email}
                                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                    />
                                ) : (
                                    items.email
                                )}
                            </td>
                            <td className="py-4 px-4 text-center">
                                {editingId === items.id ? (
                                    <>
                                        <button onClick={() => handleSave(items.id)} className="text-green-500 hover:text-green-700 mr-3">Save</button>
                                        <button onClick={() => handleCancel(null)} className="text-red-500 hover:text-red-700 mr-3">Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(items)} className="text-green-500 hover:text-green-700 mr-3">Edit</button>
                                        <button onClick={() => onDelete(items.id)} className="text-red-500 hover:text-red-700 mr-3">Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const PostCards = ({ post, onStatusChange }) => {

    const submitStatusChange = async (action, newStatus) => {
        const token = document.querySelector('meta[name="csrf-token"]').content;

        try {
            const response = await fetch(action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    'X-HTTP-Method-Override': 'PATCH',
                },
                body: JSON.stringify({ _method: 'PATCH' }),
            });

            if (response.ok) {
                onStatusChange(post.id, newStatus); 
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    };

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
            <div className="flex justify-between mb-2 items-center">
                 <h2 className="font-bold text-xl mb-2">{post.title}</h2>
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${statusColors[post.status]}`}>
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
            </div>
           

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

            <div>
                {post.status !== 'approved' && (
                    <button onClick={() => submitStatusChange(`/admin/posts/${post.id}/approve`, 'approved')} className="text-green-500 hover:text-green-700 mr-3">Approve</button>
                )}
                
                {post.status !== 'rejected' && (
                    <button onClick={() => submitStatusChange(`/admin/posts/${post.id}/reject`, 'rejected')} className="text-red-500 hover:text-red-700 mr-3">Reject</button>
                )}
                
            </div>
            
        </div>
    )
};



export default function AdminTabs ({ users, posts, trash , flash}) {
    const userData = users ? JSON.parse(users) : [];
    const [postData, setPostData] = useState(posts ? JSON.parse(posts) : []);
    const trashData = trash ? JSON.parse(trash) : [];
    const [isTrashOpen, setIsTrashOpen] = useState(false);
    const [toast, setToast] = useState({ message: '', variant: '' });

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
        <ToastNotification message={toast.message} variant={toast.variant}/> 
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
                            <PostCards post={post}onStatusChange={(id, status) => {
                                setPostData(prev => prev.map(p => p.id === id ? {...p, status} : p))
                                setToast({ // 👈 set toast on status change
                                    message: `Post ${status === 'approved' ? 'approved' : 'rejected'} successfully!`,
                                    variant: status === 'approved' ? 'success' : 'error'
                                });
                            }}/>
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