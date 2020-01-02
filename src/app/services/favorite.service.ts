import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  readonly STORAGE_KEY_FAVORITES: string = "servicos_favoritos"

  constructor(private storage: Storage) {
  }

  public async getFavorites() {
    let favoritesString = await this.storage.get(this.STORAGE_KEY_FAVORITES)
    if (favoritesString !== null && favoritesString !== "") {
      let favorites = JSON.parse(favoritesString)
      return favorites
    }
    return []
  }

  public isFavorite(item) {
    return this.getFavorites().then((favorites) => {
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id === item.id) {
          return true
        }
      }
      return false
    })
  }

  public addRemoveFavorite(item) {
    this.getFavorites().then(favorites => {
      this.isFavorite(item).then((success) => {
        if (success) {
          favorites = favorites.filter(x => x.id !== item.id)
        } else {
          favorites.push(item)
        }
        this.storage.set(this.STORAGE_KEY_FAVORITES, JSON.stringify(favorites))
      })
    })
  }
}
