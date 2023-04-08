import axios from 'axios'

// reference: https://blog.csdn.net/weixin_44284981/article/details/108519779

export function axios_get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params, }).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.log(err, '1')
            reject(err)
        })
    })
}

export default axios