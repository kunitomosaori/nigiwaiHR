<?php

namespace App\Http\Controllers;

use App\Models\PersonalGoal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PersonalGoalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $values = PersonalGoal::all();
        // idによる条件指定の例
        // $personalGoal = PersonalGoals::where('id', $id)->first();
        // または
        // $personalGoal = PersonalGoals::find($id);
        
        // 複数テーブルJOINの条件指定の例
        // モデルにもリレーションを記述しておく
        // $personalGoal = PersonalGoals::with('user')
        // ->where('id', $id)
        // ->first();




        // $isAdmin = Auth::user()->kanri_flg == 1;

        return response()->json([
            'values' => $values,
            // 'isAdmin' => $isAdmin
            'isAdmin' => true
        ]);
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
            'goal_idl' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $personalGoal = PersonalGoal::create([
            'evaluation_sheet_id' => "1", // 仮の値
            'goal' => $request->goal_idl,
        ]);

        return response()->json(['message' => '個人目標が作成されました', 'personalGoal' => $personalGoal], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(PersonalGoal $personalGoal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PersonalGoal $personalGoal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PersonalGoal $personalGoal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PersonalGoal $personalGoal)
    {
        //
    }
}
