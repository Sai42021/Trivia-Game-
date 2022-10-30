const highScores = document.querySelector('#highScores');
const highScoresList = JSON.parse('#highScoresList') || [];

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')