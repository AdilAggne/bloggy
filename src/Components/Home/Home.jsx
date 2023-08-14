import { useState, useEffect } from "react";
import classes from "./Home.module.css";
import Hero from "../hero/hero";
import Card from "../card/card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPaginatedPosts } from "../../services/PostServices";
import Pagination from "../pagination/Pagination";

function Home() {
  const [showAlert, setShowAlert] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  const getData = () => {
    console.log("getData from Home: ", 1);
    setData(state.articles);
    console.log("getData from Home: ", 2);
  };

  useEffect(() => {
    console.log("useEffect from Home:", 1);
    dispatch(getPaginatedPosts({ page, perPage }));
    console.log("useEffect from Home:", 2);
    console.log(data);
  }, [page, perPage]);

  useEffect(() => {
    console.log("useEffect from Home: ", 1, 1);
    getData();
    console.log("useEffect from Home: ", 2, 1);
  }, [getData]);

  const addNewArticle = () => {
    navigate("/new");
  };

  return (
    <div className={classes.container}>
      {showAlert && (
        <div className={classes.alert}>
          <p>
            Don't see any data? Maybe try refreshing the page, still same? Then
            server is offline, wait till its get back!
          </p>
          <div className={classes.closeBtn} onClick={() => setShowAlert(false)}>
            X
          </div>
        </div>
      )}
      <Hero />
      <div className={classes.buttons}>
        <div className={classes.search}></div>
        <div
          className={classes.newArticleBtn}
          onClick={addNewArticle}
          onKeyDown={(e) => {
            if (e.code === "Space" || e.code === "Enter") addNewArticle();
          }}
          tabIndex={1}
        >
          +
        </div>
        <div className={classes.pagination}>
          <Pagination
            pages={totalPages}
            page={page}
            perPage={perPage}
            setPage={setPage}
            setPerPage={setPerPage}
            setTotalPages={setTotalPages}
          />
        </div>
      </div>
      <div className={classes.articles}>
        {data !== null && data?.length > 0 ? (
          data?.map((article, index) => {
            console.log("data from list creation: ", data);
            return <Card key={article.id} props={article} index={index} />;
          })
        ) : (
          <p>"Please add some posts!!"</p>
        )}
      </div>
    </div>
  );
}

export default Home;
