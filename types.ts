
import React from 'react';

export interface StatItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

export interface CatalogItem {
  id: number;
  title: string;
  cover: string;
  rating: number;
  category: 'Manga' | 'Novel';
  views: number;
  status: 'Visible' | 'Hidden';
  createdAt: string;
  description?: string;
  year?: string;
  chapters?: string;
  country?: string;
  genres?: string;
}

export interface ChapterItem {
  id: number;
  itemId: number;
  number: number;
  title: string;
  content: string | string[]; // Text for novels, array of image URLs for manga
  createdAt: string;
}

export interface UserItem {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  plan: 'Free' | 'Basic' | 'Premium' | 'Cinematic' | 'Admin';
  commentsCount: number;
  reviewsCount: number;
  status: 'Approved' | 'Banned' | 'Pending';
  createdAt: string;
}

export interface CommentItem {
  id: number;
  itemTitle: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  status: 'Approved' | 'Pending' | 'Flagged';
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export enum Category {
  MANGA = 'Manga',
  NOVEL = 'Novel'
}

export enum Page {
  DASHBOARD = 'Dashboard',
  CATALOG = 'Catalog',
  USERS = 'Users',
  COMMENTS = 'Comments',
  ADD_ITEM = 'AddItem',
  EDIT_ITEM = 'EditItem',
  ADD_USER = 'AddUser',
  EDIT_USER = 'EditUser',
  EDIT_COMMENT = 'EditComment',
  ADD_CHAPTER = 'AddChapter',
  SETTINGS = 'Settings',
  MONETIZATION = 'Monetization'
}
