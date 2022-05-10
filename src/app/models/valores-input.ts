export class ValoresInput {

    private nroBanco: string;
    private fechaRendicion: string;
    private boletas: number[];
    private fechaPagos: Date[];
    private importes: number[];
    private cuotas: number[];
    private objImponibles: number[];
    private obligaciones: number[];
    private codbarras1: number[];
    private codbarras2: number[];

    constructor(nroBanco: string, fechaRendicion: string, boletas: number[], fechaPagos: Date[], importes: number[],
                cuotas: number[], objImponibles: number[], obligaciones: number[], codbarras1: number[], codbarras2: number[]) {
        
                    this.nroBanco = nroBanco;
                    this.fechaRendicion = fechaRendicion;
                    this.boletas = boletas;
                    this.fechaPagos = fechaPagos;
                    this.importes = importes;
                    this.cuotas = cuotas;
                    this.objImponibles = objImponibles;
                    this.obligaciones = obligaciones;
                    this.codbarras1 = codbarras1;
                    this.codbarras2 = codbarras2;
    }

    getBanco(){
        return this.nroBanco;
    }

    getfechaRendicion(){
        return this.fechaRendicion;
    }

    getBoletas(){
        return this.boletas;
    }
    
    getfechasPago(){
        return this.fechaPagos;
    }

    getImportes(){
        return this.importes;
    }

    getCuotas(){
        return this.cuotas;
    }

    getObjImponibles(){
        return this.objImponibles;
    }

    getObligaciones(){
        return this.obligaciones;
    }

    getCodBarras1(){
        return this.codbarras1;
    }

    getCodBarras2(){
        return this.codbarras2;
    }
}
