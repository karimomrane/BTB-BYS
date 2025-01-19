<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('article_paniers', function (Blueprint $table) {
            $table->unsignedInteger('quantity')->default(1); // Add quantity column with a default value of 1
        });
    }

    public function down()
    {
        Schema::table('article_paniers', function (Blueprint $table) {
            $table->dropColumn('quantity'); // Remove the quantity column if rolling back
        });
    }
};
