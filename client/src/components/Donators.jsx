import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllVideos } from "../redux/actions";

function Donators() {
  const { videos } = useSelector((state) => state.programandoando);
  const dispatch = useDispatch();
  console.log(videos);

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);

  return <></>;
}

export default Donators;
