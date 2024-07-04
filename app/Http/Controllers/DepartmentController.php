<?php
namespace App\Http\Controllers;

use App\Models\UserDepartment;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = UserDepartment::all();
        return response()->json(['departments' => $departments]);
    }
}
?>