import TopNavbar from '@/components/dashboard/TopNavbar';
import BottomNavbar from '@/components/dashboard/BottomNavbar';

export default function DashboardLayout(
    {children,} 
    : 
    {children: React.ReactNode}) {
    return (
        <section>
            <TopNavbar />
            {children}
            <BottomNavbar />
        </section>
    )
}