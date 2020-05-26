import React, { useState } from 'react';
import './SearchForm.scss';
import { Spinner } from '../Spinner/Spinner';

const SearchForm = () => {
    const [ inputText, setInputText ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const handlers = {
        onInputChange: (event: React.FormEvent<HTMLInputElement>):void => {
            setInputText(event.currentTarget.value)
        },
        onFormSubmit: (event: React.FormEvent) => {
            event.preventDefault();
            setIsLoading(true);
            // TODO: fetch and redirect to search result/handle errors
            // setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handlers.onFormSubmit} className="search-form">
            <input
                className="search-form__input"
                type="text"
                placeholder="Szukaj miasta, np. Berlin, Wrocław..."
                onChange={handlers.onInputChange}
                value={inputText}
                readOnly={isLoading}
            />
            <button
                className="search-form__button"
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? <Spinner light /> : 'szukaj'}
            </button>
        </form>
    )
};

export { SearchForm };