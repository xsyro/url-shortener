import { useQuery, useMutation } from '@tanstack/react-query';
import { encodeShortUrl, fetchShortUrls } from '../services/Api';
import { queryClient } from './queryClient';
import { UrlFormData } from '../components/UrlShortenerForm';

export const useUrlShortener = () => {

    const shortenedUrlsQuery = useQuery({
        queryKey: ['short_urls',],
        queryFn: async () => await fetchShortUrls(),
    });

    // mutation to create a new shortened url
    const createShortenedUrlMutation = useMutation({
        mutationFn: async (data: UrlFormData) => {
            return await encodeShortUrl(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['short_urls'] })
        }
    });

    return {
        shortenedUrlsQuery,
        createShortenedUrlMutation: createShortenedUrlMutation,
    };
};