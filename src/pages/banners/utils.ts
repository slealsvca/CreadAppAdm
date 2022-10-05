import React, { Dispatch } from "react";
import { PublicationType } from "../../data/@types/publication";
import { GetCategories } from "../../store/api/publication/categories";

export const getCategory = async (setCategories: Dispatch<PublicationType>) => {
    const categories =
        await GetCategories();
    categories &&
        setCategories(
            categories?.data,
        );
};