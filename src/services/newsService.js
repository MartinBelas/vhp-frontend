import config from '../config';
import { userService } from '../services/userService';
const REST_API = config.restApi;

export const newsService = {
    GetLatestNews,
    GetOneNewsItem,
    createOneNews,
    updateOneNews,
    deleteOneNews
};

const requestOptions = {
    method: 'GET',
    headers: { 'api-key': process.env.REACT_APP_API_KEY, 'Content-Type': 'application/json' }
};

function GetLatestNews(count) {
    
    return fetch(REST_API + '/news?count=' + count, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(responseData => {
            localStorage.setItem('news', JSON.stringify(responseData));
            return responseData;
        });
}

function GetOneNewsItem(id) {
    
    let news = JSON.parse(localStorage.getItem('news'));

    let result;
    
    if (news !== undefined) {
        if (Array.isArray(news)) {
            result = news.find(x => x.id === id);
            if (result !== undefined)
                return Promise.resolve(result);
            }
            return Promise.reject("404: Can't find " + id);
    } else {
        return fetch(REST_API + '/news?id=' + id, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response.statusText);
                }
                return response.json();
            });
    }
}

function createOneNews(title, content) {

    let user = userService.getCurrentUser();

    const payload = {
        "news":
        {
            "title": title,
            "content": content
        }
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'api-key': process.env.REACT_APP_API_KEY, 'authorization': user.accessToken, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    };

    return fetch(REST_API + '/news', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(responseData => {
            localStorage.setItem('news', JSON.stringify(responseData));
            return responseData;
        })
        .catch(err => {
            console.log('err: ', err);
            return err;
        });
}

//TODO
function updateOneNews(id, title, content) {
    
    let user = userService.getCurrentUser();

    const payload = {
        "news":
        {
            "title": title,
            "content": content
        }
    }

    const requestOptions = {
        method: 'PUT',
        headers: { 'api-key': process.env.REACT_APP_API_KEY, 'authorization': user.accessToken, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    };

    console.log('SERV updateOneNews...')
    return fetch(REST_API + '/news/' + id, requestOptions)
        .then(response => {
            console.log('SERV updateOneNews response: ', response)
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(responseData => {
            localStorage.setItem('news', JSON.stringify(responseData));
            return responseData;
        })
        .catch(err => {
            console.log('err: ', err);
            return err;
        });
} 

//TODO
function deleteOneNews(id) {

    const requestOptions = {
        method: 'DELETE',
        headers: { 'api-key': process.env.REACT_APP_API_KEY, 'Content-Type': 'application/json' }
    };

    return fetch(REST_API + '/news?id=' + id, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response.statusText);
                }
                return response.json();
            });
} 
