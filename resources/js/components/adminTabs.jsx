import * as Tabs from '@radix-ui/react-tabs';

const UserTable = ({ headers, data, type }) => (
    <div>
        <table className="w-full bg-white rounded-md table-auto md:table-fixed border-collapse border border-sky-300">
            <thead className="bg-sky-100">
                <tr className="border border-sky-200 font-medium text-lg">
                    {headers.map(h => <th className="p-2 text-center" key={h}>{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((items) => 
                    <tr className="border border-sky-200 ">
                        <td className="border border-sky-200 p-2 font-medium text-center">
                            {type === 'users' ? items.username : items.email}
                        </td>
                        <td className="border border-sky-200 text-center">
                            {type === 'users' ? items.email : 'N/A'}
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


export default function AdminTabs ({ users, posts}) {
    const userData = users ? JSON.parse(users) : [];
    const postData = posts ? JSON.parse(posts) : [];

    return (
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
                    <UserTable headers={[ 'Username', 'Email' ]} data={userData} type="users"/>
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
    );
}