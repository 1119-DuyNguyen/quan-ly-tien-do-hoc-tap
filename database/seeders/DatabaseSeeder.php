<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'admin',
            'email' => 'test@example.com',
            //123456
            'password' => '$2y$10$WAIS5MeldX9kPDSYSNGdieK9iXl9w9.H4jU8LDoaKerssq1038gmu',
        ]);
    }
}
