const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
export const encodeShortUrl = async (data: { url: string }): Promise<{ url: string; shortUrl: string; statusCode: number } | Error> => {
    try {
        const response = await fetch(`${API_URL}/api/encode`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to shorten URL");
        }

        return await response.json();
    } catch (error) {
        return new Error("Error: " + error);
    }
}

export const decodeShortUrl = async (data: { shortUrl: string }): Promise<{ url: string } | Error> => {
    try {
        const response = await fetch(`${API_URL}/api/decode`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to decode URL");
        }

        return await response.json();
    } catch (error) {
        return new Error("Error: " + error);
    }
}

export const fetchShortUrls = async (page: number = 1, limit: number = 10): Promise<any[] | Error> => {
    try {
        const response = await fetch(`${API_URL}/api/list?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch URL list");
        }

        return await response.json();
    } catch (error) {
        return new Error("Error: " + error);
    }
}