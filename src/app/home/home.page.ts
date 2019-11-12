import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public controls: FormGroup;
  constructor(public formBuilder: FormBuilder, public router: Router) {
    this.controls = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
  });
  }
  loginOnClicking() {
   if (this.controls.value.userName == 'user' && this.controls.value.password == 'user') {
    this.router.navigate(['/dashboard']);
    } else  if (this.controls.value.userName == 'admin' && this.controls.value.password == 'admin') {
      this.router.navigate(['/admin']);
    } else {
      alert('Please enter valid user name and Password');
    }
  }
  ionViewWillEnter() {
    this.dataClear();
  }
  ionViewDidEnter() {
    this.dataClear();
  }
  public dataClear() {
    this.controls.value.userName = '';
    this.controls.value.password = '';
  }
  ngOnInit() {
    this.dataClear();
  }
}
