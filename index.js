
const form = document.getElementById('studentForm');
const tableBody = document.querySelector('#studentTable tbody');

let students = JSON.parse(localStorage.getItem('students')) || [];


function renderStudents() {
  tableBody.innerHTML = ''; 

  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
      <td>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

 
  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      deleteStudent(index);
    });
  });
}


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('studentName').value.trim();
  const id = document.getElementById('studentID').value.trim();
  const email = document.getElementById('studentCollegeEmail').value.trim();
  const course = document.getElementById('studentCourse').value.trim();


  if (!name || !id || !email || !course) {
    alert('Please fill in all fields.');
    return;
  }


  const newStudent = { name, id, email, course };
  students.push(newStudent);

  
  localStorage.setItem('students', JSON.stringify(students));


  form.reset();
  renderStudents();
});


function deleteStudent(index) {
  if (confirm('Are you sure you want to delete this student?')) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
  }
}


renderStudents();

