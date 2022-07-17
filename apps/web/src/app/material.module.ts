import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        MatTableModule,
        MatInputModule,
        MatButtonModule,
    ],
    exports: [
        MatTableModule,
        MatInputModule,
        MatButtonModule,
    ]
})
export class MaterialModule { }