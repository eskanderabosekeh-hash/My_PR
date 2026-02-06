<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LaptopController extends Controller
{
    public function index(Request $request)
    {
        // بناء الاستعلام الأساسي من جدول laptops
        $query = DB::table('laptops');

        // 1. البحث النصي (في الاسم والوصف)
        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('description', 'LIKE', '%' . $request->search . '%');
            });
        }

        // 2. الفلترة حسب التصنيفات
        if ($request->filled('categories')) {
            $categories = explode(',', $request->categories);
            $query->whereIn('category', $categories);
        }

        // 3. الفلترة حسب الماركات
        if ($request->filled('brands')) {
            $brands = explode(',', $request->brands);
            $query->whereIn('brand', $brands);
        }

        // 4. فلترة السعر
        if ($request->filled('minPrice')) {
            $query->where('price', '>=', $request->minPrice);
        }
        if ($request->filled('maxPrice')) {
            $query->where('price', '<=', $request->maxPrice);
        }

        // 5. الترتيب (Sorting)
        switch ($request->sort) {
            case 'price-low': $query->orderBy('price', 'asc'); break;
            case 'price-high': $query->orderBy('price', 'desc'); break;
            case 'name-asc': $query->orderBy('name', 'asc'); break;
            default: $query->latest(); break;
        }

        // 6. الترقيم (Pagination)
        $limit = $request->get('limit', 12);
        $laptops = $query->paginate($limit);

        return response()->json([
            'products' => $laptops->items(),
            'total' => $laptops->total(),
            'pages' => $laptops->lastPage(),
        ]);
    }

    public function getFilters()
    {
        // جلب قائمة الماركات والتصنيفات المتاحة فعلياً في القاعدة مع عددها
        $categories = DB::table('laptops')
            ->select('category as name', DB::raw('count(*) as count'))
            ->groupBy('category')
            ->get();

        $brands = DB::table('laptops')
            ->select('brand as name', DB::raw('count(*) as count'))
            ->groupBy('brand')
            ->get();

        return response()->json([
            'categories' => $categories,
            'brands' => $brands
        ]);
    }
}