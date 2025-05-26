window.onload = function () {
  emailjs.init("qdRYidf2h7vY3osJH");

  let currentQuestionIndex = 0;
  let faseAtual = 1;
  let respostasPorFase = [];
  let resumosFinais = [];
  let results = [];

  const titleScreen = document.getElementById("title-screen");
  const introScreen = document.getElementById("intro");
  const startBtn = document.getElementById("start-btn");
  const introStartBtn = document.getElementById("intro-start-btn");
  const questionScreen = document.getElementById("question-screen");
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const phaseSummaryScreen = document.getElementById("phase-summary");
  const phaseSummaryText = document.getElementById("phase-summary-text");
  const nextPhaseBtn = document.getElementById("next-phase-btn");
  const resultScreen = document.getElementById("result");
  const finalSummaryText = document.getElementById("final-summary-text");
  const shareWhatsappBtn = document.getElementById("share-whatsapp");
  const copyLinkBtn = document.getElementById("copy-link");
  const sendEmailBtn = document.getElementById("send-email");

  startBtn.onclick = () => {
    titleScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
  };

  introStartBtn.onclick = () => {
    introScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    showQuestion();
  };

  nextPhaseBtn.onclick = () => {
    phaseSummaryScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    showQuestion();
  };

  shareWhatsappBtn.onclick = () => {
    const texto = encodeURIComponent(finalSummaryText.textContent);
    window.open(`https://wa.me/?text=${texto}`, "_blank");
  };

  copyLinkBtn.onclick = () => {
    navigator.clipboard.writeText(finalSummaryText.textContent).then(() => {
      alert("Resumo copiado!");
    });
  };

  sendEmailBtn.onclick = () => {
    emailjs.send("service_j185cn5", "template_hl5w2it", {
      message: gerarRelatorioCompleto(),
      to_email: "luis.9.valverde@gmail.com"
    });
  };

  const questions = [
    {
      question: "1. Qual é a tua fantasia sexual mais secreta?",
      answers: [
        { text: "Ser dominado(a)", value: "submissao" },
        { text: "Dominar o parceiro", value: "dominancia" },
        { text: "Fazer amor em público", value: "exploracao" },
        { text: "Usar vendas ou algemas", value: "fetiche" },
        { text: "Sexo sem tabus", value: "ousadia" }
      ]
    },
    {
      question: "120. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "cumplicidade" },
        { text: "Com espaço e liberdade", value: "cumplicidade" },
        { text: "A crescer juntos", value: "cumplicidade" },
        { text: "Mais intensa sexualmente", value: "cumplicidade" }
      ]
    }
  ];

  function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionEl.textContent = question.question;
    answersEl.innerHTML = "";
    question.answers.forEach(answer => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.onclick = () => handleAnswer(answer.value);
      answersEl.appendChild(button);
    });
  }

  function handleAnswer(value) {
    results.push(value);
    currentQuestionIndex++;
    if (currentQuestionIndex % 20 === 0) {
      showPhaseSummary();
    } else if (currentQuestionIndex === questions.length) {
      showFinalSummary();
    } else {
      showQuestion();
    }
  }

  function showPhaseSummary() {
    questionScreen.classList.add("hidden");
    phaseSummaryScreen.classList.remove("hidden");
    const resumo = "Baseado nas tuas respostas até agora, revelas traços marcantes da tua personalidade íntima.";
    phaseSummaryText.textContent = resumo;
    resumosFinais.push(resumo);
    faseAtual++;
  }

  function showFinalSummary() {
    questionScreen.classList.add("hidden");
    phaseSummaryScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    let finalResumo = "A tua jornada revelou uma alma cheia de desejo e profundidade.

";
    resumosFinais.forEach((r, i) => {
      finalResumo += `Fase ${i + 1}:
${r}

`;
    });
    finalResumo += "Mostraste ser alguém que ama com presença, deseja com intensidade e explora com autenticidade.";
    finalSummaryText.textContent = finalResumo;

    try {
      emailjs.send("service_j185cn5", "template_hl5w2it", {
        message: gerarRelatorioCompleto(),
        to_email: "luis.9.valverde@gmail.com"
      });
    } catch (e) {
      console.error("Erro inesperado:", e);
    }
  }

  function gerarRelatorioCompleto() {
    let relatorio = "Novo resultado do Quiz Confissões a Dois:

";
    for (let i = 0; i < results.length; i++) {
      const pergunta = questions[i].question;
      const respostaIndex = questions[i].answers.findIndex(ans => ans.value === results[i]);
      const respostaTexto = questions[i].answers[respostaIndex]?.text || "[resposta não encontrada]";
      relatorio += `Pergunta ${i + 1}: ${pergunta}
Resposta: ${respostaTexto}

`;
    }
    return relatorio;
  }
};