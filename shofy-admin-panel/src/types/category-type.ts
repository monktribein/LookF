
export interface ICategoryItem {
  _id: string;
  name: string;
  slug: string;
  parent: "men" | "women" | "junior";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  success: boolean;
  data: ICategoryItem[];
}

export interface IAddCategory {
  name: string;
  slug?: string;
  parent: "men" | "women" | "junior";
  isActive?: boolean;
}

export interface IAddCategoryResponse {
  success?: boolean;
  message: string;
  data: ICategoryItem;
}

export interface ICategoryDeleteRes {
  success?: boolean;
  message?: string;
}


