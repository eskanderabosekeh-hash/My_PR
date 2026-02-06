<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Laptop;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Laptop::query();

        // فلترة بالماركات
        if ($request->brands) {
            $query->whereIn('brand', explode(',', $request->brands));
        }

        // بحث
        if ($request->search) {
            $query->where('description', 'like', '%' . $request->search . '%');
        }

        // Pagination
        $limit = $request->limit ?? 12;
        $products = $query->paginate($limit);

        // تحويل الداتا لتناسب JS
        $mappedProducts = $products->items();
        $mappedProducts = array_map(function ($p) {
            return [
                'id' => $p->id,
                'name' => $p->description, // JS يستخدم name
                'price' => 0, // إذا ما عندك سعر حالياً
                'image_url' => '/img/product01.png',
                'brand' => $p->brand,
                'category' => 'Laptop',
                'rating' => 4,
                'reviews_count' => 0
            ];
        }, $mappedProducts);

        return response()->json([
            'products' => $mappedProducts,
            'total' => $products->total(),
            'pages' => $products->lastPage()
        ]);
    }

    public function filters()
    {
        return response()->json([
            'categories' => [
                ['name' => 'Laptop', 'count' => Laptop::count()]
            ],
            'brands' => Laptop::select('brand')
                ->groupBy('brand')
                ->get()
                ->map(fn($b) => [
                    'name' => $b->brand,
                    'count' => Laptop::where('brand', $b->brand)->count()
                ])
        ]);
    }
}
