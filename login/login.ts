import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
  })

export class Login implements OnInit {
    username: String='';
    password:String='';
    constructor(private router:Router) { }
    ngOnInit(): void {
      const loc=localStorage.getItem("userlogin");
      if(loc){
        try{
          const obj=JSON.parse(loc) as {username?:String,password?:String};
          if(obj.username) this.username=obj.username;
          if(obj.password) this.password=obj.password;
        }catch{}
    }
  }
    onSubmit(event:Event){
      event.preventDefault()
      if(!this.username||!this.password){
        alert("Please fill all the fields");
        return;
      }
      const key="app.users";
      try{
        const loc=localStorage.getItem(key);
        const users=loc? (JSON.parse(loc)as Array<{username:String,password:String}>):[];
        const match=users.find(u=>u.username===this.username && u.password===this.password)
        if(match){
          localStorage.setItem("isLoggedIn","true");
          localStorage.setItem('username',this.username.toString());
          this.router.navigate(['/home']);
        }else{
          alert("Invalid Username or Password");
        }
      }catch{
        alert("login failed");
      }
    }
  goToSignup(event: Event) {
    event.preventDefault();
    this.router.navigate(['/signup']);
  }
}

