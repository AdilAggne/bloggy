import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./NewEditPage.module.css";
import {
  fetchArticles,
  addArticle,
  updateArticle,
} from "../../services/PostServices";

const NewEditPage = () => {
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const editorRef = useRef(null);
  const popupRef = useRef(null);
  const boldBtnRef = useRef(null);
  const [timerId, setTimerId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gotoHome = () => {
    navigate("/");
  };

  const handleMouseDown = () => {
    if (!popupRef.current.classList.contains(classes.hidden)) {
      popupRef.current.classList.add(classes.hidden);
    }
    const newTimerId = setTimeout(showPopup, 1000);
    setTimerId(newTimerId);
  };

  const handleMouseUp = () => {
    clearTimeout(timerId);
  };

  const showPopup = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      popupRef.current.style.top = rect.bottom + "px";
      popupRef.current.style.left = rect.left + "px";
      popupRef.current.classList.remove(classes.hidden);
    }
  };

  const insertImage = () => {
    const imageUrl = prompt("Enter the image URL:");
    if (imageUrl) {
      insertImageAtCursor(imageUrl);
      // popupRef.current.classList.add(classes.hidden);
    }
  };

  const insertImageAtCursor = (imageUrl) => {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.classList.add("content-image"); // note this CSS should be available in details page.

    const selection = window.getSelection();
    console.log("image: ", img);
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.insertNode(img);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      editorRef.current.appendChild(img);
    }
  };

  const handleBoldClick = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      const span = document.createElement("span");
      span.style.fontWeight = "bold";
      span.textContent = range.toString();

      range.deleteContents();
      range.insertNode(span);
    }
  };

  const saveNewEditArticle = () => {
    const ch___pa = document.querySelector("#editor").innerHTML;
    if (state?.props.id >= 0) {
      const props = state.props;
      dispatch(
        updateArticle({
          id: props.id,
          title: title,
          content: ch___pa,
          CreatedBy: "User",
        })
      );
    } else {
      console.log("content he ch___pa hai: ", ch___pa);
      dispatch(
        addArticle({
          id: 0,
          title: title,
          content: ch___pa,
          CreatedBy: "User",
        })
      );
    }
    dispatch(fetchArticles());
    gotoHome();
  };

  useEffect(() => {
    if (state?.props.id >= 0) {
      console.log(state);
      setTitle(state.props.title);
      document.querySelector("#editor").innerHTML = state.props.content;
    }
  }, [state]);

  return (
    <div className={classes.newEdit}>
      <div className={classes.headers}>
        <div className={classes.backBtn} onClick={gotoHome}>
          Back
        </div>
        <div className={classes.saveBtn} onClick={saveNewEditArticle}>
          Save
        </div>
      </div>
      <div className={classes.title}>
        <input
          type="text"
          className={classes.titleEditor}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxlength={99}
        />
      </div>
      <div className={`${classes.popup}`} ref={popupRef}>
        <button id="insertImageBtn" onClick={insertImage}>
          Insert Image
        </button>
        <button id="boldBtn" onClick={handleBoldClick} ref={boldBtnRef}>
          Bold
        </button>
      </div>
      <div className={classes.desc}>
        <div
          id="editor"
          className={classes.editor}
          // onMouseDown={handleMouseDown}
          // onMouseUp={handleMouseUp}
          contentEditable={true}
        ></div>
      </div>
    </div>
  );
};

export default NewEditPage;
