import axios from 'axios'

 const axiosInstances=axios.create({
 baseURL:import.meta.env.VITE_API_URL,
 headers:{
    'Content-Type':'application/json'
 },
});
export default axiosInstances