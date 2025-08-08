// Variáveis globais
let gameData = {
    quests: [],
    achievements: [],
    bestiary: []
};

let currentEditType = '';
let currentEditIndex = -1;
let deleteCallback = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // Botões de importar/exportar
    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', importData);

    // Form de edição
    document.getElementById('editForm').addEventListener('submit', saveEdit);

    // Fechar modal clicando fora
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('editModal');
        const confirmModal = document.getElementById('confirmModal');
        if (event.target === modal) {
            closeModal();
        }
        if (event.target === confirmModal) {
            closeConfirmModal();
        }
    });
}

// Carregar dados
async function loadData() {
    try {
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
                }
            ],
            "achievements": [
                {
                    "id": 1,
                    "name": "Explorer",
                    "description": "Descobriu 100 locais únicos."
                }
            ],
            "bestiary": [
                {
                    "id": 1,
                    "name": "Cyclops",
                    "completed": true,
                    "kills": 2500,
                    "description": "Um monstro comum encontrado em muitas cavernas."
                }
            ]
        };
    }
    
    renderAllTables();
}

// Renderizar todas as tabelas
function renderAllTables() {
    renderQuestsTable();
    renderAchievementsTable();
    renderBestiaryTable();
}

// Renderizar tabela de quests
function renderQuestsTable() {
    const tbody = document.getElementById('questsTableBody');
    tbody.innerHTML = '';
    
    gameData.quests.forEach((quest, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${quest.id}</td>
            <td>
                <input type="text" class="input-field" value="${quest.name}" 
                       onchange="updateQuest(${index}, 'name', this.value)">
            </td>
            <td>
                <select class="status-select" onchange="updateQuest(${index}, 'status', this.value)">
                    <option value="completed" ${quest.status === 'completed' ? 'selected' : ''}>Completa</option>
                    <option value="in_progress" ${quest.status === 'in_progress' ? 'selected' : ''}>Em Progresso</option>
                    <option value="not_started" ${quest.status === 'not_started' ? 'selected' : ''}>Não Iniciada</option>
                </select>
            </td>
            <td>
                <input type="number" class="input-field" value="${quest.percentage}" min="0" max="100"
                       onchange="updateQuest(${index}, 'percentage', parseInt(this.value))">
            </td>
            <td>
                <input type="text" class="input-field" value="${quest.description}" 
                       onchange="updateQuest(${index}, 'description', this.value)">
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-warning btn-sm" onclick="editQuest(${index})">✏️ Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteQuest(${index})">🗑️ Excluir</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Renderizar tabela de achievements
function renderAchievementsTable() {
    const tbody = document.getElementById('achievementsTableBody');
    tbody.innerHTML = '';
    
    gameData.achievements.forEach((achievement, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${achievement.id}</td>
            <td>
                <input type="text" class="input-field" value="${achievement.name}" 
                       onchange="updateAchievement(${index}, 'name', this.value)">
            </td>
            <td>
                <input type="text" class="input-field" value="${achievement.description}" 
                       onchange="updateAchievement(${index}, 'description', this.value)">
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-warning btn-sm" onclick="editAchievement(${index})">✏️ Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteAchievement(${index})">🗑️ Excluir</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Renderizar tabela de bestiário
function renderBestiaryTable() {
    const tbody = document.getElementById('bestiaryTableBody');
    tbody.innerHTML = '';
    
    gameData.bestiary.forEach((creature, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${creature.id}</td>
            <td>
                <input type="text" class="input-field" value="${creature.name}" 
                       onchange="updateBestiary(${index}, 'name', this.value)">
            </td>
            <td>
                <input type="checkbox" class="checkbox-field" ${creature.completed ? 'checked' : ''} 
                       onchange="updateBestiary(${index}, 'completed', this.checked)">
            </td>
            <td>
                <input type="number" class="input-field" value="${creature.kills}" min="0"
                       onchange="updateBestiary(${index}, 'kills', parseInt(this.value))">
            </td>
            <td>
                <input type="text" class="input-field" value="${creature.description}" 
                       onchange="updateBestiary(${index}, 'description', this.value)">
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-warning btn-sm" onclick="editBestiary(${index})">✏️ Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteBestiary(${index})">🗑️ Excluir</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Funções de atualização inline
function updateQuest(index, field, value) {
    gameData.quests[index][field] = value;
    showSuccessMessage('Quest atualizada!');
}

function updateAchievement(index, field, value) {
    gameData.achievements[index][field] = value;
    showSuccessMessage('Achievement atualizado!');
}

function updateBestiary(index, field, value) {
    gameData.bestiary[index][field] = value;
    showSuccessMessage('Bestiário atualizado!');
}

// Funções para adicionar novos itens
function addNewQuest() {
    const newId = Math.max(...gameData.quests.map(q => q.id), 0) + 1;
    const newQuest = {
        id: newId,
        name: "Nova Quest",
        status: "not_started",
        percentage: 0,
        description: "Descrição da nova quest"
    };
    
    gameData.quests.push(newQuest);
    renderQuestsTable();
    showSuccessMessage('Nova quest adicionada!');
}

function addNewAchievement() {
    const newId = Math.max(...gameData.achievements.map(a => a.id), 0) + 1;
    const newAchievement = {
        id: newId,
        name: "Novo Achievement",
        description: "Descrição do novo achievement"
    };
    
    gameData.achievements.push(newAchievement);
    renderAchievementsTable();
    showSuccessMessage('Novo achievement adicionado!');
}

function addNewBestiary() {
    const newId = Math.max(...gameData.bestiary.map(b => b.id), 0) + 1;
    const newCreature = {
        id: newId,
        name: "Nova Criatura",
        completed: false,
        kills: 0,
        description: "Descrição da nova criatura"
    };
    
    gameData.bestiary.push(newCreature);
    renderBestiaryTable();
    showSuccessMessage('Nova criatura adicionada!');
}

// Funções de edição via modal
function editQuest(index) {
    currentEditType = 'quest';
    currentEditIndex = index;
    const quest = gameData.quests[index];
    
    document.getElementById('modalTitle').textContent = 'Editar Quest';
    document.getElementById('formFields').innerHTML = `
        <div class="form-group">
            <label>Nome:</label>
            <input type="text" id="editName" value="${quest.name}" required>
        </div>
        <div class="form-group">
            <label>Status:</label>
            <select id="editStatus" required>
                <option value="completed" ${quest.status === 'completed' ? 'selected' : ''}>Completa</option>
                <option value="in_progress" ${quest.status === 'in_progress' ? 'selected' : ''}>Em Progresso</option>
                <option value="not_started" ${quest.status === 'not_started' ? 'selected' : ''}>Não Iniciada</option>
            </select>
        </div>
        <div class="form-group">
            <label>Progresso (%):</label>
            <input type="number" id="editPercentage" value="${quest.percentage}" min="0" max="100" required>
        </div>
        <div class="form-group">
            <label>Descrição:</label>
            <textarea id="editDescription" required>${quest.description}</textarea>
        </div>
    `;
    
    showModal();
}

function editAchievement(index) {
    currentEditType = 'achievement';
    currentEditIndex = index;
    const achievement = gameData.achievements[index];
    
    document.getElementById('modalTitle').textContent = 'Editar Achievement';
    document.getElementById('formFields').innerHTML = `
        <div class="form-group">
            <label>Nome:</label>
            <input type="text" id="editName" value="${achievement.name}" required>
        </div>
        <div class="form-group">
            <label>Descrição:</label>
            <textarea id="editDescription" required>${achievement.description}</textarea>
        </div>
    `;
    
    showModal();
}

function editBestiary(index) {
    currentEditType = 'bestiary';
    currentEditIndex = index;
    const creature = gameData.bestiary[index];
    
    document.getElementById('modalTitle').textContent = 'Editar Criatura';
    document.getElementById('formFields').innerHTML = `
        <div class="form-group">
            <label>Nome:</label>
            <input type="text" id="editName" value="${creature.name}" required>
        </div>
        <div class="form-group">
            <label>Completo:</label>
            <input type="checkbox" id="editCompleted" ${creature.completed ? 'checked' : ''}>
        </div>
        <div class="form-group">
            <label>Kills:</label>
            <input type="number" id="editKills" value="${creature.kills}" min="0" required>
        </div>
        <div class="form-group">
            <label>Descrição:</label>
            <textarea id="editDescription" required>${creature.description}</textarea>
        </div>
    `;
    
    showModal();
}

// Funções de exclusão
function deleteQuest(index) {
    deleteCallback = () => {
        gameData.quests.splice(index, 1);
        renderQuestsTable();
        showSuccessMessage('Quest excluída!');
    };
    showConfirmModal();
}

function deleteAchievement(index) {
    deleteCallback = () => {
        gameData.achievements.splice(index, 1);
        renderAchievementsTable();
        showSuccessMessage('Achievement excluído!');
    };
    showConfirmModal();
}

function deleteBestiary(index) {
    deleteCallback = () => {
        gameData.bestiary.splice(index, 1);
        renderBestiaryTable();
        showSuccessMessage('Criatura excluída!');
    };
    showConfirmModal();
}

// Funções do modal
function showModal() {
    document.getElementById('editModal').classList.add('show');
}

function closeModal() {
    document.getElementById('editModal').classList.remove('show');
}

function showConfirmModal() {
    document.getElementById('confirmModal').classList.add('show');
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('show');
}

function confirmDelete() {
    if (deleteCallback) {
        deleteCallback();
        deleteCallback = null;
    }
    closeConfirmModal();
}

// Salvar edição do modal
function saveEdit(event) {
    event.preventDefault();
    
    if (currentEditType === 'quest') {
        gameData.quests[currentEditIndex] = {
            ...gameData.quests[currentEditIndex],
            name: document.getElementById('editName').value,
            status: document.getElementById('editStatus').value,
            percentage: parseInt(document.getElementById('editPercentage').value),
            description: document.getElementById('editDescription').value
        };
        renderQuestsTable();
    } else if (currentEditType === 'achievement') {
        gameData.achievements[currentEditIndex] = {
            ...gameData.achievements[currentEditIndex],
            name: document.getElementById('editName').value,
            description: document.getElementById('editDescription').value
        };
        renderAchievementsTable();
    } else if (currentEditType === 'bestiary') {
        gameData.bestiary[currentEditIndex] = {
            ...gameData.bestiary[currentEditIndex],
            name: document.getElementById('editName').value,
            completed: document.getElementById('editCompleted').checked,
            kills: parseInt(document.getElementById('editKills').value),
            description: document.getElementById('editDescription').value
        };
        renderBestiaryTable();
    }
    
    closeModal();
    showSuccessMessage('Item atualizado com sucesso!');
}

// Trocar tabs
function switchTab(tabName) {
    // Atualizar botões
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Atualizar conteúdo
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Exportar dados
function exportData() {
    const dataStr = JSON.stringify(gameData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tibia_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showSuccessMessage('Dados exportados com sucesso!');
}

// Importar dados
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Validar estrutura básica
            if (importedData.quests && importedData.achievements && importedData.bestiary) {
                gameData = importedData;
                renderAllTables();
                showSuccessMessage('Dados importados com sucesso!');
            } else {
                showErrorMessage('Arquivo JSON inválido. Verifique a estrutura dos dados.');
            }
        } catch (error) {
            showErrorMessage('Erro ao ler o arquivo JSON: ' + error.message);
        }
    };
    reader.readAsText(file);
    
    // Limpar o input
    event.target.value = '';
}

// Mensagens de feedback
function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Remover mensagens existentes
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.children[1]);
    
    // Remover após 3 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

