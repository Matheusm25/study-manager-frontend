"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Lock, Sparkles } from "lucide-react"
import { AuthService } from "@/service/auth"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const loginErrors: Record<string, string> = {
    UserConflict: 'O usuario já existe com uma senha diferente',
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (username.trim() && password.trim()) {
      const response = await AuthService.login(username, password)

      if (loginErrors[response]) {
        setError(loginErrors[response])
        return
      } else if (!response) {
        setError("Erro ao fazer login. Tente novamente.")
        return
      }

      // Store login state in localStorage for demo purposes
      localStorage.setItem("api-token", response)
      localStorage.setItem("username", username)
      router.push("/dashboard")
    } else {
      setError("usuário e senha são obrigatórios.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-cream-50 to-pastel-light-grey-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-bg-surface/95 backdrop-blur-xl border-0 shadow-2xl shadow-pastel-muted-blue-200/20 overflow-hidden">
        {/* Modern Header */}
        <CardHeader className="bg-gradient-to-r from-pastel-muted-blue-500 via-pastel-soft-pink-400 to-pastel-lavender-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pastel-muted-blue-400/20 via-transparent to-pastel-soft-pink-400/20"></div>
          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight mb-2">Study Manager</CardTitle>
            <CardDescription className="text-pastel-muted-blue-100 font-medium">
              Sign in to manage your study schedule
            </CardDescription>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-text-primary font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Usuário
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-0 bg-gradient-to-br from-pastel-cream-50 to-pastel-light-grey-50 focus:ring-2 focus:ring-pastel-muted-blue-400 rounded-xl h-12 text-text-primary placeholder:text-text-secondary"
                placeholder="Usuário"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-text-primary font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-0 bg-gradient-to-br from-pastel-cream-50 to-pastel-light-grey-50 focus:ring-2 focus:ring-pastel-muted-blue-400 rounded-xl h-12 text-text-primary placeholder:text-text-secondary"
                placeholder="Digite sua senha"
              />
            </div>
            {error && (
              <div className="p-3 bg-pastel-soft-pink-50 border border-pastel-soft-pink-200 rounded-xl">
                <p className="text-pastel-soft-pink-600 text-sm font-medium">{error}</p>
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pastel-muted-blue-500 to-pastel-lavender-500 hover:from-pastel-muted-blue-600 hover:to-pastel-lavender-600 text-white border-0 rounded-xl h-12 text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
