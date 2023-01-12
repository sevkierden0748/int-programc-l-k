import { Sınav } from '../../models/Sınav';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/servis.service';

@Component({
  selector: 'app-anasayfa',
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.css']
})
export class AnasayfaComponent implements OnInit {
  sinavlar! : Sınav[];

  

  constructor(public servis: DataService) { }

  ngOnInit(): void {
    this.SinavListele();
  }


  SinavListele(){
    this.servis.SinavListele().subscribe((d:any)=>{
      this.sinavlar = d
    })
  }
  
  Ara(aranacak:any,){
    this.servis.SinavAra(aranacak).subscribe((d:any)=>{
      this.sinavlar = d
    })
  }

  SinavByIslem(a:any){
    this.servis.SinavByIslem(a).subscribe((d:any)=>{
      this.sinavlar = d
    },err=>{
      console.log("Sınav yüklemede hata")
    })
  }


}
