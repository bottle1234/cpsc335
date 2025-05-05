# Staybnb - Affordable Getaways for Families

![Staybnb](./Staybnb.jpg)

## Contribution
Group 1 - Equal Contribution

## Vision Statement
Affordable getaways for families to travel and still feel at home.

---

## Features

### Functional Requirements
- **Reservation System**: Users can make or cancel reservations.
- **User Authentication**: Users can create accounts with username and password.
- **Home Listings**: View available homes with availability information.
- **Payment Integration**: Secure transaction processing.
- **Contact Page**: Access company contact details and customer service support.

### Nonfunctional Requirements
- **Security**: 99% of user accounts must be verified and secure.
- **Accessibility**: Compliant with WCAG 2.1 standards.
- **High Availability**: Website uptime must exceed 99%.
- **Performance**: Each page should load in under 2 seconds.
- **Session Management**: Users are automatically logged out after 10 minutes of inactivity.

---

## Project Structure
```
Group1-main/
├── app.py
├── config.py
├── models/
│   ├── cart.py
│   ├── listings.py
│   ├── payment.py
│   ├── review.py
│   ├── user.py
│   └── wishlist.py
├── Dockerfile
├── docker-compose.yml
├── Staybnb.jpg
└── Readme.md
```

---

## Getting Started

### Prerequisites
- Python 3.x
- Docker (optional)

### Installation
1. Clone the repo
```bash
git clone <repo_url>
cd Group1-main
```
2. Install dependencies
```bash
pip install -r requirements.txt
```

### Running the App
```bash
python app.py
```

Or use Docker:
```bash
docker-compose up --build
```

---

## License
THIS PROJECT IS FOR EDUCATIONAL PURPOSES ONLY.

Copyright (c) 2025 CSUF-CPSC362

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


