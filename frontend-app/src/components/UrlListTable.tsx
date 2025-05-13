import { useUrlShortener } from "../hooks/useUrlShortener";
import { CopyButton } from "./CopyButton";
import { format } from "timeago.js";

export const UrlListTable = () => {
    const { data, isLoading, error } = useUrlShortener().shortenedUrlsQuery;

    if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
                <tr>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">#</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">Original URL</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">Short URL</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">Short URL ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">Click Count</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">Created</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700"></th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(data) && data.map((url, index) => (
                <tr key={url.shortUrlId} className="odd:bg-white even:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">{index+1}</td>
                    <td className="px-4 py-2 border border-gray-300 break-all">{url.url}</td>
                    <td className="px-4 py-2 border border-gray-300 break-all">
                    <a className="underline" href={url.shortUrl} target="_blank" rel="noreferrer">{url.shortUrl}</a>
                    </td>
                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">{url.shortUrlId}</td>
                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">{url.clicks || 0}</td>
                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">{format(url.createdAt)}</td>
                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                    <CopyButton textToCopy={url.shortUrl} />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}
