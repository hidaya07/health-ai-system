import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# 1. Load dataset
data = pd.read_csv("dataset.csv")

# 2. Split features (X) and target (y)
X = data.drop("malaria", axis=1)
y = data["malaria"]

# 3. Split into training and testing data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# 4. Create ML model
model = RandomForestClassifier(n_estimators=100)

# 5. Train model
model.fit(X_train, y_train)

# 6. Test accuracy
accuracy = model.score(X_test, y_test)
print("Model Accuracy:", accuracy)

# 7. Save trained model
joblib.dump(model, "malaria_model.pkl")

print("Model trained and saved successfully 🚀")