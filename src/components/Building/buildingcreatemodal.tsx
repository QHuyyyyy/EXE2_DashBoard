"use client";

import { useState } from "react";
import { BuildingService, CreateBuildingRequest } from "@/services/building.service";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreated?: () => void;
}

export default function BuildingCreateModal({ isOpen, onClose, onCreated }: Props) {
    const [formData, setFormData] = useState<CreateBuildingRequest>({ subdivisionId: 0, name: '', blockCode: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'subdivisionId' || name === 'maxFloor' ? parseInt(value) || 0 : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await BuildingService.createBuilding(formData);
            if (onCreated) onCreated();
            onClose();
        } catch (err) {
            console.error('Create building failed', err);
            setError('Failed to create building. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl rounded bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Create Building</h3>
                    <button onClick={onClose} className="text-gray-500">Close</button>
                </div>

                {error && <div className="mb-4 text-red-600">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">Subdivision ID <span className="text-red">*</span></label>
                        <input type="number" name="subdivisionId" value={formData.subdivisionId || ''} onChange={handleChange} required className="w-full rounded border p-2" />
                    </div>

                    <div>
                        <label className="block mb-2">Building Name <span className="text-red">*</span></label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded border p-2" />
                    </div>

                    <div>
                        <label className="block mb-2">Block Code <span className="text-red">*</span></label>
                        <input type="text" name="blockCode" value={formData.blockCode} onChange={handleChange} required className="w-full rounded border p-2" />
                    </div>

                    <div>
                        <label className="block mb-2">Max Floor</label>
                        <input type="number" name="maxFloor" value={(formData as any).maxFloor || ''} onChange={handleChange} className="w-full rounded border p-2" />
                    </div>

                    <div>
                        <label className="block mb-2">Description</label>
                        <textarea name="description" value={(formData as any).description || ''} onChange={handleChange} rows={3} className="w-full rounded border p-2" />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
                        <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-primary text-white">{loading ? 'Creating...' : 'Create Building'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
