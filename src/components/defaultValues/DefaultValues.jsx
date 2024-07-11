"use client";
import { defaultCounter } from "@/lib/features/counter/counterSlice";
import { defaultValues } from "@/lib/features/wishlist/wishlistSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const DefaultValues = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(defaultCounter(+localStorage.getItem("counter")));
    dispatch(defaultValues(JSON.parse(localStorage.getItem("wishlist")) || []));
  }, []);

  return null;
};

export default DefaultValues;
