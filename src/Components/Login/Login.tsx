import { Form, Formik } from "formik";
import * as React from "react";
import Button from "../../Controls/Button";
import Textfield from "../../Controls/Textfield";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <span className={styles.logo}>notifier</span>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <Form className={`${styles.form} ${styles.fieldsMargin}`}>
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
              <div className={styles.buttons}>
                <Button
                  label="Sign In"
                  type="submit"
                  disabled={formik.isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
