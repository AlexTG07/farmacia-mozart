// ============================================
// Sanity GROQ Queries
// ============================================

import { sanityClient } from './client';
import type { Offer, Product, Category, FAQ, Service, SiteSettings } from '@/types';

export async function getSiteSettings(): Promise<SiteSettings> {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0]{
      heroTitle,
      heroSubtitle,
      phone,
      whatsapp,
      email,
      address,
      mapEmbedUrl,
      openingHours[]{day, dayIndex, open, close},
      socialLinks[]{platform, url, icon}
    }`
  );
}

export async function getOffers(): Promise<Offer[]> {
  return sanityClient.fetch(
    `*[_type == "offer" && active == true] | order(order asc){
      _id, title, description, originalPrice, discountedPrice, image, badge, active, order
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

export async function getFaqs(): Promise<FAQ[]> {
  return sanityClient.fetch(
    `*[_type == "faq"] | order(order asc){
      _id, question, answer, order
    }`
  );
}

export async function getServices(): Promise<Service[]> {
  return sanityClient.fetch(
    `*[_type == "service"] | order(order asc){
      _id, title, description, icon, order
    }`
  );
}
