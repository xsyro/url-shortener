import logo from '../images/logo.svg';

export const Header = () => {
    return (
        <header className=" padding-xy bg-blue-900">
            <div className="logo">
                <img src={logo} alt="logo" width={100} height={100} />
            </div>
        </header>
    );
}