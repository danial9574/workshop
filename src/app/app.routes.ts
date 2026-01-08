import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ceasar } from './ceasar/ceasar';
import { App } from './app';
import { Kodierwuerfel } from './kodierwuerfel/kodierwuerfel';
import { FreezerManagement } from './FreezerManagement/freezer-management/freezer-management';
import { AktionHaus } from './aktion-haus/aktion-haus';

export const routes: Routes = [

 {
  path: '', 
  redirectTo: '/Cäsar', 
  pathMatch: 'full'
  },
  {
    path: 'Cäsar',
    component: Ceasar
  },
  {
    path: 'kodierwuerfel',
    component: Kodierwuerfel
  },
  {
    path: 'freezerManagement',
    component: FreezerManagement
  },
  {
    path: 'aktionhaus',
    component: AktionHaus
  }
];
