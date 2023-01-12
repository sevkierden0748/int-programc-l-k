import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/servis.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

 
  constructor(
    public apiServis: DataService
  ) { }

  ngOnInit(): void {
  }
  OturumKapat() {
    localStorage.clear();
    location.href = "/";
  }

}


