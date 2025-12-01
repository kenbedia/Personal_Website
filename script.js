// CONSTANTS
const ADMIN_EMAIL = 'ken@gmail.com';
const ADMIN_PASSWORD = 'admin123';
let currentUser = null;
let isDarkMode = false;

// KEN'S DEFAULT PROFILE DATA
const KEN_DEFAULT_PROFILE = {
  name: 'Bedia, Ken Mugot',
  bio: 'Computer Science Student | Aspiring Administrative Officer | Programmer',
  profilePic: 'https://via.placeholder.com/150',
  basicInfo: {
    birthday: 'VI-XVI-MMVI (June 16, 2006)',
    sex: 'Male',
    zodiac: 'Gemini',
    height: '5\'7" or 170cm',
    currentPlace: 'Poblacion, Kapatagan Lanao Del Norte'
  },
  family: {
    mother: 'Bedia, Tessie Mugot',
    father: 'Bedia, Henry Demavivas',
    hometown: ['Iloilo', 'Salvador, Cagayan De Oro', 'Bohol', 'Sapad Lanao Del Norte']
  },
  contact: {
    tm: '+639754521150',
    smart: '+639693338322'
  },
  dreamJobs: [
    'Administrative Officer (Police)',
    'Administrative Aide/Assistant (Municipality/Province)',
    'Desk Officer (Army)'
  ],
  favoriteColors: [
    { name: 'Blue', color: '#2196F3' },
    { name: 'Black', color: '#000000' },
    { name: 'White', color: '#9E9E9E' },
    { name: 'Gray', color: '#757575' }
  ],
  personalityTraits: [
    { name: 'Friendly', description: 'I enjoy meeting new people and building meaningful connections' },
    { name: 'Extroverted', description: 'I thrive in social situations and love engaging with others' },
    { name: 'Helpful', description: 'I\'m always ready to lend a hand to those in need' },
    { name: 'Hardworking', description: 'I\'m dedicated and put my best effort into everything I do' },
    { name: 'Reliable', description: 'People can count on me to follow through on my commitments' },
    { name: 'Optimistic', description: 'I maintain a positive outlook even in challenging situations' },
    { name: 'Empathetic', description: 'I understand and share the feelings of others' },
    { name: 'Disciplined', description: 'I maintain strong self-control and stay focused on my goals' },
    { name: 'Respectful', description: 'I treat everyone with dignity and consideration' },
    { name: 'Adventurous', description: 'I embrace new experiences and love exploring the unknown' }
  ],
  education: [
    {
      level: 'Elementary',
      school: 'Sapad Integrated School',
      location: 'Poblacion, Sapad, Lanao del Norte',
      year: 'S.Y. 2017-2018'
    },
    {
      level: 'Secondary (Junior High)',
      school: 'Saint Joseph Community High School',
      location: 'Poblacion, Sapad, Lanao del Norte',
      year: 'S.Y. 2021-2022'
    },
    {
      level: 'Senior High',
      school: 'Kapatagan National High School',
      location: 'Poblacion, Kapatagan, Lanao del Norte',
      year: 'S.Y. 2023-2024',
      course: 'Strand: Humanities and Social Sciences'
    },
    {
      level: 'Tertiary',
      school: 'Christ The King College de Maranding, Inc.',
      location: 'Maranding, Lala, Lanao del Norte',
      year: 'A.Y. 2025-2026',
      course: 'Course: Bachelor of Science in Computer Science'
    }
  ],
  interests: [
    { icon: '♪', name: 'Music', description: 'I enjoy listening to various genres and discovering new artists' },
    { icon: '✎', name: 'Drawing', description: 'I express my creativity through art and sketching' },
    { icon: '▶', name: 'Gaming', description: 'I love playing video games in my free time' },
    { icon: '♥', name: 'Pet Lover', description: 'I have a special love for dogs, cats, and birds' },
    { icon: '✈', name: 'Travelling', description: 'I dream of visiting mountains and beaches across the Philippines' },
    { icon: '★', name: 'Entertainment', description: 'I enjoy watching drama series and movies, especially Sci-fi, Action, Fantasy, Animation, and War genres' },
    { icon: '☺', name: 'Socializing', description: 'I cherish spending quality time with friends and family' },
    { icon: '♫', name: 'Dancing', description: 'I enjoy dancing in my free time as a form of expression' },
    { icon: '◉', name: 'Exploration', description: 'I\'m curious about different foods and cultures throughout the Philippines' }
  ]
};

// LOCAL STORAGE FUNCTIONS
function loadUsers() {
  const users = localStorage.getItem('devProfileUsers');
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem('devProfileUsers', JSON.stringify(users));
}

function loadMessages() {
  const messages = localStorage.getItem('userMessages');
  return messages ? JSON.parse(messages) : [];
}

function saveMessages(messages) {
  localStorage.setItem('userMessages', JSON.stringify(messages));
}

function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
  currentUser = user;
}

function updateUserInStorage(updatedUser) {
  const users = loadUsers();
  const index = users.findIndex(u => u.email === updatedUser.email);
  if (index !== -1) {
    users[index] = updatedUser;
    saveUsers(users);
    setCurrentUser(updatedUser);
  }
}

// VALIDATION FUNCTIONS
function validateEmail(email) {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

// PAGE NAVIGATION FUNCTIONS
function showLogin() {
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('signupPage').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('active');
}

function showSignup() {
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('signupPage').classList.remove('hidden');
  document.getElementById('mainApp').classList.remove('active');
}

function showMainApp() {
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('signupPage').classList.add('hidden');
  document.getElementById('mainApp').classList.add('active');
  updateMainAppUI();
  renderProfilePage();
}

// UI UPDATE FUNCTIONS
function updateMainAppUI() {
  if (!currentUser) return;
  
  document.getElementById('sidebarUserName').textContent = currentUser.name;
  document.getElementById('sidebarUserEmail').textContent = currentUser.email;
  
  document.getElementById('settingsName').textContent = currentUser.name;
  document.getElementById('settingsEmail').textContent = currentUser.email;
  document.getElementById('settingsRole').textContent = currentUser.isAdmin ? 'Admin' : 'User';
  
  if (currentUser.isAdmin) {
    document.getElementById('viewUsersNav').style.display = 'flex';
    document.getElementById('viewMessagesNav').style.display = 'flex';
    document.getElementById('sendMessageNav').style.display = 'none';
  } else {
    document.getElementById('viewUsersNav').style.display = 'none';
    document.getElementById('viewMessagesNav').style.display = 'none';
    document.getElementById('sendMessageNav').style.display = 'flex';
  }
  
  if (currentUser.profilePic) {
    document.getElementById('sidebarProfilePic').src = currentUser.profilePic;
  }
}

// RENDER PROFILE PAGE
function renderProfilePage() {
  if (!currentUser) return;
  
  if (currentUser.isAdmin) {
    // Show Ken's profile
    renderKenProfile();
  } else {
    // Show user's own profile
    renderUserProfile();
  }
}

function renderKenProfile() {
  document.getElementById('profilePageTitle').textContent = 'Developer Profile';
  document.getElementById('profileSubtitle').textContent = KEN_DEFAULT_PROFILE.bio;
  document.getElementById('mainProfilePic').src = KEN_DEFAULT_PROFILE.profilePic;
  document.getElementById('profileName').textContent = KEN_DEFAULT_PROFILE.name;
  document.getElementById('profileBio').textContent = KEN_DEFAULT_PROFILE.bio;
  
  const profileGrid = document.getElementById('profileGridContainer');
  profileGrid.innerHTML = `
    <div class="card">
      <div class="card-header">BASIC INFO</div>
      <div class="card-body">
        <p><strong>Birthday:</strong> ${KEN_DEFAULT_PROFILE.basicInfo.birthday}</p>
        <p><strong>Sex:</strong> ${KEN_DEFAULT_PROFILE.basicInfo.sex}</p>
        <p><strong>Zodiac:</strong> ${KEN_DEFAULT_PROFILE.basicInfo.zodiac}</p>
        <p><strong>Height:</strong> ${KEN_DEFAULT_PROFILE.basicInfo.height}</p>
        <p><strong>Current Place:</strong> ${KEN_DEFAULT_PROFILE.basicInfo.currentPlace}</p>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">FAMILY</div>
      <div class="card-body">
        <p><strong>Mother:</strong> ${KEN_DEFAULT_PROFILE.family.mother}</p>
        <p><strong>Father:</strong> ${KEN_DEFAULT_PROFILE.family.father}</p>
        <p><strong>Hometown:</strong></p>
        ${KEN_DEFAULT_PROFILE.family.hometown.map(h => `<p>• ${h}</p>`).join('')}
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">CONTACT</div>
      <div class="card-body">
        <p><strong>TM:</strong> ${KEN_DEFAULT_PROFILE.contact.tm}</p>
        <p><strong>SMART:</strong> ${KEN_DEFAULT_PROFILE.contact.smart}</p>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">DREAM JOBS</div>
      <div class="card-body">
        ${KEN_DEFAULT_PROFILE.dreamJobs.map(job => `<p>• ${job}</p>`).join('')}
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">FAVOURITE COLORS</div>
      <div class="card-body">
        ${KEN_DEFAULT_PROFILE.favoriteColors.map(c => `<p><span style="color: ${c.color};">●</span> ${c.name}</p>`).join('')}
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">PERSONALITY TRAITS</div>
      <div class="card-body">
        ${KEN_DEFAULT_PROFILE.personalityTraits.map(t => `<p>✓ <strong>${t.name}:</strong> ${t.description}</p>`).join('')}
      </div>
    </div>
  `;
  
  profileGrid.innerHTML += `
    <div class="card" style="grid-column: 1 / -1;">
      <div class="card-header">EDUCATIONAL BACKGROUND</div>
      <div class="card-body">
        ${KEN_DEFAULT_PROFILE.education.map(edu => `
          <p><strong>${edu.level}:</strong></p>
          <p>${edu.school}</p>
          <p>${edu.location}</p>
          <p>${edu.year}</p>
          ${edu.course ? `<p>${edu.course}</p>` : ''}
          <br>
        `).join('')}
      </div>
    </div>
    
    <div class="card" style="grid-column: 1 / -1;">
      <div class="card-header">MY INTERESTS</div>
      <div class="card-body">
        ${KEN_DEFAULT_PROFILE.interests.map(i => `<p>${i.icon} <strong>${i.name}:</strong> ${i.description}</p>`).join('')}
      </div>
    </div>
  `;
}

function renderUserProfile() {
  document.getElementById('profilePageTitle').textContent = 'My Profile';
  document.getElementById('profileSubtitle').textContent = currentUser.bio || 'Your personal profile';
  document.getElementById('mainProfilePic').src = currentUser.profilePic;
  document.getElementById('profileName').textContent = currentUser.name;
  document.getElementById('profileBio').textContent = currentUser.bio || 'No bio yet';
  
  const profileGrid = document.getElementById('profileGridContainer');
  profileGrid.innerHTML = `
    <div class="card">
      <div class="card-header">BASIC INFO</div>
      <div class="card-body">
        <p><strong>Name:</strong> ${currentUser.name}</p>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        ${currentUser.contact ? `<p><strong>Contact:</strong> ${currentUser.contact}</p>` : ''}
      </div>
    </div>
    
    ${currentUser.instagram || currentUser.tiktok || currentUser.twitter ? `
    <div class="card">
      <div class="card-header">SOCIAL MEDIA</div>
      <div class="card-body">
        ${currentUser.instagram ? `<p><strong>Instagram:</strong> ${currentUser.instagram}</p>` : ''}
        ${currentUser.tiktok ? `<p><strong>TikTok:</strong> ${currentUser.tiktok}</p>` : ''}
        ${currentUser.twitter ? `<p><strong>Twitter:</strong> ${currentUser.twitter}</p>` : ''}
      </div>
    </div>
    ` : ''}
    
    ${currentUser.interests ? `
    <div class="card" style="grid-column: 1 / -1;">
      <div class="card-header">MY INTERESTS</div>
      <div class="card-body">
        <p>${currentUser.interests}</p>
      </div>
    </div>
    ` : ''}
  `;
}

// LOGIN FORM
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  
  document.getElementById('loginEmailError').classList.remove('show');
  document.getElementById('loginPasswordError').classList.remove('show');
  
  if (!validateEmail(email)) {
    document.getElementById('loginEmailError').classList.add('show');
    return;
  }
  
  if (!validatePassword(password)) {
    document.getElementById('loginPasswordError').classList.add('show');
    return;
  }
  
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    setCurrentUser({
      name: 'Ken Mugot Bedia',
      email: ADMIN_EMAIL,
      isAdmin: true,
      profilePic: KEN_DEFAULT_PROFILE.profilePic
    });
    showMainApp();
    return;
  }
  
  const users = loadUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    setCurrentUser(user);
    showMainApp();
  } else {
    alert('Invalid email or password!');
  }
});

// SIGNUP FORM
document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const profilePicFile = document.getElementById('signupProfilePic').files[0];
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const contact = document.getElementById('signupContact').value.trim();
  const instagram = document.getElementById('signupInstagram').value.trim();
  const tiktok = document.getElementById('signupTiktok').value.trim();
  const twitter = document.getElementById('signupTwitter').value.trim();
  const interests = document.getElementById('signupInterests').value.trim();
  
  document.getElementById('signupEmailError').classList.remove('show');
  document.getElementById('signupPasswordError').classList.remove('show');
  
  if (!profilePicFile) {
    alert('⚠️ Please upload a profile picture!');
    return;
  }
  
  if (!name) {
    alert('⚠️ Please enter your full name!');
    return;
  }
  
  if (!validateEmail(email)) {
    document.getElementById('signupEmailError').classList.add('show');
    document.getElementById('signupEmail').classList.add('error');
    return;
  }
  
  if (!validatePassword(password)) {
    document.getElementById('signupPasswordError').classList.add('show');
    document.getElementById('signupPassword').classList.add('error');
    return;
  }
  
  const users = loadUsers();
  if (users.find(u => u.email === email)) {
    alert('⚠️ Email already registered!');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(event) {
    const profilePic = event.target.result;
    const newUser = {
      name,
      email,
      password,
      profilePic,
      bio: null,
      contact: contact || null,
      instagram: instagram || null,
      tiktok: tiktok || null,
      twitter: twitter || null,
      interests: interests || null,
      isAdmin: false,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    alert('✅ Account created successfully! Please log in.');
    showLogin();
    document.getElementById('loginEmail').value = email;
    document.getElementById('signupForm').reset();
    document.getElementById('signupProfilePreview').src = 'https://via.placeholder.com/100';
  };
  reader.readAsDataURL(profilePicFile);
});

// PROFILE PICTURE PREVIEW
document.getElementById('signupProfilePic').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById('signupProfilePreview').src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// EMAIL AND PASSWORD INPUT HANDLERS
document.getElementById('signupEmail').addEventListener('input', function() {
  this.classList.remove('error');
  document.getElementById('signupEmailError').classList.remove('show');
});

document.getElementById('signupPassword').addEventListener('input', function() {
  this.classList.remove('error');
  document.getElementById('signupPasswordError').classList.remove('show');
});

// LOGOUT FUNCTION
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('currentUser');
    currentUser = null;
    showLogin();
  }
}

// NAVIGATION
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    const page = this.dataset.page;
    
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
    
    document.querySelectorAll('.content-page').forEach(p => p.classList.add('hidden'));
    
    if (page === 'profile') {
      document.getElementById('profilePage').classList.remove('hidden');
      renderProfilePage();
    } else if (page === 'users') {
      document.getElementById('usersPage').classList.remove('hidden');
      loadUsersList();
    } else if (page === 'messages') {
      document.getElementById('messagesPage').classList.remove('hidden');
      loadMessagesList();
    } else if (page === 'settings') {
      document.getElementById('settingsPage').classList.remove('hidden');
      loadEditProfileForm();
    } else if (page === 'sendmessage') {
      document.getElementById('sendMessagePage').classList.remove('hidden');
    }
  });
});

// LOAD USERS LIST (ADMIN ONLY)
function loadUsersList() {
  const users = loadUsers();
  const container = document.getElementById('usersList');
  
  if (users.length === 0) {
    container.innerHTML = '<div class="card"><div class="card-body" style="text-align: center; padding: 40px;"><p>No users registered yet.</p></div></div>';
    return;
  }
  
  container.innerHTML = users.map(user => `
    <div class="user-card">
      <img src="${user.profilePic}" alt="${user.name}" class="user-avatar">
      <div class="user-info" style="flex: 1;">
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Password:</strong> ${user.password}</p>
        ${user.bio ? `<p><strong>Bio:</strong> ${user.bio}</p>` : ''}
        ${user.contact ? `<p><strong>Contact:</strong> ${user.contact}</p>` : ''}
        ${user.instagram ? `<p><strong>Instagram:</strong> ${user.instagram}</p>` : ''}
        ${user.tiktok ? `<p><strong>TikTok:</strong> ${user.tiktok}</p>` : ''}
        ${user.twitter ? `<p><strong>Twitter:</strong> ${user.twitter}</p>` : ''}
        ${user.interests ? `<p><strong>Interests:</strong> ${user.interests}</p>` : ''}
        <p style="font-size: 11px; color: var(--text-muted); margin-top: 5px;">
          <strong>Joined:</strong> ${new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
      <button onclick="deleteUser('${user.email}')" class="btn btn-primary" style="background: #c62828; padding: 8px 16px; width: auto;">Delete</button>
    </div>
  `).join('');
}

// LOAD MESSAGES LIST (ADMIN ONLY)
function loadMessagesList() {
  const messages = loadMessages();
  const container = document.getElementById('messagesList');
  
  if (messages.length === 0) {
    container.innerHTML = '<div class="card"><div class="card-body" style="text-align: center; padding: 40px;"><p>No messages from users yet.</p></div></div>';
    return;
  }
  
  container.innerHTML = messages.map((msg, index) => `
    <div class="message-card">
      <div class="message-header">
        <img src="${msg.userProfilePic}" alt="${msg.userName}" class="message-avatar">
        <div class="message-user" style="flex: 1;">
          <h3>${msg.userName}</h3>
          <p>${msg.userEmail} • Sent: ${new Date(msg.sentAt).toLocaleString()}</p>
        </div>
        <button onclick="deleteMessage(${index})" class="btn btn-primary" style="background: #c62828; padding: 8px 16px; width: auto;">Delete</button>
      </div>
      <div class="message-body">
        <h4>📋 Subject:</h4>
        <p style="font-weight: 600; color: var(--maroon-primary);">${msg.subject}</p>
        <h4>💬 Message:</h4>
        <p>${msg.content}</p>
      </div>
    </div>
  `).join('');
}

// DELETE MESSAGE
function deleteMessage(index) {
  if (!currentUser || !currentUser.isAdmin) {
    alert('Admin access required!');
    return;
  }
  if (confirm('Delete this message permanently?')) {
    let messages = loadMessages();
    messages.splice(index, 1);
    saveMessages(messages);
    loadMessagesList();
    alert('✅ Message deleted successfully!');
  }
}

// DELETE USER
function deleteUser(email) {
  if (!currentUser || !currentUser.isAdmin) {
    alert('Admin access required!');
    return;
  }
  if (confirm('Delete this user permanently?')) {
    let users = loadUsers();
    users = users.filter(u => u.email !== email);
    saveUsers(users);
    loadUsersList();
    alert('✅ User deleted successfully!');
  }
}

// SEND MESSAGE FORM
document.getElementById('sendMessageForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const subject = document.getElementById('messageSubject').value.trim();
  const content = document.getElementById('messageContent').value.trim();
  
  if (!subject || !content) {
    alert('⚠️ Please fill in all fields!');
    return;
  }
  
  const messages = loadMessages();
  const newMessage = {
    userName: currentUser.name,
    userEmail: currentUser.email,
    userProfilePic: currentUser.profilePic,
    subject: subject,
    content: content,
    sentAt: new Date().toISOString()
  };
  
  messages.push(newMessage);
  saveMessages(messages);
  
  alert('✅ Message sent successfully to Ken!');
  document.getElementById('sendMessageForm').reset();
});

// LOAD EDIT PROFILE FORM
function loadEditProfileForm() {
  if (!currentUser) return;
  
  document.getElementById('editBio').value = currentUser.bio || '';
  document.getElementById('editContact').value = currentUser.contact || '';
  document.getElementById('editInstagram').value = currentUser.instagram || '';
  document.getElementById('editTiktok').value = currentUser.tiktok || '';
  document.getElementById('editTwitter').value = currentUser.twitter || '';
  document.getElementById('editInterests').value = currentUser.interests || '';
}

// EDIT PROFILE FORM
document.getElementById('editProfileForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const profilePicFile = document.getElementById('editProfilePic').files[0];
  const bio = document.getElementById('editBio').value.trim();
  const contact = document.getElementById('editContact').value.trim();
  const instagram = document.getElementById('editInstagram').value.trim();
  const tiktok = document.getElementById('editTiktok').value.trim();
  const twitter = document.getElementById('editTwitter').value.trim();
  const interests = document.getElementById('editInterests').value.trim();
  
  if (profilePicFile) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const updatedUser = {
        ...currentUser,
        profilePic: event.target.result,
        bio: bio || null,
        contact: contact || null,
        instagram: instagram || null,
        tiktok: tiktok || null,
        twitter: twitter || null,
        interests: interests || null
      };
      
      updateUserInStorage(updatedUser);
      updateMainAppUI();
      renderProfilePage();
      alert('✅ Profile updated successfully!');
    };
    reader.readAsDataURL(profilePicFile);
  } else {
    const updatedUser = {
      ...currentUser,
      bio: bio || null,
      contact: contact || null,
      instagram: instagram || null,
      tiktok: tiktok || null,
      twitter: twitter || null,
      interests: interests || null
    };
    
    updateUserInStorage(updatedUser);
    updateMainAppUI();
    renderProfilePage();
    alert('✅ Profile updated successfully!');
  }
});

// HAMBURGER MENU
document.getElementById('menuToggle').addEventListener('click', function() {
  document.getElementById('sidebar').classList.toggle('sidebar-hidden');
});

// DARK MODE TOGGLE
document.getElementById('darkModeToggle').addEventListener('click', function() {
  isDarkMode = !isDarkMode;
  document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  document.getElementById('themeText').textContent = isDarkMode ? 'Light' : 'Dark';
  localStorage.setItem('darkMode', isDarkMode);
});

// INITIALIZATION
function init() {
  currentUser = getCurrentUser();
  if (currentUser) {
    showMainApp();
  } else {
    showLogin();
  }
  
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    isDarkMode = true;
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('themeText').textContent = 'Light';
  }
}

init();