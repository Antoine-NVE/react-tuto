import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation bg-gray-100 p-4 rounded shadow">
            <ul className="flex space-x-4">
                <li className="px-3 py-2 rounded transition-colors">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'text-blue-600 font-bold underline' : 'text-gray-700 hover:text-blue-500'
                        }>
                        Accueil
                    </NavLink>
                </li>
                <li className="px-3 py-2 rounded transition-colors">
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? 'text-blue-600 font-bold underline' : 'text-gray-700 hover:text-blue-500'
                        }>
                        À propos
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;
