<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Log;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserRegistPost;

class UserController extends Controller
{
    public function userRegister(UserRegistPost $request) {
        $data['user_id'] = $request['uid'];
        $data['email'] = $request['email'];
        User::create($data);
        return response()->json($data, 200);
    }

    public function registerDisplayname(Request $request, $uid) {
        $data['displayName'] = $request['displayName'];
        // $data['photoURL'] = $request['photoURL'];
        User::where("user_id",$uid)->update($data);
        return response()->json($data, 200);
    }
}
