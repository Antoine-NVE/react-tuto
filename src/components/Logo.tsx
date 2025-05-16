import BackgroundImage from '../assets/img/background.jpg';
import LogoImage from '../assets/img/logo.png';

const Logo = () => {
    return (
        <div
            className="flex flex-col items-center justify-center h-[150px] bg-cover bg-center"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            <img
                src={LogoImage}
                alt="Logo React"
                className="w-12 h-12 mb-2"
            />
            <h3 className="text-cyan-300 m-0">React World</h3>
        </div>
    );
};

export default Logo;
