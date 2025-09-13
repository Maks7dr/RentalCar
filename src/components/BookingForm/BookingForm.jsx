import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import css from "./BookingForm.module.css";
import { ClipLoader } from "react-spinners";

const BookingForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    date: "",
    comment: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    date: Yup.date(),
    comment: Yup.string(),
  });

  const handleSubmit = (values, { resetForm }) => {
    setIsLoading(true);
    emailjs
      .send("service_v1r17ru", "template_8vxhyp9", values, "sHSCXe4b7SGQ_1nj9")
      .then(
        () => {
          toast.success("Booking request sent successfully!");
          resetForm();
          setIsLoading(false);
        },
        (error) => {
          toast.error("Failed to send. Please try again later.");
          console.error(error);
          setIsLoading(false);
        }
      );
  };

  return (
    <div className={css.formWrapper}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <Field
              className={css.field}
              name="name"
              type="text"
              placeholder="Name*"
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </label>

          <label className={css.label}>
            <Field
              className={css.field}
              name="email"
              type="email"
              placeholder="Email*"
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </label>

          <label className={css.label}>
            <Field
              className={css.field}
              name="date"
              type="date"
              placeholder="Booking date*"
            />
            <ErrorMessage name="date" component="span" className={css.error} />
          </label>

          <label className={css.label}>
            <Field
              className={css.textarea}
              name="comment"
              as="textarea"
              placeholder=" Comment"
            />
          </label>

          <button type="submit" className={css.button} disabled={isLoading}>
            {isLoading ? <ClipLoader color="#fff" size={20} /> : "Send"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
