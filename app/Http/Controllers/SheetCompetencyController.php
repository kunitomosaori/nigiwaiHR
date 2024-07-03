<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sheet;
use App\Models\SheetCompetencyItems;
use App\Models\SheetCompetencies;

class SheetCompetencyController extends Controller
{
    public function create(Request $request)
    {
        $sheetId = $request->query('sheetId');
        $sheet = Sheet::with('performances')->findOrFail($sheetId);
        $competencyItems = SheetCompetencyItems::all();

        $competencies = SheetCompetencies::where('sheet_id', $sheetId)->get();

        return inertia('Competencies', [
            'sheetId' => $sheetId,
            'competencyItems' => $competencyItems,
            'competencies' => $competencies,
            'status' => $sheet->sheet_status_id,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'sheetId' => 'required|exists:sheets,id',
            'competencies' => 'required|array',
            'competencies.*.competency_id' => 'required|exists:sheet_competency_items,id',
            'competencies.*.self_evaluation' => 'nullable|string|in:S,A,B,C,D',
            'competencies.*.supervisor_evaluation' => 'nullable|string|in:S,A,B,C,D',
            'competencies.*.weight' => 'required|integer|between:0,100',
        ]);

        foreach ($request->competencies as $competency) {
            SheetCompetencies::updateOrCreate(
                [
                    'sheet_id' => $request->sheetId,
                    'competency_id' => $competency['competency_id']
                ],
                [
                    'self_evaluation' => $competency['self_evaluation'] ?? '',
                    'supervisor_evaluation' => $competency['supervisor_evaluation'] ?? '',
                    'weight' => $competency['weight'] ?? 0,
                ]
            );
        }

        return redirect()->route('sheet.access', ['sheet' => $request->sheetId])->with('success', 'Competencies updated successfully');
    }
}

