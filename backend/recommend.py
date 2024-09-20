from pymongo import MongoClient
import random
from bson import ObjectId  # Import ObjectId for generating unique MongoDB IDs
import bcrypt  # Import bcrypt for password hashing

# 1. Define Sample Data for Students

def generate_student_data(num_students=500):
    learning_styles = ["Visual", "Auditory", "Kinesthetic"]
    subject_interests = ["Math", "Science", "History", "English", "Art", "Music", "Geography", "Computer Science", "Physical Education"]
    languages = ["English", "Spanish", "French", "Mandarin", "German", "Arabic", "Swahili"]
    study_habits = ["Regular", "Irregular", "Cramming"]
    extracurricular_activities = ["Football", "Basketball", "Music", "Art", "Drama", "Robotics", "Debate"]
    gender_preferences = ["No preference", "Male", "Female"]

    students = []
    users = []  # List to store user records for students

    for i in range(num_students):
        username = f"student_{i+1000}"
        email = f"student{i+1}@example.com"
        password = bcrypt.hashpw(f"password{i+1}".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')  # Hash the password
        role = "Student"

        student = {
            "username": username,
            "email": email,
            "profile": {
                "grade_level": str(random.randint(1, 12)),
                "learning_style": random.choice(learning_styles),
                "age": random.randint(7, 18),
                "subject_interests": random.sample(subject_interests, k=random.randint(2, 5)),
                "availability": {
                    random.choice(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]): 
                    [f"{random.randint(8, 15)}:00-{random.randint(16, 20)}:00" for _ in range(random.randint(1, 3))],
                    random.choice(["Saturday", "Sunday"]): 
                    [f"{random.randint(8, 12)}:00-{random.randint(13, 18)}:00" for _ in range(random.randint(1, 2))]
                },
                "preferred_language": random.choice(languages),
                "goals": random.choice(["Improve math skills", "Learn a new language", "Prepare for exams", "Enhance creative writing"]),
                "current_needs": random.choice(["Help with algebra", "Understanding scientific concepts", "Homework assistance", "Exam preparation"]),
                "profile_picture": f"profile_{i+1}.jpg",
                "parent_contact": {
                    "name": f"Parent_{i+1}",
                    "email": f"parent{i+1}@example.com",
                    "phone": f"+1234567890{i+1}"
                },
                "feedback": [
                    {
                        "tutor_id": ObjectId(),  # Generate a unique ObjectId for tutor_id
                        "rating": random.randint(1, 5),
                        "comments": random.choice(["Good tutor!", "Very helpful.", "Not satisfied.", "Excellent tutoring."])
                    }
                ],
                "study_habits": random.choice(study_habits),
                "extracurricular_activities": random.sample(extracurricular_activities, k=random.randint(1, 3)),
                "health_considerations": random.choice(["None", "Asthma", "Dyslexia", "ADHD"]),
                "language_proficiency": {random.choice(languages): random.choice(["Fluent", "Intermediate", "Basic"])},
                "gender_preference": random.choice(gender_preferences)
            }
        }

        user = {
            "_id": ObjectId(),  # Generate a unique ObjectId for each user
            "username": username,
            "password": password,
            "email": email,
            "role": role,
            "__v": 0
        }

        students.append(student)
        users.append(user)
    
    return students, users

# 2. Define Sample Data for Tutors

def generate_tutor_data(num_tutors=500):
    subject_expertise = ["Math", "Science", "History", "English", "Art", "Music", "Geography", "Computer Science", "Physical Education"]
    grade_levels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    teaching_styles = ["Lecture", "Interactive", "Hands-on", "Project-based", "Socratic"]
    languages_spoken = ["English", "Spanish", "French", "Mandarin", "German", "Arabic", "Swahili"]
    specialization_areas = ["Algebra", "Geometry", "Physics", "Chemistry", "Literature", "Programming", "Art History"]
    certifications = ["Certified Math Tutor", "Certified Science Tutor", "TESOL Certification", "Special Education Certification"]

    tutors = []
    users = []  # List to store user records for tutors

    for i in range(num_tutors):
        username = f"tutor_{i+1000}"
        email = f"tutor{i+1}@example.com"
        password = bcrypt.hashpw(f"password{i+1}".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')  # Hash the password
        role = "Tutor"

        tutor = {
            "username": username,
            "email": email,
            "profile": {
                "subject_expertise": random.sample(subject_expertise, k=random.randint(2, 5)),
                "fee": [random.randint(20, 100) for _ in range(random.randint(1, 3))],
                "grade_levels": random.sample(grade_levels, k=random.randint(3, 8)),
                "teaching_style": random.choice(teaching_styles),
                "availability": {
                    random.choice(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]): 
                    [f"{random.randint(8, 15)}:00-{random.randint(16, 20)}:00" for _ in range(random.randint(1, 3))],
                    random.choice(["Saturday", "Sunday"]): 
                    [f"{random.randint(8, 12)}:00-{random.randint(13, 18)}:00" for _ in range(random.randint(1, 2))]
                },
                "languages_spoken": random.sample(languages_spoken, k=random.randint(1, 4)),
                "experience": random.randint(1, 20),
                "qualifications": random.choice(["Bachelor's in Education", "Master's in Education", "PhD in subject specialty"]),
                "profile_picture": f"profile_{i+1}.jpg",
                "specialization_areas": random.sample(specialization_areas, k=random.randint(1, 3)),
                "certifications": random.sample(certifications, k=random.randint(1, 3)),
                "performance_metrics": {
                    "average_improvement": f"{random.uniform(0.1, 2.0):.1f} GPA",
                    "student_retention": f"{random.randint(60, 100)}%"
                },
                "availability_time_zone": random.choice(["GMT+3", "GMT-5", "GMT+1", "GMT+8"]),
                "tutoring_approach": random.choice(["Personalized learning plans", "Focus on practical applications", "Holistic learning", "Skill-based learning"]),
                "past_student_outcomes": [
                    {
                        "student_id": ObjectId(),  # Generate a unique ObjectId for student_id
                        "improvement": random.choice(["Improved from B to A", "Passed a difficult exam", "Developed a new skill", "Gained confidence in subject"])
                    }
                ],
                "professional_development": random.choice(["Attended tutoring conference 2023", "Completed advanced tutor training", "Published educational articles"]),
                "personal_interests": random.sample(["Reading", "Traveling", "Cooking", "Sports", "Photography"], k=random.randint(1, 3))
            },
            "requests": [],
            "ratings": [
                {
                    "student_id": ObjectId(),  # Generate a unique ObjectId for student_id
                    "score": random.randint(1, 5),
                    "comment": random.choice(["Excellent tutor!", "Good experience", "Needs improvement", "Highly recommended"]),
                    "date": random.choice([f"2024-08-{day}" for day in range(1, 31)])  # Random date in August 2024
                }
            ],
            "average_rating": round(random.uniform(2.5, 5.0), 1)  # Average rating score
        }

        user = {
            "_id": ObjectId(),  # Generate a unique ObjectId for each user
            "username": username,
            "password": password,
            "email": email,
            "role": role,
            "__v": 0
        }

        tutors.append(tutor)
        users.append(user)
    
    return tutors, users

# 3. Insert Sample Data into MongoDB

# 3. Insert Sample Data into MongoDB

def insert_sample_data():
    client = MongoClient("mongodb+srv://fenutigist:D97yeVyg41Gobjb9@cluster0.dnkfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client["test"]

    # Generate and insert Students and Users
    students, student_users = generate_student_data()
    db.students.insert_many(students)
    db.users.insert_many(student_users)
    print("Inserted sample students data and users for students.")

    # Generate and insert Tutors and Users
    tutors, tutor_users = generate_tutor_data()
    db.tutors.insert_many(tutors)
    db.users.insert_many(tutor_users)
    print("Inserted sample tutors data and users for tutors.")

if __name__ == "__main__":
    insert_sample_data()

