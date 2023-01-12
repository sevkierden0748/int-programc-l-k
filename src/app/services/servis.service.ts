import { Sınav } from '../models/Sınav';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kullanici } from '../models/UyeModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public apiUrl = "http://localhost:3000/";
  constructor(
    public http: HttpClient
  ) { }



  KullaniciLogin(k: string, p: string) {
    return this.http.get(this.apiUrl + "kullanici?KullaniciAdi=" + k + "&Parola=" + p);
  }
  KullaniciListele() {
    return this.http.get(this.apiUrl + "kullanici");
  }
  KullaniciEkle(d: Kullanici) {
    return this.http.post(this.apiUrl + "kullanici", d);
  }
  KullaniciAra(d: any) {
    return this.http.get(this.apiUrl + "kullanici?q=" + d );
  }
  KullaniciDuzenle(g: Kullanici) {
    return this.http.put(this.apiUrl + "kullanici/" + g.id, g);
  }
  KullaniciSil(id: number) {
    return this.http.delete(this.apiUrl + "kullanici/" + id);
  }

  SinavListele() {
    return this.http.get(this.apiUrl + "sinav");
  }

  SinavAra(aranacak: any) {
    return this.http.get(this.apiUrl + "sinav?q=" + aranacak );
  }
  SinavEkle(d: Sınav) {
    return this.http.post(this.apiUrl + "sinav", d);
  }
  SinavDuzenle(g: Sınav) {
    return this.http.put(this.apiUrl + "sinav/" + g.id, g);
  }
  SinavSil(id: number) {
    return this.http.delete(this.apiUrl + "sinav/" + id);
  }
  SinavById(id:any){
    return this.http.get(this.apiUrl + "sinav/" + id);
  }
  SinavByIslem(a:any) {
    return this.http.get(this.apiUrl + "sinav?Ders=" + a);
  }






  
  ParolaUret(s: number) {
    var st = "qwertyuiopasdfghjklzxcvbnm0123456789";
    var p = "";
    for (let i = 0; i < s; i++) {
      var r = Math.floor(Math.random() * st.length);
      p += st.charAt(r);
    }

    return p;
  }
  OturumKontrol() {
    var token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  YetkiKontrol(yetkiler: any[]) {
    var sonuc: boolean = false;

    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri") || (""));

    if (uyeYetkiler) {
      yetkiler.forEach((element: string) => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
      });
    }

    return sonuc;
  }

}
