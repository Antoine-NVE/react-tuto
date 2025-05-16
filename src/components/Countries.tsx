import { useEffect, useState } from 'react';

type Country = {
    cca3: string;
    name: {
        common: string;
        official: string;
        nativeName?: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
    };
    capital?: string[];
    region: string;
    subregion?: string;
    population: number;
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
};

const Countries = () => {
    // https://restcountries.com/v3.1/all
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch('https://restcountries.com/v3.1/all');

            if (!response.ok) {
                alert('Erreur lors de la récupération des données');
                return;
            }

            setCountries(await response.json());
        };

        setLoading(true);
        fetchCountries()
            .catch((error: any) => {
                console.error('Erreur lors de la récupération des pays:', error);
                alert('Erreur lors de la récupération des données');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1>Countries</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {countries.map((country: Country) => (
                        <div key={country.cca3} className="border p-4 rounded shadow">
                            <img src={country.flags.png} alt={country.flags.alt} className="w-full h-auto mb-2" />
                            <h2 className="text-lg font-bold">{country.name.common}</h2>
                            <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
                            <p>Region: {country.region}</p>
                            <p>Subregion: {country.subregion || 'N/A'}</p>
                            <p>Population: {country.population.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Countries;
