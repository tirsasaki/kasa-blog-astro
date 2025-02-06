#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/\.mdx$/, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function getUniqueFilePath(basePath, fileName) {
  let filePath = path.join(basePath, fileName);
  let counter = 1;
  const ext = path.extname(fileName);
  const nameWithoutExt = fileName.replace(ext, '');

  while (fs.existsSync(filePath)) {
    fileName = `${nameWithoutExt}-${counter}${ext}`;
    filePath = path.join(basePath, fileName);
    counter++;
  }

  return { filePath, fileName };
}

function createPost() {
  const fileName = process.argv[2];
  
  if (!fileName) {
    console.error('Mohon berikan nama file sebagai argumen!');
    console.log('Contoh: pnpm create-post "My New Post.mdx"');
    process.exit(1);
  }

  const title = fileName.replace(/\.mdx$/, '');
  const slug = createSlug(title);
  const date = getTodayDate();

  const content = `---
title: "${title}"
description: ""
pubDate: ${date}
author: ""
image: "/"
tags: ["example1", "example2"]
categories: ["example"]
---

# ${title}

`;

  const postsDir = path.join(process.cwd(), 'src', 'content', 'blog');
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const { filePath, fileName: uniqueFileName } = getUniqueFilePath(postsDir, fileName);
  
  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Post successfully created on: ${filePath}`);
    
    if (uniqueFileName !== fileName) {
      console.log(`⚠️ Original filename was taken, saved as: ${uniqueFileName}`);
    }
  } catch (error) {
    console.error('There is an error:', error);
  }
}

createPost();