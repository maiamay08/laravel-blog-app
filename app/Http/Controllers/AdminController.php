<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Subscriber;

class AdminController extends Controller
{
    public function index() {

        return view('admin.admin-dashboard', [
            'postCount' => Post::count(),
            'userCount' => User::count(),
            'subscriberCount' => Subscriber::count(),
            'users' => User::get(),
            'posts' => Post::with('user')->latest()->get(),
        ]);
    }
}
