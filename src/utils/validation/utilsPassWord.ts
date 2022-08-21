import * as yup from 'yup';

export const SchemaUpdatedPassword = yup
    .object()
    .shape({
        password: yup.string()
            .test(
                'string compare',
                'Proibido mais de 3 números repetidos em ordem',
                function (password = '') {
                    for (let i = 0; i <= 9; i++) {
                        if (password.includes(`${i}${i}${i}`)) {
                            return false
                        }
                    }
                    return true
                },
            )
            .test(
                'string compare',
                'Senha não pode ter mais de 3 números sequenciais',
                (password = '') => {
                    if (password) {
                        for (let i = 0; i <= 9; i++) {
                            if (
                                password.includes(
                                    `${i}${i + 1 <= 9 ? i + 1 : i + 1 - 10}${i + 2 <= 9 ? i + 2 : i + 2 - 10
                                    }`,
                                )
                            ) {
                                return false
                            }
                        }
                    }
                    return true
                },
            )
            .test(
                'string compare',
                'Deve conter letras, números e caracteres especiais',
                function (password = '') {
                    if (password) {
                        const numberMatches = password.match(/\d+/g) //eslint-disable-line
                        const specialCharacters =
                            /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/ //eslint-disable-line
                        const specialCharactersMatches =
                            specialCharacters.test(password) //eslint-disable-line

                        if (!numberMatches || !specialCharactersMatches)
                            return false
                    }
                    return true
                },
            )
            .min(8, 'Mínimo de 8 caracteres')
            .max(20, 'Máximo de 20 caracteres')
            .required('Senha nova é obrigatório'),
        password_confirmation: yup.string()
            .max(20, 'máximo de 20 caracteres')
            .required('Confirmação de senha é obrigatório')
            .oneOf(
                [yup.ref('password'), null],
                'Campo confirmar diferente de senha',
            ),
    })
    .required();

export const InitialValuesUpdatedPassword = {
    password: '',
    password_confirmation: '',
};