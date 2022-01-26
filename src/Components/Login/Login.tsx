import * as React from "react";
import styles from "./Login.module.scss";
import Textfield from "../../Controls/Textfield";
import Button from "../../Controls/Button";

const Login = () => {
  // TODO Add Formik

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <span className={styles.logo}>notifier</span>
        <div className={`${styles.form} ${styles.fieldsMargin}`}>
          <Textfield
            name="username"
            id="username"
            type="text"
            placeholder="username"
            style="regular"
            size="large"
            spellCheck={false}
          />
          <Textfield
            name="password"
            id="password"
            type="password"
            placeholder="password"
            style="regular"
            size="large"
            spellCheck={false}
          />
        </div>
        <div className={styles.buttons}>
          <Button label="Log In" />
        </div>
      </div>
    </div>
  );
};

export default Login;
