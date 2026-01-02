"use client";
import React from "react";
import useCategorySubmit from "@/hooks/useCategorySubmit";
import CategoryTables from "./category-tables";
import ErrorMsg from "../common/error-msg";

const AddCategory = () => {
  const {
    errors,
    register,
    handleSubmit,
    handleSubmitCategory,
    isActive,
    setIsActive,
  } = useCategorySubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit(handleSubmitCategory)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <div className="mb-6">
              <p className="mb-0 text-base text-black">
                Category Name <span className="text-red">*</span>
              </p>
              <input
                {...register("name", { required: "Name is required" })}
                className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                type="text"
                placeholder="e.g. T-shirts"
              />
              <ErrorMsg msg={errors?.name?.message as string} />
            </div>

            <div className="mb-6">
              <p className="mb-0 text-base text-black">Slug</p>
              <input
                {...register("slug")}
                className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                type="text"
                placeholder="auto-generated if empty"
              />
            </div>

            <div className="mb-6">
              <p className="mb-0 text-base text-black">
                Parent <span className="text-red">*</span>
              </p>
              <select
                {...register("parent", { required: "Parent is required" })}
                className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
              >
                <option value="">Select parent</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="junior">Junior</option>
                <option value="accessories">Accessories</option>
                <option value="cosmetic">Cosmetic</option>
              </select>
              <ErrorMsg msg={errors?.parent?.message as string} />
            </div>

            <div className="mb-6 flex items-center gap-3">
              <input
                id="isActive"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="isActive" className="text-base text-black">
                Active
              </label>
            </div>

            <button className="tp-btn px-7 py-2">Save Category</button>
          </div>
        </form>
      </div>
      <div className="col-span-12 lg:col-span-8">
        <CategoryTables />
      </div>
    </div>
  );
};

export default AddCategory;
