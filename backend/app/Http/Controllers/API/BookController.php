<?php

namespace App\Http\Controllers\API;

use App\Models\Book;
use Illuminate\Support\Facades\DB;
use Log;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function getAll() {
        $data = Book::all();
        return response()->json($data, 200);
    }

    public function get($id) {
        $data = Book::find($id);
        return response()->json($data);
    }

    public function register(Request $request) {
        $data['title'] = $request['title'];
        $data['author'] = $request['author'];
        $data['published_date'] = $request['publishedDate'];
        $data['memorandum'] = $request['memorandum'];
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

    public function search(Request $request) {
        $titleKeyword = $request->input('title');
        $authorKeyword = $request->input('author');
        $query = DB::table('books');
        $data = $query->where("title", 'like', "%{$titleKeyword}%")->get();
        $data = $query->where("author", 'like', "%{$authorKeyword}%")->get();
        // dd($data);
        return response()->json($data, 200);
    }
}
