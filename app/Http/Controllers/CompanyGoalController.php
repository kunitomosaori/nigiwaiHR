<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SheetCompanyGoal;
use App\Models\SheetPeriodSetting;
use Carbon\Carbon;

class CompanyGoalController extends Controller
{
    public function getCurrentGoal()
    {
        $currentMonth = Carbon::now()->month;

        $periodSetting = SheetPeriodSetting::where('start_month', '<=', $currentMonth)
            ->where('end_month', '>=', $currentMonth)
            ->first();

        if (!$periodSetting) {
            return response()->json(['error' => 'No period setting found for the current month'], 404);
        }

        $sheetCompanyGoal = SheetCompanyGoal::where('period_id', $periodSetting->id)->first();

        return response()->json(['goal' => $sheetCompanyGoal ? $sheetCompanyGoal->goal : '', 'period_id' => $periodSetting->id]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'goal' => 'required|string',
            'period_id' => 'required|integer|exists:sheet_period_settings,id',
        ]);

        $sheetCompanyGoal = SheetCompanyGoal::updateOrCreate(
            ['period_id' => $request->period_id],
            ['goal' => $request->goal]
        );

        return response()->json(['message' => 'Company goal saved successfully'], 201);
    }
}
?>
