import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Url } from '../url/url.model';
import { UrlService } from '../url/url.service';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-url-form',
    templateUrl: './url-form.component.html',
    providers: [UrlService, UserService],
    styleUrls: ['./url-form.component.scss']
})
export class UrlFormComponent implements OnInit {
    public urlInfo: Url;
    public urlData: Url = { user: null, originalUrl: '', shortUrl: '' }
    public userId: number;
    public origin = window.location.origin;
    public errorText: string = '';
    public btnText: string = 'Shorten';

    constructor(private urlService: UrlService, private userService: UserService) { }

    onSubmit(form: NgForm) {
        this.setUserId();

        this.urlService.saveShortUrlData(this.urlData).subscribe(res => {
            let data = JSON.parse(res);
            data.shortUrl = `${this.origin}/${data.shortUrl}`;
            this.urlInfo = data;
            this.btnText = 'Shorten';
            this.errorText = '';
        }, errorData => {
            this.btnText = 'Shorten';
            if(errorData.error.code == 'bad_short_url') {
                form.controls['shortUrl'].setErrors({ 'invalid': true });
                this.errorText = errorData.error.message;
            } else {
                form.controls['originalUrl'].setErrors({ 'invalid': true });
            }
            
            return errorData.error.code;
        });

    }

    setUserId() {
        let token = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null;

        this.userService.getUserDataByToken(token).subscribe(userData => {
            this.userId = JSON.parse(userData).id;
            this.urlData.user = this.userId;
        });
    }

    copyToClipboard(element) {
        this.urlService.copyToClipboard(element);
    }

    formLoading(form: NgForm) {
        if(form.form.valid) {
            this.btnText = 'Loading';
        }

    }

    ngOnInit() {
    }
}
