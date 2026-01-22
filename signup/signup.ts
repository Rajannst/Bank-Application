import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup{
  username:String='';
  email:String='';
  password:String='';
  router=inject(Router);
  onsignup(){
    if(!this.username||!this.email||!this.password){
      alert("Please fill all the fields");
      return;
    }
    const key="app.users";
    let users:Array<{username:String,email:String,password:String}>=[];
    try{
      const loc=localStorage.getItem(key);
      if(loc){
        const users=JSON.parse(loc) as any[]
      }
    }catch{
      users=[];
    }
    const exist=users.some(u=>u.username===this.username || u.email===this.email|| u.password===this.password);
    if(exist){
      alert("User already exists");
      return;
    }
    users.push({username:this.username,password:this.password,email:this.email});
    try{
      localStorage.setItem(key,JSON.stringify(users));
      localStorage.setItem("userlogin",JSON.stringify({username:this.username,password:this.password}));
    }catch(e){
      console.warn("Failed to save user data",e);
    }
    alert("Signup successful! Please login.");
    (this.router as Router).navigate(['/login']);
  }
}
