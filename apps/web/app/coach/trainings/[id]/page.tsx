'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Calendar, Clock, MapPin, Dumbbell, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

// Temporary mock data
const mockTrainingData = {
    id: '1',
    date: '2025-12-02',
    startTime: '18:00',
    endTime: '20:00',
    location: 'Stade Municipal',
    surface: 'Pelouse naturelle',
    theme: 'Tactique défensive',
    intensity: 'MODEREE',
    attendance: [
        { playerId: '1', playerName: 'Lucas Dubois', status: 'PRESENT', minutesEffective: 120 },
        { playerId: '2', playerName: 'Thomas Martin', status: 'PRESENT', minutesEffective: 120 },
        { playerId: '3', playerName: 'Antoine Bernard', status: 'RETARD', lateMinutes: 15, minutesEffective: 105 },
        { playerId: '5', playerName: 'Alexandre Roux', status: 'ABSENT' },
        { playerId: '6', playerName: 'Julien Moreau', status: 'EXCUSE' },
    ],
    rpe: [
        { playerId: '1', playerName: 'Lucas Dubois', value: 7 },
        { playerId: '2', playerName: 'Thomas Martin', value: 6 },
        { playerId: '3', playerName: 'Antoine Bernard', value: 8 },
    ],
}

const statusIcons = {
    PRESENT: <CheckCircle className="h-5 w-5 text-green-600" />,
    ABSENT: <XCircle className="h-5 w-5 text-red-600" />,
    EXCUSE: <AlertCircle className="h-5 w-5 text-yellow-600" />,
    RETARD: <AlertCircle className="h-5 w-5 text-orange-600" />,
}

export default function TrainingDetailsPage() {
    const params = useParams()
    const training = mockTrainingData

    const presentCount = training.attendance.filter(a => a.status === 'PRESENT' || a.status === 'RETARD').length
    const totalPlayers = training.attendance.length
    const attendanceRate = ((presentCount / totalPlayers) * 100).toFixed(0)

    const avgRpe = training.rpe.length > 0
        ? (training.rpe.reduce((sum, r) => sum + r.value, 0) / training.rpe.length).toFixed(1)
        : 'N/A'

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <Link href="/coach/trainings">
                    <Button variant="ghost" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Retour aux entraînements
                    </Button>
                </Link>
            </div>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {new Date(training.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {training.theme}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Informations */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 text-sm">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Horaires</p>
                                <p className="font-medium">{training.startTime} - {training.endTime}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Lieu</p>
                                <p className="font-medium">{training.location}</p>
                                <p className="text-xs text-gray-500">{training.surface}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Dumbbell className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Intensité</p>
                                <p className="font-medium">
                                    {training.intensity === 'FAIBLE' ? 'Légère' :
                                        training.intensity === 'MODEREE' ? 'Modérée' : 'Intense'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistiques */}
                <Card>
                    <CardHeader>
                        <CardTitle>Statistiques</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Taux de présence</p>
                            <p className="text-3xl font-bold">{attendanceRate}%</p>
                            <p className="text-sm text-gray-500">{presentCount}/{totalPlayers} joueurs</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">RPE moyen</p>
                            <p className="text-3xl font-bold">{avgRpe}<span className="text-lg text-gray-500">/10</span></p>
                            <p className="text-sm text-gray-500">{training.rpe.length} réponses</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button className="w-full" variant="outline">
                            Modifier la séance
                        </Button>
                        <Button className="w-full" variant="outline">
                            Gérer les présences
                        </Button>
                        <Button className="w-full" variant="outline">
                            Voir les exercices
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Présences */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Présences
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {training.attendance.map((attendance) => (
                            <div key={attendance.playerId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="flex items-center gap-3">
                                    {statusIcons[attendance.status as keyof typeof statusIcons]}
                                    <div>
                                        <p className="font-medium">{attendance.playerName}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {attendance.status === 'PRESENT' && `${attendance.minutesEffective} min`}
                                            {attendance.status === 'RETARD' && `Retard: ${attendance.lateMinutes} min (${attendance.minutesEffective} min effectif)`}
                                            {attendance.status === 'ABSENT' && 'Absent'}
                                            {attendance.status === 'EXCUSE' && 'Excusé'}
                                        </p>
                                    </div>
                                </div>
                                {training.rpe.find(r => r.playerId === attendance.playerId) && (
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">RPE</p>
                                        <p className="text-xl font-bold">
                                            {training.rpe.find(r => r.playerId === attendance.playerId)?.value}/10
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
