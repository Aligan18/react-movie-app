import React from "react";
import classes from "./SideBar.module.scss";
import image from "../../source/logo.png";
import GenresDropdown from "../GenresDropdown/GenresDropdown";
import IconSideBar from "../IconSideBar/IconSideBar";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useWindow from "../../hooks/useWindow";
import { routersPath } from "../../router/router";

const SideBar = ({ genresList, setSelectedGenres, changeFlag, flag }) => {
  const [WindowDimensions, desktopSize] = useWindow();
  const navigate = useNavigate();
  const { id } = useAuth();

  const list = [
    {
      title: "Home",
      icon: "fas fa-home",
      link: routersPath.HOME,
    },

    {
      title: "My favorite",
      icon: "far fa-list-alt",
      link: routersPath.FAVORITE_MOVIE + id,
    },
    {
      title: "History",
      icon: "fas fa-history",
      link: "",
    },
  ];

  const handleClick = (link) => {
    !desktopSize() && changeFlag(false);
    navigate(link);
  };

  return (
    <div className={classes.sideBar}>
      <div className={classes.imgBox}>
        <img className={classes.img} alt="" src={image} />
      </div>
      <div className={classes.title}>
        <h4>REACT MOVIE APP</h4>
      </div>

      <div className={classes.list}>
        {list.map((line) => (
          <div onClick={() => handleClick(line.link)} className={classes.line}>
            <i className={line.icon} />
            <h6 className={classes.text}>{` ${line.title}`}</h6>
          </div>
        ))}

        <GenresDropdown
          genresList={genresList}
          setSelectedGenres={setSelectedGenres}
        />
      </div>
    </div>
  );
};

export default SideBar;
