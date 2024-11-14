
import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [scoreRange, setScoreRange] = useState([0, 500]);

    const platforms = ['PC', 'PlayStation', 'RetroCube', 'FusionPlay', 'GamerBox'];
    const genres = ['Action', 'Adventure', 'Racing', 'Simulation'];

    const handlePlatformChange = (platform) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
        );
    };

    const handleGenreChange = (genre) => {
        setSelectedGenres(prev =>
            prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
        );
    };

    const handleScoreChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setScoreRange([value, scoreRange[1]]);
        onFilterChange(selectedPlatforms, selectedGenres, [value, scoreRange[1]]);
    };

    const handleScoreChangeMax = (e) => {
        const value = parseInt(e.target.value, 10);
        setScoreRange([scoreRange[0], value]);
        onFilterChange(selectedPlatforms, selectedGenres, [scoreRange[0], value]);
    };

    const applyFilters = () => {
        onFilterChange(selectedPlatforms, selectedGenres, scoreRange);
    };

    return (
        <div className="filter-container">
            <h2>Filters</h2>
            <hr color='#df19e6'/> 
            <div>
                <h3>Console</h3>
                {platforms.map((platform) => (
                    <div key={platform}>
                        <input
                            type="checkbox"
                            id={platform}
                            checked={selectedPlatforms.includes(platform)}
                            onChange={() => handlePlatformChange(platform)}
                            color='#371e3ab3'
                        />
                        <label htmlFor={platform}>{platform}</label>
                    </div>
                ))}
            </div>
            
            <div>
            <hr color='#df19e6'/> 
                <h3>Genres</h3>
                {genres.map((genre) => (
                    <div key={genre}>
                        <input
                            type="checkbox"
                            id={genre}
                            checked={selectedGenres.includes(genre)}
                            onChange={() => handleGenreChange(genre)}
                            color='#371e3ab3'
                        />
                        <label htmlFor={genre}>{genre}</label>
                    </div>
                ))}
            </div>
           
            <div>
            <hr color='#df19e6'/> 
                <h3>Price Range</h3>
                <label htmlFor="min-price">Min:</label>
                <input
                    type="number"
                    id="Min-Price"
                    value={scoreRange[0]}
                    onChange={handleScoreChange}
                    min="0"
                    max="100"
                    color='#371e3ab3'
                />
                <label htmlFor="Max-Price">Max:</label>
                <input
                    type="number"
                    id="max-price"
                    value={scoreRange[1]}
                    onChange={handleScoreChangeMax}
                    min="0"
                    max="200"
                    
                />
            </div>
            <button onClick={applyFilters} className='ApplyFilters'>Apply Filters</button>
        </div>
    );
};

export default Filter;
