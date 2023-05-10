import { defineStore } from 'pinia';

export const useAlbumStore = defineStore('albums', {
  state: () => {
    return {
      albums: []
    }
  },
  actions: {
    getAlbums() {
      console.log('getAlbums');
    },
    setAlbums(payload) {
      this.albums = payload;
    },
    removeAlbum(payload) {
      this.albums = this.albums.filter(album => album.id !== payload.id);
    }
  }
})