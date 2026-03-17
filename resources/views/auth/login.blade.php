<x-layout>

    <h1 class="auth-title">Log In</h1>

    @if (session('status'))
        <div class="mb-2">
            <x-flashmsg msg="{{ session('status') }}" bg="flash-success"/>
        </div>
    @endif

    <div class="mx-auto max-w-screen-sm card">
        <form action="{{ route('login') }}" method="post">
            @csrf

            <div class="mb-4">
                <label for="username" class="label">Username</label>
                <div class="control">
                    <input type="text" name="username" id="username" class="input @error('username') ring-1 ring-red-500 @enderror" value="{{ old('username') }}">
                </div>
                @error('username')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-4">
                <label for="password" class="label">Password</label>
                <div class="control">
                    <input type="password" name="password" id="password" class="input @error('password') ring-1 ring-red-500 @enderror">
                </div>
                @error('password')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>

            @error('failed')
                <p class="error">{{ $message }}</p>
            @enderror

            <div class="flex text-center gap-3 mb-2 text-sky-500 hover:underline">
                <a href="{{ route('password.request') }}">Forgot Password?</a>
            </div>

            <button type="submit" class="flex justify-center w-full btn-primary">Log In</button>

        </form>

    </div>
    
</x-layout>