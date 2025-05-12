import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button"

const urlSchema = z.object({
    fullUrl: z.string().url("Please enter a valid URL"),
});

type UrlFormData = z.infer<typeof urlSchema>;

const UrlShortenerForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UrlFormData>({
        resolver: zodResolver(urlSchema),
    });

    const onSubmit = async (data: UrlFormData) => {
        try {
            const response = await fetch("/api/shorten-url", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to shorten URL");
            }

            const result = await response.json();
            console.log("Shortened URL:", result.shortUrl);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    id="fullUrl"
                    type="text"
                    className="border-2 rounded-md"
                    {...register("fullUrl")}
                    placeholder="Enter the link here"
                />
                {errors.fullUrl && <p className="text-red-700 mb-3">{errors.fullUrl.message}</p>}
            </div>
            <button type="submit" className="btn-cta rounded-md">Shorten URL</button>
        </form>
    );
};

export default UrlShortenerForm;