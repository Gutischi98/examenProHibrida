import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonItem, IonLabel, IonList, IonFab, IonFabButton, IonModal } from "@ionic/angular/standalone";
import { FormatoFechaPipe } from '../pipes/formato-fecha.pipe';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [ IonModal, IonFabButton, IonFab, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonItem, IonLabel, FormatoFechaPipe, IonList, CommonModule ]
})
export class HomePage {
  publicaciones: any[] = [];
  publicacionAEliminar: any | null = null;
  mostrarModal = false;
  constructor(private modalController: ModalController) {}
  
  async ionViewWillEnter() {
    const { value } = await Preferences.get({ key: 'publicaciones' });
    this.publicaciones = value ? JSON.parse(value) : [];
  }
  confirmarEliminacion(publicacion: any) {
    this.publicacionAEliminar = publicacion;
    this.mostrarModal = true;
  }
  async eliminarPublicacion() {
    if (this.publicacionAEliminar) {
      this.publicaciones = this.publicaciones.filter(
        (p) => p !== this.publicacionAEliminar
      );
      await Preferences.set({
        key: 'publicaciones',
        value: JSON.stringify(this.publicaciones),
      });
      this.publicacionAEliminar = null;
      this.mostrarModal = false;
    }
  }
  cerrarModal() {
    this.mostrarModal = false;
    this.publicacionAEliminar = null;
  }
}
