// ============================================
// Sanity GROQ Queries
// ============================================

import { sanityClient } from './client';
import type { Offer, Product, Category, Flyer } from '@/types';

export async function getOffers(): Promise<Offer[]> {
  return sanityClient.fetch(
    `*[_type == "offer" && active == true] | order(order asc){
      _id, title, description, originalPrice, discountedPrice, image, badge, active, order, startDate, endDate
    }`
  );
}

export async function getProducts(): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && active == true] | order(order asc){
      _id, name, description, price, 
      category->{_id, name, slug, icon},
      image, active, order
    }`
  );
}

export async function getCategories(): Promise<Category[]> {
  return sanityClient.fetch(
    `*[_type == "category"] | order(name asc){
      _id, name, slug, icon
    }`
  );
}

export async function getFlyers(): Promise<Flyer[]> {
  return sanityClient.fetch(
    `*[_type == "flyer" && active == true] | order(order asc){
      _id, title, image, startDate, endDate, active, order
    }`
  );
}
