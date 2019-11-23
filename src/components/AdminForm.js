import React from "react";
import { connect } from "react-redux";
import {
  setCohortName,
  setCohortType
} from "../redux/actions/adminFormActions";

import TextInput from "./TextInput";
import Select from "./Select";
import SubmitButton from "./SubmitButton";

const AdminForm = props => {
  const handleCohortNameChange = e => {
    props.setCohortName(e.target.value);
  };

  const handleCohortTypeChange = e => {
    props.setCohortType(e.target.value);
  };

  // const handleSubmit = e => {
  //   // e.preventDefault();
  //   // // alert("Submitting");
  //   // console.log(props);
  //   // // on submit we need to save the form in DB
  //   // const data = new FormData(e.target);
  //   // fetch("http://localhost:8081/Applications", {
  //   //   method: "POST",
  //   //   body: data
  //   // });
  // };

  const selectOptions = [
    { value: "frontend", displayedName: "Fronend" },
    { value: "backend", displayedName: "Backend" },
    { value: "productDesign", displayedName: "Product Design" }
  ];

  return (
    <div>
      <form
        onSubmit={values =>
          new Promise((resolve, reject) => {
            fetch("/api/applications", {
              method: "post",
              body: JSON.stringify(values)
            })
              .then(res => res.json())
              .then(res => {
                if (res.hasOwnProperty("errors")) {
                  reject(res.errors);
                } else {
                  resolve(res.data);
                }
              });
          })
        }
      >
        <TextInput
          value={props.cohortName}
          handleChange={handleCohortNameChange}
        />
        <Select
          value={props.cohortType}
          handleChange={handleCohortTypeChange}
          options={selectOptions}
        />
        <SubmitButton />
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cohortName: state.cohortInfo.cohortName,
    cohortType: state.cohortInfo.cohortType
  };
};

const mapDispatchToProps = {
  setCohortName,
  setCohortType
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminForm);