import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

type TabType = 'profile' | 'security' | 'preferences' | 'purchases'

export default function Account() {
  const navigate = useNavigate()
  const { user, logout, setUser } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Redirecionar se não autenticado
  if (!user) {
    navigate('/auth')
    return null
  }

  // Estado dos formulários
  const [editName, setEditName] = useState(user.name)
  const [editEmail, setEditEmail] = useState(user.email)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [notifications, setNotifications] = useState({
    email: true,
    promotions: false,
  })

  const API_URL = 'http://localhost:5000/api'

  // Atualizar perfil
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erro ao atualizar perfil')
        return
      }

      // Atualizar contexto
      const updatedUser = { ...user, name: editName, email: editEmail }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))

      setSuccess('Perfil atualizado com sucesso!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  // Alterar senha
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      setError('As senhas não correspondem')
      return
    }

    if (newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/user/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erro ao alterar senha')
        return
      }

      setSuccess('Senha alterada com sucesso!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  // Atualizar preferências
  const handleUpdatePreferences = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/user/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(notifications),
      })

      if (!response.ok) {
        setError('Erro ao atualizar preferências')
        return
      }

      setSuccess('Preferências atualizadas com sucesso!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  // Fazer logout
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho da página */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Minha Conta</h1>
          <p className="text-gray-400">Gerencie suas informações e preferências</p>
        </div>

        {/* Mensagens de erro e sucesso */}
        {error && (
          <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg text-red-100">
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-900 border border-green-700 rounded-lg text-green-100">
            ✅ {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar com abas */}
          <div className="lg:col-span-1">
            <div className="bg-[#0E0F12] rounded-lg overflow-hidden sticky top-24">
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-3 text-left font-medium transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-neon-purple text-white border-l-4 border-neon-pink'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  👤 Perfil
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-4 py-3 text-left font-medium transition-colors ${
                    activeTab === 'security'
                      ? 'bg-neon-purple text-white border-l-4 border-neon-pink'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  🔒 Segurança
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`px-4 py-3 text-left font-medium transition-colors ${
                    activeTab === 'preferences'
                      ? 'bg-neon-purple text-white border-l-4 border-neon-pink'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  ⚙️ Preferências
                </button>
                <button
                  onClick={() => setActiveTab('purchases')}
                  className={`px-4 py-3 text-left font-medium transition-colors ${
                    activeTab === 'purchases'
                      ? 'bg-neon-purple text-white border-l-4 border-neon-pink'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  🛒 Compras
                </button>
                <hr className="border-slate-700" />
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 text-left font-medium text-red-400 hover:bg-red-900 hover:text-red-200 transition-colors"
                >
                  🚪 Sair
                </button>
              </nav>
            </div>
          </div>

          {/* Conteúdo das abas */}
          <div className="lg:col-span-3">
            {/* Aba Perfil */}
            {activeTab === 'profile' && (
              <div className="bg-[#0E0F12] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Informações do Perfil</h2>

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  {/* ID do usuário (read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ID da Conta
                    </label>
                    <input
                      type="text"
                      value={`#${user.id}`}
                      disabled
                      className="w-full px-4 py-2 bg-transparent border border-slate-600 rounded-lg text-gray-300 cursor-not-allowed focus:border-orange-500/30 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-2 bg-transparent border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500/30 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full px-4 py-2 bg-transparent border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500/30 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Botão de envio */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-2 bg-neon-pink text-white font-medium rounded-lg hover:bg-neon-pink/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {loading ? 'Atualizando...' : 'Salvar Alterações'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Aba Segurança */}
            {activeTab === 'security' && (
              <div className="bg-[#0E0F12] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Segurança</h2>

                <form onSubmit={handleChangePassword} className="space-y-6">
                  {/* Senha Atual */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Senha Atual
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-transparent border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500/30 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Nova Senha */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-transparent border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500/30 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-colors"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">Mínimo 6 caracteres</p>
                  </div>

                  {/* Confirmar Senha */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-transparent border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500/30 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Botão de envio */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-2 bg-neon-pink text-white font-medium rounded-lg hover:bg-neon-pink/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {loading ? 'Alterando...' : 'Alterar Senha'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Aba Preferências */}
            {activeTab === 'preferences' && (
              <div className="bg-[#0E0F12] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Preferências</h2>

                <form onSubmit={handleUpdatePreferences} className="space-y-6">
                  {/* Notificações por Email */}
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Notificações por Email</h3>
                      <p className="text-sm text-gray-400">Receba updates sobre sua conta</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            email: e.target.checked,
                          })
                        }
                        className="w-5 h-5 accent-neon-pink"
                      />
                    </label>
                  </div>

                  {/* Emails Promocionais */}
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Emails Promocionais</h3>
                      <p className="text-sm text-gray-400">Receba ofertas e descontos exclusivos</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.promotions}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            promotions: e.target.checked,
                          })
                        }
                        className="w-5 h-5 accent-neon-pink"
                      />
                    </label>
                  </div>

                  {/* Botão de envio */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-2 bg-neon-pink text-white font-medium rounded-lg hover:bg-neon-pink/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {loading ? 'Salvando...' : 'Salvar Preferências'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Aba Compras */}
            {activeTab === 'purchases' && (
              <div className="bg-[#0E0F12] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Histórico de Compras</h2>

                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">Você ainda não fez nenhuma compra</p>
                  <a
                    href="/"
                    className="inline-block px-6 py-2 bg-neon-pink text-white font-medium rounded-lg hover:bg-neon-pink/90 transition-all"
                  >
                    Explorar Produtos
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
