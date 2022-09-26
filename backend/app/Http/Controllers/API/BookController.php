<?php

namespace App\Http\Controllers\API;

use App\Models\Book;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Log;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function getAll($uid) {
        $user_id = User::where("user_id", $uid)->value('id');
        // with関数でuserテーブル（リレーション）を指定→where(カラム名, 検索値)で指定
        $data = Book::where('user_id', $user_id)->get();
        return response()->json($data, 200);
    }

    public function get($uid, $id) {
        $user_id = User::where('user_id', $uid)->value('id');
        $book_userId = Book::where('id', $id)->value('user_id');
        // ログインユーザーのidとgetしたい投稿のuser_idが一致する場合のみデータを返す
        if($book_userId == $user_id) {
            $data = Book::where('user_id', $user_id)->find($id);
            return response()->json($data, 200);
        }
    }

    public function register(Request $request) {
        $data['title'] = $request['title'];
        $data['author'] = $request['author'];
        $data['published_date'] = $request['publishedDate'];
        $data['memorandum'] = $request['memorandum'];
        $data['user_id'] = User::where("user_id", $request['uid'])->value('id');
        Book::create($data);
        return response()->json($data, 200);
    }

    public function delete($id) {
        $deletebook = Book::find($id)->delete();
    }

    public function update(Request $request, $id) {
        $data['title'] = $request['title'];
        $data['author'] = $request['author'];
        $data['published_date'] = $request['publishedDate'];
        $data['memorandum'] = $request['memorandum'];
        Book::find($id)->update($data);
        return response()->json($data, 200);
    }

    public function search(Request $request, $uid) {
        $titleKeyword = $request->input('title');
        $authorKeyword = $request->input('author');
        $user_id = User::where('user_id', $uid)->value('id');

        // or句を使ってタイトルと著者の同時検索できるようにしたい。
        $data = Book::where('user_id', $user_id)->where("title", 'like', "%{$titleKeyword}%")->get();
        // $data = Book::where('user_id', $user_id)->where("author", 'like', "%{$authorKeyword}%")->get();

        return response()->json($data, 200);
    }
}
