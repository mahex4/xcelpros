import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/signup')
    }

    return (
        <div className="text-xl font-semibold">
            Welcome, {user.firstName} {user.lastName}
        </div>
    );
}