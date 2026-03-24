<?php

namespace App\Http\Controllers;

use App\Events\UserSubscribed;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use App\Models\User;


class AuthController extends Controller
{
    public function signup(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        // Create a new user using the validated data
        $user = User::create($validatedData);

        // Log the user in (optional)
        auth()->login($user);

        event(new Registered($user));

        if ($request->subscribed) {
            event(new UserSubscribed($user));
        };

        
    }

    public function verifyNotice () {

        return view('auth.verify-email');
    }

    public function verifyEmail (EmailVerificationRequest $request) {
       
        $request->fulfill();

        if (auth()->user()->is_admin) {
                return redirect()->route('admin.admin-dashboard');
        }

        return redirect()->route('dashboard');
    }

    public function resendEmail (Request $request) {
        $request->user()->sendEmailVerificationNotification();
    
        return back()->with('message', 'Verification link sent!');
    }

    public function login(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:8']
        ]);

        // Attempt to log the user in using the validated data
        if (auth()->attempt($validatedData)) {
            $user = auth()->user();

            if ($user->is_admin) {
                return redirect()->intended('/admin/admin-dashboard');
            }
            else {
            // If successful, redirect to the home page or any other page
                return redirect()->intended('dashboard');
            } 
        } 
        else {
        // If login fails, redirect back with an error message
            return back()->withErrors(['failed' => 'Invalid credentials']);
        }
    }

    public function logout(Request $request)
    {

        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
        
    }
}
