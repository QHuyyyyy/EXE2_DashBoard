import { Metadata } from "next";
import UserManagementPage from "@/components/User/UserManagementPage";

export const metadata: Metadata = {
    title: "User Management | Dashboard",
    description: "Manage users and user accounts",
};

export default function UserManagement() {
    return <UserManagementPage />;
}