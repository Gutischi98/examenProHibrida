import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonNote, IonThumbnail } from "@ionic/angular/standalone";

@Component({
  selector: 'app-crear-publicacion',
  standalone: true,
  imports: [IonNote, CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonThumbnail ],
  templateUrl: './crear-publicacion.page.html',
  styleUrls: ['./crear-publicacion.page.scss'],
})
export class CrearPublicacionPage {
  formulario: FormGroup;
  foto: string | null = null;
  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      foto: [null],
    });
  }
  async tomarFoto() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });
      this.foto = `data:image/jpeg;base64,${photo.base64String}`;
      this.formulario.patchValue({ foto: this.foto });
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
  guardar() {
    if (this.formulario.valid) {
      console.log('Datos del formulario:', this.formulario.value);
    } else {
      console.error('Formulario inválido:', this.formulario.errors);
    }
  }
}
