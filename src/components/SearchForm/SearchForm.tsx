import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './SearchForm.scss';
import { Spinner } from '../Spinner/Spinner';
import { getWeather, TWeatherError } from '../../api/getWeather';
import { ACTION_TYPES, TState } from '../../redux/types';

const SearchForm = () => {
    const [ inputText, setInputText ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const storedCities = useSelector((state: TState) => state.cities);

    const handlers = {
        onInputChange: (event: React.FormEvent<HTMLInputElement>): void => {
            setInputText(event.currentTarget.value)
            setErrorMsg('')
        },
        onFormSubmit: async (event: React.FormEvent): Promise<void> => {
            event.preventDefault();
            if(errorMsg){
                setErrorMsg('')
            };
            setIsLoading(true);

            const storedCity = storedCities.find(city => city.city.toLowerCase() === inputText.toLowerCase())
            
            if(storedCity) {
                dispatch({
                    type: ACTION_TYPES.SET_CURRENT_CITY,
                    payload: storedCity
                })
            } else {
                const result = await getWeather(inputText);
                if(result.success) {
                    dispatch({
                        type: ACTION_TYPES.ADD_CURRENT_CITY,
                        payload: {
                            city: inputText,
                            weather: {...result.data}
                        }
                    })
                    history.push(`/${inputText}`)
                } else {
                    setErrorMsg( (result.data as TWeatherError).message )
                }
            };
        
            setIsLoading(false);
        }
    };
    
    const inputClassList = [
        'search-form__input',
        errorMsg ? 'search-form__input--error' : ''
    ].join(' ').trim();

    return (
        <form onSubmit={handlers.onFormSubmit} className="search-form">
            <div className="search-form__input-wrapper">
                <input
                    className={inputClassList}
                    type="text"
                    placeholder="ie. Berlin, Wrocław..."
                    onChange={handlers.onInputChange}
                    value={inputText}
                    readOnly={isLoading}
                    required
                />
                {errorMsg && <div className="search-form__errormsg">{errorMsg}</div>}
            </div>
            <button
                className="search-form__button"
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? <Spinner light /> : 'search'}
            </button>
        </form>
    )
};

export { SearchForm };