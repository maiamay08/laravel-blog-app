<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         // Admin user
        User::create([
            'username' => 'admin',
            'email' => 'admin@email.com',
            'password' => bcrypt('password'),
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);

        // Regular users
        $users = [
            'john',
            'jane',
            'michael',
            'sarah',
            'david',
            'emily',
            'daniel',
            'olivia',
            'james',
            'sophia',
        ];

        foreach ($users as $username) {

            $user = User::create([
                'username' => ucfirst($username),
                'email' => $username . '@email.com',
                'password' => bcrypt('password'),
                'is_admin' => false,
                'email_verified_at' => now(),
            ]);

            // Create 5 blog posts for each user
            for ($i = 1; $i <= 5; $i++) {

                Post::create([
                    'user_id' => $user->id,
                    'title' => ucfirst($username) . "'s Blog Post " . $i,
                    'body' => "This is the content of blog post {$i} created by {$username}.",
                ]);
            }
        }
    }
}
