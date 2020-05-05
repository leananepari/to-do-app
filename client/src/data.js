import { faSun, faPizzaSlice, faBriefcase, faHome, faPlane, faDumbbell, faCheckSquare, faStar } from '@fortawesome/free-solid-svg-icons';

export const user = [
  {
    "name": "User",
    "to-do-list": [
      {
        "id": 0,
        "to-do": "Finalize Presentation",
        "category": "Work",
        "completed": false,
        "important": false
      },
      {
        "id": 1,
        "to-do": "Book flights to Seattle",
        "category": "Travel",
        "completed": false,
        "important": false
      },
      {
        "id": 2,
        "to-do": "Finish design for new website",
        "category": "Work",
        "completed": false,
        "important": true
      },
      {
        "id": 3,
        "to-do": "Get flowers for nana",
        "category": "Family",
        "completed": false,
        "important": false
      }
    ]
  }
]


export const category_icons = {
  "My Day": faSun,
  "Groceries": faPizzaSlice,
  "Work": faBriefcase,
  "Family": faHome,
  "Travel": faPlane,
  "Exercise": faDumbbell,
  "To-Do": faCheckSquare,
  "Important": faStar
}

export const b_g_images = [

]

export const category_lookup = {
  "1": "Groceries",
  "2": "Work",
  "3": "Family",
  "4": "Travel",
  "5": "Exercise",
  "6": "To-do",
  "7": "Important"
}

export const id_lookup = {
  "Groceries": 1,
  "Work": 2,
  "Family": 3,
  "Travel": 4,
  "Exercise": 5,
  "To-do": 6,
  "Important": 7
}