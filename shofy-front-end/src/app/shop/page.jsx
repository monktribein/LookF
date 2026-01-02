import ShopPageClient from "./ShopPageClient";
import { Suspense } from "react";
import path from "path";
import fs from "fs/promises";
import { resolveNavbarCategoryDirName, resolveNavbarCategoryFolder, slugify } from "@/utils/slugify";

export const metadata = {
  title: "Lookfame - Shop Page",
};

const safeSlug = (value = "") => {
  const v = slugify(String(value || ""));
  return /^[a-z0-9-]+$/.test(v) ? v : "";
};

const listCategoryImages = async (navCategorySlug = "") => {
  if (!navCategorySlug) return [];

  const canonicalSlug = safeSlug(resolveNavbarCategoryFolder(navCategorySlug));
  if (!canonicalSlug) return [];

  // Virtual category: CARGOS = cargo pant + cargo jogger (both are present in assets)
  if (canonicalSlug === "cargos") {
    const cargoDirs = ["cargo pant", "cargo jogger"];
    const all = await Promise.all(
      cargoDirs.map(async (dirName) => {
        const absDir = path.join(
          process.cwd(),
          "public",
          "assets",
          "Nav bar category",
          "Men",
          dirName
        );
        try {
          const entries = await fs.readdir(absDir, { withFileTypes: true });
          return entries
            .filter((e) => e.isFile())
            .map((e) => e.name)
            .filter((name) => /\.(png|jpg|jpeg|webp|avif|gif)$/i.test(name))
            .sort((a, b) => a.localeCompare(b))
            .map((name) =>
              encodeURI(`/assets/Nav bar category/Men/${dirName}/${name}`)
            );
        } catch {
          return [];
        }
      })
    );
    return all.flat();
  }

  const dirName = resolveNavbarCategoryDirName(canonicalSlug);
  if (!dirName) return [];

  const absDir = path.join(
    process.cwd(),
    "public",
    "assets",
    "Nav bar category",
    "Men",
    dirName
  );
  try {
    const entries = await fs.readdir(absDir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => /\.(png|jpg|jpeg|webp|avif|gif)$/i.test(name))
      .sort((a, b) => a.localeCompare(b))
      .map((name) =>
        encodeURI(`/assets/Nav bar category/Men/${dirName}/${name}`)
      );
  } catch {
    return [];
  }
};

export default async function ShopPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const navCategoryRaw = sp?.navCategory;
  const navCategory = safeSlug(resolveNavbarCategoryFolder(navCategoryRaw || ""));
  const assetImages = navCategory ? await listCategoryImages(navCategory) : null;

  return (
    <Suspense fallback={null}>
      <ShopPageClient assetCategorySlug={navCategory || null} assetImages={assetImages} />
    </Suspense>
  );
}
