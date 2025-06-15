document.addEventListener('DOMContentLoaded', function() {
    // Конфигурация
    const GITHUB_USERNAME = 'T0sterka';
    const EXPERIENCE_YEARS = 3; // Фиксированное значение опыта
    
    // Элементы
    const experienceCounter = document.querySelector('.stat-item:nth-child(1) .stat-number');
    const projectsCounter = document.querySelector('.stat-item:nth-child(2) .stat-number');
    const reposContainer = document.getElementById('github-repos');

    // 1. Анимация счетчика опыта
    animateCounter(experienceCounter, EXPERIENCE_YEARS, 2000, 'easeOutQuad');
    
    // 2. Загрузка репозиториев
    async function fetchRepositories() {
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
            if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
            
            const repos = await response.json();
            const actualRepos = repos.filter(repo => !repo.fork && !repo.archived);
            
            // 3. Анимация счетчика проектов
            animateCounter(projectsCounter, actualRepos.length, 1500, 'easeInOutQuad');
            
            // Отрисовка репозиториев
            renderRepositories(actualRepos);
            
        } catch (error) {
            console.error('Ошибка:', error);
            animateCounter(projectsCounter, 0, 1000, 'easeOutQuad');
            reposContainer.innerHTML = '<p class="error">Не удалось загрузить проекты</p>';
        }
    }

    // Улучшенная функция анимации
    function animateCounter(element, target, duration = 1000, easing = 'linear') {
        if (!element) return;
        
        const start = parseInt(element.textContent) || 0;
        const startTime = performance.now();
        
        // Функции плавности
        const easingFunctions = {
            linear: t => t,
            easeInQuad: t => t*t,
            easeOutQuad: t => t*(2-t),
            easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t
        };
        
        const ease = easingFunctions[easing] || easingFunctions.linear;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = ease(progress);
            const value = Math.floor(start + (target - start) * easedProgress);
            
            element.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Отрисовка репозиториев (ваша текущая реализация)
    function renderRepositories(repos) {
        reposContainer.innerHTML = '';
        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-image" style="background: ${getRandomColor()};"></div>
                <div class="project-info">
                    <h3 class="project-title">${repo.name}</h3>
                    <p class="project-description">${repo.description || 'Нет описания'}</p>
                    <div class="project-tech">
                        ${repo.language ? `<span class="tech-tag">${repo.language}</span>` : ''}
                        <span class="tech-tag">${formatDate(repo.updated_at)}</span>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => openProjectModal(repo));
            reposContainer.appendChild(card);
        });
    }

    // Инициализация
    fetchRepositories();
});
// GitHub API integration
document.addEventListener('DOMContentLoaded', function() {
    // 1. Настройки (замените username)
    const GITHUB_USERNAME = 'T0sterka';
    const reposContainer = document.getElementById('github-repos');
    
    // 2. Важно! Правильно выбираем счетчик проектов (второй блок)
    const projectsCounter = document.querySelector('.stat-item:nth-of-type(2) .stat-number');
    
    // 3. Проверка элементов
    if (!projectsCounter) {
        console.error('Не найден счетчик проектов! Проверьте HTML структуру');
        return;
    }

    // 4. Основная функция загрузки
    async function fetchRepositories() {
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
            if (!response.ok) throw new Error(`Ошибка API: ${response.status}`);
            
            const repos = await response.json();
            const actualRepos = repos.filter(repo => !repo.fork && !repo.archived);
            
            console.log('Найдено репозиториев:', actualRepos.length);
            
            // 5. Обновляем только счетчик проектов
            updateProjectsCounter(actualRepos.length);
            
            // 6. Создаем карточки
            reposContainer.innerHTML = '';
            actualRepos.forEach(repo => createRepoCard(repo));
            
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            updateProjectsCounter(0);
            reposContainer.innerHTML = '<p class="error">Ошибка загрузки проектов</p>';
        }
    }

    // 7. Функция обновления счетчика
    function updateProjectsCounter(count) {
        projectsCounter.setAttribute('data-count', count);
        projectsCounter.textContent = count;
    }

    // 8. Функция создания карточки (оставьте вашу текущую реализацию)
    function createRepoCard(repo) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-image" style="background: ${getRandomColor()};"></div>
            <div class="project-info">
                <h3 class="project-title">${repo.name}</h3>
                <p class="project-description">${repo.description || 'Нет описания'}</p>
                <div class="project-tech">
                    ${repo.language ? `<span class="tech-tag">${repo.language}</span>` : ''}
                    <span class="tech-tag">${formatDate(repo.updated_at)}</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openProjectModal(repo));
        reposContainer.appendChild(card);
    }

    // 9. Запуск
    fetchRepositories();

    // Open project modal with repository details
    async function openProjectModal(repo) {
        modalTitle.textContent = repo.name;
        modalLinks.innerHTML = `
            ${repo.homepage ? `<a href="${repo.homepage}" class="modal-link" target="_blank"><i class="fas fa-external-link-alt"></i> Демо</a>` : ''}
            <a href="${repo.html_url}" class="modal-link" target="_blank"><i class="fab fa-github"></i> Код</a>
        `;
        
        readmeContent.innerHTML = `
            <div class="loading-readme">
                <div class="spinner"></div>
                <p>Загрузка описания проекта...</p>
            </div>
        `;
        
        projectModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        try {
            // Fetch README.md content
            const readmeResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw'
                }
            });
            
            if (readmeResponse.ok) {
                const readmeText = await readmeResponse.text();
                readmeContent.innerHTML = marked.parse(readmeText);
            } else {
                readmeContent.innerHTML = `
                    <p>README.md не найден для этого проекта.</p>
                    <p>${repo.description || ''}</p>
                `;
            }
        } catch (error) {
            console.error('Error fetching README:', error);
            readmeContent.innerHTML = `
                <p class="error">Не удалось загрузить описание проекта.</p>
                <p>${repo.description || ''}</p>
            `;
        }
    }

    // Close modal
    closeModal.addEventListener('click', () => {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Helper functions
    function getRandomColor() {
        const colors = [
            '#6c63ff', '#4d44db', '#28a745', '#dc3545', '#ffc107', '#17a2b8'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    }

    // Initialize GitHub integration
    fetchRepositories();
});