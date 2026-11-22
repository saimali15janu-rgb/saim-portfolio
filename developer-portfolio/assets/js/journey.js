/**
 * Web Development Journey - Progress Tracker & Learning Record
 * Fully functional with LocalStorage persistence, CRUD operations, and reactive UI
 */

(function () {
  'use strict';

  const STORAGE_KEYS = {
    TOPICS: 'saim_journey_topics',
    LOGS: 'saim_journey_logs',
    PROJECTS: 'saim_journey_projects'
  };

  const defaultTopics = [
    {
      id: 'html',
      name: 'HTML (Semantic HTML5)',
      icon: 'fa-brands fa-html5 text-orange-500',
      status: 'completed',
      progress: 100,
      notes: 'Mastered semantic tags, forms, accessibility, and modern layout structure.'
    },
    {
      id: 'css',
      name: 'CSS (CSS3, Flexbox & Grid)',
      icon: 'fa-brands fa-css3-alt text-blue-500',
      status: 'completed',
      progress: 95,
      notes: 'Fluent with Flexbox, CSS Grid, media queries, animations, and Tailwind styling.'
    },
    {
      id: 'js',
      name: 'JavaScript (ES6+ & DOM)',
      icon: 'fa-brands fa-js text-yellow-400',
      status: 'learning',
      progress: 75,
      notes: 'Working on asynchronous JS, DOM manipulation, event loops, and local storage.'
    },
    {
      id: 'react',
      name: 'React.js (Frontend Framework)',
      icon: 'fa-brands fa-react text-cyan-400',
      status: 'learning',
      progress: 45,
      notes: 'Learning JSX, components, useState, useEffect, and modern hooks.'
    },
    {
      id: 'node',
      name: 'Node.js (Backend & Express)',
      icon: 'fa-brands fa-node-js text-emerald-500',
      status: 'upcoming',
      progress: 20,
      notes: 'Roadmap: Express server setups, REST API endpoints, and middleware.'
    },
    {
      id: 'database',
      name: 'Database (MongoDB & SQL)',
      icon: 'fa-solid fa-database text-purple-400',
      status: 'upcoming',
      progress: 15,
      notes: 'Roadmap: Data modeling, CRUD database operations, and user records.'
    }
  ];

  const defaultLogs = [
    {
      id: 'log_1',
      date: '2026-11-21',
      topic: 'JavaScript DOM & LocalStorage',
      practiced: 'Built persistent state handlers and interactive modals',
      completed: 'Completed full CRUD system for portfolio tracker',
      notes: 'LocalStorage saves strings; JSON.stringify and JSON.parse are essential.'
    },
    {
      id: 'log_2',
      date: '2026-11-20',
      topic: 'Tailwind CSS & Glassmorphism',
      practiced: 'Crafted backdrop blur headers and glowing gradient cards',
      completed: 'Finalized mobile-first responsive design layout',
      notes: 'CSS backdrop-filter provides a clean glass look over canvas particles.'
    }
  ];

  const defaultProjects = [
    {
      id: 'proj_1',
      name: 'Personal Developer Portfolio',
      tech: 'HTML5, CSS3, JavaScript, Tailwind CSS',
      date: '2026-11-21',
      desc: 'Modern responsive developer portfolio with dark theme, canvas animation, and progress tracking.'
    }
  ];

  function loadData(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveData(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  let topics = loadData(STORAGE_KEYS.TOPICS, defaultTopics);
  let logs = loadData(STORAGE_KEYS.LOGS, defaultLogs);
  let projects = loadData(STORAGE_KEYS.PROJECTS, defaultProjects);

  function renderTracker() {
    const overallProgressElem = document.getElementById('overall-progress-bar');
    const overallTextElem = document.getElementById('overall-progress-text');
    const countCompletedElem = document.getElementById('count-completed');
    const countLearningElem = document.getElementById('count-learning');
    const countUpcomingElem = document.getElementById('count-upcoming');

    let totalProgress = 0;
    let completedCount = 0;
    let learningCount = 0;
    let upcomingCount = 0;

    topics.forEach(t => {
      totalProgress += Number(t.progress || 0);
      if (t.status === 'completed') completedCount++;
      else if (t.status === 'learning') learningCount++;
      else upcomingCount++;
    });

    const average = Math.round(totalProgress / (topics.length || 1));

    if (overallProgressElem) overallProgressElem.style.width = `${average}%`;
    if (overallTextElem) overallTextElem.textContent = `${average}%`;
    if (countCompletedElem) countCompletedElem.textContent = completedCount;
    if (countLearningElem) countLearningElem.textContent = learningCount;
    if (countUpcomingElem) countUpcomingElem.textContent = upcomingCount;
  }

  function renderTopics() {
    const container = document.getElementById('journey-timeline-grid');
    if (!container) return;

    container.innerHTML = topics.map(t => {
      const statusBadge = t.status === 'completed'
        ? '<span class="px-2.5 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-400 font-mono">🟢 Completed</span>'
        : t.status === 'learning'
        ? '<span class="px-2.5 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-400 font-mono">🔵 Learning</span>'
        : '<span class="px-2.5 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 font-mono">🟣 Upcoming</span>';

      return `
        <div class="glass-card rounded-2xl p-6 border border-gray-800 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <i class="${t.icon} text-2xl"></i>
              <h4 class="font-bold text-white text-base">${t.name}</h4>
            </div>
            ${statusBadge}
          </div>
          <div>
            <div class="flex justify-between text-xs font-mono text-gray-400 mb-1">
              <span>Mastery Progress</span>
              <span class="text-indigo-400 font-semibold">${t.progress}%</span>
            </div>
            <div class="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div class="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2 rounded-full" style="width: ${t.progress}%"></div>
            </div>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">${t.notes}</p>
        </div>
      `;
    }).join('');
  }

  function renderLogs() {
    const container = document.getElementById('daily-logs-list');
    if (!container) return;

    if (!logs.length) {
      container.innerHTML = '<p class="text-gray-500 text-sm font-mono p-4 text-center">No daily logs yet. Click "+ Add Daily Record" to record today\'s work!</p>';
      return;
    }

    container.innerHTML = logs.map(l => `
      <div class="glass-card rounded-2xl p-5 border border-gray-800/80 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-cyan-400">${l.date}</span>
          <span class="text-xs font-bold text-white bg-indigo-600/30 px-2.5 py-0.5 rounded border border-indigo-500/30">${l.topic}</span>
        </div>
        <p class="text-sm text-gray-300"><strong>Practiced:</strong> ${l.practiced}</p>
        <p class="text-sm text-emerald-400"><strong>Completed:</strong> ${l.completed}</p>
        ${l.notes ? `<p class="text-xs text-gray-400 italic font-mono">&ldquo;${l.notes}&rdquo;</p>` : ''}
      </div>
    `).join('');
  }

  function renderProjects() {
    const container = document.getElementById('project-records-list');
    if (!container) return;

    if (!projects.length) {
      container.innerHTML = '<p class="text-gray-500 text-sm font-mono p-4 text-center">No custom project records yet.</p>';
      return;
    }

    container.innerHTML = projects.map(p => `
      <div class="glass-card rounded-2xl p-5 border border-gray-800/80 space-y-2">
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-white text-base">${p.name}</h4>
          <span class="text-xs font-mono text-emerald-400">${p.date}</span>
        </div>
        <p class="text-xs font-mono text-cyan-400">${p.tech}</p>
        <p class="text-sm text-gray-300">${p.desc}</p>
      </div>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderTracker();
    renderTopics();
    renderLogs();
    renderProjects();
  });
})();
