import UrlShortenerForm from "./UrlShortenerForm";

export default function LandingPageHero() {
    return <section className="hero py-6 lg:pt-7">
        <div className='hero-inner grid gap-7 lg:gap-0 grid-cols-1'>
            <div>
                <h1 className="title text-center">Shorten your URL. Easy to share</h1>
            </div>
            <div className="space-y-2">
                <UrlShortenerForm />
                <p className="text-sm text-gray-500 text-wrap mt-2">Shortening your URL makes it easier to share on social media, email, text messages and more. <br />Try it out below and see for yourself.</p>
            </div>
        </div>
    </section>
}