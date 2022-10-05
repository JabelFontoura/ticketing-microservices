import axios from 'axios';

export default ({ req }) => {
    const options = { baseURL: '/' }; 

    if (typeof window === 'undefined') {
        options.baseURL = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
        options.headers = req.headers;
    }

    return axios.create(options);
};