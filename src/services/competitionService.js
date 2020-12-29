import config from '../config';
//const REST_API = config.competitionApi;
import { useAppContext } from '../libs/contextLib';

export const competitionService = {
    getLastYear
};

function getLastYear() {

    const { REST_API } = useAppContext();
    
    const requestOptions = {
        method: 'GET',
        headers: { 'api-key': process.env.REACT_APP_API_KEY, 'Content-Type': 'application/json' }
    };

    return fetch(REST_API + '/years/last', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(competition => {
            //TODO
            // login successful if there's a jwt token in the response
            if (competition && competition.year) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('user', JSON.stringify(user));
            }

            return competition;
        });
}
