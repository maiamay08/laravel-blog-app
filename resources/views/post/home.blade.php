<x-layout>

   <h1 class="title">Latest Posts</h1>

   <div class="grid grid-cols-2 gap-4 items-start">
      @foreach ($posts as $post)
           <x-postcard :post="$post" />
      @endforeach
   </div>
   
   <div>
      {{$posts->links()}}
   </div>


</x-layout>
