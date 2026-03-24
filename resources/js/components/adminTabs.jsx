import * as Tabs from '@radix-ui/react-tabs';

export default function AdminTabs () {
    return (
        <Tabs.Root className="w-full mt-6" defaultValue="users">
            <Tabs.List className="flex border-b border-slate-200 bg-slate-50/50">
                <Tabs.Trigger 
                    value="users" 
                    className="px-5 py-2 rounded-t-md text-lg font-medium hover:bg-slate-200 focus:bg-slate-300">
                    Users
                </Tabs.Trigger>
                <Tabs.Trigger 
                    value="posts"
                    className="px-5 py-2 rounded-t-md text-lg font-medium hover:bg-slate-200 focus:bg-slate-300">
                    Latests Posts
                </Tabs.Trigger>
            </Tabs.List>
            
            <Tabs.Content value="users">
                <div className="w-full my-6">
                    <h1>User Table</h1>
                </div>
            </Tabs.Content>
            <Tabs.Content value="posts">
                <div className="w-full my-6">
                    <h1>All Posts</h1>
                </div>
            </Tabs.Content>
        </Tabs.Root>
    );
}