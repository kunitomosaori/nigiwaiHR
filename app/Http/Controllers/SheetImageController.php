<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Userinfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\SheetImage;

use Illuminate\Support\Facades\Log; // 追加


class SheetImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getMySheetImages(Request $request)
    {
        try {
            $userId = $request->query('user_id');
            $mySheetImages = SheetImage::where('created_by_id', $userId)->with(['periodSetting', 'createdBy'])->get();
            Log::info('Users fetched:', ['users' => $mySheetImages]);

            return response()->json($mySheetImages->map(function ($sheetImage) {
                return [
                    'id' => $sheetImage->id,
                    'title' => $sheetImage->title,
                    'periodSetting' => $sheetImage->periodSetting->name,
                    'createdBy' => $sheetImage->createdBy->name,
                ];
            }));
        } catch (\Exception $e) {
            Log::error('Error fetching my sheets: ' . $e->getMessage());
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
        $request->validate([
            'title' => 'required|string|max:255',
            'period_id' => 'required|integer|exists:sheet_period_settings,id', // 修正: テーブル名を修正
        ]);

        try {
            $sheetImage = SheetImage::create([
                'title' => $request->title,
                'created_by_id' => Auth::id(),
                'period_id' => $request->period_id,
            ]);

            $sheetImage = SheetImage::with(['periodSetting', 'createdBy'])->find($sheetImage->id);
            Log::info('Sheet image created:', ['sheetImage' => $sheetImage]);

            return response()->json([
                'id' => $sheetImage->id,
                'title' => $sheetImage->title,
                'periodSetting' => $sheetImage->periodSetting->name,
                'createdBy' => $sheetImage->createdBy->name,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating sheet image: ' . $e->getMessage());
            return response()->json(['error' => 'シートイメージの追加に失敗しました。理由: ' . $e->getMessage()], 500); // 修正: エラーメッセージに理由を追加
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Userinfo $userinfo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Userinfo $userinfo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Userinfo $userinfo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Userinfo $userinfo)
    {
        //
    }
}
