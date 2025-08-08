# Tibia Status Report

Um site simples e elegante para acompanhar o progresso do seu personagem no Tibia, incluindo quests, achievements e bestiário.

## 🚀 Funcionalidades

- **Visualização de Quests**: Acompanhe suas quests com status (completa, em progresso, não iniciada) e percentual de conclusão
- **Achievements**: Liste todos os seus achievements conquistados
- **Bestiário**: Monitore o progresso do bestiário com contagem de kills
- **Sistema de Busca**: Busque por nome de quest, status ou criaturas do bestiário
- **Filtros por Categoria**: Visualize apenas quests, achievements ou bestiário
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Estatísticas**: Resumo visual do seu progresso

## 📁 Estrutura do Projeto

```
tibia_status_report/
├── index.html          # Página principal
├── admin.html          # Página de administração (CRUD)
├── css/
│   ├── style.css       # Estilos do site principal
│   └── admin.css       # Estilos da página de administração
├── js/
│   ├── script.js       # Funcionalidades do site principal
│   └── admin.js        # Funcionalidades CRUD da administração
├── data/
│   ├── data.json       # Dados do seu personagem
│   └── data_exemplo_completo.json  # Exemplo com mais dados
└── README.md           # Este arquivo
```

## 🛠️ Como Usar

### 1. Configurar seus Dados

Edite o arquivo `data/data.json` com as informações do seu personagem:

```json
{
  "quests": [
    {
      "id": 1,
      "name": "Nome da Quest",
      "status": "completed", // "completed", "in_progress", "not_started"
      "percentage": 100,
      "description": "Descrição da quest"
    }
  ],
  "achievements": [
    {
      "id": 1,
      "name": "Nome do Achievement",
      "description": "Descrição do achievement"
    }
  ],
  "bestiary": [
    {
      "id": 1,
      "name": "Nome da Criatura",
      "completed": true,
      "kills": 2500,
      "description": "Descrição da criatura"
    }
  ]
}
```

### 2. Hospedar no GitHub Pages

1. Crie um repositório no GitHub
2. Faça upload de todos os arquivos
3. Vá em Settings > Pages
4. Selecione "Deploy from a branch"
5. Escolha "main" branch e "/ (root)"
6. Seu site estará disponível em: `https://seuusuario.github.io/nome-do-repositorio`

### 3. Usar Localmente

Para testar localmente, você precisa de um servidor HTTP simples devido às restrições de CORS:

**Opção 1 - Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Opção 2 - Node.js:**
```bash
npx serve .
```

**Opção 3 - PHP:**
```bash
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

## 🛠️ Página de Administração

O projeto inclui uma página de administração completa para gerenciar seus dados via interface web:

### Acessar a Administração
- Acesse `admin.html` no seu navegador
- Ou clique em "← Voltar ao Site" na página principal

### Funcionalidades CRUD
- ✅ **Criar**: Adicione novas quests, achievements e criaturas
- ✅ **Ler**: Visualize todos os dados em formato de tabela
- ✅ **Atualizar**: Edite dados diretamente na tabela ou via modal
- ✅ **Deletar**: Remova itens com confirmação de segurança

### Recursos da Administração
- **Edição Inline**: Modifique dados diretamente nas células da tabela
- **Modal de Edição**: Interface detalhada para edições complexas
- **Navegação por Abas**: Gerencie quests, achievements e bestiário separadamente
- **Exportar/Importar**: Faça backup e restaure seus dados em JSON
- **Validação**: Campos obrigatórios e tipos de dados validados
- **Feedback Visual**: Mensagens de sucesso e erro em tempo real

### Como Usar a Administração
1. **Edição Rápida**: Clique diretamente nos campos da tabela para editar
2. **Edição Detalhada**: Use o botão "✏️ Editar" para abrir o modal
3. **Adicionar Novos**: Clique nos botões "+ Nova Quest/Achievement/Criatura"
4. **Excluir**: Use o botão "🗑️ Excluir" com confirmação de segurança
5. **Backup**: Use "📥 Exportar JSON" para salvar seus dados
6. **Restaurar**: Use "📤 Importar JSON" para carregar dados salvos

## 🎨 Personalização

### Cores e Estilo

Edite o arquivo `css/style.css` para personalizar:
- Cores do tema (procure por `#2a5298` para a cor principal)
- Fontes e tamanhos
- Layout e espaçamentos

### Funcionalidades Adicionais

O arquivo `js/script.js` pode ser expandido para incluir:
- Ordenação por diferentes critérios
- Filtros mais avançados
- Gráficos de progresso
- Exportação de dados

## 📱 Compatibilidade

- ✅ Chrome, Firefox, Safari, Edge (versões modernas)
- ✅ Dispositivos móveis (design responsivo)
- ✅ GitHub Pages
- ✅ Qualquer servidor web estático

## 🔧 Solução de Problemas

**Problema**: Dados não carregam quando aberto diretamente no navegador
**Solução**: Use um servidor HTTP local ou hospede online

**Problema**: Layout quebrado no mobile
**Solução**: Verifique se a meta tag viewport está presente no HTML

**Problema**: Busca não funciona
**Solução**: Verifique se o JavaScript está carregando corretamente

## 📝 Licença

Este projeto é de uso livre. Sinta-se à vontade para modificar e distribuir.

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Algumas ideias para expansão:
- Integração com API do Tibia
- Sistema de backup dos dados
- Comparação entre personagens
- Gráficos de progresso temporal
- Notificações de metas atingidas

