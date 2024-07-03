<?php

namespace App\Services;

use App\Models\Sheet;
use App\Models\ConnectionsUserSheet;
use Illuminate\Support\Facades\Log;
use Exception;

class CreateSheetFromSheetImage
{
    public function createSheetsFromSheetImage($sheetImageId)
    {
        try {
            // connectionusersheetを参照してroleがevaluateeとしてひもづけられたユーザーを取得
            $evaluatees = ConnectionsUserSheet::where('sheetImage_id', $sheetImageId)
                ->where('role', 'evaluatee')
                ->get();

            // 各evaluateeに対してシートを生成
            foreach ($evaluatees as $evaluatee) {
                Sheet::create([
                    'sheetImage_id' => $sheetImageId,
                    'sheet_status_id' => 1, // 初期ステータスを設定
                    'personal_goal' => '', // 必要に応じて設定
                ]);
            }
        } catch (Exception $e) {
            throw new Exception('SheetImageからのSheet生成に失敗しました: ' . $e->getMessage());
        }
    }
}
