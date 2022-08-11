import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEntes } from 'src/app/models/add-entes';
import { EntesVariosService } from 'src/app/services/entes-varios.service';

@Component({
  selector: 'app-agregar-ente',
  templateUrl: './agregar-ente.component.html',
  styleUrls: ['./agregar-ente.component.css']
})
export class AgregarEnteComponent implements OnInit {

  addEnteForm: FormGroup;
  alert: boolean = false;
  /*Análisis para determinar cuales son los atributos de cada tag:
  Caso 1) Rta 1 == true y rta2 == true ==> Ente PagoFacil o similar (podriamos decir ente presencial?).
          En ese caso definimos en camposTagXXX los atributos que hagan falta.
  Caso 2) Rta 1 == false y rta2 == true ==> Ente similar a MasterCard Cred (00214)
          En ese caso definimos en camposTagXXX los atributos que hagan falta.
  Caso 3) Rta 1 == false y rta2 == false ==> Ente comun.
          En ese caso definimos en camposTagXXX los atributos que hagan falta.

  Para entender este analisis es necesario hacer un analisis detallado de los campos de cada XML. Sirve para enviar 
  al servidor los atributos necesarios. Luego en el back se haran validaciones necesarias.
  */

  //Caso1
  /*camposTagGeneralCaso1: camposTagGeneralCaso1 [] = [];
  camposTagSucursalCaso1: camposTagSucursalCaso1 [] = [];
  camposTagPagosCaso1: camposTagPagosCaso1 [] = [];
  camposTagDPCaso1: camposTagDPCaso1 [] = [];

  //Caso 2
  camposTagGeneralCaso2: camposTagGeneralCaso2 [] = [];
  camposTagSucursalCaso2: camposTagSucursalCaso2 [] = [];
  camposTagPagosCaso2: camposTagPagosCaso2 [] = [];
  camposTagDPCaso2: camposTagDPCaso2 [] = [];*/

  //Caso 3
  camposTagGeneral: camposTagGeneral[] = [];
  camposTagSucursal: camposTagSucursal[] = [];
  camposTagPagos: camposTagPagos[] = [];
  camposTagDP: camposTagDP[] = [];

  origen: string | null;
  nroEnte: string | null;
  rtaQuestionCodBarra: string | null;
  rtaQuestionAtributo: string | null;


  /*camposTagSucursal: {
    id: number,
    campo: string,
    seleccionado: boolean;
  }

  camposTagPagos: {
    id: number,
    campo: string,
    seleccionado: boolean;
  }

  camposTagDP: {
    id: number,
    campo: string,
    seleccionado: boolean;
  }*/


  constructor(private fb: FormBuilder,
    private router: Router,
    private _entesService: EntesVariosService,
    private aRouter: ActivatedRoute) {
    this.addEnteForm = this.fb.group({
      origen: ['', Validators.required],
      nroBanco: ['', Validators.required],
      nombreBanco: ['', Validators.required],
      comisionDeb: ['', Validators.required],
      comisionCred: ['', Validators.required],
      comisionPres: ['', Validators.required],
      lote: ['', Validators.required],
      nroComercio: ['', Validators.required],
      questionCodbarra: ['', Validators.required],
      questionAtribute: ['', Validators.required]
    })

    this.origen = this.aRouter.snapshot.paramMap.get('origen');
    this.nroEnte = this.aRouter.snapshot.paramMap.get('nroEnte');
    this.rtaQuestionCodBarra = this.aRouter.snapshot.paramMap.get('question-codbarra');
    this.rtaQuestionAtributo = this.aRouter.snapshot.paramMap.get('question-atr');

  }

  ngOnInit(): void {
    this.obtenerCamposTagGeneral();
    this.obtenerCamposTagSucursal();
    this.obtenerCamposTagPagos();
    this.obtenerCamposTagDP();
    //console.log(this.camposTagGeneral)
    this.esEditar();
  }

  esEditar() {
    if (this.origen != null && this.nroEnte != null) {
      this._entesService.getEnteSeleccionado(this.origen, this.nroEnte).subscribe(data => {
        this.addEnteForm.setValue({
          origen: data.origen,
          nroBanco: data.nroEnte,
          nombreBanco: data.nombreEnte,
          comisionDeb: data.comisionDebito,
          comisionCred: data.comisionCredito,
          comisionPres: data.comisionPresencial,
          lote: data.lote,
          nroComercio: data.nroComercio,
          questionCodBarra: data.questionCodBarra,
          questionAtribute: data.questionAtribute
        })
      })
    }
  }

  onchange() {
    //console.log(this.camposTagGeneral);


  }

  obtenerCamposTagGeneral() {
    if ((this.rtaQuestionCodBarra === "No" && this.rtaQuestionAtributo === "Si") || 
        (this.rtaQuestionCodBarra === "Si" && this.rtaQuestionAtributo === "Si")){
      this.camposTagGeneral = [
        { id: 1, campo: 'banco' },
        { id: 2, campo: 'nroTransaccion' },
        { id: 3, campo: 'nroRendicion' },
        { id: 4, campo: 'fechaRendicion' },
        { id: 5, campo: 'cbuOrigen' },
        { id: 6, campo: 'cuitOrigen' },
        { id: 7, campo: 'cbuDestino' },
        { id: 8, campo: 'cuitDestino' },
        { id: 9, campo: 'registros' },
        { id: 10, campo: 'totalImpDeterminado' },
        { id: 11, campo: 'totalImpPagado' },
        { id: 12, campo: 'totalImpRecaudado' },
        { id: 13, campo: 'totalImpDepositado' },
        { id: 14, campo: 'totalImpADepositar' },
        { id: 15, campo: 'totalImpAnulacionTimbradoras' },
        { id: 16, campo: 'totalImpComision' },
        { id: 17, campo: 'totalImpIVA' },
      ]
    }

    else if (this.rtaQuestionCodBarra === "No" && this.rtaQuestionAtributo === "No"){
      this.camposTagGeneral = [
        { id: 1, campo: 'banco' },
        { id: 2, campo: 'nroTransaccion' },
        { id: 3, campo: 'nroRendicion' },
        { id: 4, campo: 'fechaRendicion' },
        { id: 5, campo: 'cbuOrigen' },
        { id: 6, campo: 'cuitOrigen' },
        { id: 7, campo: 'cbuDestino' },
        { id: 8, campo: 'cuitDestino' },
        { id: 9, campo: 'registros' },
        { id: 10, campo: 'totalImpDeterminado' },
        { id: 11, campo: 'totalImpPagado' },
        { id: 12, campo: 'totalImpRecaudado' },
        { id: 13, campo: 'totalImpDepositado' },
        { id: 14, campo: 'totalImpADepositar' },
        { id: 15, campo: 'totalImpComision' },
        { id: 16, campo: 'totalImpIVA' },
      ]
    }
    return this.camposTagGeneral;

  }


  obtenerCamposTagSucursal() {
    if ((this.rtaQuestionCodBarra === "No" && this.rtaQuestionAtributo === "Si") || 
        (this.rtaQuestionCodBarra === "Si" && this.rtaQuestionAtributo === "Si")){
      this.camposTagSucursal = [
        { id: 1, campo: 'sucursal' },
        { id: 2, campo: 'registros' },
        { id: 3, campo: 'totalImpDeterminado' },
        { id: 4, campo: 'totalImpPagado' },
        { id: 5, campo: 'totalImpRecaudado' },
        { id: 6, campo: 'totalImpDepositado' },
        { id: 7, campo: 'totalImpADepositar' },
        { id: 8, campo: 'totalImpAnulacionTimbradoras' },
        { id: 9, campo: 'totalImpComision' },
        { id: 10, campo: 'totalImpIVA' },
      ]
    }

    else if (this.rtaQuestionCodBarra === "No" && this.rtaQuestionAtributo === "No"){
      this.camposTagSucursal = [
        { id: 1, campo: 'sucursal' },
        { id: 2, campo: 'registros' },
        { id: 3, campo: 'totalImpDeterminado' },
        { id: 4, campo: 'totalImpPagado' },
        { id: 5, campo: 'totalImpRecaudado' },
        { id: 6, campo: 'totalImpDepositado' },
        { id: 7, campo: 'totalImpADepositar' },
        { id: 8, campo: 'totalImpComision' },
        { id: 9, campo: 'totalImpIVA' },
      ]
    }

    return this.camposTagSucursal;

  }



  obtenerCamposTagPagos() {
    if (this.rtaQuestionCodBarra === "Si" && this.rtaQuestionAtributo === "Si"){
      this.camposTagPagos = [
        { id: 1, campo: 'codigoRegistro' },
        { id: 2, campo: 'caja' },
        { id: 3, campo: 'cajero' },
        { id: 4, campo: 'fechaAcreditacion' },
        { id: 5, campo: 'lote' },
        { id: 6, campo: 'registros' },
        { id: 7, campo: 'totalImpDeterminado' },
        { id: 8, campo: 'totalImpPagado' },
        { id: 9, campo: 'totalImpComision' },
        { id: 10, campo: 'totalImpIVA' }
      ]
    }
    else if (this.rtaQuestionCodBarra === "No" && this.rtaQuestionAtributo === "Si"){
      this.camposTagPagos = [
        { id: 1, campo: 'codigoRegistro' },
        { id: 2, campo: 'caja' },
        { id: 3, campo: 'cajero' },
        { id: 4, campo: 'lote' },
        { id: 5, campo: 'registros' },
        { id: 6, campo: 'totalImpDeterminado' },
        { id: 7, campo: 'totalImpPagado' },
        { id: 8, campo: 'totalImpComision' },
        { id: 9, campo: 'totalImpIVA' }
      ]
    }

    else if (this.rtaQuestionCodBarra === "No" && this.rtaQuestionAtributo === "No"){
      this.camposTagPagos = [
        { id: 1, campo: 'codigoRegistro' },
        { id: 2, campo: 'caja' },
        { id: 3, campo: 'cajero' },
        { id: 4, campo: 'lote' },
        { id: 5, campo: 'registros' },
        { id: 6, campo: 'totalImpDeterminado' },
        { id: 7, campo: 'totalImpPagado' },
        { id: 8, campo: 'totalImpComision' },
        { id: 9, campo: 'totalImpIVA' }
      ]
    }

    return this.camposTagPagos;
  }



  obtenerCamposTagDP() {
    if (this.rtaQuestionCodBarra === "Si" && this.rtaQuestionAtributo === "Si"){
      this.camposTagDP = [
        { id: 1, campo: 'codigoRegistro' },
        { id: 2, campo: 'nroRegistro' },
        { id: 3, campo: 'impuesto' },
        { id: 4, campo: 'fechaVencimiento' },
        { id: 5, campo: 'idObjetoImponible' },
        { id: 6, campo: 'nroControl' },
        { id: 7, campo: 'marcaMovimiento' },
        { id: 8, campo: 'tipoOperacion' },
        { id: 9, campo: 'tipoRendicion' },
        { id: 10, campo: 'moneda' },
        { id: 11, campo: 'nroLiquidacionOriginal' },
        { id: 12, campo: 'nroLiquidacionActualizado' },
        { id: 13, campo: 'obligacion' },
        { id: 14, campo: 'barra1' },
        { id: 15, campo: 'barra2' },
        { id: 16, campo: 'fechaPago' },
        { id: 17, campo: 'impDeterminado' },
        { id: 18, campo: 'impPagado' },
        { id: 19, campo: 'impComision' },
        { id: 20, campo: 'impIVA' }
      ]
    }
    else if (this.rtaQuestionCodBarra === "No" && this.rtaQuestionAtributo === "Si"){
      this.camposTagDP = [
        { id: 1, campo: 'codigoRegistro' },
        { id: 2, campo: 'nroRegistro' },
        { id: 3, campo: 'nroControl' },
        { id: 4, campo: 'marcaMovimiento' },
        { id: 5, campo: 'tipoOperacion' },
        { id: 6, campo: 'tipoRendicion' },
        { id: 7, campo: 'moneda' },
        { id: 8, campo: 'nroLiquidacionOriginal' },
        { id: 9, campo: 'nroLiquidacionActualizado' },
        { id: 10, campo: 'fechaPago' },
        { id: 12, campo: 'impDeterminado' },
        { id: 13, campo: 'impPagado' },
        { id: 14, campo: 'impComision' },
        { id: 15, campo: 'impIVA' },
        { id: 16, campo: 'nroComercio' },
        { id: 17, campo: 'cantCuotas' }
      ]
    }

    else if (this.rtaQuestionCodBarra === "No" && this.rtaQuestionAtributo === "No"){
      this.camposTagDP = [
        { id: 1, campo: 'codigoRegistro' },
        { id: 2, campo: 'nroRegistro' },
        { id: 3, campo: 'nroControl' },
        { id: 4, campo: 'marcaMovimiento' },
        { id: 5, campo: 'tipoOperacion' },
        { id: 6, campo: 'tipoRendicion' },
        { id: 7, campo: 'moneda' },
        { id: 8, campo: 'nroLiquidacionOriginal' },
        { id: 9, campo: 'nroLiquidacionActualizado' },
        { id: 10, campo: 'fechaPago' },
        { id: 12, campo: 'impDeterminado' },
        { id: 13, campo: 'impPagado' },
        { id: 14, campo: 'impComision' },
        { id: 15, campo: 'impIVA' },
        { id: 16, campo: 'nroComercio' },
        { id: 17, campo: 'cantCuotas' },
        { id: 18, campo: 'idObjetoImponible' },
        { id: 19, campo: 'obligacion' }
      ]
    }

    return this.camposTagDP;

  }


  agregarEnte() {
    let codBarrasPresOK = true //this.codBarrasOK(formatoXML);

    if (codBarrasPresOK) {
      const ENTEAAGREGAR: AddEntes = {
        origen: this.addEnteForm.get('origen')?.value,
        nroEnte: this.addEnteForm.get('nroBanco')?.value,
        nombreEnte: this.addEnteForm.get('nombreBanco')?.value,
        comisionDebito: this.addEnteForm.get('comisionDeb')?.value,
        comisionCredito: this.addEnteForm.get('comisionCred')?.value,
        comisionPresencial: this.addEnteForm.get('comisionPres')?.value,
        lote: this.addEnteForm.get('lote')?.value,
        nroComercio: this.addEnteForm.get('nroComercio')?.value,
        tagGeneral: this.obtenerCamposTagGeneral(),
        tagSucursal: this.obtenerCamposTagSucursal(),
        tagPagos: this.obtenerCamposTagPagos(),
        tagDetallePago: this.obtenerCamposTagDP(),

      }
      //console.log(ENTEAAGREGAR);
      this._entesService.guardarEnte(ENTEAAGREGAR).subscribe(data => {
        //console.log(data);

        this.alert = true;
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      })
    }
  }

  closeAlert(){
    this.alert = false;
  }
}

class camposTagGeneral {
  id: number;
  campo: string;
}

class camposTagSucursal {
  id: number;
  campo: string;
}

class camposTagPagos {
  id: number;
  campo: string;
}

class camposTagDP {
  id: number;
  campo: string;
}
