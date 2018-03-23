/**
 * Created by Prakash Malakar on 18/03/2018.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {isNullOrUndefined} from 'util';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Ng2Webstorage } from 'ngx-webstorage';




@Injectable()
export class DataService {
  private server;
  private user;
  private token;
  // private user;
  // private token;
  // private uuid;
  // private users = [
  //   {
  //     'first': 'Prakash',
  //     'last': 'Malakar',
  //     'email': 'pramalakar.2010@gmail.com'
  //   }
  // ];

  // public weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  constructor(private http: HttpClient, private localStorage: AsyncLocalStorage) {
    // console.log('init dataservice');
    this.server = '';
    // this.user = {};
    // this.uuid = '';
  }

  public init() {
    // return Promise.all([
      this.server = 'localhost:60882';
      // this.get('server').then(server => this.server = server),
      // this.get('token').then(token => this.token = token)
    this.localStorage.getItem('token').subscribe((token) => {
      this.token = token;
    }, () => {
      console.log('error');
    });
    // ]);
  }
  // public getUsers() {
  //   return this.users;
  // }
  //
  //
  public set(key, value): any {
    console.log('[DataService:set]Setting: ' + key + ' = ' + value);
    return this.localStorage.setItem(key, value);
  }

  public get(key) {
    console.log('[DataService:get]Getting: ' + key);
    return this.localStorage.getItem(key);
  }

  public getServerAddress() {
    return this.server;
  }

  public setObject(key, value) {
    this.set(key, JSON.stringify(value));
  }

  public getObject(key) {
    return new Promise(function (resolve, reject) {
      this.get(key).then(function (data) {
        try {
          resolve(data ? JSON.parse(data) : undefined);
        } catch (e) {
          reject(e);
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  }

  public execute(action, request) {
    return this._execute(this.server, action, request);
  }

  private _execute(server: String, action: String, request): Observable<any> {
    console.log('_execute');
    // let options = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'})};
    let options = {
      headers: isNullOrUndefined(this.token) ?
        new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }) :
        new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Authorization':  'Bearer ' + this.token
        })
        };
    let path = 'http://' + 'localhost:60882' + action;
    console.log(path);
    return this.http.post(path, request, options);
  }

  public login(loginForm) {
    // let req = 'username=' + email + '&password=' + password + '&grant_type=password';
    // return this.execute('/token', req);
    // this.uuid = uuid;
    let req = 'username=' + loginForm.username + '&password=' + loginForm.password + '&grant_type=password';
    // return new Promise(function (resolve, reject) {
      console.log('login');
      this.execute('/token', req).subscribe((data) => {
        this.token = data['access_token'];
        if (this.token) {
          this.localStorage.setItem('token', this.token).subscribe(() => {
              this.checkLoggedIn().then(() => {
                console.log('checkLoggedIn returned true');
                return (this.user);
              });
          }, () => {
            console.log('error');
          });
        } else {
          console.log ('Login failed');
        }
      });
    // });
  }
  private checkLoggedIn(): Promise<any> {
    console.log('[DataService:checkLoggedIn]Checking for logged in user');

    let promise = new Promise((resolve, reject) => {
      this.localStorage.getItem('token').subscribe((token) => {
        console.log(token);
        this.token = token;
        if (!isNullOrUndefined(token)) {
          console.log('[DataService:checkLoggedIn]logged in: ' + this.token);
          // this.events.publish('user:loggedIn', true);
          // console.log('User Details: ' + this.loadUserDetails());
          this.loadUserDetails().subscribe((user) => {
            console.log('user: ' + JSON.stringify(user));
            this.localStorage.setItem('user', JSON.stringify(user)).subscribe(() => {
              // console.log('done');
            }, () => {
              // console.log('error');
            });
            resolve(true);
          });
        } else {
          console.log('[DataService:checkLoggedIn]not logged in');
          resolve(false);
        }
      }, () => {
        console.log('no call');
        // Not called
      });
    });
    return promise;
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
  public logout() {
  }

  public loadUserDetails(): Observable<any> {
    return this.execute('/api/Users/GetLoggedInUser', {});
  }

  public loadAppDetails() {
  }

  public clearLogin() {
    // console.log('Clearing login')
    // this.token = '';
    // this.set('token', null);
    // this.set('user', null);
  }

  public clearServer() {
    this.server = '';
    // this.set('server', null);
    // this.set('settings', null);
    // this.events.publish('config:changed', false);
  }

  public clearAllStorage() {
    // this.storage.clear();
  }

  public _isNullOrUndefined(pram) {
    return isNullOrUndefined(pram);
  }


}
