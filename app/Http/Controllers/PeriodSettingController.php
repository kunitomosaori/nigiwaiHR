<?php
namespace App\Http\Controllers;

use App\Models\SheetPeriodSetting;
use Illuminate\Http\Request;

class PeriodSettingController extends Controller
{
    public function index()
    {
        $periodSettings = SheetPeriodSetting::all();
        return response()->json(['period_settings' => $periodSettings]);
    }
}
?>
