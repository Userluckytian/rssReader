import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../common-service/message/message.service';
import { ReqAPIOptionsInterface } from '../core-net/req_api/req-type';
import { RequireService } from '../core-net/req_api/Require.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cookies: CookieService,
    private requireService: RequireService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
    // 设置cookie
    if (this.cookies.get('userName')) {
      this.loginForm.controls['userName'].setValue(this.cookies.get('userName'));
    }
  }
  submitForm() {
    if (this.loginForm.valid) {
      const bodyparams = {
        userName: this.loginForm.get('userName')!.value,
        password: this.loginForm.get('password')!.value,  /// calcMD5(this.password.value),
        accountType: 0,
        platform: 0,
        verifyCode: {
          id: '',
          code: ''
        }
      };
      const httpOption = new HttpHeaders({ 'Content-Type': 'application/json' });
      const paramOptions: ReqAPIOptionsInterface = {
        body: bodyparams,
        httpHeader: httpOption
      }
      this.requireService.newReqApi(true, 'login', 'validLogin', paramOptions).subscribe((result: any) => {
        if (result.code === 1) {
          this.storeLoginInfo(result.data)
          this.router.navigate(['./layout']);
        } else {
          this.messageService.createCusMessage('error', '用户名或密码错误!');
        }
      });
    } else {
      // 如果无效的表单，给出用户提示哪些项要调整
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  /**
   * 存储登录成功后的相关信息
   *
   * @param {*} info
   * @memberof LoginComponent
   */
  storeLoginInfo(info: any) {
    const token = 'Bearer ' + info.accessToken;
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: token })
    };
    localStorage.setItem('token-info', JSON.stringify(info)); // 包含了全部的data信息！不只包含了token;
    // 增加用户名cookie
    const time: number = 2 * 60 * 60 * 1000; // cookie过期时间两个小时 2*60*60*1000
    if (this.loginForm.get('remember')?.value) {
      this.cookies.set('account', this.loginForm.get('userName')?.value, new Date(new Date().getTime() + time));
    } else {
      if (this.cookies.get('account')) {
        this.cookies.delete('account');
      }
    }
  }

  get loading() {
    return RequireService.loading;
  }


}
