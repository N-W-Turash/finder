import axios from 'axios';
import process from 'process';

export const filterColumn = (filter, row) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined && row[id] !== null?
        String(row[id].toLowerCase()).includes(filter.value.toLowerCase()) ||
        String(row[id]).includes(filter.value.toLowerCase()) :
        '';
};

export const sortColumnByDate = (a, b) => {
    return new Date(a) - new Date(b);
};


export const setAuthorizationToken = (token) => {
    if(token){
        axios.defaults.headers.common['x-access-token'] = token;
    }
    else{
        delete axios.defaults.headers.common['x-access-token'];
    }
};

export const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return "https://admin.gigatext-reader.com"
    }
    else{
        return "http://localhost:8000"
    }
};

