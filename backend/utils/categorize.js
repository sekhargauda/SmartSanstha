// utils/categorize.js
export default function getCategoryFromDOB(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age >= 8 && age <= 13) return 'middle_school';
  else if (age >= 14 && age <= 17) return 'high_school';
  else if (age >= 18 && age <= 21) return 'college_student';
  else return 'advanced_learner';
}
