<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\UserGrade;
use Illuminate\Http\Request;

class UserGradeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $grades = UserGrade::all();
        return response()->json(['grades' => $grades]);
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
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $grade = UserGrade::create([
            'name' => $request->name,
        ]);

        return response()->json(['grade' => $grade], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $grade = UserGrade::find($id);

        if (!$grade) {
            return response()->json(['error' => 'Grade not found'], 404);
        }

        return response()->json(['grade' => $grade]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $grade = UserGrade::find($id);

        if (!$grade) {
            return response()->json(['error' => 'Grade not found'], 404);
        }

        $grade->name = $request->name;
        $grade->save();

        return response()->json(['grade' => $grade]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $grade = UserGrade::find($id);

        if (!$grade) {
            return response()->json(['error' => 'Grade not found'], 404);
        }

        $grade->delete();

        return response()->json(['message' => 'Grade deleted successfully']);
    }
}
