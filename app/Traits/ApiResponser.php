<?php

namespace App\Traits;

trait ApiResponser
{

    protected function success($data, int $code = 200)
    {
        return response()->json([
            'status' => 'Request was successful.',
            'data' => $data
        ], $code);
    }

    protected function error($data, int $code)
    {
        return response()->json([
            'status' => 'An error has occurred...',
            'data' => $data
        ], $code);
    }
}
