import { UrlFormData } from "../components/UrlShortenerForm";

export const handlerUrlEncodeFormSubmit = async (data: UrlFormData) => {

    // try {
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/encode`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     });

    //     if (!response.ok) {
    //         throw new Error("Failed to shorten URL");
    //     }

    //     const result = await response.json();
    //     console.log("Shortened URL:", result.shortUrl);
    // } catch (error) {
    //     console.error("Error:", error);
    // }

}