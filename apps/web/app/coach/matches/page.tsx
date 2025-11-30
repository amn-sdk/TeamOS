'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Plus, Calendar, MapPin, Target } from 'lucide-react'

// Temporary mock data
const mockMatches = [
    {
        id: '1',
        date: '2025-12-07',
        time: '15:00',
        opponent: 'FC Rivaux',
        homeAway: 'DOMICILE',
        matchType: 'CHAMPIONNAT',
        location: 'Stade Municipal',
        scoreFor: 3,
        scoreAgainst: 1,
        status: 'TERMINE',
    },
    {
        id: '2',
        date: '2025-12-14',
        time: '16:30',
        opponent: 'AS Sporting',
        homeAway: 'EXTERIEUR',
        matchType: 'COUPE',
        location: 'Stade Adverse',
        scoreFor: null,
        scoreAgainst: null,
        status: 'A_VENIR',
    },
]

export default function MatchesPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Trophy className="h-8 w-8" />
                        Matchs
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Gérez vos matchs et les statistiques
                    </p>
                </div>
                <Link href="/coach/matches/new">
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nouveau match
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {mockMatches.map((match) => {
                    const isFinished = match.status === 'TERMINE'
                    const result = isFinished
                        ? match.scoreFor! > match.scoreAgainst! ? 'Victoire'
                            : match.scoreFor! < match.scoreAgainst! ? 'Défaite'
                                : 'Nul'
                        : null

                    return (
                        <Link key={match.id} href={`/coach/matches/${match.id}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <CardTitle className="text-xl flex items-center gap-2">
                                                {match.homeAway === 'DOMICILE' ? (
                                                    <>
                                                        <span className="font-bold">TeamOS</span>
                                                        <span className="text-gray-400">vs</span>
                                                        <span>{match.opponent}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>{match.opponent}</span>
                                                        <span className="text-gray-400">vs</span>
                                                        <span className="font-bold">TeamOS</span>
                                                    </>
                                                )}
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-4 mt-2">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(match.date).toLocaleDateString('fr-FR')} - {match.time}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    {match.location}
                                                </span>
                                                <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                                                    {match.matchType}
                                                </span>
                                            </CardDescription>
                                        </div>
                                        {isFinished && (
                                            <div className="text-right">
                                                <div className="text-3xl font-bold">
                                                    {match.scoreFor} - {match.scoreAgainst}
                                                </div>
                                                <div className={`text-sm font-medium ${result === 'Victoire' ? 'text-green-600' :
                                                        result === 'Défaite' ? 'text-red-600' :
                                                            'text-gray-600'
                                                    }`}>
                                                    {result}
                                                </div>
                                            </div>
                                        )}
                                        {!isFinished && (
                                            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                                                <Target className="h-4 w-4 text-gray-600" />
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                    À venir
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    )
                })}
            </div>

            {mockMatches.length === 0 && (
                <div className="text-center py-12">
                    <Trophy className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                        Aucun match planifié
                    </p>
                </div>
            )}
        </div>
    )
}
