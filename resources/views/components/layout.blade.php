<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{env('APP_NAME')}}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body class="bg-blue-50">
    <header class="bg-cyan-100 shadow-lg">
        <nav>
            <a href="{{ route('posts.index') }}" class="nav-link">Home</a>

            {{--<div>
                <img src=" {{ asset('images/Frieren_logo.webp') }}" alt="" class="w-25 h-10 object-cover">
            </div>--}}

            @auth
                <div class="relative grid place-items-center" x-data="{ open: false }" @click.away="open = false">
                    <button type="button" class="round-btn" x-on:click="open = !open">
                        <img src="https://i.redd.it/frieren-icons-to-admire-its-beauty-v0-haeexg50fajd1.jpg?width=701&format=pjpg&auto=webp&s=c009f137038ff30e2ff1cf4106e8b22bb8466074" alt="profile-img" class="cover rounded-full w-10 h-10 overflow-auto">
                    </button>

                    <div x-show="open" class="bg-white shadow-lg absolute top-12 right-0 rounded-lg overflow-hidden font-light">
                        <span class="block text-slate-400 text-sm pl-4 pr-8 py-2 mb-1">{{ Auth::user()->username }}</span>
                        <a href="{{ route('dashboard') }}" class="block hover:bg-slate-100 pl-4 pr-8 py-2 mb-1">Dashboard</a>
                        <form action="{{ route('logout') }}" method="POST">
                            @csrf
                            <button type="submit" class="block hover:bg-slate-100 pl-4 pr-8 py-2 mb-1 w-full text-left">Log Out</button>
                        </form>
                    </div>

                    
                </div>

               
            @endauth

            @guest
                <div class="flex gap-4">
                    <a href="{{ route('login') }}" class="nav-link">Log In</a>
                    <a href="{{ route('signup') }}" class="nav-link">Sign Up</a>
                </div>
            @endguest
            
        </nav>
    </header>
    
    <main class="p-5 max-w-screen-lg mx-auto">
        {{$slot}}
    </main>
</body>
</html>