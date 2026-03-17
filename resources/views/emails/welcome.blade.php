<h1>hello {{$user->username}}</h1>

<div>

    <h2>You Created {{ $post->title }}</h2>
    @if ($post->image)
        <img src="{{ $message->embed(storage_path('app/public/' . $post->image)) }}" alt="">
    @endif
    <p>{{ $post->body }}</p>

</div>