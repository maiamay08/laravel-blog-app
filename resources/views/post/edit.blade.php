<x-layout>

    <a href="{{ route('dashboard') }}" class="text-sm text-gray-500 hover:text-gray-700 my-5 inline-block">&larr; Back to Dashboard</a>
    <div class="mx-auto card">
        <h2 class="auth-title">Edit Post</h2>

        <form action="{{ route('posts.update', $post) }}" method="post" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="mb-4">
                <label for="title" class="label">Post Title</label>
                <div class="control">
                    <input type="text" name="title" id="title" class="input @error('title') ring-1 ring-red-500 @enderror" value="{{ $post->title }}">
                </div>
                @error('title')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-4">
                <label for="body" class="label">Post Content</label>
                <div class="Control">
                    <textarea name="body" rows="5" class="input @error('body') ring-1 ring-red-500 @enderror">{{ $post->body }}</textarea>
                </div>
                @error('body')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>

            @if ($post->image)
                <p class="font-meduim">Current Cover Photo:</p>
                <div class="w-1/4 h-full object-cover rounded-lg mb-2">
                    <img src="{{ asset('storage/' . $post->image) }}" alt="{{ $post->title }}"> 
                </div>
            @endif

            <div class="mb-4">
                <label for="image" class="label">Cover Photo</label>
                <div class="Control">
                    <input type="file" name="image" id="image" class="input @error('body') ring-1 ring-red-500 @enderror">{{ old('body') }}</textarea>
                </div>

                @error('image')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>
        
            <button type="submit" class="flex justify-center w-full btn-primary">Update Post</button>

        </form>
    </div>

</x-layout>

