// Variáveis globais para armazenar os dados
let gameData = {
    quests: [],
    achievements: [],
    bestiary: []
};

let filteredData = {
    quests: [],
    achievements: [],
    bestiary: []
};

// Elementos do DOM
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const questsList = document.getElementById('questsList');
const achievementsList = document.getElementById('achievementsList');
const bestiaryList = document.getElementById('bestiaryList');
const contentSections = document.querySelectorAll('.content-section');

// Elementos de estatísticas
const completedQuestsEl = document.getElementById('completedQuests');
const totalAchievementsEl = document.getElementById('totalAchievements');
const completedBestiaryEl = document.getElementById('completedBestiary');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
});

// Carregar dados do arquivo JSON
async function loadData() {
    try {
        // Tentar carregar do arquivo JSON primeiro
        const response = await fetch('data/data.json');
        gameData = await response.json();
    } catch (error) {
        console.warn('Não foi possível carregar data.json, usando dados de exemplo:', error);
        // Usar dados de exemplo se não conseguir carregar o arquivo
        gameData = {
            "quests": [
                {
                    "id": 1,
                    "name": "The New Frontier Quest",
                    "status": "completed",
                    "percentage": 100,
                    "description": "Uma quest épica para desbravar novas terras."
                },
                {
                    "id": 2,
                    "name": "Rashid's Quest",
                    "status": "in_progress",
                    "percentage": 50,
                    "description": "Ajude Rashid a encontrar seus itens perdidos."
                },
                {
                    "id": 3,
                    "name": "Postman Quest",
                    "status": "not_started",
                    "percentage": 0,
                    "description": "Torne-se um carteiro em Venore."
                }
            ],
            "achievements": [
                {
                    "id": 1,
                    "name": "Explorer",
                    "description": "Descobriu 100 locais únicos."
                },
                {
                    "id": 2,
                    "name": "Monster Hunter",
                    "description": "Derrotou 1000 monstros."
                }
            ],
            "bestiary": [
                {
                    "id": 1,
                    "name": "Cyclops",
                    "completed": true,
                    "kills": 2500,
                    "description": "Um monstro comum encontrado em muitas cavernas."
                },
                {
                    "id": 2,
                    "name": "Dragon",
                    "completed": false,
                    "kills": 150,
                    "description": "Uma criatura alada e perigosa."
                }
            ]
        };
    }
    
    // Inicializar dados filtrados
    filteredData = { ...gameData };
    
    // Renderizar dados iniciais
    renderAllData();
    updateStats();
}

// Configurar event listeners
function setupEventListeners() {
    // Busca
    searchInput.addEventListener('input', handleSearch);
    
    // Filtros
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
}

// Manipular busca
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // Se não há termo de busca, mostrar todos os dados
        filteredData = { ...gameData };
    } else {
        // Filtrar dados baseado no termo de busca
        filteredData = {
            quests: gameData.quests.filter(quest => 
                quest.name.toLowerCase().includes(searchTerm) ||
                quest.status.toLowerCase().includes(searchTerm) ||
                quest.description.toLowerCase().includes(searchTerm)
            ),
            achievements: gameData.achievements.filter(achievement =>
                achievement.name.toLowerCase().includes(searchTerm) ||
                achievement.description.toLowerCase().includes(searchTerm)
            ),
            bestiary: gameData.bestiary.filter(creature =>
                creature.name.toLowerCase().includes(searchTerm) ||
                creature.description.toLowerCase().includes(searchTerm) ||
                (creature.completed && 'completo'.includes(searchTerm)) ||
                (!creature.completed && 'incompleto'.includes(searchTerm))
            )
        };
    }
    
    renderAllData();
}

// Manipular filtros
function handleFilter(event) {
    const filter = event.target.dataset.filter;
    
    // Atualizar botões ativos
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Mostrar/ocultar seções
    contentSections.forEach(section => {
        if (filter === 'all') {
            section.classList.remove('hidden');
        } else {
            const sectionId = section.id.replace('-section', '');
            if (sectionId === filter) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        }
    });
}

// Renderizar todos os dados
function renderAllData() {
    renderQuests();
    renderAchievements();
    renderBestiary();
}

// Renderizar quests
function renderQuests() {
    questsList.innerHTML = '';
    
    filteredData.quests.forEach(quest => {
        const questElement = createQuestElement(quest);
        questsList.appendChild(questElement);
    });
}

// Criar elemento de quest
function createQuestElement(quest) {
    const div = document.createElement('div');
    div.className = `quest-item ${quest.status}`;
    
    const statusText = getStatusText(quest.status);
    const statusClass = getStatusClass(quest.status);
    
    div.innerHTML = `
        <div class="item-header">
            <div class="item-title">${quest.name}</div>
            <div class="status-badge ${statusClass}">${statusText}</div>
        </div>
        <div class="item-description">${quest.description}</div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${quest.percentage}%"></div>
        </div>
        <div class="progress-text">${quest.percentage}%</div>
    `;
    
    return div;
}

// Renderizar achievements
function renderAchievements() {
    achievementsList.innerHTML = '';
    
    filteredData.achievements.forEach(achievement => {
        const achievementElement = createAchievementElement(achievement);
        achievementsList.appendChild(achievementElement);
    });
}

// Criar elemento de achievement
function createAchievementElement(achievement) {
    const div = document.createElement('div');
    div.className = 'achievement-item';
    
    div.innerHTML = `
        <div class="item-header">
            <div class="item-title">${achievement.name}</div>
            <div class="status-badge status-completed">Conquistado</div>
        </div>
        <div class="item-description">${achievement.description}</div>
    `;
    
    return div;
}

// Renderizar bestiário
function renderBestiary() {
    bestiaryList.innerHTML = '';
    
    filteredData.bestiary.forEach(creature => {
        const creatureElement = createBestiaryElement(creature);
        bestiaryList.appendChild(creatureElement);
    });
}

// Criar elemento de bestiário
function createBestiaryElement(creature) {
    const div = document.createElement('div');
    div.className = `bestiary-item ${creature.completed ? 'completed' : ''}`;
    
    const statusText = creature.completed ? 'Completo' : 'Incompleto';
    const statusClass = creature.completed ? 'status-completed' : 'status-not-started';
    
    div.innerHTML = `
        <div class="item-header">
            <div class="item-title">${creature.name}</div>
            <div class="status-badge ${statusClass}">${statusText}</div>
        </div>
        <div class="item-description">${creature.description}</div>
        <div class="kills-count">Kills: ${creature.kills}</div>
    `;
    
    return div;
}

// Obter texto do status
function getStatusText(status) {
    const statusMap = {
        'completed': 'Completa',
        'in_progress': 'Em Progresso',
        'not_started': 'Não Iniciada'
    };
    return statusMap[status] || status;
}

// Obter classe do status
function getStatusClass(status) {
    const classMap = {
        'completed': 'status-completed',
        'in_progress': 'status-in-progress',
        'not_started': 'status-not-started'
    };
    return classMap[status] || '';
}

// Atualizar estatísticas
function updateStats() {
    const completedQuests = gameData.quests.filter(quest => quest.status === 'completed').length;
    const totalAchievements = gameData.achievements.length;
    const completedBestiary = gameData.bestiary.filter(creature => creature.completed).length;
    
    completedQuestsEl.textContent = completedQuests;
    totalAchievementsEl.textContent = totalAchievements;
    completedBestiaryEl.textContent = completedBestiary;
}

// Mostrar erro
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 15px;
        border-radius: 5px;
        z-index: 1000;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        document.body.removeChild(errorDiv);
    }, 5000);
}

