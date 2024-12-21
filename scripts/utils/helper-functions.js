import { usersData } from "../data.js";
import { DOMElements } from "../elements.js";
import {
    addEditUserData,
    addEditUserRequiredFields,
    EMAIL_REGEX,
    PAGE_SIZE,
    Symbols,
    DURATION
} from "./constants.js";

const addEditUserForm = $(DOMElements.addEditModal).find('form');

export const toggleModal = (modalId, userId) => {
    $(DOMElements.modalBg).toggleClass('c-overlay--visible');
    $(DOMElements[modalId]).toggleClass('o-modal--visible');
    $(DOMElements[modalId]).data('userId', userId);
    if (!userId && modalId === 'addEditModal') {
        const inputs = $(addEditUserForm).find('input:not([type="button"]):not([type="submit"])');
        const selects = $(addEditUserForm).find('select');

        const updateRequiredFields = Object.fromEntries(
            Object.entries(addEditUserRequiredFields).map(([key, value]) => [
                key,
                { ...value, validate: false }
            ])
        );

        Object.assign(addEditUserRequiredFields, updateRequiredFields);

        Object.keys(addEditUserData).forEach(key => delete addEditUserData[key]);

        inputs.each(function () {
            const name = $(this).attr('name');
            if (name) {
                $(this).val('');
                $(this).removeClass('c-field--error');
            };
        });

        selects.each(function () {
            const name = $(this).attr('name');
            if (name) {
                $(this).val('');
                $(this).removeClass('c-field--error');
            };
        });
    };
};

export const controlsPagination = (usersData, chosenPage) => {
    if (usersData) {
        const pages = $(DOMElements.usersTable).find('.c-pagination__pages'); 
        $(pages).find('button[class="c-pagination__control"]').remove();
        const activeControl = $(DOMElements.usersTable).find('button[aria-current="page"]');
        const currentPage = chosenPage ? chosenPage : $(activeControl).text() ? Number($(activeControl).text() - 1) : 0;
        const paginationInfo = $(DOMElements.usersTable).find('.pagination-info'); 
        const totalPage = Math.floor(usersData.length / PAGE_SIZE);
        const updateUserData = usersData.slice((PAGE_SIZE * currentPage), ((PAGE_SIZE * currentPage) + PAGE_SIZE));

        $(paginationInfo).text(`Page ${currentPage + 1}/${totalPage + 1}`);

        for (let paginationController = 0; paginationController <= totalPage; paginationController++) {
            $(pages).append(`
                <button 
                class="c-pagination__control" 
                ${paginationController === currentPage && 'aria-current="page"'}>
                    ${paginationController + 1}
                </button>
            `);
        };
        
        DOMElements.paginationController = $('.c-pagination__control');
        $(DOMElements.paginationController).click(function () {
            const symbol = $(this).text();
            switch (symbol) {
                case Symbols.PREV:
                    controlsPagination(usersData, currentPage > 0 && currentPage - 1)
                    break;
                case Symbols.NEXT:
                    controlsPagination(usersData, currentPage < totalPage && currentPage + 1)
                    break;
                default:
                    controlsPagination(usersData, Number(symbol - 1))
                    break;
            };
        })
        return renderUsers(updateUserData);
    }
    return;
};

export const renderUsers = (data) => {
    const tbody = $(DOMElements.usersTable).find('tbody');
    $(DOMElements.usersTable).append(DOMElements.loader);
    tbody.empty();  
    if (data.length) {
        data.map(user => {
            const editBtn = `<td class="c-table__cell o-grid__cell--width-15"><button type="button" value="addEditModal" data-id="${user.id}" class="c-button toggle-btn">Edit</button></td>`;
            const deleteBtn = `<td class="c-table__cell o-grid__cell--width-15"><button type="button" value="deleteModal" data-id="${user.id}" class="c-button c-button--error toggle-btn">Delete</button></td>`;
            $(tbody).append(
                `<tr class="c-table__row">
                    <td class="c-table__cell o-grid__cell--width-20">${user.name}</td>
                    <td class="c-table__cell o-grid__cell--width-35">${user.email}</td>
                    <td class="c-table__cell o-grid__cell--width-15" style="text-transform: capitalize;">${user.role}</td>
                    ${editBtn}
                    ${deleteBtn}
                </tr>`
            );
        });
    } else {
        $(tbody).append(
            `<tr class="c-table__row">
                <td class="c-table__cell o-grid__cell--width-100" style="text-align: center; justify-content: center;">Users not found</td>
            </tr>`
        );
    };

    DOMElements.toggleModalBtn = $('.toggle-btn');

    $(DOMElements.toggleModalBtn).click(function (e) {
        toggleModal($(this).val(), $(this).data('id') || null);
        if ($(this).val() === 'addEditModal') {
            const initialUser = usersData.find(user => user.id === Number($(this).data('id')));
            if (initialUser) {
                const inputs = $(addEditUserForm).find('input:not([type="button"]):not([type="submit"])');
                const selects = $(addEditUserForm).find('select');

                Object.keys(addEditUserData).forEach(key => delete addEditUserData[key]);

                inputs.each(function () {
                    const name = $(this).attr('name');
                    if (name) {
                        $(this).val(initialUser[name])
                    };
                });

                selects.each(function () {
                    const name = $(this).attr('name');
                    if (name && initialUser[name] !== undefined) {
                        $(this).val(initialUser[name].toLowerCase());
                    };
                });

                Object.assign(addEditUserData, initialUser);
            };
        };
        e.stopPropagation();
    });

    //simulate loading
    setTimeout(() => {
        $(DOMElements.usersTable).find('div[class="loader"]').remove();
    }, DURATION);
};

export const validation = (body, requiredFields) => {
    const validationScheme = requiredFields;

    Object.entries(validationScheme).forEach(([key, value]) => {
        const { type, required } = value;
        let isValid = true;

        if (required || (!required && body[key]?.trim() !== '')) {
            switch (type) {
                case 'text':
                    isValid = body[key]?.trim() !== '';
                    break;
                case 'email':
                    isValid = EMAIL_REGEX.test(body[key]);
                    break;
            };
            validationScheme[key].validate = isValid;
            const currentField = $(addEditUserForm).find(`[name="${key}"]`);

            if (!isValid) {
                $(currentField).addClass('c-field--error');
            } else {
                $(currentField).removeClass('c-field--error');
            };
        };
        return validationScheme;
    });
};