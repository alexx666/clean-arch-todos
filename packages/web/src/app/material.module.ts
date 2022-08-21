import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
    imports: [
        MatSnackBarModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
    ],
    exports: [
        MatSnackBarModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
    ]
})
export class MaterialModule { }