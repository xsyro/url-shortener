// import heroImage from './illustration-working.svg'

import UrlShortenerForm from "./UrlShortenerForm";

export default function LandingPageHero() {
    return <section className="hero py-6 lg:pt-7">
        <div className='hero-inner grid gap-7 lg:gap-0 grid-cols-1'>
            <div>
                <h1 className="title text-center">Shorten your URL. Easy to share</h1>
            </div>
            <div className="space-y-4">
                <UrlShortenerForm />
                <p className="subtitle">Shortening your URL makes it easier to share on social media, email, text messages and more. Try it out below and see for yourself.</p>
            </div>
        </div>
    </section>
}