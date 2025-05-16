import type { Country } from './Countries';

const Card = (country: Country) => {
    return (
        <div className="border p-4 rounded shadow">
            <img src={country.flags.png} alt={country.flags.alt} className="w-full h-auto mb-2" />
            <h2 className="text-lg font-bold">{country.name.common}</h2>
            <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
            <p>Region: {country.region}</p>
            <p>Subregion: {country.subregion || 'N/A'}</p>
            <p>Population: {country.population.toLocaleString()}</p>
        </div>
    );
};

export default Card;
