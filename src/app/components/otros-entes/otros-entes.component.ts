import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtrosEntes } from 'src/app/models/otros-entes';
import { EntesVariosService } from 'src/app/services/entes-varios.service';

@Component({
  selector: 'app-otros-entes',
  templateUrl: './otros-entes.component.html',
  styleUrls: ['./otros-entes.component.css']
})
export class OtrosEntesComponent implements OnInit {
  
  formOtrosEntes: FormGroup;
  tipo: string = "";
  entes: OtrosEntes[] = [];

  constructor(private fb: FormBuilder,
              private _entesService: EntesVariosService) {
    this.formOtrosEntes = this.fb.group({
      origen:['',Validators.required],
      banco: ['', Validators.required],
      fechaRendicion: ['',Validators.required],
      comision: ['',Validators.required],
      boletas: ['',Validators.required],
      importes: ['',Validators.required],
      fechasPagos: ['',Validators.required],
      cantCuotas: ['',Validators.required],
      cuotaActuales: ['',Validators.required],
      codBarras1: ['',Validators.required],
      codBarras2: ['',Validators.required],
    })
  }
  //a = document.getElementById('nroBanco');

  ngOnInit(): void {
    this.obtenerEntesGuardados();
  }

  obtenerEntesGuardados(){
    this._entesService.getEntesCargados().subscribe((data: OtrosEntes[]) => {
      this.entes = data;
      console.log(data);
    }, error => {
      console.log(error);
      alert("Hubo un inconveniente: " + error.message);
    })
  }

  obtenerXMLGeneradoEntes(){
    //let formatoXML = this.obtenerFormatoXMLOK();
    let codBarrasPresOK = true //this.codBarrasOK(formatoXML);

    if (codBarrasPresOK){
      const XMLENTES: OtrosEntes = {
        origen: this.formOtrosEntes.get('origen')?.value,
        banco: this.formOtrosEntes.get('banco')?.value,
        fechaRendicion: this.formOtrosEntes.get('fechaRendicion')?.value,
        comision: this.formOtrosEntes.get('comision')?.value,
        boletas: this.formOtrosEntes.get('boletas')?.value,
        importes: this.formOtrosEntes.get('importes')?.value,
        fechasPagos: this.formOtrosEntes.get('fechasPagos')?.value,
        cantCuotas: this.formOtrosEntes.get('cantCuotas')?.value,
        cuotaActuales: this.formOtrosEntes.get('cuotaActuales')?.value,
        codBarras1: this.formOtrosEntes.get('codBarras1')?.value,
        codBarras2: this.formOtrosEntes.get('codBarras2')?.value,
      }
      console.log(XMLENTES);
      this._entesService.guardarXMLOtrosEntesGenerado(XMLENTES).subscribe(data => {
        console.log(data);
        const fileName = 'test'
        var blob = new Blob([data], { type: 'application/xml' });
        var url = window.URL.createObjectURL(blob);
        //window.open(url);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }, error => {
        console.log(error);
        alert("Hubo un inconveniente: " + error.message);
      })

    }

    else{
      alert("Codigos de barras incorrecto. Cod barra 1 debe empezar con 04 y todos deben tener un largo de 42 caracteres");
    }
  }
}
