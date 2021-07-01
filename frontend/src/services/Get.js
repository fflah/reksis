import axios from 'axios';
import {OnlinePath, RootPath} from './config'

// get semua api yang tidak membutuhkan header authorization
const General = (path, root) =>{    
    const promise = new Promise((resolve, reject)=>{
        axios.get(`${root ? OnlinePath : RootPath}/${path}`)
        .then((result)=>{
            resolve(result.data);
        }, (err)=>{
            reject(err);
        })
    })
    return promise;
}

// get semua api yang membutuhkan header authorization
const GetAuth = (path, root, key) =>{
    let config = {
        headers: {
            Authorization: `Token ${key}`,
        }
      }
    const promise = new Promise((resolve, reject)=>{
        axios.get(`${root ? OnlinePath : RootPath}/${path}`, config)
        .then((result)=>{
            resolve(result.data);
        }, (err)=>{
            reject(err);
        })
    })
    return promise;

}

const GET = {
    General,
    GetAuth
}

export default GET