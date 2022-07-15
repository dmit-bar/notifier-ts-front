import { Form, Formik } from "formik";
import * as React from "react";
import * as yup from "yup";
import { ThemeContext } from "../../Context/Theme/Theme";
import Button from "../../Controls/Button";
import Textfield from "../../Controls/Textfield";
import ThemeSwitcher from "../../Context/Theme/ThemeSwitcher";
import styles from "./Login.module.scss";
import { UserCredentials } from "../../API/Model/Session";
import { IS_AUTH_COOKIE, login, SESSION_ID_COOKIE } from "../../API/session";
import { SessionContext } from "../../Context/Session/Session";
import Cookies = require("js-cookie");

const loginYupSchema = yup.object().shape({
  login: yup.string().required("login is a required field"),
  pass: yup.string().required("pass is a required field"),
});

const Login = () => {
  const { theme } = React.useContext(ThemeContext);
  const { session, setSession } = React.useContext(SessionContext);

  const handleSubmit = (values: UserCredentials, { setSubmitting }) => {
    login(session, values)
      .then((res) => {
        setSession(res);
        Cookies.set(SESSION_ID_COOKIE, res.id);
        Cookies.set(IS_AUTH_COOKIE, "true");
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className={`${styles.root} ${styles[theme]}`}>
      <ThemeSwitcher theme={theme} />
      <div className={styles.content}>
        <span className={`${styles.logo} ${styles[theme]}`}>notifier</span>
        <Formik
          initialValues={{
            login: "",
            pass: "",
          }}
          validationSchema={loginYupSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form className={`${styles.form} ${styles.fieldsMargin}`}>
              <div className={styles.field}>
                <Textfield
                  name="login"
                  id="login"
                  type="text"
                  placeholder="login"
                  style="regular"
                  size="large"
                  autoComplete={false}
                  spellCheck={false}
                  disabled={formikProps.isSubmitting}
                />
              </div>
              <div className={styles.field}>
                <Textfield
                  name="pass"
                  id="pass"
                  type="password"
                  placeholder="pass"
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
