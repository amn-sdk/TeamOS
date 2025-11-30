'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Edit, Mail, Phone, Calendar, Award, TrendingUp } from 'lucide-react'

// Temporary mock data
const mockPlayerData = {
    id: '1',
    firstName: 'Lucas',
    lastName: 'Dubois',
    birthdate: '2005-03-15',
    phone: '+33 6 12 34 56 78',
    email: 'lucas.dubois@email.com',
    profile: {
        mainPosition: 'Attaquant',
        secondaryPosition: 'Ailier droit',
        foot: 'DROIT',
        heightCm: 178,
        weightKg: 72,
        shirtNumber: 9,
    },
    status: 'ACTIVE',
    stats: {
        matchesPlayed: 12,
        goals: 8,
        assists: 5,
        yellowCards: 2,
        redCards: 0,
    },
}

export default function PlayerProfilePage() {
    const params = useParams()
    const player = mockPlayerData

    const age = new Date().getFullYear() - new Date(player.birthdate).getFullYear()

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <Link href="/coach/players">
                    <Button variant="ghost" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Retour à l'effectif
                    </Button>
                </Link>
            </div>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {player.firstName} {player.lastName}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                        <span>{player.profile.mainPosition}</span>
                        <span>•</span>
                        <span>{age} ans</span>
                        <span>•</span>
                        <span className="text-2xl font-bold text-blue-600">#{player.profile.shirtNumber}</span>
                    </p>
                </div>
                <Link href={`/coach/players/${params.id}/edit`}>
                    <Button className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Modifier
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Informations personnelles */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Informations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Date de naissance</p>
                                <p className="font-medium">{new Date(player.birthdate).toLocaleDateString('fr-FR')}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Téléphone</p>
                                <p className="font-medium">{player.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Email</p>
                                <p className="font-medium">{player.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Profil sportif */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Profil sportif</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Position principale</p>
                            <p className="font-medium">{player.profile.mainPosition}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Position secondaire</p>
                            <p className="font-medium">{player.profile.secondaryPosition}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Pied fort</p>
                            <p className="font-medium">{player.profile.foot === 'DROIT' ? 'Droit' : 'Gauche'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Taille</p>
                                <p className="font-medium">{player.profile.heightCm} cm</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Poids</p>
                                <p className="font-medium">{player.profile.weightKg} kg</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistiques */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Statistiques
                        </CardTitle>
                        <CardDescription>Saison en cours</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Matchs joués</p>
                            <p className="text-2xl font-bold">{player.stats.matchesPlayed}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Buts</p>
                                <p className="text-xl font-bold text-green-600">{player.stats.goals}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Passes D.</p>
                                <p className="text-xl font-bold text-blue-600">{player.stats.assists}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Cartons jaunes</p>
                                <p className="text-xl font-bold text-yellow-600">{player.stats.yellowCards}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Cartons rouges</p>
                                <p className="text-xl font-bold text-red-600">{player.stats.redCards}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
