import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, healthCheckOptions, DiagnosisSelection} from "../AddPatientModal/FormField";
import { Entry } from "../types";
import {useStateValue} from '../state';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
// export type EntryFormValues = UnionOmit<HealthCheckEntry, 'id'>;
export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
  }



export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
      <Formik
        initialValues={{
          description: "",
          date: "",
          specialist: "",
          diagnosisCodes: [""],
          type: "HealthCheck",
          healthCheckRating: "Healthy",
          // employerName: ""
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.diagnosisCodes) {
            errors.diagnosisCodes = requiredError;
          }
          if (!values.type) {
            errors.type = requiredError;
          }
          if (values.type=="HealthCheck" && !values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
          if (values.type=="OccupationalHealthcare" && !values.employerName) {
            errors.healthCheckRating = requiredError;
          }
          if (values.type=="Hospital" && !values.discharge) {
            errors.discharge = requiredError;
          }
          return errors;
        }}
        enableReinitialize={true}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
            return (
              <Form className="form ui">
                <Field name="type" component="select">
                    <option value="HealthCheck">Health Check</option>
                    <option value="OccupationalHealthcare">Occupational Healthcare</option>
                    <option value="Hospital">Hospital</option>
                </Field>
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />  
                {values.type === "HealthCheck" && (<SelectField label="healthCheckRating" name="healthCheckRating" options={healthCheckOptions} />)
                }
                {values.type === "OccupationalHealthcare" && (
                  <div>
                    <Field
                        label="Employer Name"
                        placeholder="Employer"
                        name="employerName"
                        component={TextField}
                    />
                    <Field
                        label="Sick Leave - Start Date"
                        placeholder="Start date"
                        name="sickLeave.startDate"
                        component={TextField}
                    />
                    <Field
                        label="Sick Leave - End Date"
                        placeholder="End date"
                        name="sickLeave.endDate"
                        component={TextField}
                    />
                  </div>
                )}
                {values.type === "Hospital" && (
                  <div>
                    <Field
                        label="Discharge Date"
                        placeholder="Discharge Date"
                        name="discharge.date"
                        component={TextField}
                    />
                    <Field
                        label="Discharge Criteria"
                        placeholder="Discharge Date"
                        name="discharge.criteria"
                        component={TextField}
                    />
                  </div>
                )}

                
                <Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ float: "left" }}
                      type="button"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: "right",
                      }}
                      type="submit"
                      variant="contained"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }
        }
      </Formik>
    );
  };
  
  export default AddEntryForm; 

