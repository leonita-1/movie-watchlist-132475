import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-600 hover:underline">Go home</Link>
    </div>
  )
}

export default NotFoundPage
