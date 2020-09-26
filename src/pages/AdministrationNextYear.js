import React from 'react';
import { useAppContext } from "../libs/contextLib";

export default function AdministrationNextYear() {

    const { isAuthenticated } = useAppContext();

    return (
        <div>
        {isAuthenticated ?
            <div>
                <h2>ADMINISTRACE - Další ročník</h2>
                <div>
                    Datum příšího závodu: //TODO cal.
                </div>
            </div>
            : ""
        }
        </div>
    );
}