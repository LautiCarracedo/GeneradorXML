import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BpcInput } from 'src/app/models/bpc-input';
import { BPCServiceService } from 'src/app/services/bpcservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-bpc',
  templateUrl: './bpc.component.html',
  styleUrls: ['./bpc.component.css']
})
export class BpcComponent implements OnInit {
  mostrarInputsPresencial : boolean;
  mostrarInputsElectronico : boolean;
  mostrarInputsAmbos : boolean;
  tipo: string = "";
  formatoXMLOK: string;
  bpcForm: FormGroup;
  fileXML: any;

  contadorCodBarra1Presencial: number = 0;
  contadorCodBarra2Presencial: number = 0;
  contadorCodBarra1Electronico: number = 0;
  contadorCodBarra2Electronico: number = 0;


  constructor(private fb: FormBuilder, 
              private _bpcService: BPCServiceService,
              private sanitizer: DomSanitizer,
              private download: DownloadService) { 
                this.bpcForm = this.fb.group({
                  formatoXML: ['', Validators.required],
                  origen: ['', Validators.required],
                  fechaRendicion: ['', Validators.required, Validators.minLength(10), Validators.maxLength(10)],
                  codBarras1Presencial: [''],
                  codBarras2Presencial: [''],
                  codBarras1Electronico: [''],
                  codBarras2Electronico: ['']
                })
               }

  
  ngOnInit(): void {
  }

  get fechaRendicionNoValida(){
    return this.bpcForm.get('fechaRendicion')?.invalid && this.bpcForm.get('fechaRendicion')?.touched;
  }

  splitCodBarra1Presencial(){
    let flagOKCodBarra1Pres = false;
    let codBarras1Presencial = this.bpcForm.get('codBarras1Presencial')?.value;
    let arrayCodBarras1Pres = codBarras1Presencial.split('\n');
    for (let i = 0; i < arrayCodBarras1Pres.length; i++){
      if ((arrayCodBarras1Pres[i].length == 42) && (arrayCodBarras1Pres[i].substr(0,2) == "04")){
        flagOKCodBarra1Pres = true;
      }
    }
    return [flagOKCodBarra1Pres, arrayCodBarras1Pres];
  }

  splitCodBarra2Presencial(){
    let flagOKCodBarra2Pres = false;
    let codBarras2Presencial = this.bpcForm.get('codBarras2Presencial')?.value;
    let arrayCodBarras2Pres = codBarras2Presencial.split('\n');
    for (let i = 0; i < arrayCodBarras2Pres.length; i++){
      if (arrayCodBarras2Pres[i].length == 42){
        console.log(arrayCodBarras2Pres[i]);
        
        flagOKCodBarra2Pres = true;
      }
    }

    return [flagOKCodBarra2Pres, arrayCodBarras2Pres];
  }

  splitCodBarra1Electronico(){
    let flagOKCodBarra1Elec = false;
    let codBarras1Electronico = this.bpcForm.get('codBarras1Electronico')?.value;
    let arrayCodBarras1Elec = codBarras1Electronico.split('\n');
    for (let i = 0; i < arrayCodBarras1Elec.length; i++){
      if ((arrayCodBarras1Elec[i].length == 42)){
        flagOKCodBarra1Elec = true;
      }
    }
    return [flagOKCodBarra1Elec, arrayCodBarras1Elec];
  }

  splitCodBarra2Electronico(){
    let flagOKCodBarra2Elec = false;
    let codBarras2Electronico = this.bpcForm.get('codBarras2Electronico')?.value;
    let arrayCodBarras2Elec = codBarras2Electronico.split('\n');
    for (let i = 0; i < arrayCodBarras2Elec.length; i++){
      if (arrayCodBarras2Elec[i].length == 42){
        console.log(arrayCodBarras2Elec[i]);
        
        flagOKCodBarra2Elec = true;
      }
    }

    return [flagOKCodBarra2Elec, arrayCodBarras2Elec];
  }

  codBarrasOK(formatoXML: string){
    let [flagCodBarra1Pres, codBarra1Presenciales] = this.splitCodBarra1Presencial();
    let [flagCodBarra2Pres, codBarra2Presenciales] = this.splitCodBarra2Presencial();
    let [flagCodBarra1Elec, codBarra1Electronicos] = this.splitCodBarra1Electronico();
    let [flagCodBarra2Elec, codBarra2Electronicos] = this.splitCodBarra2Electronico();

    let flagCodBarrasOK = false;

    if (formatoXML === "Pago presencial"){
      if (flagCodBarra1Pres && flagCodBarra2Pres){        
        flagCodBarrasOK = true;
      }
    }
    else if (formatoXML === "Pago electronico"){
      if (flagCodBarra1Elec && flagCodBarra2Elec){    
        flagCodBarrasOK = true;
      }
    }
    else{
      if (flagCodBarra1Pres && flagCodBarra2Pres && flagCodBarra1Elec && flagCodBarra2Elec){    
        flagCodBarrasOK = true;
      }
    }

    return flagCodBarrasOK;
  }

  obtenerFormatoXMLOK(){
    this.formatoXMLOK = this.bpcForm.get('formatoXML')?.value;
    if (this.formatoXMLOK === "0"){
      this.formatoXMLOK = "Pago presencial";
    }
    else if (this.formatoXMLOK === "1"){
      this.formatoXMLOK = "Pago electronico";
    }
    else{
      this.formatoXMLOK = "Ambos pagos";
    }

    return this.formatoXMLOK;
  }

  verificarCantRegistrosCargados(){
    this.contadorCodBarra1Presencial = 0;
    this.contadorCodBarra2Presencial = 0;
    this.contadorCodBarra1Electronico = 0;
    this.contadorCodBarra2Electronico = 0;

    let [flagCodBarra1Pres, codBarra1Presenciales] = this.splitCodBarra1Presencial();
    let [flagCodBarra2Pres, codBarra2Presenciales] = this.splitCodBarra2Presencial();
    let [flagCodBarra1Elec, codBarra1Electronicos] = this.splitCodBarra1Electronico();
    let [flagCodBarra2Elec, codBarra2Electronicos] = this.splitCodBarra2Electronico();

    let formatoXML = this.obtenerFormatoXMLOK();

    if (formatoXML === "Pagos presenciales"){
      for (let i = 0; i < codBarra1Presenciales.length; i++){
        this.contadorCodBarra1Presencial += 1;
      }
      for (let i = 0; i < codBarra2Presenciales.length; i++){
        this.contadorCodBarra2Presencial += 1;
      }
    }
    else if(formatoXML === "Pagos electronicos"){
      for (let i = 0; i < codBarra1Electronicos.length; i++){
        this.contadorCodBarra1Electronico += 1;
      }
      for (let i = 0; i < codBarra2Electronicos.length; i++){
        this.contadorCodBarra2Electronico += 1;
      }
    }
    else{
      for (let i = 0; i < codBarra1Presenciales.length; i++){
        this.contadorCodBarra1Presencial += 1;
      }
      for (let i = 0; i < codBarra2Presenciales.length; i++){
        this.contadorCodBarra2Presencial += 1;
      }
      for (let i = 0; i < codBarra1Electronicos.length; i++){
        this.contadorCodBarra1Electronico += 1;
      }
      for (let i = 0; i < codBarra2Electronicos.length; i++){
        this.contadorCodBarra2Electronico += 1;
      }
    }

    console.log(codBarra1Presenciales);
    console.log(this.contadorCodBarra1Presencial);
    

    return [this.contadorCodBarra1Presencial, this.contadorCodBarra2Presencial, this.contadorCodBarra1Electronico, this.contadorCodBarra2Electronico]


  }


  obtenerXMLGeneradoBPC(){
    let formatoXML = this.obtenerFormatoXMLOK();
    let codBarrasPresOK = this.codBarrasOK(formatoXML);

    if (codBarrasPresOK){
      const XMLBPC: BpcInput = {
        origen: this.bpcForm.get('origen')?.value,
        formatoXML: this.obtenerFormatoXMLOK(),
        fechaRendicion: this.bpcForm.get('fechaRendicion')?.value,
        codBarras1Presencial: this.bpcForm.get('codBarras1Presencial')?.value,
        codBarras2Presencial: this.bpcForm.get('codBarras2Presencial')?.value,
        codBarras1Electronico: this.bpcForm.get('codBarras1Electronico')?.value,
        codBarras2Electronico: this.bpcForm.get('codBarras2Electronico')?.value,
      }
      //console.log(XMLBPC);

      
      
      let codBarrasPresOK = this.codBarrasOK(formatoXML);
        this._bpcService.guardarXMLGenerado(XMLBPC).subscribe(data => {
          //console.log(data);
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
