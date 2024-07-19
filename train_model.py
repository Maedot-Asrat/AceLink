import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import json

# Load the dataset
data = pd.read_csv('historical_matches.csv')

# Preprocess the data
def preprocess(row):
    student_prefs = json.loads(row['student_preferences'].replace("'", '"'))
    tutor_attrs = json.loads(row['tutor_attributes'].replace("'", '"'))
    
    # Flatten the student preferences and tutor attributes into a single dictionary
    return {
        **student_prefs,
        **tutor_attrs,
        'subjects': ','.join(tutor_attrs.get('subjects', []))  # Convert list to comma-separated string
    }

# Apply preprocessing
data_processed = data.apply(preprocess, axis=1, result_type='expand')
data_processed['matched'] = data['matched']

# Convert categorical features to numerical using one-hot encoding
data_encoded = pd.get_dummies(data_processed, columns=['learningGoals', 'currentLevel', 'subjects'])

# Split the data into features and target
X = data_encoded.drop('matched', axis=1)
y = data_encoded['matched']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'tutor_matching_model.pkl')

print('Model trained and saved successfully.')
