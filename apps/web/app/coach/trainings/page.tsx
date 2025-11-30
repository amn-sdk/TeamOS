'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Plus, MapPin, Clock, Dumbbell } from 'lucide-react'

// Temporary mock data
const mockTrainings = [
    {
        id: '1',
        date: '2025-12-02',
        startTime: '18:00',
        endTime: '20:00',
        location: 'Stade Municipal',
        theme: 'Tactique défensive',
        intensity: 'MODEREE',
        presentCount: 19,
        totalPlayers: 23,
    },
    {
        id: '2',
        date: '2025-12-04',
        startTime: '18:00',
        endTime: '20:00',
        location: 'Stade Municipal',
        theme: 'Passes et contrôles',
        intensity: 'FAIBLE',
        presentCount: 21,
        totalPlayers: 23,
    },
    {
        id: '3',
        date: '2025-12-06',
        startTime: '18:00',
        endTime: '19:30',
        location: 'Gymnase',
        theme: 'Préparation physique',
        intensity: 'FORTE',
        presentCount: 18,
        totalPlayers: 23,
    },
]

const intensityColors = {
    FAIBLE: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    MODEREE: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    FORTE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export default function TrainingsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Calendar className="h-8 w-8" />
                        Entraînements
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Planifiez et gérez vos séances d'entraînement
                    </p>
                </div>
                <Link href="/coach/trainings/new">
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nouvelle séance
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {mockTrainings.map((training) => {
                    const attendanceRate = ((training.presentCount / training.totalPlayers) * 100).toFixed(0)

                    return (
                        <Link key={training.id} href={`/coach/trainings/${training.id}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-blue-600" />
                                                {new Date(training.date).toLocaleDateString('fr-FR', {
                                                    weekday: 'long',
                                                    day: 'numeric',
                                                    month: 'long'
                                                })}
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-4 mt-2">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {training.startTime} - {training.endTime}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    {training.location}
                                                </span>
                                            </CardDescription>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${intensityColors[training.intensity as keyof typeof intensityColors]}`}>
                                            {training.intensity === 'FAIBLE' ? 'Légère' :
                                                training.intensity === 'MODEREE' ? 'Modérée' : 'Intense'}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Dumbbell className="h-5 w-5 text-gray-400" />
                                            <span className="font-medium">{training.theme}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Présence: {training.presentCount}/{training.totalPlayers}
                                            </div>
                                            <div className={`text-sm font-medium ${Number(attendanceRate) >= 80 ? 'text-green-600' :
                                                    Number(attendanceRate) >= 60 ? 'text-yellow-600' : 'text-red-600'
                                                }`}>
                                                ({attendanceRate}%)
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </div>

            {mockTrainings.length === 0 && (
                <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                        Aucun entraînement planifié
                    </p>
                </div>
            )}
        </div>
    )
}
