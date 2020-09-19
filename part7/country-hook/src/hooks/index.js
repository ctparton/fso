import {useEffect, useState} from "react";
import countryService from "../services/countryService";

export const useCountry = (name) => {

    const [country, setCountry] = useState(null)
    useEffect(() =>{countryService.getCountry(name).then(response => setCountry(response))
    }, [name])


    return country
}

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}