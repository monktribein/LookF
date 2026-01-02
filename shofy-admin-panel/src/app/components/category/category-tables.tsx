"use client"
import React, { useState } from 'react';
import Pagination from '../ui/Pagination';
import ErrorMsg from '../common/error-msg';
import CategoryEditDelete from './edit-delete-category';
import { useGetAllCategoriesQuery } from '@/redux/category/categoryApi';
import usePagination from '@/hooks/use-pagination';

const CategoryTables = () => {
  const { data: categories, isError, isLoading } = useGetAllCategoriesQuery();
  const paginationData = usePagination(categories?.data || [], 5);
  const { currentItems, handlePageClick, pageCount } = paginationData;
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && (categories?.data?.length || 0) === 0) {
    content = <ErrorMsg msg="No Category Found" />;
  }

  if (!isLoading && !isError && categories?.success && currentItems.length > 0) {

    
    
    content = (
      <>
        <div className="overflow-scroll 2xl:overflow-visible">
          <div className="w-[975px] 2xl:w-full">
            <table className="w-full text-base text-left text-gray-500 ">

              <thead>
                <tr className="border-b border-gray6 text-tiny">
                  <th scope="col" className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px]">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end">
                    Parent
                  </th>
                  <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end">
                    Status
                  </th>
                  <th scope="col" className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...currentItems.reverse()].map(item => (
                  <tr key={item._id} className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="px-3 py-3 pl-0 font-normal text-[#55585B]">
                      #{item._id.slice(2, 10)}
                    </td>
                    <td className="pr-8 py-5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-medium text-heading text-hover-primary transition">{item.name}</span>
                        <span className="text-sm text-gray-500">{item.slug}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item.parent}
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="px-9 py-3 text-end">
                      <div className="flex items-center justify-end space-x-2">
                        <CategoryEditDelete id={item._id} isActive={item.isActive}/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="mb-0 text-tiny">Showing 1-{currentItems.length} of {categories?.data?.length}</p>
          <div className="pagination py-3 flex justify-end items-center pagination">
           <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
      </>
    )
  }
  return (
    <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
      {content}
    </div>
  );
};

export default CategoryTables;