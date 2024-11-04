@extends('layouts.app')

@section('content')
    <h2 class="text-center">Edit Mahasiswa</h2>

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <form action="{{ route('mahasiswa.update', $mahasiswa->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">NIM</label>
            <input type="text" name="nim" class="form-control" placeholder="NIM" value="{{ $mahasiswa->nim }}" required>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Nama</label>
            <input type="text" name="nama" class="form-control" placeholder="Nama" value="{{ $mahasiswa->nama }}" required>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Jurusan</label>
            <select class="form-select" aria-label="Default select example" name="jurusan" required>
                <option value="" disabled selected>Select Jurusan</option>
                <option value="Teknik Informatika" {{ $mahasiswa->jurusan == 'Teknik Informatika' ? 'selected' : '' }}>Teknik Informatika</option>
                <option value="Teknik Arsitek" {{ $mahasiswa->jurusan == 'Teknik Arsitek' ? 'selected' : '' }}>Teknik Arsitek</option>
            </select>            
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Alamat</label>
            <textarea class="form-control" name="alamat" id="exampleFormControlTextarea1" placeholder="Alamat" rows="3">{{ $mahasiswa->alamat }}</textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-4 w-100">Edit Mahasiswa</button>
    </form>
@endsection
