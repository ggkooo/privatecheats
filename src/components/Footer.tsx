import logo from '../assets/logo.webp'

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-slate-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="PrivateCheats Logo" className="w-16 h-16 rounded" />
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Soluções inovadoras para suas necessidades. Comprometidos com qualidade e excelência.
            </p>
            <div className="flex gap-4">
              <a href="https://www.youtube.com/@privateprojectofc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">YouTube</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://discord.gg/privatereturnofc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Discord</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1 -.008-.128c.126-.095.252-.195.372-.297a.074.074 0 0 1 .076-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .076.01c.12.102.246.202.372.297a.077.077 0 0 1 -.007.128c-.598.35-1.225.645-1.873.891a.076.076 0 0 0 -.041.107c.352.699.764 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-4.718-.838-8.812-3.543-12.46a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156c0-1.193.973-2.157 2.157-2.157c1.193 0 2.156.964 2.156 2.157c0 1.19-.963 2.155-2.156 2.155zm7.975 0c-1.183 0-2.157-.965-2.157-2.156c0-1.193.973-2.157 2.157-2.157c1.193 0 2.156.964 2.156 2.157c0 1.19-.963 2.155-2.156 2.155z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Produto</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Recursos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Preços</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Sobre nós</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Blog</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Política de Privacidade</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Termos de Serviço</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Política de Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2026 PrivateCheats. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm">
              Desenvolvido com ❤️ por ggkooo
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
