import { Sınav } from '../../models/Sınav';
import { DataService } from 'src/app/services/servis.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/SonucModel';
import { Kullanici } from 'src/app/models/UyeModel';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentPage = "Uye"

  Islem = [
    "Türkçe","Matematik"
  ]
  

  secKullanici: Kullanici = new Kullanici;
  kullanicilar!: Kullanici[];

  secSinav: Sınav = new Sınav;
  sinavlar!: Sınav[];
  sonuc: Sonuc = new Sonuc();

  constructor(
    public servis:DataService
  ) { }

  SayfaDegistir(page:any){
    this.currentPage = page
    
  }
  ngOnInit(): void {
    this.KullaniciListele();
    this.SinavListele();
  }

  KullaniciSec(kullanici:any){
    this.secKullanici = kullanici
  }
  SinavSec(sinav:any){
    this.secSinav = sinav 
  }


  KullaniciListele(){
    this.servis.KullaniciListele().subscribe((d:any)=>{
      this.kullanicilar = d
    })
  }

  SinavListele(){
    this.servis.SinavListele().subscribe((d:any)=>{
      this.sinavlar = d
    })
  }

  KullaniciDuzenle(){
    this.servis.KullaniciDuzenle(this.secKullanici).subscribe(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Düzenlendi";
      this.KullaniciListele();
    }, () => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu";
    });
  }

  SinavDuzenle(){
    this.servis.SinavDuzenle(this.secSinav).subscribe(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Düzenlendi";
      this.SinavListele();
    }, () => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu";
    });
  }

  KullaniciAra(a:any){
    if(a)
    this.servis.KullaniciAra(a).subscribe((d:any)=>{
      this.kullanicilar = d
    }, () => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Arama Hatası Oluştu";
    });
    else{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Aranacak kelime girilmedi";
    }

  }
  SinavAra(a:any){
    if(a)
    this.servis.SinavAra(a).subscribe((d:any)=>{
      this.sinavlar = d
    }, () => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Arama Hatası Oluştu";
    });
    else{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Aranacak kelime girilmedi";
    }

  }

  KullaniciSil(a:any){
    this.servis.KullaniciSil(a).subscribe((d:any)=>{
      this.sonuc.islem = true
      this.sonuc.mesaj = "Silme başarılı"
      this.KullaniciListele();
    }, () => {
      this.sonuc.islem = false
      this.sonuc.mesaj = "Silme işleminde hata meydana geldi"
    })
  }

  SinavSil(a:any){
    this.servis.SinavSil(a).subscribe((d:any)=>{
      this.sonuc.islem = true
      this.sonuc.mesaj = "Silme başarılı"
      this.SinavListele();
    }, () => {
      this.sonuc.islem = false
      this.sonuc.mesaj = "Silme işleminde hata meydana geldi"
    })
  }
  KullaniciEkle(){
    this.servis.KullaniciEkle(this.secKullanici).subscribe((d:any)=>{
      this.sonuc.islem = true
      this.sonuc.mesaj = "Ekleme başarılı"
      this.KullaniciListele();
    },err =>{
      this.sonuc.islem = false
      this.sonuc.mesaj = "Hata"
    })
  }
  SinavEkle(){
    this.secSinav.Okunma = 0;
    this.secSinav.Tarih = new Date();
    this.servis.SinavEkle(this.secSinav).subscribe((d:any)=>{
      this.sonuc.islem = true
      this.sonuc.mesaj = "Ekleme başarılı"
      this.SinavListele();
    },err =>{
      this.sonuc.islem = false
      this.sonuc.mesaj = "Hata"
    })
  }

}
