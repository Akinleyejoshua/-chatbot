import axios from "axios";
import {get} from "./helpers";


const settings = {

    // baseURL:'http://localhost:5000/api/chatbot/',
    baseURL:'https://web-production-ebf7.up.railway.app/api/chatbot/',
	
    headers: {
        Accept: 'application/json,text/plain,*/*',
        'Content-Type': 'application/json',
		// 'Access-Control-Allow-Origin': "*"
}
}

export const request = axios.create(settings);

request.interceptors.request.use(
	(config) => {
		const token = get("token") === undefined ? "12345678" : get("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);




