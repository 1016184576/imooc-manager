import JSONP from 'jsonp';

export default class Axios{
  static jsonp(options){
    return new Promise((resolve,reject)=>{
      JSONP(options.url,{
        param:'callback'
      },(err,response)=>{
        if(response.status == 'success'){
          resolve(response.results)
        }else{
          if(err){
            reject(err.message);
          }else{
            reject(response.status)
          }
        }
      })
    })
  }
}