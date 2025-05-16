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
    continents?: string[];
}

const Countries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [selectedContinents, setSelectedContinents] = useState({
        Africa: true,
        'North America': true,
        'South America': true,
        Asia: true,
        Europe: true,
        Oceania: true,
        Antarctica: true,
    });

    const [rangeValue, setRangeValue] = useState(20);

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRangeValue(Number(event.target.value));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setSelectedContinents((prev) => ({
            ...prev,
            [name]: checked,
        }));
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
                    <ul className="flex flex-wrap items-center gap-4 mb-6">
                        <li className="flex items-center">
                            <input
                                type="range"
                                min="1"
                                max={countries.length}
                                value={rangeValue}
                                onChange={handleRangeChange}
                                className="w-40 accent-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{rangeValue}</span>
                        </li>
                        {Object.entries(selectedContinents).map(([continent, isChecked]) => (
                            <li key={continent} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={continent}
                                    name={continent}
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    className="accent-blue-500 mr-1"
                                />
                                <label htmlFor={continent} className="text-sm text-gray-800 cursor-pointer">
                                    {continent}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {countries
                            .filter(
                                (country: Country) =>
                                    country.continents &&
                                    country.continents.some(
                                        (continent) => selectedContinents[continent as keyof typeof selectedContinents]
                                    )
                            )
                            .sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common))
                            .slice(0, rangeValue)
                            .map((country: Country) => (
                                <Card key={country.cca3} {...country} />
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Countries;
