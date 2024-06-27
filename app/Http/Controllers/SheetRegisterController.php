<?php
namespace App\Http\Controllers;

use Inertia\Inertia;

class SheetRegisterController extends Controller
{
    public function show()
    {
        return Inertia::render('SheetRegister');
    }
}
?>