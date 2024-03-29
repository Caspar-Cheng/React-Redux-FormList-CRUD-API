import React, { useState } from "react";
import { Button } from "reactstrap";
import FormItem from "./shared/FormItem";
import { v4 as uuid } from "uuid";
import update from "immutability-helper";
import { connect } from "react-redux";
import { addForm } from "../store/user/thunk";

const initialState = {
  id: "",
  description: "",
  category: "html",
  content: "",
  select: false,
  lastModifiedDate: null,
};

const SubmitForm = ({ addForm }) => {
  const [form, setForm] = useState(initialState);
  const formFormat = {
    id: form.id,
    description: form.description,
    category: form.category,
    content: form.content,
    lastModifiedDate: null,
  };

  const onSubmit = () => {
    if (!!form.description && !!form.content) {
      formFormat.lastModifiedDate = new Date();
      addForm(formFormat);
    } else {
      alert("Please finish required input!");
    }
    setForm(initialState);
  };

  const onChange = (e) => {
    const value = update(form, {
      [e.target.name]: { $set: e.target.value },
      id: { $set: uuid() },
      select: { $set: false },
    });

    setForm(value);
  };

  return (
    <>
      <FormItem
        title="description"
        value={form.description}
        onChange={onChange}
      />
      <FormItem
        type="select"
        title="category"
        value={form.category}
        onChange={onChange}
        style={{ maxWidth: 100 }}
      />
      <FormItem
        type="textarea"
        title="content"
        value={form.content}
        onChange={onChange}
      />

      <Button onClick={onSubmit} type="submit" color="success">
        Submit
      </Button>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addForm: (form) => dispatch(addForm(form)),
});

export default connect(null, mapDispatchToProps)(SubmitForm);
