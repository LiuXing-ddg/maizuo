import axios from "axios"
const instance = axios.create({
    baseURL: 'https://m.maizuo.com',
    timeout: 3000,
    headers: {
        "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"15855564021095216660520","bc":"430200"}'
    }
});
export default instance