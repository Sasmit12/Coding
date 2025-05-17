firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  // Get mentor's name from Firestore
  firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
    if (!doc.exists) {
      alert('User profile not found!');
      return;
    }
    const mentorName = doc.data().name;

    const sessionForm = document.getElementById('sessionForm');
    const sessionStatus = document.getElementById('sessionStatus');
    if (sessionForm) {
      sessionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const date = document.getElementById('session-date').value;
        const topic = document.getElementById('session-topic').value.trim();
        const duration = Number(document.getElementById('session-duration').value);

        // Add session to Firestore
        firebase.firestore().collection('sessions').add({
          mentorId: user.uid,
          mentorName: mentorName,
          date: date,
          duration: duration,
          topic: topic,
          status: "pending", // default status
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
          sessionStatus.textContent = "Session logged for review!";
          sessionForm.reset();
        }).catch(err => {
          sessionStatus.textContent = "Error logging session: " + err.message;
        });
      });
    }
  });
});