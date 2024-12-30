document.addEventListener("DOMContentLoaded", (event) => {
  start();
});

async function start() {
  await includeHTML();
  showWelcomeScreen();
  loadActiveUserInitials();
  await loadTasksFromFirebase();
  loadTaskNumbers();
  loadNearestDeadline();
}

function openLegalNotice() {
  window.open("/legal_notice.html", "_blank");
}

function openPrivacyPolice() {
  window.open("/privay_policy.html", "_blank");
}

function loadActiveUserInitials() {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  if (activeUser && typeof activeUser.data.name === "string") {
    const userInitialsElement = document.getElementById("userInitials");
    if (userInitialsElement) {
      userInitialsElement.innerHTML = getInitials(activeUser.data.name);
    } else {
      console.error("Element with ID userInitials not found");
    }
  } else {
    console.error(
      "No active user found in localStorage or name is not a string"
    );
  }
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
}

function openLogIn() {
  window.location.href = "/log_in.html";
}

function loadTaskNumbers() {
  setTaskCount("allTasks", tasks.length);
  setTaskCount("allTasksInBoard", tasks.length);
  setTaskCount("numberDoneTasks",tasks.filter((task) => task.board === "done").length);
  setTaskCount("numberProgressTasks",tasks.filter((task) => task.board === "inProgress").length);
  setTaskCount("numberFeedbackTasks",tasks.filter((task) => task.board === "awaitFeedback").length );
  setTaskCount("numberUrgentTasks",tasks.filter((task) => task.priority === "urgent").length);
}

function setTaskCount(elementId, count) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = count;
  } else {
    console.error(`Element mit ID ${elementId} nicht gefunden`);
  }
}

function loadNearestDeadline() {
  const urgentTasks = tasks.filter((task) => task.priority === "urgent");
  const nearestDeadlineElement = document.getElementById("nearestDeadline");
  const deadlineTextElement = document.getElementById("deadlineText");
  const noDeadlineElement = document.getElementById("noDeadline");

  if (urgentTasks.length === 0) {
    if (nearestDeadlineElement) nearestDeadlineElement.style.display = "none";
    if (deadlineTextElement) deadlineTextElement.style.display = "none";
    if (noDeadlineElement) noDeadlineElement.style.display = "block";
    return;
  }

  if (nearestDeadlineElement) nearestDeadlineElement.style.display = "block";
  if (deadlineTextElement) deadlineTextElement.style.display = "block";
  if (noDeadlineElement) noDeadlineElement.style.display = "none";

  let nearestDate = urgentTasks
    .map((task) => new Date(task.date))
    .sort((a, b) => a - b)[0];
  const options = { year: "numeric", month: "long", day: "numeric" };
  const nearestDeadlineString = nearestDate.toLocaleDateString(
    "en-US",
    options
  );

  if (nearestDeadlineElement) {
    nearestDeadlineElement.textContent = nearestDeadlineString;
  } else {
    console.error("Element für die nächste Frist nicht gefunden");
  }
}
