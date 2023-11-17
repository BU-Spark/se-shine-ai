import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavBar';

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