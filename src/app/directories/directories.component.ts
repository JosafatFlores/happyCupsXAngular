import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { typeService } from '../Services/type.service'
import { typeInterface } from '../Util/Interface/typeIntercace';
import { colorService } from '../Services/color.service'
import { colorInterface } from '../Util/Interface/colorInterface';
import { sizeService } from '../Services/size.service'
import { sizeInterface } from '../Util/Interface/sizeInterface';
import { materialService } from '../Services/material.service'
import { materialInterface } from '../Util/Interface/materialInterface';
import { capacityService } from '../Services/capacity.service'
import { capacityInterface } from '../Util/Interface/capacityInterface';


@Component({
  selector: 'app-directories',
  templateUrl: './directories.component.html',
  styleUrls: ['./directories.component.css']
})
export class DirectoriesComponent implements OnInit {
  typeData: any = []
  typeDataSource: any;

  colorData: any = []
  colorDataSource: any;

  sizeData: any = []
  sizeDataSource: any;

  materialData: any = []
  materialDataSource: any;

  capacityData: any = []
  capacityDataSource: any;

 

  columnsTable: string[] = [
    'ID',
    'Descripcion',
    'Acciones'
  ];

 
  constructor(private typeServ: typeService,
    private colorServ: colorService,
    private sizeServ: sizeService,
    private materialServ: materialService,
    private capacityServ: capacityService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.getType()
    this.getColor()
    this.getSize()
    this.getMaterial()
    this.getCapacity()
  }

  ngOnInit(): void {

  }

  getType(){
    this.typeData = []
    this.typeServ.getAllTypes().subscribe((res) => {
      var data: [typeInterface] = res.result
      
      data.forEach((element) => {
        const typeElement = {
          typeID: element.typeID,
          description: element.description
        }
        this.typeData.push(typeElement)
      })
      this.typeDataSource = new MatTableDataSource(this.typeData)

    })
  }

  getColor(){
    this.colorData = []
    this.colorServ.getAllColors().subscribe((res) => {
      var data: [colorInterface] = res.result
      
      data.forEach((element) => {
        const colorElement = {
          colorID: element.colorID,
          description: element.description
        }
        this.colorData.push(colorElement)
      })
      this.colorDataSource = new MatTableDataSource(this.colorData)

    })
  }

  getSize(){
    this.sizeData = []
    this.sizeServ.getAllSizes().subscribe((res) => {
      var data: [sizeInterface] = res.result
      
      data.forEach((element) => {
        const sizeElement = {
          sizeID: element.sizeID,
          description: element.description
        }
        this.sizeData.push(sizeElement)
      })
      this.sizeDataSource = new MatTableDataSource(this.sizeData)

    })
  }

  getMaterial(){
    this.materialData = []
    this.materialServ.getAllMaterials().subscribe((res) => {
      var data: [materialInterface] = res.result
      
      data.forEach((element) => {
        const materialElement = {
          materialID: element.materialID,
          description: element.description
        }
        this.materialData.push(materialElement)
      })
      this.materialDataSource = new MatTableDataSource(this.materialData)

    })
  }

  getCapacity(){
    this.capacityData = []
    this.capacityServ.getAllCapacitys().subscribe((res) => {
      var data: [capacityInterface] = res.result
      data.forEach((element) => {
        const capacityElement = {
          capacityID: element.capacityID,
          description: element.description
        }
        this.capacityData.push(capacityElement)
      })
      this.capacityDataSource = new MatTableDataSource(this.capacityData)

    })
  }

  

  newElement(directory: string) {
    if(directory != "" || directory != undefined){
      const dialogRef = this.dialog.open(newElement, {
        width: '50%',
        data: {
          directory: directory
        }
      })
  
      dialogRef.afterClosed().subscribe(result => {
        if(directory == "type"){
          this.getType()
        }else if(directory == "color"){
          this.getColor()
        }else if(directory == "size"){
          this.getSize()
        }else if(directory == "material"){
          this.getMaterial()
        }else if(directory == "capacity"){
          this.getCapacity()
        }
        
      });
    }else{
      this.openSnackBar("Datos necesarios", "OK")
    }
    
  }

  deleteElement(directory: string, data: any){
    const dialogRef = this.dialog.open(confirmDeleteElement, {
      width: '50%',
      data: {
        directory: directory,
        data: data
      }
    })

   

    dialogRef.afterClosed().subscribe(result => {
      if(directory == "type"){
        this.getType()
      }else if(directory == "color"){
        this.getColor()
      }else if(directory == "size"){
        this.getSize()
      }else if(directory == "material"){
        this.getMaterial()
      }else if(directory == "capacity"){
        this.getCapacity()
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
}



@Component({
  selector: 'newElement',
  templateUrl: 'newElement.dialog.html',
  styleUrls: ['./newElement.dialog.css']
})
export class newElement {
  directory: any
  constructor(
    private snackBar: MatSnackBar,
    private typeServ: typeService,
    private colorServ: colorService,
    private sizeServ: sizeService,
    private materialServ: materialService,
    private capacityServ: capacityService,
    public dialogRef: MatDialogRef<newElement>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.directory = data.directory
  }

  addElement(description: string){
    if(this.directory == "type"){
      this.typeServ.createType(description).subscribe((res)=>{
        if (res.code == 1) {
          this.openSnackBar("Categoria registrado", "OK")
          this.dialogRef.close();
        } else{
          this.openSnackBar("Cominiquese con el administrador", "OK")
        }
      })
    }else if(this.directory == "color"){
      this.colorServ.createColor(description).subscribe((res)=>{
        if (res.code == 1) {
          this.openSnackBar("Color registrado", "OK")
          this.dialogRef.close();
        } else{
          this.openSnackBar("Cominiquese con el administrador", "OK")
        }
      })
    }else if(this.directory == "size"){
      this.sizeServ.createSize(description).subscribe((res)=>{
        if (res.code == 1) {
          this.openSnackBar("Dimesione registrado", "OK")
          this.dialogRef.close();
        } else{
          this.openSnackBar("Cominiquese con el administrador", "OK")
        }
      })
    }else if(this.directory == "material"){
      this.materialServ.createMaterial(description).subscribe((res)=>{
        if (res.code == 1) {
          this.openSnackBar("Material registrado", "OK")
          this.dialogRef.close();
        } else{
          this.openSnackBar("Cominiquese con el administrador", "OK")
        }
      })
    }else if(this.directory == "capacity"){
      this.capacityServ.createCapacity(description).subscribe((res)=>{
        if (res.code == 1) {
          this.openSnackBar("Capacidad registrado", "OK")
          this.dialogRef.close();
        } else{
          this.openSnackBar("Cominiquese con el administrador", "OK")
        }
      })
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}


@Component({
  selector: 'confirmDeleteElement',
  templateUrl: 'confirmDeleteElement.dialog.html',
  styleUrls: ['./confirmDeleteElement.dialog.css']
})
export class confirmDeleteElement {
  directory: any
  elementID: any
  description: any
  constructor(
    private snackBar: MatSnackBar,
    private typeServ: typeService,
    private colorServ: colorService,
    private sizeServ: sizeService,
    private materialServ: materialService,
    private capacityServ: capacityService,
    public dialogRef: MatDialogRef<confirmDeleteElement>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.directory = data.directory
    
    this.description = data.data.description
    if(this.directory == "type"){
      this.elementID = data.data.typeID
    }else if(this.directory == "color"){
      this.elementID = data.data.colorID
    }else if(this.directory == "size"){
      this.elementID = data.data.sizeID
    }else if(this.directory == "material"){
      this.elementID = data.data.materialID
    }else if(this.directory == "capacity"){
      this.elementID = data.data.capacityID
    }
  }

  confirm(): void{
    if(this.directory == "type"){
      this.typeServ.destroyType(this.elementID).subscribe((res)=>{
        if (res.code == 1) {
          this.openSnackBar("Categoria eliminado", "OK")
          this.dialogRef.close();
        } else{
          this.openSnackBar("Cominiquese con el administrador", "OK")
        }
      })
    }else if(this.directory == "color"){
      this.colorServ.destroyColor(this.elementID).subscribe((res)=>{
        if (res.code == 1) {
          this.openSnackBar("Color eliminado", "OK")
          this.dialogRef.close();
        } else{
          this.openSnackBar("Cominiquese con el administrador", "OK")
        }
      })
    }else if(this.directory == "size"){
      this.sizeServ.destroySize(this.elementID).subscribe((res)=>{
        if (res.code == 1) {
          this.openSnackBar("Dimesione eliminado", "OK")
          this.dialogRef.close();
        } else{
          this.openSnackBar("Cominiquese con el administrador", "OK")
        }
      })
    }else if(this.directory == "material"){
      this.materialServ.destroyMaterial(this.elementID).subscribe((res)=>{
        if (res.code == 1) {
          this.openSnackBar("Material eliminado", "OK")
          this.dialogRef.close();
        } else{
          this.openSnackBar("Cominiquese con el administrador", "OK")
        }
      })
    }else if(this.directory == "capacity"){
      this.capacityServ.destroyCapacity(this.elementID).subscribe((res)=>{
        if (res.code == 1) {
          this.openSnackBar("Capacidad eliminado", "OK")
          this.dialogRef.close();
        } else{
          this.openSnackBar("Cominiquese con el administrador", "OK")
        }
      })
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}