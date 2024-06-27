<?php
namespace App\Http\Controllers;

use Inertia\Inertia;

class UserRegisterController extends Controller
{
    public function show()
    {
        return Inertia::render('UserRegister');
    }
}
?>
