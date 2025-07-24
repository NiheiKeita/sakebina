<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sakebina_shouts', function (Blueprint $table) {
            $table->id();
            $table->string('text', 10); // 叫びテキスト（最大10文字）
            $table->string('emotion', 8); // 感情テーマ（怒・哀・喜・恐）
            $table->string('font', 32); // フォント名
            $table->string('background', 32); // 背景（色・パターン名など）
            $table->string('animation', 32); // アニメーション種別
            $table->timestamps(); // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sakebina_shouts');
    }
};
