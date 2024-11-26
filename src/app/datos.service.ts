import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Publicacion } from 'src/app/interfaces/publicacion.interface';

@Injectable({ providedIn: 'root' })
export class DatosService {
  private claveAlmacenamiento = 'publicaciones';

  async obtenerPublicaciones(): Promise<Publicacion[]> {
    const resultado = await Preferences.get({ key: this.claveAlmacenamiento });
    return resultado.value ? JSON.parse(resultado.value) : [];
  }

  async agregarPublicacion(publicacion: Publicacion): Promise<void> {
    const publicaciones = await this.obtenerPublicaciones();
    publicaciones.push(publicacion);
    await Preferences.set({ key: this.claveAlmacenamiento, value: JSON.stringify(publicaciones) });
  }

  async eliminarPublicacion(id: string): Promise<void> {
    let publicaciones = await this.obtenerPublicaciones();
    publicaciones = publicaciones.filter(pub => pub.id !== id);
    await Preferences.set({ key: this.claveAlmacenamiento, value: JSON.stringify(publicaciones) });
  }
}
