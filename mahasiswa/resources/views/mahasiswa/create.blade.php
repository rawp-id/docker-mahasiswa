@extends('layouts.app')

@section('content')
    <h2 class="text-center">Tambah Mahasiswa</h2>

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <!-- Tambah Mahasiswa -->
    <form action="{{ route('mahasiswa.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">NIM</label>
            <input type="text" name="nim" class="form-control" placeholder="NIM" required>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Nama</label>
            <input type="text" name="nama" class="form-control" placeholder="Nama" required>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Jurusan</label>
            <select class="form-select" aria-label="Default select example" name="jurusan" required>
                <option selected>Open this select menu</option>
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Teknik Arsitek">Teknik Arsitek</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Alamat</label>
            <textarea class="form-control" name="alamat" id="exampleFormControlTextarea1" placeholder="Alamat" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-4 w-100">Tambah Mahasiswa</button>
    </form>
@endsection
