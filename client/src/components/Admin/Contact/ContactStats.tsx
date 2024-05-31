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

export default function ContactsStats() {
    const [contacts, setContacts] = useState<number>(0);
    const [feedbacks, setFeedbacks] = useState<number>(0);
    const [reports, setReports] = useState<number>(0);
    const [avgContacts, setAvgContacts] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
   
    const fetchData = async (url: string, key: string) =>{
        const response = await fetch(url, {
            headers: {
                session: localStorage.getItem('sessionToken') as string
            }
        });
        const data = await response.json();
        const value = data.data;
        return {key, value};
    }
    useEffect(() => {
        const urls: {key: string, url: string}[] = [
            {key: 'totalContacts', url: `${API_URL}/api/contact/count`},
            {key: 'feedbackCount', url: `${API_URL}/api/contact/count?type=feedback`},
            {key: 'reportCount', url: `${API_URL}/api/contact/count?type=report`},
            {key: 'averageUserContact', url: `${API_URL}/api/contact/average-user-contact`}
      ];
      const initialize = async ()=>{
        const promises = await Promise.all(urls.map(({key, url}) => fetchData(url, key)));
        promises.forEach(({key, value}) => {
              switch(key){
                  case 'totalContacts':
                      setContacts(value);
                      break;
                  case 'feedbackCount':
                      setFeedbacks(value);
                      break;
                  case 'reportCount':
                      setReports(value);
                      break;
                  case 'averageUserContact':
                      setAvgContacts(value[0].avg ?? 0);
                      break;
              }
        });
        setIsLoading(false);
      }
      initialize();
    }, [])

    const feedBackPercentage = contacts === 0 ? 0 : ((feedbacks / contacts) * 100).toFixed(0);
    const feedBackText = `${feedBackPercentage}% of total contacts (${feedbacks} ${feedbacks > 1 ? 'feedbacks' : 'feedback'}) are feedbacks`;

    const reportPercentage = contacts === 0 ? 0 : ((reports / contacts) * 100).toFixed(0);
    const reportText = `${reportPercentage}% of total contacts (${reports} ${reports > 1 ? 'reports' : 'report'}) are reports`;
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Contacts</CardTitle>
                    <HiAnnotation className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{contacts}</div>
                    <p className="text-xs text-muted-foreground">{feedBackText}</p>
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
                    <div className="text-2xl font-bold">{feedbacks}</div>
                    <p className="text-xs text-muted-foreground">{feedBackText}</p>
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
                    <div className="text-2xl font-bold">{reports}</div>
                    <p className="text-xs text-muted-foreground">{reportText}</p>
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
                    <div className="text-2xl font-bold">{avgContacts}</div>
                </CardContent>
            </Card>
        </div>
    )
}
