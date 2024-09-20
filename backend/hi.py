import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient

# 1. Extract Relevant Features from Students and Tutors
def get_student_features(student):
    return {
        'grade_level': student['profile'][0]['grade_level'],
        'learning_style': student['profile']['learning_style'],
        'subject_interests': ' '.join(student['profile']['subject_interests']),
        'preferred_language': student['profile']['preferred_language'],
        'availability': ' '.join(student['profile']['availability'].keys()),
        'study_habits': student['profile']['study_habits'],
        'extracurricular_activities': ' '.join(student['profile']['extracurricular_activities']),
        'gender_preference': student['profile']['gender_preference']
    }

def get_tutor_features(tutor):
    return {
        'subject_expertise': ' '.join(tutor['profile']['subject_expertise']),
        'grade_levels': ' '.join(tutor['profile']['grade_levels']),
        'teaching_style': tutor['profile']['teaching_style'],
        'languages_spoken': ' '.join(tutor['profile']['languages_spoken']),
        'availability': ' '.join(tutor['profile']['availability'].keys()),
        'specialization_areas': ' '.join(tutor['profile']['specialization_areas']),
        'certifications': ' '.join(tutor['profile']['certifications']),
        'tutoring_approach': tutor['profile']['tutoring_approach']
    }

# 2. Prepare Data for Similarity Calculation
def prepare_data(students, tutors):
    student_features = [get_student_features(s) for s in students]
    tutor_features = [get_tutor_features(t) for t in tutors]

    student_df = pd.DataFrame(student_features)
    tutor_df = pd.DataFrame(tutor_features)

    return student_df, tutor_df

# 3. Compute Cosine Similarity for Recommendations
def compute_similarity(student_df, tutor_df):
    vectorizer = CountVectorizer().fit(student_df.values.ravel() + tutor_df.values.ravel())
    
    # Transform features to vectors
    student_matrix = vectorizer.transform(student_df.astype(str).agg(' '.join, axis=1))
    tutor_matrix = vectorizer.transform(tutor_df.astype(str).agg(' '.join, axis=1))

    # Calculate cosine similarity
    similarities = cosine_similarity(student_matrix, tutor_matrix)
    
    return similarities

# 4. Generate Tutor Recommendations for Each Student
def recommend_tutors(students, tutors, num_recommendations=3):
    student_df, tutor_df = prepare_data(students, tutors)
    similarity_matrix = compute_similarity(student_df, tutor_df)

    recommendations = {}
    for i, student in enumerate(students):
        similar_indices = similarity_matrix[i].argsort()[-num_recommendations:][::-1]
        recommended_tutors = [tutors[idx] for idx in similar_indices]
        recommendations[student['username']] = recommended_tutors
    
    return recommendations

# 5. Integrate with MongoDB
def fetch_data_from_db():
    client = MongoClient("mongodb+srv://fenutigist:D97yeVyg41Gobjb9@cluster0.dnkfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client["test"]
    students = list(db.students.find())
    tutors = list(db.tutors.find())
    print(students[0])  # Print the first student to check its structure
    print(tutors[0])    # Print the first tutor to check its structure
    return students, tutors


# 6. Run Recommendation System and Test for a Specific Student
def run_recommendation_system(specific_student_username=None):
    students, tutors = fetch_data_from_db()
    recommendations = recommend_tutors(students, tutors)

    if specific_student_username:
        # Find the specific student in the recommendations
        if specific_student_username in recommendations:
            print(f"Top recommendations for {specific_student_username}:")
            for tutor in recommendations[specific_student_username]:
                print(f"  - {tutor['username']} (Subjects: {', '.join(tutor['profile']['subject_expertise'])})")
        else:
            print(f"Student with username '{specific_student_username}' not found.")
    else:
        # Display recommendations for all students
        for student, tutor_recommendations in recommendations.items():
            print(f"Top recommendations for {student}:")
            for tutor in tutor_recommendations:
                print(f"  - {tutor['username']} (Subjects: {', '.join(tutor['profile']['subject_expertise'])})")

if __name__ == "__main__":
    # You can specify the username of the student you want to test
    run_recommendation_system(specific_student_username="student_1")
