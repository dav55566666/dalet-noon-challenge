# **User Management Admin Panel**

## **Overview**
This project implements a dynamic admin panel for user management as per the provided technical task. It includes features like search, pagination, sorting, and user CRUD (Create, Read, Update, Delete) operations, all styled with **BlazeUI** and powered by **jQuery** for dynamic functionality.

---

## **Features**
- **Responsive Design**:
  - Built using the BlazeUI framework.
  - Includes a header, sidebar, and main content area.
- **User Table**:
  - Displays user data with columns for Name, Email, Role, and Actions (Edit/Delete).
  - Paginated view for easy navigation of user data.
- **CRUD Functionality**:
  - **Add User**: Modal form for adding new users.
  - **Edit User**: Modal pre-filled with user details for editing.
  - **Delete User**: Confirmation dialog before deletion.
- **Search and Filter**:
  - Real-time search by Name or Email.
  - Dropdown filter by user role (Admin, Editor, Viewer).
- **Additional Features**:
  - Collapsible sidebar with animation.
  - Loading spinner for enhanced user experience.
  - Client-side form validation for required fields.

---

## **Requirements**
The project was built according to the following requirements:
- **BlazeUI**: Used for layout and UI components.
- **jQuery**: For DOM manipulation and event handling.
- **LocalStorage**: To store and manage mock user data.

---

## **File Structure**
```plaintext
/project
├── css/
│   └── style.css            # Main styles
├── scripts/
│   ├── utils/
│   │   ├── constants.js     # Constants for the project
│   │   ├── helper-functions.js # Helper functions
│   │   └── types.js         # Type definitions
│   ├── data.js              # Mock data
│   ├── elements.js          # Cached DOM elements
│   └── index.js             # Main script/logic
└── index.html               # Main HTML page
```

### **Key Files**
- **`constants.js`**:
  - Contains reusable constants for the project.
- **`helper-functions.js`**:
  - Provides reusable utility functions to keep the code modular.
- **`data.js`**:
  - Stores mock data for users.
- **`elements.js`**:
  - Contains cached DOM element references for better performance.
- **`index.js`**:
  - Implements core logic such as search, filtering, pagination, and CRUD operations.

---

## **How to Run the Project**
1. Clone the repository:
   ```bash
   git clone https://<access-token>@github.com/dav55566666/oxalis-games-challenge.git
   ```
2. Navigate to the project directory:
   ```bash
   cd oxalis-games-challenge
   ```
3. Open the project in live server.

---

## **Technologies Used**
- **BlazeUI**: For responsive design and UI components.
- **jQuery**: For dynamic updates and event handling.
- **LocalStorage**: To persist user data across sessions.

---

## **Possible Improvements**
- Add unit tests for key functionality.
- Improve performance for larger datasets by implementing server-side pagination.
- Integrate a backend API for persistent user data storage.
- Enhance the UI with custom styles for a more modern look.

---

## **Conclusion**
This project fulfills the requirements of the task, demonstrating key frontend skills and a modular approach to coding. For further improvements or feedback, feel free to contact me.
"""
