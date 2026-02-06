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
        Schema::create('laptops', function (Blueprint $table) {
            $table->id();
            // الأعمدة الـ 31 الموجودة في ملفك
            $table->string('category')->nullable();
            $table->text('name')->nullable();
            $table->text('url')->nullable();
            $table->string('price')->nullable();
            $table->string('rating')->nullable();
            $table->string('reviews_count')->nullable();
            $table->text('image_url')->nullable();
            $table->text('description')->nullable();
            $table->string('brand')->nullable();
            $table->string('color')->nullable();
            $table->string('laptop_type')->nullable();
            $table->string('processor_brand')->nullable();
            $table->string('processor_model')->nullable();
            $table->string('ram_gb')->nullable();
            $table->string('ram_type')->nullable();
            $table->string('gpu_brand')->nullable();
            $table->string('gpu_model')->nullable();
            $table->string('has_dedicated_gpu')->nullable();
            $table->string('storage_gb')->nullable();
            $table->string('storage_type')->nullable();
            $table->string('screen_size')->nullable();
            $table->string('display_type')->nullable();
            $table->string('touchscreen')->nullable();
            $table->string('weight_kg')->nullable();
            $table->string('battery_whr')->nullable();
            $table->string('os')->nullable();
            $table->string('good_for_gaming')->nullable();
            $table->string('good_for_video_editing')->nullable();
            $table->string('good_for_programming')->nullable();
            $table->string('good_for_students')->nullable();
            $table->string('good_for_business')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laptops');
    }
};
