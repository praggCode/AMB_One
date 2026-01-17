import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import axios from 'axios';

const AddressAutocomplete = ({ label, value, onChange, onSelect, placeholder, icon: Icon }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const query = e.target.value;
        onChange(query);
    };

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (value.length > 2) {
                try {
                    const response = await axios.get(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&countrycodes=in`
                    );
                    setSuggestions(response.data);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error('Error fetching address suggestions:', error);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [value]);

    const handleSelect = (suggestion) => {
        onChange(suggestion.display_name);
        if (onSelect) {
            onSelect({
                address: suggestion.display_name,
                lat: suggestion.lat,
                lon: suggestion.lon,
            });
        }
        setShowSuggestions(false);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="block text-sm font-medium text-gray-900">
                {label}
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-gray-200 px-3 relative">
                    {Icon && <Icon className="h-4 w-4 text-[#D70040]" />}
                    <input
                        type="text"
                        value={value}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="w-full border-none py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                        autoComplete="off"
                    />
                </div>
            </label>

            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.place_id}
                            className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(suggestion)}
                        >
                            <span className="block truncate">{suggestion.display_name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressAutocomplete;
