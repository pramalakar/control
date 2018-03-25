/**
 * Created by Prakash Malakar on 18/03/2018.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import {isNullOrUndefined} from 'util';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Ng2Webstorage } from 'ngx-webstorage';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';




@Injectable()
export class DataService {
  private server = 'localhost:60882';
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

  private messageSource = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();

  // public weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  constructor(private http: HttpClient, private localStorage: AsyncLocalStorage, public router: Router) {
    // console.log('init dataservice');
    this.server = '';
    // this.user = {};
    // this.uuid = '';
  }

  public init() {
    return Promise.all([
      // this.get('server').subscribe((server) => this.server = server),
      this.get('token').subscribe((token) => {
        this.token = token;
      })
    ]);

    // // return Promise.all([
    //   this.server = 'localhost:60882';
    //   // this.get('server').then(server => this.server = server),
    //   // this.get('token').then(token => this.token = token)
    // this.localStorage.getItem('token').subscribe((token) => {
    //   this.token = token;
    // }, () => {
    //   console.log('error');
    // });
    // // ]);
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

  public get(key): Observable<any> {
    console.log('[DataService:get]Getting: ' + this.localStorage.getItem(key));
    return this.localStorage.getItem(key);
  }

  public getAll(keys) {
    console.log('[DataService:getAll]Getting: ' + keys);
    let store = {};
    let promises = [];
    for (let key of keys) {
      console.log('key: ' + key);
      let prom = this.localStorage.getItem(key).subscribe((value) => {
        console.log('value: ' + value);
        store[key] = value;
      });
      promises.push(prom);
    }
    return new Promise(function (resolve, reject) {
      Promise.all(promises).then(() => {
        resolve(store);
      }).catch(error => {
        reject(error);
      });

    });
  }

  public getServerAddress() {
    return this.server;
  }

  public setObject(key, value) {
    this.set(key, JSON.stringify(value));
  }

  public getObject(key) {
    return this.localStorage.getItem(key).map(data => {
      // .subscribe((data) => {
      console.log('getObject');
      try {
        return (data ? JSON.parse(data) : undefined);
      } catch (e) {
        return (e);
      }
    });
  }

  public execute(action, request) {
    return this._execute(this.server, action, request);
  }

  private _execute(server: String, action: String, request): Observable<any> {
    console.log('_execute');

    //Not working this
    // let options = {
    //   headers: this._isNullOrUndefined(this.token) ?
    //     new HttpHeaders({
    //       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //     }) :
    //     new HttpHeaders({
    //       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //       'Authorization':  'Bearer ' + this.token
    //     })
    // };
    let options;
    if (this.token) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Authorization':  'Bearer ' + this.token
        })
      };
    } else {
      options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          })
      };
    }
    let path = 'http://' + 'localhost:60882' + action;
    console.log(options);
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
  public checkLoggedIn(): Promise<any> {
    console.log('[DataService:checkLoggedIn]Checking for logged in user');

    let promise = new Promise((resolve, reject) => {
      this.localStorage.getItem('token').subscribe((token) => {
        console.log(token);
        this.token = token;
        if (!isNullOrUndefined(token)) {
          console.log('[DataService:checkLoggedIn]logged in: ' + this.token);
          // this.loginEvent.emit('user:loggedIn' + true);
          // console.log('User Details: ' + this.loadUserDetails());
          this.loadUserDetails().subscribe((user) => {
            this.localStorage.setItem('user', JSON.stringify(user)).subscribe(() => {
              this.eventEmit(user);
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
    return this.clearAllStorage().map(() => {
      this.router.navigate(['/login']);
    });
    }

  public loadUserDetails(): Observable<any> {
    return this.execute('/api/Users/GetLoggedInUser', {});
  }

  public loadAppDetails() {
  }

  public clearLogin() {
    // console.log('Clearing login')
    // this.token = '';
    // this.localStorage.setItem('token', null).subscribe(() => {});
    // this.localStorage.setItem('user', null).subscribe(() => {});
  }

  public clearServer() {
    this.server = '';
    // this.set('server', null);
    // this.set('settings', null);
    // this.events.publish('config:changed', false);
  }

  public clearAllStorage() {
    this.token = '';
    return this.localStorage.clear().map(() => {
      console.log('all storage cleared');
    });
  }

  public _isNullOrUndefined(pram) {
    console.log(pram);
    console.log(isNullOrUndefined(pram));
    return isNullOrUndefined(pram);
  }

  eventEmit(source: any) {
    console.log('eventEmit');
    console.log(source);
    this.messageSource.next(source);
  }
}
