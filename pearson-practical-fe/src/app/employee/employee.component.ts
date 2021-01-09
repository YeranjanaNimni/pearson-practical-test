import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  findAemployeeArray : Array<any> = [];
  finalArrayAfterDelete : Array<any> = [];
  allEmployees : Array<any> = [];

  public id : String;
  public name : String;
  public dob : String;
  public email : String;
  public contact : String;
  public fid : String;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  findAllEmployees(){
    this.http.get<any>('http://localhost:8080/rest/v2/all').toPromise()
      .then((users: Array<any>) => {
        this.allEmployees = users;
      })
      .catch((error) => {
        console.log('Error ======> ', error)
      })
  }

  findAemployee(fid: any) {
    console.log(fid);
    this.http.get<any>('http://localhost:8080/rest/v2/findOne' +fid).toPromise()
      .then((users: Array<any>) => {
        this.findAemployeeArray = users;
      })
      .catch((error) => {
        console.log('Error =====>', console.error)

      })
  }


  submit(formData: any) {
    console.log('data sent', formData)
    this.http.post<any>('http://localhost:8080/rest/v2/addEmployee', formData).toPromise()
      .then((data) => {
        console.log('data sent to DB', data)   
        this.http.get<any>('http://localhost:8080/rest/v2/all').toPromise()
          .then((users: Array<any>) => {
            this.allEmployees = users;
          })
          .catch((error) => {
            console.log('Error ======> ', error)
          })
      })
      .catch((error) => {
        console.log('ERROR>>>>>>>>>>>>>>>>: ', error)
      })
  }

  delete(d_id: any) {
    console.log('get d_ID', d_id)
    this.http.delete<any>('http://localhost:8080/rest/v2/delete'+d_id).toPromise()
      .then((data) => {
        console.log('data deleted', data)
        this.http.get<any>('http://localhost:8080/rest/v2/all').toPromise()
      .then((users: Array<any>) => {
        this.finalArrayAfterDelete = users;
      })
      .catch((error) => {
        console.log('Error ======> ', error)
      })
      })
      .catch((error) => {
        console.log('ERROR>>>>>>>>>>>>>>>>: ', error)
      })
  } 

  edit(e_id: any) {
    console.log('get e_ID', e_id)
    this.http.get<any>('http://localhost:8080/rest/v2/edit' + e_id).toPromise()
      .then((data) => {
        console.log('data ready to edit', data)
        console.log('data of id', data.id)
        this.id = data.id,
          this.name = data.name,
          this.dob = data.age,
          this.email = data.gender,
          this.contact = data.gender
        //  console.log('id get', this.gender)
      })
      .catch((error) => {
        console.log('error>>>>>>>>>>>>>>>:', error)
      })
    

      }
}
