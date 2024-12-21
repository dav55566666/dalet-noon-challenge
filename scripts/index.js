import { usersData } from "./data.js";
import { DOMElements } from "./elements.js";
import { addEditUserData, addEditUserRequiredFields, DURATION } from "./utils/constants.js";
import { controlsPagination, validation } from "./utils/helper-functions.js";

if ($(DOMElements.usersTable)) {
    controlsPagination(usersData, 0);
    localStorage.setItem('usersData', JSON.stringify(usersData));
};

$(DOMElements.burgerBtn).click(function (e) {
    $(DOMElements.sidebar).addClass('active');
    e.stopPropagation();
    $('body').click(function () {
        $(DOMElements.sidebar).removeClass('active');
    });
});

const filterAndPaginateUsers = () => {
    const searchValue = $(DOMElements.searchInput).val().trim().toLowerCase();
    const sortingValue = $(DOMElements.sorting).val().trim().toLowerCase();

    const filteredData = usersData.filter(user => {
        const matchesSearch =
            !searchValue ||
            user.name.toLowerCase().includes(searchValue) ||
            user.email.toLowerCase().includes(searchValue);

        const matchesSorting =
            !sortingValue || 
            user.role.toLowerCase().includes(sortingValue);

        return matchesSearch && matchesSorting; 
    });

    controlsPagination(filteredData, 0); 
};

$(DOMElements.searchInput).on('input', function () {
    filterAndPaginateUsers();
});

$(DOMElements.sorting).on('change', function () {
    filterAndPaginateUsers();
});

$(DOMElements.confirmDelete).click(function () {
    const id = $(DOMElements.deleteModal).data('userId');
    const updateUsers = JSON.parse(localStorage.getItem('usersData')).filter(user => user.id !== id); 
    $(DOMElements.modalBg).removeClass('c-overlay--visible');
    $(DOMElements.deleteModal).removeClass('o-modal--visible');
    $(DOMElements.deleteModal).data('userId');
    localStorage.setItem('usersData', JSON.stringify(updateUsers));
    controlsPagination(updateUsers);
});

const addEditUserForm = $(DOMElements.addEditModal).find('form');

$(addEditUserForm).submit(function (e) {
    e.preventDefault();
    const id = Number($(DOMElements.addEditModal).data('userId'));
    const inputs = $(addEditUserForm).find('input:not([type="button"]):not([type="submit"])');
    const selects = $(addEditUserForm).find('select');
    Object.keys(addEditUserData).forEach(key => delete addEditUserData[key]);

    inputs.each(function () {
        const name = $(this).attr('name');
        const value = $(this).val();
        if (name) {
            addEditUserData[name] = value;
        };
    });

    selects.each(function () {
        const name = $(this).attr('name');
        const value = $(this).val();
        if (name) {
            addEditUserData[name] = value;
        };
    });

    Object.assign(addEditUserRequiredFields, validation(addEditUserData, addEditUserRequiredFields));

    const hasErrors = Object.entries(addEditUserRequiredFields).some(
        ([, value]) => !value.validate
    );

    if (!hasErrors) {
        $(DOMElements.addEditModal).append(DOMElements.loader);
        const updateUser = {
            ...addEditUserData,
            id: id || new Date().getTime()
        };
        const updateUsersData = [
            updateUser,
            ...usersData,
        ];

        //simulate loading
        setTimeout(() => {
            $(DOMElements.addEditModal).find('div[class="loader"]').remove();
            $(DOMElements.modalBg).removeClass('c-overlay--visible');
            $(DOMElements.addEditModal).removeClass('o-modal--visible');
            $(DOMElements.addEditModal).data('userId');
            localStorage.setItem('usersData', JSON.stringify(updateUsersData));
            controlsPagination(updateUsersData, !id && 0);
        }, DURATION);
    };
});