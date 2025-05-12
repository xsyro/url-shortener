import logo from '../images/logo.svg';

export const Header = () => {
    return (
        <header className="padding-xy">
            <div className="logo flex space-x-1">
                <img src={logo} alt="logo" width={100} />
                <h4 className="text-2xl font-extrabold tracking-tighter p-4">URLShortena</h4>
            </div>
        </header>
    );
}