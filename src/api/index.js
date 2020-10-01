import axios from 'axios';

export default
    axios.create({
        // baseURL: 'https://reactify.theironnetwork.org/data/'
        baseURL: 'http://13.229.132.84:5566/'
    });
    
    /* fetch.create({
        baseURL: 'http://13.229.132.84:5566/'
    }); */