import {Component, OnDestroy, OnInit} from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubject: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) { }

  ngOnInit() {
    this.userSubject = this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSubject.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut() {
    this.authService.logout();
  }

}
