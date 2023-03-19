import axios, { AxiosInstance } from 'axios';
import { Movie } from '../modules/movie/movie.interface';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

export interface ApiResponse {
  page: number;
  results: Movie[];
}

export class TmdbApiHelper {
  static axiosInstance: AxiosInstance;

  static getAxiosInstance() {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({
        baseURL: API_URL,
        params: { api_key: API_KEY },
      });
    }
    return this.axiosInstance;
  }

  static async searchMovies(query: string, page = 1) {
    const response = await this.getAxiosInstance().get<ApiResponse>(
      '/search/movie',
      {
        params: { query, page },
      },
    );
    return response.data;
  }

  static async getMovieById(id: number) {
    const response = await this.getAxiosInstance().get<ApiResponse>(
      `/movie/${id}`,
    );
    return response.data;
  }
}
