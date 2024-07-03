<?php

namespace App\Http\Controllers;

use App\Models\Sheet;
use App\Models\SheetPeriodSetting;
use App\Models\SheetPerformance;
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
    public function index()
    {
        //
    }

    public function getEvaluateeSheets()
    {
        $userId = Auth::id();
        $sheets = Sheet::where('evaluatee_id', $userId)->with('sheetImage')->get();
        Log::info('評価対象者が自分のシートを取得しました', ['sheets' => $sheets]);

        if ($sheets->isEmpty()) {
            return response()->json(['error' => 'シートが見つかりませんでした'], 404);
        }

        return response()->json(['sheets' => $sheets->map(function ($sheet) {
            return [
                'id' => $sheet->id,
                'evaluatee_id' => $sheet->evaluatee_id,
                'sheetImage_id' => $sheet->sheetImage_id,
                'sheet_status_id' => $sheet->sheet_status_id,
                'personal_goal' => $sheet->personal_goal,
                'created_at' => $sheet->created_at,
                'updated_at' => $sheet->updated_at,
                'sheet_image' => [
                    'id' => $sheet->sheetImage->id,
                    'title' => $sheet->sheetImage->title,
                    'created_at' => $sheet->sheetImage->created_at,
                    'updated_at' => $sheet->sheetImage->updated_at,
                    'created_by_id' => $sheet->sheetImage->created_by_id,
                    'period_id' => $sheet->sheetImage->period_id,
                ],
            ];
        })], 200);
    }


    public function getEvaluatorSheets(Request $request)
{
    $sheetImageIds = $request->sheetImage_ids;
    $sheets = Sheet::whereIn('sheetImage_id', $sheetImageIds)->with('sheetImage')->get(); // 'sheetImage'リレーションを追加
    Log::info('シートを取得しました', ['sheets' => $sheets]);

    if ($sheets->isEmpty()) {
        return response()->json(['error' => 'シートが見つかりませんでした'], 404);
    }

    return response()->json(['sheets' => $sheets->map(function ($sheet) {
        return [
            'id' => $sheet->id,
            'evaluatee_id' => $sheet->evaluatee_id,
            'sheetImage_id' => $sheet->sheetImage_id,
            'sheet_status_id' => $sheet->sheet_status_id,
            'personal_goal' => $sheet->personal_goal,
            'created_at' => $sheet->created_at,
            'updated_at' => $sheet->updated_at,
            'sheet_image' => [
                'id' => $sheet->sheetImage->id,
                'title' => $sheet->sheetImage->title,
                'created_at' => $sheet->sheetImage->created_at,
                'updated_at' => $sheet->sheetImage->updated_at,
                'created_by_id' => $sheet->sheetImage->created_by_id,
                'period_id' => $sheet->sheetImage->period_id,
            ],
        ];
    })], 200);
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
            'title' => $request->title,
            'created_by_id' => Auth::id(),
        ]);

        // 作成されたシートを返す
        return response()->json(['sheet' => $sheet], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($sheetId)
    {
        $sheet = Sheet::with('performances')->find($sheetId);

        if (!$sheet) {
            return response()->json(['error' => 'シートが見つかりませんでした'], 404);
        }

        return response()->json(['sheet' => $sheet]);
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
    public function update(Request $request, $id)
    {
        $request->validate([
            'personalGoal' => 'required|string|max:255',
        ]);

        try {
            $sheet = Sheet::findOrFail($id);
            $sheet->update([
                'personal_goal' => $request->personalGoal,
                'sheet_status_id' => 2,
                'updated_at' => now(),
            ]);

            foreach ($request->performances as $index => $performance) {
                SheetPerformance::create([
                    'sheet_id' => $sheet->id,
                    'detail_type' => $index + 1, // detail_typeを1, 2, 3に設定
                    'weight' => $performance['weight'],
                    'schedule' => $performance['schedule'],
                    'self_comment' => "",
                    'supervisor_comment' => "",
                    'second_comment' => "",
                    'third_comment' => "",
                    'self_evaluation' => "",
                    'supervisor_evaluation' => "",
                    'second_evaluation' => "",
                    'third_evaluation' => "",
                    'final_evaluation' => "",

                ]);
            }

            return response()->json(['message' => 'Sheet and performances updated successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error updating sheet and performances: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update sheet and performances'], 500);
        }
    }


    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'sheet_status_id' => 'required|integer',
        ]);

        try {
            $sheet = Sheet::findOrFail($id);
            $sheet->sheet_status_id = $request->sheet_status_id;
            $sheet->save();

            return response()->json(['message' => 'Sheet status updated successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error updating sheet status: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update sheet status'], 500);
        }
    }

    public function updateCommentsAndStatus(Request $request, $id)
    {
        $request->validate([
            'comments' => 'required|array',
            'comments.*.self_comment' => 'required|string|max:255',
            'comments.*.self_evaluation' => 'required|string|max:1',
        ]);

        try {
            $sheet = Sheet::findOrFail($id);
            foreach ($request->comments as $comment) {
                $performance = SheetPerformance::where('sheet_id', $id)
                    ->where('detail_type', $comment['detail_type'])
                    ->first();
                if ($performance) {
                    $performance->self_comment = $comment['self_comment'];
                    $performance->self_evaluation = $comment['self_evaluation'];
                    $performance->save();
                }
            }

            // ステータスを4に更新
            $sheet->sheet_status_id = 4;
            $sheet->save();

            return response()->json(['message' => 'Comments and status updated successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error updating comments and status: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update comments and status'], 500);
        }
    }

    public function updateSupervisorCommentsAndStatus(Request $request, $id)
    {
        $request->validate([
            'comments' => 'required|array',
            'comments.*.supervisor_comment' => 'required|string|max:255',
            'comments.*.supervisor_evaluation' => 'required|string|max:1',
        ]);

        try {
            $sheet = Sheet::findOrFail($id);
            foreach ($request->comments as $comment) {
                $performance = SheetPerformance::where('sheet_id', $id)
                    ->where('detail_type', $comment['detail_type'])
                    ->first();
                if ($performance) {
                    $performance->supervisor_comment = $comment['supervisor_comment'];
                    $performance->supervisor_evaluation = $comment['supervisor_evaluation'];
                    $performance->save();
                }
            }

            // ステータスを5に更新
            $sheet->sheet_status_id = 5;
            $sheet->save();

            return response()->json(['message' => 'Supervisor comments and status updated successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error updating supervisor comments and status: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update supervisor comments and status'], 500);
        }
    }

    public function updateSecondCommentsAndStatus(Request $request, $id)
    {
        $request->validate([
            'comments' => 'required|array',
            'comments.*.second_comment' => 'required|string',
            'comments.*.second_evaluation' => 'required|string|max:1',
        ]);

        try {
            $sheet = Sheet::findOrFail($id);
            $sheet->update(['sheet_status_id' => 6]);

            foreach ($request->comments as $index => $comment) {
                $performance = SheetPerformance::where('sheet_id', $sheet->id)
                    ->where('detail_type', $index + 1)
                    ->firstOrFail();

                $performance->update([
                    'second_comment' => $comment['second_comment'],
                    'second_evaluation' => $comment['second_evaluation'],
                ]);
            }

            return response()->json(['message' => 'Second comments and status updated successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error updating second comments and status: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update second comments and status'], 500);
        }
    }

    public function finalApproval(Request $request, $id)
    {
        $request->validate([
            'comments' => 'required|array',
            'comments.*.detail_type' => 'required|integer',
            'comments.*.final_evaluation' => 'required|string',
        ]);

        try {
            $sheet = Sheet::findOrFail($id);
            $sheet->update([
                'sheet_status_id' => 7,
            ]);

            foreach ($request->comments as $comment) {
                $performance = SheetPerformance::where('sheet_id', $sheet->id)
                    ->where('detail_type', $comment['detail_type'])
                    ->first();

                if ($performance) {
                    $performance->update([
                        'final_evaluation' => $comment['final_evaluation'],
                    ]);
                }
            }

            return response()->json(['message' => 'Final approval completed successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error updating final approval: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update final approval'], 500);
        }
    }






    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sheet $sheet)
    {
        //
    }
}
