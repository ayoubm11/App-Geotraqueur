import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

interface Position {
  coords: any;
  timestamp: string;
  photo: string | null;
  category: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class Tab1Page {
  currentPosition: any = null;
  positions: Position[] = [];
  watchId: string | null = null;
  isTracking = false;
  
  // Catégories disponibles
  categories = [
    { value: 'cours', label: 'Cours', icon: 'school', color: 'primary' },
    { value: 'bibliotheque', label: 'Bibliothèque', icon: 'book', color: 'success' },
    { value: 'stage', label: 'Stage', icon: 'briefcase', color: 'warning' },
    { value: 'autre', label: 'Autre', icon: 'location', color: 'medium' }
  ];
  
  selectedCategory = 'cours';

  // 1) Position unique avec catégorie
  async getCurrentPosition() {
    try {
      const permission = await Geolocation.requestPermissions();
      if (permission.location !== 'granted') {
        alert('Permission GPS refusée.');
        return;
      }

      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      });

      this.currentPosition = coordinates;
      this.positions.unshift({
        coords: coordinates.coords,
        timestamp: new Date().toLocaleString('fr-FR'),
        photo: null,
        category: this.selectedCategory
      });
    } catch (error: any) {
      alert('Erreur GPS : ' + (error?.message || 'Inconnue'));
    }
  }

  // 2) Suivi continu avec catégorie
  async toggleTracking() {
    try {
      if (this.isTracking) {
        if (this.watchId) {
          await Geolocation.clearWatch({ id: this.watchId });
        }
        this.isTracking = false;
        this.watchId = null;
        return;
      }

      const permission = await Geolocation.requestPermissions();
      if (permission.location !== 'granted') {
        alert('Permission GPS refusée.');
        return;
      }

      const watchPromise = Geolocation.watchPosition(
        { enableHighAccuracy: true, timeout: 10000 },
        (position, err) => {
          if (err) {
            console.error('Erreur watchPosition:', err);
            return;
          }
          if (position) {
            this.currentPosition = position;
            this.positions.unshift({
              coords: position.coords,
              timestamp: new Date().toLocaleString('fr-FR'),
              photo: null,
              category: this.selectedCategory
            });
          }
        }
      );

      this.watchId = await watchPromise;
      this.isTracking = true;
    } catch (error: any) {
      alert('Erreur suivi : ' + (error?.message || 'Inconnue'));
    }
  }

  // 3) Prendre une photo
  async takePhoto(index: number) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      this.positions[index].photo = image.webPath || null;
    } catch (error: any) {
      alert('Erreur photo : ' + (error?.message || 'Inconnue'));
    }
  }
  
  // Obtenir les infos d'une catégorie
  getCategoryInfo(categoryValue: string) {
    return this.categories.find(c => c.value === categoryValue) || this.categories[3];
  }
  
  // Statistiques par catégorie
  getStats() {
    const stats: any = {};
    this.categories.forEach(cat => {
      stats[cat.value] = this.positions.filter(p => p.category === cat.value).length;
    });
    return stats;
  }
}