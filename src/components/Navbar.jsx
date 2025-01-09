import { Link } from 'react-router-dom'
    import { FaPlane } from 'react-icons/fa'

    export default function Navbar() {
      return (
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <FaPlane className="text-xl" />
              <span className="text-xl font-bold">Travel Planner</span>
            </Link>
            <div className="flex gap-4">
              <Link to="/" className="hover:text-blue-200">Home</Link>
              <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
                Login
              </button>
            </div>
          </div>
        </nav>
      )
    }
