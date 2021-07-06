import { registrationsService } from './registrationsService';

// test('GetAllRegistrations returns empty data when no backend', () => {

//     //TODO mock the fetch from backend
    
//     return registrationsService.GetAllRegistrations().then(result => {
//         expect(result).toBe(undefined);
//     });
// });

// test('CreateRegistration returns empty data when no backend', () => {

//     let data = {
//         'firstname':'Pepa'
//     }; //TODO

//     return registrationsService.CreateRegistration(data).then(result => {
//         expect(result).toBe(undefined);
//     });
// });

// test('the data is peanut butter', () => {

//     let data = {
//         'firstname':'Pepa'
//     }; //TODO

//     return expect(registrationsService.CreateRegistration(data)).resolves.toBe('peanut butter');
// });

beforeEach(() => {
    fetch.resetMocks();
});

test('zero', () => {

    fetch.mockResponseOnce(JSON.stringify({ rates: { CAD: 1.42 } }));

    let data = {
        'firstname':'Pepa'
    }; //TODO

    const result = registrationsService.CreateRegistration(data);
    expect(result).toBeUndefined();
});