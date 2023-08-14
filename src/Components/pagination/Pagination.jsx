import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getPaginatedPosts, getPostsCount } from "../../services/PostServices";
import classes from "./Pagination.module.css";

const Pagination = (props) => {
  const [pagesArr, setPagesArr] = useState([]);
  const { page } = props;
  const { pages } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    createPages();
    (async () => {
      const totalPosts = await getPostsCount();
      if (totalPosts) {
        const pages = Math.ceil(totalPosts / props.perPage);
        props.setTotalPages(pages);
      }
    })();
  }, [page, pages]);

  const changePage = (e) => {
    props.setPage(+e.target.textContent);
    dispatch(getPaginatedPosts({ page: props.page, perPage: props.perPage }));
  };

  const createPages = () => {
    const tempPages = [];
    console.log(pages);
    [...Array(parseInt(pages)).keys()].map((currPage) =>
      tempPages?.push(
        <div
          key={currPage + 1}
          className={`${classes.page} ${
            currPage + 1 === +page && classes.active //+page we are converting or say type casting, No it's not ChatGPT!
          }`}
          onClick={changePage}
        >
          {currPage + 1}
        </div>
      )
    );
    setPagesArr(tempPages);
  };
  return <div className={classes.pagination}>{pagesArr}</div>;
};

export default Pagination;
