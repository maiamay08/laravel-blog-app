<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{env('APP_NAME')}}</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-blue-50">
    <header class="bg-cyan-100 shadow-lg">
        <nav>
            <a href="{{ route('posts.index') }}" class="nav-link">Home</a>

            @auth
                <div class="profile-dropdown-container" 
                        data-username="{{ Auth::user()->username }}" 
                        data-avatar="https://i.redd.it/frieren-icons-to-admire-its-beauty-v0-haeexg50fajd1.jpg?width=701&format=pjpg&auto=webp&s=c009f137038ff30e2ff1cf4106e8b22bb8466074"
                        data-dashboard="{{ route('dashboard') }}"
                        >
                    </div>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="hidden">
                    @csrf
                </form>

                {{--
                    <div class="relative grid place-items-center">

                        <div class="bg-white shadow-lg absolute top-12 right-0 rounded-lg overflow-hidden font-light">

                            
                        </div>
                    </div>
                --}}
                
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