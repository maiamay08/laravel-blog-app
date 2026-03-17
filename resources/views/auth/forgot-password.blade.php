<x-layout>

    <h1 class="auth-title">Request a password reset email</h1>

    

    <div class="mx-auto max-w-screen-sm card">
        <form action="{{ route('password.request') }}" method="post">
            @csrf

            <div class="mb-4">
                <label for="email" class="label">Email</label>
                <div class="control">
                    <input type="text" name="email" id="email" class="input @error('email') ring-1 ring-red-500 @enderror" value="{{ old('email') }}">
                </div>
                @error('email')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>

            @if (session('status'))
                <div>
                    <x-flashmsg msg="{{ session('status') }}" bg="flash-success"/>
                </div>
            @endif

            <button type="submit" class="flex justify-center w-full btn-primary">Submit</button>

        </form>

    </div>
    
</x-layout>