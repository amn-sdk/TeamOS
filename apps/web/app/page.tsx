import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          TeamOS
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Plateforme complète de gestion pour clubs de football amateurs
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/auth/login">
            <Button size="lg">Se connecter</Button>
          </Link>
          <Link href="/auth/register">
            <Button size="lg" variant="outline">S'inscrire</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
