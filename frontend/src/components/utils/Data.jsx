import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../features/propertySlice";
import Spinner from "../utils/Spinner";

function Data() {
  const dispatch = useDispatch();

  const { posts, isLoading } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (isLoading || !posts) {
    return <Spinner />;
  }

  const UserData = [
    {
      id: 1,
      month: "Mmkm",
      postNumber: 3,
    },
    {
      id: 2,
      month: "February",
      postNumber: 2,
    },
    {
      id: posts[0]?._id,
      month: "March",
      postNumber: posts[0]?.count,
    },
    {
      id: 4,
      month: "April",
      postNumber: 5,
    },
    {
      id: 5,
      month: "Mart",
      postNumber: 12,
    },
    {
      id: 6,
      month: "Juny",
      postNumber: 1,
    },
    {
      id: 7,
      month: "July",
      postNumber: 4,
    },
    {
      id: 8,
      month: "August",
      postNumber: 3,
    },
    {
      id: 9,
      month: "September",
      postNumber: 4,
    },
    {
      id: 10,
      month: "October",
      postNumber: 6,
    },
    {
      id: 11,
      month: "November",
      postNumber: 8,
    },
    {
      id: 12,
      month: "December",
      postNumber: 3,
    },
  ];
  return { UserData };
}

export default Data;
