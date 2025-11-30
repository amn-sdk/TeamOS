import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Calendar, Trophy } from 'lucide-react'

export default function CoachDashboard() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Tableau de bord
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/coach/players">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Effectif
                            </CardTitle>
                            <CardDescription>Gérer les joueurs</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">23 joueurs</p>
                        </CardContent>
                    </Card>
                </Link>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Entraînements
                        </CardTitle>
                        <CardDescription>Cette semaine</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">3 séances</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5" />
                            Prochain match
                        </CardTitle>
                        <CardDescription>Championnat</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="font-medium">Samedi 15:00</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">vs. FC Rivaux</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
