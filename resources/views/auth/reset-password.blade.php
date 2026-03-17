<x-layout>

    <h1 class="auth-title">Reset Your Password</h1>
    
    <div class="mx-auto max-w-screen-sm card">
        <form action="{{ route('password.update')}}" method="post">
            @csrf

            <input type="hidden" name="token" value="{{ $token }}">

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

            <button type="submit" class="flex justify-center w-full btn-primary">Reset Password</button>

        </form>

    </div>

</x-layout>