<x-layout>

    <h1 class="auth-title">Sign Up</h1>
    
    <div class="mx-auto max-w-screen-sm card">
        <form action="{{ route('signup') }}" method="post">
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
                <label for="email" class="label">Email</label>
                <div class="control">
                    <input type="email" name="email" id="email" class="input @error('email') ring-1 ring-red-500 @enderror" value="{{ old('email') }}">
                </div>
                @error('email')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-4">
                <label for="password" class="label">Password</label>
                <div class="control">
                    <input type="password" name="password" id="password" class="input @error('password') ring-1 ring-red-500 @enderror" value="{{ old('password') }}">
                </div>
                @error('password')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-4">
                <label for="password_confirmation" class="label">Confirm Password</label>
                <div class="control">
                    <input type="password" name="password_confirmation" id="password_confirmation" class="input @error('password_confirmation') ring-1 ring-red-500 @enderror" value="{{ old('password_confirmation') }}">
                </div>
            </div>

            <div class="flex text-center gap-3 mb-2">
                <input type="checkbox" name="subscribed" id="subscribed" class="w-4 h-4 cursor-pointer">
                <label for="subscribed" class="text-sm cursor-pointer select-none">
                    Subscribe to our newsletter
                </label>
            </div>

            <button type="submit" class="flex justify-center w-full btn-primary">Sign Up</button>

        </form>

    </div>

</x-layout>