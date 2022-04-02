import { Form, Formik } from "formik";
import * as React from "react";
import * as yup from "yup";
import Button from "../../Controls/Button";
import Textfield from "../../Controls/Textfield";
import styles from "./Login.module.scss";

const loginYupSchema = yup.object().shape({
  username: yup.string().required("Username is a required field"),
  password: yup.string().required("Password is a required field"),
});

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
          validationSchema={loginYupSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 300);
          }}
        >
          {(formikProps) => (
            <Form className={`${styles.form} ${styles.fieldsMargin}`}>
              <div className={styles.field}>
                <Textfield
                  name="username"
                  id="username"
                  type="text"
                  placeholder="username"
                  style="regular"
                  size="large"
                  spellCheck={false}
                />
              </div>
              <div className={styles.field}>
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
                <Button
                  label="Sign In"
                  type="submit"
                  primary
                  disabled={formikProps.isSubmitting}
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
