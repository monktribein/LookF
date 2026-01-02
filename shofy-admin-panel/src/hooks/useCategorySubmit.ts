import { notifySuccess, notifyError } from "@/utils/toast";
import { useAddCategoryMutation, useEditCategoryMutation } from "@/redux/category/categoryApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import slugify from "slugify";

const useCategorySubmit = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  const [
    addCategory,
  ] = useAddCategoryMutation();
  const [
    editCategory,
  ] = useEditCategoryMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const buildPayload = (data: any) => {
    const rawName = data?.name || "";
    return {
      name: rawName,
      slug: data?.slug ? slugify(data.slug, { lower: true }) : undefined,
      parent: data?.parent,
      isActive,
    };
  };

  const handleSubmitCategory = async (data: any) => {
    try {
      const payload = buildPayload(data);
      const res = await addCategory(payload);
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Category added successfully");
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  const handleSubmitEditCategory = async (data: any, id: string) => {
    try {
      const payload = buildPayload(data);
      const res = await editCategory({ id, data: payload });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Category updated successfully");
        router.push('/category')
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    control,
    isActive,
    setIsActive,
    handleSubmitCategory,
    isSubmitted,
    handleSubmitEditCategory,
    reset,
  };
};

export default useCategorySubmit;
