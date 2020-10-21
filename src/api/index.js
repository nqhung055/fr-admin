import axios from 'axios';
import AppConfig from '../constants/AppConfig'
export default
    axios.create({
        // baseURL: 'https://reactify.theironnetwork.org/data/'
        baseURL: AppConfig.ip + AppConfig.gw_port
        // baseURL: 'http://localhost:5566/'
    });
    
    /* fetch.create({
        baseURL: 'http://13.229.132.84:5566/'
    }); */