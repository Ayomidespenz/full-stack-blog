<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestController extends Controller
{
    /**
     * Test authentication and return user info.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function testAuth(Request $request)
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json([
                'authenticated' => false,
                'message' => 'No authenticated user',
                'token_valid' => false,
                'auth_header' => $request->header('Authorization'),
                'all_headers' => $request->headers->all(),
            ]);
        }

        return response()->json([
            'authenticated' => true,
            'user' => $user,
            'token_valid' => true,
            'token' => $request->bearerToken(),
            'abilities' => $user->tokens->first()?->abilities ?? []
        ]);
    }
}
