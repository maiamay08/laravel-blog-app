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
            'trash' => User::onlyTrashed()->get(),
        ]);

    }

    public function trash(User $user){
        $user->delete();
        return back()->with('message', 'User moved to trash successfully.');
    }

    public function permanentlyDelete($id){
        $user = User::withTrashed()->findOrFail($id);
        $user->forceDelete();
        return back()->with('message', 'User permanentlly deleted.');
    }

    public function restore($id){
        $user = User::withTrashed()->findOrFail($id);
        $user->restore();
        return back()->with('message', 'User restored.');
    }

    public function update(Request $request, User $user)
    {

        // Validate the incoming request data
        $validatedData = $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
        ]);

        $user->update($validatedData);

        return back()->with('success', 'User updated successfully!');
    }
}
