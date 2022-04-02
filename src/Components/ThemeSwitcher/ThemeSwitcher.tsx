import * as React from "react";
import { ThemeContext } from "../..";
import { MdOutlineLightMode, MdNightlight } from "react-icons/md";
import * as Cookies from "js-cookie";
import styles from "./ThemeSwitcher.module.scss";

interface ThemeSwitcherProps {
  theme: string;
}

const OFFSET = "2rem";

const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const { theme: currentTheme } = { ...props };

  const { theme, setTheme } = React.useContext(ThemeContext);
  const [lightIconTransform, setLightIconTransform] = React.useState({
    transform: `translateX(${currentTheme == "light" ? 0 : OFFSET})`,
  });
  const [darkIconTransform, setDarkIconTransform] = React.useState({
    transform: `translateX(${currentTheme == "dark" ? 0 : OFFSET})`,
  });

  const handleClick = () => {
    if (theme == "dark") {
      setTheme("light");
      setDarkIconTransform({
        transform: `translateX(${OFFSET})`,
      });
      setLightIconTransform({
        transform: `translateX(${0})`,
      });

      Cookies.set("theme", "light");

      return;
    }
    setTheme("dark");
    setDarkIconTransform({
      transform: `translateX(${0})`,
    });
    setLightIconTransform({
      transform: `translateX(${OFFSET})`,
    });

    Cookies.set("theme", "dark");
  };

  return (
    <div className={`${styles.button} ${styles[theme]}`} onClick={handleClick}>
      <div className={styles.icons}>
        <MdOutlineLightMode
          className={`${styles.icon} ${styles[theme]}`}
          size={"1.25rem"}
          style={lightIconTransform}
        />
        <MdNightlight
          className={`${styles.icon} ${styles[theme]}`}
          size={"1.25rem"}
          style={darkIconTransform}
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
