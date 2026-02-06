import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp',
  imports: [FormsModule, CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {


  otp: string[] = ['','','','','',];
   @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>


  onInput(event: any, index: number){
    const value = event.target.value
    this.otp[index] = value
    if(!/^\d$/.test(value)){
      this.otpInputs.get(index + 1)?.nativeElement.focus()
    }
  }

  onKeyDown(event: KeyboardEvent, index: number){
    if(event.key === 'Backspace' && !this.otp[index]){
      this.otpInputs.get(index - 1)?.nativeElement.focus()
    }
  }

    trackByIndex(index: number){
    return index;
    // , item: any : number 
  }

  submitOtp(){
    const otpValue = this.otp.join(''); 
     const payload = {
    otp: otpValue,
  };
  }

}
