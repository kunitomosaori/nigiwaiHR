<?php

namespace App\Http\Controllers;

use App\Models\Sheet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class SheetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $userId = $request->query('user_id');
            $sheets = Sheet::where('user_id', $userId)->get();

            return response()->json([
                'sheets' => $sheets,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching sheets: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $sheet = Sheet::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
        ]);

        return response()->json(['message' => 'シートが作成されました', 'sheet' => $sheet], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sheet $sheet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sheet $sheet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sheet $sheet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sheet $sheet)
    {
        //
    }
}