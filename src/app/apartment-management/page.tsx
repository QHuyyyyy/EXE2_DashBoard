import { Metadata } from "next";
import ApartmentManagementPage from "@/components/Apartment/ApartmentManagementPage";

export const metadata: Metadata = {
    title: "Apartment Management | Dashboard",
    description: "Manage apartments and apartment information",
};

export default function ApartmentManagement() {
    return <ApartmentManagementPage />;
}