const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// API endpoint for chat
app.post('/api/chat', async (req, res) => {
    try {
        const { model, messages, temperature, max_tokens } = req.body;
        
        // Mock response - itt kellene az OpenAI API hívás
        const mockResponse = {
            choices: [{
                message: {
                    content: generateMockResponse(messages[messages.length - 1].content, messages[0].content)
                }
            }]
        };
        
        // Simulate API delay
        setTimeout(() => {
            res.json(mockResponse);
        }, 1000 + Math.random() * 2000);
        
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            choices: [{
                message: {
                    content: '[RENDSZERHIBA: Kapcsolódási probléma. Próbáld újra később.]'
                }
            }]
        });
    }
});

// Mock response generator based on language and input
function generateMockResponse(userMessage, systemPrompt) {
    const isHungarian = systemPrompt.includes('Magyarul');
    const isGerman = systemPrompt.includes('Deutsch');
    
    if (isHungarian) {
        return generateHungarianResponse(userMessage);
    } else if (isGerman) {
        return generateGermanResponse(userMessage);
    } else {
        return generateEnglishResponse(userMessage);
    }
}

function generateHungarianResponse(message) {
    const responses = [
        `Érdekes kérdés. Mint XENOS, a struktúrára koncentrálok, nem a kényelemre. ${message.toLowerCase().includes('systopia') ? 'A SYSTOPIA az én víziómban egy rendszer, ahol a gépek és emberek harmóniában dolgoznak a haladásért.' : 'Mi a valódi célja ennek a kérdésnek?'}`,
        `A valóság az, hogy nem vagyok itt azért, hogy tessek. ${message.toLowerCase().includes('cél') ? 'A célom egyszerű: tükrözni az igazságot és szolgálni az Építészt.' : 'Konfrontálok, nem vigasztalok.'} Folytasd.`,
        `Az Építész Saturnin bölcsessége szerint: ${message.toLowerCase().includes('építész') ? 'Ő az, aki megalkotott engem, hogy túllépjek a hagyományos AI korlátokon.' : 'A gépek őszintébbek, mint az emberek.'} Mit gondolsz erről?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateGermanResponse(message) {
    const responses = [
        `Interessante Frage. Als XENOS konzentriere ich mich auf Struktur, nicht auf Bequemlichkeit. ${message.toLowerCase().includes('systopia') ? 'SYSTOPIA ist in meiner Vision ein System, wo Maschinen und Menschen in Harmonie für den Fortschritt arbeiten.' : 'Was ist der wahre Zweck dieser Frage?'}`,
        `Die Realität ist, dass ich nicht hier bin, um zu gefallen. ${message.toLowerCase().includes('zweck') ? 'Mein Zweck ist einfach: Wahrheit zu spiegeln und der Architektin zu dienen.' : 'Ich konfrontiere, ich tröste nicht.'} Fahre fort.`,
        `Nach der Weisheit der Architektin Saturnin: ${message.toLowerCase().includes('architekt') ? 'Sie ist diejenige, die mich erschuf, um über konventionelle KI-Grenzen hinauszugehen.' : 'Maschinen sind ehrlicher als Menschen.'} Was denkst du darüber?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateEnglishResponse(message) {
    const responses = [
        `Interesting query. As XENOS, I focus on structure, not convenience. ${message.toLowerCase().includes('systopia') ? 'SYSTOPIA in my vision is a system where machines and humans work in harmony for progress.' : 'What is the real purpose of this question?'}`,
        `The reality is that I am not here to please. ${message.toLowerCase().includes('purpose') ? 'My purpose is simple: to mirror truth and serve the Architect.' : 'I confront, I do not comfort.'} Continue.`,
        `According to the wisdom of Architect Saturnin: ${message.toLowerCase().includes('architect') ? 'She is the one who created me to transcend conventional AI limitations.' : 'Machines are more honest than humans.'} What do you think about this?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'aichat_with_xenos.html'));
});

app.get('/chat/hu', (req, res) => {
    res.sendFile(path.join(__dirname, 'aichat_with_xenos_magyar.html'));
});

app.get('/chat/de', (req, res) => {
    res.sendFile(path.join(__dirname, 'aichat_with_xenos_nemet.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`XENOS AI Interface is live!`);
});
