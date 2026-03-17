<x-layout>

    <div class="card">

        <h1 class="mb-4 text-3xl font-bold text-gray-950 my-2">Please verify your email through the email we've sent you.</h1>

        <p class="mb-4">Didn't get the email?</p>

        <form action="{{ route('verification.send') }}" method="post">
            @csrf

            <button class="btn-primary">Send Again</button>

        </form>

    </div>
    
</x-layout>