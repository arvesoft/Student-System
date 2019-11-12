import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material'
import { MatProgressSpinnerModule,
  MatSortModule} from "@angular/material";
@NgModule({
  imports: [ MatProgressSpinnerModule, MatSortModule,MatButtonModule, MatCheckboxModule, MatTableModule,MatFormFieldModule,MatPaginatorModule,MatInputModule ],
  exports: [ MatProgressSpinnerModule, MatSortModule,MatButtonModule, MatCheckboxModule, MatTableModule,MatFormFieldModule,MatPaginatorModule,MatInputModule ]
})

export class MaterialModule {

}
