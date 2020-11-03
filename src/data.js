import sun_icon from './assets/sun-icon.svg';
import home_icon from './assets/home-icon.svg';
import star_icon from './assets/star-icon.svg';
import calendar_icon from './assets/calendar-icon.svg';

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
  "My Day": sun_icon,
  "Tasks": home_icon,
  "Important": star_icon,
  "Planned": calendar_icon
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


export const list_example = [
  {
    "name": "books to read",
    "items": [
      {"id": 1, "description": "Book 1"},
      {"id": 2, "description": "Book 2"},
      {"id": 2, "description": "Book 3"},
      {"id": 2, "description": "Book 4"},
      {"id": 2, "description": "Book 5"},
      {"id": 2, "description": "Book 6"},
    ]
  }
]