import { useState } from 'react'
import { movies as initialMovies } from '../utils/movies'

function MoviesPage() {
    const [movies, setMovies] = useState(initialMovies)
    const [form, setForm] = useState({ title: '', director: '', genre: '', watched: false })
    const [errors, setErrors] = useState({})

    const validate = () => {
        const newErrors = {}
        if (!form.title.trim()) newErrors.title = 'Title is required'
        if (!form.director.trim()) newErrors.director = 'Director is required'
        return newErrors
    }

    const handleAdd = () => {
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        setMovies([...movies, { ...form, id: Date.now() }])
        setForm({ title: '', director: '', genre: '', watched: false })
        setErrors({})
    }

    const handleToggleWatched = (id) => {
        setMovies(movies.map(movie =>
            movie.id === id ? { ...movie, watched: !movie.watched } : movie
        ))
    }

    const handleDelete = (id) => {
        setMovies(movies.filter(movie => movie.id !== id))
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Movies</h1>

            {/* Add Movie Form */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-8 space-y-3">
                <h2 className="text-lg font-semibold text-gray-900">Add Movie</h2>

                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Director"
                        value={form.director}
                        onChange={e => setForm({ ...form, director: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    {errors.director && <p className="text-red-500 text-xs mt-1">{errors.director}</p>}
                </div>

                <input
                    type="text"
                    placeholder="Genre"
                    value={form.genre}
                    onChange={e => setForm({ ...form, genre: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />

                <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                        type="checkbox"
                        checked={form.watched}
                        onChange={e => setForm({ ...form, watched: e.target.checked })}
                    />
                    Watched
                </label>

                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                    Add Movie
                </button>
            </div>

            {/* Movie List */}
            <ul className="space-y-4">
                {movies.map(movie => (
                    <li key={movie.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">{movie.title}</h2>
                        <p className="text-sm text-gray-600">Director: {movie.director}</p>
                        <p className="text-sm text-gray-600">Genre: {movie.genre}</p>
                        <p className="text-sm text-gray-600">
                            Status: <span className={movie.watched ? 'text-green-600' : 'text-red-500'}>
                {movie.watched ? 'Watched' : 'Unwatched'}
              </span>
                        </p>
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={() => handleToggleWatched(movie.id)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600"
                            >
                                {movie.watched ? 'Mark Unwatched' : 'Mark Watched'}
                            </button>
                            <button
                                onClick={() => handleDelete(movie.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MoviesPage
