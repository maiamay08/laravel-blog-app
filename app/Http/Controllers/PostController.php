<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use App\Mail\WelcomeMail;
use Illuminate\Http\Request;
use App\Models\Post;


class PostController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [
            new Middleware(['auth', 'verified'], except: ['index', 'show']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        

        $posts = Post::latest()->paginate(10);
        return view('post.home', [ 'posts' => $posts]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        // Validate the incoming request data
        $validatedData = $request->validate([   
            'title' => 'required|string|max:255',
            'body' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = Storage::disk('public')->put('posts_images', $request->image);
        }

        // Create a new post using the validated data
        $post = auth()->user()->posts()->create([...$validatedData, 'image' => $path]);

        //Sent email
        Mail::to(auth()->user())->send(new WelcomeMail(auth()->user(), $post));

        // Redirect to the home page or any other page
        return back()->with('success', 'Post created successfully!');
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return view('post.show', [ 'post' => $post ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {

        Gate::authorize('modify', $post);

        return view('post.edit', [ 'post' => $post ]);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {

        Gate::authorize('modify', $post);

        // Validate the incoming request data
        $validatedData = $request->validate([   
            'title' => 'required|string|max:255',
            'body' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $path = $post->image ?? null;
        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $path = Storage::disk('public')->put('posts_images', $request->image);
        }
        
        // Update the post using the validated data
        $post->update([...$validatedData, 'image' => $path]);

        // Redirect to the home page or any other page
        return redirect()->route('dashboard')->with('success', 'Post updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {

        Gate::authorize('modify', $post);

        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->delete();
        return back()->with('delete', 'Post deleted successfully!');
    }
}
