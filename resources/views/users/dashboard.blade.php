<x-layout>

    <h1 class="title">Hello, {{ Auth::user()->username }}!</h1>
    
    @php
        $message = session('success') ?? session('delete');
        $variant = session('success') ? 'success' : (session('delete') ? 'error' : null);
    @endphp

    @if ($message)
        <div class="toast-notification"
            data-message="{{ $message }}"
            data-variant="{{ $variant }}">
        </div>
    @endif

    {{--create post form--}}

    <div class="mx-auto card">
        <h2 class="auth-title">Create New Post</h2>

        <form action="{{ route('posts.store') }}" method="post" enctype="multipart/form-data">
            @csrf
            {{--title--}}
            <div class="mb-4">
                <label for="title" class="label">Post Title</label>
                <div class="control">
                    <input type="text" name="title" id="title" class="input @error('title') ring-1 ring-red-500 @enderror" value="{{ old('title') }}">
                </div>
                @error('title')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>
            {{--body--}}
            <div class="mb-4">
                <label for="body" class="label">Post Content</label>
                <div class="control">
                    <textarea name="body" rows="5" class="input @error('body') ring-1 ring-red-500 @enderror">{{ old('body') }}</textarea>
                </div>
                @error('body')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>
          
            <div class="mb-4">
                <label for="image" class="label">Cover Photo</label>
                <div class="Control">
                    <input type="file" name="image" id="image" class="input @error('body') ring-1 ring-red-500 @enderror">{{ old('body') }}</textarea>
                </div>

                @error('image')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>
           
            {{--File Upload--}}
            

            <button type="submit" class="flex justify-center w-full btn-primary">Create Post</button>

        </form>
    </div>

    <h2 class="subtitle my-5">Your Latest Posts</h2>

    <div class="grid grid-cols-2 gap-4 items-start">
      @foreach ($posts as $post)
            <x-postcard :post="$post">
                <div class="flex gap-4">
                    <a href="{{ route('posts.edit', $post) }}" class="text-green-500 hover:text-green-700">Update</a>

                    <div class="delete-modal-container" 
                        data-post-id="{{ $post->id }}" 
                        data-post-title="{{ $post->title }}">
                    </div>

                    <form id="delete-form-{{ $post->id }}" action="{{ route('posts.destroy', $post) }}" method="post" class="hidden">
                        @csrf
                        @method('DELETE')
                        
                    </form>

                </div>
            </x-postcard>
      @endforeach
    </div>

   <div>
      {{$posts->links()}}
   </div>


</x-layout>
