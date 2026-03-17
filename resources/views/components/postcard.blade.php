@props(['post', 'full' => false])

<div class="card mb-1">

    @if ($post->image)
        <div>
            <img src="{{ asset('storage/' . $post->image) }}" alt="{{ $post->title }}" class="w-full h-fullobject-cover rounded-lg mb-2"> 
        </div>
    @endif

    <h2 class="font-bold text-xl mb-2">{{ $post->title }}</h2>

    <div class="text-sm text-gray-500">
        <span>Posted By</span>
        <a href="{{ route('posts.user', $post->user) }}" class="text-sky-500 hover:underline">{{ $post->user->username }}</a>
        <span> | {{ $post->created_at->diffForHumans() }}</span>
    </div>

    @if ($full)
        <div class="text-sm mt-4">
            <p>{{ ($post->body) }}</p>
        </div>
        
    @else

        <div class="text-sm mt-4">
            <p>{{ Str::words($post->body, 20) }}</p>
            <a href="{{ route('posts.show', $post) }}" class="flex justify-end text-sky-500 hover:underline">Read More &rarr;</a>
        </div>
    @endif

    <div>
        {{ $slot }}
    </div>
    
</div>