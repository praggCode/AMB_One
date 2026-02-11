import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import axios from 'axios';

const AddressAutocomplete = ({ label, value, onChange, onSelect, placeholder, icon: Icon, iconColor }) => {
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
                <div className="relative group">
                    {Icon && (
                        <Icon className={`absolute left-4 top-3.5 h-5 w-5 ${iconColor ? iconColor : 'text-slate-400'} group-focus-within:text-blue-500 transition-colors z-10`} />
                    )}
                    <input
                        type="text"
                        value={value}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 ${Icon ? 'pl-12' : 'pl-4'} pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all`}
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
