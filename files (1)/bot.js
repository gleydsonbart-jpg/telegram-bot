const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');

const TOKEN = '8783686095:AAGLrwMFwirRCxr8VmQeRI_Co9IWekUHZHs';
const CHAT_ID = '8645772800';

const bot = new TelegramBot(TOKEN, { polling: true });

// ── MENSAGENS DO DIA ──────────────────────────────────────────────
const lembretes = {
  // Segunda 8h
  'seg-manha': `📸 *Bom dia, Gleydson!*

Hoje é *segunda-feira* — ótimo dia para mostrar presença de liderança.

💡 *Sugestão de post:* Uma foto sua no hotel — recepção, reunião de equipe ou conferindo detalhes da operação.

📝 Quer uma legenda? Me manda a foto ou descreve o momento que eu escrevo pra você!`,

  // Quarta 8h
  'qua-manha': `🎠 *Bom dia, Gleydson!*

Hoje é *quarta-feira* — dia de conteúdo de valor.

💡 *Sugestão de post:* Carrossel com dica de gestão hoteleira. Algo prático do seu dia a dia — atendimento, processos, padrões de serviço.

📝 Me conta um tema e eu monto os slides pra você!`,

  // Quinta 19h
  'qui-noite': `🍷 *Boa noite, Gleydson!*

Hoje é *quinta-feira* — hora do post pessoal.

💡 *Sugestão:* Qual vinho você está tomando essa semana? Uma foto com uma legenda que mistura o momento com algo da sua semana profissional engaja muito.

📝 Me manda o nome do vinho ou uma foto e eu escrevo a legenda!`,

  // Sexta 8h
  'sex-manha': `🎬 *Bom dia, Gleydson!*

Hoje é *sexta-feira* — dia de Reels!

💡 *Sugestão:* Grave um vídeo de 20–30 segundos falando sobre algo que aconteceu essa semana no hotel. Uma situação, aprendizado ou reflexão de liderança.

🎙️ Reels têm 3× mais alcance que posts normais. Vale o esforço!

📝 Quer um roteiro do que falar? É só pedir!`,

  // Domingo 10h
  'dom-manha': `☀️ *Bom dia, Gleydson!*

Hoje é *domingo* — momento de humanizar o perfil.

💡 *Sugestão de Story:* Algo pessoal — um passeio, uma música, um momento com seu filho. Isso cria conexão genuína com os seguidores.

📝 Como está sendo seu domingo?`,

  // Lembrete de anúncio — toda primeira segunda do mês 9h
  'anuncio-mensal': `💰 *Lembrete mensal de anúncios, Gleydson!*

Seus *R$ 50,00 mensais* estão esperando — hora de investir certeiro:

1️⃣ *R$ 25,00* → Impulsionar o melhor Reels do mês (5 dias, R$5/dia)
2️⃣ *R$ 15,00* → Anúncio em Stories para atrair seguidores (10 dias, R$1,50/dia)  
3️⃣ *R$ 10,00* → Engajamento no post de maior alcance (5 dias, R$2/dia)

📊 Acesse *business.facebook.com* para configurar.
📝 Quer a copy pronta para os anúncios? É só pedir aqui!`,
};

// ── AGENDAMENTOS ──────────────────────────────────────────────────
// Segunda 8h (horário de Brasília = UTC-3, então 11h UTC)
cron.schedule('0 11 * * 1', () => {
  bot.sendMessage(CHAT_ID, lembretes['seg-manha'], { parse_mode: 'Markdown' });
});

// Quarta 8h
cron.schedule('0 11 * * 3', () => {
  bot.sendMessage(CHAT_ID, lembretes['qua-manha'], { parse_mode: 'Markdown' });
});

// Quinta 19h (22h UTC)
cron.schedule('0 22 * * 4', () => {
  bot.sendMessage(CHAT_ID, lembretes['qui-noite'], { parse_mode: 'Markdown' });
});

// Sexta 8h
cron.schedule('0 11 * * 5', () => {
  bot.sendMessage(CHAT_ID, lembretes['sex-manha'], { parse_mode: 'Markdown' });
});

// Domingo 10h (13h UTC)
cron.schedule('0 13 * * 0', () => {
  bot.sendMessage(CHAT_ID, lembretes['dom-manha'], { parse_mode: 'Markdown' });
});

// Primeira segunda de cada mês 9h — lembrete de anúncios (12h UTC)
cron.schedule('0 12 1-7 * 1', () => {
  bot.sendMessage(CHAT_ID, lembretes['anuncio-mensal'], { parse_mode: 'Markdown' });
});

// ── RESPONDER MENSAGENS ────────────────────────────────────────────
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(CHAT_ID, `👋 *Fala, Gleydson!*

Seu *Social Manager* no Telegram está ativo! 🚀

Vou te mandar lembretes automáticos toda semana sobre o que postar no @gleydson664.

*Comandos disponíveis:*
/legenda — Pedir uma legenda agora
/pauta — Ver sugestões da semana
/anuncio — Dicas de como usar os R$50 de anúncio
/teste — Receber uma mensagem de teste agora

Ou me escreva livremente — estou aqui! 📲`, { parse_mode: 'Markdown' });
});

bot.onText(/\/pauta/, () => {
  bot.sendMessage(CHAT_ID, `📅 *Pauta da semana — @gleydson664*

*Segunda* → 📸 Foto de bastidores da operação
*Quarta* → 🎠 Carrossel com dica de gestão hoteleira  
*Quinta* → 🍷 Post pessoal (vinho da semana)
*Sexta* → 🎬 Reels de reflexão/liderança
*Domingo* → 📖 Story pessoal humanizando o perfil

📝 Quer a legenda de algum desses? É só me contar!`, { parse_mode: 'Markdown' });
});

bot.onText(/\/anuncio/, () => {
  bot.sendMessage(CHAT_ID, `💰 *Plano de R$ 50,00 mensais*

1️⃣ *R$ 25,00* — Melhor Reels do mês
   → Objetivo: Alcance · 5 dias · R$5/dia

2️⃣ *R$ 15,00* — Anúncio Stories  
   → Objetivo: Visitas ao perfil · 10 dias · R$1,50/dia

3️⃣ *R$ 10,00* — Post de maior engajamento
   → Objetivo: Engajamento · 5 dias · R$2/dia

🎯 *Público:* 28–55 anos · Hotelaria/Turismo/Liderança · SC + RS

📊 Configure em: business.facebook.com
📝 Quer a copy do anúncio pronta? Me pede!`, { parse_mode: 'Markdown' });
});

bot.onText(/\/legenda/, () => {
  bot.sendMessage(CHAT_ID, `✍️ *Vamos criar sua legenda!*

Me conta:
• Que foto ou vídeo você vai postar?
• O que está acontecendo na cena?
• Tem algum tema ou mensagem que quer passar?

Escreva à vontade e eu monto a legenda pronta para copiar e colar! 📝`);
});

bot.onText(/\/teste/, () => {
  bot.sendMessage(CHAT_ID, `✅ *Bot funcionando perfeitamente, Gleydson!*

Você vai receber mensagens automáticas:
• 📸 Segunda 8h — sugestão de post
• 🎠 Quarta 8h — dica de carrossel
• 🍷 Quinta 19h — post de vinho
• 🎬 Sexta 8h — ideia de Reels
• ☀️ Domingo 10h — story pessoal
• 💰 1ª segunda do mês — lembrete de anúncios

Tudo pronto! 🚀`, { parse_mode: 'Markdown' });
});

// Resposta genérica para qualquer mensagem
bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    bot.sendMessage(CHAT_ID, `📝 Recebi sua mensagem! 

Para criar legendas e conteúdo personalizado, acesse seu assistente completo:

🖥️ Abra o arquivo *instagram-manager.html* no navegador — lá você tem todo o poder da IA para criar legendas, planejar posts e gerenciar seus anúncios.

Aqui no Telegram fico responsável pelos seus *lembretes diários* e *dicas rápidas*! 📲`, { parse_mode: 'Markdown' });
  }
});

console.log('🤖 Social Manager Bot ativo! Aguardando mensagens...');
console.log('📲 Lembretes agendados para Gleydson (@gleydson664)');
