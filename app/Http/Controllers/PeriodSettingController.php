<?php
namespace App\Http\Controllers;

use App\Models\SheetPeriodSettings;
use Illuminate\Http\Request;

class PeriodSettingController extends Controller
{
    public function index()
    {
        $periodSettings = SheetPeriodSettings::all();
        return response()->json(['period_settings' => $periodSettings]);
    }
}
?>