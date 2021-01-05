import React, { useState, useEffect } from 'react';
import { 
    Link, 
    useParams,  
    BrowserRouter as Router,
    Route,
    Switch } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { newsService } from '../services/newsService';
import { useAppContext } from '../libs/contextLib';


export default function AdministrationNews() {
    
    const { isAuthenticated } = useAppContext();
    const [newsItems, setNewsItems] = useState();
    
    useEffect(() => {
        newsService.GetLatestNews()
        .then(data => {
            setNewsItems(data);
            return data;
        })
        .catch(err => {
            console.log('err: ', err.message);
        })
    },[])

    let history = useHistory();

    function NewsList() {
        return (
            <div>
    
                {isAuthenticated ? 
                    <p><Link to="/adm/novinky/nova"><b>Přidat novou novinku</b></Link></p>
                    : ""
                }
        
                {newsItems ? newsItems.map((item) => {
                    const timestamp = new Date(item.date);
                    const date = timestamp.toLocaleDateString();
                    return <div className="news-item" key={item.id}>
                            <p className="date">{date} <Link to={"/adm/novinky/"+item.id}><b>{item.title}</b></Link></p>
                            <div>{item.content}</div>
                        </div>
        
                }) : ""}
            </div>
        );
    }
    
    function OneNews() {

        const [newsItem, setNewsItem] = useState();

        let { id } = useParams();

        useEffect(() => {
            newsService.GetOneNewsItem(id)
            .then(data => {
                setNewsItem(data);
                //return data;
            })
            .catch(err => {
                console.log('err: ', err);
            })
        },[id])

        if (newsItem !== undefined) {
            const timestamp = new Date(newsItem.date);
            const date = timestamp.toLocaleDateString();
            return (
                <div className="news-item" key={newsItem.id}>
                    <p className="date">{date}</p> <h3>{newsItem.title}</h3>
                    <div>{newsItem.content}</div>
                    {isAuthenticated ? 
                        <p><Link to={"/adm/novinky/edit/"+newsItem.id}>UPRAVIT</Link> ~ <Link to={"/adm/novinky/delete/"+newsItem.id}>ODSTRANIT</Link></p>
                        : ""
                    }
                </div>
            );
        } else {
            return (
                <div className="news-item">
                    Asi vítr Máchale... :-)
                </div>
            );
        }
    }

    function CreateOrUpdateNews(props) {

        const { id } = useParams();
        let newsItem = (newsItems.find(x => x.id === id));
        if (newsItem === undefined) {
            newsItem = {title: "", content: ""}
        }
        const [newTitle, setNewTitle] = useState(newsItem.title);
        const [newContent, setNewContent] = useState(newsItem.content);

        function validateForm() {
            return (newTitle.length > 0 && newContent.length > 0);
        }
        
        function handleSubmit(event) {
            event.preventDefault();
        
            if (isAuthenticated && validateForm()) {
        
                if (props.operation === "create") {
                    newsService.createOneNews(newTitle, newContent)
                    .then(
                        resp => {
                            console.log('CreateNewNews - resp: ', resp)
                            if (resp && resp.isOk) {
                                history.push('/adm/novinky')
                            } else {
                                //TODO
                            }
                        },
                        error => {
                            //TODO
                            //console.log('err: ', error);
                            console.log('CreateNewNews - err: ', error)
                        }
                    );
                } else if (props.operation === "edit") {
                    console.log('UpdateNewNews - id: ', id)
                    newsService.updateOneNews(id, newTitle, newContent)
                    .then(
                        resp => {
                            console.log('UpdateNewNews - resp: ', resp)
                            if (resp && resp.isOk) {
                                history.push('/adm/novinky')
                            } else {
                                //TODO
                            }
                        },
                        error => {
                            //TODO
                            //console.log('err: ', error);
                            console.log('UpdateNewNews - err: ', error)
                        }
                    );
                }
            }
        }

        return (
            <div>
                <h3>
                {(id === undefined) ? 
                    "Vytvoření nové novinky"
                    : "Úprava novinky"
                }
                </h3>

                {/* {newsItem ? setNewTitle(newsItem.title) : ""} */}
    
                <form onSubmit={handleSubmit}>
    
                    <div className="form-group">
                        <label>Nadpis: </label>
                        <input 
                            type="text"
                            value={newTitle}
                            name="title"
                            onChange={e => setNewTitle(e.target.value)} />
                    </div>
    
                    <div className="form-group">
                        <label>Obsah: </label>
                        <textarea  cols="60" rows="10" 
                            name="content"
                            type="text"
                            value={newContent}
                            onChange={e => setNewContent(e.target.value)} />
                    </div>
    
                    <br/>
                    <div className="form-group">
                        <button type="submit">Uložit</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <Router>
            <div id="adm-content">
                <h2>Novinky</h2>
                
                <Switch>
                    <Route path="/adm/novinky/nova" children={<CreateOrUpdateNews operation="create" />} />
                    <Route path="/adm/novinky/edit/:id" children={<CreateOrUpdateNews operation="edit" />} />
                    <Route path="/adm/novinky/:id" children={<OneNews />} />
                    <Route path="/adm/novinky" children={<NewsList />} />
                </Switch>
            </div>
        </Router>
    );
}
