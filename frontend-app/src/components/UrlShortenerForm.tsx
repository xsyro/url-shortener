import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handlerUrlEncodeFormSubmit } from "../actions/Formhandler";
import { useUrlShortener } from "../hooks/useUrlShortener";

const urlSchema = z.object({
    url: z.string().url("Please enter a valid URL"),
});

export type UrlFormData = z.infer<typeof urlSchema>;

const UrlShortenerForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UrlFormData>({
        resolver: zodResolver(urlSchema),
    });

    const { createShortenedUrlMutation } = useUrlShortener();

    const { error, isError, isPending, isSuccess, data: shortUrlResponse, mutateAsync: createShortUrlAction } = createShortenedUrlMutation

    return (
        <>
            {isPending && <p className="text-green-700 mb-2 mt-1">Shortening URL...</p>}

            {shortUrlResponse && !(shortUrlResponse instanceof Error) && (
                <>
                    <div className="flex items-center space-x-2"></div>
                    <p className="space-x-1">
                        <code className="tracking-tighter text-sm text-green-700 font-bold">{shortUrlResponse.shortUrl}</code>
                        <button onClick={() => navigator.clipboard.writeText(shortUrlResponse.shortUrl)} className="bg-green-600 text-white px-2 py-1 text-xs rounded-sm font-semibold hover:bg-green-800">
                            Copy
                        </button>
                    </p>

                </>
            )}

            <form onSubmit={handleSubmit(async (data) => await createShortUrlAction(data))}>
                <div>
                    <input
                        id="url"
                        type="url"
                        className="border-2 rounded-md"
                        {...register("url")}
                        placeholder="Enter the link here"
                    />
                    {errors.url && <p className="text-red-700 mb-3 mt-1">{errors.url.message}</p>}
                    {(isError || error) && <p className="text-red-700 mb-3 mt-1">{error.message}</p>}
                </div>
                <button type="submit" className="bg-black text-white p-4 rounded-md">Shorten URL</button>
            </form>
        </>
    );
};

export default UrlShortenerForm;