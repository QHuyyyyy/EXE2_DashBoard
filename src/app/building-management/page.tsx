import { Metadata } from "next";
import BuildingManagementPage from "@/components/Building/BuildingManagementPage";

export const metadata: Metadata = {
    title: "Building Management | Dashboard",
    description: "Manage buildings and building information",
};

export default function BuildingManagement() {
    return <BuildingManagementPage />;
}