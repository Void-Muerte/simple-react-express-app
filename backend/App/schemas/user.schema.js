const Yup = require('yup');

const addUserSchema = {
    schema:{
        body:{
            yupSchema:Yup.object().shape({

                name:Yup.string(),
                email:Yup.string().email(),
                city:Yup.string(),
                country:Yup.string()
            })
        }
    },
};
const updateUserSchema = {
    schema:{
        body:{
            yupSchema:Yup.object().shape({
                name:Yup.string(),
                email:Yup.string().email(),
                city:Yup.string(),
                country:Yup.string()
            }),
        },
        params:{
            yupSchema:Yup.object().shape({
                id:Yup.number().required()
            })
        }
    }
}
const getUserSchema = {
    schema:{
        params:{
            yupSchema:Yup.object().shape({
                id:Yup.number().required()
            })
        }
    }
}
const deleteUserSchema = {
    schema:{
        params:{
            yupSchema:Yup.object().shape({
                id:Yup.number().required()
            })
        }
    }
}
module.exports = {addUserSchema, updateUserSchema, getUserSchema, deleteUserSchema};