<?php

namespace App\Http\Controllers;

use App\Models\Sheet;
use App\Models\SheetPeriodSettings;
use App\Models\User; // Add this line to import the User model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class SheetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getMySheets(Request $request)
    {
        try {
            $userId = $request->query('user_id');
            $mySheets = Sheet::where('user_id', $userId)->with('createdBy')->get();
            return response()->json([
                'sheets' => $mySheets,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching my sheets: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getCreatedSheets(Request $request)
    {
        try {
            $userId = $request->query('user_id');
            $createdSheets = Sheet::where('created_by_id', $userId)->with('createdBy')->get();
            return response()->json([
                'sheets' => $createdSheets,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching created sheets: ' . $e->getMessage());
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
        // $validator = Validator::make($request->all(), [
        //     'title' => 'required|string|max:255',
        // ]);

        // if ($validator->fails()) {
        //     Log::error('Validation failed for storing sheet:', ['errors' => $validator->errors()]);
        //     return response()->json(['errors' => $validator->errors()], 422);
        // }

        // try {
        //     $sheet = Sheet::create([
        //         'user_id' => $request->user_id,
        //         'title' => $request->title,
        //     ]);

        //     return response()->json(['message' => 'シートが作成されました', 'sheet' => $sheet], 201);
        // } catch (\Exception $e) {
        //     Log::error('Error storing sheet: ' . $e->getMessage(), ['exception' => $e]);
        //     return response()->json(['error' => $e->getMessage()], 500);
        // }
        // バリデーション
        $request->validate([
            'title' => 'required|string|max:255',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        // シートの作成
        $sheet = Sheet::create([
            'user_id' => $request->user_id,
            'sheet_status_id' => 1, // 固定値
            'sheet_company_goal_id' => 1, // 固定値
            'title' => $request->title,
            'created_by_id' => Auth::id(),
            'period_setting_id' => 1, // 仮設定
        ]);

        // 作成されたシートを返す
        return response()->json(['sheet' => $sheet], 201);
    }
    public function createSheetsForDepartment(Request $request)
    {
        // バリデーション
        $request->validate([
            'department_id' => 'required|integer|exists:user_departments,id',
            'title' => 'required|string|max:255',
        ]);

        // 部門に所属するユーザーを取得
        $users = User::where('department_id', $request->department_id)->get();

        // 現在の日付をフォーマット
        $formattedDate = Carbon::now()->format('Y-m-d');
        $created_by_id = Auth::id();
        $sheet_status_id = 1; // 固定値
        $sheet_company_goal_id = 1; // 固定値

        $sheets = [];

        foreach ($users as $user) {
            // 該当ユーザーのシートが既に存在するかを確認
            $existingSheet = Sheet::where('user_id', $user->id)->first();
            if (!$existingSheet) {
                // シートの作成
                $sheet = Sheet::create([
                    'user_id' => $user->id,
                    'sheet_status_id' => $sheet_status_id,
                    'sheet_company_goal_id' => $sheet_company_goal_id,
                    'title' => $request->title,
                    'created_at' => $formattedDate,
                    'created_by_id' => $created_by_id,
                    'period_setting_id' => 1, // 仮設定
                ]);
                $sheets[] = $sheet;
            }
        }

        // 作成されたシートを返す
        return response()->json(['sheets' => $sheets], 201);
    }

    public function storeForDepartment(Request $request)
    {
        $title = $request->input('title');
        $departmentId = $request->input('department_id');
        $creatorId = Auth::id();

        // 現在の月を取得
        $currentMonth = now()->month;

        // 該当するperiod_settingを取得
        $periodSetting = SheetPeriodSettings::where('start_month', '<=', $currentMonth)
            ->where('end_month', '>=', $currentMonth)
            ->first();

        if (!$periodSetting) {
            return response()->json(['error' => '適切な期間設定が見つかりませんでした。'], 404);
        }

        $sheets = [];
        $users = User::where('department_id', $departmentId)->get();

        foreach ($users as $user) {
            $existingSheet = Sheet::where('user_id', $user->id)
                ->where('period_setting_id', $periodSetting->id)
                ->first();
            if ($existingSheet) {
                Log::info('Sheet already exists for user: ' . $user->id . ' and period: ' . $periodSetting->id);
                continue;
            }

            $sheet = Sheet::create([
                'user_id' => $user->id,
                'sheet_status_id' => 1,
                'sheet_company_goal_id' => 1,
                'title' => $title,
                'created_at' => now(),
                'created_by_id' => $creatorId,
                'period_setting_id' => $periodSetting->id,
            ]);

            $sheets[] = $sheet;
        }

        return response()->json(['sheets' => $sheets]);
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
