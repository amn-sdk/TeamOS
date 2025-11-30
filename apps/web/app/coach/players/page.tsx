'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, UserPlus, Users } from 'lucide-react'

// Temporary mock data
const mockPlayers = [
    { id: '1', firstName: 'Lucas', lastName: 'Dubois', position: 'Attaquant', number: 9, status: 'ACTIVE' },
    { id: '2', firstName: 'Thomas', lastName: 'Martin', position: 'Milieu', number: 10, status: 'ACTIVE' },
    { id: '3', firstName: 'Antoine', lastName: 'Bernard', position: 'Défenseur', number: 4, status: 'ACTIVE' },
    { id: '4', firstName: 'Maxime', lastName: 'Petit', position: 'Gardien', number: 1, status: 'ACTIVE' },
    { id: '5', firstName: 'Alexandre', lastName: 'Roux', position: 'Milieu', number: 8, status: 'BLESSE' },
]

export default function PlayersPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredPlayers = mockPlayers.filter(player =>
        `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Users className="h-8 w-8" />
                        Effectif
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Gérez vos joueurs et leurs profils
                    </p>
                </div>
                <Link href="/coach/players/new">
                    <Button className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        Ajouter un joueur
                    </Button>
                </Link>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                        type="text"
                        placeholder="Rechercher un joueur..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlayers.map((player) => (
                    <Link key={player.id} href={`/coach/players/${player.id}`}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl">
                                            {player.firstName} {player.lastName}
                                        </CardTitle>
                                        <CardDescription>{player.position}</CardDescription>
                                    </div>
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        #{player.number}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${player.status === 'ACTIVE'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                            }`}
                                    >
                                        {player.status === 'ACTIVE' ? 'Actif' : 'Blessé'}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {filteredPlayers.length === 0 && (
                <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                        Aucun joueur trouvé
                    </p>
                </div>
            )}
        </div>
    )
}
