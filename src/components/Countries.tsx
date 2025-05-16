import { useEffect, useState } from 'react';
import Card from './Card';

export interface Country {
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
}

const Countries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [rangeValue, setRangeValue] = useState(20);

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRangeValue(Number(event.target.value));
    };

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
                <>
                    <ul>
                        <li>
                            <input
                                type="range"
                                min="1"
                                max={countries.length}
                                value={rangeValue}
                                onChange={handleRangeChange}
                            />
                        </li>
                    </ul>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {countries.slice(0, rangeValue).map((country: Country) => (
                            <Card key={country.cca3} {...country} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Countries;
