<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class OauthClientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::raw("INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
        (1, NULL, 'Laravel Personal Access Client', 'xblsQD9fLZgnQlTbvPo4eL1v9LXLVUB7oJGJxVNU', NULL, 'http://localhost', 1, 0, 0, '2023-03-29 04:57:54', '2023-03-29 04:57:54'),
        (2, NULL, 'Laravel Password Grant Client', 'U8JUFnmp4fy0P0Sy8lZlHALDdb2V5xKcYR1z7wbT', 'users', 'http://localhost', 0, 1, 0, '2023-03-29 04:57:55', '2023-03-29 04:57:55');
        ");
    }
}
