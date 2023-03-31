<?php

namespace App\Http\Middleware;

use App\Http\Services\LoginService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddAuthHeader
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->bearerToken()) {
            //check if have authorization cookie 
            if ($request->hasCookie(LoginService::ACCESS_TOKEN)) {
                $token = $request->cookie(LoginService::ACCESS_TOKEN);
                $request->headers->add(['Authorization' => 'Bearer ' . $token]);
            }
        }
        return $next($request);
    }
}
