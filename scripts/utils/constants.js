export const DURATION = 1000;
export const PAGE_SIZE = 8;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


export const Symbols = {
    PREV: '‹',
    NEXT: '›'
};

export const addEditUserData = {
    id: null,
    name: '',
    email: '',
    role: ''
};

export const addEditUserRequiredFields = {
    name: {
        type: 'text',
        required: true,
        validate: false
    },
    email: {
        type: 'email',
        required: true,
        validate: false
    },
    role: {
        type: 'text',
        required: true,
        validate: false
    }
};