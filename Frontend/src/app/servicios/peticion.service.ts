import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PeticionService {
  requestOptions: any = {};

  urlHost: string = 'http://localhost:3000';
  urlHostTest: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  Post(url: string, payload: any) {
    let promise = new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({
          //"":""
        }),
        whithCredential: true,
      };

      this.http
        .post(url, payload, this.requestOptions)
        .toPromise()
        .then((res: any) => {
          console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });

    return promise;
  }

  Put(url: string, payload: any) {
    let promise = new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({
          //"":""
        }),
        whithCredential: true,
      };

      this.http
        .put(url, payload, this.requestOptions)
        .toPromise()
        .then((res: any) => {
          console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });

    return promise;
  }

  Get(url: string) {
    let promise = new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({
          //"":""
        }),
        whithCredential: true,
      };

      this.http
        .get(url, this.requestOptions)
        .toPromise()
        .then((res: any) => {
          console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });

    return promise;
  }

  Delete(url: string) {
    let promise = new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({
          //"":""
        }),
        whithCredential: true,
      };

      this.http
        .delete(url, this.requestOptions)
        .toPromise()
        .then((res: any) => {
          console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });

    return promise;
  }
}
