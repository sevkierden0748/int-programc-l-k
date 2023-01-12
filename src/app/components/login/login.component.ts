import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sonuc } from 'src/app/models/SonucModel';
import { Kullanici } from 'src/app/models/UyeModel';
import { DataService } from 'src/app/services/servis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  returnUrl!: string;
  secKullanici: Kullanici = new Kullanici;
  sonuc: Sonuc = new Sonuc();
  
  constructor(
    public servis: DataService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }


  GirisYap(kullaniciAdi: string, Sifre: string) {
    this.servis.KullaniciLogin(kullaniciAdi, Sifre).subscribe((d: any) => {
      if (d.length > 0) {
        var yetki = [];

        if (d[0].Yetkilimi == true) {
          yetki.push("Uye");
          yetki.push("Admin");
        } else {
          yetki.push("Uye");
        }
        localStorage.setItem("token", this.servis.ParolaUret(64));
        localStorage.setItem("UyeId", d[0].id);
        localStorage.setItem("kadi", d[0].KullaniciAdi);
        localStorage.setItem("uyeYetkileri", JSON.stringify(yetki));
        this.router.navigateByUrl("");
      }
    }, err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Bir Hata Oluştu";
    });
  }

  KayitOl(kadi:any,Isim:any,Soyisim:any,Email:any,Sifre:any){
    this.secKullanici.KullaniciAdi = kadi
    this.secKullanici.Isim = Isim
    this.secKullanici.Soyisim = Soyisim
    this.secKullanici.Email = Email
    this.secKullanici.Parola = Sifre
    this.secKullanici.KatilmaTarih = new Date();
    this.secKullanici.Yetkilimi = false
    console.log(this.secKullanici)
    this.servis.KullaniciEkle(this.secKullanici).subscribe((d: any) => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kullanıcı Eklendi";
    },err => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Bir Hata Oluştu";
    });
  }
}
