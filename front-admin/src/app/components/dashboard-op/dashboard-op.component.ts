import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-dashboard-op',
  templateUrl: './dashboard-op.component.html',
  styleUrls: ['./dashboard-op.component.css']
})
export class DashboardOpComponent {
  constructor(private authService:AuthServiceService){}
  
  logOut(){
      this.authService.logout();
    }
  
}
