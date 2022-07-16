import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        MatTableModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
    ],
    exports: [
        MatTableModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
    ]
})
export class MaterialModule { }