import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => {
    return {
      apiUrl: 'https://api.discogs.com/',
      key: process.env.DISCOG_KEY,
      secret: process.env.DISCOG_SECRET,
      artist: {
        results: null,
        selected: null,
        locked: false,
      },
      albums: {
        results: null,
        selected: null,
        information: null,
        locked: false,
      },
    };
  },
  actions: {
    async searchArtist(query) {
      const url = `${this.apiUrl}database/search?q=${query}`;

      const { results } = await fetch(url, {
        headers: {
          authorization: `Discogs key=${this.key}, secret=${this.secret}`,
        },
      }).then((res) => res.json());

      this.artist.results = results.filter((result) => result.type == 'artist');
    },
    selectArtist(payload) {
      this.artist.selected = payload;
      this.searchAlbums();
    },
    async searchAlbums() {
      const url = `${this.apiUrl}artists/${this.artist.selected.id}/releases?sort=year&sort_order=desc`;

      const { releases } = await fetch(url, {
        headers: {
          authorization: `Discogs key=${this.key}, secret=${this.secret}`,
        },
      }).then((res) => res.json());

      this.albums.results = releases;
    },
    selectAlbum(payload) {
      this.albums.selected = payload;
      this.getAlbumInformation();
    },
    async getAlbumInformation() {
      const url = `${this.apiUrl}releases/${this.albums.selected.main_release}`;

      const information = await fetch(url, {
        headers: {
          authorization: `Discogs key=${this.key}, secret=${this.secret}`,
        },
      }).then((res) => res.json());

      this.albums.information = information;
    },
    resetAllSearch() {
      this.artist = {
        results: null,
        selected: null,
        locked: false,
      };

      this.albums = {
        results: null,
        selected: null,
        locked: false,
      };
    },
  },
});
