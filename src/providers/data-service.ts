/**
 * Created by Prakash Malakar on 18/03/2018.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class DataService {
  private server;
  private user;
  private token;
  private uuid;
  private users = [
    {
      'first': 'Prakash',
      'last': 'Malakar',
      'email': 'pramalakar.2010@gmail.com'
    }
  ];

  // public weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  constructor() {
    console.log('init dataservice');
    this.server = '';
    this.user = {};
    this.uuid = '';
  }

  public init() {
    return Promise.all([
      this.server = 'localhost:60882'
      // this.get('server').then(server => me.server = server),
      // this.get('token').then(token => me.token = token)
    ]);
  }
  public getUsers() {
    return this.users;
  }


  // private _execute(server: String, action: String, request) {
  //   this.options = {
  // //     cache: false,
  //     headers: new Headers({
  //         'Content-Type': 'application/json'
  //       })
  //     // headers: isNullOrUndefined(this.token) ?
  //     //   new Headers({
  //     //     'Content-Type': 'application/json'
  //     //   }) :
  //     //   new Headers({
  //     //     'Content-Type': 'application/json',
  //     //     'X-SDTOKEN':  this.token
  //     //   })
  //   };
  //   this.path = 'http://' + server + '/api' + action;
  //   // this.path = 'http://' + server + '/api' + action;
  //   return new Promise<any>(function (resolve, reject) {
  //       this.http.post(path, JSON.stringify(request), options)
  //       // .map(res => res.json())
  //       .subscribe(
  //         function (data) {
  //           resolve({'data': 'this is data'});
  //         }
  //         , function (error) {
  //           if (error.status === '403') {
  //           }
  //           reject('error');
  //         }
  //         , () => console.log('[DataService:execute]action complete')
  //       );
  //   });
  // }

}
