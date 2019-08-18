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
    private urlData: Url = { user: null, originalUrl: '', shortUrl: '' }
    private userId: number;
    btnText: string = 'Shorten';

    constructor(private urlService: UrlService, private userService: UserService) { }
    public origin = window.location.origin;

    onSubmit(form: NgForm) {
        this.setUserId();

        this.urlService.saveShortUrlData(this.urlData).subscribe(res => {
            let data = JSON.parse(res);
            data.shortUrl = `${this.origin}/${data.shortUrl}`;
            this.urlInfo = data;
            this.btnText = 'Shorten';
        }, errorData => {
            this.btnText = 'Shorten';
            form.controls['originalUrl'].setErrors({ 'invalid': true });
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
        console.log(form);
        if(form.form.valid) {
            this.btnText = 'Loading';
        }

    }

    ngOnInit() {
    }
}
