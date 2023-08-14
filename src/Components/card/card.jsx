import { Link } from "react-router-dom";
import classes from "./card.module.css";

const Card = (props, index) => {
  props = props.props;
  // console.log('index from card component: ', props, index);
  return (
    <Link to={`detailsPage/${props.id}`} state={{ from: props }}>
      <div className={classes.card}>
        <div className={classes.image}>
          <img
            src={
              props.coverImageSrc ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqeZ5mVbarupP8UWVic7UtumtbIyE0GY-ucQ&usqp=CAU"
            }
            alt={props.title}
          />
        </div>
        <div className={classes.title}>{props.title}</div>
        <div className={classes.extras}>👍 ❤️</div>
      </div>
    </Link>
  );
};

export default Card;
