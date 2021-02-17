import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
}));

export function useForm(
  initialPatientValues?: any,
  validateOnChange = false,
  validate?: any
) {
  const [values, setValues] = useState(initialPatientValues);
  const [errors, setErrors] = useState(Object);
  const [openPopup, setOpenPopUp] = useState(false);
  const [openDuplicate, setOpenDuplicate] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialPatientValues);
    setErrors(Object);
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    openPopup,
    setOpenPopUp,
    openDuplicate,
    setOpenDuplicate,
  };
}

export function Form(props: any) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
