import { AutenticacaoService } from './autenticacao.service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  readonly STORAGE_KEY_FAVORITES: string = "servicos_favoritos_"
  public favorites: any = [];

  constructor(private storage: Storage, private autenticacaoService: AutenticacaoService) {
    this.updateLocalVariable()
  }

  private userStorageKey() {
    return this.STORAGE_KEY_FAVORITES + AutenticacaoService.usuario.cpf
  }

  private async getFavorites() {
    let favoritesString = await this.storage.get(this.userStorageKey())
    if (favoritesString !== null && favoritesString !== "") {
      let favorites = JSON.parse(favoritesString)
      this.favorites = favorites
      return favorites
    }
    this.favorites = []
    return []
  }

  private updateLocalVariable() {
    this.favorites = this.getFavorites()
  }

  public isFavoriteLocal(item) {
    for (var i = 0; i < this.favorites.length; i++) {
      if (this.favorites[i].id === item.id) {
        return true
      }
    }
    return false
  }

  private isFavorite(item) {
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
        this.storage.set(this.userStorageKey(), JSON.stringify(favorites))
        this.favorites = favorites
      })
    })
  }
}
