import * as DropdownMenu from '@radix-ui/react-dropdown-menu';


export default function ProfileMenu({ username, avatar, dashboardUrl }){
    const handleLogout = () => {
        document.getElementById(`logout-form`).submit();
    };
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button type="button" className="round-btn">
                    <img src={avatar} alt="profile-img" class="cover rounded-full w-10 h-10 overflow-auto"/>
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content sideOffset={12} align="end" className="bg-white shadow-lg top-12 right-0 rounded-lg overflow-hidden font-light">
                    <DropdownMenu.Label className="block text-slate-400 text-sm pl-4 pr-8 py-2 mb-1">{username}</DropdownMenu.Label>
                    <DropdownMenu.Separator/>
                    <DropdownMenu.Item>
                        <a href={dashboardUrl} className="block hover:bg-slate-100 pl-4 pr-8 py-2 mb-1">Dashboard</a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onSelect={handleLogout}>
                        <button type="submit" class="block hover:bg-slate-100 pl-4 pr-8 py-2 mb-1 w-full text-left">Log Out</button>
                    </DropdownMenu.Item>
                    
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
        
    );

};
