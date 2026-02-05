import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, isAuthenticated } = useAuth()

  return (
    <header className="bg-dark border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" aria-label="Voltar para a página inicial">
            <img
              src="/src/assets/logo.webp"
              alt="PrivateCheats"
              className="h-10 w-auto"
            />
          </Link>
          <nav className="flex gap-8 items-center">
            <Link to="/" className="text-gray-300 neon-hover font-medium">Home</Link>
            <a href="#" className="text-gray-300 neon-hover font-medium">Produtos</a>
            <a href="#" className="text-gray-300 neon-hover font-medium">Contato</a>
            
            {isAuthenticated && user ? (
              <Link
                to="/account"
                className="text-gray-300 neon-hover font-medium hover:text-neon-pink transition-colors"
              >
                👤 {user.name}
              </Link>
            ) : (
              <Link to="/auth" className="text-gray-300 neon-hover font-medium">Login</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
