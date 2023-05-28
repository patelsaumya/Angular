import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "./post.model";
import {PostsService} from "./posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      // console.log(posts);
      this.loadedPosts = posts;
      this.isFetching = false;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onCreatePost(postData: Post) {
    // console.log(postData);
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      // console.log(posts);
      this.loadedPosts = posts;
      this.isFetching = false;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      // console.log(error);
    });
    this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onHandleError() {
    this.error = null;
  }
}
