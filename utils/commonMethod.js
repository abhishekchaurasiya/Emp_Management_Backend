import mongoose from "mongoose";

export const isValidId = (id) => {
    const objecId = id.toString();
    return mongoose.Types.ObjectId.isValid(objecId);
}

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}

export const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+\d{1,2}\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return phoneRegex.test(phoneNumber);
}

export const validateDate = (date) => {
    const dateRegex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
    return dateRegex.test(date);
}

export const validateSalary = (salary) => {
    const salaryRegex = /^\d+(\.\d{1,2})?$/;
    return salaryRegex.test(salary);
}

export const validateAllowances = (allowances) => {
    const allowancesRegex = /^\d+(\.\d{1,2})?$/;
    return allowancesRegex.test(allowances);
}

export const validateDeductions = (deductions) => {
    const deductionsRegex = /^\d+(\.\d{1,2})?$/;
    return deductionsRegex.test(deductions);
}
