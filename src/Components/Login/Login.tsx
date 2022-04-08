import { Form, Formik } from "formik";
import * as React from "react";
import * as yup from "yup";
import { ThemeContext } from "../..";
import Button from "../../Controls/Button";
import Textfield from "../../Controls/Textfield";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import styles from "./Login.module.scss";

const loginYupSchema = yup.object().shape({
  username: yup.string().required("Username is a required field"),
  password: yup.string().required("Password is a required field"),
});

const Login = () => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <div className={`${styles.root} ${styles[theme]}`}>
      <ThemeSwitcher theme={theme} />
      <div className={styles.content}>
        <span className={`${styles.logo} ${styles[theme]}`}>notifier</span>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={loginYupSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
            }, 5000);
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
                  autoComplete={false}
                  spellCheck={false}
                  disabled={formikProps.isSubmitting}
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
                  autoComplete={false}
                  spellCheck={false}
                  disabled={formikProps.isSubmitting}
                />
              </div>
              <div className={styles.buttons}>
                <Button
                  label="Sign In"
                  type="submit"
                  primary
                  isSubmitting={formikProps.isSubmitting}
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
