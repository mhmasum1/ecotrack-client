import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createChallenge } from "../services/challengeService";
import toast from "react-hot-toast";

const AddChallenge = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        duration: "",
        target: "",
        impactMetric: "",
        startDate: "",
        endDate: "",
        imageUrl: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.category.trim()) {
            toast.error("Title and Category are required");
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                ...formData,
                title: formData.title.trim(),
                category: formData.category.trim(),
                description: formData.description?.trim() || "",
                target: formData.target?.trim() || "",
                impactMetric: formData.impactMetric?.trim() || "",
                imageUrl: formData.imageUrl?.trim() || "",
                duration: formData.duration ? Number(formData.duration) : undefined,
                startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
                endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
                createdBy: user?.email || "admin",
            };

            await createChallenge(payload);
            toast.success("Challenge created successfully");
            navigate("/challenges");
        } catch (err) {
            console.error("Error creating challenge:", err);
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to create challenge";
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-2xl md:text-3xl font-semibold text-emerald-900 mb-4">
                Add New Challenge
            </h1>
            <p className="text-sm text-gray-600 mb-6">
                Create a new sustainability challenge for the EcoTrack
                community.
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-base-100 p-5 rounded-2xl shadow-sm border border-emerald-50"
            >
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="input input-bordered w-full"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select
                            name="category"
                            className="select select-bordered w-full"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select category</option>
                            <option>Waste Reduction</option>
                            <option>Energy Conservation</option>
                            <option>Water Conservation</option>
                            <option>Sustainable Transport</option>
                            <option>Green Living</option>
                        </select>
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        name="description"
                        className="textarea textarea-bordered w-full"
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Duration (days)</span>
                        </label>
                        <input
                            type="number"
                            name="duration"
                            className="input input-bordered w-full"
                            value={formData.duration}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Target</span>
                        </label>
                        <input
                            type="text"
                            name="target"
                            className="input input-bordered w-full"
                            value={formData.target}
                            onChange={handleChange}
                            placeholder="e.g. Reduce 2kg plastic"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Impact Metric</span>
                        </label>
                        <input
                            type="text"
                            name="impactMetric"
                            className="input input-bordered w-full"
                            value={formData.impactMetric}
                            onChange={handleChange}
                            placeholder="e.g. kg plastic saved"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Start Date</span>
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            className="input input-bordered w-full"
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">End Date</span>
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            className="input input-bordered w-full"
                            value={formData.endDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image URL</span>
                    </label>
                    <input
                        type="text"
                        name="imageUrl"
                        className="input input-bordered w-full"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Created By</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full bg-base-200"
                        value={user?.email || ""}
                        readOnly
                    />
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                    >
                        {submitting ? "Creating..." : "Create Challenge"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddChallenge;
