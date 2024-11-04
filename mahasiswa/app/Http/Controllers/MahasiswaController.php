<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    public function index()
    {
        $mahasiswa = Mahasiswa::all();
        return view('mahasiswa.index', compact('mahasiswa'));
    }

    public function create(){
        return view('mahasiswa.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nim' => 'required|numeric',
            'nama' => 'required|string',
            'jurusan' => 'required|string',
            'alamat' => 'required',
        ]);

        Mahasiswa::create($validated);

        return redirect('/mahasiswa')->with('success', 'Mahasiswa berhasil ditambahkan!');
    }

    public function edit($id)
    {
        $mahasiswa = Mahasiswa::find($id);
        return view('mahasiswa.edit', compact('mahasiswa'));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nim' => 'required|numeric',
            'nama' => 'required|string',
            'jurusan' => 'required|string',
            'alamat' => 'required',
        ]);

        Mahasiswa::whereId($id)->update($validated);

        return redirect('/mahasiswa')->with('success', 'Mahasiswa berhasil diupdate!');
    }

    public function destroy($id)
    {
        Mahasiswa::destroy($id);
        return redirect()->back()->with('success', 'Mahasiswa berhasil dihapus!');
    }
}
