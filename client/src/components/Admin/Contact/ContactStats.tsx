import {
    CardHeader,
    CardTitle,
    CardContent,
    // CardDescription,
    Card,
} from '@/components/ui/card'

import {
    HiAnnotation,
    HiChatAlt2,
    HiChat,
    HiDocumentReport,
} from 'react-icons/hi'

import { API_URL } from '@/util/envExport'
import { useEffect, useState } from 'react'
import { Contact } from '@/types/ContactType'
export default function ContactsStats() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [feedbacks, setFeedbacks] = useState<Contact[]>([])
    const [reports, setReports] = useState<Contact[]>([])
    const [messages, setMessages] = useState(1)

    useEffect(() => {
        fetch(`${API_URL}/api/contacts`)
            .then((response) => response.json())
            .then((data) => setContacts(data))
    }, [])

    useEffect(() => {
        if (contacts.length > 0) {
            const feedbacks = contacts.filter((contact) => contact.type === 'feedback')
            setFeedbacks(feedbacks)
            const reports = contacts.filter((contact) => contact.type === 'report')
            setReports(reports)
            const totalInteractions = contacts.reduce((acc) => acc + 13.5, 0)
            setMessages(totalInteractions / contacts.length)
        }
    }, [contacts])

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Contacts</CardTitle>
                    <HiAnnotation className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{contacts.length}</div>
                    <p className="text-xs text-muted-foreground">
                        Total number of contacts
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Feedbacks
                    </CardTitle>
                    <HiChatAlt2 className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{feedbacks.length}</div>
                    <p className="text-xs text-muted-foreground">
                        {((feedbacks.length / contacts.length) * 100).toFixed(0)}% of
                        total users
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Reports
                    </CardTitle>
                    <HiDocumentReport className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{reports.length}</div>
                    <p className="text-xs text-muted-foreground">
                        {((reports.length / contacts.length) * 100).toFixed(0)}% of
                        total users
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Messages
                    </CardTitle>
                    <HiChat className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{messages}</div>
                    <p className="text-xs text-muted-foreground">
                        Average messages per user
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
