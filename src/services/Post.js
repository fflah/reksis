import axios from 'axios';
import {OnlinePath, RootPath} from './config'

// post semua api yang tidak membutuhkan header authorization
const General = (path, root, data ) =>{
    const promise = new Promise((resolve, reject)=>{
        axios.post(`${root ? OnlinePath : RootPath}/${path}`, data)
        .then((result)=>{
            resolve(result);

        }, (err)=>{
            reject(err);
        })
    })

    return promise;
}

// post semua api yang membutuhkan header authorization
const PostAuth = (path, root, data, key) =>{
    let config = {
        headers: {
            Authorization: `Token ${key}`,
        }
      }
    const promise = new Promise((resolve, reject)=>{
        axios.post(`${root ? OnlinePath : RootPath}/${path}`, data, config)
        .then((result)=>{
            resolve(result.data);
        }, (err)=>{
            reject(err);
        })
    })
    return promise;

}

const POST = {
    General,
    PostAuth
}

export default POST