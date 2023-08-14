import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "./details-page.module.css";
import { useDispatch } from "react-redux";
import { deleteArticle, fetchArticles } from "../../services/PostServices";

const DetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { from } = location.state;
  const props = from;

  useEffect(() => {
    document.querySelector("#content").innerHTML = props.content;
  }, [props.content]);

  const editArticle = () => {
    console.log(props);
    navigate("edit", { state: { id: props.id, props } });
    <Link to={`new`} state={{ from: props }}></Link>;
  };

  const deleteArticleFunc = () => {
    dispatch(deleteArticle({ id: props.id }));
    dispatch(fetchArticles());
    navigate("../");
  };

  return (
    <div className={classes.container}>
      <div className={classes.navbar}></div>
      <div className={classes.titleContainer}>
        <div
          className={`${classes.circle} ${classes.editBtn}`}
          onClick={editArticle}
        >
          +
        </div>
        <div
          className={`${classes.circle} ${classes.deleteBtn}`}
          onClick={deleteArticleFunc}
        >
          -
        </div>
        <div className={classes.title}>{props.title}</div>
        <div className={classes.author}>by {props.createdBy}</div>
      </div>
      <div id="content" className={classes.content}></div>
    </div>
  );
};

export default DetailsPage;
