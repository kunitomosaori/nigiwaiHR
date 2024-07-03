<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\ConnectionsUserSheet;
use App\Models\Sheet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ConnectionUserSheetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function Index() {

    }

    public function userIndex()
    {
        $userId = auth()->id();
        $connections = ConnectionsUserSheet::where('user_id', $userId)->get();
        if ($connections->isEmpty()) {
            return response()->json(['error' => 'コネクションが見つかりませんでした'], 404);
        }

        return response()->json($connections);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $connectionData = [
            'sheetImage_id' => $request->input('sheetImage_id'),
            'evaluatee_ids' => $request->input('evaluatee_id'),
            'evaluatee_department_id' => $request->input('evaluatee_department_id'),
            'evaluator_ids' => $request->input('evaluator_id'),
            'evaluator_department_id' => $request->input('evaluator_department_id'),
        ];

        // 被評価者のデータを保存
        if ($connectionData['evaluatee_ids']) {
            foreach ($connectionData['evaluatee_ids'] as $evaluated_id) {
                try {
                    ConnectionsUserSheet::create([
                        'user_id' => $evaluated_id,
                        'sheetImage_id' => $connectionData['sheetImage_id'],
                        'role' => 'evaluatee',
                    ]);
                } catch (\Exception $e) {
                    Log::error('被評価者のデータの保存に失敗しました: ' . $e->getMessage());
                    return response()->json(['error' => '被評価者のデータの保存に失敗しました'], 500);
                }
            }
        }

        // 評価者のデータを保存
        if ($connectionData['evaluator_ids']) {
            foreach ($connectionData['evaluator_ids'] as $evaluator_id) {
                try {
                    ConnectionsUserSheet::create([
                        'user_id' => $evaluator_id,
                        'sheetImage_id' => $connectionData['sheetImage_id'],
                        'role' => 'evaluator',
                    ]);
                } catch (\Exception $e) {
                    Log::error('評価者のデータの保存に失敗しました: ' . $e->getMessage());
                    return response()->json(['error' => '評価者のデータの保存に失敗しました'], 500);
                }
            }
        }

        try {
            $createSheetService = new \App\Services\CreateSheetFromSheetImage();
            $createSheetService->createSheetsFromSheetImage($connectionData['sheetImage_id']);
        } catch (\Exception $e) {
            Log::error('SheetImageからのSheet生成サービス呼び出しに失敗しました: ' . $e->getMessage());
            return response()->json(['error' => 'SheetImageからのSheet生成に失敗しました'], 500);
        }

        return response()->json(['message' => 'シート作成に成功'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {

    }
}
