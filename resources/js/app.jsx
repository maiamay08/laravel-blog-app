import './bootstrap';
import { createRoot } from 'react-dom/client';
import DeleteModal from './components/deleteModal';
import ProfileMenu from './components/profileMenu';

const deleteContainers = document.querySelectorAll('.delete-modal-container');
const profileMenus = document.querySelectorAll('.profile-dropdown-container');

deleteContainers.forEach(el => {
    const postId = el.dataset.postId;
    const postTitle = el.dataset.postTitle;

    createRoot(el).render (
        <DeleteModal postId={postId} postTitle={postTitle}/>
    );
});

profileMenus.forEach(el => {
    const { username, avatar, dashboardUrl } = el.dataset;

    createRoot(el).render (
        <ProfileMenu username={username} avatar={avatar} dashboardUrl={dashboardUrl}/>
    );
});

