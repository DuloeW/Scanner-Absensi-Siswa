import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        404 - Not Found
                    </h2>
                </div>
                <div className="mt-6 text-center text-2xl text-gray-600">
                    <p>Halaman Yang Anda Cari, Sedang Tidak Tersedia.</p>
                </div>
                <div className="mt-6 text-center">
                    <Link to="/" className="text-blue-500 hover:text-blue-700">
                        Kembali
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;