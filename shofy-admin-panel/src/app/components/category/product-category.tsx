"use client"
import React, { SetStateAction, useMemo, useState } from "react";
import { useGetAllCategoriesQuery, useGetSubCategoriesQuery } from "@/redux/category/categoryApi";
import ErrorMsg from "../common/error-msg";

type IPropType = {
  setCategory: React.Dispatch<SetStateAction<string>>;
  setCategoryName: React.Dispatch<SetStateAction<string>>;
  setParent: React.Dispatch<SetStateAction<string>>;
  setChildren: React.Dispatch<SetStateAction<string>>;
  setCategorySlug?: React.Dispatch<SetStateAction<string>>;
  setSubCategory?: React.Dispatch<SetStateAction<string>>;
  setSubCategorySlug?: React.Dispatch<SetStateAction<string>>;
  default_value?: {
    parent: string;
    slug: string;
    name: string;
    children?: string;
  };
};

const allowedParents = ["men", "women", "junior", "accessories", "cosmetic"];

const ProductCategory = ({
  setCategory,
  setCategoryName,
  setParent,
  setChildren,
  setCategorySlug,
  setSubCategory,
  setSubCategorySlug,
  default_value,
}: IPropType) => {
  const { data: categories, isError, isLoading } = useGetAllCategoriesQuery({ isActive: true });

  const normalized = useMemo(() => {
    return (categories?.data || [])
      .map((cat) => ({
        ...cat,
        parent: (cat.parent || "").toLowerCase(),
        slug: cat.slug,
      }))
      .filter(
        (cat) =>
          allowedParents.includes(cat.parent) &&
          (cat.isActive === undefined || cat.isActive === true)
      );
  }, [categories]);

  const parentOptions = useMemo(() => {
    const derived = Array.from(new Set(normalized.map((cat) => cat.parent)));
    return derived.length ? derived : allowedParents;
  }, [normalized]);

  const initialParent =
    (default_value?.parent || "").toLowerCase() ||
    parentOptions[0] ||
    allowedParents[0];
  const [selectedParent, setSelectedParent] = useState<string>(initialParent);
  const [selectedCategory, setSelectedCategory] = useState<string>(default_value?.slug || "");

  // find parent category document by parent slug
  const parentDoc = useMemo(() => {
    const parent = normalized.find((cat) => !cat.parentCategory && cat.parent === selectedParent);
    if (parent) return parent;
    // fallback: take first matching parent slug
    return normalized.find((cat) => cat.parent === selectedParent) || null;
  }, [normalized, selectedParent]);

  const { data: subCats } = useGetSubCategoriesQuery(parentDoc?._id || "", {
    skip: !parentDoc?._id,
  });

  const fallbackSubs = useMemo(() => {
    return normalized.filter(
      (cat) =>
        cat.parent === selectedParent &&
        cat.parentCategory && // must be a child
        (cat.isActive === undefined || cat.isActive === true)
    );
  }, [normalized, selectedParent]);

  const filteredCategories = useMemo(() => {
    const fromApi = (subCats?.data || []).filter(
      (cat) => cat.isActive === undefined || cat.isActive === true
    );
    if (fromApi.length) return fromApi;
    return fallbackSubs;
  }, [subCats, fallbackSubs]);

  React.useEffect(() => {
    if (!selectedCategory) return;
    // if selected slug no longer exists under this parent, clear selection
    const stillExists = filteredCategories.some((c) => c.slug === selectedCategory);
    if (!stillExists) {
      setSelectedCategory("");
      setCategory("");
      setCategorySlug && setCategorySlug("");
      setCategoryName("");
      setChildren("");
    }
  }, [filteredCategories, selectedCategory, setCategory, setCategoryName, setCategorySlug, setChildren]);

  const handleParentChange = (value: string) => {
    setSelectedParent(value);
    setSelectedCategory("");
    setCategory("");
    setCategorySlug && setCategorySlug("");
    setParent(value);
    setCategoryName("");
    setChildren("");
    setSubCategory && setSubCategory("");
    setSubCategorySlug && setSubCategorySlug("");
  };

  const handleCategoryChange = (value: string) => {
    const target = filteredCategories.find((cat) => cat.slug === value);
    setSelectedCategory(value);
    if (target) {
      setCategory(parentDoc?._id || "");
      setCategorySlug && setCategorySlug(parentDoc?.slug || "");
      setParent(parentDoc?.parent || "");
      setCategoryName(parentDoc?.name || "");
      setChildren(target.name);
      setSubCategory && setSubCategory(target._id);
      setSubCategorySlug && setSubCategorySlug(target.slug);
    } else {
      setCategory("");
      setCategorySlug && setCategorySlug("");
      setCategoryName("");
      setChildren("");
      setSubCategory && setSubCategory("");
      setSubCategorySlug && setSubCategorySlug("");
    }
  };

  if (isLoading) return <h2>Loading....</h2>;
  if (!isLoading && isError) return <ErrorMsg msg="There was an error" />;
  if (!isLoading && !isError && (categories?.data?.length || 0) === 0)
    return <ErrorMsg msg="No Category Found" />;

  return (
    <div className="space-y-3">
      <select
        value={selectedParent}
        onChange={(e) => handleParentChange(e.target.value)}
        className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
      >
        {parentOptions.map((parent) => (
          <option key={parent} value={parent}>
            {parent}
          </option>
        ))}
      </select>

      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
      >
        <option value="">
          {filteredCategories.length ? "Select sub-category" : "No sub-categories for this parent"}
        </option>
        {filteredCategories.map((cat) => (
          <option key={cat._id} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductCategory;

