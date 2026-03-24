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
        // User::factory(10)->create();

       User::factory(5)->hasPosts(3)->create();

       User::factory()->create([
            'username' => 'admin',
            'email' => 'admin@email.com',
            'password' => bcrypt('123123123'),
            'is_admin' => true, // Assuming you added this column earlier
        ]);
    }
}
