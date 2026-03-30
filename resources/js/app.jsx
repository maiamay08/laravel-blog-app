import './bootstrap';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import DeleteModal from './components/deleteModal';
import ProfileMenu from './components/profileMenu';
import ToastNotification from './components/toast';
import AdminTabs from './components/adminTabs';

const deleteContainers = document.querySelectorAll('.delete-modal-container');
const profileMenus = document.querySelectorAll('.profile-dropdown-container');
const toastNotification = document.querySelectorAll('.toast-notification');
const adminTabs = document.getElementById('admin-tabs')

deleteContainers.forEach(el => {
    const postId = el.dataset.postId;
    const postTitle = el.dataset.postTitle;

    createRoot(el).render (
        <DeleteModal 
            postId={postId} 
            postTitle={postTitle}/>
    );
});

profileMenus.forEach(el => {
    const { username, avatar, dashboard, adminDashboard, isAdmin } = el.dataset;

    createRoot(el).render (
        <ProfileMenu 
            username={username} 
            avatar={avatar} 
            dashboardUrl={dashboard}
            adminDashboardUrl={adminDashboard}
            isAdmin={isAdmin === 'true'}/>
    );
});

toastNotification.forEach(el => {
    const { message, variant } = el.dataset;

    createRoot(el).render (
        <ToastNotification message={message} variant={variant}/>
    );
});


if (adminTabs) {
    const users = adminTabs.dataset.users;
    const posts = adminTabs.dataset.posts;
    const trash = adminTabs.dataset.trash;

    createRoot(adminTabs).render(
        <AdminTabs users={users} posts={posts} trash={trash}/>
    );
}
