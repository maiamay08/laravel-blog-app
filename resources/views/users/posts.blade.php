<x-layout>

    <h2 class="subtitle my-5">{{ $user->username }}'s Posts</h2>

    <div class="grid grid-cols-2 gap-4">
      @foreach ($posts as $post)
            <x-postcard :post="$post" />
      @endforeach
    </div>

   <div>
      {{$posts->links()}}
   </div>

</x-layout>