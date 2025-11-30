'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Calendar, MapPin, Trophy, Users, Target, Activity } from 'lucide-react'

// Temporary mock data
const mockMatchData = {
    id: '1',
    date: '2025-12-07',
    time: '15:00',
    opponent: 'FC Rivaux',
    homeAway: 'DOMICILE',
    matchType: 'CHAMPIONNAT',
    location: 'Stade Municipal',
    scoreFor: 3,
    scoreAgainst: 1,
    htScoreFor: 1,
    htScoreAgainst: 0,
    lineup: [
        { id: '1', name: 'Lucas Dubois', role: 'TITULAIRE', position: 'Attaquant', minutes: 90, rating: 8 },
        { id: '2', name: 'Thomas Martin', role: 'TITULAIRE', position: 'Milieu', minutes: 90, rating: 7 },
        { id: '3', name: 'Antoine Bernard', role: 'TITULAIRE', position: 'Défenseur', minutes: 90, rating: 6 },
        { id: '5', name: 'Alexandre Roux', role: 'REMPLACANT', position: 'Milieu', minutes: 20, rating: 7 },
    ],
    stats: [
        { playerId: '1', playerName: 'Lucas Dubois', goals: 2, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: '2', playerName: 'Thomas Martin', goals: 1, assists: 1, yellowCards: 1, redCards: 0 },
    ],
    events: [
        { minute: 23, type: 'BUT', player: 'Lucas Dubois' },
        { minute: 45, type: 'CARTON_JAUNE', player: 'Thomas Martin' },
        { minute: 67, type: 'BUT', player: 'Thomas Martin' },
        { minute: 85, type: 'BUT', player: 'Lucas Dubois' },
    ],
}

const eventIcons: Record<string, string> = {
    BUT: '⚽',
    CARTON_JAUNE: '🟨',
    CARTON_ROUGE: '🟥',
    CHANGEMENT: '🔄',
}

export default function MatchDetailsPage() {
    const params = useParams()
    const match = mockMatchData

    const result = match.scoreFor > match.scoreAgainst ? 'Victoire'
        : match.scoreFor < match.scoreAgainst ? 'Défaite'
            : 'Nul'

    const titulaires = match.lineup.filter(p => p.role === 'TITULAIRE')
    const remplacants = match.lineup.filter(p => p.role === 'REMPLACANT')

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <Link href="/coach/matches">
                    <Button variant="ghost" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Retour aux matchs
                    </Button>
                </Link>
            </div>

            {/* Header */}
            <Card className="mb-8">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <CardTitle className="text-3xl">
                                {match.homeAway === 'DOMICILE' ? 'TeamOS' : match.opponent}
                                <span className="mx-4 text-2xl font-bold">{match.scoreFor} - {match.scoreAgainst}</span>
                                {match.homeAway === 'DOMICILE' ? match.opponent : 'TeamOS'}
                            </CardTitle>
                            <CardDescription className="mt-2 text-sm">
                                Mi-temps: {match.htScoreFor} - {match.htScoreAgainst}
                            </CardDescription>
                        </div>
                        <div className={`text-xl font-bold px-4 py-2 rounded ${result === 'Victoire' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                result === 'Défaite' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                    'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                            }`}>
                            {result}
                        </div>
                    </div>
                    <div className="flex items-center gap-6 mt-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(match.date).toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })} - {match.time}
                        </span>
                        <span className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {match.location}
                        </span>
                        <span className="flex items-center gap-2">
                            <Trophy className="h-4 w-4" />
                            {match.matchType}
                        </span>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Composition */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Composition
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-3">Titulaires</h3>
                            <div className="space-y-2">
                                {titulaires.map((player) => (
                                    <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                        <div>
                                            <p className="font-medium">{player.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{player.position}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm">{player.minutes}'</p>
                                            {player.rating && (
                                                <p className="text-xs text-gray-600">Note: {player.rating}/10</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {remplacants.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-3">Remplaçants</h3>
                                <div className="space-y-2">
                                    {remplacants.map((player) => (
                                        <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                            <div>
                                                <p className="font-medium">{player.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{player.position}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm">{player.minutes}'</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {/* Événements */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5" />
                                Événements
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {match.events.map((event, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <span className="text-2xl">{eventIcons[event.type]}</span>
                                        <div className="flex-1">
                                            <p className="font-medium">{event.player}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{event.minute}'</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Statistiques */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                Statistiques
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {match.stats.map((stat) => (
                                    <div key={stat.playerId} className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                                        <p className="font-medium mb-2">{stat.playerName}</p>
                                        <div className="grid grid-cols-4 gap-2 text-sm">
                                            <div className="text-center">
                                                <p className="text-gray-600 dark:text-gray-400">Buts</p>
                                                <p className="font-bold text-green-600">{stat.goals}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-gray-600 dark:text-gray-400">Passes D.</p>
                                                <p className="font-bold text-blue-600">{stat.assists}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-gray-600 dark:text-gray-400">🟨</p>
                                                <p className="font-bold">{stat.yellowCards}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-gray-600 dark:text-gray-400">🟥</p>
                                                <p className="font-bold">{stat.redCards}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
