import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, public navCTRL: NavController){

    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'validacionPassword': new FormControl("",Validators.required),
    })

  }

  ngOnInit() {
  }

  async registrar(){
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Error al registrar',
        message: 'Debes completar todos los campos!',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
      return;
    }

    var usuario = {
      nombre: f.nombre,
      password: f.password
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));

    localStorage.setItem('ingresado','true');
    this.navCTRL.navigateRoot(['/menu', { nombre: f.nombre }]);
  }

}
