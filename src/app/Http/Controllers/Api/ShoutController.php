<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shout;
use Illuminate\Support\Facades\Validator;

class ShoutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // 最新順で20件ずつ返す
        return response()->json(
            Shout::orderBy('created_at', 'desc')->paginate(20)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required|array|max:10',
            'text.*.char' => 'required|string|max:1',
            'text.*.color' => 'required|string|max:16',
            'text.*.animation' => 'required|string|max:32',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $shout = Shout::create([
            'text' => $validator->validated()['text'],
        ]);
        return response()->json($shout, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $shout = Shout::findOrFail($id);
        return response()->json($shout);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
