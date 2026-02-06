import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { LoginModel } from '../../model/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signin',
  imports: [FormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

    loginModelData: LoginModel
    isLoading = false
    show = false


  constructor(private authService: AuthService, private router: Router, private notification: NzNotificationService){

    this.loginModelData = new LoginModel()

  }

  ngOnInit(): void {
    
  }

  //  createNotification(position: 'topRight', type: 'success'| 'info'| 'warning'| 'error', title: string, message: string ){
  //  this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000,   }); 
  // }


  createNotification(position: 'topRight', type: 'success' | 'info' | 'warning' | 'error', title: string, message: string ) {
  // Map type to Tailwind classes
  const typeClasses: Record<string, string> = {
    success: 'bg-green-100 border-l-4 border-green-500 text-green-800 border-1-4 border-green-300',
    error: 'bg-red-100 border-l-4 border-red-500 text-red-800 border-1-4 border-red-300',
    info: 'bg-blue-100 border-l-4 border-blue-500 text-blue-800',
    warning: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800',
  };

  this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000, nzClass: typeClasses[type], });
}





  otp(){
    this.router.navigate(['/otp'])
  }
  forgotPassword(){
    this.router.navigate(['/forgotpassword'])
  }
    dashboard(){
    this.router.navigate(['/dashboard'])
  }

  onSubmit(){
    console.log('Login payload:', this.loginModelData);
     this.isLoading = true;
    this.authService.getLogin(this.loginModelData).subscribe({
      next: (res) => {
        console.log('login data', res)
        localStorage.setItem('token', res.token)
        const token = localStorage.getItem('token')
         console.log('Token', token)
        localStorage.setItem('userId', res._id)
        const userId = localStorage.getItem('userId');
            console.log('Logged-in User ID:', userId);
       

            // Store role and permissions
        const roleData = {
          role: res.role?.name,        // "CTO"
          roleId: res.role?._id,       // optional
          permissions: res.permissions || []
        };
        localStorage.setItem('userRole', JSON.stringify(roleData));
          this.isLoading = false;
          //  this.createNotification( "topRight", "success", "Login Successful!", res.message);

          this.router.navigate(['/dashboard'])
         this.createNotification("topRight", "success", 'Login Successful!!', "Welcome Back!")
       
      },

      error: (err) => {
        console.log('data not fetch', err)
        this.isLoading = false;
         this.createNotification("topRight", "error", "Login Failed!!", "Invalid Credentials or Network Issue!")

      }
    })
  }



//   login(credentials: any) {
//   return this.http.post('/api/login', credentials).subscribe((res: any) => {
//     localStorage.setItem('user', JSON.stringify(res.user));
//   });
// }





}


