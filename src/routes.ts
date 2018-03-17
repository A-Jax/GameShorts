import { Routes } from '@angular/router';
import { GalleryComponent } from './app/component/gallery/gallery.component';
import { ImageDetailComponent } from './app/component/image-detail/image-detail.component';
import { LoginComponent } from './app/component/login/login.component';
import { UploadComponent } from './app/component/upload/upload.component';
import { AuthenticationGaurdService } from './app/services/authentication-gaurd.service'
import { AboutComponent } from './app/component/about/about.component';
import { RegisterComponent } from './app/component/register/register.component';
import { ProfileComponent } from './app/component/profile/profile.component';

export const appRoutes: Routes = [
    { path: 'gallery/:id', component: GalleryComponent },
    { path: 'upload', component: UploadComponent, canActivate: [AuthenticationGaurdService] },
    { path: 'image/:id', component: ImageDetailComponent },
    { path: 'about', component: AboutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGaurdService] },
    { path: '', component: AboutComponent },
    { path: 'login', component: LoginComponent }
]