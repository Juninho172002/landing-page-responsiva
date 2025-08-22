function calcular() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value) / 100;
    const idade = parseInt(document.getElementById('idade').value);
    const sexo = document.getElementById('sexo').value;
    const atividade = document.getElementById('atividade').value;

    if (!peso || !altura || !idade) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const imc = peso / (altura * altura);
    let imcTexto = "";
    let dicas = [];
    let explicativo = "";
    let caloriasMin, caloriasMax;

    const pesoMin = Math.round(18.5 * altura * altura);
    const pesoMax = Math.round(24.9 * altura * altura);

    if (imc < 18.5) {
        imcTexto = "Abaixo do peso";
        explicativo = `Seu peso ideal está entre <strong>${pesoMin} kg</strong> e <strong>${pesoMax} kg</strong>. Para atingir o peso saudável, aumente calorias e ganhe massa muscular.`;
        dicas = [
            { icon: "⚠️", text: "Seu IMC indica que você está abaixo do peso." },
            { icon: "🍎", text: "Aumente a ingestão de alimentos nutritivos e calóricos." },
            { icon: "🥩", text: "Inclua proteínas, carboidratos complexos e gorduras boas." },
            { icon: "🏋️‍♂️", text: "Pratique exercícios de resistência para ganhar massa muscular." },
            { icon: "💧", text: "Mantenha boa hidratação e sono adequado." },
            { icon: "📈", text: "Acompanhe seu progresso semanalmente." }
        ];
    } else if (imc < 24.9) {
        imcTexto = "Peso normal";
        explicativo = `Parabéns! Seu peso está dentro da faixa saudável entre <strong>${pesoMin} kg</strong> e <strong>${pesoMax} kg</strong>. Mantenha hábitos saudáveis e monitoramento regular.`;
        dicas = [
            { icon: "✅", text: "Seu IMC está dentro da faixa saudável." },
            { icon: "🥗", text: "Mantenha alimentação balanceada e hábitos saudáveis." },
            { icon: "🏃‍♀️", text: "Continue praticando atividades físicas regularmente." },
            { icon: "💪", text: "Inclua exercícios de força e aeróbicos." },
            { icon: "💧", text: "Fique atento à hidratação e sono de qualidade." },
            { icon: "📊", text: "Monitore seu peso ocasionalmente para manutenção." }
        ];
    } else if (imc < 29.9) {
        imcTexto = "Sobrepeso";
        explicativo = `Seu peso ideal está entre <strong>${pesoMin} kg</strong> e <strong>${pesoMax} kg</strong>. É recomendado reduzir calorias para atingir o peso saudável.`;
        dicas = [
            { icon: "⚠️", text: "Seu IMC indica sobrepeso." },
            { icon: "🥦", text: "Inclua mais vegetais, frutas e proteínas magras." },
            { icon: "🚫", text: "Reduza açúcares e alimentos ultraprocessados." },
            { icon: "🏃‍♂️", text: "Pratique exercícios aeróbicos e de resistência." },
            { icon: "📉", text: "Estabeleça metas de emagrecimento realistas." },
            { icon: "💧", text: "Hidrate-se bem e durma adequadamente." }
        ];
    } else {
        imcTexto = "Obesidade";
        explicativo = `Seu peso ideal está entre <strong>${pesoMin} kg</strong> e <strong>${pesoMax} kg</strong>. Procure reduzir calorias e busque acompanhamento profissional.`;
        dicas = [
            { icon: "⚠️", text: "Seu IMC indica obesidade." },
            { icon: "👩‍⚕️", text: "Procure acompanhamento médico ou nutricional." },
            { icon: "🥗", text: "Evite alimentos processados e açúcares." },
            { icon: "🏋️‍♀️", text: "Inclua atividades físicas adaptadas." },
            { icon: "📊", text: "Monitore seu progresso com metas graduais." },
            { icon: "💧", text: "Mantenha boa hidratação e sono regular." }
        ];
    }

    // Calorias diárias
    let bmr;
    if (sexo === "masculino") {
        bmr = 88.36 + (13.4 * peso) + (4.8 * (altura * 100)) - (5.7 * idade);
    } else {
        bmr = 447.6 + (9.2 * peso) + (3.1 * (altura * 100)) - (4.3 * idade);
    }

    let fatorAtividade = 1.2;
    if (atividade === "leve") fatorAtividade = 1.375;
    else if (atividade === "moderado") fatorAtividade = 1.55;
    else if (atividade === "intenso") fatorAtividade = 1.725;

    const calorias = Math.round(bmr * fatorAtividade);

    if (imc < 18.5) {
        caloriasMin = calorias;
        caloriasMax = calorias + 500;
    } else if (imc >= 18.5 && imc < 24.9) {
        caloriasMin = calorias - 200;
        caloriasMax = calorias + 200;
    } else {
        caloriasMin = calorias - 500;
        caloriasMax = calorias;
    }

    // Exibir resultado
    document.getElementById('resultado').innerHTML = `
        Seu IMC é <strong>${imc.toFixed(1)}</strong> (${imcTexto})<br>
    `;

    document.getElementById('calorias-info').innerHTML = `
        ${explicativo}<br><br>
        <strong>Calorias recomendadas:</strong> 
        <span>${caloriasMin} kcal</span> a <span>${caloriasMax} kcal</span><br><br>
        <button onclick="window.location.href='treinos.html'">Criar Treinos</button>
        <button onclick="window.location.href='receitas.html'">Ver Receitas</button>
    `;
    document.getElementById('calorias-info').style.display = "block";

    // Exibir dicas
    const dicasList = document.getElementById('dicas-list');
    dicasList.innerHTML = "";
    dicas.forEach(dica => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="dicas-icon">${dica.icon}</span> ${dica.text}`;
        dicasList.appendChild(li);
    });

    document.getElementById('dicas').style.display = "block";
    document.getElementById('dicas').scrollIntoView({ behavior: 'smooth' });
}

function criarTreino() {
  const nome = document.getElementById('nome').value;
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value) / 100;
  const idade = parseInt(document.getElementById('idade').value);
  const sexo = document.getElementById('sexo').value;
  const atividade = document.getElementById('atividade').value;
  const diasTreino = parseInt(document.getElementById('diasTreino').value);
  const limitacao = document.getElementById('limitacao').value.trim();

  const objetivos = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                         .map(cb => cb.value);

  if (!nome || !peso || !altura || !idade || objetivos.length === 0) {
    alert("Por favor, preencha todos os campos e selecione pelo menos um objetivo.");
    return;
  }

  const imc = peso / (altura * altura);
  const pesoMin = Math.round(18.5 * altura * altura);
  const pesoMax = Math.round(24.9 * altura * altura);

  let bmr = sexo === "masculino" 
            ? 88.36 + (13.4 * peso) + (4.8 * altura*100) - (5.7 * idade)
            : 447.6 + (9.2 * peso) + (3.1 * altura*100) - (4.3 * idade);

  let fatorAtividade = 1.2;
  if (atividade === "leve") fatorAtividade = 1.375;
  else if (atividade === "moderado") fatorAtividade = 1.55;
  else if (atividade === "intenso") fatorAtividade = 1.725;

  const calorias = Math.round(bmr * fatorAtividade);
  let caloriasMin = calorias - 200;
  let caloriasMax = calorias + 200;

  // --- Definição de exercícios ---
  const grupos = {
    peito: { principal: ["Supino reto", "Supino inclinado", "Crossover", "Peck deck"], auxiliar: ["Tríceps na polia", "Tríceps testa", "Mergulho no banco"] },
    costas: { principal: ["Puxada na frente", "Remada curvada", "Remada baixa", "Pull-over"], auxiliar: ["Rosca direta", "Rosca martelo", "Rosca concentrada"] },
    pernas: { principal: ["Agachamento", "Leg press", "Stiff", "Cadeira extensora"], auxiliar: ["Panturrilha no leg press", "Afundo", "Mesa flexora"] },
    ombro: { principal: ["Desenvolvimento com halteres", "Elevação lateral", "Remada alta", "Arnold press"], auxiliar: ["Encolhimento de ombros", "Elevação frontal", "Face pull"] },
    abdome: { principal: ["Prancha", "Elevação de pernas", "Crunch abdominal", "Ab-wheel"], auxiliar: ["Bicicleta no ar", "Prancha lateral", "Ab twist"] }
  };

  const dias = [];
  const gruposKeys = Object.keys(grupos);
  let indice = 0;

  for (let d = 0; d < diasTreino; d++) {
    const diaExercicios = [];
    let gruposPorDia = Math.ceil(gruposKeys.length / diasTreino);

    for (let i = 0; i < gruposPorDia && indice < gruposKeys.length; i++, indice++) {
      const grupo = gruposKeys[indice];
      // Pular grupo se houver limitação física relacionada
      if (limitacao && limitacao.toLowerCase().includes(grupo)) continue;

      const principal = grupos[grupo].principal.slice(0,4);
      const auxiliar = grupos[grupo].auxiliar.slice(0,3);
      diaExercicios.push({ grupo, principal, auxiliar });
    }

    dias.push(diaExercicios);
  }

  // --- Montar HTML da tabela ---
  let html = `<h2>Plano de treino para ${nome}</h2>`;
  html += `<p>IMC: <strong>${imc.toFixed(1)}</strong> | Peso saudável: ${pesoMin}kg - ${pesoMax}kg | Calorias/dia: ${caloriasMin} - ${caloriasMax} kcal</p>`;
  if(limitacao) html += `<p><strong>Atenção:</strong> Limitação física: ${limitacao}</p>`;

  dias.forEach((dia, index) => {
    html += `<h3>Dia ${index+1}</h3>`;
    html += `<table class="treino-tabela"><thead><tr><th>Grupo Muscular</th><th>Exercícios Principais</th><th>Exercícios Auxiliares</th></tr></thead><tbody>`;
    dia.forEach(g => {
      html += `<tr>
        <td>${g.grupo.charAt(0).toUpperCase() + g.grupo.slice(1)}</td>
        <td>${g.principal.map(e => `${e} - 3x12`).join('<br>')}</td>
        <td>${g.auxiliar.map(e => `${e} - 3x15`).join('<br>')}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
  });

  document.getElementById('treino-resultado').innerHTML = html;
}
// Seleção de objetivos modernos
const objetivoBtns = document.querySelectorAll('.objetivo-btn');
const objetivosSelecionados = document.getElementById('objetivos-selecionados');

objetivoBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    const selecionados = Array.from(document.querySelectorAll('.objetivo-btn.active')).map(b=>b.textContent);
    objetivosSelecionados.textContent = "Selecionado(s): " + (selecionados.length>0 ? selecionados.join(", ") : "Nenhum");
  });
});

function criarTreino() {
  const nome = document.getElementById('nome').value;
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value)/100;
  const idade = parseInt(document.getElementById('idade').value);
  const sexo = document.getElementById('sexo').value;
  const atividade = document.getElementById('atividade').value;
  const diasTreino = parseInt(document.getElementById('diasTreino').value);
  const limitacao = document.getElementById('limitacao').value.trim();

  const objetivos = Array.from(document.querySelectorAll('.objetivo-btn.active')).map(btn => btn.dataset.valor);
  if (!nome || !peso || !altura || !idade || objetivos.length===0) {
    alert("Preencha todos os campos e selecione pelo menos um objetivo.");
    return;
  }

  const imc = peso / (altura*altura);
  const pesoMin = Math.round(18.5*altura*altura);
  const pesoMax = Math.round(24.9*altura*altura);

  let bmr = sexo==="masculino" ? 88.36 + 13.4*peso + 4.8*altura*100 - 5.7*idade
                                : 447.6 + 9.2*peso + 3.1*altura*100 - 4.3*idade;

  let fatorAtividade = atividade==="leve" ? 1.375 : atividade==="moderado" ? 1.55 : atividade==="intenso" ? 1.725 : 1.2;
  const caloriasBase = Math.round(bmr * fatorAtividade);

  let caloriasMin=0, caloriasMax=0;
  if(objetivos.includes("emagrecer")){
    caloriasMin = caloriasBase - 500;
    caloriasMax = caloriasBase - 200;
  } else if(objetivos.includes("hipertrofia")){
    caloriasMin = caloriasBase;
    caloriasMax = caloriasBase + 400;
  } else {
    caloriasMin = caloriasBase - 200;
    caloriasMax = caloriasBase + 200;
  }

  const grupos = {
    peito: { principal:["Supino reto","Supino inclinado","Crossover","Peck deck"], auxiliar:["Tríceps na polia","Tríceps testa","Mergulho no banco"] },
    costas:{ principal:["Puxada na frente","Remada curvada","Remada baixa","Pull-over"], auxiliar:["Rosca direta","Rosca martelo","Rosca concentrada"] },
    pernas:{ principal:["Agachamento","Leg press","Stiff","Cadeira extensora"], auxiliar:["Panturrilha no leg press","Afundo","Mesa flexora"] },
    ombro:{ principal:["Desenvolvimento com halteres","Elevação lateral","Remada alta","Arnold press"], auxiliar:["Encolhimento de ombros","Elevação frontal","Face pull"] },
    abdome:{ principal:["Prancha","Elevação de pernas","Crunch","Ab-wheel"], auxiliar:["Bicicleta no ar","Prancha lateral","Ab twist"] }
  };

  // Distribuição balanceada por dia
  const dias = Array.from({length:diasTreino},()=>[]);
  const gruposKeys = Object.keys(grupos);
  let gIndex=0;

  for(let i=0;i<gruposKeys.length;i++){
    const grupo = gruposKeys[i];
    if(limitacao && limitacao.toLowerCase().includes(grupo)) continue;
    dias[gIndex % diasTreino].push({grupo, principal:grupos[grupo].principal.slice(0,4), auxiliar:grupos[grupo].auxiliar.slice(0,3)});
    gIndex++;
  }

  let html = `<h2>Plano de treino para ${nome}</h2>`;
  html += `<p>IMC: <strong>${imc.toFixed(1)}</strong> | Peso saudável: ${pesoMin}kg - ${pesoMax}kg | Calorias/dia: ${caloriasMin} - ${caloriasMax} kcal</p>`;
  if(limitacao) html += `<p><strong>Atenção:</strong> Limitação física: ${limitacao}</p>`;

  dias.forEach((dia,index)=>{
    html += `<h3>Dia ${index+1}</h3>`;
    if(dia.length===0){ html+= `<p>Nenhum treino disponível para este dia devido às limitações.</p>`; return; }
    html += `<table class="treino-tabela"><thead><tr><th>Grupo</th><th>Principais (3x12)</th><th>Auxiliares (3x15)</th></tr></thead><tbody>`;
    dia.forEach(g=>{
      html += `<tr>
        <td>${g.grupo.charAt(0).toUpperCase()+g.grupo.slice(1)}</td>
        <td>${g.principal.join('<br>')}</td>
        <td>${g.auxiliar.join('<br>')}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
  });

  document.getElementById('treino-resultado').innerHTML = html;
}
