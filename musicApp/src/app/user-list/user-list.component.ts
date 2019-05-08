import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService} from '../services/rest.service'
import { ActivatedRoute, Router } from '@angular/router';
import {DataSource, getMultipleValuesInSingleSelectionError} from '@angular/cdk/collections';
import { MatPaginator, PageEvent} from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users:Array<Object>;
  usersString: string = "";
  dataSource = this.usersString;
  displayedColumns: string[] = ['ID', 'Name', 'Username' , 'Email']
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {

    this.rest.getUsers().subscribe((data: Array<Object>) => {
      console.log(data);
      this.users = data;
      this.usersString = JSON.stringify(this.users)
    });
    // console.log(this.dataSource);
  }


  delete(id) {
    this.rest.deleteUser(id)
      .subscribe(res => {
          this.getUsers();
        }, (err) => {
          console.log(err);
        }
      );
  }

}