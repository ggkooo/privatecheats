import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'
import Header from '../components/Header'

type AuthMode = 'login' | 'register' | 'forgot'

const API_URL = 'http://localhost:5000/api/auth'

export default function Login() {
  const navigate = useNavigate()
  const { login: setAuthUser } = useAuth()
  
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // Form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const isRegister = authMode === 'register'
  const isForgot = authMode === 'forgot'

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setError('')
    setSuccess('')
  }

  const handleAuthModeChange = (newMode: AuthMode) => {
    setAuthMode(newMode)
    resetForm()
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erro ao criar conta')
        return
      }

      setSuccess('Conta criada com sucesso! Redirecionando para login...')
      resetForm()
      
      setTimeout(() => {
        setAuthMode('login')
        setSuccess('')
      }, 2000)
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erro ao fazer login')
        return
      }

      setSuccess('Login realizado com sucesso!')
      
      // Armazenar na sessão via contexto
      setAuthUser(data.user, data.token)
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', email)
      }

      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erro ao solicitar recuperação')
        return
      }

      setSuccess('Se o email existir, um link de recuperação será enviado')
      setEmail('')
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    if (isRegister) {
      handleRegister(e)
    } else if (isForgot) {
      handleForgotPassword(e)
    } else {
      handleLogin(e)
    }
  }

  return (
    <div className="min-h-screen bg-dark text-gray-100">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <section>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Área do cliente</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold">
              {isRegister ? 'Crie sua conta' : isForgot ? 'Recupere sua senha' : 'Acesse sua conta'}
            </h1>
            <p className="mt-4 text-gray-400 text-lg">
              {isRegister
                ? 'Cadastre-se para acompanhar seus pedidos, acessar downloads e receber novidades exclusivas.'
                : isForgot
                  ? 'Informe seu e-mail e enviaremos um link para redefinir sua senha.'
                  : 'Faça login para acompanhar seus pedidos, acessar downloads e receber novidades exclusivas.'}
            </p>
            <div className="mt-8 space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <p>Histórico completo de compras e renovações.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <p>Acesso rápido aos seus produtos e licenças.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <p>Suporte prioritário direto pelo painel.</p>
              </div>
            </div>
          </section>

          <section className="bg-[#0E0F12] border border-[color:var(--color-primary)] rounded-2xl p-8 shadow-[0_0_18px_rgba(217,81,8,0.45)]">
            <h2 className="text-2xl font-semibold">
              {isRegister ? 'Criar conta' : isForgot ? 'Esqueci a senha' : 'Entrar'}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              {isRegister
                ? 'Preencha os campos abaixo para concluir seu cadastro.'
                : isForgot
                  ? 'Enviaremos um link de recuperação para o seu e-mail.'
                  : 'Use seu e-mail e senha cadastrados.'}
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-lg bg-red-950/50 border border-red-800 p-3 text-red-300 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-lg bg-green-950/50 border border-green-800 p-3 text-green-300 text-sm">
                  {success}
                </div>
              )}

              {isRegister && (
                <div>
                  <label className="text-sm font-medium text-gray-300">Nome completo</label>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/70"
                  />
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-300">E-mail</label>
                <input
                  type="email"
                  placeholder="voce@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/70"
                />
              </div>

              {!isForgot && (
                <div>
                  <label className="text-sm font-medium text-gray-300">Senha</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/70"
                  />
                </div>
              )}

              {isRegister && (
                <div>
                  <label className="text-sm font-medium text-gray-300">Confirmar senha</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/70"
                  />
                </div>
              )}

              {!isRegister && !isForgot && (
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-600 bg-slate-900 accent-[color:var(--color-primary)]"
                    />
                    Lembrar de mim
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAuthModeChange('forgot')}
                    className="text-primary hover:text-primary/80"
                  >
                    Esqueci a senha
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-black transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Carregando...' : isRegister ? 'Criar conta' : isForgot ? 'Enviar link' : 'Entrar'}
              </button>
            </form>

            <div className="mt-6 text-sm text-gray-400">
              {isForgot ? 'Lembrou a senha?' : isRegister ? 'Já tem conta?' : 'Não tem conta?'}{' '}
              <button
                type="button"
                onClick={() =>
                  handleAuthModeChange(
                    (authMode === 'register' ? 'login' : authMode === 'forgot' ? 'login' : 'register') as AuthMode
                  )
                }
                className="text-primary hover:text-primary/80"
              >
                {isForgot ? 'Fazer login' : isRegister ? 'Fazer login' : 'Criar conta'}
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
