export default function Header() {
  return (
    <header className="bg-dark border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <img
            src="/src/assets/logo.webp"
            alt="PrivateCheats"
            className="h-10 w-auto"
          />
          <nav className="flex gap-8">
            <a href="#" className="text-gray-300 neon-hover font-medium">Home</a>
            <a href="#" className="text-gray-300 neon-hover font-medium">Conta</a>
            <a href="#" className="text-gray-300 neon-hover font-medium">Produtos</a>
            <a href="#" className="text-gray-300 neon-hover font-medium">Contato</a>
          </nav>
        </div>
      </div>
    </header>
  )
}
