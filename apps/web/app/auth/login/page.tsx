'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Simulate login success
            router.push('/coach')
        } catch (err) {
            setError('Email ou mot de passe incorrect')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
                <CardDescription className="text-center">
                    Entrez vos identifiants pour accéder à votre compte
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md">
                            {error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="coach@monclub.fr"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Connexion...' : 'Se connecter'}
                    </Button>
                    <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Pas encore de compte ?{' '}
                        <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
                            S'inscrire
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    )
}
