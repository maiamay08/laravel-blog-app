<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $posts = auth()->user()->posts()->latest()->paginate(10);

        return view('users.dashboard', [ 'posts' => $posts ]);
    }

    public function userPosts(User $user)
    {

        $posts = $user->posts()->latest()->paginate(10);

        return view('users.posts', [ 
            'posts' => $posts,
            'user' => $user]);
    }
}
