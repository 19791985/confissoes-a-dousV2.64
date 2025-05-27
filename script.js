window.onload = function () {
  // Inicialização do EmailJS
  emailjs.init("qdRYidf2h7vY3osJH");

  // Variáveis principais
  let currentQuestionIndex = 0;
  let faseAtual = 1;
  let respostasPorFase = [];
  let resumosFinais = [];
  let results = [];

  // Seletores de elementos
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

  // Botões e eventos
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

  // PERGUNTAS DO QUI
  
  const questions = [

    {
      question: "1. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "2. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "3. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "4. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "5. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "6. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "7. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "8. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "9. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "10. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "11. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "12. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "13. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "14. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "15. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "16. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "17. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "18. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "19. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "20. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "21. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "22. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "23. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "24. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "25. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "26. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "27. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "28. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "29. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "30. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "31. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "32. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "33. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "34. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "35. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "36. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "37. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "38. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "39. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "40. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "41. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "42. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "43. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "44. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "45. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "46. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "47. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "48. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "49. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "50. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "51. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "52. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "53. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "54. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "55. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "56. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "57. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "58. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "59. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "60. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "61. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "62. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "63. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "64. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "65. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "66. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "67. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "68. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "69. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "70. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "71. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "72. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "73. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "74. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "75. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "76. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "77. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "78. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "79. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "80. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "81. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "82. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "83. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "84. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "85. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "86. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "87. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "88. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "89. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "90. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "91. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "92. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "93. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "94. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "95. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "96. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "97. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "98. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "99. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "100. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "101. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "102. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "103. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "104. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "105. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "106. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "107. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "108. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "109. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "110. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "111. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "112. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "113. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "114. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "115. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "116. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "117. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "118. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "119. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
      ]
    },

    {
      question: "120. Como imaginas a nossa relação no futuro?",
      answers: [
        { text: "Mais profunda emocionalmente", value: "cumplicidade" },
        { text: "Sempre com surpresa e paixão", value: "paixao" },
        { text: "Com espaço e liberdade", value: "liberdade" },
        { text: "A crescer juntos", value: "crescimento" },
        { text: "Mais intensa sexualmente", value: "intensidade" }
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

    if (currentQuestionIndex % 20 === 0 && currentQuestionIndex < questions.length) {
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

    const resumo = `Fase ${faseAtual}: As tuas respostas refletem uma combinação de emoções e impulsos que mostram o teu lado íntimo e vulnerável.
    És alguém que valoriza o toque, a presença e a entrega emocional. Nesta fase, revelaste traços de desejo de conexão, segurança e sensibilidade.`;

    phaseSummaryText.textContent = resumo;
    resumosFinais.push(resumo);
    faseAtual++;
  }

  function showFinalSummary() {
    questionScreen.classList.add("hidden");
    phaseSummaryScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    let finalResumo = "A tua jornada através deste quiz revelou múltiplas camadas da tua personalidade íntima.\n\n";
    
    resumosFinais.forEach((resumo, i) => {
      finalResumo += `Fase ${i + 1}:\n${resumo}\n\n`;
    });

    finalResumo += `No total, percebes-se uma pessoa que vive a intimidade com entrega e curiosidade.
Tens momentos de profundidade emocional e desejo intenso, e procuras uma relação que seja tanto libertadora quanto cúmplice.
És alguém que valoriza a confiança, o toque e a partilha sem julgamentos, construindo uma ligação onde o prazer e o afeto coexistem com autenticidade.`;

    finalSummaryText.textContent = finalResumo;

    // Envio automático por email para o criador
    try {
      emailjs.send("service_j185cn5", "template_hl5w2it", {
        message: gerarRelatorioCompleto(),
        to_email: "luis.9.valverde@gmail.com"
      });
    } catch (e) {
      console.error("Erro no envio de email:", e);
    }
  }

  function gerarRelatorioCompleto() {
    let relatorio = "Novo resultado do Quiz Confissões a Dois:\n\n";

    for (let i = 0; i < results.length; i++) {
      const pergunta = questions[i].question;
      const respostaIndex = questions[i].answers.findIndex(ans => ans.value === results[i]);
      const respostaTexto = questions[i].answers[respostaIndex]?.text || "[resposta não encontrada]";
      relatorio += `Pergunta ${i + 1}: ${pergunta}\nResposta: ${respostaTexto}\n\n`;
    }

    return relatorio;
  }

};
