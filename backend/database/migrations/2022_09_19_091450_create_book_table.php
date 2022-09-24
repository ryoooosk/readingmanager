<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100);
            $table->string('author', 100);
            $table->integer('published_date');
            $table->text('memorandum')->nullable();
            // 外部キー制約
            // 1. $table->unsignedBigInteger('カラム名')
            //    foreign('カラム名')->references('参照カラム名')->on('参照テーブル名')
            // 2. foreignId('カラム名')->constrained()
            // (親と子テーブルのカラム同士が同タイプである必要あり。idカラムは"unsignedBigInteger")
            // 'foreign'や'foreignId'だと'unsignedBigInteger'しか対応してないっぽい。それ以外のカラムタイプで外部キー制約を行う場合はどうすればよい？？。'id'に'uid'を入れてもいいけどautoincrementを解除するのと、カラムタイプ変更が効くか。それか別の'user_id'カラムを主キーにしたらいけるか？。
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            // $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
};
