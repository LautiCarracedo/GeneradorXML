import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValoresInput } from 'src/app/models/valores-input';

@Component({
  selector: 'app-otros-entes',
  templateUrl: './otros-entes.component.html',
  styleUrls: ['./otros-entes.component.css']
})
export class OtrosEntesComponent implements OnInit {
  
  formOtrosEntes: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formOtrosEntes = this.fb.group({
      origen:['',Validators.required],
      banco: ['', Validators.required],
      fechaRendicion: ['',Validators.required],
      comision: ['',Validators.required],
      boletas: ['',Validators.required],
      importes: ['',Validators.required],
      fechasPagos: ['',Validators.required],
      cuotas: ['',Validators.required],
      objImponibles: ['',Validators.required],
      obligaciones: ['',Validators.required],
      codBarras1: ['',Validators.required],
      codBarras2: ['',Validators.required],
    })
  }
  //a = document.getElementById('nroBanco');

  ngOnInit(): void {
    let a = (<HTMLInputElement>document.getElementById('nroBanco')).value;
  } 
  
  valoresInput: ValoresInput = new ValoresInput('00502','10/05/2022',[1,2,3],[],[],[],[],[],[],[]);

  //nroBanco: numb
  //fechaRendicion
  //boletas: numbe
  //fechaPagos: Da
  //importes: numb
  //cuotas: number
  //objImponibles:
  //obligaciones: 
  //codbarras1: nu
  //codbarras2: nu

  generarXML(){
    let banco = this.valoresInput.getBanco();
    //let a = (<HTMLInputElement>document.getElementById('nroBanco')).value;
    //let fechaRendicion = (<HTMLInputElement>document.getElementById('fechaRendicion')).value;
    console.log(banco);
    //console.log(fechaRendicion);
  }

}
