// i-api-response.ts
import { IDetailIdea } from './i-detail-idea';
import { IIdea } from './i-idea';
import { IUnitKerja } from './i-unit-kerja';
import { IUser } from './i-user';

// Definisi interface IApiResponse generik
export interface IApiResponse<T> {
  page_number: number;
  size_per_page: number;
  total_pages: number;
  total_items: number;
  content: T[]; // Konten berbentuk array dari tipe generik
}

// Tipe spesifik untuk response pengguna
export type ApiResponseUser = IApiResponse<IUser>;

// Tipe spesifik untuk response ide
export type ApiResponseIdea = IApiResponse<IIdea>;

// Tipe spesifik untuk response detail ide
export type ApiResponseDetailIdea = IApiResponse<IDetailIdea>;

// Tipe spesifik untuk response unit kerja
export type ApiResponseUnit = IApiResponse<IUnitKerja>;
