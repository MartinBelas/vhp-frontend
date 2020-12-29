import React, { useState, useEffect } from 'react';
import { 
    Link, 
    useParams,  
    BrowserRouter as Router,
    Route,
    Switch, 
    useLocation } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import dateFormat from 'dateformat';
import { useAppContext } from '../libs/contextLib';
import AdministrationNewsNew from '../pages/AdministrationNewsNew';
import { AppContext } from "../libs/contextLib";

const LATEST_NEWS_COUNT = 2;

export default function AdministrationNews() {
    
    function handleCreateItem(event) {
        //setNewDescription(event.target.value);
    }

    function handleRemoveItem(id) {
        // const newList = categories.filter((item) => item.id !== id);
        // setCategories(newList);
    }

    function handleUpdateItem(event) {
        // setNewId(event.target.value);
    }


    // function handleAddCategory() {
    //     const newList = categories.concat({ "id":newId, "description":newDescription });
    //     setCategories(newList);
    //     setNewId('');
    //     setNewDescription('');
    // }


    // function handleRemoveRace(frontendId) {
    //     const newList = races.filter((item) => item.frontendId !== frontendId);
    //     setRaces(newList);
    // }

    // function handleRaceChange(event) {
    //     setNewRaceName(event.target.value);
    // }

    // function handleAddRace() {
    //     let maxId = 0;
    //     if (races.length > 0) {
    //         maxId = races.reduce((a, b) =>  a.frontendId > b.frontendId ? a : b ).frontendId;
    //     }
    //     maxId++;
    //     const newRace = { "frontendId":maxId, "name":newRaceName };
    //     let newList = races.concat(newRace);
    //     setRaces(newList);
    //     setNewRaceName('');
    // }

    // function handleStartRegistrations() {
    //     const payload = {
    //         "categories": categories,
    //         "races":races
    //     }

    //     axios.post(REST_API + '/years/next', payload, options)
    //         .then(response => {
    //             //TODO
    //         })
    //         .catch(err => {
    //             console.log('ERROR: ', err);
    //             // setError(err.message);
    //         })
    // }

    return (
        <Router>
        <div id="adm-content">
            <h2>Novinky</h2>
            
            <p><Link to="/adm/novinky/nova"><b>Přidat novou novinku</b></Link></p>

            <Switch>
                <Route path="/adm/novinky/nova" children={<CreateNewNews />} />
                <Route path="/adm/novinky/:id" children={<OneNews />} />
                <Route path="/adm/novinky" children={<NewsList />} />
            </Switch>
        </div>
        </Router>
    );
}

function CreateNewNews() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
  
    return (
        <div>
            <h3>Vytvořní nové novinky</h3>
        </div>
    );
}

const fetchNewsItem = async (api, options) => {
    const response = await axios.get(api, options);
    return response.data;
}

function OneNews() {

    let { id } = useParams();

    const { isAuthenticated, REST_API, options, latestNewsItems } = useAppContext();

    let item = latestNewsItems.find(x => x.id === id);
    console.log('------------item A: ', item);

    if (item === undefined) {
        console.log('------------item: B');
        fetchNewsItem(REST_API + '/news/'+id, options)
            .then( item => {
                console.log('------------item: B: ', item);
                const timestamp = new Date(item.date);
                const date = timestamp.toLocaleDateString();
                return (
                    <div className="news-item" key={item.id}>
                        <p className="date">{date}</p> <h3>{item.title}</h3>
                        <div>{item.content}</div>
                    </div>
                );
            })
    } else {
        console.log('------------item: C: ', item);
        const timestamp = new Date(item.date);
        const date = timestamp.toLocaleDateString();
        return (
            <div className="news-item" key={item.id}>
                <p className="date">{date}</p> <h3>{item.title}</h3>
                <div>{item.content}</div>
            </div>
        );
    }
}

function NewsList() {

    const { isAuthenticated, REST_API, options, latestNewsItems, setLatestNewsItems } = useAppContext();
    const [newsItems, setNewsItems] = useState();
    const previewLength = 200;

    useEffect(() => {
        axios.get(REST_API + '/news', options)
            .then(response => {
                let news = [];
                news.push(...response.data);
                setNewsItems(news);
                setLatestNewsItems(news.slice(0, LATEST_NEWS_COUNT));
            })
            .catch(err => {
                console.log('err: ', err.message);
            })
    }, [REST_API, options]);

    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
  
    return (
        <div>
        <AppContext.Provider value={{ latestNewsItems, setLatestNewsItems }}>
            {newsItems ? newsItems.map((item) => {
                const timestamp = new Date(item.date);
                const date = timestamp.toLocaleDateString();
                if (item.content.length > previewLength) 
                    return  <div className="news-item" key={item.id}>
                                <p className="date">{date} <b>{item.title}</b></p>
                                <div>{item.content.substring(1, previewLength)} <i>(zkráceno)</i></div>
                                <br /><Link to={"/adm/novinky/"+item.id}>Zobrazit celý příspěvek</Link>
                            </div>
                else 
                    return  <div className="news-item" key={item.id}>
                                <p className="date">{date} <b>{item.title}</b></p>
                                <div>{item.content}</div>
                            </div>

            }) : ""}
        </AppContext.Provider>
        </div>
    );
}