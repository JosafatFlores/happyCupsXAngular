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
import { modelService } from '../Services/model.service'
import { modelInterface } from '../Util/Interface/modelInterface';


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  modelData: any = []
  modelDataSource: any;

  columnsTable: string[] = [
    'ID',
    'Categoria',
    'Color',
    'Dimesiones',
    'Material',
    'Capacidad',
    'Acciones'
  ];

  constructor(public dialog: MatDialog,
    private modelServ: modelService
  ) {
    this.getData()
  }

  getData() {
    this.modelData = []
    this.modelServ.getAllModels().subscribe((res) => {
      var data: [modelInterface] = res.result

      data.forEach((element) => {
        const modelElement = {
          modelID: element.modelID,
          type: element.type,
          color: element.color,
          size: element.size,
          material: element.material,
          capacity: element.capacity
        }
        this.modelData.push(modelElement)
      })
      this.modelDataSource = new MatTableDataSource(this.modelData)

    })
  }

  ngOnInit(): void {
  }


  newModel() {
    const dialogRef = this.dialog.open(newModel, {
      width: '50%',

    })

    dialogRef.afterClosed().subscribe(result => {
      this.getData()
    });
  }

  deleteModel(model: modelInterface) {
    const dialogRef = this.dialog.open(confirmDeleteModel, {
      width: '50%',
      data: {
        model: model
      }
    })
    
    dialogRef.afterClosed().subscribe(result => {
      this.getData()
    });
  }
}


@Component({
  selector: 'newModel',
  templateUrl: 'newModel.dialog.html',
  styleUrls: ['./newModel.dialog.css']
})
export class newModel {
  typeSelect: any = []
  colorSelect: any = []
  sizeSelect: any = []
  materialSelect: any = []
  capacitySelect: any = []

  directory: any
  elementID: any
  description: any
  constructor(private typeServ: typeService,
    private colorServ: colorService,
    private sizeServ: sizeService,
    private materialServ: materialService,
    private capacityServ: capacityService,
    private modelServ: modelService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<newModel>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getType()
    this.getColor()
    this.getSize()
    this.getMaterial()
    this.getCapacity()

   }


  getType() {
    this.typeSelect = []
    this.typeServ.getAllTypes().subscribe((res) => {
      var data: [typeInterface] = res.result

      data.forEach((element) => {
        const typeElement = {
          typeID: element.typeID,
          description: element.description
        }
        this.typeSelect.push(typeElement)
      })
    })
  }

  getColor() {
    this.colorSelect = []
    this.colorServ.getAllColors().subscribe((res) => {
      var data: [colorInterface] = res.result

      data.forEach((element) => {
        const colorElement = {
          colorID: element.colorID,
          description: element.description
        }
        this.colorSelect.push(colorElement)
      })

    })
  }

  getSize() {
    this.sizeSelect = []
    this.sizeServ.getAllSizes().subscribe((res) => {
      var data: [sizeInterface] = res.result

      data.forEach((element) => {
        const sizeElement = {
          sizeID: element.sizeID,
          description: element.description
        }
        this.sizeSelect.push(sizeElement)
      })
    })
  }

  getMaterial() {
    this.materialSelect = []
    this.materialServ.getAllMaterials().subscribe((res) => {
      var data: [materialInterface] = res.result

      data.forEach((element) => {
        const materialElement = {
          materialID: element.materialID,
          description: element.description
        }
        this.materialSelect.push(materialElement)
      })
    })
  }

  getCapacity() {
    this.capacitySelect = []
    this.capacityServ.getAllCapacitys().subscribe((res) => {
      var data: [capacityInterface] = res.result
      data.forEach((element) => {
        const capacityElement = {
          capacityID: element.capacityID,
          description: element.description
        }
        this.capacitySelect.push(capacityElement)
      })
    })
  }

  newModel(type: String, color: String, size: String, material: String, capacity: String) {
    this.modelServ.createModel(type, color, size, material, capacity).subscribe((res) => {
      if (res.code == 1) {
        this.openSnackBar("Modelo registrado", "OK")
        this.dialogRef.close();
      } else {
        this.openSnackBar("Cominiquese con el administrador", "OK")
      }
    })
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
  selector: 'confirmDeleteModel',
  templateUrl: 'confirmDeleteModel.dialog.html',
  styleUrls: ['./confirmDeleteModel.dialog.css']
})
export class confirmDeleteModel {
  modelID: any
  
  constructor(
    private snackBar: MatSnackBar,
    private modelServ: modelService,
    public dialogRef: MatDialogRef<confirmDeleteModel>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modelID = data.model.modelID
  }

  confirm() {
    this.modelServ.destroyModel(this.modelID).subscribe((res)=>{
      if (res.code == 1) {
        this.openSnackBar("Modelo eliminado", "OK")
        this.dialogRef.close();
      } else{
        this.openSnackBar("Cominiquese con el administrador", "OK")
      }
    })
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