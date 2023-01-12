import { Kullanici } from 'src/app/models/UyeModel';
import { Sınav } from '../../models/Sınav';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/servis.service';
import { Sonuc } from 'src/app/models/SonucModel';

@Component({
  selector: 'app-sinav-detay',
  templateUrl: './sinav-detay.component.html',
  styleUrls: ['./sinav-detay.component.css']
})
export class SinavDetayComponent implements OnInit {

  sinavId!: number;
  sinav!: Sınav;


  Islem = [
    "Türkçe","Matematik"
  ]
  sonuc: Sonuc = new Sonuc();

  constructor(
    public servis: DataService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.sinavId = p.id;
        this.SinavById();
        
      }

    });
  }

  SinavById() {
    this.servis.SinavById(this.sinavId).subscribe((d: any) => {
      this.sinav = d;
    });
  }

  SinavDuzenle(){
    this.servis.SinavDuzenle(this.sinav).subscribe(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Düzenlendi";
    }, () => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu";
    });
  }

  SinavSil(){
    this.servis.SinavSil(this.sinavId).subscribe((d:any)=>{
      this.sonuc.islem = true
      this.sonuc.mesaj = "Silme başarılı"
      this.router.navigateByUrl("/login");
    }, () => {
      this.sonuc.islem = false
      this.sonuc.mesaj = "Silme işleminde hata meydana geldi"
    })
  }

}
