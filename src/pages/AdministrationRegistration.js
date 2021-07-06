import React, { useState, useEffect } from 'react';
import {
    Link,
    useParams,
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { registrationsService } from '../services/registrationsService';
import { useAppContext } from '../libs/contextLib';

import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

export default function AdministrationRegistration() {

    const { isAuthenticated } = useAppContext();
    const [registrations, setRegistrations] = useState([]);
    const [paidmap, setPaidmap] = useState(new Map());

    useEffect(() => {
        registrationsService.GetAllRegistrations()
            .then(data => {
                setRegistrations(data);

            })
            .catch(err => {
                console.log('err: ', err.message);
            })
    }, [])

    useEffect(() => {
        registrations.forEach(r => {
            setPaidmap(paidmap.set(r.id, r.paid));
        })
    }, [registrations, paidmap])

    // let history = useHistory();

    const getPaidValue = (id) => {
        const registration = registrations.filter((r) => r.id === id)[0];
        return registration.paid;
    };

    const paidChanged = (e, id) => {

        setPaidmap(paidmap.set(id, e.target.checked));

        const newRegistrations = [...registrations];
        newRegistrations.forEach( (r) => {
            if (r.id === id) {
                r.paid = e.target.checked;
            }
        });

        setRegistrations(newRegistrations);

        const data = {
            "id": id,
            "paid": e.target.checked
        }

        registrationsService.UpdateOneRegistration(data)
            .then(data => {

            })
            .catch(err => {
                console.log('err: ', err.message);
            })
    };

    function RegistrationsList() {

        // const { isAuthenticated } = useAppContext();
        // const [registrations, setRegistrations] = useState([]);

        // useEffect(() => {
        //     registrationsService.GetAllRegistrations()
        //         .then(data => {
        //             setRegistrations(data);
        //             return data;
        //         })
        //         .catch(err => {
        //             console.log('err: ', err.message);
        //         })
        // }, [])

        return (
            <div>

                Registrováni:
                <br />
                {registrations ? registrations.map((item) => {
                    return <div className="news-item" key={item.id}>
                        <p>{item.firstName} {item.lastName}, {item.year}, {item.email}, {item.phone}</p>

                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={getPaidValue(item.id)} onChange={(e) => paidChanged(e, item.id)} />}
                                label="zaplaceno"
                            />
                        </FormGroup>

                    </div>

                }) : ""}
            </div>
        )
    }

    // function OneRegistration() {

    //     const [registrationItem, setRegistrationItem] = useState();

    //     let { id } = useParams();

    //     useEffect(() => {
    //         registrationsService.GetOneRegistrationItem(id)
    //             .then(data => {
    //                 setRegistrationItem(data);
    //                 //return data;
    //             })
    //             .catch(err => {
    //                 console.log('err: ', err);
    //             })
    //     }, [id])

    //     if (registrationItem !== undefined) {
    //         const timestamp = new Date(registrationItem.date);
    //         const date = timestamp.toLocaleDateString();
    //         return (
    //             <div className="registration-item" key={registrationItem.id}>
    //                 <p className="date">{date}</p> <h3>{registrationItem.title}</h3>
    //                 <div>{registrationItem.content}</div>
    //                 {isAuthenticated ?
    //                     <p><Link to={"/adm/registrace/edit/" + registrationItem.id}>UPRAVIT</Link> ~ <Link to={"/adm/registrace/delete/" + registrationItem.id}>ODSTRANIT</Link></p>
    //                     : ""
    //                 }
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div className="registration-item">
    //                 Asi vítr Máchale... :-)
    //             </div>
    //         );
    //     }
    // }

    // function UpdateRegistration(props) {

    //     const { id } = useParams();
    //     let registrationItem;
    //     if (registrations !== undefined) {
    //         registrationItem = (registrations.find(x => x.id === id));
    //     }
    //     if (registrationItem === undefined) {
    //         registrationItem = { title: "", content: "" }
    //     }
    //     const [newTitle, setNewTitle] = useState(registrationItem.title);
    //     const [newContent, setNewContent] = useState(registrationItem.content);

    //     function validateForm() {
    //         return (newTitle.length > 0 && newContent.length > 0);
    //     }

    //     // function refresh() {
    //     //     // need to change the path away and back for Router to see a change :-(
    //     //     history.push('/adm/');
    //     //     history.push('/adm/registrace');
    //     // }

    //     function handleSubmit(event) {
    //         event.preventDefault();

    //         if (isAuthenticated && validateForm()) {

    //             if (props.operation === "create") {
    //                 registrationsService.createOneRegistration(newTitle, newContent)
    //                     .then(
    //                         resp => {
    //                             // refresh();
    //                         },
    //                         error => {
    //                             //TODO
    //                             //console.log('err: ', error);
    //                             console.log('CreateNewRegistration - err: ', error)
    //                         }
    //                     );
    //             } else if (props.operation === "edit") {
    //                 registrationsService.updateOneRegistration(id, newTitle, newContent)
    //                     .then(
    //                         resp => {
    //                             // refresh();
    //                         },
    //                         error => {
    //                             //TODO
    //                             //console.log('err: ', error);
    //                             console.log('UpdateNewRegistration - err: ', error)
    //                         }
    //                     );
    //             }
    //         }
    //     }

    //     return (
    //         <div>
    //             <h3>
    //                 {(id === undefined) ?
    //                     "Vytvoření nové registrace"
    //                     : "Úprava registrace"
    //                 }
    //             </h3>

    //             {/* {registrationItem ? setNewTitle(registrationItem.title) : ""} */}

    //             <form onSubmit={handleSubmit}>

    //                 <div className="form-group">
    //                     <label>Nadpis: </label>
    //                     <input
    //                         type="text"
    //                         value={newTitle}
    //                         name="title"
    //                         onChange={e => setNewTitle(e.target.value)} />
    //                 </div>

    //                 <div className="form-group">
    //                     <label>Obsah: </label>
    //                     <textarea cols="60" rows="10"
    //                         name="content"
    //                         type="text"
    //                         value={newContent}
    //                         onChange={e => setNewContent(e.target.value)} />
    //                 </div>

    //                 <br />
    //                 <div className="form-group">
    //                     <button type="submit">Uložit</button>
    //                 </div>
    //             </form>
    //         </div>
    //     );
    // }

    // function DeleteRegistration() {

    //     let { id } = useParams();

    //     if (isAuthenticated) {
    //         registrationsService.deleteOneRegistration(id)
    //             .then(() => {
    //                 // history.push('/adm');
    //                 // history.push('/adm/registrace');
    //             })
    //             .catch(err => {
    //                 console.log('err: ', err);
    //             })
    //     }

    //     return (
    //         <div className="registration-item">
    //             <p>A je to... :-)</p>
    //             <p>Novika byla odstraněna.</p>
    //             <p><Link to="/adm/registrace/">Výpis novinek</Link></p>
    //         </div>
    //     );

    // }

    return (
        <Router>
            <div id="adm-content">
                <h2>Registrace</h2>

                {/* <Route path="/adm/registrace/edit/:id" children={<UpdateRegistration operation="edit" />} />
                    <Route path="/adm/registrace/delete/:id" children={<DeleteRegistration />} />
                    <Route path="/adm/registrace/:id" children={<OneRegistration />} /> */}
                <Route path="/adm/registrace" children={<RegistrationsList />} />
            </div>
        </Router>
    );
}
