import * as React from "react";
import styles from "./Login.module.scss";
import Textfield from "../../Controls/Textfield";

const Login = () => {
  // TODO Add Formik

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <span className={styles.logo}>notifier</span>
        <div className={`${styles.form} ${styles.fieldsMargin}`}>
          <Textfield
            name="login"
            id="login"
            type="text"
            placeholder="login"
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
      </div>
    </div>
  );
};

export default Login;
