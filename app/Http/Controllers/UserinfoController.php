<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Userinfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserinfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        // バリデーション
        $request->validate([
            'name' => 'required|string|max:255',
            'lid' => 'required|string|max:255|unique:userinfo,lid',
            'lpw' => 'required|string|min:8',
            'kanri_flg' => 'required|integer|in:0,1',
        ]);

        // データの保存
        Userinfo::create([
            'name' => $request->name,
            'lid' => $request->lid,
            'lpw' => Hash::make($request->lpw), // パスワードをハッシュ化
            'kanri_flg' => $request->kanri_flg
        ]);

        return redirect()->route('user-register')->with('success', 'ユーザーが作成されました');
    }

    /**
     * Display the specified resource.
     */
    public function show(Userinfo $userinfo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Userinfo $userinfo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Userinfo $userinfo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Userinfo $userinfo)
    {
        //
    }
}
