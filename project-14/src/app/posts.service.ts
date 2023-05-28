import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";
import security from "../assets/config/security.json";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http.post<{name: string}>(
      security.postsUrl,
      postData,
      {
        observe: "response"
      }
    ).subscribe(responseData => {
      // requests are only sent when you subscribe to them for the response.
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http.get<{ [key: string]: Post }>(
      security.postsUrl,
      {
        headers: new HttpHeaders({"Custom-Header": 'Hello'}),
        // params: new HttpParams().set('print', 'pretty')
        params: searchParams,
        responseType: "json"
      }
    ).pipe(
      map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            // "key" should be the property of "responseData" and not of the "prototype of responseData"
            postsArray.push({...responseData[key], id: key});
          }
        }
        return postsArray;
      }),
      catchError(errorRes => {
        // send to analytics server (to log the error for analytics)
        return throwError(errorRes); // returns new Observable that wraps errorRes
      })
    );
  }

  deletePosts() {
    return this.http.delete(
      security.postsUrl,
      {
        observe: "events",
        responseType: "text"
      }
    ).pipe(
      tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Sent) {
          //...
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      })
    );
  }
}
