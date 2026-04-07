@props(['post', 'full' => false])

<div class="card mb-1">

    @if ($post->image)
        <div>
            <img src="{{ asset('storage/' . $post->image) }}" alt="{{ $post->title }}" class="w-full h-fullobject-cover rounded-lg mb-2"> 
        </div>
    @endif
    

    <div class="flex justify-between mb-2 items-center">
        <h2 class="font-bold text-xl mb-2">{{ $post->title }}</h2>

        @auth
            @if (auth()->user()->id === $post->user_id)
                <span class="px-2 py-1 rounded-md text-xs font-semibold
                    {{ $post->status === 'approved' ? 'bg-green-100 text-green-800' : ($post->status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800') }}">
                    {{ ucfirst($post->status) }}
                </span>
            @endif
            
        @endauth
    </div>
    

    <div class="text-sm text-gray-500">
        <span>Posted By</span>
        <a href="{{ route('posts.user', $post->user) }}" class="text-sky-500 hover:underline">{{ $post->user->username }}</a>
        <span> | {{ $post->created_at->diffForHumans() }}</span>
    </div>

    @if ($full)
        <div class="text-sm mt-4 text-gray-600 mt-2 line-clamp-3 break-words">
            <p>{{ ($post->body) }}</p>
        </div>
        
    @else

        <div class="text-sm mt-4 text-gray-600 mt-2 line-clamp-3 break-words">
            <p>{{ Str::words($post->body, 20) }}</p>
            <a href="{{ route('posts.show', $post) }}" class="flex justify-end text-sky-500 hover:underline">Read More &rarr;</a>
        </div>
    @endif

    <div>
        {{ $slot }}
    </div>
    
</div>