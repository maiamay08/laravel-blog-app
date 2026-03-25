<x-layout>

    <h2 class="subtitle my-5">{{ $user->username }}'s Posts</h2>

    <div class="columns-1 md:columns-2 gap-4 space-y-4">
      @foreach ($posts as $post)
         <div class="break-inside-avoid">
            <x-postcard :post="$post" />
         </div>
      @endforeach
    </div>

   <div class="mt-12 mb-10 px-4">
      <div class="max-w-4xl mx-auto">
         {{ $posts->links() }}
      </div>
   </div>

</x-layout>